import * as fs from 'node:fs';
import * as path from 'node:path';
import {
  type FrameworkDetectionResult,
  type LanguageMetadata,
  type RuntimeMetadata,
  type StylingArchitecture,
} from '@uiforge/contracts';
import { type DiscoveredFiles, type DependencyAnalysis } from './workspace.js';

export class TechnologyDetector {
  private readonly rootPath: string;
  private readonly files: DiscoveredFiles;
  private readonly deps: DependencyAnalysis;

  constructor(rootPath: string, files: DiscoveredFiles, deps: DependencyAnalysis) {
    this.rootPath = rootPath;
    this.files = files;
    this.deps = deps;
  }

  /**
   * Multi-signal Framework Detector.
   * Accurately distinguishes Next.js (App vs Pages), Vite+React, React, Vue, Svelte, Unknown.
   */
  public detectFramework(): FrameworkDetectionResult {
    const allDeps = { ...this.deps.direct, ...this.deps.devDependencies };
    const evidence: string[] = [];

    // 1. Next.js Detection (App Router vs Pages Router)
    if (allDeps['next']) {
      evidence.push(`dependency:next@${allDeps['next']}`);
      const nextConfigs = ['next.config.js', 'next.config.mjs', 'next.config.ts'];
      for (const cfg of nextConfigs) {
        if (fs.existsSync(path.join(this.rootPath, cfg))) {
          evidence.push(`config:${cfg}`);
        }
      }

      const hasAppDir = this.files.allSourceFiles.some(
        (f) => f.startsWith('src/app/') || f.startsWith('app/'),
      );
      const hasPagesDir = this.files.allSourceFiles.some(
        (f) => f.startsWith('src/pages/') || f.startsWith('pages/'),
      );

      let router: FrameworkDetectionResult['router'] = 'none';
      if (hasAppDir) {
        router = 'app-router';
        evidence.push('router:app-router (src/app or app)');
      } else if (hasPagesDir) {
        router = 'pages-router';
        evidence.push('router:pages-router (src/pages or pages)');
      }

      return {
        name: 'next',
        version: allDeps['next'] || 'unknown',
        router,
        confidence: evidence.length >= 2 ? 'CONFIRMED' : 'PROBABLE',
        evidence,
      };
    }

    // 2. React + Vite Detection
    if (allDeps['react'] && (allDeps['vite'] || allDeps['@vitejs/plugin-react'])) {
      evidence.push(`dependency:react@${allDeps['react']}`);
      if (allDeps['vite']) evidence.push(`dependency:vite@${allDeps['vite']}`);

      const viteConfigs = ['vite.config.ts', 'vite.config.js', 'vite.config.mjs'];
      for (const cfg of viteConfigs) {
        if (fs.existsSync(path.join(this.rootPath, cfg))) {
          evidence.push(`config:${cfg}`);
        }
      }

      if (fs.existsSync(path.join(this.rootPath, 'index.html'))) {
        evidence.push('entry:index.html');
      }

      let router: FrameworkDetectionResult['router'] = 'none';
      if (allDeps['react-router'] || allDeps['react-router-dom']) {
        router = 'react-router';
        evidence.push('router:react-router');
      } else {
        router = 'spa-hash';
      }

      return {
        name: 'react-vite',
        version: allDeps['react'] || 'unknown',
        router,
        confidence: evidence.length >= 2 ? 'CONFIRMED' : 'PROBABLE',
        evidence,
      };
    }

    // 3. Standalone React Detection (CRA, Webpack, custom)
    if (allDeps['react']) {
      evidence.push(`dependency:react@${allDeps['react']}`);
      if (allDeps['react-scripts']) {
        evidence.push(`build-tool:react-scripts@${allDeps['react-scripts']}`);
      }

      let router: FrameworkDetectionResult['router'] = 'none';
      if (allDeps['react-router'] || allDeps['react-router-dom']) {
        router = 'react-router';
        evidence.push('router:react-router');
      }

      return {
        name: 'react',
        version: allDeps['react'] || 'unknown',
        router,
        confidence: 'PROBABLE',
        evidence,
      };
    }

    // 4. Vue Detection (Explicit best-effort boundaries)
    if (allDeps['vue'] || allDeps['nuxt'] || this.files.allSourceFiles.some((f) => f.endsWith('.vue'))) {
      if (allDeps['vue']) evidence.push(`dependency:vue@${allDeps['vue']}`);
      if (allDeps['nuxt']) evidence.push(`dependency:nuxt@${allDeps['nuxt']}`);

      const hasSfc = this.files.allSourceFiles.some((f) => f.endsWith('.vue'));
      if (hasSfc) evidence.push('sfc-files:detected');

      const isVite = Boolean(allDeps['vite'] || allDeps['@vitejs/plugin-vue']);
      return {
        name: isVite ? 'vue-vite' : 'vue',
        version: allDeps['vue'] || allDeps['nuxt'] || 'unknown',
        router: allDeps['vue-router'] ? 'spa-hash' : 'none',
        confidence: evidence.length >= 2 ? 'CONFIRMED' : 'PROBABLE',
        evidence,
        limitations:
          'Vue Single File Components detected; template syntax is analyzed on a best-effort basis without full AST compilation.',
      };
    }

    // 5. Svelte Detection (Explicit best-effort boundaries)
    if (allDeps['svelte'] || allDeps['@sveltejs/kit'] || this.files.allSourceFiles.some((f) => f.endsWith('.svelte'))) {
      if (allDeps['svelte']) evidence.push(`dependency:svelte@${allDeps['svelte']}`);
      if (allDeps['@sveltejs/kit']) evidence.push(`dependency:@sveltejs/kit@${allDeps['@sveltejs/kit']}`);

      const hasSvelteFiles = this.files.allSourceFiles.some((f) => f.endsWith('.svelte'));
      if (hasSvelteFiles) evidence.push('component-files:detected');

      const isKit = Boolean(allDeps['@sveltejs/kit']);
      return {
        name: isKit ? 'sveltekit' : 'svelte',
        version: allDeps['svelte'] || allDeps['@sveltejs/kit'] || 'unknown',
        router: isKit ? 'file-system' : 'none',
        confidence: evidence.length >= 2 ? 'CONFIRMED' : 'PROBABLE',
        evidence,
        limitations:
          'Svelte components detected; template syntax is analyzed on a best-effort basis without full AST compilation.',
      };
    }

    // 6. Unknown / Generic Fallback
    return {
      name: 'unknown',
      version: '0.0.0',
      router: 'none',
      confidence: 'UNKNOWN',
      evidence: ['No recognized framework dependencies or structures found.'],
      limitations: 'Generic analysis mode; specialized framework heuristics disabled.',
    };
  }

  /**
   * Detects primary language, tsconfig strictness, and targets.
   */
  public detectLanguage(): LanguageMetadata {
    const tsFiles = this.files.allSourceFiles.filter((f) => /\.(ts|tsx)$/.test(f)).length;
    const jsFiles = this.files.allSourceFiles.filter((f) => /\.(js|jsx|mjs|cjs)$/.test(f)).length;

    const tsconfigPath = path.join(this.rootPath, 'tsconfig.json');
    const hasTsConfig = fs.existsSync(tsconfigPath);
    let strictMode: boolean | undefined;
    let target: string | undefined;

    if (hasTsConfig) {
      try {
        const raw = fs.readFileSync(tsconfigPath, 'utf8');
        // Basic comment stripping for JSON
        const cleaned = raw.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '$1');
        const parsed = JSON.parse(cleaned);
        strictMode = Boolean(parsed.compilerOptions?.strict);
        target = parsed.compilerOptions?.target;
      } catch {
        // Ignore json parse error
      }
    }

    let primary: LanguageMetadata['primary'] = 'javascript';
    if (tsFiles > 0 && jsFiles === 0) {
      primary = 'typescript';
    } else if (tsFiles > 0 && jsFiles > 0) {
      primary = 'mixed';
    }

    return {
      primary,
      hasTsConfig,
      strictMode,
      target,
    };
  }

  /**
   * Detects runtime environment constraints (Node, Bun, Deno, browser).
   */
  public detectRuntime(): RuntimeMetadata {
    const pkgJsonPath = path.join(this.rootPath, 'package.json');
    let nodeConstraint: string | undefined;

    if (fs.existsSync(pkgJsonPath)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
        nodeConstraint = pkg.engines?.node;
      } catch {
        // Ignore
      }
    }

    const hasBunLock = fs.existsSync(path.join(this.rootPath, 'bun.lockb')) ||
                       fs.existsSync(path.join(this.rootPath, 'bun.lock'));
    if (hasBunLock) {
      return {
        detected: 'bun',
        confidence: 'CONFIRMED',
      };
    }

    const hasDeno = fs.existsSync(path.join(this.rootPath, 'deno.json')) ||
                    fs.existsSync(path.join(this.rootPath, 'deno.jsonc'));
    if (hasDeno) {
      return {
        detected: 'deno',
        confidence: 'CONFIRMED',
      };
    }

    return {
      detected: 'node',
      versionConstraint: nodeConstraint,
      confidence: nodeConstraint ? 'CONFIRMED' : 'PROBABLE',
    };
  }

  /**
   * Detects styling architecture, Tailwind version, CSS variables, tokens, and design systems.
   */
  public detectStyling(): StylingArchitecture {
    const allDeps = { ...this.deps.direct, ...this.deps.devDependencies };
    let primaryEngine: StylingArchitecture['primaryEngine'] = 'vanilla-css';
    let tailwindVersion: StylingArchitecture['tailwindVersion'] = 'none';

    // 1. Tailwind v4 detection
    const isTailwindV4Dep = Boolean(
      allDeps['@tailwindcss/vite'] ||
      allDeps['tailwindcss']?.startsWith('4') ||
      allDeps['tailwindcss']?.startsWith('^4')
    );

    let hasTailwindV4Css = false;
    for (const cssFile of this.files.styleFiles) {
      try {
        const content = fs.readFileSync(path.join(this.rootPath, cssFile), 'utf8');
        if (content.includes('@import "tailwindcss"') || content.includes('@theme')) {
          hasTailwindV4Css = true;
          break;
        }
      } catch {
        // Ignore
      }
    }

    if (isTailwindV4Dep || hasTailwindV4Css) {
      primaryEngine = 'tailwind';
      tailwindVersion = 'v4';
    } else if (allDeps['tailwindcss']) {
      primaryEngine = 'tailwind';
      tailwindVersion = 'v3';
    } else if (allDeps['styled-components'] || allDeps['@emotion/react']) {
      primaryEngine = 'styled-components';
    } else if (allDeps['sass'] || allDeps['node-sass']) {
      primaryEngine = 'sass';
    } else if (this.files.styleFiles.some((f) => f.includes('.module.'))) {
      primaryEngine = 'css-modules';
    }

    // 2. CSS variables detection in stylesheets
    let cssVariablesCount = 0;
    for (const cssFile of this.files.styleFiles) {
      try {
        const content = fs.readFileSync(path.join(this.rootPath, cssFile), 'utf8');
        const matches = content.match(/--[a-zA-Z0-9_-]+:/g);
        if (matches) {
          cssVariablesCount += matches.length;
        }
      } catch {
        // Ignore
      }
    }

    // 3. Design token files detection
    const tokenFiles: string[] = [];
    const candidateTokenFiles = [
      'tokens.json',
      'design-tokens.json',
      'src/tokens.json',
      'src/design-tokens.json',
    ];
    for (const tf of candidateTokenFiles) {
      if (fs.existsSync(path.join(this.rootPath, tf))) {
        tokenFiles.push(tf);
      }
    }

    // 4. Icon libraries detection
    const iconLibraries: string[] = [];
    if (allDeps['lucide-react']) iconLibraries.push('lucide-react');
    if (allDeps['@radix-ui/react-icons']) iconLibraries.push('@radix-ui/react-icons');
    if (allDeps['@heroicons/react']) iconLibraries.push('@heroicons/react');
    if (allDeps['react-icons']) iconLibraries.push('react-icons');
    if (allDeps['@fortawesome/react-fontawesome'] || allDeps['@fortawesome/fontawesome-svg-core']) {
      iconLibraries.push('fontawesome');
    }
    if (allDeps['phosphor-react']) iconLibraries.push('phosphor-react');

    // 5. Existing Design System detection
    const detectedDesignSystems: string[] = [];
    if (fs.existsSync(path.join(this.rootPath, 'components.json'))) {
      detectedDesignSystems.push('shadcn/ui');
    }
    if (allDeps['@mui/material'] || allDeps['@material-ui/core']) {
      detectedDesignSystems.push('material-ui');
    }
    if (allDeps['@chakra-ui/react']) {
      detectedDesignSystems.push('chakra-ui');
    }
    if (allDeps['antd']) {
      detectedDesignSystems.push('ant-design');
    }
    if (allDeps['@mantine/core']) {
      detectedDesignSystems.push('mantine');
    }

    return {
      primaryEngine,
      tailwindVersion,
      cssVariablesCount,
      cssFiles: this.files.styleFiles,
      hasDesignTokens: tokenFiles.length > 0,
      tokenFiles,
      iconLibraries: iconLibraries.sort(),
      detectedDesignSystems: detectedDesignSystems.sort(),
    };
  }
}
