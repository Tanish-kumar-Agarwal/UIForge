# UIFORGE — PHASE 03: MASTER SYSTEM ARCHITECTURE SPECIFICATION
## Comprehensive Architectural Blueprint, Subsystem Boundaries, Data Flow & Execution Model

**Document ID:** `UIF-PH03-MASTER-SYSTEM-ARCHITECTURE`  
**Phase:** 03 — Product Specification & Architecture Freeze  
**Status:** Certified / Complete  
**Date:** November 22, 2026  
**Standard:** Principal Software Architect, Application Security Architect & AI Systems Architect  

---

## 1. Executive Architectural Blueprint

UIForge is engineered as a **Headless, Local-First, Layered Monorepo Architecture**. It bridges autonomous AI coding agents and human software engineers to production frontend web applications through deterministic analysis, design system governance, and independent browser verification.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              THE UIFORGE SYSTEM TOPOLOGY                               │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Layer 1: Developer Interface Layer (@uiforge/cli, Studio SPA)                          │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Layer 2: Agent Ingress Layer (@uiforge/mcp-server [2026-07-28], @uiforge/agent-sdk)     │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Layer 3: Application Orchestration Layer (@uiforge/core - Workflow Coordinator)        │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Layer 4: Project Intelligence Layer (@uiforge/project-intelligence - AST & Routes)     │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Layer 5: Design Intelligence Layer (@uiforge/design-engine - Briefs & Archetypes)       │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Layer 6: Token & Styling Layer (@uiforge/tokens - W3C DTCG 2025.10 & Style Dict. v5.8)  │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Layer 7: Component Registry Layer (@uiforge/component-registry - shadcn model)         │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Layer 8: Safe Mutation Layer (@uiforge/safe-modifier - WAL & TS Diagnostics)           │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Layer 9: Browser Verification Layer (@uiforge/browser-eval - Playwright, Pixelmatch)   │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Layer 10: Evaluation & Reporting Layer (@uiforge/eval, @uiforge/reporting)             │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Layer 11: Storage, Security & Provenance Layer (@uiforge/storage, @uiforge/security)   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Canonical Subsystem Definitions & Responsibilities

### 2.1 Ingress Subsystems (Layers 1 & 2)
1. **Developer CLI (`@uiforge/cli`):**
   - Developer-facing command-line tool (`uiforge`).
   - Implements interactive terminal UI (spinners, formatted tables, unified diffs via Clack).
   - Translates CLI commands (`analyze`, `design`, `audit`, `improve`, `validate`, `export`) directly into Core Orchestration calls.
   - Zero duplicated domain logic; strictly an interface adapter.
2. **Agent Ingress & MCP Server (`@uiforge/mcp-server` & `@uiforge/agent-sdk`):**
   - Implements official Model Context Protocol (MCP specification `2026-07-28`).
   - Supports stateless modern discovery (`server/discover`, request `_meta` versioning) with automatic fallback to legacy `2025-11-25` and `2024-11-05` revisions.
   - Dual transport support: `stdio` (for local coding agents like Claude Code, Cursor, OpenCode) and Streamable HTTP (`POST /mcp` for network agents).
   - Exposes typed, Zod-validated tools. Gates mutation tools behind human authorization tokens.

### 2.2 Core Orchestration Subsystem (Layer 3)
- **Workflow Coordinator (`@uiforge/core`):**
  - Manages the execution lifecycles of Workflows A, B, C, and D.
  - Enforces the Task State Machine, task cancellation, and step timeout monitoring.
  - Maintains run context and dispatches domain jobs to downstream engines.
  - Centralized error taxonomy interceptor and audit logger.

### 2.3 Domain Intelligence Subsystems (Layers 4, 5, 6, 7)
- **Project Intelligence (`@uiforge/project-intelligence`):**
  - Non-destructive AST parsing via `@babel/parser` with `errorRecovery: true` and TypeScript Compiler API.
  - AST-grep integration (`OS-D2C-06`) for high-speed structural code searching.
  - Route tree discovery across Next.js (App & Pages router), Remix, and Vite-React.
  - Component dependency mapping and prop interface extraction.
- **Design Intelligence (`@uiforge/design-engine`):**
  - Synthesizes user requirements into formal `DesignBriefRecord` specifications.
  - Formulates accessible visual directions, color scales, and typography hierarchies.
  - Grounded in open design standards (W3C DTCG `OS-TOKN-01`, W3C APG `OS-A11Y-08`).
- **Token & Styling Engine (`@uiforge/tokens`):**
  - Parses and validates W3C DTCG Draft 2025.10 design token dictionaries.
  - Invokes Style Dictionary v5.8.0 compiler running on Node.js 22 LTS (`OS-TOKN-02`).
  - Emits native CSS custom properties, Tailwind CSS v4 `@theme` blocks (`OS-TOKN-04`), and `@tailwindcss/container-queries` rules (`OS-LAYT-02`).
  - Manages font asset compliance and `pyftsubset` subsetting for Inter (`OS-TYPO-04`) and Geist (`OS-TYPO-05`) with SIL OFL 1.1 RFN renaming.
- **Component Registry Intelligence (`@uiforge/component-registry`):**
  - Implements the shadcn/ui zero-runtime source-copy component distribution model (`OS-COMP-01`).
  - Queries local project components and the approved Phase 02.4 canonical source registry.
  - Enforces consumption-mode permissions (`DEPENDENCY`, `SOURCE_COPY`, `REFERENCE_ONLY`).
  - Blocks Tier 5 rejected items (e.g. SaaS UI Pro, Aceternity resale restrictions) and quarantines Tier 4 deferred items (pa11y LGPL review).

### 2.4 Mutation & Execution Subsystem (Layer 8)
- **Safe Modifier Engine (`@uiforge/safe-modifier`):**
  - Coordinate-based slice patcher: replaces exact character spans $[start, end]$, preserving 100% of surrounding comments, formatting, and indentation.
  - Pre-image Write-Ahead Logging (WAL): flushes original file contents and SHA-256 digests to `.uiforge/wal/journal-<id>.log` prior to touching source files.
  - TypeScript Diagnostic Comparator: measures baseline compiler errors ($\text{baseline}$) and post-mutation errors ($\text{post}$). If $\text{post} \setminus \text{baseline} > 0$, automatically reverts files to pre-image bytes.
  - Human Authorization Guard: verifies cryptographic signatures of Level 2+ authorization tokens.

### 2.5 Verification & Reporting Subsystems (Layers 9 & 10)
- **Browser Evaluation Engine (`@uiforge/browser-eval`):**
  - Orchestrates headless Chromium/WebKit browser instances via Playwright (`OS-BROW-01`).
  - Multi-viewport layout evaluation (375px mobile, 768px tablet, 1280px desktop, 1920px wide).
  - Injects `@axe-core/playwright` (`OS-A11Y-02`) for automated WCAG 2.2 AA testing under MPL-2.0 notice compliance.
  - Pure-JS deterministic visual diffing via `pixelmatch` (`OS-VREG-01`).
  - Collects unhandled runtime JavaScript exceptions, console logs, and failed network requests.
- **Evaluation & Reporting (`@uiforge/eval` & `@uiforge/reporting`):**
  - Categorizes findings into Critical, Serious, Moderate, and Minor severities.
  - Consolidates test logs, pixel diffs, and accessibility arrays into tamper-evident HTML and Markdown dossiers.
  - Computes cryptographic SHA-256 digests for all generated compliance artifacts.

### 2.6 Persistence & Security Infrastructure (Layer 11)
- **Storage Subsystem (`@uiforge/storage`):**
  - Manages the local-first `.uiforge/` project state directory:
    - `.uiforge/snapshots/`: Content-addressed project snapshots.
    - `.uiforge/wal/`: Active write-ahead transaction logs.
    - `.uiforge/cache/`: Cached AST parse trees and route manifests.
    - `.uiforge/audit.jsonl`: Append-only, hash-chained security event journal.
  - Optional local SQLite database (`.uiforge/state.db`) for high-volume historical queries.
- **Security & Policy Subsystem (`@uiforge/security`):**
  - Enforces the 5-level security ladder and diff-bound authorization tokens.
  - Enforces canonical path resolution, symlink boundary checks, and prompt injection sanitization.

---

## 3. Runtime Boundaries & Process Isolation

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              PROCESS ISOLATION TOPOLOGY                                │
├────────────────────────────────────────┬───────────────────────────────────────────────┤
│ Process Boundary                       │ Security Controls & Execution Isolation       │
├────────────────────────────────────────┼───────────────────────────────────────────────┤
│ 1. Main Node.js Process (UIForge Core) │ - Runs under host user OS privileges.         │
│    (CLI, Orchestrator, AST Engines)    │ - Strictly reads source AST; writes via WAL.  │
│                                        │ - Never invokes eval() or dynamic require().  │
├────────────────────────────────────────┼───────────────────────────────────────────────┤
│ 2. Isolated Headless Browser Process   │ - Chromium/WebKit spawned via Playwright.     │
│    (DOM Rendering, a11y, Screenshots)  │ - OS sandbox enabled; file:// access blocked. │
│                                        │ - Network restricted to localhost/staging.    │
├────────────────────────────────────────┼───────────────────────────────────────────────┤
│ 3. External Tool Subprocesses          │ - Invoked out-of-process via execFile().      │
│    (ast-grep, @axe-core/cli)           │ - No shell expansion; strict argument arrays. │
│                                        │ - Output captured via standard stdio pipes.   │
├────────────────────────────────────────┼───────────────────────────────────────────────┤
│ 4. External Agent Communication        │ - MCP stdio pipes or Streamable HTTP.         │
│    (Claude Code, Cursor, OpenCode)     │ - Untrusted boundary; Zod contract validation.│
│                                        │ - Zero filesystem mutation without token.     │
└────────────────────────────────────────┴───────────────────────────────────────────────┘
```

---

## 4. Internal & External Communication Model

1. **Internal Monorepo Calls:** Strongly typed TypeScript function calls using immutable data records conforming to Draft-07 JSON Schemas / Zod contracts. Circular dependencies are strictly forbidden and enforced by CI linting.
2. **External Agent Protocol (MCP):** JSON-RPC 2.0 messages adhering to Model Context Protocol specification `2026-07-28`. Tool arguments and results are serialized as standard JSON payloads.
3. **Developer Terminal Communication:** Clean, human-readable UTF-8 stdout streams with ANSI escape formatting, interactive keyboard prompts via Clack, and optional raw JSON streams (`--json`) for machine consumption in CI.
