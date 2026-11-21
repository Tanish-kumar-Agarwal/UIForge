# UIForge Phase 02.4 — Environment & Reproducibility Specification

**Document ID:** `UIF-PH02.4-ENV`  
**Phase:** 02.4 — High-Risk Technical Prototypes  
**Classification:** Canonical Environment Manifest & Execution Telemetry  
**Date:** November 2026  
**Auditor Lead:** Independent Test Auditor & Application Security Reviewer  

---

## 1. Physical Hardware & Operating System Baseline

All Phase 02.4 prototypes and benchmark suites were executed on a physically pinned host environment:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        HOST PLATFORM & RUNTIME BASELINE                                │
├────────────────────────┬───────────────────────────────────────────────────────────────┤
│ Parameter              │ Verified Host Environment Metric                              │
├────────────────────────┼───────────────────────────────────────────────────────────────┤
│ Operating System       │ Microsoft Windows 11 (build 10.0.26100, x64 architecture)    │
│ Filesystem Type        │ NTFS (New Technology File System)                             │
│ Node.js Runtime        │ v24.15.0 (V8 engine v12.9.202.28-node.14)                     │
│ Package Manager        │ npm v11.12.1 (pnpm uninstalled on host system)                │
│ Native SQLite Engine   │ Node.js 24 native `node:sqlite` (SQLite 3.45+ synchronous)     │
│ Process Model          │ 64-bit multi-threaded V8 execution context                    │
│ System Memory (RAM)    │ 16 GB Physical DDR4/DDR5                                      │
└────────────────────────┴───────────────────────────────────────────────────────────────┘
```

---

## 2. Pinned Toolchain & Library Provenance

Dependencies were installed into the dedicated prototype workspace (`research/phase-02/phase-02.4-technical-prototypes/`) without polluting the root repository:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        PINNED DEPENDENCY PROVENANCE MATRIX                             │
├────────────────────────┬─────────┬──────────────┬─────────────┬────────────────────────┤
│ Package Name           │ Version │ Provenance   │ License     │ Architectural Role     │
├────────────────────────┼─────────┼──────────────┼─────────────┼────────────────────────┤
│ typescript             │ 7.1.0-b │ npmjs.org    │ Apache-2.0  │ Gate 1 Compiler API    │
│ ts-morph               │ 28.0.0  │ npmjs.org    │ MIT         │ Gate 1 AST Benchmark   │
│ node:sqlite            │ Native  │ Node.js v24  │ Public Dom. │ Gate 2 WAL Database    │
│ playwright             │ 1.50.1  │ npmjs.org    │ Apache-2.0  │ Gate 3 Browser Engine  │
│ playwright-core        │ 1.50.1  │ npmjs.org    │ Apache-2.0  │ Core automation driver │
│ chromium (headless)    │ 133.0   │ ms-playwrigh │ BSD-3-Clause│ Pinned rendering engine│
│ pixelmatch             │ 7.1.0   │ npmjs.org    │ ISC         │ Perceptual pixel diff  │
│ pngjs                  │ 7.0.0   │ npmjs.org    │ MIT         │ PNG decoding / encoding│
└────────────────────────┴─────────┴──────────────┴─────────────┴────────────────────────┘
```

---

## 3. Sandboxing & IPC Boundary Findings

During Gate 1 execution, a fundamental sandboxing limitation was identified regarding **TypeScript 7.1 Beta**:

1. **Native Daemon Architecture (`tsgo`)**: TypeScript 7.1 replaces the monolithic compiler with a modular client (`typescript/sync`) that communicates with a background Go executable (`tsgo.exe`) via Windows Named Pipes:
   `\\.\pipe\tsgo-sync-<pid>-<hash>`
2. **Sandbox Boundary Failure**: Inside secure sandboxes (such as Google Antigravity standard sandbox mode or locked-down Linux containers), opening or listening on Windows Named Pipes triggers `Access is denied` or `SyncRpcChannel: timed out connecting to named pipe`.
3. **In-Memory Alternative**: The in-memory compiler engine (`inMemoryTs` / `ts-morph.ts`, version `6.0.2`) runs 100% inside the V8 JavaScript heap with zero named-pipe or IPC dependencies, executing synchronously and deterministically within standard sandbox mode.

---

## 4. Reproducibility Assurance Checklist

To reproduce all 27 technical experiments across Gates 1, 2, and 3:

1. Confirm Node.js version $\ge 22.0.0$ (Node.js 24 recommended for native `node:sqlite`).
2. Run `npm install` inside `research/phase-02/phase-02.4-technical-prototypes/`.
3. Run `npx playwright install chromium` to fetch the pinned Chromium build (`1155`).
4. Execute the three test scripts from the repository root.
5. All outputs are deterministic and emit machine-readable JSON manifests under `evidence/`.
