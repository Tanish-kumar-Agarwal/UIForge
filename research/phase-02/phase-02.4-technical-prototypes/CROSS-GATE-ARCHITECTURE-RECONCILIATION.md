# UIFORGE PHASE 02.4 — ARCHITECTURAL RECONCILIATION
# Cross-Gate Architecture Reconciliation & Contract Revisions

**Document ID:** UIF-PH02.4-CROSS-GATE-RECON  
**Phase:** 02.4 — High-Risk Technical Prototypes  
**Subsystem:** Core Architecture & Cross-Contract Integration  
**Author:** Principal Software Architect, Staff Systems Engineer  
**Reviewer:** Enterprise Architecture Board, Security Assurance Lead  
**Execution Date:** 2026-11-21  
**Primary Evidence Manifest:** [cross-gate-reconciliation.json](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-technical-prototypes/evidence/cross-gate-reconciliation.json)  
**Parent Specification:** Phase 02.2 Master Technical Architecture (`UIF-PH02.2-ARCH-MASTER`)

---

## 1. Executive Overview

During Phase 02.2, UIForge formulated eight core interface contracts (Contracts A through H) governing project intelligence, component discovery, token extraction, design intent, change approval, filesystem mutation, browser verification, and agent integration.

Phase 02.4 subjected the three highest-risk architectural assumptions to rigorous empirical validation through disposable prototypes:
- **Gate 1 (TypeScript Engine)**: Evaluated AST discovery, semantic type analysis, and source preservation.
- **Gate 2 (Filesystem Engine)**: Evaluated multi-file transactional mutations, crash recovery, and external user-conflict preservation.
- **Gate 3 (Browser Engine)**: Evaluated headless browser determinism, visual defect sensitivity, threshold calibration, and modal accessibility verification.

This document synthesizes the empirical evidence from Gates 1, 2, and 3, establishes how these discoveries reconcile with Phase 02.2 architecture, and formalizes mandatory contract modifications required before Phase 03 implementation.

---

## 2. Cross-Gate Reconciliation Matrix

```
┌─────────────────┬──────────────────────────────┬──────────────────────────────┬──────────────────────────────┐
│ Architectural   │ Phase 02.2 Initial Assumption│ Empirical Prototype Finding  │ Reconciled Phase 03 Mandate  │
│ Subsystem       │ (Pre-Prototype Specification)│ (Phase 02.4 Evidence)        │ (Post-Prototype Directive)   │
├─────────────────┼──────────────────────────────┼──────────────────────────────┼──────────────────────────────┤
│ Gate 1:         │ Direct adoption of TS 7.1    │ TS 7.1 native Go daemon      │ Adopt HYBRID AST MODEL:      │
│ AST Parsing &   │ Compiler API or ts-morph for │ fails over named pipes in    │ In-memory TS Compiler API for│
│ Code Generation │ AST discovery and full AST   │ sandboxes (Access Denied).   │ read-only scanning/typecheck;│
│ (Contract A)    │ transformation/printing.     │ TS Printer ruins quotes/style│ AST-guided surgical text-    │
│                 │                              │ (0% style preservation).     │ patching for code mutations. │
├─────────────────┼──────────────────────────────┼──────────────────────────────┼──────────────────────────────┤
│ Gate 2:         │ "ACID Transactional Engine"  │ Native OS filesystems cannot │ Formalize as RECOVERABLE     │
│ Filesystem      │ guaranteeing atomic multi-   │ provide multi-file atomicity.│ MULTI-FILE MUTATION PROTOCOL │
│ Mutation        │ file updates like a database │ SQLite WAL provides metadata │ with mandatory TOCTOU checks,│
│ (Contract F)    │ transaction.                 │ durability; user edits need  │ private staging, and isolated│
│                 │                              │ conflict preservation.       │ .uiforge/conflicts/ backups. │
├─────────────────┼──────────────────────────────┼──────────────────────────────┼──────────────────────────────┤
│ Gate 3:         │ Playwright visual comparison │ Visual threshold of 0.10     │ Calibrate default threshold  │
│ Browser         │ with generic 0.10 color      │ fails to detect missing slate│ to 0.05. Pinned headless     │
│ Verification    │ threshold for layout check.  │ borders (10,634 pixels       │ Chromium with zero-motion and│
│ (Contract G)    │                              │ masked as noise).            │ explicit font loading yields │
│                 │                              │                              │ 0 false positives.           │
└─────────────────┴──────────────────────────────┴──────────────────────────────┴──────────────────────────────┘
```

---

## 3. Detailed Cross-System Findings & Architectural Corrections

### 3.1 Gate 1 to Contract A: The Hybrid AST Architecture
- **Initial Assumption**: Phase 02.2 assumed that either `ts-morph` or the new `typescript@7.1.0-beta` compiler daemon could be directly embedded into `@uiforge/ast-engine` to parse, inspect, transform, and emit source code.
- **Empirical Reality**:
  1. `typescript@7.1.0-beta` introduced a client/daemon architecture relying on Windows Named Pipes (`\\.\pipe\tsgo-sync-...`). In sandboxed environments (Docker, CI/CD, restricted enterprise hosts), named pipe IPC is blocked with `Access is denied`.
  2. `ts-morph@28.0.0` is pinned internally to `typescript@6.0.2` and cannot wrap TS 7.1 modular classes. Furthermore, `ts-morph` incurred a **5.8x performance penalty** compared to raw in-memory compiler APIs (259.4ms vs 44.5ms).
  3. AST-based code emission using `ts.createPrinter` failed human formatting preservation: it forcibly altered single quotes to double quotes, normalized indentations, and stripped contextual whitespace.
  4. In contrast, **AST-guided surgical text-range patching** performed targeted token replacement in **0.08ms** while preserving 100% of surrounding comments, formatting, and quote conventions.
- **Contract A Reconciled Mandate**:
  - Module `@uiforge/ast-engine` must implement the **Hybrid AST Model**:
    - **Read-Only Analysis Layer**: Direct in-memory TypeScript Compiler API (`ts.createSourceFile`, `ts.createProgram`, `ts.createIncrementalProgram`) running 100% in-process inside V8 without named pipes.
    - **Mutation Layer**: AST-guided surgical text-range replacer utilizing AST node source positions (`node.getStart()`, `node.getEnd()`) to slice and splice text without invoking `ts.createPrinter`.

---

### 3.2 Gate 2 to Contract F: The Recoverable Mutation Protocol
- **Initial Assumption**: Phase 02.2 defined Contract F as an "ACID Transactional Engine" that commits multi-file changes atomically.
- **Empirical Reality**:
  1. Cross-file atomicity cannot be achieved on standard operating system filesystems (Windows NTFS, ext4, APFS). In a multi-file transformation affecting 5 files, an unexpected power loss or process kill between file 2 and file 3 leaves the working tree partially mutated.
  2. SQLite WAL mode provides true ACID guarantees for metadata and write-ahead journaling, but physical disk files must be staged and applied sequentially.
  3. If an external developer edits a file during a crash interval, a naive "rollback" destroys human work.
- **Contract F Reconciled Mandate**:
  - Contract F is formally redesignated as the **Recoverable Multi-File Mutation Protocol**.
  - All operations must proceed through 5 mandatory phases:
    1. *Staging*: Write proposed files to `.uiforge/staging/<txId>/post/` and pre-images to `pre/`.
    2. *Journaling*: Commit pre-image and post-image SHA-256 hashes to SQLite WAL (`transactions` and `journal_files`).
    3. *TOCTOU Revalidation*: Recompute disk hash immediately before each individual atomic move (`fs.renameSync`). If on-disk hash $\ne$ pre-image hash, immediately abort.
    4. *Conflict Containment*: If recovery encounters an external modification during post-crash audit, refuse blind rollback, copy the user's file to `.uiforge/conflicts/`, flag the transaction as `CONFLICTED`, and escalate to human review.
    5. *Clean Commit*: Once all files succeed, mark transaction `COMMITTED` in SQLite and purge staging artifacts.

---

### 3.3 Gate 3 to Contract G: Calibrated Verification & Multi-Modal Evidence
- **Initial Assumption**: Phase 02.2 proposed an off-the-shelf Playwright screenshot comparison with a coarse `0.10` diff threshold.
- **Empirical Reality**:
  1. Subtle modern UI design systems utilize low-contrast border tokens (e.g. `border-slate-200` / `#e2e8f0` against white or `#f8fafc`). The color distance $\Delta C \approx 0.0694$. A `0.10` threshold completely masks missing borders, yielding zero detected pixels across 10,634 affected border pixels.
  2. When calibrated to `0.05`, `pixelmatch` reliably caught all 10,634 border pixels, 1px layout shifts, color shifts, hidden icons, and spacing regressions without a single false-positive on baseline runs.
  3. Playwright headless Chromium Shell with explicit font stabilization (`document.fonts.ready`), disabled animations, and fixed device scale factor (`1.0`) achieved **100% deterministic baseline reproducibility (0 pixel diff across repeated runs)**.
- **Contract G Reconciled Mandate**:
  - Standardize on `threshold = 0.05` as the authoritative default comparison threshold.
  - Require multi-viewport geometry evaluation (Mobile 375px, Tablet 768px, Desktop 1280px) to verify zero document-level horizontal scrolling.
  - Require behavioral accessibility verification: modal focus trapping, Escape dismissal, focus restoration, and ARIA snapshot extraction.
  - Package all verification outcomes into a cryptographic Contract G JSON envelope binding snapshot IDs and image SHA-256 hashes.

---

## 4. End-to-End Integrated Lifecycle Pipeline

The reconciled architecture defines the exact sequential pipeline through which all UIForge transformations will flow in Phase 03:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                      UIFORGE RECONCILED TRANSFORMATION LIFECYCLE                       │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│ 1. INGESTION & DISCOVERY (Contract A - In-Memory TS Compiler API)                      │
│    └── Scan workspace, construct AST SourceFiles in V8 memory (0 Named Pipes)          │
│    └── Resolve symbol references, path aliases, and circular dependencies              │
│                                                                                        │
│ 2. DESIGN & TRANSFORMATION PLANNING (Contracts B, C, D)                                │
│    └── Map design tokens and compute component AST ranges (start/end offsets)          │
│    └── Generate candidate text modifications via AST-guided surgical patching          │
│                                                                                        │
│ 3. CHANGE AUTHORIZATION & APPROVAL (Contracts E, H)                                    │
│    └── Present unified 3-way diff (pre-image, candidate, AST scope) to user            │
│    └── Enforce explicit cryptographic approval gate                                    │
│                                                                                        │
│ 4. RECOVERABLE FILESYSTEM MUTATION (Contract F - SQLite WAL)                           │
│    └── Stage candidate files to .uiforge/staging/<txId>/                               │
│    └── Record SHA-256 pre-images in SQLite WAL journal                                 │
│    └── Execute TOCTOU revalidation -> Sequential atomic moves                         │
│    └── (On failure/crash: automatic rollback or conflict backup to .uiforge/conflicts/)│
│                                                                                        │
│ 5. BROWSER VERIFICATION & EVIDENCE CAPTURE (Contract G - Playwright Headless)          │
│    └── Spin up local Vite/Next.js dev server                                           │
│    └── Capture viewports (375, 768, 1280) with fonts stabilized & animations disabled │
│    └── Run pixelmatch diffing at calibrated 0.05 threshold                             │
│    └── Execute ARIA accessibility inspection & modal focus trap checks                 │
│    └── Emit Contract G Evidence Envelope signed with SHA-256 image digests             │
│                                                                                        │
│ 6. FINAL HUMAN / AGENT CLOSURE                                                         │
│    └── Present multi-modal evidence (diff image, ARIA tree, diff percentage)           │
│    └── Mark transaction COMMITTED and purge staging cache                              │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. End-to-End Latency & Performance Budget

Based on empirical prototype benchmarks, the reconciled transformation pipeline achieves outstanding performance characteristics:

```
┌─────────────────────────────────────────────────────────────┬──────────────────────────┐
│ Pipeline Stage                                              │ Observed Latency Range   │
├─────────────────────────────────────────────────────────────┼──────────────────────────┤
│ AST Project Ingestion & Typecheck (Cached Incremental)      │ 40 ms – 65 ms            │
│ AST Symbol Resolution & Range Calculation                   │ 8 ms – 15 ms             │
│ Surgical Text-Range Patching (per component file)           │ 0.08 ms – 0.15 ms        │
│ SQLite WAL Transaction Preparation & Pre-Image Staging      │ 3 ms – 5 ms              │
│ TOCTOU Verification & Sequential Atomic Move (per file)     │ 1.5 ms – 3 ms            │
│ SQLite WAL Commit Record Finalization                       │ 0.8 ms – 1.5 ms          │
│ Playwright Viewport Capture & Pixelmatch Diff (1280x800)    │ 90 ms – 140 ms           │
│ ARIA Tree Extraction & Interaction Check                    │ 30 ms – 50 ms            │
├─────────────────────────────────────────────────────────────┼──────────────────────────┤
│ TOTAL SYSTEM OVERHEAD (Excluding External Dev Server / LLM) │ ~175 ms – 280 ms         │
└─────────────────────────────────────────────────────────────┴──────────────────────────┘
```
**Conclusion**: UIForge's internal orchestration overhead is approximately **0.25 seconds**, confirming that the platform will feel instantaneous to developers and autonomous coding agents.

---

## 6. Binding Contract Revisions for Phase 03

The following formal modifications are hereby incorporated into the UIForge Architecture Registry:

### Revision CR-01: Contract A (`uiforge.contract.project-intelligence.v1`)
- **Clause 4.1**: Prohibits reliance on external named-pipe daemons (`tsgo`) in production packages until container named-pipe security models mature.
- **Clause 4.2**: Prohibits AST code re-emission via `ts.createPrinter` for existing user source files. Mandates AST-guided surgical text-range patching.

### Revision CR-02: Contract F (`uiforge.contract.filesystem-mutation.v1`)
- **Clause 2.1**: Redesignates subsystem as "Recoverable Multi-File Mutation Protocol".
- **Clause 3.4**: Mandates Node.js native `node:sqlite` in WAL mode (`journal_mode = WAL`, `synchronous = NORMAL`).
- **Clause 5.2**: Mandates pre-application TOCTOU cryptographic SHA-256 revalidation.
- **Clause 6.1**: Mandates conflict containment directory `.uiforge/conflicts/` with zero blind rollbacks (Invariants A, B, G).

### Revision CR-03: Contract G (`uiforge.contract.browser-verification.v1`)
- **Clause 3.2**: Sets authoritative default comparison threshold to `0.05`.
- **Clause 4.1**: Mandates Chromium Headless Shell with `deviceScaleFactor: 1.0`, `--font-render-hinting=none`, and `document.fonts.ready`.
- **Clause 5.3**: Requires Contract G JSON Evidence Envelope to embed SHA-256 digests of baseline, current, and diff images.

---

## 7. Architectural Reconciliation Sign-Off

- **Reviewing Authorities:** Principal Software Architect, Staff Systems Engineer, Verification Lead.
- **Cross-Gate Status:** All three gates reconciled without unresolvable contradictions.
- **Readiness for Phase 03:** **APPROVED WITH BINDING CONTRACT REVISIONS CR-01, CR-02, CR-03**.
