# UIFORGE PHASE 02.4 — REPRODUCTION & VERIFICATION GUIDE
# Step-by-Step Instructions for Independent Reproduction of All Prototype Experiments

**Document ID:** UIF-PH02.4-REPRO-GUIDE  
**Phase:** 02.4 — High-Risk Technical Prototypes  
**Subsystem:** Developer Operations, Audit Verification & Tooling  
**Author:** Staff Reliability Engineer, Verification Lead  
**Reviewer:** Independent Test Auditor  
**Execution Date:** 2026-11-21  
**Status:** VALIDATED & REPRODUCIBLE  
**Target Environment:** Node.js v24.15.0+, npm v11.x, Windows / Linux / macOS

---

## 1. Overview & Reproduction Objectives

This guide provides step-by-step, turnkey instructions enabling any software architect, security auditor, or CI/CD pipeline to recreate the test fixtures, run the automated test runners, and independently regenerate all empirical evidence across Gates 1, 2, and 3.

All experiments are self-contained within `research/phase-02/phase-02.4-technical-prototypes/` and do not alter root project files or production configurations.

---

## 2. Environment Prerequisites

Ensure the host machine satisfies the following minimum requirements:

1. **Operating System**: Windows 10/11 (x64), Ubuntu 22.04/24.04 LTS (x64), or macOS Sonoma (ARM64/x64).
2. **Node.js**: **Node.js v24.x** (v24.15.0+ recommended) — required for native `node:sqlite` (`DatabaseSync`).
3. **Package Manager**: `npm` v10.x or v11.x.
4. **Disk Space**: At least 500 MB free (for Playwright Chromium headless shell).

Verify your environment:
```powershell
node -v   # Expected: v24.15.0 or higher
npm -v    # Expected: 10.x or 11.x
```

---

## 3. Workspace Setup & Dependency Installation

Navigate into the prototype directory and install the pinned dependencies:

```powershell
# Navigate to prototype workspace root
cd research/phase-02/phase-02.4-technical-prototypes

# Install pinned prototype dependencies
npm install

# Install Playwright Chromium Headless Shell
npx playwright install chromium
```

---

## 4. Reproducing Gate 1: TypeScript Compiler API Architecture

Gate 1 evaluates AST discovery, semantic typechecking, dependency graphing, and surgical text patching.

### Step 1: Generate Synthetic TypeScript Fixtures
```powershell
node gate-1-typescript-api/create_fixtures.js
```
*Expected Output*: Creates 14 valid TypeScript/TSX source files, 1 circular dependency cycle, 1 semantic type error, and 1 malformed syntax file in `gate-1-typescript-api/fixtures/`.

### Step 2: Execute Gate 1 Experiments (T1–T8)
```powershell
node gate-1-typescript-api/run_gate1_experiments.cjs
```
*Expected Output*:
- Ingestion of 14 files in ~45–85ms.
- Diagnostic `TS2322` detected cleanly.
- Dependency cycle `CycleA -> CycleB -> CycleA` reported.
- Surgical patching completed in ~0.08ms with 100% style preservation.
- Malformed syntax caught safely without crashing.
- Exit code: `0`.
- Output evidence written to: `evidence/gate1-typescript-evidence.json`.

---

## 5. Reproducing Gate 2: Filesystem Mutation & Crash Recovery

Gate 2 evaluates SQLite WAL write-ahead journaling, TOCTOU revalidation, and user-conflict preservation across 12 fault-injection scenarios.

### Execute Gate 2 Experiments (F1–F12)
```powershell
node gate-2-filesystem-recovery/run_gate2_experiments.cjs
```
*Expected Output*:
- Scenarios F1 through F12 execute in sequence.
- 12 / 12 scenarios report `[PASS]`.
- All 7 safety invariants (A through G) report `VERIFIED`.
- Conflict backup demonstrated in `.uiforge/conflicts/`.
- Exit code: `0`.
- Output evidence written to: `evidence/gate2-filesystem-evidence.json`.

---

## 6. Reproducing Gate 3: Playwright Visual & A11y Verification

Gate 3 evaluates headless browser visual determinism, 6 intentional defects, threshold calibration, multi-viewport stability, and ARIA snapshots.

### Step 1: Generate Visual Fixtures
```powershell
node gate-3-browser-visual-verification/create_fixtures.js
```
*Expected Output*: Generates `baseline.html` and 6 defect variants (`variant-1px_shift.html`, `variant-missing_border.html`, etc.) in `gate-3-browser-visual-verification/fixtures/`.

### Step 2: Execute Gate 3 Experiments (V1–V8)
```powershell
node gate-3-browser-visual-verification/run_gate3_experiments.cjs
```
*Expected Output*:
- V1: 5 repeated baseline runs show exactly `0` diff pixels.
- V2: All 6 intentional visual defects detected with diff pixel counts.
- V4: Threshold calibration shows why `0.10` misses borders and `0.05` catches all 10,634 pixels.
- V5: Responsive matrix passes across 375px, 768px, 1280px, 1920px with 0 document overflow.
- V6: Modal dialog focus trapping, Escape dismissal, and focus restoration verified; 27-node ARIA tree extracted.
- V8: Contract G evidence envelope constructed and signed with SHA-256 digests.
- Visual diff masks generated in `gate-3-browser-visual-verification/artifacts/`.
- Exit code: `0`.
- Output evidence written to: `evidence/gate3-visual-evidence.json`.

---

## 7. Validating All Generated Evidence Manifests

To verify that all emitted JSON manifests are syntactically valid and uncorrupted:

```powershell
node -e "const fs = require('fs'); const dir = 'evidence'; fs.readdirSync(dir).filter(f => f.endsWith('.json')).forEach(f => { try { JSON.parse(fs.readFileSync(dir + '/' + f, 'utf8')); console.log(f + ': VALID'); } catch(e) { console.error(f + ': INVALID - ' + e.message); } });"
```
*Expected Output*:
```
cross-gate-reconciliation.json: VALID
environment-manifest.json: VALID
gate1-typescript-evidence.json: VALID
gate2-filesystem-evidence.json: VALID
gate3-visual-evidence.json: VALID
phase-02.4-acceptance-manifest.json: VALID
```

---

## 8. Common Troubleshooting & Notes

1. **Node.js Native SQLite Error**:
   - If you see `Cannot find module 'node:sqlite'`, ensure you are running Node.js v24 or later. Node.js v22 and earlier do not include the built-in `node:sqlite` module.
2. **Playwright Chromium Not Installed**:
   - If Gate 3 fails with `Executable doesn't exist at ...`, run `npx playwright install chromium` inside `research/phase-02/phase-02.4-technical-prototypes`.
3. **Windows PowerShell Execution Policy**:
   - If npm scripts or npx fail to run due to execution policy restrictions, execute `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` in your PowerShell terminal.
