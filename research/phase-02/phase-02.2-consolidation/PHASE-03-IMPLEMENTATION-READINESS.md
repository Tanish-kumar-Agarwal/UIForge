# UIForge Phase 02.2 — Phase 03 Implementation Readiness & Engineering Blueprint

**Document Identifier:** `UIF-PH02.2-PHASE03-READINESS`  
**Classification:** Phase 03 Implementation Roadmap, Package Specifications & Engineering Sequencing  
**Parent Phase:** Phase 02.2 — Deep Technical Audit, Architecture Decisions & Cross-Workstream Consolidation  
**Target Standard:** Principal Software Architect + Principal Frontend Infrastructure Engineer + Lead Engineering Manager  
**Status:** COMPLETE & CONSOLIDATED  
**Date:** November 21, 2026  

---

## 1. Executive Mission & Engineering Readiness Assessment

This document transitions UIForge from **Phase 02 (Research & Architecture Consolidation)** into **Phase 03 (Production Implementation)**.

To prevent premature or unstructured coding, Phase 03 execution is strictly organized around **topological dependency relationships**. We do not build modules in arbitrary workstream order (WS-1 to WS-5). Instead, engineering progresses in four distinct, dependency-gated stages:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        PHASE 03 IMPLEMENTATION STAGES                                  │
├─────────┬───────────────────────────────────────────────┬──────────────────────────────┤
│ Stage   │ Focus Area & Packages                         │ Prerequisites                │
├─────────┼───────────────────────────────────────────────┼──────────────────────────────┤
│ Stage 1 │ Foundation Root: `@uiforge/core`              │ Phase 02.2 Contracts         │
│ Stage 2 │ Intelligence Engines: AST, Tokens, Components │ Stage 1 Core Types           │
│ Stage 3 │ Execution & Adapters: Transforms, CSS, SDK    │ Stage 2 Intelligence Models  │
│ Stage 4 │ Ingress & Verification: Playwright, MCP, CLI  │ Stage 3 Execution Engine     │
└─────────┴───────────────────────────────────────────────┴──────────────────────────────┘
```

---

## 2. Module Implementation Specifications & Complexity Matrix

Every package in the monorepo is specified with its inputs, outputs, prerequisites, acceptance criteria, and complexity classification:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        PACKAGE IMPLEMENTATION MATRIX                                   │
├──────────────────────────────────┬───────────┬────────────┬────────────────────────────┤
│ Package Name                     │ Stage     │ Complexity │ Primary Risk Factor        │
├──────────────────────────────────┼───────────┼────────────┼────────────────────────────┤
│ `@uiforge/core`                  │ Stage 1   │ Low        │ Contract schema rigidity   │
│ `@uiforge/project-intelligence`  │ Stage 2   │ High       │ AST parser performance/mem │
│ `@uiforge/tokens`                │ Stage 2   │ Medium     │ DTCG alias cycle resolution│
│ `@uiforge/component-intelligence`│ Stage 2   │ Medium     │ RSC tier heuristic accuracy│
│ `@uiforge/transforms`            │ Stage 3   │ High       │ SQLite journal crash atom. │
│ `@uiforge/styling`               │ Stage 3   │ Medium     │ Specificity cascade loss   │
│ `@uiforge/registry`              │ Stage 3   │ Low        │ Ingestion SSRF defense     │
│ `@uiforge/agent-sdk`             │ Stage 3   │ Medium     │ Context token compression  │
│ `@uiforge/verification`          │ Stage 4   │ High       │ Playwright headless CI flak│
│ `@uiforge/mcp-server`            │ Stage 4   │ Medium     │ Protocol 2026-07-28 compat │
│ `@uiforge/cli`                   │ Stage 4   │ Medium     │ Interactive diff terminal  │
│ `@uiforge/studio`                │ Deferred  │ High       │ Desktop GUI complexity     │
└──────────────────────────────────┴───────────┴────────────┴────────────────────────────┘
```

---

### Detailed Package Engineering Specifications

#### 1. `@uiforge/core` (Stage 1: Foundation Root)
- **Purpose:** Foundational types, shared contracts, universal error taxonomy, and cryptographic digest utilities.
- **Complexity:** **Low**. Pure TypeScript definitions and Zod validation schemas.
- **Inputs & Outputs:** Inputs: Raw config/options. Outputs: Validated contract envelopes and typed errors.
- **Security Requirements:** Path canonicalization utilities; fail-closed schema validators.
- **Acceptance Criteria:** 100% unit test coverage for all 10 contract schemas; zero external binary dependencies.
- **Prerequisites:** None. First package to implement.

#### 2. `@uiforge/project-intelligence` (Stage 2: WS-1 Domain)
- **Purpose:** Filesystem indexing, Next.js / Remix route discovery, AST/CST syntax analysis, and `ProjectSnapshot` generation.
- **Complexity:** **High**. Orchestrates multiple native Rust parsers (`oxc-parser`, `@ast-grep/napi`) and TypeScript Compiler API.
- **Inputs & Outputs:** Inputs: Target `repositoryRoot`. Outputs: Immutable `ProjectSnapshot` (`uiforge.contract.project-intelligence.v1`).
- **Security Requirements:** Read-only access; path traversal guards; exclude `.git`, `node_modules`, `.env*`.
- **Acceptance Criteria:** Scans 1,000-file repository in <500ms; identifies App Router vs Pages Router routes with 100% accuracy.
- **Prerequisites:** `@uiforge/core`.

#### 3. `@uiforge/tokens` (Stage 2: WS-3 Domain)
- **Purpose:** W3C DTCG 2025.10 design token parsing, color space mathematics (colorSpace-specific components, e.g. `[L, C, H]` for OKLCH, `[r, g, b]` for sRGB), token group inheritance, and multi-dimensional alias resolution.
- **Complexity:** **Medium**. Requires recursive graph traversal and cycle detection algorithms.
- **Inputs & Outputs:** Inputs: DTCG JSON / CSS Variables. Outputs: `ResolvedTokenTree` (`uiforge.contract.design-token.v1`).
- **Security Requirements:** Disallow prototype pollution during `$value` parsing.
- **Acceptance Criteria:** Lossless round-tripping of all 13 DTCG token types; detects and reports circular token references without crashing.
- **Prerequisites:** `@uiforge/core`.

#### 4. `@uiforge/component-intelligence` (Stage 2: WS-2 Domain)
- **Purpose:** Component discovery, prop API extraction, 4-tier RSC taxonomy classification, and the 2-stage weighted component selection engine.
- **Complexity:** **Medium**. Relies on AST AST-grep queries to detect client hooks (`useState`, `useForm`) and directive placement.
- **Inputs & Outputs:** Inputs: `ProjectSnapshot`. Outputs: `ComponentCatalog` (`uiforge.contract.component-intelligence.v1`).
- **Security Requirements:** Evaluates component license manifests before admitting into catalog.
- **Acceptance Criteria:** Correctly tags Tier 1 Server-Pure vs Tier 2 Client Entry components on Next.js 15+ codebases.
- **Prerequisites:** `@uiforge/core`, `@uiforge/project-intelligence`.

#### 5. `@uiforge/transforms` (Stage 3: WS-1 Domain)
- **Purpose:** Surgical, non-destructive CST code transformations, unified diff generation, write-ahead transaction journaling (`.uiforge/journal.db`), and automated rollback.
- **Complexity:** **High**. Requires rock-solid transactional crash recovery and TOCTOU disk hash validation.
- **Inputs & Outputs:** Inputs: `ChangeProposal` + `ApprovalToken`. Outputs: Committed file modifications on disk.
- **Security Requirements:** 5-level security ladder gatekeeper; verifies pre-image SHA-256 before writing; enforces OS path boundary checks.
- **Acceptance Criteria:** Simulating process crash (`process.exit(1)`) mid-write leaves working tree 100% restored to pre-image state.
- **Prerequisites:** `@uiforge/core`, `@uiforge/project-intelligence`.

#### 6. `@uiforge/styling` (Stage 3: WS-3 Domain)
- **Purpose:** Cross-paradigm styling conversion (Tailwind v3/v4 `@theme`, CSS Modules, Sass), specificity conflict analysis, and Style Dictionary v5.8.0 integration.
- **Complexity:** **Medium**. Maps utility classes to CSS rule blocks and calculates specificity loss.
- **Inputs & Outputs:** Inputs: `ResolvedTokenTree` + Source CSS. Outputs: Target CSS files + `StylingTransformationContract`.
- **Security Requirements:** Disallows malicious `@import` or `url()` directives.
- **Acceptance Criteria:** Converts Tailwind color tokens to CSS Modules custom properties with documented conversion loss scores.
- **Prerequisites:** `@uiforge/core`, `@uiforge/tokens`.

#### 7. `@uiforge/registry` (Stage 3: WS-3 Domain)
- **Purpose:** Ingesting external shadcn v1 component registries, validating payload SHA-256 digests, and generating SPDX provenance manifests.
- **Complexity:** **Low**. HTTP client with SSRF blocking and JSON validation.
- **Inputs & Outputs:** Inputs: Registry URL. Outputs: `RegistryResourceContract` + Updated `provenance.json`.
- **Security Requirements:** Strict SSRF blocking (no RFC 1918 IPs); target path traversal checks.
- **Acceptance Criteria:** Ingests all 12 official shadcn registry types and records upstream Git commit hashes.
- **Prerequisites:** `@uiforge/core`, `@uiforge/component-intelligence`, `@uiforge/tokens`.

#### 8. `@uiforge/agent-sdk` (Stage 3: WS-5 Domain)
- **Purpose:** Context packing (>90% token compression), tool schema definitions, and typed Node.js programmatic API for external agent frameworks.
- **Complexity:** **Medium**. Heuristic AST pruning to extract minimal prop interfaces without implementation bodies.
- **Inputs & Outputs:** Inputs: `ProjectSnapshot` + Domain State. Outputs: Compact Context Markdown + Executable Tool Callbacks.
- **Security Requirements:** Secret redaction pipeline strips API keys and credentials before emitting context.
- **Acceptance Criteria:** Demonstrates >90% character/token reduction on standard 10-route fixtures while preserving essential prop APIs.
- **Prerequisites:** `@uiforge/core`, `@uiforge/project-intelligence`, `@uiforge/transforms`.

#### 9. `@uiforge/verification` (Stage 4: WS-4 Domain Adapter)
- **Purpose:** Headless browser runner, Playwright v1.65.1 lifecycle management, Pixelmatch v8 perceptual visual regression (OKLab/HyAB), WCAG 2.2 accessibility scanning, and layout geometry overflow evaluation.
- **Complexity:** **High**. Manages headless browser processes, race conditions, dynamic animations, and multi-viewport rendering.
- **Inputs & Outputs:** Inputs: Target URL + Viewports. Outputs: `BrowserVerificationContract` with `recordDigest`.
- **Security Requirements:** Network isolation blocks external web navigations; restricts to local development server.
- **Acceptance Criteria:** Evaluates 55 WCAG 2.2 criteria (12 automated, 23 traced); detects horizontal document overflow (`HTML.scrollWidth > innerWidth`).
- **Prerequisites:** `@uiforge/core`. Dynamically loaded by CLI and Agent SDK.

#### 10. `@uiforge/mcp-server` (Stage 4: WS-5 Protocol Adapter)
- **Purpose:** Model Context Protocol (MCP) server adhering to specification `2026-07-28` (modular v2 SDK: `@modelcontextprotocol/server`, `@modelcontextprotocol/core`). Exposes stdio and Streamable HTTP POST transports.
- **Complexity:** **Medium**. Protocol handshake, capability negotiation, and tool execution wrapping.
- **Inputs & Outputs:** Inputs: JSON-RPC MCP requests. Outputs: JSON-RPC MCP responses.
- **Security Requirements:** Rejects unauthenticated Level 2+ tool calls; issues structured approval challenge responses.
- **Acceptance Criteria:** Claude Code, Cursor, and Antigravity can connect via stdio and HTTP POST, discover all 7 tool families, and receive compact context.
- **Prerequisites:** `@uiforge/core`, `@uiforge/agent-sdk`.

#### 11. `@uiforge/cli` (Stage 4: Developer Interface)
- **Purpose:** Terminal CLI executable (`uiforge`). Commands for analysis, token conversion, change review, interactive approval prompts, and rollback.
- **Complexity:** **Medium**. Terminal formatting, interactive diff rendering (`@clack/prompts`), and process exit code management.
- **Inputs & Outputs:** Inputs: Terminal arguments. Outputs: Terminal UI + JSON output.
- **Security Requirements:** Prompts developer for Level 2+ operations; displays exact unified diffs.
- **Acceptance Criteria:** `uiforge analyze`, `uiforge tokens`, `uiforge verify`, and `uiforge rollback` execute cleanly from the terminal.
- **Prerequisites:** Tiers 1 through 3.

---

## 3. High-Risk Capabilities: Phase 02.4 Decision Gates & Prototype Criteria

Before full production implementation begins in Phase 03, the following three high-risk technical capabilities must be prototyped and validated in **Phase 02.4 (System Synthesis & Proof-of-Concept)** as explicit **Architectural Decision Gates**:

### Decision Gate 1: TypeScript 7.1 Programmatic Compiler API Feasibility (Phase 02.4 Gate)
- **Problem & Risk:** TypeScript 7.0 native Go engine omitted the JS programmatic API. TypeScript 7.1 Beta introduces new modular programmatic entry points (`typescript/sync`, `typescript/async`, `typescript/fs`) scheduled for stable release November 24, 2026.
- **Prototype Evaluation:** Ingest stable TypeScript 7.1 in a dedicated benchmark harness; execute AST visitor traversal, syntactic diagnostics, and symbol checking on the Next.js 15 test fixtures.
- **Confirmation Outcome:** If TypeScript 7.1 stable executes cleanly without native crashes, confirm migration for `@uiforge/project-intelligence`.
- **Fallback / Revisit Outcome:** If TypeScript 7.1 programmatic APIs exhibit instability or memory regressions, retain `@typescript/typescript6@6.0.2` + `ts-morph@28.0.0` as the primary production engine (reconfirming ADR-002).

### Decision Gate 2: SQLite Write-Ahead Journal Crash Recovery & Filesystem Consistency (Phase 02.4 Gate)
- **Problem & Risk:** Arbitrary multi-file filesystem operations are not ACID. Process termination (`SIGKILL`, power loss) mid-write can corrupt target repositories unless the write-ahead journal and rollback handler reliably restore pre-images.
- **Prototype Evaluation:** Execute multi-file mutations across 5+ files while simulating sudden process aborts (`process.exit(1)`) at random write intervals on both Windows and POSIX environments. Test startup recovery.
- **Confirmation Outcome:** If startup recovery detects `PENDING` transactions, compares disk state with pre-image hashes, and restores 100% of modified files, confirm Stage 3 implementation of `@uiforge/transforms` (reconfirming ADR-008).
- **Fallback / Revisit Outcome:** If SQLite journal locks persist or OS file replacement fails, redesign execution to stage changes into isolated Git shadow worktrees or dedicated staging directories prior to committing Stage 3.

### Decision Gate 3: Cross-Platform Headless Playwright Rendering Calibration (Phase 02.4 Gate)
- **Problem & Risk:** Sub-pixel antialiasing differences across Linux CI (e.g. FreeType) and Windows desktop (DirectWrite) can produce false-positive visual regressions in Pixelmatch v8 on identical TSX code.
- **Prototype Evaluation:** Execute headless Chromium, Firefox, and WebKit rendering of identical component fixtures across Linux and Windows; compare screenshot buffers with Pixelmatch v8 perceptual OKLab distances.
- **Confirmation Outcome:** If calibrating perceptual threshold (0.05 to 0.15) and applying dynamic text masking eliminates cross-platform false positives while reliably catching true 1px layout regressions, confirm Stage 4 implementation of `@uiforge/verification` (reconfirming ADR-009, ADR-011).
- **Fallback / Revisit Outcome:** If cross-OS false positives persist, mandate that visual regression comparisons be strictly constrained to same-OS, same-engine golden baselines.

---

## 4. Deferred Capabilities (Explicit Phase 04+ Scope)

To preserve engineering velocity and avoid premature distributed complexity, the following capabilities are explicitly deferred:

1. **UIForge Studio GUI:** Graphical electron/web workspace is deferred to Phase 04. Phase 03 focuses 100% on headless Core, CLI, and MCP adapters.
2. **Autonomous Multi-Agent Swarms:** Multi-agent coordination (planner, coder, reviewer) is deferred. Phase 03 focuses on Single-Agent Primacy where UIForge serves as the deterministic oracle for one external calling agent.
3. **Cloud-Hosted Team Registries:** Hosted private component mirrors and cloud audit log syncing are deferred to enterprise Phase 05.
