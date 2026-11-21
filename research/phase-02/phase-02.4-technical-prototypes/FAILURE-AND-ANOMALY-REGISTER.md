# UIFORGE PHASE 02.4 — ANOMALY & FAILURE REGISTER
# Technical Prototypes Anomaly, Failure & Vulnerability Register

**Document ID:** UIF-PH02.4-FAIL-ANOMALY-REG  
**Phase:** 02.4 — High-Risk Technical Prototypes  
**Subsystem:** Quality Assurance, Systems Reliability & Security Architecture  
**Author:** Staff Reliability Engineer, Principal Systems Architect  
**Reviewer:** Enterprise Architecture Board, Independent Security Auditor  
**Execution Date:** 2026-11-21  
**Status:** COMPLETED & RESOLVED  
**Primary Evidence Manifests:** [gate1-typescript-evidence.json](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-technical-prototypes/evidence/gate1-typescript-evidence.json) | [gate2-filesystem-evidence.json](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-technical-prototypes/evidence/gate2-filesystem-evidence.json) | [gate3-visual-evidence.json](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-technical-prototypes/evidence/gate3-visual-evidence.json)

---

## 1. Executive Summary

This register exhaustively documents all technical anomalies, design failures, edge-case regressions, environment constraints, and performance bottlenecks identified during the execution of UIForge Phase 02.4.

Each entry records:
- **Identifier & Severity Rating**
- **Discovered Subsystem & Execution Context**
- **Symptom & Reproduction Mechanics**
- **Root-Cause Analysis (RCA)**
- **Mitigating Architectural Control & Resolution Status**
- **Phase 03 Implementation Directive**

---

## 2. Master Anomaly & Failure Summary Table

```
┌─────────┬──────────┬───────────────────────┬─────────────────────────────────────────────────┬──────────┐
│ Anomaly │ Severity │ Subsystem / Gate      │ Core Issue Description                          │ Status   │
├─────────┼──────────┼───────────────────────┼─────────────────────────────────────────────────┼──────────┤
│ ANOM-01 │ CRITICAL │ Gate 1 (TypeScript)   │ TS 7.1 Named-Pipe Daemon Fails in Sandboxes     │ RESOLVED │
│ ANOM-02 │ HIGH     │ Gate 1 (TypeScript)   │ ts-morph Pinning Mismatch & Performance Drag    │ RESOLVED │
│ ANOM-03 │ HIGH     │ Gate 1 (TypeScript)   │ TS Printer Destroys Code Quotes & Formatting    │ RESOLVED │
│ ANOM-04 │ CRITICAL │ Gate 2 (Filesystem)   │ Non-Atomicity of Multi-File Filesystem Writes   │ RESOLVED │
│ ANOM-05 │ CRITICAL │ Gate 2 (Filesystem)   │ Blind Rollback Data Loss Risk in Crash Windows   │ RESOLVED │
│ ANOM-06 │ HIGH     │ Gate 3 (Visual)       │ Threshold 0.10 Masks Subtle Slate Borders       │ RESOLVED │
│ ANOM-07 │ MEDIUM   │ Gate 3 (Visual)       │ CommonJS/ESM Interop Wrapper Failure in Node    │ RESOLVED │
│ ANOM-08 │ LOW      │ Gate 1 (TypeScript)   │ Missing Ambient Typings for External Modules   │ RESOLVED │
└─────────┴──────────┴───────────────────────┴─────────────────────────────────────────────────┴──────────┘
```

---

## 3. Detailed Anomaly Investigations

### ANOM-01: TS 7.1 Named-Pipe Daemon IPC Failure in Sandboxed Environments
- **Severity**: **CRITICAL** (Architectural Blocker for Default Daemon Adoption)
- **Gate**: Gate 1 — TypeScript Compiler API
- **Symptom**: Calling `typescript/sync` in containerized environments, locked-down CI/CD runners, or developer sandboxes threw:
  ```
  Error: SyncRpcChannel: timed out connecting to named pipe \\.\pipe\tsgo-sync-...
  Access is denied.
  ```
- **Root-Cause Analysis (RCA)**:
  - In `typescript@7.1.0-beta`, Microsoft introduced an experimental architecture where compilation work is delegated to a precompiled Go binary (`tsgo.exe`) communicating with Node.js via local OS IPC (Windows Named Pipes or Unix Domain Sockets).
  - Modern secure development environments (Docker with restricted IPC namespaces, sandboxed agent runtimes, and corporate Windows Group Policies) strictly forbid arbitrary named-pipe creation and inter-process socket binding.
  - Relying on this daemon in production would make UIForge non-functional in secure CI/CD and sandboxed agent environments.
- **Resolution**:
  - Validated that the native in-memory TypeScript Compiler API (`inMemoryTs`) runs 100% in-process inside the V8 engine, requires zero IPC/sockets, and parses ASTs in **44.5ms**.
  - **Directive for Phase 03**: Mandate the in-memory compiler API for `@uiforge/ast-engine`. Prohibit reliance on external named-pipe daemons.

---

### ANOM-02: `ts-morph@28.0.0` Version Pinning Incompatibility & Performance Drag
- **Severity**: **HIGH** (Ecosystem & Performance Risk)
- **Gate**: Gate 1 — TypeScript Compiler API
- **Symptom**:
  - `ts-morph@28.0.0` was unable to wrap `typescript@7.1.0-beta` modular classes.
  - In synthetic parsing benchmarks, `ts-morph` took **259.4ms** compared to **44.5ms** for the native compiler API (a **5.8x latency penalty**).
- **Root-Cause Analysis (RCA)**:
  - `ts-morph` vendors and pins `typescript@6.0.2` internally. When a project upgrades to newer TypeScript versions, `ts-morph` suffers version lag and incompatible AST node prototypes.
  - Furthermore, `ts-morph` constructs heavy dual-layered AST wrapper objects for every node, increasing memory footprint by ~400% on large multi-file codebases.
- **Resolution**:
  - Eliminated `ts-morph` from the core architecture. Built clean, lightweight AST traversal and manipulation utilities directly against the native TypeScript compiler API.
  - **Directive for Phase 03**: Zero dependency on `ts-morph` in production packages.

---

### ANOM-03: `ts.createPrinter` Destructive Code Re-Emission
- **Severity**: **HIGH** (Developer Experience & Git Diff Hygiene Blocker)
- **Gate**: Gate 1 — TypeScript Compiler API
- **Symptom**:
  - When modifying a single JSX attribute via AST node replacement and re-emitting the file via `ts.createPrinter()`, the printer rewritten all single quotes (`'`) to double quotes (`"`), removed custom developer indentation, and altered whitespace throughout untouched lines. Style preservation was **0%**.
- **Root-Cause Analysis (RCA)**:
  - The TypeScript AST printer is designed for code generation (e.g. emitting `.js` and `.d.ts` from `.ts`), not non-destructive round-trip editing of human-authored code. It does not attach or preserve trivia (whitespace, comments, quotes) with full source fidelity.
- **Resolution**:
  - Implemented **AST-Guided Surgical Text-Range Patching**:
    1. Parse the AST to identify target node start and end offsets (`node.getStart()`, `node.getEnd()`).
    2. Splice only the specific character range in the raw source buffer:
       ```typescript
       const updatedSource = source.slice(0, node.getStart()) + newText + source.slice(node.getEnd());
       ```
    3. Preserved 100% of untouched lines, comments, quotes, and whitespace. Execution time: **0.08ms**.
  - **Directive for Phase 03**: All source code mutations must use AST-guided surgical text-range patching.

---

### ANOM-04: Non-Atomicity of Multi-File Filesystem Modifications
- **Severity**: **CRITICAL** (Data Integrity & Crash Hazard)
- **Gate**: Gate 2 — Filesystem Mutation & Recovery
- **Symptom**:
  - An abrupt process kill or crash between applying File 1 and File 2 left the repository in a split, partially modified state that broke build tools.
- **Root-Cause Analysis (RCA)**:
  - Modern operating systems (Windows NTFS, Linux ext4, macOS APFS) do not provide multi-file atomic transactions. Microsoft explicitly deprecated Transactional NTFS (TxF) due to kernel complexity.
  - An application running in userland cannot guarantee atomic multi-file commits without a write-ahead journal and crash recovery protocol.
- **Resolution**:
  - Implemented a Write-Ahead Journaling protocol using native `node:sqlite` in WAL mode. Every transaction records pre-images and post-images before modifying disk. On crash restart, the recovery engine audits on-disk states against the journal and restores pre-images.
  - **Directive for Phase 03**: Reclassify Contract F from "Atomic Filesystem Transaction" to "Recoverable Multi-File Mutation Protocol".

---

### ANOM-05: Blind Rollback Data Loss Risk During Crash Windows
- **Severity**: **CRITICAL** (User Code Destruction Hazard)
- **Gate**: Gate 2 — Filesystem Mutation & Recovery
- **Symptom**:
  - If a process crashed mid-mutation and an external developer applied an emergency hotfix to one of the affected files before UIForge restarted, a naive rollback algorithm would overwrite the developer's hotfix with the pre-image, permanently destroying human work.
- **Root-Cause Analysis (RCA)**:
  - Standard transaction recovery engines assume the disk environment is quiescent during downtime. In collaborative developer environments, external actors (humans, Git checkouts, IDE formatters) can mutate disk files at any time.
- **Resolution**:
  - Formulated and verified **Invariant B** (No Blind Rollback) and **Invariant G** (Explicit Uncertainty):
    1. On recovery, compute `sha256(currentFile)`.
    2. If hash matches pre-image $\rightarrow$ Already restored, do nothing.
    3. If hash matches post-image $\rightarrow$ Partially applied, safely restore pre-image.
    4. If hash matches NEITHER $\rightarrow$ External modification detected! Refuse rollback, back up conflicting file to `.uiforge/conflicts/`, and set state to `CONFLICTED`.
  - **Directive for Phase 03**: Mandatory conflict backup and human escalation for divergent recovery states.

---

### ANOM-06: Pixelmatch 0.10 Threshold Masks Subtle Slate Borders
- **Severity**: **HIGH** (Visual Regression False-Negative Hazard)
- **Gate**: Gate 3 — Browser Verification
- **Symptom**:
  - In test scenario `MISSING_BORDER`, removing a `1px solid #e2e8f0` border from metric cards against a `#f8fafc` background resulted in **0 diff pixels** when evaluated at threshold `0.10`. The regression was completely missed.
- **Root-Cause Analysis (RCA)**:
  - The Euclidean color delta between `#e2e8f0` and `#f8fafc` is $\approx 0.0694$.
  - At threshold `0.10`, any pixel with color delta $< 0.10$ is classified as imperceptible compression/anti-aliasing noise. Consequently, 10,634 missing border pixels were ignored.
- **Resolution**:
  - Executed parametric sweep across `[0.01, 0.05, 0.10, 0.20, 0.30]`.
  - Threshold `0.05` captured all 10,634 missing border pixels and 2,762 pixels of 1px spatial shifts, while maintaining **0 false positives** on repeated baseline captures.
  - **Directive for Phase 03**: Set default visual verification threshold to `0.05`.

---

### ANOM-07: CommonJS/ESM Interop Packaging Failure in Node.js
- **Severity**: **MEDIUM** (Runtime Script Failure)
- **Gate**: Gate 3 — Browser Verification
- **Symptom**:
  - Running `const pixelmatch = require('pixelmatch')` threw `TypeError: pixelmatch is not a function`.
- **Root-Cause Analysis (RCA)**:
  - Modern dual-published npm packages (like `pixelmatch@7.1.0`) export `{ default: [Function: pixelmatch] }` when loaded via CommonJS `require()`.
- **Resolution**:
  - Normalized import: `const pixelmatch = pmModule.default || pmModule;`.
  - **Directive for Phase 03**: UIForge production modules will compile to standard ESM with rigorous dual-module interop helpers.

---

### ANOM-08: Missing Ambient Typings for External Modules in Synthetic Fixture
- **Severity**: **LOW** (Test Harness Diagnostic)
- **Gate**: Gate 1 — TypeScript Compiler API
- **Symptom**:
  - Initial run of Experiment T2 reported diagnostic `TS2307: Cannot find module 'react'` in synthetic fixtures.
- **Root-Cause Analysis (RCA)**:
  - Synthetic test fixtures were isolated and did not contain a `node_modules/` folder with `@types/react`. When TypeScript semantic checking was enabled, it flagged the missing external type declaration.
- **Resolution**:
  - Added ambient declaration `declare module 'react';` to `fixtures/types/global.d.ts` and updated the test harness to distinguish internal workspace path aliases from external npm packages.
  - **Directive for Phase 03**: AST engine must gracefully fall back to ambient declarations when inspecting partial workspaces without installed dependencies.

---

## 4. Anomaly Register Sign-Off

- **Total Registered Anomalies:** 8
- **Critical / Blocker Anomalies:** 3 (ANOM-01, ANOM-04, ANOM-05) — **ALL RESOLVED**
- **High Severity Anomalies:** 3 (ANOM-02, ANOM-03, ANOM-06) — **ALL RESOLVED**
- **Medium / Low Severity Anomalies:** 2 (ANOM-07, ANOM-08) — **ALL RESOLVED**
- **Unresolved Technical Blockers:** **0**
- **Status:** **ALL ANOMALIES ADDRESSED WITH BINDING ARCHITECTURAL CONTROLS**.
