import * as fs from 'node:fs';
import * as path from 'node:path';
import { execFileSync } from 'node:child_process';
import {
  type PackageManagerMetadata,
  type WorkspaceMetadata,
  type GitIntelligence,
  type ScanCoverage,
  type SkippedFile,
} from '@uiforge/contracts';
import type { SecurityBoundaryManager } from './security.js';

export interface DiscoveredFiles {
  allSourceFiles: string[]; // Relative paths to canonical root
  routeCandidateFiles: string[];
  componentCandidateFiles: string[];
  styleFiles: string[];
  configFiles: string[];
  coverage: ScanCoverage;
  limitsHit: string[];
}

export interface DependencyAnalysis {
  direct: Record<string, string>;
  devDependencies: Record<string, string>;
  scripts: Record<string, string>;
  tools: {
    buildTools: string[];
    testFrameworks: string[];
    linters: string[];
  };
  warnings: string[];
}

export class WorkspaceManager {
  private readonly rootPath: string;
  private readonly security: SecurityBoundaryManager;

  constructor(rootPath: string, security: SecurityBoundaryManager) {
    this.rootPath = rootPath;
    this.security = security;
  }

  /**
   * Discovers package manager and lockfile presence.
   */
  public detectPackageManager(): PackageManagerMetadata {
    const lockfiles = [
      { name: 'pnpm', file: 'pnpm-lock.yaml' },
      { name: 'npm', file: 'package-lock.json' },
      { name: 'yarn', file: 'yarn.lock' },
      { name: 'bun', file: 'bun.lockb' },
      { name: 'bun', file: 'bun.lock' },
    ] as const;

    for (const lock of lockfiles) {
      const lockPath = path.join(this.rootPath, lock.file);
      if (fs.existsSync(lockPath)) {
        return {
          name: lock.name,
          lockfilePresent: true,
          lockfilePath: lock.file,
        };
      }
    }

    return {
      name: 'unknown',
      lockfilePresent: false,
    };
  }

  /**
   * Discovers workspace / monorepo structure.
   */
  public detectWorkspace(targetApplication?: string): WorkspaceMetadata {
    const pnpmWorkspace = path.join(this.rootPath, 'pnpm-workspace.yaml');
    const turboConfig = path.join(this.rootPath, 'turbo.json');
    const lernaConfig = path.join(this.rootPath, 'lerna.json');
    const pkgJsonPath = path.join(this.rootPath, 'package.json');

    let isMonorepo = false;
    let type: WorkspaceMetadata['type'] = 'none';
    const applications: string[] = [];

    if (fs.existsSync(pnpmWorkspace)) {
      isMonorepo = true;
      type = 'pnpm-workspace';
    } else if (fs.existsSync(turboConfig)) {
      isMonorepo = true;
      type = 'turborepo';
    } else if (fs.existsSync(lernaConfig)) {
      isMonorepo = true;
      type = 'lerna';
    }

    if (fs.existsSync(pkgJsonPath)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
        if (pkg.workspaces) {
          isMonorepo = true;
          if (type === 'none') {
            type = Array.isArray(pkg.workspaces) ? 'npm-workspaces' : 'yarn-workspaces';
          }
        }
      } catch {
        // Ignore parse error
      }
    }

    // Discover apps if monorepo
    if (isMonorepo) {
      const appDirs = ['apps', 'packages', 'projects'];
      for (const d of appDirs) {
        const fullDir = path.join(this.rootPath, d);
        if (fs.existsSync(fullDir) && fs.statSync(fullDir).isDirectory()) {
          try {
            const entries = fs.readdirSync(fullDir, { withFileTypes: true });
            for (const entry of entries) {
              if (entry.isDirectory() && !entry.name.startsWith('.')) {
                applications.push(`${d}/${entry.name}`);
              }
            }
          } catch {
            // Ignore readdir error
          }
        }
      }
    }

    return {
      isMonorepo,
      type,
      rootPath: '.',
      packagesCount: applications.length > 0 ? applications.length : 1,
      applications: applications.length > 0 ? applications.sort() : undefined,
      targetApplication,
    };
  }

  /**
   * Parses package.json and extracts dependencies, scripts, and tooling classifications.
   */
  public analyzeDependencies(): DependencyAnalysis {
    const pkgJsonPath = path.join(this.rootPath, 'package.json');
    const warnings: string[] = [];
    let direct: Record<string, string> = {};
    let devDependencies: Record<string, string> = {};
    let scripts: Record<string, string> = {};

    if (fs.existsSync(pkgJsonPath)) {
      try {
        const raw = fs.readFileSync(pkgJsonPath, 'utf8');
        const parsed = JSON.parse(raw);
        direct = (parsed.dependencies as Record<string, string>) || {};
        devDependencies = (parsed.devDependencies as Record<string, string>) || {};
        scripts = (parsed.scripts as Record<string, string>) || {};
      } catch (err) {
        warnings.push(`Malformed package.json: ${(err as Error).message}`);
      }
    } else {
      warnings.push('No package.json detected at project root.');
    }

    const allDeps = { ...direct, ...devDependencies };

    // Tooling classifiers
    const buildTools: string[] = [];
    const testFrameworks: string[] = [];
    const linters: string[] = [];

    if (allDeps['vite']) buildTools.push('vite');
    if (allDeps['next']) buildTools.push('next');
    if (allDeps['webpack']) buildTools.push('webpack');
    if (allDeps['turbo'] || allDeps['@turbo/gen']) buildTools.push('turborepo');
    if (allDeps['rollup']) buildTools.push('rollup');
    if (allDeps['esbuild']) buildTools.push('esbuild');
    if (allDeps['@babel/core']) buildTools.push('babel');
    if (allDeps['tsup']) buildTools.push('tsup');

    if (allDeps['vitest']) testFrameworks.push('vitest');
    if (allDeps['jest'] || allDeps['@types/jest']) testFrameworks.push('jest');
    if (allDeps['@playwright/test'] || allDeps['playwright']) testFrameworks.push('playwright');
    if (allDeps['cypress']) testFrameworks.push('cypress');
    if (allDeps['mocha']) testFrameworks.push('mocha');

    if (allDeps['eslint']) linters.push('eslint');
    if (allDeps['@biomejs/biome']) linters.push('biome');
    if (allDeps['prettier']) linters.push('prettier');
    if (allDeps['stylelint']) linters.push('stylelint');

    return {
      direct,
      devDependencies,
      scripts,
      tools: {
        buildTools: buildTools.sort(),
        testFrameworks: testFrameworks.sort(),
        linters: linters.sort(),
      },
      warnings,
    };
  }

  /**
   * Read-only Git state inspector.
   * Invokes git with GIT_OPTIONAL_LOCKS=0 to guarantee zero index lock mutation.
   */
  public inspectGit(): GitIntelligence {
    const gitDir = path.join(this.rootPath, '.git');
    if (!fs.existsSync(gitDir)) {
      return { isGitRepository: false };
    }

    try {
      // 1. Get current branch (read-only)
      let currentBranch: string | undefined;
      try {
        currentBranch = execFileSync('git', ['symbolic-ref', '--short', 'HEAD'], {
          cwd: this.rootPath,
          encoding: 'utf8',
          env: { ...process.env, GIT_OPTIONAL_LOCKS: '0' },
          stdio: ['pipe', 'pipe', 'ignore'],
        }).trim();
      } catch {
        // Detached HEAD fallback
        try {
          const headContent = fs.readFileSync(path.join(gitDir, 'HEAD'), 'utf8').trim();
          if (headContent.startsWith('ref: refs/heads/')) {
            currentBranch = headContent.replace('ref: refs/heads/', '');
          }
        } catch {
          // Ignore
        }
      }

      // 2. Get HEAD commit hash (read-only)
      let headCommit: string | undefined;
      try {
        headCommit = execFileSync('git', ['rev-parse', 'HEAD'], {
          cwd: this.rootPath,
          encoding: 'utf8',
          env: { ...process.env, GIT_OPTIONAL_LOCKS: '0' },
          stdio: ['pipe', 'pipe', 'ignore'],
        }).trim();
      } catch {
        // Ignore
      }

      // 3. Inspect worktree dirty status without index locks
      let isWorktreeDirty = false;
      let modifiedFilesCount = 0;
      let untrackedFilesCount = 0;

      try {
        const statusOutput = execFileSync(
          'git',
          ['status', '--porcelain=v1', '--untracked-files=all'],
          {
            cwd: this.rootPath,
            encoding: 'utf8',
            env: { ...process.env, GIT_OPTIONAL_LOCKS: '0' },
            stdio: ['pipe', 'pipe', 'ignore'],
          },
        );

        if (statusOutput.trim().length > 0) {
          isWorktreeDirty = true;
          const lines = statusOutput.trim().split('\n');
          for (const line of lines) {
            const prefix = line.slice(0, 2);
            if (prefix === '??') {
              untrackedFilesCount++;
            } else {
              modifiedFilesCount++;
            }
          }
        }
      } catch {
        // Fallback: assume clean if git status fails
      }

      return {
        isGitRepository: true,
        currentBranch,
        headCommit,
        isWorktreeDirty,
        modifiedFilesCount,
        untrackedFilesCount,
      };
    } catch {
      return { isGitRepository: true };
    }
  }

  /**
   * Safe, resource-bounded directory crawler.
   */
  public crawlFiles(targetApplication?: string): DiscoveredFiles {
    const allSourceFiles: string[] = [];
    const routeCandidateFiles: string[] = [];
    const componentCandidateFiles: string[] = [];
    const styleFiles: string[] = [];
    const configFiles: string[] = [];
    const skippedFiles: SkippedFile[] = [];
    const limitsHit: string[] = [];

    let totalFilesFound = 0;
    let totalFilesScanned = 0;
    let totalDirectoriesScanned = 0;

    const startTime = Date.now();
    const startDir = targetApplication
      ? path.join(this.rootPath, targetApplication)
      : this.rootPath;

    if (!fs.existsSync(startDir)) {
      return {
        allSourceFiles,
        routeCandidateFiles,
        componentCandidateFiles,
        styleFiles,
        configFiles,
        coverage: {
          totalFilesFound: 0,
          totalFilesScanned: 0,
          totalDirectoriesScanned: 0,
          skippedFiles,
          limitsHit: ['TARGET_APP_NOT_FOUND'],
        },
        limitsHit: ['TARGET_APP_NOT_FOUND'],
      };
    }

    const traverse = (currentDir: string, currentDepth: number): void => {
      // Check depth limit
      if (currentDepth > this.security.maxDepth) {
        if (!limitsHit.includes('MAX_DEPTH_EXCEEDED')) {
          limitsHit.push('MAX_DEPTH_EXCEEDED');
        }
        return;
      }

      // Check timeout limit
      if (Date.now() - startTime > this.security.scanTimeoutMs) {
        if (!limitsHit.includes('SCAN_TIMEOUT_EXCEEDED')) {
          limitsHit.push('SCAN_TIMEOUT_EXCEEDED');
        }
        return;
      }

      // Check file count limit
      if (totalFilesScanned >= this.security.maxFiles) {
        if (!limitsHit.includes('MAX_FILES_EXCEEDED')) {
          limitsHit.push('MAX_FILES_EXCEEDED');
        }
        return;
      }

      let entries: fs.Dirent[];
      try {
        entries = fs.readdirSync(currentDir, { withFileTypes: true });
        totalDirectoriesScanned++;
      } catch (err) {
        const code = (err as NodeJS.ErrnoException).code;
        skippedFiles.push({
          filePath: path.relative(this.rootPath, currentDir) || '.',
          reason: 'PERMISSION_DENIED',
          detail: `Directory readdir error: ${code}`,
        });
        return;
      }

      // Register real directory path to prevent symlink loops
      try {
        const real = fs.realpathSync(currentDir);
        this.security.registerDirectory(real);
      } catch {
        // Ignore realpath error on restricted dir
      }

      // Sort entries deterministically for reproducible ordering
      entries.sort((a, b) => a.name.localeCompare(b.name));

      for (const entry of entries) {
        if (totalFilesScanned >= this.security.maxFiles) {
          if (!limitsHit.includes('MAX_FILES_EXCEEDED')) {
            limitsHit.push('MAX_FILES_EXCEEDED');
          }
          break;
        }

        const isDir = entry.isDirectory();
        const check = this.security.checkEntry(currentDir, entry.name, isDir);
        const relPath = path
          .relative(this.rootPath, path.join(currentDir, entry.name))
          .replace(/\\/g, '/');

        if (!check.allowed) {
          skippedFiles.push({
            filePath: relPath,
            reason: check.reason || 'GITIGNORE',
            detail: check.detail,
          });
          continue;
        }

        const fullPath = path.join(currentDir, entry.name);

        if (isDir) {
          traverse(fullPath, currentDepth + 1);
        } else if (entry.isFile()) {
          totalFilesFound++;
          totalFilesScanned++;

          const ext = path.extname(entry.name).toLowerCase();

          // Source files
          if (['.tsx', '.ts', '.jsx', '.js', '.mjs', '.cjs'].includes(ext)) {
            allSourceFiles.push(relPath);

            // Route candidate classification
            if (
              relPath.includes('/app/') ||
              relPath.startsWith('app/') ||
              relPath.includes('/pages/') ||
              relPath.startsWith('pages/') ||
              relPath.includes('/routes/') ||
              relPath.startsWith('routes/')
            ) {
              routeCandidateFiles.push(relPath);
            }

            // Component candidate classification
            if (
              ['.tsx', '.jsx'].includes(ext) &&
              !/\.(test|spec)\.[tj]sx?$/.test(entry.name) &&
              !entry.name.startsWith('_')
            ) {
              componentCandidateFiles.push(relPath);
            }
          } else if (['.vue', '.svelte'].includes(ext)) {
            allSourceFiles.push(relPath);
            componentCandidateFiles.push(relPath);
          } else if (['.css', '.scss', '.sass', '.less'].includes(ext)) {
            styleFiles.push(relPath);
          } else if (
            [
              'next.config.js',
              'next.config.mjs',
              'next.config.ts',
              'vite.config.js',
              'vite.config.ts',
              'vite.config.mjs',
              'tailwind.config.js',
              'tailwind.config.ts',
              'tailwind.config.mjs',
              'tsconfig.json',
              'jsconfig.json',
              'components.json',
            ].includes(entry.name)
          ) {
            configFiles.push(relPath);
          }
        }
      }
    };

    traverse(startDir, 0);

    return {
      allSourceFiles: allSourceFiles.sort(),
      routeCandidateFiles: routeCandidateFiles.sort(),
      componentCandidateFiles: componentCandidateFiles.sort(),
      styleFiles: styleFiles.sort(),
      configFiles: configFiles.sort(),
      coverage: {
        totalFilesFound,
        totalFilesScanned,
        totalDirectoriesScanned,
        skippedFiles: skippedFiles.sort((a, b) => a.filePath.localeCompare(b.filePath)),
        limitsHit: limitsHit.sort(),
      },
      limitsHit,
    };
  }
}
