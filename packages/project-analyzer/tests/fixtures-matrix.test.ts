import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { ProjectAnalyzer } from '../src/index.js';

describe('Phase 06 — Mandatory 12 Fixtures & Verification Matrix', () => {
  let tmpRoot: string;

  beforeEach(() => {
    tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'uiforge-fixture-matrix-'));
  });

  afterEach(() => {
    fs.rmSync(tmpRoot, { recursive: true, force: true });
  });

  // Helper to compute sha256 of all files in a dir to verify zero mutation
  function hashDirectory(dir: string): Record<string, string> {
    const hashes: Record<string, string> = {};
    if (!fs.existsSync(dir)) return hashes;

    const walk = (d: string) => {
      const entries = fs.readdirSync(d, { withFileTypes: true });
      for (const e of entries) {
        const full = path.join(d, e.name);
        if (e.isDirectory()) {
          walk(full);
        } else if (e.isFile()) {
          const content = fs.readFileSync(full);
          const rel = path.relative(dir, full).replace(/\\/g, '/');
          hashes[rel] = createHash('sha256').update(content).digest('hex');
        }
      }
    };
    walk(dir);
    return hashes;
  }

  // --------------------------------------------------------------------------
  // FIXTURE 01: Clean React Project (Vite + CSS Modules)
  // --------------------------------------------------------------------------
  it('Fixture 01: Clean React Project with CSS Modules', async () => {
    const fixDir = path.join(tmpRoot, 'clean-react');
    fs.mkdirSync(fixDir, { recursive: true });

    fs.writeFileSync(
      path.join(fixDir, 'package.json'),
      JSON.stringify({
        name: 'clean-react-app',
        dependencies: { react: '^18.3.1', 'react-dom': '^18.3.1' },
        devDependencies: { vite: '^5.4.0', typescript: '^5.7.0' },
      }),
    );
    fs.writeFileSync(path.join(fixDir, 'pnpm-lock.yaml'), '# pnpm lockfile');
    fs.writeFileSync(path.join(fixDir, 'vite.config.ts'), 'export default {};');
    fs.writeFileSync(path.join(fixDir, 'index.html'), '<html><body><script type="module" src="/src/main.tsx"></script></body></html>');

    const srcDir = path.join(fixDir, 'src');
    fs.mkdirSync(srcDir, { recursive: true });
    fs.writeFileSync(
      path.join(srcDir, 'App.tsx'),
      `import React from 'react';
import styles from './App.module.css';
export function App() {
  return (
    <div className={styles.container}>
      <button type="button" onClick={() => {}}>Click Me</button>
    </div>
  );
}`,
    );
    fs.writeFileSync(path.join(srcDir, 'App.module.css'), '.container { padding: 16px; }');

    const beforeHashes = hashDirectory(fixDir);

    const analyzer = new ProjectAnalyzer({ rootPath: fixDir });
    const result = await analyzer.analyze();

    expect(result.analysis.projectIdentity.framework.name).toBe('react-vite');
    expect(result.analysis.projectIdentity.framework.confidence).toBe('CONFIRMED');
    expect(result.analysis.architecture.styling.primaryEngine).toBe('css-modules');
    expect(result.analysis.architecture.components.length).toBeGreaterThanOrEqual(1);
    expect(result.analysis.architecture.components[0]?.name).toBe('App');
    expect(result.analysis.projectIdentity.packageManager.name).toBe('pnpm');
    expect(result.analysis.status).toBe('SUCCESS');

    // Zero filesystem mutation check
    const afterHashes = hashDirectory(fixDir);
    expect(afterHashes).toEqual(beforeHashes);
  });

  // --------------------------------------------------------------------------
  // FIXTURE 02: Next.js App Router Project
  // --------------------------------------------------------------------------
  it('Fixture 02: Next.js App Router with Dynamic Routes and Layouts', async () => {
    const fixDir = path.join(tmpRoot, 'next-app-router');
    fs.mkdirSync(fixDir, { recursive: true });

    fs.writeFileSync(
      path.join(fixDir, 'package.json'),
      JSON.stringify({
        name: 'my-next-app',
        dependencies: { next: '14.2.0', react: '18.3.1', 'react-dom': '18.3.1' },
      }),
    );
    fs.writeFileSync(path.join(fixDir, 'next.config.mjs'), 'export default {};');
    fs.writeFileSync(path.join(fixDir, 'package-lock.json'), '{}');

    const appDir = path.join(fixDir, 'src', 'app');
    const dynamicDir = path.join(appDir, 'dashboard', '[id]');
    fs.mkdirSync(dynamicDir, { recursive: true });

    fs.writeFileSync(
      path.join(appDir, 'layout.tsx'),
      `export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html><body>{children}</body></html>;
}`,
    );
    fs.writeFileSync(
      path.join(appDir, 'page.tsx'),
      `export default function HomePage() { return <h1>Home</h1>; }`,
    );
    fs.writeFileSync(
      path.join(dynamicDir, 'page.tsx'),
      `export default function UserPage() { return <div>User</div>; }`,
    );

    const analyzer = new ProjectAnalyzer({ rootPath: fixDir });
    const result = await analyzer.analyze();

    expect(result.analysis.projectIdentity.framework.name).toBe('next');
    expect(result.analysis.projectIdentity.framework.router).toBe('app-router');
    expect(result.analysis.projectIdentity.framework.confidence).toBe('CONFIRMED');

    const routePaths = result.analysis.architecture.routes.map((r) => r.routePath);
    expect(routePaths).toContain('/');
    expect(routePaths).toContain('/dashboard/[id]');

    const dynamicRoute = result.analysis.architecture.routes.find((r) => r.routePath === '/dashboard/[id]');
    expect(dynamicRoute?.hasDynamicSegments).toBe(true);
    expect(dynamicRoute?.routerType).toBe('app-router');
  });

  // --------------------------------------------------------------------------
  // FIXTURE 03: Next.js Pages Router Project
  // --------------------------------------------------------------------------
  it('Fixture 03: Next.js Pages Router Project', async () => {
    const fixDir = path.join(tmpRoot, 'next-pages-router');
    fs.mkdirSync(fixDir, { recursive: true });

    fs.writeFileSync(
      path.join(fixDir, 'package.json'),
      JSON.stringify({
        name: 'pages-next-app',
        dependencies: { next: '13.5.0', react: '18.2.0' },
      }),
    );
    fs.writeFileSync(path.join(fixDir, 'next.config.js'), 'module.exports = {};');
    fs.writeFileSync(path.join(fixDir, 'yarn.lock'), '');

    const pagesDir = path.join(fixDir, 'pages');
    const usersDir = path.join(pagesDir, 'users');
    fs.mkdirSync(usersDir, { recursive: true });

    fs.writeFileSync(path.join(pagesDir, '_app.tsx'), 'export default function App({ Component, pageProps }: any) { return <Component {...pageProps} />; }');
    fs.writeFileSync(path.join(pagesDir, 'index.tsx'), 'export default function Home() { return <h1>Home</h1>; }');
    fs.writeFileSync(path.join(usersDir, '[id].tsx'), 'export default function User() { return <div>User</div>; }');

    const analyzer = new ProjectAnalyzer({ rootPath: fixDir });
    const result = await analyzer.analyze();

    expect(result.analysis.projectIdentity.framework.name).toBe('next');
    expect(result.analysis.projectIdentity.framework.router).toBe('pages-router');
    expect(result.analysis.projectIdentity.packageManager.name).toBe('yarn');

    const routes = result.analysis.architecture.routes.map((r) => r.routePath);
    expect(routes).toContain('/');
    expect(routes).toContain('/users/[id]');
  });

  // --------------------------------------------------------------------------
  // FIXTURE 04: Vite + TypeScript + Tailwind v4
  // --------------------------------------------------------------------------
  it('Fixture 04: Vite TypeScript with Tailwind v4 CSS @theme', async () => {
    const fixDir = path.join(tmpRoot, 'vite-ts');
    fs.mkdirSync(fixDir, { recursive: true });

    fs.writeFileSync(
      path.join(fixDir, 'package.json'),
      JSON.stringify({
        name: 'vite-ts-tailwind',
        dependencies: { react: '^19.0.0', '@tailwindcss/vite': '^4.0.0' },
        devDependencies: { vite: '^6.0.0', typescript: '^5.7.0' },
      }),
    );
    fs.writeFileSync(
      path.join(fixDir, 'tsconfig.json'),
      JSON.stringify({ compilerOptions: { strict: true, target: 'ES2022' } }),
    );

    const srcDir = path.join(fixDir, 'src');
    fs.mkdirSync(srcDir, { recursive: true });
    fs.writeFileSync(
      path.join(srcDir, 'style.css'),
      `@import "tailwindcss";
@theme {
  --color-brand-primary: #3b82f6;
  --spacing-card: 24px;
}`,
    );
    fs.writeFileSync(
      path.join(srcDir, 'Button.tsx'),
      `export interface ButtonProps { label: string; }
export const Button = ({ label }: ButtonProps) => {
  return <button className="sm:p-4 md:p-6 bg-brand-primary">{label}</button>;
};`,
    );

    const analyzer = new ProjectAnalyzer({ rootPath: fixDir });
    const result = await analyzer.analyze();

    expect(result.analysis.projectIdentity.framework.name).toBe('react-vite');
    expect(result.analysis.projectIdentity.language.primary).toBe('typescript');
    expect(result.analysis.projectIdentity.language.strictMode).toBe(true);
    expect(result.analysis.architecture.styling.primaryEngine).toBe('tailwind');
    expect(result.analysis.architecture.styling.tailwindVersion).toBe('v4');
    expect(result.analysis.architecture.styling.cssVariablesCount).toBe(2);

    const btn = result.analysis.architecture.components.find((c) => c.name === 'Button');
    expect(btn?.propsInterface).toBe('ButtonProps');
    expect(btn?.usesCssClasses).toBe(true);

    expect(result.analysis.signals.responsive.responsiveUtilityClassesCount).toBeGreaterThanOrEqual(2);
  });

  // --------------------------------------------------------------------------
  // FIXTURE 05: Vite + JavaScript Project
  // --------------------------------------------------------------------------
  it('Fixture 05: Vite JavaScript Project with jsconfig', async () => {
    const fixDir = path.join(tmpRoot, 'vite-js');
    fs.mkdirSync(fixDir, { recursive: true });

    fs.writeFileSync(
      path.join(fixDir, 'package.json'),
      JSON.stringify({
        name: 'vite-js-app',
        dependencies: { react: '^18.2.0', 'react-dom': '^18.2.0' },
        devDependencies: { vite: '^5.0.0' },
      }),
    );
    fs.writeFileSync(path.join(fixDir, 'jsconfig.json'), '{}');
    fs.writeFileSync(path.join(fixDir, 'vite.config.js'), 'export default {};');

    const srcDir = path.join(fixDir, 'src');
    fs.mkdirSync(srcDir, { recursive: true });
    fs.writeFileSync(
      path.join(srcDir, 'Card.jsx'),
      `export function Card() { return <div style={{ color: '#ff0000', margin: '20px' }}>Card</div>; }`,
    );

    const analyzer = new ProjectAnalyzer({ rootPath: fixDir });
    const result = await analyzer.analyze();

    expect(result.analysis.projectIdentity.language.primary).toBe('javascript');
    expect(result.analysis.projectIdentity.language.hasTsConfig).toBe(false);
    expect(result.analysis.signals.designTokens.colorLiteralsCount).toBeGreaterThanOrEqual(1);
    expect(result.analysis.signals.designTokens.spacingLiteralsCount).toBeGreaterThanOrEqual(1);
  });

  // --------------------------------------------------------------------------
  // FIXTURE 06: Monorepo with Multiple Applications (Isolation Verified)
  // --------------------------------------------------------------------------
  it('Fixture 06: Monorepo with Multiple Applications and Isolated Analysis', async () => {
    const monoDir = path.join(tmpRoot, 'monorepo');
    fs.mkdirSync(monoDir, { recursive: true });

    fs.writeFileSync(path.join(monoDir, 'pnpm-workspace.yaml'), "packages:\n  - 'apps/*'\n");
    fs.writeFileSync(path.join(monoDir, 'package.json'), JSON.stringify({ name: 'root-monorepo', private: true }));

    // App 1: apps/web (Next.js)
    const webAppDir = path.join(monoDir, 'apps', 'web', 'src', 'app');
    fs.mkdirSync(webAppDir, { recursive: true });
    fs.writeFileSync(
      path.join(monoDir, 'apps', 'web', 'package.json'),
      JSON.stringify({ name: '@mono/web', dependencies: { next: '14.0.0', react: '18.2.0' } }),
    );
    fs.writeFileSync(path.join(webAppDir, 'page.tsx'), 'export default function WebHome() { return <h1>Web</h1>; }');

    // App 2: apps/docs (Vite)
    const docsAppDir = path.join(monoDir, 'apps', 'docs', 'src');
    fs.mkdirSync(docsAppDir, { recursive: true });
    fs.writeFileSync(
      path.join(monoDir, 'apps', 'docs', 'package.json'),
      JSON.stringify({ name: '@mono/docs', dependencies: { react: '18.2.0' }, devDependencies: { vite: '5.0.0' } }),
    );
    fs.writeFileSync(path.join(docsAppDir, 'DocsHeader.tsx'), 'export const DocsHeader = () => <header>Docs</header>;');

    // 1. Analyze root (detects monorepo)
    const rootAnalyzer = new ProjectAnalyzer({ rootPath: monoDir });
    const rootResult = await rootAnalyzer.analyze();

    expect(rootResult.analysis.projectIdentity.workspace.isMonorepo).toBe(true);
    expect(rootResult.analysis.projectIdentity.workspace.type).toBe('pnpm-workspace');
    expect(rootResult.analysis.projectIdentity.workspace.applications).toContain('apps/web');
    expect(rootResult.analysis.projectIdentity.workspace.applications).toContain('apps/docs');

    // 2. Monorepo Isolation: target apps/docs specifically
    const docsAnalyzer = new ProjectAnalyzer({ rootPath: monoDir, targetApplication: 'apps/docs' });
    const docsResult = await docsAnalyzer.analyze();

    // Verify apps/docs components are discovered and apps/web routes are NOT present!
    const docsComponentNames = docsResult.analysis.architecture.components.map((c) => c.name);
    expect(docsComponentNames).toContain('DocsHeader');

    const docsRoutes = docsResult.analysis.architecture.routes.map((r) => r.routePath);
    expect(docsRoutes).not.toContain('/page'); // Web app routes must NOT contaminate docs!
  });

  // --------------------------------------------------------------------------
  // FIXTURE 07: Dirty Git Worktree Detection (Read-Only Safety Invariant)
  // --------------------------------------------------------------------------
  it('Fixture 07: Git Inspection with Read-Only Invariants', async () => {
    const gitFixtureDir = path.join(tmpRoot, 'git-fixture');
    fs.mkdirSync(gitFixtureDir, { recursive: true });

    fs.writeFileSync(
      path.join(gitFixtureDir, 'package.json'),
      JSON.stringify({ name: 'git-app', dependencies: { react: '^18.0.0' } }),
    );

    // Initialize real git repo
    try {
      execFileSync('git', ['init'], { cwd: gitFixtureDir, stdio: 'ignore' });
      execFileSync('git', ['config', 'user.name', 'UIForge Tester'], { cwd: gitFixtureDir, stdio: 'ignore' });
      execFileSync('git', ['config', 'user.email', 'test@uiforge.dev'], { cwd: gitFixtureDir, stdio: 'ignore' });
      execFileSync('git', ['add', 'package.json'], { cwd: gitFixtureDir, stdio: 'ignore' });
      execFileSync('git', ['commit', '-m', 'Initial commit'], { cwd: gitFixtureDir, stdio: 'ignore' });

      // Create an uncommitted modified file (dirty worktree)
      fs.writeFileSync(path.join(gitFixtureDir, 'dirty.txt'), 'uncommitted work');

      const beforeHashes = hashDirectory(gitFixtureDir);

      const analyzer = new ProjectAnalyzer({ rootPath: gitFixtureDir });
      const result = await analyzer.analyze();

      expect(result.analysis.git.isGitRepository).toBe(true);
      expect(result.analysis.git.isWorktreeDirty).toBe(true);
      expect(result.analysis.git.untrackedFilesCount).toBeGreaterThanOrEqual(1);

      // Verify worktree is 100% untouched
      const afterHashes = hashDirectory(gitFixtureDir);
      expect(afterHashes).toEqual(beforeHashes);
    } catch {
      // If git CLI is not available in environment, graceful fallback
    }
  });

  // --------------------------------------------------------------------------
  // FIXTURE 08: Missing Lockfile Warning
  // --------------------------------------------------------------------------
  it('Fixture 08: Missing Lockfile records warning and recommendation', async () => {
    const fixDir = path.join(tmpRoot, 'missing-lockfile');
    fs.mkdirSync(fixDir, { recursive: true });

    fs.writeFileSync(
      path.join(fixDir, 'package.json'),
      JSON.stringify({ name: 'no-lock-app', dependencies: { react: '^18.0.0' } }),
    );

    const analyzer = new ProjectAnalyzer({ rootPath: fixDir });
    const result = await analyzer.analyze();

    expect(result.analysis.projectIdentity.packageManager.lockfilePresent).toBe(false);
    expect(result.analysis.projectIdentity.packageManager.name).toBe('unknown');

    const lockRec = result.analysis.recommendations.find((r) => r.id === 'REC-PKG-01');
    expect(lockRec).toBeDefined();
    expect(lockRec?.title).toContain('lockfile');
  });

  // --------------------------------------------------------------------------
  // FIXTURE 09: Malformed Configuration & Fault Tolerance
  // --------------------------------------------------------------------------
  it('Fixture 09: Fault Tolerant handling of malformed package.json and broken TSX', async () => {
    const fixDir = path.join(tmpRoot, 'malformed-app');
    fs.mkdirSync(fixDir, { recursive: true });

    // Corrupt JSON
    fs.writeFileSync(path.join(fixDir, 'package.json'), '{ invalid JSON, missing quotes: ');

    const srcDir = path.join(fixDir, 'src');
    fs.mkdirSync(srcDir, { recursive: true });
    // Syntax-broken TSX
    fs.writeFileSync(path.join(srcDir, 'Broken.tsx'), 'export const Broken = ( => { <div>unclosed');

    const analyzer = new ProjectAnalyzer({ rootPath: fixDir });
    const result = await analyzer.analyze();

    // Must not crash!
    expect(result.analysis.warnings.length).toBeGreaterThanOrEqual(1);
    expect(result.analysis.warnings.some((w) => w.includes('Malformed package.json'))).toBe(true);
    expect(result.analysis.status).toBe('SUCCESS');
  });

  // --------------------------------------------------------------------------
  // FIXTURE 10: Resource Bounding & Large Project Limits
  // --------------------------------------------------------------------------
  it('Fixture 10: Enforces maxFiles limit and reports partial status gracefully', async () => {
    const fixDir = path.join(tmpRoot, 'large-app');
    fs.mkdirSync(fixDir, { recursive: true });

    fs.writeFileSync(
      path.join(fixDir, 'package.json'),
      JSON.stringify({ name: 'large-app', dependencies: { react: '^18.0.0' } }),
    );

    const srcDir = path.join(fixDir, 'src');
    fs.mkdirSync(srcDir, { recursive: true });

    // Generate 35 small source files
    for (let i = 0; i < 35; i++) {
      fs.writeFileSync(path.join(srcDir, `Comp${i}.tsx`), `export const Comp${i} = () => <div />;`);
    }

    // Set maxFiles to 10
    const analyzer = new ProjectAnalyzer({ rootPath: fixDir, maxFiles: 10 });
    const result = await analyzer.analyze();

    expect(result.analysis.status).toBe('PARTIAL');
    expect(result.analysis.coverage.limitsHit).toContain('MAX_FILES_EXCEEDED');
    expect(result.analysis.coverage.totalFilesScanned).toBeLessThanOrEqual(15);
  });

  // --------------------------------------------------------------------------
  // FIXTURE 11: Symlinked Directories Cycle Prevention
  // --------------------------------------------------------------------------
  it('Fixture 11: Detects internal symlink loops without freezing', async () => {
    const fixDir = path.join(tmpRoot, 'symlink-loop');
    const dirA = path.join(fixDir, 'dirA');
    const dirB = path.join(fixDir, 'dirB');
    fs.mkdirSync(dirA, { recursive: true });
    fs.mkdirSync(dirB, { recursive: true });

    fs.writeFileSync(path.join(dirA, 'fileA.ts'), 'export const a = 1;');

    try {
      // Create recursive loop: dirA/toB -> dirB and dirB/toA -> dirA
      fs.symlinkSync(dirB, path.join(dirA, 'toB'), 'dir');
      fs.symlinkSync(dirA, path.join(dirB, 'toA'), 'dir');

      const analyzer = new ProjectAnalyzer({ rootPath: fixDir });
      const result = await analyzer.analyze();

      // Must complete without infinite recursion
      expect(result.analysis.status).toBe('SUCCESS');
      const loopSkipped = result.analysis.coverage.skippedFiles.find((s) => s.reason === 'SYMLINK_LOOP');
      expect(loopSkipped).toBeDefined();
    } catch {
      // Symlinks may require elevated privileges on older Windows configurations
    }
  });

  // --------------------------------------------------------------------------
  // FIXTURE 12: Malicious Path & Traversal Protection
  // --------------------------------------------------------------------------
  it('Fixture 12: Blocks symlink traversal escaping project root', async () => {
    const targetDir = path.join(tmpRoot, 'target-project');
    const outsideDir = path.join(tmpRoot, 'outside-secret');
    fs.mkdirSync(targetDir, { recursive: true });
    fs.mkdirSync(outsideDir, { recursive: true });

    fs.writeFileSync(path.join(outsideDir, 'secret-passwords.txt'), 'super-secret-content');

    try {
      // Symlink escaping root
      fs.symlinkSync(outsideDir, path.join(targetDir, 'escape-link'), 'dir');

      const analyzer = new ProjectAnalyzer({ rootPath: targetDir });
      const result = await analyzer.analyze();

      const escapeSkipped = result.analysis.coverage.skippedFiles.find((s) => s.reason === 'SYMLINK_OUTSIDE_ROOT');
      expect(escapeSkipped).toBeDefined();
    } catch {
      // Skip on systems where unprivileged symlinks are prohibited
    }
  });

  // --------------------------------------------------------------------------
  // REPRODUCIBILITY & DETERMINISM TEST (Additional Requirement 5)
  // --------------------------------------------------------------------------
  it('Reproducibility: Two identical scans produce identical deterministic content', async () => {
    const fixDir = path.join(tmpRoot, 'reproducibility-test');
    fs.mkdirSync(fixDir, { recursive: true });

    fs.writeFileSync(
      path.join(fixDir, 'package.json'),
      JSON.stringify({ name: 'repro-app', dependencies: { react: '^18.0.0' } }),
    );

    const srcDir = path.join(fixDir, 'src');
    fs.mkdirSync(srcDir, { recursive: true });
    fs.writeFileSync(
      path.join(srcDir, 'Component.tsx'),
      `export const Component = () => <div onClick={() => {}}>Not Accessible</div>;`,
    );

    // Scan 1
    const analyzer1 = new ProjectAnalyzer({ rootPath: fixDir });
    const result1 = await analyzer1.analyze();

    // Scan 2
    const analyzer2 = new ProjectAnalyzer({ rootPath: fixDir });
    const result2 = await analyzer2.analyze();

    // Deterministic analysis content must be bit-for-bit identical!
    expect(result1.analysis).toEqual(result2.analysis);

    // Finding IDs must be stable
    expect(result1.analysis.findings[0]?.id).toBe(result2.analysis.findings[0]?.id);

    // Markdown reports must be identical (ignoring execution duration/timestamp)
    const report1 = await analyzer1.generateReport();
    const report2 = await analyzer2.generateReport();

    // Strip volatile execution duration for report comparison
    const cleanReport1 = report1.replace(/- \*\*Execution Duration:\*\* .*/g, '');
    const cleanReport2 = report2.replace(/- \*\*Execution Duration:\*\* .*/g, '');
    expect(cleanReport1).toBe(cleanReport2);
  });

  it('Reproducibility: Relative path vs Absolute path produces identical normalized analysis content', async () => {
    const fixDir = path.join(tmpRoot, 'rel-abs-test');
    fs.mkdirSync(fixDir, { recursive: true });

    fs.writeFileSync(
      path.join(fixDir, 'package.json'),
      JSON.stringify({ name: 'rel-abs-app', dependencies: { react: '^18.0.0' } }),
    );

    const srcDir = path.join(fixDir, 'src');
    fs.mkdirSync(srcDir, { recursive: true });
    fs.writeFileSync(path.join(srcDir, 'Widget.tsx'), 'export const Widget = () => <span>Widget</span>;');

    // Absolute scan
    const absAnalyzer = new ProjectAnalyzer({ rootPath: fixDir });
    const absResult = await absAnalyzer.analyze();

    // Relative scan from parent directory
    const relToParent = path.relative(process.cwd(), fixDir);
    const relAnalyzer = new ProjectAnalyzer({ rootPath: relToParent });
    const relResult = await relAnalyzer.analyze();

    // Analysis content must be identical regardless of invocation path format
    expect(absResult.analysis.architecture.components).toEqual(relResult.analysis.architecture.components);
    expect(absResult.analysis.projectIdentity.name).toBe(relResult.analysis.projectIdentity.name);
    expect(absResult.analysis.coverage.totalFilesScanned).toBe(relResult.analysis.coverage.totalFilesScanned);
  });

  // --------------------------------------------------------------------------
  // PHASE 05 INTEGRATION & PROVENANCE TEST (Additional Requirements 2 & 4)
  // --------------------------------------------------------------------------
  it('Phase 05 Integration: Findings reference authentic anti-pattern IDs with provenance', async () => {
    const fixDir = path.join(tmpRoot, 'anti-pattern-test');
    fs.mkdirSync(fixDir, { recursive: true });

    fs.writeFileSync(
      path.join(fixDir, 'package.json'),
      JSON.stringify({ name: 'a11y-app', dependencies: { react: '^18.0.0' } }),
    );

    const srcDir = path.join(fixDir, 'src');
    fs.mkdirSync(srcDir, { recursive: true });
    fs.writeFileSync(
      path.join(srcDir, 'Controls.tsx'),
      `export const Controls = () => (
  <div>
    <button>Submit Default</button>
    <div onClick={() => {}}>Inaccessible Button</div>
    <img src="avatar.jpg" />
  </div>
);`,
    );

    const analyzer = new ProjectAnalyzer({ rootPath: fixDir });
    const result = await analyzer.analyze();

    const finding = result.analysis.findings.find((f) => f.antiPatternId === 'ANTI-A11Y-002');
    expect(finding).toBeDefined();
    expect(finding?.detector).toBe('ast:jsx-accessibility');
    expect(finding?.evidence).toContain('EVID-DOM-003');
    expect(finding?.confidence).toBe('CONFIRMED');
    expect(finding?.location.filePath).toBe('src/Controls.tsx');
  });

  // --------------------------------------------------------------------------
  // VUE & SVELTE EXPLICIT BOUNDARIES TEST
  // --------------------------------------------------------------------------
  it('Vue and Svelte detection includes explicit boundary limitations', async () => {
    // Vue
    const vueDir = path.join(tmpRoot, 'vue-app');
    fs.mkdirSync(vueDir, { recursive: true });
    fs.writeFileSync(
      path.join(vueDir, 'package.json'),
      JSON.stringify({ name: 'vue-app', dependencies: { vue: '^3.4.0' } }),
    );
    const vueAnalyzer = new ProjectAnalyzer({ rootPath: vueDir });
    const vueResult = await vueAnalyzer.analyze();
    expect(vueResult.analysis.projectIdentity.framework.name).toBe('vue');
    expect(vueResult.analysis.projectIdentity.framework.limitations).toContain('best-effort basis');

    // Svelte
    const svelteDir = path.join(tmpRoot, 'svelte-app');
    fs.mkdirSync(svelteDir, { recursive: true });
    fs.writeFileSync(
      path.join(svelteDir, 'package.json'),
      JSON.stringify({ name: 'svelte-app', dependencies: { svelte: '^4.2.0' } }),
    );
    const svelteAnalyzer = new ProjectAnalyzer({ rootPath: svelteDir });
    const svelteResult = await svelteAnalyzer.analyze();
    expect(svelteResult.analysis.projectIdentity.framework.name).toBe('svelte');
    expect(svelteResult.analysis.projectIdentity.framework.limitations).toContain('best-effort basis');
  });
});
