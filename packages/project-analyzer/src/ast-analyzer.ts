import * as path from 'node:path';
import { createHash } from 'node:crypto';
import ts from 'typescript';
import {
  type DiscoveredRoute,
  type DiscoveredComponent,
  type ResponsiveSignals,
  type AccessibilitySignals,
  type HardcodedDesignValues,
  type AnalysisFinding,
} from '@uiforge/contracts';
import type { SecurityBoundaryManager } from './security.js';

export interface AstAnalysisResult {
  routes: DiscoveredRoute[];
  components: DiscoveredComponent[];
  responsiveSignals: ResponsiveSignals;
  accessibilitySignals: AccessibilitySignals;
  hardcodedValues: HardcodedDesignValues;
  findings: AnalysisFinding[];
  parseWarnings: string[];
}

export class AstSourceAnalyzer {
  private readonly rootPath: string;
  private readonly security: SecurityBoundaryManager;

  constructor(rootPath: string, security: SecurityBoundaryManager) {
    this.rootPath = rootPath;
    this.security = security;
  }

  /**
   * Generates a stable deterministic finding ID based on content coordinates.
   */
  private generateFindingId(
    detector: string,
    relPath: string,
    line: number,
    code: string,
  ): string {
    const hash = createHash('sha256')
      .update(`${detector}:${relPath}:${line}:${code}`)
      .digest('hex');
    return `FND-${hash.slice(0, 8)}`;
  }

  /**
   * Analyzes all discovered source files using TypeScript Compiler API AST traversal.
   */
  public analyzeSources(
    candidateSourceFiles: string[],
    targetApplication?: string,
  ): AstAnalysisResult {
    const routes: DiscoveredRoute[] = [];
    const components: DiscoveredComponent[] = [];
    const parseWarnings: string[] = [];
    const findings: AnalysisFinding[] = [];

    let hasViewportMeta = false;
    let mediaQueriesCount = 0;
    let responsiveUtilityClassesCount = 0;

    let ariaAttributesCount = 0;
    let explicitRolesCount = 0;
    let semanticElementsCount = 0;
    let buttonsWithoutTypeCount = 0;
    let imagesWithoutAltCount = 0;
    let divButtonsCount = 0;

    let colorLiteralsCount = 0;
    let spacingLiteralsCount = 0;
    const hardcodedSamples = new Set<string>();

    const semanticTagSet = new Set([
      'header',
      'nav',
      'main',
      'article',
      'section',
      'footer',
      'aside',
      'figure',
      'figcaption',
    ]);

    for (const relPath of candidateSourceFiles) {
      // Monorepo isolation: if targetApplication is specified, ensure file belongs to that application
      if (targetApplication && !relPath.startsWith(targetApplication + '/')) {
        continue;
      }

      const fullPath = path.join(this.rootPath, relPath);
      const readResult = this.security.safeReadFile(fullPath);
      if (!readResult) {
        continue;
      }

      let contentToParse = readResult.content;
      if (readResult.content.includes('@media')) {
        const mediaMatches = readResult.content.match(/@media\b/g);
        if (mediaMatches) {
          mediaQueriesCount += mediaMatches.length;
        }
      }
      let scriptKind = ts.ScriptKind.TSX;
      const ext = path.extname(relPath).toLowerCase();

      // Vue SFC boundary: extract <script> block for best-effort AST parsing
      if (ext === '.vue') {
        const scriptMatch = contentToParse.match(/<script\b[^>]*>([\s\S]*?)<\/script>/i);
        if (scriptMatch && typeof scriptMatch[1] === 'string') {
          contentToParse = scriptMatch[1];
        } else {
          continue;
        }
        scriptKind = ts.ScriptKind.TS;
      }

      // Svelte boundary: extract <script> block for best-effort AST parsing
      if (ext === '.svelte') {
        const scriptMatch = contentToParse.match(/<script\b[^>]*>([\s\S]*?)<\/script>/i);
        if (scriptMatch && typeof scriptMatch[1] === 'string') {
          contentToParse = scriptMatch[1];
        } else {
          continue;
        }
        scriptKind = ts.ScriptKind.TS;
      }

      if (ext === '.ts') scriptKind = ts.ScriptKind.TS;
      if (ext === '.js' || ext === '.mjs' || ext === '.cjs') scriptKind = ts.ScriptKind.JS;
      if (ext === '.jsx') scriptKind = ts.ScriptKind.JSX;

      let sourceFile: ts.SourceFile;
      try {
        sourceFile = ts.createSourceFile(
          relPath,
          contentToParse,
          ts.ScriptTarget.Latest,
          true,
          scriptKind,
        );
      } catch (err) {
        parseWarnings.push(`Failed to parse ${relPath}: ${(err as Error).message}`);
        continue;
      }

      // Non-fatal syntax diagnostics
      const diagnostics = (sourceFile as unknown as { parseDiagnostics?: ts.Diagnostic[] })
        .parseDiagnostics;
      if (diagnostics && diagnostics.length > 0) {
        parseWarnings.push(
          `Syntax issues in ${relPath} (${diagnostics.length} diagnostics); continuing in fault-tolerant mode.`,
        );
      }

      // 1. Route Discovery (App Router & Pages Router)
      this.extractRoute(relPath, routes, targetApplication);

      // 2. Component, Props & Import Extraction
      const fileImports: string[] = [];
      const fileRenderedComponents: string[] = [];
      let fileHasInlineStyles = false;
      let fileUsesCssClasses = false;
      const detectedComponentNames: Array<{
        name: string;
        exportType: DiscoveredComponent['exportType'];
        propsInterface?: string;
      }> = [];

      // Collect type/interface names for props detection
      const interfaceNames = new Set<string>();
      ts.forEachChild(sourceFile, (node) => {
        if (ts.isInterfaceDeclaration(node)) {
          interfaceNames.add(node.name.text);
        } else if (ts.isTypeAliasDeclaration(node)) {
          interfaceNames.add(node.name.text);
        }
      });

      const visit = (node: ts.Node): void => {
        // Collect imports
        if (ts.isImportDeclaration(node)) {
          if (node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
            fileImports.push(node.moduleSpecifier.text);
          }
        }

        // Detect Functional Component Declarations
        if (ts.isFunctionDeclaration(node) && node.name) {
          const fnName = node.name.text;
          if (/^[A-Z]/.test(fnName)) {
            const isDefaultExport = Boolean(
              node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) &&
              node.modifiers?.some((m) => m.kind === ts.SyntaxKind.DefaultKeyword),
            );
            const isNamedExport = Boolean(
              node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) &&
              !isDefaultExport,
            );

            let propsInterface: string | undefined;
            const firstParam = node.parameters[0];
            if (firstParam && firstParam.type && ts.isTypeReferenceNode(firstParam.type) && ts.isIdentifier(firstParam.type.typeName)) {
              propsInterface = firstParam.type.typeName.text;
            }

            detectedComponentNames.push({
              name: fnName,
              exportType: isDefaultExport ? 'default' : isNamedExport ? 'named' : 'internal',
              propsInterface,
            });
          }
        }

        // Detect Arrow Function Components in Variable Statements
        if (ts.isVariableStatement(node)) {
          for (const decl of node.declarationList.declarations) {
            if (ts.isIdentifier(decl.name) && /^[A-Z]/.test(decl.name.text)) {
              if (decl.initializer && (ts.isArrowFunction(decl.initializer) || ts.isFunctionExpression(decl.initializer))) {
                const isNamedExport = Boolean(
                  node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword),
                );

                let propsInterface: string | undefined;
                const firstParam = decl.initializer.parameters[0];
                if (firstParam && firstParam.type && ts.isTypeReferenceNode(firstParam.type) && ts.isIdentifier(firstParam.type.typeName)) {
                  propsInterface = firstParam.type.typeName.text;
                }

                detectedComponentNames.push({
                  name: decl.name.text,
                  exportType: isNamedExport ? 'named' : 'internal',
                  propsInterface,
                });
              }
            }
          }
        }

        // Detect JSX Elements, Accessibility Signals & Design Tokens
        if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
          const opening = ts.isJsxElement(node) ? node.openingElement : node;
          const tagName = opening.tagName.getText(sourceFile);

          // Rendered component tracking
          if (/^[A-Z]/.test(tagName)) {
            if (!fileRenderedComponents.includes(tagName)) {
              fileRenderedComponents.push(tagName);
            }
          }

          // Semantic HTML tag tracking
          if (semanticTagSet.has(tagName.toLowerCase())) {
            semanticElementsCount++;
          }

          // Viewport meta check
          if (tagName === 'meta') {
            const hasNameViewport = opening.attributes.properties.some((prop) => {
              return (
                ts.isJsxAttribute(prop) &&
                ts.isIdentifier(prop.name) &&
                prop.name.text === 'name' &&
                prop.initializer &&
                ts.isStringLiteral(prop.initializer) &&
                prop.initializer.text.toLowerCase() === 'viewport'
              );
            });
            if (hasNameViewport) {
              hasViewportMeta = true;
            }
          }

          let hasTypeAttribute = false;
          let hasRoleAttribute = false;
          let hasOnClick = false;
          let hasAltAttribute = false;

          for (const prop of opening.attributes.properties) {
            if (ts.isJsxAttribute(prop) && ts.isIdentifier(prop.name)) {
              const attrName = prop.name.text;

              if (attrName.startsWith('aria-')) {
                ariaAttributesCount++;
              }
              if (attrName === 'role') {
                explicitRolesCount++;
                hasRoleAttribute = true;
              }
              if (attrName === 'type') {
                hasTypeAttribute = true;
              }
              if (attrName === 'onClick') {
                hasOnClick = true;
              }
              if (attrName === 'alt') {
                hasAltAttribute = true;
              }
              if (attrName === 'className') {
                fileUsesCssClasses = true;
                if (prop.initializer && ts.isStringLiteral(prop.initializer)) {
                  const classVal = prop.initializer.text;
                  const responsiveMatches = classVal.match(/(?:^|\s)(?:sm|md|lg|xl|2xl):/g);
                  if (responsiveMatches) {
                    responsiveUtilityClassesCount += responsiveMatches.length;
                  }
                }
              }
              if (attrName === 'style') {
                fileHasInlineStyles = true;
              }

              // Hardcoded Design Token Detector in Attribute Values
              if (prop.initializer) {
                if (ts.isStringLiteral(prop.initializer)) {
                  this.inspectLiteralValue(
                    prop.initializer.text,
                    sourceFile,
                    prop.initializer.getStart(sourceFile),
                    relPath,
                    hardcodedSamples,
                    () => colorLiteralsCount++,
                    () => spacingLiteralsCount++,
                  );
                } else if (ts.isJsxExpression(prop.initializer) && prop.initializer.expression) {
                  // Style object expression: style={{ color: '#fff', margin: '20px' }}
                  if (ts.isObjectLiteralExpression(prop.initializer.expression)) {
                    for (const propElement of prop.initializer.expression.properties) {
                      if (ts.isPropertyAssignment(propElement) && propElement.initializer) {
                        const valText = propElement.initializer.getText(sourceFile).replace(/['"]/g, '');
                        this.inspectLiteralValue(
                          valText,
                          sourceFile,
                          propElement.initializer.getStart(sourceFile),
                          relPath,
                          hardcodedSamples,
                          () => colorLiteralsCount++,
                          () => spacingLiteralsCount++,
                        );
                      }
                    }
                  }
                }
              }
            }
          }

          const { line, character } = sourceFile.getLineAndCharacterOfPosition(opening.getStart(sourceFile));

          // A11Y Finding: Button without explicit type
          if (tagName === 'button' && !hasTypeAttribute) {
            buttonsWithoutTypeCount++;
            findings.push({
              id: this.generateFindingId('ast:a11y', relPath, line + 1, 'missing-button-type'),
              detector: 'ast:jsx-accessibility',
              nature: 'INFERRED_SIGNAL',
              category: 'ACCESSIBILITY',
              severity: 'MODERATE',
              title: '<button> element missing explicit type attribute',
              description:
                'HTML buttons default to type="submit" inside form contexts. Specify type="button" for action triggers to prevent unintended form submission.',
              location: { filePath: relPath, line: line + 1, column: character + 1 },
              antiPatternId: 'ANTI-A11Y-002',
              evidence: [`node:<button>`, `missingAttribute:type`],
              confidence: 'CONFIRMED',
            });
          }

          // A11Y Finding: Div button with onClick without role or keyboard semantics
          if ((tagName === 'div' || tagName === 'span') && hasOnClick && !hasRoleAttribute) {
            divButtonsCount++;
            findings.push({
              id: this.generateFindingId('ast:a11y', relPath, line + 1, 'div-button-inaccessible'),
              detector: 'ast:jsx-accessibility',
              nature: 'DETECTED_FACT',
              category: 'ACCESSIBILITY',
              severity: 'CRITICAL',
              title: 'Inaccessible interactive non-semantic element',
              description:
                `A <${tagName}> element has an onClick handler without an explicit ARIA role or keyboard handling, rendering it invisible to screen readers and keyboard navigators.`,
              location: { filePath: relPath, line: line + 1, column: character + 1 },
              antiPatternId: 'ANTI-A11Y-002',
              evidence: [`node:<${tagName}>`, `attribute:onClick`, `missingAttribute:role`, 'EVID-DOM-003'],
              confidence: 'CONFIRMED',
            });
          }

          // A11Y Finding: img missing alt
          if (tagName === 'img' && !hasAltAttribute) {
            imagesWithoutAltCount++;
            findings.push({
              id: this.generateFindingId('ast:a11y', relPath, line + 1, 'img-missing-alt'),
              detector: 'ast:jsx-accessibility',
              nature: 'DETECTED_FACT',
              category: 'ACCESSIBILITY',
              severity: 'SERIOUS',
              title: 'Image element missing alt attribute',
              description:
                'Every <img> element must provide an alt attribute describing the image or alt="" for decorative images (WCAG 2.2 SC 1.1.1).',
              location: { filePath: relPath, line: line + 1, column: character + 1 },
              antiPatternId: 'ANTI-A11Y-001',
              evidence: [`node:<img>`, `missingAttribute:alt`],
              confidence: 'CONFIRMED',
            });
          }
        }

        ts.forEachChild(node, visit);
      };

      visit(sourceFile);

      // Record components found in file
      if (detectedComponentNames.length > 0) {
        for (const comp of detectedComponentNames) {
          components.push({
            name: comp.name,
            filePath: relPath,
            exportType: comp.exportType,
            propsInterface: comp.propsInterface,
            renderedComponents: fileRenderedComponents.sort(),
            importedModules: fileImports.sort(),
            hasInlineStyles: fileHasInlineStyles,
            usesCssClasses: fileUsesCssClasses,
            application: targetApplication,
          });
        }
      } else if (
        ['.tsx', '.jsx'].includes(ext) &&
        !/\.(test|spec)\.[tj]sx?$/.test(relPath) &&
        !path.basename(relPath).startsWith('_')
      ) {
        // Fallback: derive component name from file basename
        const fallbackName = path.basename(relPath, ext);
        if (/^[A-Z]/.test(fallbackName)) {
          components.push({
            name: fallbackName,
            filePath: relPath,
            exportType: 'default',
            renderedComponents: fileRenderedComponents.sort(),
            importedModules: fileImports.sort(),
            hasInlineStyles: fileHasInlineStyles,
            usesCssClasses: fileUsesCssClasses,
            application: targetApplication,
          });
        }
      }
    }

    // Sort outputs deterministically
    return {
      routes: routes.sort((a, b) => a.routePath.localeCompare(b.routePath)),
      components: components.sort((a, b) => a.name.localeCompare(b.name) || a.filePath.localeCompare(b.filePath)),
      responsiveSignals: {
        hasViewportMeta,
        mediaQueriesCount,
        responsiveUtilityClassesCount,
      },
      accessibilitySignals: {
        ariaAttributesCount,
        explicitRolesCount,
        semanticElementsCount,
        buttonsWithoutTypeCount,
        imagesWithoutAltCount,
        divButtonsCount,
      },
      hardcodedValues: {
        colorLiteralsCount,
        spacingLiteralsCount,
        samples: Array.from(hardcodedSamples).sort().slice(0, 10),
      },
      findings: findings.sort((a, b) => a.id.localeCompare(b.id)),
      parseWarnings: parseWarnings.sort(),
    };
  }

  private extractRoute(
    relPath: string,
    routes: DiscoveredRoute[],
    targetApplication?: string,
  ): void {
    const normalized = relPath.replace(/\\/g, '/');

    // 1. Next.js App Router: app/**/page.tsx or app/**/layout.tsx
    if (normalized.includes('/app/') || normalized.startsWith('app/')) {
      const parts = normalized.split('/app/');
      const routeSubPath = (parts.length > 1 && parts[1] !== undefined)
        ? parts[1]
        : normalized.replace(/^app\//, '');
      const basename = path.basename(routeSubPath);

      if (basename.startsWith('page.')) {
        let routePattern = '/' + path.dirname(routeSubPath);
        if (routePattern === '/.') routePattern = '/';
        // Normalize dynamic segment notation: [id] -> :id
        const hasDynamicSegments = /\[.+\]/.test(routePattern);

        routes.push({
          routePath: routePattern,
          filePath: relPath,
          type: 'page',
          routerType: 'app-router',
          hasDynamicSegments,
          application: targetApplication,
        });
      } else if (basename.startsWith('layout.')) {
        let routePattern = '/' + path.dirname(routeSubPath);
        if (routePattern === '/.') routePattern = '/';

        routes.push({
          routePath: routePattern,
          filePath: relPath,
          type: 'layout',
          routerType: 'app-router',
          hasDynamicSegments: false,
          application: targetApplication,
        });
      } else if (basename.startsWith('route.')) {
        let routePattern = '/' + path.dirname(routeSubPath);
        if (routePattern === '/.') routePattern = '/';

        routes.push({
          routePath: routePattern,
          filePath: relPath,
          type: 'route-handler',
          routerType: 'app-router',
          hasDynamicSegments: /\[.+\]/.test(routePattern),
          application: targetApplication,
        });
      }
    }

    // 2. Next.js Pages Router: pages/**/*.tsx
    else if (normalized.includes('/pages/') || normalized.startsWith('pages/')) {
      const parts = normalized.split('/pages/');
      const routeSubPath = (parts.length > 1 && parts[1] !== undefined)
        ? parts[1]
        : normalized.replace(/^pages\//, '');
      const ext = path.extname(routeSubPath);
      const withoutExt = routeSubPath.slice(0, -ext.length);

      if (!withoutExt.startsWith('_') && !withoutExt.includes('.test')) {
        let routePattern = '/' + withoutExt;
        if (routePattern.endsWith('/index')) {
          routePattern = routePattern.slice(0, -6) || '/';
        }

        routes.push({
          routePath: routePattern,
          filePath: relPath,
          type: withoutExt.startsWith('api/') ? 'api' : 'page',
          routerType: 'pages-router',
          hasDynamicSegments: /\[.+\]/.test(routePattern),
          application: targetApplication,
        });
      }
    }
  }

  private inspectLiteralValue(
    val: string,
    sourceFile: ts.SourceFile,
    pos: number,
    relPath: string,
    samples: Set<string>,
    onColor: () => void,
    onSpacing: () => void,
  ): void {
    const trimmed = val.trim();

    // Check hex color (#fff, #1a2b3c)
    if (/^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(trimmed)) {
      onColor();
      samples.add(trimmed);
    }
    // Check rgb/rgba/hsl/hsla
    else if (/^(?:rgb|rgba|hsl|hsla)\(/i.test(trimmed)) {
      onColor();
      samples.add(trimmed);
    }
    // Check pixel spacing (24px, 16px)
    else if (/^\d+(?:\.\d+)?px$/i.test(trimmed) && parseInt(trimmed, 10) > 4) {
      onSpacing();
      samples.add(trimmed);
    }
  }
}
