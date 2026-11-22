# UIFORGE — PHASE 03: PACKAGE BOUNDARIES & MONOREPO STRUCTURE
## Monorepo Topology, Package Responsibilities, Public API Surfaces & Prohibited Imports

**Document ID:** `UIF-PH03-PACKAGE-BOUNDARIES`  
**Phase:** 03 — Product Specification & Architecture Freeze  
**Status:** Certified / Complete  
**Date:** November 22, 2026  
**Standard:** Principal Software Architect & Principal Infrastructure Engineer  

---

## 1. Executive Monorepo Package Topology

UIForge is organized as a pnpm-managed TypeScript monorepo under the `@uiforge/*` npm scope. To prevent architectural spaghetti, circular dependencies, and monolithic coupling, every package has strictly bounded responsibilities, explicit public exports, and forbidden imports.

```
packages/
├── contracts/             # Shared TypeScript interfaces & Zod schemas (Zero internal deps)
├── core/                  # Workflow orchestration, task state machine, engine coordinator
├── project-intelligence/  # AST scanning, route tree parser, component dependency mapping
├── design-engine/         # Design brief generation, visual direction synthesis, APG patterns
├── tokens/                # W3C DTCG 2025.10 token parsing, Style Dictionary v5.8 compiler
├── component-registry/    # shadcn/ui source-copy registry model, candidate search & gating
├── safe-modifier/         # Coordinate slice patcher, WAL transaction engine, TS comparator
├── browser-eval/          # Playwright headless runner, pixelmatch diffing, axe-core testing
├── eval/                  # Finding categorization, scoring engine, policy evaluation
├── reporting/             # Standalone HTML and Markdown compliance dossier generator
├── storage/               # Local .uiforge/ filesystem repository, snapshots, SQLite store
├── security/              # 5-level security ladder, diff-bound tokens, path sanitization
├── agent-sdk/             # Agent integration abstractions, tool descriptors, context buffers
├── mcp-server/            # Model Context Protocol 2026-07-28 stdio & HTTP transport server
├── cli/                   # Developer terminal command-line tool (uiforge executable)
└── studio/                # (Level B) Optional local web/desktop visual management workspace
```

---

## 2. Granular Package Boundary Specifications

### 2.1 `@uiforge/contracts`
- **Location:** `packages/contracts/`
- **Core Responsibility:** Single source of truth for all shared data models, entity schemas, JSON-RPC payloads, and error codes.
- **Public Exports:** All Zod schemas (`*.schema.ts`), TypeScript types (`*.types.ts`), and error taxonomy constants (`errors.ts`).
- **Internal Only:** Schema compilation helpers.
- **Allowed Dependencies:** `zod` (peer/runtime dependency).
- **Prohibited Dependencies:** **ABSOLUTELY ZERO dependencies on any other `@uiforge/*` package.** Must remain pure and dependency-free.

### 2.2 `@uiforge/core`
- **Location:** `packages/core/`
- **Core Responsibility:** Application Orchestration Layer (Layer 3). Coordinates multi-step workflows, manages the Task State Machine, dispatches jobs to domain engines, and handles cancellation.
- **Public Exports:** `IWorkflowCoordinator`, `TaskRunner`, `TaskStateMachine`, `UIForgeEngine`.
- **Internal Only:** Task queue management, workflow state transitions.
- **Allowed Dependencies:** `@uiforge/contracts`, `@uiforge/storage`, `@uiforge/security`.
- **Prohibited Dependencies:** `@uiforge/cli`, `@uiforge/mcp-server`, `@uiforge/studio`, React, Electron.

### 2.3 `@uiforge/project-intelligence`
- **Location:** `packages/project-intelligence/`
- **Core Responsibility:** Project Intelligence Layer (Layer 4). Non-destructive repository scanning, route discovery, component dependency mapping, and styling system detection.
- **Public Exports:** `ProjectScanner`, `RouteExtractor`, `ComponentASTParser`, `TokenExtractor`.
- **Internal Only:** AST visitor patterns, file traversal caches.
- **Allowed Dependencies:** `@uiforge/contracts`, `@babel/parser`, `@babel/traverse`, `typescript` (Compiler API), `ast-grep` (NAPI).
- **Prohibited Dependencies:** `@uiforge/safe-modifier` (analysis must never mutate), Playwright, React, CLI.

### 2.4 `@uiforge/design-engine`
- **Location:** `packages/design-engine/`
- **Core Responsibility:** Design Intelligence Layer (Layer 5). Translates requirements into design briefs, visual directions, and accessible typography/color scales.
- **Public Exports:** `DesignBriefGenerator`, `VisualDirectionGenerator`, `ColorContrastValidator`.
- **Internal Only:** Aesthetic archetype palettes, APG keyboard interaction pattern mappings.
- **Allowed Dependencies:** `@uiforge/contracts`, `@uiforge/tokens`.
- **Prohibited Dependencies:** LLM provider SDKs (OpenAI, Anthropic), Playwright, CLI.

### 2.5 `@uiforge/tokens`
- **Location:** `packages/tokens/`
- **Core Responsibility:** Token & Styling Layer (Layer 6). Ingests, validates, and transforms W3C DTCG 2025.10 tokens into native CSS variables, Tailwind v4 rules, and font subsets.
- **Public Exports:** `TokenParser`, `StyleDictionaryCompiler`, `TailwindThemeEmitter`, `FontSubsettingPipeline`.
- **Internal Only:** CSS formatters, `pyftsubset` CLI wrapper.
- **Allowed Dependencies:** `@uiforge/contracts`, `style-dictionary` (v5.8.0), `fonttools` (external python binary invoked via subprocess).
- **Prohibited Dependencies:** `@uiforge/project-intelligence`, React, Playwright.

### 2.6 `@uiforge/component-registry`
- **Location:** `packages/component-registry/`
- **Core Responsibility:** Component Registry Layer (Layer 7). Queries local project components and the approved Phase 02.4 source registry; evaluates licenses and consumption modes.
- **Public Exports:** `ComponentRegistryQuery`, `LicenseGovernanceValidator`, `RegistryBlueprintAdapter`.
- **Internal Only:** Registry index cache, consumption permission matrix evaluators.
- **Allowed Dependencies:** `@uiforge/contracts`.
- **Prohibited Dependencies:** Build tools, Playwright, CLI.

### 2.7 `@uiforge/safe-modifier`
- **Location:** `packages/safe-modifier/`
- **Core Responsibility:** Mutation & Safe Execution Layer (Layer 8). Executes coordinate slice patching, manages pre-image Write-Ahead Logging (WAL), and performs TypeScript Compiler API diagnostic baseline regression checks.
- **Public Exports:** `SafeModifierEngine`, `WALJournalWriter`, `TSDiagnosticComparator`, `CoordinateSlicePatcher`.
- **Internal Only:** Pre-image serialization, journal file recovery scanner.
- **Allowed Dependencies:** `@uiforge/contracts`, `@uiforge/security`, `typescript`, `@babel/parser` with `errorRecovery: true`.
- **Prohibited Dependencies:** `@uiforge/cli`, `@uiforge/mcp-server`, Playwright.

### 2.8 `@uiforge/browser-eval`
- **Location:** `packages/browser-eval/`
- **Core Responsibility:** Browser Verification Layer (Layer 9). Manages headless Playwright browser instances, evaluates DOM layouts across viewports, captures screenshots, and runs pixelmatch and axe-core tests.
- **Public Exports:** `BrowserEvaluator`, `PixelDiffEngine`, `AxeRunner`, `ViewportMatrixRunner`.
- **Internal Only:** Browser process pooling, PNG buffer decoders (`pngjs`).
- **Allowed Dependencies:** `@uiforge/contracts`, `playwright` (`OS-BROW-01`), `pixelmatch` (`OS-VREG-01`), `@axe-core/playwright` (`OS-A11Y-02`).
- **Prohibited Dependencies:** `@uiforge/safe-modifier`, `@uiforge/cli`.

### 2.9 `@uiforge/eval`
- **Location:** `packages/eval/`
- **Core Responsibility:** Finding Categorization & Quality Evaluation Layer (Layer 10). Consolidates test logs, categorizes defects (Critical, Serious, Moderate), and evaluates project quality policies.
- **Public Exports:** `QualityPolicyEvaluator`, `FindingCategorizer`, `ScoreCalculator`.
- **Internal Only:** Scoring algorithms, threshold comparator math.
- **Allowed Dependencies:** `@uiforge/contracts`.
- **Prohibited Dependencies:** Playwright, Browser binaries, CLI.

### 2.10 `@uiforge/reporting`
- **Location:** `packages/reporting/`
- **Core Responsibility:** Reporting Subsystem (Layer 10). Generates standalone, tamper-evident HTML and Markdown compliance dossiers with embedded cryptographic digests.
- **Public Exports:** `ReportGenerator`, `HtmlDossierBuilder`, `MarkdownReportBuilder`.
- **Internal Only:** Inlined CSS/JS templates, base64 thumbnail inliners.
- **Allowed Dependencies:** `@uiforge/contracts`.
- **Prohibited Dependencies:** Playwright, CLI.

### 2.11 `@uiforge/storage`
- **Location:** `packages/storage/`
- **Core Responsibility:** Persistence Layer (Layer 11). Manages `.uiforge/` state repository, snapshot content-addressing, cache files, and append-only audit journals.
- **Public Exports:** `ProjectStorageManager`, `SnapshotStore`, `AuditJournalLogger`, `CacheManager`.
- **Internal Only:** Filesystem locking, JSON serialization helpers, SQLite driver (`better-sqlite3`).
- **Allowed Dependencies:** `@uiforge/contracts`, `better-sqlite3`.
- **Prohibited Dependencies:** Domain engines (must not depend on design, tokens, or evaluation).

### 2.12 `@uiforge/security`
- **Location:** `packages/security/`
- **Core Responsibility:** Security Layer (Layer 11). Enforces the 5-level security ladder, validates diff-bound authorization tokens, resolves canonical paths, and guards against symlink attacks.
- **Public Exports:** `SecurityGuard`, `AuthorizationTokenSigner`, `PathSanitizer`, `SymlinkValidator`.
- **Internal Only:** Cryptographic signing keys (HMAC-SHA256), token expiration validators.
- **Allowed Dependencies:** `@uiforge/contracts`.
- **Prohibited Dependencies:** Ingress adapters (CLI, MCP).

### 2.13 `@uiforge/agent-sdk`
- **Location:** `packages/agent-sdk/`
- **Core Responsibility:** Agent Ingress Layer (Layer 2). Provides typed programmatic interfaces, tool descriptor definitions, and context token budgeting for coding agent integrations.
- **Public Exports:** `AgentToolRegistry`, `ContextTokenBudgeter`, `ApprovalBridge`.
- **Internal Only:** Tool schema mappers, context compression algorithms.
- **Allowed Dependencies:** `@uiforge/contracts`, `@uiforge/core`.
- **Prohibited Dependencies:** Specific LLM vendor SDKs (OpenAI, Anthropic).

### 2.14 `@uiforge/mcp-server`
- **Location:** `packages/mcp-server/`
- **Core Responsibility:** Agent Ingress Layer (Layer 2). Official Model Context Protocol 2026-07-28 server implementation over stdio and Streamable HTTP (`POST /mcp`).
- **Public Exports:** `MCPServer`, `createStdioServer`, `createHttpServer`.
- **Internal Only:** JSON-RPC 2.0 message deserializers, HTTP route handlers.
- **Allowed Dependencies:** `@uiforge/contracts`, `@uiforge/agent-sdk`, `@uiforge/core`, `@modelcontextprotocol/server` (`OS-AGNT-01`).
- **Prohibited Dependencies:** `@uiforge/cli`, `@uiforge/studio`, React.

### 2.15 `@uiforge/cli`
- **Location:** `packages/cli/`
- **Core Responsibility:** Developer Interface Layer (Layer 1). The `uiforge` terminal binary; parses flags, renders spinners, displays diffs, and prompts for authorization.
- **Public Exports:** CLI binary entry point (`bin/uiforge.js`).
- **Internal Only:** Terminal rendering commands, Clack prompts, colorized logging.
- **Allowed Dependencies:** `@uiforge/contracts`, `@uiforge/core`, `commander`, `@clack/prompts`, `picocolors`.
- **Prohibited Dependencies:** Direct imports of domain engine internals (must call `@uiforge/core`).

### 2.16 `@uiforge/studio` (Level B Scope)
- **Location:** `packages/studio/`
- **Core Responsibility:** Visual Workspace Layer (Layer 1). Optional local web/desktop SPA for visual token editing, component previewing, and interactive diff approvals.
- **Public Exports:** Studio local server launcher.
- **Internal Only:** React UI components, visual canvas, WebSocket client.
- **Allowed Dependencies:** `@uiforge/contracts`, `@uiforge/core`, React, Vite, `react-resizable-panels` (`OS-LAYT-01`).
- **Prohibited Dependencies:** Core engines must NEVER import Studio (Studio is strictly a consumer of Core).
