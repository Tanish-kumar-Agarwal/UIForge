/**
 * @uiforge/config
 * Shared tooling presets and configuration standards.
 */

export const TOOLCHAIN_TARGET = {
  node: '>=22.12.0',
  typescript: '^5.7.0',
  moduleResolution: 'NodeNext',
  target: 'ES2024',
} as const;

export const MONOREPO_CHANNELS = {
  contracts: '@uiforge/contracts',
  config: '@uiforge/config',
  projectAnalyzer: '@uiforge/project-analyzer',
  core: '@uiforge/core',
  mcpServer: '@uiforge/mcp-server',
} as const;
