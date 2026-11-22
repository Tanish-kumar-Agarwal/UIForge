#!/usr/bin/env node
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createMCPServer } from './server.js';

async function main() {
  const server = createMCPServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  process.stderr.write('UIForge MCP Server running on stdio\n');
}

main().catch((err) => {
  process.stderr.write(`UIForge MCP fatal startup error: ${err.message}\n`);
  process.exit(1);
});
