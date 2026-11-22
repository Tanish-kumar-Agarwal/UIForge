import * as fs from 'node:fs';
import * as path from 'node:path';
import { randomUUID } from 'node:crypto';
import {
  type AnalysisRun,
  type FrameworkMetadata,
  type StylingMetadata,
  AnalysisRunSchema,
  UIForgeError,
  ErrorCode,
  ErrorCategory,
} from '@uiforge/contracts';

export interface ProjectAnalysisOptions {
  rootPath: string;
  projectId?: string;
}

export interface DiscoveredProjectMetadata {
  framework: FrameworkMetadata;
  styling: StylingMetadata;
  routes: string[];
  components: string[];
}

export class ProjectAnalyzer {
  private readonly rootPath: string;
  private readonly projectId: string;

  constructor(options: ProjectAnalysisOptions) {
    if (!options.rootPath) {
      throw new UIForgeError({
        code: ErrorCode.ERR_VALIDATION_SCHEMA_MISMATCH,
        category: ErrorCategory.VALIDATION,
        message: 'rootPath must be provided for project analysis',
      });
    }

    this.rootPath = path.resolve(options.rootPath);
    this.projectId = options.projectId ?? randomUUID();
  }

  public async scan(): Promise<AnalysisRun> {
    const startTime = performance.now();
    const warnings: string[] = [];

    if (!fs.existsSync(this.rootPath)) {
      throw new UIForgeError({
        code: ErrorCode.ERR_SECURITY_PATH_TRAVERSAL,
        category: ErrorCategory.SECURITY,
        message: `Project root directory does not exist: ${this.rootPath}`,
        remediationHint: 'Provide a valid existing directory path',
      });
    }

    const packageJsonPath = path.join(this.rootPath, 'package.json');
    let pkgJson: Record<string, unknown> = {};

    if (fs.existsSync(packageJsonPath)) {
      try {
        const raw = fs.readFileSync(packageJsonPath, 'utf8');
        pkgJson = JSON.parse(raw);
      } catch (err) {
        warnings.push(`Failed to parse package.json: ${(err as Error).message}`);
      }
    } else {
      warnings.push('No package.json detected in root path.');
    }

    const deps = {
      ...((pkgJson.dependencies as Record<string, string>) || {}),
      ...((pkgJson.devDependencies as Record<string, string>) || {}),
    };

    // 1. Framework detection
    const framework = this.detectFramework(deps);

    // 2. Styling strategy detection
    const styling = this.detectStyling(deps);

    // 3. Route discovery
    const routes = this.discoverRoutes();

    // 4. Component census
    const components = this.discoverComponents();

    const durationMs = Math.round(performance.now() - startTime);

    const run: AnalysisRun = {
      analysisId: randomUUID(),
      projectId: this.projectId,
      timestamp: new Date().toISOString(),
      analyzerVersion: '0.1.0',
      detectedFramework: framework.name,
      detectedRouter: framework.router,
      stylingStrategy: styling.engine,
      componentCount: components.length,
      routeCount: routes.length,
      durationMs,
      status: warnings.length > 0 && !fs.existsSync(packageJsonPath) ? 'PARTIAL' : 'SUCCESS',
      warnings,
    };

    return AnalysisRunSchema.parse(run);
  }

  private detectFramework(deps: Record<string, string>): FrameworkMetadata {
    if (deps['next']) {
      const hasAppDir =
        fs.existsSync(path.join(this.rootPath, 'app')) ||
        fs.existsSync(path.join(this.rootPath, 'src', 'app'));
      return {
        name: 'next',
        version: deps['next'] ?? 'unknown',
        router: hasAppDir ? 'app-router' : 'pages-router',
      };
    }

    if (deps['@remix-run/react'] || deps['@remix-run/node']) {
      return {
        name: 'remix',
        version: deps['@remix-run/react'] ?? 'unknown',
        router: 'file-system',
      };
    }

    if (deps['@sveltejs/kit']) {
      return {
        name: 'sveltekit',
        version: deps['@sveltejs/kit'] ?? 'unknown',
        router: 'file-system',
      };
    }

    if (deps['vue'] && deps['vite']) {
      return {
        name: 'vue-vite',
        version: deps['vue'] ?? 'unknown',
        router: 'spa-hash',
      };
    }

    if (deps['react'] && (deps['vite'] || deps['@vitejs/plugin-react'])) {
      return {
        name: 'react-vite',
        version: deps['react'] ?? 'unknown',
        router: 'spa-hash',
      };
    }

    return {
      name: 'unknown',
      version: '0.0.0',
      router: 'none',
    };
  }

  private detectStyling(deps: Record<string, string>): StylingMetadata {
    const hasTailwindV4 =
      deps['@tailwindcss/vite'] !== undefined ||
      deps['tailwindcss']?.startsWith('4') ||
      deps['tailwindcss']?.startsWith('^4');
    const hasTailwindV3 = deps['tailwindcss'] && !hasTailwindV4;

    if (hasTailwindV4) {
      return {
        engine: 'tailwind',
        tailwindVersion: 'v4',
        cssVariablesDetected: true,
      };
    }

    if (hasTailwindV3) {
      return {
        engine: 'tailwind',
        tailwindVersion: 'v3',
        cssVariablesDetected: true,
      };
    }

    if (deps['styled-components']) {
      return {
        engine: 'styled-components',
        cssVariablesDetected: false,
      };
    }

    if (deps['sass'] || deps['node-sass']) {
      return {
        engine: 'sass',
        cssVariablesDetected: false,
      };
    }

    return {
      engine: 'vanilla-css',
      cssVariablesDetected: false,
    };
  }

  private discoverRoutes(): string[] {
    const routes: string[] = [];
    const candidateDirs = [
      path.join(this.rootPath, 'src', 'app'),
      path.join(this.rootPath, 'app'),
      path.join(this.rootPath, 'src', 'pages'),
      path.join(this.rootPath, 'pages'),
      path.join(this.rootPath, 'src', 'routes'),
      path.join(this.rootPath, 'routes'),
    ];

    for (const dir of candidateDirs) {
      if (fs.existsSync(dir)) {
        this.scanDirForFiles(dir, (filePath) => {
          const relative = path.relative(dir, filePath);
          if (/\.(tsx|jsx|ts|js|vue|svelte)$/.test(filePath) && !/\.(test|spec)\./.test(filePath)) {
            const normalized =
              '/' + relative.replace(/\.(tsx|jsx|ts|js|vue|svelte)$/, '').replace(/\\/g, '/');
            routes.push(normalized);
          }
        });
      }
    }

    return routes;
  }

  private discoverComponents(): string[] {
    const components: string[] = [];
    const componentDirs = [
      path.join(this.rootPath, 'src', 'components'),
      path.join(this.rootPath, 'components'),
      path.join(this.rootPath, 'src', 'ui'),
    ];

    for (const dir of componentDirs) {
      if (fs.existsSync(dir)) {
        this.scanDirForFiles(dir, (filePath) => {
          if (/\.(tsx|jsx|vue|svelte)$/.test(filePath) && !/\.(test|spec)\./.test(filePath)) {
            components.push(path.relative(this.rootPath, filePath));
          }
        });
      }
    }

    return components;
  }

  private scanDirForFiles(dir: string, callback: (filePath: string) => void): void {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          if (entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== '.uiforge') {
            this.scanDirForFiles(fullPath, callback);
          }
        } else if (entry.isFile()) {
          callback(fullPath);
        }
      }
    } catch {
      // Ignored for restricted directories
    }
  }
}
