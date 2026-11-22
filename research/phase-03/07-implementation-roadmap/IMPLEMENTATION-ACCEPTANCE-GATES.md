# UIForge Phase 03 — Implementation Acceptance Gates

**Document ID:** `UIF-PH03-ACCEPTANCE-GATES`  
**Phase:** 03 — Master Product Specification & System Architecture Freeze  
**Status:** Approved Architecture Baseline  
**Classification:** `[ARCHITECTURE-DECISION]`  
**Target:** Formal Exit Criteria for Phases 04, 05, 06, and 07  

---

## 1. Executive Summary & Objective

To prevent architectural drift, regression propagation, and premature advancement across development phases, this document establishes the formal **Implementation Acceptance Gates** for UIForge. 

Advancement between phases is governed by strict, objective, and auditable verification criteria. A phase cannot be marked complete—and subsequent work cannot be authorized—until every required gate for that phase passes with 100% compliance.

```
┌────────────────────────────────────────────────────────────────────────┐
│  Phase 03: Architecture Freeze (CURRENT)                               │
│  Gate 03: All 18 Acceptance Requirements Verified                      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ PASS
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│  Phase 04: Engineering Foundation                                      │
│  Gate 04-A: Monorepo & Build Pipeline Verification                    │
│  Gate 04-B: Core Contracts & Common Foundations Verification           │
│  Gate 04-C: Security & Transaction Storage Engine Verification         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ PASS
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│  Phase 05: Core Engines Implementation                                 │
│  Gate 05-A: AST Analysis & Coordinate Preservation Verification        │
│  Gate 05-B: Design Token & Palette Synthesis Verification              │
│  Gate 05-C: Component Discovery & Registry Verification                │
│  Gate 05-D: Mutation Engine & Rollback Verification                    │
│  Gate 05-E: Headless Evaluation & Accessibility Verification           │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ PASS
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│  Phase 06: Orchestration, Ingress Surfaces & E2E Workflows             │
│  Gate 06-A: Operating Modes & State Machine Verification               │
│  Gate 06-B: MCP 2026-07-28 Server Verification                         │
│  Gate 06-C: CLI Toolchain Verification                                 │
│  Gate 06-D: End-to-End Workflows A, B, C, D Verification               │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ PASS
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│  Phase 07: Product Hardening, Security Audit & Release Candidate       │
│  Gate 07-A: Threat Model & STRIDE Security Audit Verification          │
│  Gate 07-B: Non-Functional Requirements & Performance Benchmarks       │
│  Gate 07-C: Open-Core Boundary & License Compliance Verification       │
│  Gate 07-D: Final Documentation & Release Closure                      │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Phase 04 Acceptance Gates — Engineering Foundation

Phase 04 establishes the bedrock monorepo infrastructure, Level 0 core contracts, Level 1 utilities, and Level 2 security and storage foundations.

### Gate 04-A: Monorepo & Build Pipeline Verification
- **Purpose:** Ensure deterministic, zero-warning compilation and caching across the monorepo.
- **Criteria:**
  1. `pnpm install` completes cleanly with zero peer dependency conflicts or unhandled warnings.
  2. `pnpm run build` compiles all workspace packages using Turborepo DAG without errors.
  3. `pnpm run typecheck` (`tsc --noEmit`) passes across all packages with zero diagnostics.
  4. `madge --circular --extensions ts packages/` confirms 0 circular dependencies.
- **Verification Command:** `pnpm run verify:pipeline`
- **Required Artifacts:** `turbo.json`, `pnpm-workspace.yaml`, `.eslintrc.cjs`, root `tsconfig.json`.
- **Failure Action:** Block all development until pipeline compiles cleanly.

### Gate 04-B: Core Contracts & Common Foundations Verification
- **Purpose:** Ensure all 28 canonical contracts are implemented in pure TypeScript and validated via Zod.
- **Criteria:**
  1. `@uiforge/contracts` exports all 28 schemas matching `research/phase-03/04-contracts/DATA-SCHEMAS.md`.
  2. Zod schema validation tests achieve 100% test pass on valid sample payloads and invalid malformed payloads.
  3. All error codes in `@uiforge/contracts` strictly match `UIF-ERR-*` taxonomy (`ERROR-TAXONOMY.md`).
  4. Diagnostics and logging utilities in `@uiforge/core-utils` and `@uiforge/diagnostics` format output deterministically.
- **Verification Command:** `pnpm --filter @uiforge/contracts test && pnpm --filter @uiforge/core-utils test`
- **Required Artifacts:** Package unit test suites, TypeScript declaration bundles (`dist/index.d.ts`).
- **Failure Action:** Refactor contract schemas; zero manual type casting (`as any`) allowed.

### Gate 04-C: Security & Transaction Storage Engine Verification
- **Purpose:** Establish the sandboxed filesystem runtime, HMAC authorization tokens, and pre-image WAL storage.
- **Criteria:**
  1. Path traversal validation rejects all malicious payloads (`../`, `\..`, symlink escapes, null bytes) across Windows and POSIX.
  2. HMAC SHA-256 tokens validate diff-bound operations and expire after configured TTL (default 900s).
  3. SQLite `state.db` initializes with correct schema migrations (`M001_initial_schema.sql`).
  4. WAL engine correctly records file pre-images and achieves 100% byte-for-byte rollback under simulated crash/failure.
  5. Audit log hash chain validates tamper detection via SHA-256 parent hash linking.
- **Verification Command:** `pnpm --filter @uiforge/security test && pnpm --filter @uiforge/storage test`
- **Required Artifacts:** Storage migration files, WAL unit test harness, security attack vector test suite.
- **Failure Action:** Immediate patch of security or storage regressions. Zero unverified file I/O allowed.

---

## 3. Phase 05 Acceptance Gates — Core Engines Implementation

Phase 05 implements the domain engines: AST analysis, token synthesis, component discovery, safe mutation, and evaluation.

### Gate 05-A: AST Analysis & Coordinate Preservation Verification
- **Purpose:** Validate read-only AST route, component, and style analysis without source code corruption.
- **Criteria:**
  1. Babel parser successfully parses standard and error-tolerant JSX/TSX across React 18/19 codebases.
  2. AST analyzer correctly extracts project framework, routing architecture, and styling paradigms (`FR-01`, `FR-02`).
  3. Component prop interfaces and exported signatures are extracted with 100% precision on test corpus.
  4. Character coordinate spans `[start, end]` are verified exact, accounting for multi-byte characters and CRLF line endings.
- **Verification Command:** `pnpm --filter @uiforge/ast-analyzer test`
- **Required Artifacts:** Test fixtures of Next.js, Vite, Remix, and standard React component files.
- **Failure Action:** Refactor Babel parser configuration and span offset calculations.

### Gate 05-B: Design Token & Palette Synthesis Verification
- **Purpose:** Verify design token extraction, W3C DTCG 2025.10 compliance, and WCAG contrast calculations.
- **Criteria:**
  1. Token engine extracts colors, typography, spacing, and shadows from Tailwind configurations and CSS variables.
  2. W3C DTCG 2025.10 JSON export conforms to schema validation (`FR-04`).
  3. Color contrast calculations via `colord`/`culori` strictly match WCAG 2.2 AA (4.5:1 normal text, 3:1 large text).
  4. Token modification and palette generation maintain relational scales.
- **Verification Command:** `pnpm --filter @uiforge/token-engine test`
- **Required Artifacts:** Design token fixtures, W3C token validation suite, contrast math unit tests.
- **Failure Action:** Fix contrast math formulas and token translation mappings.

### Gate 05-C: Component Discovery & Registry Verification
- **Purpose:** Validate candidate component scanning, metadata extraction, and capability scoring.
- **Criteria:**
  1. Registry discovery identifies shadcn/ui and Radix UI components across project directory tree (`FR-05`).
  2. Capability scoring matrix correctly evaluates accessibility, responsiveness, and prop flexibility.
  3. Missing component recommendations match UIForge canonical criteria.
- **Verification Command:** `pnpm --filter @uiforge/component-discovery test`
- **Required Artifacts:** Component registry test fixture, discovery unit tests.
- **Failure Action:** Adjust AST component heuristic matching rules.

### Gate 05-D: Mutation Engine & Safe Rollback Verification
- **Purpose:** Guarantee non-destructive, character-exact source code splicing with TypeScript verification.
- **Criteria:**
  1. Source mutations are executed via coordinate slice splicing, preserving formatting and comments (`FR-08`, `ADR-008`).
  2. Pre-image WAL entry is created and committed to SQLite before any target file modification.
  3. Post-mutation TypeScript Compiler API diagnostics check detects any new compile errors.
  4. If compile errors are detected, automatic atomic rollback restores the exact original file pre-image.
  5. User modifications outside the target slice span are never overwritten or discarded.
- **Verification Command:** `pnpm --filter @uiforge/mutation-engine test`
- **Required Artifacts:** Mutation edge-case test suite (CRLF, comments, trailing commas, JSX fragments).
- **Failure Action:** Rollback logic must be 100% defect-free before proceeding.

### Gate 05-E: Headless Evaluation & Accessibility Verification
- **Purpose:** Validate automated Playwright visual testing, pixel-diffing, and axe-core accessibility auditing.
- **Criteria:**
  1. Playwright starts headless Chromium within sandbox constraints and renders test components.
  2. axe-core 4.10 audit captures accessibility violations and maps them to WCAG 2.2 AA criteria (`FR-06`).
  3. Pixelmatch produces deterministic pixel-difference diff images and reports percentage delta (`FR-07`).
  4. Multi-viewport testing (375px mobile, 768px tablet, 1280px desktop) executes cleanly.
- **Verification Command:** `pnpm --filter @uiforge/evaluator test`
- **Required Artifacts:** Evaluation test suites, baseline visual snapshot fixtures.
- **Failure Action:** Debug Playwright harness configuration and headless browser sandbox permissions.

---

## 4. Phase 06 Acceptance Gates — Orchestration, Ingress & E2E Workflows

Phase 06 unites the domain engines under the central orchestrator and exposes them through CLI and MCP ingress surfaces.

### Gate 06-A: Operating Modes & State Machine Verification
- **Purpose:** Verify that the 8 operating modes and task execution state machine transition deterministically.
- **Criteria:**
  1. State machine transitions strictly follow `STATE-MACHINES.md` (`IDLE` -> `INITIALIZING` -> `EXECUTING` -> `AWAITING_APPROVAL` -> `COMMITTING` -> `COMPLETED`).
  2. Illegal state transitions are rejected with `UIF-ERR-STATE-INVALID-TRANSITION`.
  3. Operating modes (Analyze, Design, Generate, Audit, Improve, Compare, Validate, Export) enforce non-overlapping invariants.
  4. Approval authorization state machine requires signed HMAC tokens for destructive transitions.
- **Verification Command:** `pnpm --filter @uiforge/orchestrator test`
- **Required Artifacts:** State machine transition unit tests, mode isolation verification suite.
- **Failure Action:** Fix state machine transition guards.

### Gate 06-B: MCP 2026-07-28 Server Verification
- **Purpose:** Validate AI coding agent integration via Model Context Protocol.
- **Criteria:**
  1. MCP server advertises stateless protocol version `2026-07-28` in discovery.
  2. Automatic fallback negotiation successfully handles legacy `2025-11-25` and `2024-11-05` initialize handshakes.
  3. All 7 registered MCP tools (`uiforge_analyze_project`, `uiforge_extract_tokens`, `uiforge_discover_components`, `uiforge_audit_page`, `uiforge_propose_mutation`, `uiforge_apply_mutation`, `uiforge_rollback_transaction`) execute and return structured JSON schemas.
  4. Destructive tools (`uiforge_apply_mutation`) strictly require authorization tokens.
  5. JSON-RPC error codes conform to `ERROR-TAXONOMY.md`.
- **Verification Command:** `pnpm --filter @uiforge/mcp-server test`
- **Required Artifacts:** MCP protocol compliance test suite, simulated agent client test suite.
- **Failure Action:** Reconcile MCP request handler and version negotiation headers.

### Gate 06-C: CLI Toolchain Verification
- **Purpose:** Ensure human developer terminal experience is intuitive, robust, and safe.
- **Criteria:**
  1. CLI commands (`uiforge analyze`, `uiforge tokens`, `uiforge audit`, `uiforge mutate`, `uiforge rollback`) execute properly.
  2. Interactive approval prompts render unified diffs with syntax highlighting.
  3. Non-interactive mode (`--yes` with explicit auth token or pre-configured policy) functions in CI/CD.
  4. Help menus, error formatting, and exit codes adhere strictly to POSIX conventions.
- **Verification Command:** `pnpm --filter @uiforge/cli test`
- **Required Artifacts:** CLI integration test suite, mock terminal output snapshot tests.
- **Failure Action:** Fix CLI argument parsing and error presentation.

### Gate 06-D: End-to-End Workflows Verification
- **Purpose:** Validate complete user and agent journeys from input to verified output.
- **Criteria:**
  1. **Workflow A (Brownfield Project Onboarding):** Analyzes target repo, extracts tokens, discovers components, and writes `.uiforge/` project configuration.
  2. **Workflow B (Agent-Assisted Component Generation):** Proposes component, validates against tokens and accessibility, splices into target project, and verifies TypeScript compilation.
  3. **Workflow C (Automated Design System Migration):** Ingests W3C DTCG tokens, updates CSS variables/Tailwind config, and creates verified rollback point.
  4. **Workflow D (Visual & Accessibility Audit):** Audits live page, runs axe-core, captures multi-viewport snapshots, and exports signed compliance report.
- **Verification Command:** `pnpm run test:e2e`
- **Required Artifacts:** End-to-end integration test runner, sample fixture repository.
- **Failure Action:** Trace and resolve workflow transition bottlenecks.

---

## 5. Phase 07 Acceptance Gates — Hardening, Security & Release

Phase 07 subjects the integrated platform to rigorous security penetration testing, performance benchmarking, and open-core boundary audits.

### Gate 07-A: Threat Model & STRIDE Security Audit Verification
- **Purpose:** Validate defenses against all 20 threat scenarios identified in `THREAT-MODEL.md`.
- **Criteria:**
  1. Automated fuzz testing against AST parser, JSON deserializers, and CLI input.
  2. Sandboxing verification proves zero file modification outside project root or allowed temp directories.
  3. Replay attack tests on authorization tokens fail deterministically.
  4. Audit log tampering detection test triggers immediate security alert and halts execution.
- **Verification Command:** `pnpm run audit:security`
- **Required Artifacts:** Security audit report, penetration testing execution logs.
- **Failure Action:** Mandatory patch of any high or critical vulnerability before release.

### Gate 07-B: Non-Functional Requirements & Performance Benchmarks
- **Purpose:** Validate system performance against frozen NFR baselines (`NON-FUNCTIONAL-REQUIREMENTS.md`).
- **Criteria:**
  1. Cold analysis of 1,000-component repository completes in $\le 15.0\text{s}$ (`NFR-01`).
  2. Memory footprint remains below $1.5\text{GB}$ during full project scan (`NFR-02`).
  3. Single-component AST coordinate slice calculation completes in $\le 50\text{ms}$ (`NFR-03`).
  4. Playwright headless evaluation of single page completes in $\le 2.0\text{s}$ (`NFR-04`).
  5. Atomic rollback execution completes in $\le 100\text{ms}$ (`NFR-05`).
- **Verification Command:** `pnpm run benchmark:perf`
- **Required Artifacts:** Performance benchmark telemetry log, memory profiling report.
- **Failure Action:** Profile bottlenecks and optimize AST caching or SQLite query plans.

### Gate 07-C: Open-Core Boundary & License Compliance Verification
- **Purpose:** Verify strict legal and architectural separation between Core (Apache-2.0) and Studio (Commercial).
- **Criteria:**
  1. License scanner confirms zero GPL, AGPL, or non-commercial dependencies in `@uiforge/core` packages.
  2. `@uiforge/contracts`, `@uiforge/core-utils`, and all Core engines operate completely autonomously without Studio packages installed.
  3. Studio Bridge operates strictly over decoupled WebSocket / IPC without contaminating Core with proprietary dependencies.
  4. Notice files, copyright headers, and license texts are present and verified.
- **Verification Command:** `pnpm run verify:licenses`
- **Required Artifacts:** Software Bill of Materials (SBOM) in CycloneDX / SPDX format, license compliance report.
- **Failure Action:** Remove non-compliant dependencies immediately.

### Gate 07-D: Final Documentation & Release Closure
- **Purpose:** Final verification of user documentation, API references, and release package artifacts.
- **Criteria:**
  1. All public API methods in `@uiforge/contracts` and `@uiforge/orchestrator` have complete TSDoc comments.
  2. User documentation covers CLI installation, configuration, MCP agent setup (Claude Code, Cursor, OpenCode), and troubleshooting.
  3. Phase 07 Closure Report is signed by Technical Lead and Security Auditor.
- **Verification Command:** `pnpm run verify:docs`
- **Required Artifacts:** Generated API reference documentation, release distribution packages.
- **Failure Action:** Update missing documentation.

---

## 6. Acceptance Gate Summary Matrix

| Gate ID | Phase | Name | Focus | Mandatory Pass Rate | Blocking Scope |
| :---: | :---: | :--- | :--- | :---: | :--- |
| **04-A** | 04 | Monorepo & Build Pipeline | Pipeline, Turborepo, Circularity | 100% | Phase 04 Core Development |
| **04-B** | 04 | Contracts & Utilities | 28 Schemas, Zod, Error Codes | 100% | Levels 2–6 Implementation |
| **04-C** | 04 | Security & Storage | Sandboxing, SQLite, WAL Rollback | 100% | Mutation & Orchestration |
| **05-A** | 05 | AST & Coordinates | JSX/TSX Parsing, Span Offsets | 100% | Mutation & Code Generation |
| **05-B** | 05 | Tokens & Palette | W3C DTCG 2025.10, WCAG 2.2 AA | 100% | Code Generation & Auditing |
| **05-C** | 05 | Component Discovery | shadcn/Radix Scanning, Scoring | 100% | Code Generation & Planning |
| **05-D** | 05 | Mutation & Rollback | Coordinate Splicing, TS Check | 100% | Orchestrator & CLI/MCP |
| **05-E** | 05 | Headless Evaluation | Playwright, axe-core 4.10, Diff | 100% | Compliance Auditor & E2E |
| **06-A** | 06 | Orchestrator & Modes | 8 Operating Modes, State Machine | 100% | Ingress Surfaces (CLI/MCP) |
| **06-B** | 06 | MCP 2026-07-28 Server | Protocol Discovery, Tool Calling | 100% | Agent Integration Release |
| **06-C** | 06 | CLI Toolchain | Terminal DX, Diffs, Auth Flow | 100% | Developer Release |
| **06-D** | 06 | End-to-End Workflows | Workflows A, B, C, D Verification | 100% | System Integration |
| **07-A** | 07 | Security Audit | 20 STRIDE Scenarios, Pen Testing | 100% | Production Release |
| **07-B** | 07 | Performance Benchmarks | NFRs, Memory $\le 1.5\text{GB}$, Latencies | 100% | Production Release |
| **07-C** | 07 | Open-Core & Licenses | Apache-2.0 Separation, SBOM | 100% | Legal & Commercial Release |
| **07-D** | 07 | Documentation & Closure | TSDoc, User Guides, Release Tag | 100% | General Availability (GA) |

---

## 7. Evidence & Traceability

- **PRD Reference:** `FUNCTIONAL-REQUIREMENTS.md`, `NON-FUNCTIONAL-REQUIREMENTS.md` `[ARCHITECTURE-DECISION]`
- **ADR Reference:** `ADR-001` through `ADR-011` `[PHASE-02-DECIDED]`
- **Roadmap Reference:** `PHASE-04-ENGINEERING-FOUNDATION.md`, `MVP-IMPLEMENTATION-PLAN.md` `[ARCHITECTURE-DECISION]`
- **Status:** Approved Architecture Baseline.
