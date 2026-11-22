# UIFORGE — PHASE 03: MVP IMPLEMENTATION PLAN (LEVEL A)
## Milestone Roadmap, Package Sequencing, Vertical Slice Delivery & Engineering Verification

**Document ID:** `UIF-PH03-MVP-IMPLEMENTATION-PLAN`  
**Phase:** 03 — Product Specification & Architecture Freeze  
**Status:** Certified / Complete  
**Date:** November 22, 2026  
**Standard:** Principal Software Architect & Principal Engineering Manager  

---

## 1. Executive Implementation Strategy

The MVP (Level A) implementation is structured as an engineering sequence of six focused milestones. Each milestone delivers a working, testable monorepo package with 100% automated test coverage, preventing "big bang" integration failures.

The ultimate objective of Level A is a **complete working vertical slice**:
> *A developer or AI agent runs `uiforge analyze` on a brownfield codebase, extracts DTCG tokens, executes an automated accessibility audit via headless Playwright, proposes a non-destructive code patch, and commits the patch with verified 0 TypeScript compiler regressions.*

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              SIX LEVEL A MVP MILESTONES                                │
├───────────┬────────────────────────────────┬───────────────────────────┬───────────────┤
│ Milestone │ Focus Scope                    │ Packages Affected         │ Duration      │
├───────────┼────────────────────────────────┼───────────────────────────┼───────────────┤
│ M1        │ Monorepo & Pure Contracts      │ root, @uiforge/contracts  │ Phase 04.1    │
│ M2        │ Project Intelligence & Tokens  │ intel, tokens, storage    │ Phase 04.2    │
│ M3        │ Safe Modifier & WAL Engine     │ safe-modifier, security   │ Phase 04.3    │
│ M4        │ Browser Eval & Quality Scoring │ browser-eval, eval, report│ Phase 04.4    │
│ M5        │ Developer CLI & MCP Server     │ cli, mcp-server, agent-sdk│ Phase 04.5    │
│ M6        │ End-to-End Vertical Slice      │ @uiforge/core (all pkgs)  │ Phase 04.6    │
└───────────┴────────────────────────────────┴───────────────────────────┴───────────────┘
```

---

## 2. Granular Milestone Specifications

### Milestone 1: Monorepo Setup & Pure Contracts (`Phase 04.1`)
- **Objective:** Establish the pnpm monorepo workspace, Turborepo build pipeline, shared TypeScript/ESLint configs, and the pure `@uiforge/contracts` package.
- **Deliverables:**
  - `pnpm-workspace.yaml`, `turbo.json`, `tsconfig.base.json`.
  - `packages/contracts/`: Zod schemas and TypeScript interfaces for all 28 canonical contracts.
  - Vitest test suite validating all Zod schemas against baseline JSON fixtures.
- **Exit Gate:** `pnpm build` and `pnpm test` pass with 100% clean exit codes; zero monorepo circular dependencies.

### Milestone 2: Project Intelligence & Token Engine (`Phase 04.2`)
- **Objective:** Implement non-destructive brownfield AST scanning and W3C DTCG design token compilation.
- **Deliverables:**
  - `packages/project-intelligence/`: `@babel/parser` with `errorRecovery: true`, AST-grep integration (`OS-D2C-06`), route tree extractor (Next.js/Vite).
  - `packages/tokens/`: W3C DTCG parser, Style Dictionary v5.8.0 compiler (`OS-TOKN-02`), Tailwind v4 `@theme` emitter (`OS-TOKN-04`), `pyftsubset` font pipeline for Inter/Geist (`OS-TYPO-04`, `OS-TYPO-05`).
  - `packages/storage/`: `.uiforge/` state manager and embedded SQLite `state.db` (`better-sqlite3`).
- **Exit Gate:** Accurately parses 1,000 files in $< 5.0\text{s}$; compiles DTCG tokens to valid CSS custom properties; passes all font RFN rename checks.

### Milestone 3: Safe Modifier & WAL Engine (`Phase 04.3`)
- **Objective:** Construct the non-destructive coordinate slice patcher, pre-image Write-Ahead Log (WAL), and TypeScript Compiler API diagnostic baseline comparator.
- **Deliverables:**
  - `packages/safe-modifier/`: Coordinate slice patcher $[start, end]$, WAL pre-image journal writer (`.uiforge/wal/`), crash recovery scanner.
  - TypeScript diagnostic comparator: detects regressions ($\text{postErrors} \setminus \text{baselineErrors} > 0$) and executes atomic rollback.
  - `packages/security/`: 5-level security ladder evaluator, diff-bound authorization token signer (HMAC-SHA256).
- **Exit Gate:** 100% atomic rollback demonstrated on simulated compile failure; 0 comment/whitespace destruction outside mutated slice.

### Milestone 4: Headless Browser Evaluation & Quality Scoring (`Phase 04.4`)
- **Objective:** Implement multi-viewport headless browser automation, pixelmatch visual diffing, and axe-core accessibility auditing.
- **Deliverables:**
  - `packages/browser-eval/`: Playwright Chromium runner (`OS-BROW-01`), multi-viewport loop (375px, 768px, 1280px), pure-JS `pixelmatch` (`OS-VREG-01`), `@axe-core/playwright` (`OS-A11Y-02`) under MPL-2.0 notice compliance.
  - `packages/eval/`: Finding categorizer (Critical, Serious, Moderate, Minor), quality policy evaluator.
  - `packages/reporting/`: Standalone HTML and Markdown compliance dossier builder.
- **Exit Gate:** 0 false positives on compliant WCAG fixtures; deterministic pixelmatch diffing; standalone HTML report renders 100% offline.

### Milestone 5: Developer CLI & MCP Ingress Server (`Phase 04.5`)
- **Objective:** Build the developer-facing terminal CLI and the official Model Context Protocol (MCP 2026-07-28) server.
- **Deliverables:**
  - `packages/cli/`: `uiforge` executable with Clack interactive prompts, unified diff renderer, commands (`analyze`, `tokens`, `audit`, `improve`, `validate`, `export`).
  - `packages/mcp-server/`: MCP 2026-07-28 stdio and HTTP server (`@modelcontextprotocol/server` `OS-AGNT-01`) with automatic fallback to legacy `2025-11-25`.
  - `packages/agent-sdk/`: Typed tool schemas (`analyze_project`, `extract_tokens`, `search_components`, `verify_in_browser`, `propose_modification`).
- **Exit Gate:** Coding agents (Claude Code, Cursor, OpenCode `OS-AGNT-02`) successfully discover tools, execute queries, and handle Level 3 authorization challenges over MCP.

### Milestone 6: End-to-End Vertical Slice Integration (`Phase 04.6`)
- **Objective:** Integrate all monorepo packages through `@uiforge/core`, orchestrate Workflows B and C on real production repositories, and validate acceptance gates.
- **Deliverables:**
  - `packages/core/`: `IWorkflowCoordinator`, Task State Machine, centralized error interceptor.
  - End-to-end integration test suite running full Brownfield Improvement loop (Workflow B).
  - Complete Level A MVP documentation and CLI installation tarball.
- **Exit Gate:** Successful execution of all 18 Phase 03 Acceptance Criteria (PH03-01 to PH03-18); zero compiler or runtime regressions.
