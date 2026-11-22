# UIForge Phase 03 — Open Technical Questions, Assumptions & Risk Register

**Document ID:** `UIF-PH03-RISK-REGISTER`  
**Phase:** 03 — Master Product Specification & System Architecture Freeze  
**Status:** Approved Architecture Baseline  
**Classification:** `[PROPOSED]` / `[ASSUMPTION]` / `[ARCHITECTURE-DECISION]`  
**Target:** Explicit Risk Catalog & Phase 04 Empirical Validation Plan  

---

## 1. Executive Summary & Objective

In accordance with the UIForge engineering philosophy of **Evidence Over Assumptions**, architectural specifications must explicitly distinguish between:
- Frozen, proven decisions (`[PHASE-02-DECIDED]`, `[SOURCE-VERIFIED]`, `[REPO-VERIFIED]`),
- Architectural design commitments (`[ARCHITECTURE-DECISION]`), and
- Open technical hypotheses, environment-dependent assumptions, and engineering risks (`[PROPOSED]`, `[ASSUMPTION]`) that require empirical verification during implementation.

This document systematically catalogs the open technical questions, critical operating assumptions, and engineering risks identified during Phase 03. For each item, it defines:
1. Risk description and architectural impact.
2. Underlying assumptions.
3. Mitigation strategies frozen into the architecture.
4. The concrete Phase 04/05 empirical validation experiment.
5. Fallback contingency plan if the assumption is invalidated.

---

## 2. Risk & Open Question Register

```
┌────────────────────────────────────────────────────────────────────────┐
│  RISK HEAT MAP (IMPACT vs LIKELIHOOD)                                  │
│                                                                        │
│  High Impact     │ [RSK-04] WAL Locking     [RSK-01] Babel Offsets     │
│                  │ [RSK-05] TS Memory       [RSK-02] MCP Compat        │
│  Medium Impact   │ [RSK-03] Playwright CI   [RSK-06] DTCG Spec         │
│  Low Impact      │ [RSK-07] CSS Scope       [RSK-08] Windows CRLF      │
│                  └──────────────────────────────────────────────────── │
│                    Low Likelihood            High Likelihood           │
└────────────────────────────────────────────────────────────────────────┘
```

---

### RSK-01: Babel AST Coordinate Preservation & Filesystem Mutation Safety
- **Category:** AST & Mutation Engine
- **Impact:** High (Potential source code corruption if coordinates drift)
- **Likelihood:** Medium
- **Classification:** `[PROPOSED]` / `[ASSUMPTION]`
- **Description:**
  UIForge uses `@babel/parser` to discover component AST nodes and extract character coordinates `[start, end]` for surgical string-splicing insertions (`ADR-008`). While standard JSX/TSX produces exact offsets, complex real-world codebases contain edge cases: multi-byte Unicode strings (emojis, CJK characters), custom decorator syntax, unclosed or error-tolerant JSX fragments, inline TypeScript type assertions (`<Type>value` vs JSX), and unusual comment placements. Furthermore, coordinate splicing alone does not guarantee filesystem atomicity across multiple files.
- **Architectural Assumptions:**
  - `@babel/parser` with `errorRecovery: true`, `plugins: ['jsx', 'typescript', 'decorators-legacy']` reliably yields 0-indexed byte/character offsets identical to the original UTF-8/UTF-16 buffer.
  - Coordinate slicing with `slice(0, start) + newCode + slice(end)` preserves all surrounding formatting, indentation, and comments without full-file AST reprinting.
- **Mitigation Strategy:**
  1. Mandatory two-phase pre-image journaling in `.uiforge/wal/journal-<txid>.bin` with synchronous disk flush (`fsync`) prior to mutating target files.
  2. Post-mutation TypeScript Compiler API verification (`ts.createProgram`) checks for diagnostic regressions before finalizing.
  3. Pre-write hash check verifies that no external developer edit occurred between AST parsing and write execution (TOCTOU guard).
- **Phase 04/05 Validation Plan:**
  - Create a 100-file test fixture corpus containing multi-byte characters, CRLF/LF line endings, nested comments, and advanced JSX/TSX syntax.
  - Execute automated round-trip mutation tests: splice component props, verify zero byte diffs outside target span, and confirm 0 TypeScript diagnostic regressions.
- **Contingency Plan:**
  If Babel offset calculation exhibits systematic drift on specific AST structures, fall back to MagicString / Recast coordinate tracking for those specific node categories.

---

### RSK-02: MCP 2026-07-28 Modern Discovery vs Legacy Client Compatibility
- **Category:** Agent Protocol Ingress
- **Impact:** High (Agent communication failure or handshake rejection)
- **Likelihood:** Medium
- **Classification:** `[SOURCE-VERIFIED]` / `[ARCHITECTURE-DECISION]`
- **Description:**
  UIForge implements Model Context Protocol version `2026-07-28` as its modern, stateless ingress standard. However, contemporary AI coding agents in the wild (Claude Code, Cursor, OpenCode, Windsurf) utilize varying revisions of the `@modelcontextprotocol/sdk`, many of which still initiate connections via legacy `initialize` JSON-RPC handshakes (e.g., `2024-11-05` or `2025-11-25`).
- **Architectural Assumptions:**
  - Opting into automatic version negotiation (`versionNegotiation: { mode: "auto" }`) enables a single `@uiforge/mcp-server` process to advertise `2026-07-28` via `server/discover` while gracefully accepting legacy `initialize` handshakes from older clients.
  - Tool schema definitions remain compatible across protocol revisions when transported over standard STDIO transports.
  - *Evidence Qualification:* Live socket and STDIO wire tests against external running agent binaries are categorized as `[NOT-EXECUTED]` in Phase 03; compatibility is currently a validated architectural specification to be tested live in Phase 04/06.
- **Mitigation Strategy:**
  - Explicit dual-path negotiation engine in `@uiforge/mcp-server` (`ADR-003`).
  - Standard JSON-RPC 2.0 message parsing with protocol version metadata extraction from `_meta` (modern) or handshake parameters (legacy).
- **Phase 04/05 Validation Plan:**
  - Implement automated protocol integration test harness with mock clients simulating:
    1. Modern stateless client advertising `2026-07-28`.
    2. Legacy client advertising `2025-11-25`.
    3. Legacy client advertising `2024-11-05`.
  - Validate that all 7 tools are discovered, invoked, and return schema-valid results across all three client profiles.
- **Contingency Plan:**
  If a third-party agent strictly fails on modern discovery headers, provide an explicit CLI/environment configuration flag (`UIFORGE_MCP_FORCE_LEGACY=2025-11-25`) to bypass modern discovery and force legacy compatibility mode.

---

### RSK-03: Playwright Headless Browser Overhead & CI Sandbox Constraints
- **Category:** Evaluation Engine
- **Impact:** Medium (CI timeout or environment execution failure)
- **Likelihood:** Medium
- **Classification:** `[PROPOSED]` / `[ASSUMPTION]`
- **Description:**
  UIForge uses headless Chromium via Playwright to evaluate accessibility (axe-core 4.10) and capture visual snapshots for pixel-diff testing (`FR-06`, `FR-07`). In local development environments, Chromium binary availability is standard. However, in constrained CI environments (e.g., GitHub Actions without pre-installed browser binaries, Docker containers without GPU/X11 libraries, or sandboxed agent runtimes), launching Chromium may fail or introduce significant latency overhead (>5.0s per invocation).
- **Architectural Assumptions:**
  - Headless Chromium can be started with `--no-sandbox`, `--disable-setuid-sandbox`, `--disable-dev-shm-usage`, and `--disable-gpu` in standard containerized environments.
  - A persistent browser context can be shared across multiple component evaluation runs to amortize startup latency to $<200\text{ms}$ per evaluation.
- **Mitigation Strategy:**
  - Evaluator package provides graceful degradation: if browser launch fails, UIForge executes static AST accessibility and contrast analysis, logging a non-fatal warning for dynamic rendering (`NFR-04`).
  - Browser instance pooling and lazy initialization: the browser is launched only when dynamic evaluation is explicitly requested.
- **Phase 04/05 Validation Plan:**
  - Benchmark headless Chromium startup and evaluation latency in three environments:
    1. Standard local developer workstation (Windows / macOS / Linux).
    2. Minimal Alpine/Debian Docker container.
    3. Sandboxed agent subprocess without external network access.
  - Verify that static accessibility checks (contrast math, AST aria attribute validation) execute 100% reliably even when browser launch is disabled.
- **Contingency Plan:**
  Provide an evaluation tier configuration (`evaluationLevel: 'static' | 'dynamic' | 'full'`), allowing users to run complete static audits without requiring browser binaries.

---

### RSK-04: SQLite WAL Concurrency Under Multiple MCP Agent Instances
- **Category:** State & Storage Engine
- **Impact:** High (Database lock contention or session state corruption)
- **Likelihood:** Low
- **Classification:** `[SOURCE-VERIFIED]` / `[ARCHITECTURE-DECISION]`
- **Description:**
  UIForge maintains session history, component cache, and WAL transaction logs in `.uiforge/state.db` using `better-sqlite3` with Write-Ahead Logging (`PRAGMA journal_mode = WAL;`). If a developer runs multiple AI coding agents concurrently (e.g., Claude Code in terminal and Cursor in IDE), both agents may invoke UIForge MCP tools simultaneously, attempting concurrent writes to the SQLite database.
- **Architectural Assumptions:**
  - SQLite WAL mode allows concurrent readers alongside a single writer without blocking.
  - Configuring `PRAGMA busy_timeout = 5000;` provides sufficient retry window (5.0s) to resolve transient write contention between agent processes.
- **Mitigation Strategy:**
  - Enable SQLite WAL mode and set `busy_timeout = 5000;` during initialization (`ADR-009`).
  - Keep transaction write scopes minimal: open transaction, write pre-image, commit immediately ($<5\text{ms}$).
  - Read queries execute without holding write locks.
- **Phase 04/05 Validation Plan:**
  - Run concurrent stress test harness: 10 concurrent Node.js processes executing simulated mutation and analysis transactions against a single `state.db` instance over 60 seconds.
  - Verify zero `SQLITE_BUSY` or `SQLITE_LOCKED` fatal exceptions and 100% transaction log integrity.
- **Contingency Plan:**
  If multi-process lock contention occurs under extreme concurrency, implement an in-memory lockfile queue (`.uiforge/state.lock`) with exponential backoff before database connection acquisition.

---

### RSK-05: TypeScript Compiler API: Semantic Conformance vs Behavioral Invariance
- **Category:** Safety & Verification Engine
- **Impact:** High (False sense of safety if typecheck passes but logic breaks)
- **Likelihood:** Medium
- **Classification:** `[PROPOSED]` / `[ASSUMPTION]`
- **Description:**
  UIForge invokes the TypeScript Compiler API (`ts.createProgram`) to check diagnostic regressions on modified files (`ADR-008`).
  - *Critical Clarification:* A clean TypeScript compilation check guarantees **syntactic validity and semantic type conformance only**.
  - It does **not** prove runtime behavioral correctness, proper DOM rendering, event listener operation, state machine preservation, or business logic invariants. In accordance with the Phase 02 invariant verified in `verify_babel_recovery.js`: "Zero diagnostics != proof of behavioral correctness."
  - Furthermore, in massive enterprise monorepos (10,000+ TypeScript files), creating a full `ts.Program` can require 5–15 seconds and consume >1.5GB of RAM.
- **Architectural Assumptions:**
  - Incremental program creation (`ts.createIncrementalProgram`) with a persistent `ts.Program` cache reduces diagnostic check latency to $<200\text{ms}$ for single-file mutations.
  - Syntactic and semantic diagnostics can be scoped exclusively to the modified file and its immediate importers (`getSemanticDiagnostics(sourceFile)`).
- **Mitigation Strategy:**
  - Maintain an in-memory cached `ts.Program` instance in the orchestrator process, updating only modified source files via `ts.updateProgram`.
  - Clearly position the TypeScript check as Layer 2 of a 4-layer defense: Layer 1 (coordinate slicing), Layer 2 (TS type/syntax check), Layer 3 (axe-core/Playwright evaluation), Layer 4 (test suite & human review).
  - Restrict default verification scope to the mutated source file (`program.getSemanticDiagnostics(mutatedSourceFile)`).
  - Provide a configuration option (`diagnosticScope: 'file' | 'project'`) allowing developers to choose between sub-second file checks and full project compilation.
- **Phase 04/05 Validation Plan:**
  - Benchmark TypeScript Compiler API diagnostic checking across synthetic repositories of 100, 1,000, and 5,000 files.
  - Measure memory consumption, cold startup latency, and warm incremental check latency.
- **Contingency Plan:**
  If full semantic diagnostics are too slow on a given project, provide a fast-path syntax-only check (`ts.getSyntacticDiagnostics`) followed by asynchronous background project compilation.

---

### RSK-09: Multi-File Filesystem Mutation Atomicity & TOCTOU External Edits
- **Category:** Safety & Storage Engine
- **Impact:** Critical (Partial file corruption or overwriting human edits)
- **Likelihood:** Low
- **Classification:** `[ARCHITECTURE-DECISION]` / `[PROPOSED]`
- **Description:**
  SQLite transactions (`PRAGMA journal_mode = WAL;`) manage internal database atomicity in `state.db`. They **cannot** make multi-file modifications on the operating system filesystem atomic. Furthermore, a human developer or IDE may edit a target file while an agent is generating code or waiting for human approval (TOCTOU race condition).
- **Architectural Assumptions:**
  - Synchronous pre-image writing with `fs.fsyncSync` to `.uiforge/wal/journal-<txid>.bin` ensures byte-level recovery even if power is lost during a subsequent write.
  - Comparing `sha256(file)` immediately before write detects 100% of external modifications that occurred after the initial AST scan.
- **Mitigation Strategy:**
  - Two-phase journaling: write pre-image with `fsync`, write to shadow temp file, perform atomic replace, remove journal.
  - Automatic pre-image recovery on process startup.
  - Immediate abort with `UIF-ERR-TOCTOU-CONFLICT` if baseline hash mismatches disk hash at write time.
- **Phase 04 Validation Plan:**
  - Simulate process kills mid-write; verify automatic restoration of original pre-image bytes on subsequent process startup.
  - Simulate concurrent external file edit; verify that UIForge aborts without clobbering external changes.

---

### RSK-10: Contract Implementation Lifecycle (Designed vs Runtime Packages)
- **Category:** Shared Contracts & Interfaces
- **Impact:** Medium (Documentation vs implementation divergence)
- **Likelihood:** Low
- **Classification:** `[ARCHITECTURE-DECISION]`
- **Description:**
  In Phase 03, the 28 canonical contracts are specified and typed in Markdown documentation (`CONTRACT-CATALOGUE.md`, `DATA-SCHEMAS.md`). They are not yet compiled into published TypeScript workspace packages or executed in production services.
- **Architectural Assumptions:**
  - Transpiling the frozen Zod schemas and TypeScript interfaces into `@uiforge/contracts` in Phase 04 will proceed without structural divergence.
- **Mitigation Strategy:**
  - Maintain automated schema synchronization tests in Phase 04 that validate `@uiforge/contracts` exports against the Phase 03 canonical schemas.
- **Phase 04 Validation Plan:**
  - Export compiled `@uiforge/contracts` package and execute runtime Zod round-trip validation against 50 synthetic test payloads per contract.

---

### RSK-06: W3C DTCG 2025.10 Token Specification Evolution
- **Category:** Design Token Engine
- **Impact:** Low (Schema adjustment required)
- **Likelihood:** High
- **Classification:** `[SOURCE-VERIFIED]` / `[ARCHITECTURE-DECISION]`
- **Description:**
  UIForge adopts the W3C Design Tokens Community Group (DTCG) October 2025 specification as its canonical token format (`ADR-005`). While the core DTCG specification (`$value`, `$type`, `$description`) is stable, advanced token types (typography composites, shadow arrays, color spaces) may undergo minor syntactical refinements prior to final W3C standardization.
- **Architectural Assumptions:**
  - The core DTCG structure (`{ "$value": ..., "$type": ... }`) is universally accepted across Figma Tokens (Tokens Studio), Style Dictionary, and Tailwind plugins.
  - Zod schemas in `@uiforge/contracts` can accommodate optional composite extensions without breaking existing token trees.
- **Mitigation Strategy:**
  - Define extensible Zod schemas (`UIF-CTR-03`) that validate standard DTCG fields while allowing passthrough of custom `$extensions` metadata.
  - Implement bidirectional translation layers for Tailwind CSS configurations and CSS Custom Properties.
- **Phase 04/05 Validation Plan:**
  - Validate token parser against 20 production token files from Figma Tokens, Style Dictionary, and open-source design systems (e.g., Primer, Polaris).
- **Contingency Plan:**
  Maintain versioned token schema adapters (`dtcg-2025-10`, `dtcg-draft-01`, `tailwind-v3`, `tailwind-v4`).

---

### RSK-07: Windows CRLF vs POSIX LF Coordinate Offset Discrepancies
- **Category:** AST & Storage
- **Impact:** Medium (Off-by-one character splicing errors on Windows)
- **Likelihood:** Medium
- **Classification:** `[REPO-VERIFIED]` / `[ARCHITECTURE-DECISION]`
- **Description:**
  Windows environments default to CRLF (`\r\n`) line endings, while POSIX environments use LF (`\n`). If a parser or string slice implementation assumes single-byte line breaks (`\n`), character coordinate offsets will drift by 1 byte per preceding line, causing destructive code splicing.
- **Architectural Assumptions:**
  - Parsing the raw file buffer directly without prior line-ending normalization ensures that Babel AST offsets match the exact character indices of the on-disk file.
  - All file reads and writes preserve original line endings without unintended conversion.
- **Mitigation Strategy:**
  - Detect line ending format (`CRLF` vs `LF`) during file ingestion and preserve it throughout all mutation operations (`@uiforge/core-utils`).
  - Coordinate slicing functions operate strictly on raw UTF-16 character indices matching `sourceCode.slice(start, end)`.
- **Phase 04/05 Validation Plan:**
  - Execute automated mutation test suite on identical test files formatted with CRLF and LF on Windows and Linux runners.
  - Verify 100% byte-for-byte exact splicing on both platforms.
- **Contingency Plan:**
  Normalize in-memory buffers to LF for AST traversal, track an index translation map, and re-insert CRLF on write if the target file was originally CRLF.

---

## 3. Summary of Assumptions Requiring Phase 04 Empirical Validation

| ID | Topic | Primary Assumption | Verification Phase | Acceptance Threshold |
| :---: | :--- | :--- | :---: | :--- |
| **ASM-01** | AST Splicing | Coordinate slice patching preserves surrounding formatting without AST reprinting | Phase 04 / 05 | 100% exact byte match outside splice span |
| **ASM-02** | MCP Versioning | `versionNegotiation: { mode: "auto" }` handles modern and legacy clients transparently | Phase 04 / 06 | 100% pass across 2026-07-28, 2025-11-25, 2024-11-05 clients |
| **ASM-03** | Playwright CI | Headless Chromium runs reliably in containerized / sandboxed developer environments | Phase 05 / 07 | $<2.0\text{s}$ evaluation latency or graceful static fallback |
| **ASM-04** | SQLite WAL | WAL mode with 5.0s busy timeout supports concurrent agent access without lock failures | Phase 04 / 05 | 0 lock errors under 10 concurrent processes |
| **ASM-05** | TS Diagnostics | Incremental `ts.Program` checking evaluates single-file mutations in $<200\text{ms}$ | Phase 04 / 05 | $\le 200\text{ms}$ latency on 1,000-component test repo |
| **ASM-06** | W3C Tokens | DTCG 2025.10 token format accurately expresses all Tailwind colors and spacing | Phase 05 | 100% round-trip token conversion fidelity |
| **ASM-07** | Windows Line Endings | Direct buffer slicing handles CRLF without line-offset drift | Phase 04 | 0 offset errors on CRLF test fixtures |

---

## 4. Evidence & Traceability

- **PRD Reference:** `NON-FUNCTIONAL-REQUIREMENTS.md` `[ARCHITECTURE-DECISION]`
- **ADR Reference:** `ADR-003`, `ADR-008`, `ADR-009` `[PHASE-02-DECIDED]`
- **Roadmap Reference:** `PHASE-04-ENGINEERING-FOUNDATION.md`, `IMPLEMENTATION-ACCEPTANCE-GATES.md` `[ARCHITECTURE-DECISION]`
- **Status:** Approved Architecture Baseline.
