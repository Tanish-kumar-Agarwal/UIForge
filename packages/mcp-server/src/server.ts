import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { UIForgeCoordinator } from '@uiforge/core';
import { UIForgeError } from '@uiforge/contracts';

export interface MCPServerOptions {
  coordinator?: UIForgeCoordinator;
}

export const SCAN_PROJECT_TOOL: Tool = {
  name: 'scan_project',
  description:
    'Performs non-destructive AST-based inspection of a project directory, detecting framework, router, styling conventions, component census, and route hierarchy.',
  inputSchema: {
    type: 'object',
    properties: {
      rootPath: {
        type: 'string',
        description: 'Absolute or relative path to project root directory',
      },
      projectId: {
        type: 'string',
        description: 'Optional unique identifier for the project',
      },
    },
    required: ['rootPath'],
  },
};

export function createMCPServer(options: MCPServerOptions = {}): Server {
  const coordinator = options.coordinator ?? new UIForgeCoordinator();

  const server = new Server(
    {
      name: 'uiforge-mcp-server',
      version: '0.1.0',
    },
    {
      capabilities: {
        tools: {},
      },
    },
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [SCAN_PROJECT_TOOL],
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    if (name !== 'scan_project') {
      return {
        isError: true,
        content: [
          {
            type: 'text',
            text: `Tool '${name}' not recognized. Available tools: scan_project`,
          },
        ],
      };
    }

    const rootPath = (args as { rootPath?: string })?.rootPath;
    const projectId = (args as { projectId?: string })?.projectId;

    if (!rootPath || typeof rootPath !== 'string') {
      return {
        isError: true,
        content: [
          {
            type: 'text',
            text: "Invalid argument: 'rootPath' string is required.",
          },
        ],
      };
    }

    try {
      const result = await coordinator.executeAnalysis({ rootPath, projectId });
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      const message = error instanceof UIForgeError ? error.message : (error as Error).message;
      return {
        isError: true,
        content: [
          {
            type: 'text',
            text: `scan_project failed: ${message}`,
          },
        ],
      };
    }
  });

  return server;
}
