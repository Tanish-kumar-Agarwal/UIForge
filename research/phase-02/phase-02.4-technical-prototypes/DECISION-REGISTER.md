# UIFORGE PHASE 02.4 — PROTOTYPE DECISION REGISTER
# Binding Prototype Decision Records (PDEC-01 through PDEC-08)

**Document ID:** UIF-PH02.4-DECISION-REG  
**Phase:** 02.4 — High-Risk Technical Prototypes  
**Subsystem:** Architectural Governance & Decision Records  
**Author:** Principal Software Architect, Staff Systems Engineer  
**Reviewer:** Enterprise Architecture Board  
**Execution Date:** 2026-11-21  
**Status:** APPROVED & BINDING  
**Primary Evidence Manifest:** [cross-gate-reconciliation.json](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-technical-prototypes/evidence/cross-gate-reconciliation.json)

---

## 1. Executive Summary

This register contains the eight binding Prototype Decision Records (PDEC-01 through PDEC-08) established through empirical testing in UIForge Phase 02.4.

These decisions supersede any conflicting preliminary assumptions documented in Phase 02.1 or Phase 02.2.

---

## 2. Decision Summary Table

```
┌─────────┬────────────────────────────────────────────────────────────────────────┬──────────┐
│ ID      │ Decision Title                                                         │ Status   │
├─────────┼────────────────────────────────────────────────────────────────────────┼──────────┤
│ PDEC-01 │ Adoption of In-Memory TS Compiler API over Named-Pipe Daemon           │ APPROVED │
│ PDEC-02 │ Elimination of ts-morph in Favor of Native TypeScript Compiler API      │ APPROVED │
│ PDEC-03 │ Mandate AST-Guided Surgical Text-Patching Over ts.createPrinter        │ APPROVED │
│ PDEC-04 │ Redefine Contract F as Recoverable Protocol with SQLite WAL            │ APPROVED │
│ PDEC-05 │ Mandatory Pre-Application TOCTOU SHA-256 Pre-Image Validation          │ APPROVED │
│ PDEC-06 │ Isolated Conflict Backups (.uiforge/conflicts/) on Divergent Recovery  │ APPROVED │
│ PDEC-07 │ Standardization of Visual Verification Diff Threshold at 0.05          │ APPROVED │
│ PDEC-08 │ Pinned Headless Chromium Environment with Font & Motion Stabilization  │ APPROVED │
└─────────┴────────────────────────────────────────────────────────────────────────┴──────────┘
```

---

## 3. Prototype Decision Records

### PDEC-01: Adoption of In-Memory TS Compiler API over Named-Pipe Daemon
- **Context**: `typescript@7.1.0-beta` delegates compilation to a native Go binary (`tsgo.exe`) communicating via Windows Named Pipes (`\\.\pipe\tsgo-sync-...`). In sandboxed agent environments, locked-down CI/CD runners, and containers, named pipe IPC is blocked with `Access is denied`.
- **Decision**: UIForge will standardize on the in-memory TypeScript Compiler API (`ts.createSourceFile`, `ts.createProgram`, `ts.createIncrementalProgram`) executing directly in the V8 process.
- **Consequences**:
  - Positive: 100% portable across Linux, Windows, macOS, Docker, CI/CD, and restricted sandboxes. No named pipe permission errors. Fast execution (44.5ms median).
  - Negative: Does not utilize experimental Go multi-threaded daemon optimizations (irrelevant given ~44ms latency).

---

### PDEC-02: Elimination of `ts-morph` in Favor of Native TypeScript Compiler API
- **Context**: `ts-morph@28.0.0` pins `typescript@6.0.2` internally, cannot wrap TS 7.1 modular classes, and was benchmarked to be **5.8x slower** than the raw compiler API (259.4ms vs 44.5ms).
- **Decision**: Eliminate `ts-morph` as a production dependency for UIForge. Build lightweight AST traversal helpers directly against the official `typescript` compiler package.
- **Consequences**:
  - Positive: Eliminates external dependency lag, reduces node_modules size, cuts memory overhead by ~75%, accelerates parsing by 5.8x.
  - Negative: Requires writing direct TypeScript AST visitor utility functions (e.g. `ts.forEachChild`).

---

### PDEC-03: Mandate AST-Guided Surgical Text-Patching Over `ts.createPrinter`
- **Context**: Code re-emission using `ts.createPrinter` destroyed source code formatting, rewritten single quotes to double quotes, normalized indentation, and stripped developer comments (0% style preservation).
- **Decision**: Prohibit the use of `ts.createPrinter` for mutating existing human-authored source files. Mandate **AST-guided surgical text-range patching** (`node.getStart()`, `node.getEnd()`).
- **Consequences**:
  - Positive: 100% preservation of human formatting, quotes, and whitespace. Splicing executes in **0.08ms**. Git diffs are clean, minimal, and reviewable.
  - Negative: Not suitable for generating entire brand-new multi-page files from scratch (for which standard templates or printers can still be used).

---

### PDEC-04: Redefine Contract F as Recoverable Protocol with SQLite WAL
- **Context**: Standard operating system filesystems (NTFS, ext4, APFS) do not provide atomic multi-file operations. Describing filesystem updates as "atomic transactions" is a dangerous architectural fallacy.
- **Decision**: Formally redesignate Contract F as the **Recoverable Multi-File Mutation Protocol**, utilizing native `node:sqlite` in WAL mode (`journal_mode = WAL`, `synchronous = NORMAL`) for metadata persistence.
- **Consequences**:
  - Positive: Transparent, resilient crash recovery with zero silent data corruption. Fully auditable transaction logs.
  - Negative: Requires developer awareness that crashes mid-loop leave files that require recovery reconciliation.

---

### PDEC-05: Mandatory Pre-Application TOCTOU SHA-256 Pre-Image Validation
- **Context**: Developers frequently edit code concurrently or during system pauses. Writing to disk without checking current content causes silent data destruction.
- **Decision**: Enforce **Invariant A**: Immediately before replacing any file on disk, calculate `sha256(diskContent)`. If it does not equal the pre-image hash recorded at snapshot time, abort immediately.
- **Consequences**:
  - Positive: Mathematically prevents silent overwriting of human code (validated in Scenarios F4, F5).
  - Negative: Requires re-reading file bytes before replacement (~1.5ms overhead per file).

---

### PDEC-06: Isolated Conflict Backups (`.uiforge/conflicts/`) on Divergent Recovery
- **Context**: When recovering from a mid-application crash, if an external developer applied an emergency hotfix to an affected file during the downtime, blind rollback overwrites and destroys their work.
- **Decision**: Enforce **Invariant B & G**: If recovery finds a file whose hash matches neither pre-image nor post-image, copy the user's file to `.uiforge/conflicts/`, halt rollback on that file, and set the transaction state to `CONFLICTED`.
- **Consequences**:
  - Positive: Zero user data loss in hostile crash/concurrent edit scenarios (validated in Scenarios F6, F12).
  - Negative: Requires manual developer resolution when state is `CONFLICTED`.

---

### PDEC-07: Standardization of Visual Verification Diff Threshold at 0.05
- **Context**: The Phase 02.2 proposed threshold of `0.10` completely failed to detect missing slate borders (`#e2e8f0` on `#f8fafc`), treating 10,634 pixels as background noise.
- **Decision**: Establish **`0.05`** as the authoritative default visual regression threshold in `@uiforge/browser-engine`.
- **Consequences**:
  - Positive: Cleanly captures all subtle borders, 1px layout shifts, color drift, and hidden icons, while maintaining 0 false positives on baseline runs.
  - Negative: Highly sensitive; requires strict environment determinism (fonts, animations) to avoid spurious noise.

---

### PDEC-08: Pinned Headless Chromium Environment with Font & Motion Stabilization
- **Context**: Automated visual regression testing often suffers from flakiness due to dynamic font loading, CSS animations, and variable device scale factors.
- **Decision**: Enforce standard Playwright capture settings: Chromium Headless Shell, `deviceScaleFactor: 1.0`, `--font-render-hinting=none`, `prefers-reduced-motion: reduce`, zero-duration transitions, and `await document.fonts.ready`.
- **Consequences**:
  - Positive: Achieved **100% deterministic baseline reproducibility (0 pixel diff across 5 repeated runs)** in Gate 3 Experiment V1.
  - Negative: Requires initial browser download via Playwright CLI (~150 MB).

---

## 4. Architectural Sign-Off

All eight decision records are approved, ratified, and binding upon UIForge Phase 03 development.
