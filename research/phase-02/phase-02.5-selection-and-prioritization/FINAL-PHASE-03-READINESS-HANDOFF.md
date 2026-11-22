# UIFORGE — PHASE 02.5: FINAL PHASE 03 READINESS HANDOFF
## Authoritative Architecture Blueprint, Dependency Integration Handoff & Governance Checklist

**Document ID:** `UIF-PH02.5-FINAL-PHASE-03-HANDOFF`  
**From:** Phase 02.5 (Preliminary Repository Selection & Prioritization)  
**To:** Phase 03 (Project Setup, Core Foundation Integration & Tooling Implementation)  
**Status:** **PHASE 02.5 — RESEARCH, SELECTION, RECONCILIATION AND DOCUMENTATION COMPLETE. EXTERNAL LEGAL AND OPERATIONAL DEPENDENCIES TRACKED FOR PHASE 03.**  
**Handoff Date:** 2026-11-22  

---

## 1. Core Foundation Architectural Handoff (Tier 0: 24 Candidates)

> **Tier 0 — Core Foundation:** Strategic architectural foundations and capabilities to adopt selectively according to product requirements, existing infrastructure, compatibility and eligibility.

The 24 Tier 0 candidates are explicitly distinguished across seven distinct architectural layers to prevent treating all candidates as monolithic runtime dependencies:

### 1.1 Architectural Categorization of Tier 0 Candidates
- **Core Runtime Library Dependencies (8 Candidates):** `@radix-ui/react-*` (`OS-COMP-02`), `@react-aria/*` (`OS-COMP-03`), `motion` (`OS-ANIM-01`), `lucide-react` (`OS-ICON-01`), `recharts` (`OS-CHRT-01`, dynamically lazy-loaded), `@tanstack/react-table` (`OS-DASH-03`), `react-resizable-panels` (`OS-LAYT-01`), `@modelcontextprotocol/typescript-sdk` (`OS-AGNT-01`).
- **Development, Build & Testing Tooling (8 Candidates):** `style-dictionary` (`OS-TOKN-02`), `tailwindcss` v4 (`OS-TOKN-04`), `@tailwindcss/container-queries` (`OS-LAYT-02`, Tailwind v3 compatibility build plugin; native container queries in v4), `babel/babel` (`OS-D2C-07`), `eslint-plugin-jsx-a11y` (`OS-A11Y-03`), `playwright` (`OS-BROW-01`), `@axe-core/playwright` (`OS-A11Y-02`), `pixelmatch` (`OS-VREG-01`).
- **External CLI Subprocesses (2 Candidates):** `@axe-core/cli` (`OS-A11Y-01`, release blocked pending legal counsel clearance), `ast-grep` (`OS-D2C-06`).
- **Source Copy / Code Registry Templates (1 Candidate):** `shadcn-ui/ui` (`OS-COMP-01`, CLI-driven component registry without mandatory runtime framework coupling).
- **Standards & Specifications (2 Candidates):** W3C DTCG Format (`OS-TOKN-01`), W3C ARIA Authoring Practices Guide (APG) (`OS-A11Y-08`).
- **Asset Redistribution (2 Candidates):** Inter font (`OS-TYPO-04`), Geist font (`OS-TYPO-05`) (SIL OFL 1.1 font binaries).
- **Agent Reference Architectures & Execution Patterns (1 Candidate):** `anomalyco/opencode` (`OS-AGNT-02`, autonomous coding agent reference architecture & shadow-workspace patterns).

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                             TIER 0 CORE FOUNDATION INTEGRATION MATRIX                            │
├─────┬─────────────┬───────────────────────────────┬──────────────────────┬───────────────────────┤
│ #   │ Candidate ID│ Upstream Package / Identity   │ Consumption Mode     │ Declared Semver Range │
├─────┼─────────────┼───────────────────────────────┼──────────────────────┼───────────────────────┤
│ 1   │ OS-COMP-01  │ shadcn-ui/ui                  │ SOURCE_COPY          │ Component Registry CLI│
│ 2   │ OS-COMP-02  │ @radix-ui/react-* primitives  │ DEPENDENCY           │ ^1.1.0                │
│ 3   │ OS-COMP-03  │ adobe/react-spectrum (Aria)   │ DEPENDENCY           │ ^3.37.0 / @react-aria │
│ 4   │ OS-TOKN-01  │ design-tokens/community-group │ REFERENCE_ONLY       │ W3C DTCG Format Spec  │
│ 5   │ OS-TOKN-02  │ style-dictionary              │ DEPENDENCY           │ ^5.8.0 (Node 22 LTS)  │
│ 6   │ OS-TOKN-04  │ tailwindlabs/tailwindcss (v4) │ DEPENDENCY           │ ^4.0.0 (Build Engine) │
│ 7   │ OS-ANIM-01  │ motiondivision/motion         │ DEPENDENCY           │ ^12.0.0               │
│ 8   │ OS-ICON-01  │ lucide-icons/lucide           │ DEPENDENCY           │ ^0.470.0              │
│ 9   │ OS-CHRT-01  │ recharts/recharts             │ DEPENDENCY           │ ^2.15.0 (Lazy Loaded) │
│ 10  │ OS-DASH-03  │ TanStack/table                │ DEPENDENCY           │ ^8.20.0               │
│ 11  │ OS-TYPO-04  │ rsms/inter (UIForgeInter)     │ ASSET_REDISTRIBUTION │ v4.1 (SIL OFL 1.1)    │
│ 12  │ OS-TYPO-05  │ vercel/geist-font             │ ASSET_REDISTRIBUTION │ v1.4.0 (SIL OFL 1.1)  │
│ 13  │ OS-LAYT-01  │ bvaughn/react-resizable-panels│ DEPENDENCY           │ ^2.1.0                │
│ 14  │ OS-LAYT-02  │ tailwindlabs/container-queries│ DEPENDENCY           │ ^0.1.1 (Legacy v3 Opt)│
│ 15  │ OS-A11Y-01  │ dequelabs/axe-core            │ EXTERNAL_TOOL (Gated)│ ^4.10.0 (Counsel Block│
│ 16  │ OS-A11Y-02  │ axe-core/playwright (MPL-2.0) │ DEPENDENCY           │ ^4.10.0 (Test Runner) │
│ 17  │ OS-A11Y-03  │ eslint-plugin-jsx-a11y        │ DEPENDENCY           │ ^6.10.0 (Build Linter)│
│ 18  │ OS-A11Y-08  │ w3c/aria-practices (APG)      │ REFERENCE_ONLY       │ W3C APG Standard Spec │
│ 19  │ OS-D2C-06   │ ast-grep/ast-grep             │ EXTERNAL_TOOL        │ ^0.30.0 (Native CLI)  │
│ 20  │ OS-D2C-07   │ babel/babel (AST Pipeline)    │ DEPENDENCY           │ ^7.26.0 (WAL Decoupled│
│ 21  │ OS-AGNT-01  │ modelcontextprotocol/ts-sdk   │ DEPENDENCY           │ ^2.1.0 (2026-07-28)   │
│ 22  │ OS-AGNT-02  │ anomalyco/opencode            │ REFERENCE_ONLY       │ Agent Spec Reference  │
│ 23  │ OS-BROW-01  │ microsoft/playwright          │ DEPENDENCY           │ ^1.50.0 (Test Runner) │
│ 24  │ OS-VREG-01  │ mapbox/pixelmatch             │ DEPENDENCY           │ ^7.1.0 (Diff Engine)  │
└─────┴─────────────┴───────────────────────────────┴──────────────────────┴───────────────────────┘
```

---

## 2. External Dependencies & Legal Gates Governance Checklist

The Phase 03 implementation team must enforce the following gates prior to production bundling:

### 2.1 axe-core Production Distribution Gate (`OS-A11Y-01`)
- **Status:** `CONDITIONALLY ADOPT — RELEASE BLOCKED PENDING COUNSEL CLEARANCE`
- **Execution Model:** External execution via `@axe-core/cli` invoked as an out-of-process subprocess. No binary bundling.
- **Phase 03 Requirement:** Obtain formal IP legal counsel clearance confirming that UIForge's subprocess invocation and CLI dependency boundaries comply with MPL-2.0 Section 3 notice obligations before releasing UIForge CLI to production registries.

### 2.2 Pa11y LGPL-3.0 Review Gate (`OS-A11Y-05`)
- **Status:** `DEFERRED (TIER 4)` under `counselReviewRequired: true`
- **Phase 03 Requirement:** Retain in deferred quarantine until legal counsel advises whether dynamic subprocess linking avoids triggering copyleft distribution requirements under LGPL-3.0 Section 4.

### 2.3 Font Subsetting & Reserved Font Name Protection (`OS-TYPO-04`, `OS-TYPO-05`)
- **Status:** `ADOPT (ASSET_REDISTRIBUTION)` with SIL OFL 1.1 Clause 3 RFN constraints.
- **Phase 03 Requirement:**
  - Build `pyftsubset` automated build pipeline.
  - For full/unaltered font bundles, distribute with original names `Inter.var.woff2` and `Geist-Variable.woff2`.
  - For custom glyph-removing subsets, enforce font-family renaming to `UIForgeInter` and `UIForgeGeist`, modifying Name table IDs 1, 4, and 6.

### 2.4 Model Context Protocol Live Wire Integration (`OS-AGNT-01`)
- **Status:** Declared semver range `^2.1.0` (evaluated on `v2.1.1` on Node.js 22 LTS).
- **Phase 03 Requirement:** Implement live JSON-RPC test harness over stdio and SSE transports to verify modern `2026-07-28` discovery (`server/discover`, request `_meta` headers) and automatic fallback to `2025-11-25` and `2024-11-05`.

### 2.5 UIForge Write-Ahead Logging (WAL) Implementation (`OS-D2C-07`)
- **Status:** Architectural specification and test simulation complete.
- **Phase 03 Requirement:** Construct the production UIForge WAL engine:
  - Streaming token buffer handling unclosed template literals, JSX elements, and comments.
  - Multi-file transaction commit and rollback engine.
  - Coordinate-based slice patcher replacing character spans `[start, end]`.
  - TypeScript Compiler API diagnostic baseline regression comparator ($\text{newRegressions} = \text{post} \setminus \text{baseline}$).

### 2.6 @axe-core/playwright MPL-2.0 Testing Dependency Compliance (`OS-A11Y-02`)
- **Status:** `ADOPT (DEPENDENCY)` under `devDependencies` for automated CI/CD Playwright testing.
- **License Boundary:** Governed by Mozilla Public License 2.0 (MPL-2.0), providing weak file-level copyleft protection.
- **Phase 03 Requirement:** Ensure that `@axe-core/playwright` is strictly restricted to `devDependencies` and test execution harnesses (never bundled into production runtime distributions), and preserve upstream Deque copyright and MPL-2.0 notices in testing documentation and third-party notices.
