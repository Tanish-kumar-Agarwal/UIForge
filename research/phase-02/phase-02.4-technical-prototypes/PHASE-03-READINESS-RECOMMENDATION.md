# UIFORGE PHASE 02.4 — PHASE 03 READINESS RECOMMENDATION
# Technical Prerequisites, Implementation Scope & Architecture Directives

**Document ID:** UIF-PH02.4-P03-READINESS  
**Phase:** 02.4 — High-Risk Technical Prototypes  
**Subsystem:** Implementation Roadmap & Program Governance  
**Author:** Principal Software Architect, Staff Platform Engineer  
**Reviewer:** Enterprise Architecture Board, Program Director  
**Execution Date:** 2026-11-21  
**Status:** READY FOR PHASE 03 SUBJECT TO LEGAL & GOVERNANCE CLEARANCES  
**Primary Evidence Manifest:** [phase-02.4-acceptance-manifest.json](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-technical-prototypes/evidence/phase-02.4-acceptance-manifest.json)

---

## 1. Executive Readiness Verdict

```
========================================================================================
RECOMMENDATION: PROCEED TO PHASE 03 (PRODUCTION IMPLEMENTATION)
STATUS:         CONDITIONALLY READY — ARCHITECTURAL BOUNDARIES FORMALIZED
CORE VERDICT:   All three highest-risk technical assumptions have been empirically
                validated through concrete prototypes. With the incorporation of
                binding architectural boundaries (Hybrid AST, Recoverable Mutation Protocol,
                and Calibrated 0.05 Visual Threshold), technical risk has been reduced
                below acceptable thresholds for production engineering.
========================================================================================
```

Following the empirical completion and independent validation of Gates 1, 2, and 3 in UIForge Phase 02.4, the technical foundation of the platform is sound.

The platform is **READY** to proceed into **UIForge Phase 03 — Core Implementation & Monorepo Development**, subject to the explicit prerequisites, architecture boundaries, and package scope defined herein.

---

## 2. Mandatory Architectural Boundaries for Phase 03

Phase 03 implementation teams must strictly adhere to the following three binding technical boundaries derived from prototype evidence:

### Boundary 1: Hybrid AST Architecture (Gate 1 Finding)
- **Mandate**: In `@uiforge/ast-engine`, project discovery, AST parsing, symbol analysis, and semantic typechecking must execute via the **in-memory TypeScript Compiler API** running directly inside the Node.js V8 process.
- **Prohibitions**:
  - Do NOT adopt external named-pipe daemons (`tsgo` / `typescript/sync`) until sandboxed container IPC security models mature.
  - Do NOT import `ts-morph` as a production dependency (5.8x latency penalty, version pinning lag).
  - Do NOT use `ts.createPrinter` to re-emit human-authored source files. Code mutations must strictly use **AST-guided surgical text-range patching** to preserve 100% of formatting, comments, and quotation styles.

### Boundary 2: Recoverable Multi-File Mutation Protocol (Gate 2 Finding)
- **Mandate**: In `@uiforge/core`, multi-file workspace modifications must be implemented as a **Recoverable Multi-File Mutation Protocol** backed by native `node:sqlite` in Write-Ahead Logging (`WAL`) mode.
- **Prohibitions**:
  - Do NOT describe or design filesystem mutations as hardware-level "atomic transactions".
  - Do NOT write or replace any file without an immediate preceding **TOCTOU SHA-256 pre-image check** (Invariant A).
  - Do NOT execute blind rollbacks on divergent files during crash recovery; modified files must be backed up to `.uiforge/conflicts/` and transitioned to `CONFLICTED` for human review (Invariants B and G).

### Boundary 3: Calibrated Visual Verification Engine (Gate 3 Finding)
- **Mandate**: In `@uiforge/browser-engine`, visual regression testing via Playwright and `pixelmatch` must use an authoritative default threshold of **`0.05`**.
- **Prohibitions**:
  - Do NOT use a coarse threshold $\ge 0.10$ (which completely blinds the engine to low-contrast borders like `#e2e8f0` on `#f8fafc`).
  - Do NOT capture screenshots without awaiting `document.fonts.ready` and disabling CSS animations (`prefers-reduced-motion: reduce`).

---

## 3. Governance & Legal Prerequisites (Phase 02.3 Escalations)

Before public binary distribution or commercial deployment, the following legal and supply-chain escalations identified in Phase 02.3 must be formally completed:

1. **ESC-01 (Pa11y / HTML_CodeSniffer LGPL Review)**: External counsel review of the subprocess execution boundary, distribution package separation, and compliance notice requirements.
2. **ESC-02 (Axe-Core MPL-2.0 Larger Work Review)**: IP counsel review confirming the larger work boundary and source notice obligations for axe-core accessibility auditing.
3. **ESC-03 (Generated-Code Warranty Disclaimers)**: Legal formulation of user agreements explicitly disclaiming intellectual property warranties for AI-generated code snippets.
4. **ESC-04 (Dual-Licensing Strategy Definition)**: Commercial licensing definition for open-core vs proprietary enterprise capabilities.

---

## 4. Proposed Phase 03 Package Architecture & Phased Rollout

Phase 03 implementation should follow a modular, staged rollout across five core packages:

```
UIForge Monorepo (pnpm / Turborepo)
├── packages/
│   ├── core/                  # Phase 03 - Stage 1 (Foundation)
│   │   ├── SQLite WAL journal & mutation engine (Contract F)
│   │   ├── Workspace configuration & lockfile management
│   │   └── Approval state machine & conflict containment (Contract E, H)
│   │
│   ├── ast-engine/            # Phase 03 - Stage 2 (Intelligence)
│   │   ├── In-memory TypeScript Compiler API host (Contract A)
│   │   ├── Component & design token discovery
│   │   └── Surgical text-range patch engine
│   │
│   ├── browser-engine/        # Phase 03 - Stage 3 (Verification)
│   │   ├── Playwright headless runner (Contract G)
│   │   ├── Pixelmatch calibrated (0.05) visual diffing
│   │   └── ARIA snapshot & keyboard a11y validator
│   │
│   ├── cli/                   # Phase 03 - Stage 4 (Developer Experience)
│   │   ├── Interactive terminal UI & 3-way diff review
│   │   └── Scan, transform, verify, and commit commands
│   │
│   └── mcp-server/            # Phase 03 - Stage 5 (Agent Integration)
│       ├── Model Context Protocol (MCP) server
│       └── Expose Contract A–H tools to Claude, Gemini, Cursor
```

---

## 5. Explicit MVP Boundary: What NOT to Build in Phase 03.1

To prevent scope creep and ensure timely delivery of a rock-solid core:

| Candidate Feature | Phase 03.1 MVP Inclusion | Rationale & Phase Assignment |
|---|---|---|
| In-memory TS AST scanning & typecheck | **YES (Core)** | Foundational for component discovery. |
| AST surgical text-patching | **YES (Core)** | Essential for non-destructive code generation. |
| SQLite WAL write-ahead journal | **YES (Core)** | Essential for zero-data-loss filesystem safety. |
| Playwright local headless visual diffing | **YES (Core)** | Essential for automated regression evidence. |
| CLI interactive approval gate | **YES (Core)** | Core developer experience for human oversight. |
| Remote cloud browser rendering farms | **NO (Deferred)** | Excessive complexity; local headless Chromium is fast and sufficient (Phase 04). |
| Native Go daemon (`tsgo`) IPC client | **NO (Excluded)** | Fails in secure sandboxes (ANOM-01); in-memory API is proven. |
| `ts-morph` high-level wrapper | **NO (Excluded)** | Version lag and 5.8x performance penalty (ANOM-02). |
| Cloud SaaS subscription billing | **NO (Deferred)** | Out of scope for pre-revenue core platform (Phase 04). |

---

## 6. Phase 03 Readiness Sign-Off

- **Technical Risks Mitigated:** Gate 1 (AST), Gate 2 (Filesystem), Gate 3 (Visual).
- **Architecture Stability:** Verified with 27/27 passing prototype experiments.
- **Recommendation:** **PROCEED TO PHASE 03 MONOREPO SCAFFOLDING**.
