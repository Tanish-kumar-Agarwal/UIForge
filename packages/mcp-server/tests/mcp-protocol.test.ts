import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { createMCPServer } from '../src/index.js';

describe('@uiforge/mcp-server - Live MCP Protocol Verification', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uiforge-mcp-test-'));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('connects via InMemoryTransport and executes listTools and callTool', async () => {
    // 1. Prepare sample project fixture
    const pkg = {
      name: 'fixture-app',
      dependencies: {
        next: '15.1.0',
        tailwindcss: '^4.0.0',
      },
    };
    fs.writeFileSync(path.join(tmpDir, 'package.json'), JSON.stringify(pkg, null, 2));
    const appDir = path.join(tmpDir, 'app');
    fs.mkdirSync(appDir);
    fs.writeFileSync(path.join(appDir, 'page.tsx'), 'export default () => <div>Home</div>;');

    // 2. Instantiate MCP Server and Client
    const server = createMCPServer();
    const client = new Client(
      {
        name: 'uiforge-test-client',
        version: '0.1.0',
      },
      {
        capabilities: {},
      },
    );

    // 3. Connect via actual linked in-memory transports
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();

    await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);

    // 4. Test tools/list protocol call
    const toolsResponse = await client.listTools();
    expect(toolsResponse.tools).toHaveLength(1);
    expect(toolsResponse.tools[0]?.name).toBe('scan_project');
    expect(toolsResponse.tools[0]?.description).toContain('non-destructive AST-based inspection');

    // 5. Test tools/call protocol call
    const callResponse = await client.callTool({
      name: 'scan_project',
      arguments: {
        rootPath: tmpDir,
      },
    });

    expect(callResponse.isError).toBeFalsy();
    expect(callResponse.content).toHaveLength(1);

    const contentItem = callResponse.content[0] as { type: string; text: string };
    expect(contentItem.type).toBe('text');

    const parsedResult = JSON.parse(contentItem.text);
    expect(parsedResult.task).toBeDefined();
    expect(parsedResult.task.status).toBe('COMPLETED');
    expect(parsedResult.analysis).toBeDefined();
    expect(parsedResult.analysis.detectedFramework).toBe('next');
    expect(parsedResult.analysis.stylingStrategy).toBe('tailwind');
    expect(parsedResult.analysis.routeCount).toBe(1);

    // 6. Test error handling through protocol
    const errorCall = await client.callTool({
      name: 'scan_project',
      arguments: {
        rootPath: path.join(tmpDir, 'non-existent-folder'),
      },
    });

    expect(errorCall.isError).toBe(true);
    const errItem = errorCall.content[0] as { type: string; text: string };
    expect(errItem.text).toContain('scan_project failed');

    // 7. Cleanup
    await client.close();
    await server.close();
  });
});
