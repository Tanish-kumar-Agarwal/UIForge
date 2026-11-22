import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { ProjectAnalyzer } from '../src/index.js';
import { UIForgeError } from '@uiforge/contracts';

describe('@uiforge/project-analyzer', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uiforge-analyzer-test-'));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('scans a minimal Vite + React + Tailwind v4 project', async () => {
    const pkg = {
      name: 'test-app',
      dependencies: {
        react: '^19.0.0',
        'react-dom': '^19.0.0',
        '@tailwindcss/vite': '^4.0.0',
      },
      devDependencies: {
        vite: '^6.0.0',
      },
    };
    fs.writeFileSync(path.join(tmpDir, 'package.json'), JSON.stringify(pkg, null, 2));

    // Create routes
    const pagesDir = path.join(tmpDir, 'src', 'pages');
    fs.mkdirSync(pagesDir, { recursive: true });
    fs.writeFileSync(path.join(pagesDir, 'index.tsx'), 'export default () => <h1>Home</h1>;');
    fs.writeFileSync(
      path.join(pagesDir, 'dashboard.tsx'),
      'export default () => <h1>Dashboard</h1>;',
    );

    // Create components
    const compDir = path.join(tmpDir, 'src', 'components');
    fs.mkdirSync(compDir, { recursive: true });
    fs.writeFileSync(path.join(compDir, 'button.tsx'), 'export const Button = () => <button />;');

    const analyzer = new ProjectAnalyzer({ rootPath: tmpDir });
    const result = await analyzer.scan();

    expect(result.detectedFramework).toBe('react-vite');
    expect(result.stylingStrategy).toBe('tailwind');
    expect(result.routeCount).toBe(2);
    expect(result.componentCount).toBe(1);
    expect(result.status).toBe('SUCCESS');
    expect(result.durationMs).toBeGreaterThanOrEqual(0);
  });

  it('throws UIForgeError on non-existent path', async () => {
    const badPath = path.join(tmpDir, 'does-not-exist');
    const analyzer = new ProjectAnalyzer({ rootPath: badPath });
    await expect(analyzer.scan()).rejects.toThrow(UIForgeError);
  });
});
