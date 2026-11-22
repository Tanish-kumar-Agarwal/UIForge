import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { UIForgeCoordinator, TaskStateMachine } from '../src/index.js';

describe('@uiforge/core', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uiforge-core-test-'));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('manages task state machine transitions cleanly', () => {
    const sm = new TaskStateMachine('ANALYZE');
    expect(sm.getSnapshot().status).toBe('IDLE');

    sm.transitionTo('INITIALIZING', 10);
    expect(sm.getSnapshot().status).toBe('INITIALIZING');
    expect(sm.getSnapshot().progressPercentage).toBe(10);

    sm.transitionTo('EXECUTING', 50);
    expect(sm.getSnapshot().status).toBe('EXECUTING');

    sm.transitionTo('COMPLETED');
    expect(sm.getSnapshot().status).toBe('COMPLETED');
    expect(sm.getSnapshot().progressPercentage).toBe(100);
    expect(sm.getSnapshot().completedAt).toBeDefined();
  });

  it('executes analysis workflow through coordinator', async () => {
    // Setup test repository
    const pkg = {
      name: 'core-test-app',
      dependencies: { next: '15.0.0' },
    };
    fs.writeFileSync(path.join(tmpDir, 'package.json'), JSON.stringify(pkg));
    const appDir = path.join(tmpDir, 'app');
    fs.mkdirSync(appDir);
    fs.writeFileSync(path.join(appDir, 'page.tsx'), 'export default () => <div>Next App</div>;');

    const coordinator = new UIForgeCoordinator();
    const result = await coordinator.executeAnalysis({ rootPath: tmpDir });

    expect(result.task.status).toBe('COMPLETED');
    expect(result.analysis.detectedFramework).toBe('next');
    expect(result.analysis.detectedRouter).toBe('app-router');
    expect(result.analysis.routeCount).toBe(1);
  });
});
