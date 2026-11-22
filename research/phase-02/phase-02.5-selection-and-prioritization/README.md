# UIForge Phase 02.5: Repository Selection, Technical Scoring & Adoption Strategy

**Document ID:** `UIF-PH02.5-README`  
**Classification:** Phase Overview & Index  
**Phase:** 02.5 — Preliminary Repository Selection, Technical Prioritization and Adoption Strategy  
**Parent Phase:** Phase 02 — Open-Source Ecosystem, Technical Architecture & Supply-Chain Validation  
**Execution Mode:** Phase 1 — Research, Evidence-Based Evaluation, Scoring, Reconciliation & Decision Documentation  
**Status:** Certified / Complete  
**Date:** November 2026  

---

## 1. Executive Mission

UIForge Phase 02.5 evaluates the **125 canonical candidates** established in the [Phase 02.4 Internal Source Registry](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/README.md) to formulate UIForge's authoritative, evidence-backed technology adoption decisions.

Rather than maximizing the number of external dependencies, Phase 02.5 adheres to the core engineering invariant:
> **"A smaller, well-justified architecture is better than an unnecessarily large dependency ecosystem."**

---

## 2. Adoption Tier Census (125 Candidates)

| Adoption Tier | Purpose & Description | Candidate Count | Percentage | Primary Recommendation |
| :--- | :--- | :---: | :---: | :---: |
| **TIER 0** | **Core Foundation:** Essential technologies forming the core UIForge platform | **24** | 19.2% | `ADOPT` / `CONDITIONALLY ADOPT` |
| **TIER 1** | **Recommended Core-Adjacent:** High-value extensions and component registries | **34** | 27.2% | `ADOPT` |
| **TIER 2** | **Optional Integrations:** Modular plugins, dashboard grids, and secondary adapters | **40** | 32.0% | `OPTIONAL` |
| **TIER 3** | **Reference & Research:** Architectural patterns, layout concepts, and design systems | **16** | 12.8% | `REFERENCE` |
| **TIER 4** | **Deferred:** Candidates gated pending legal counsel review or future roadmap gates | **4** | 3.2% | `DEFER` |
| **TIER 5** | **Rejected / Excluded:** Closed proprietary terms, mission misfit, or redundant tools | **7** | 5.6% | `REJECT` |
| **TOTAL** | **Canonical Candidate Universe Accounted For** | **125** | **100.0%** | — |

---

## 3. Technology Category Decisions (Categories A – H)

| Category | Domain | Recommended Foundation (Tier 0 Winners) | Primary Mode |
| :--- | :--- | :--- | :--- |
| **Category A** | Project Intelligence & Code Analysis | **TypeScript Compiler API** (native) + **ast-grep** (`OS-D2C-06`) + **Babel 6-Stage Pipeline** (`OS-D2C-07`) | `HYBRID` / `EXTERNAL_TOOL` |
| **Category B** | Component & Primitive Architecture | **Radix UI Primitives** (`OS-COMP-02`) + **React Aria** (`OS-COMP-03`) | `DEPENDENCY` |
| **Category C** | Component Registries & Source Ecosystems | **shadcn/ui** (`OS-COMP-01`) CLI source-copy distribution model | `SOURCE_COPY` |
| **Category D** | Design Systems & Complete UI Frameworks | **Internal UIForge Architecture** (Reference Mantine, MUI, Chakra) | `BUILD_INTERNAL` |
| **Category E** | Design Tokens & Styling | **Tailwind CSS v4** (`OS-TOKN-04`) + **DTCG** (`OS-TOKN-01`) + **Style Dictionary v5.8.0** (`OS-TOKN-02`) | `DEPENDENCY` / `BUILD_TOOL` |
| **Category F** | Browser Verification & Accessibility | **Playwright** (`OS-BROW-01`) + **axe-core** (`OS-A11Y-01`, conditional) + **Pixelmatch** (`OS-VREG-01`) | `DEPENDENCY` / `EXTERNAL_TOOL` |
| **Category G** | Agent & MCP Integration | **Model Context Protocol TypeScript SDK** (`OS-AGNT-01`, ^2.1.0; modern 2026-07-28 discovery with auto-negotiation fallback) | `DEPENDENCY` |
| **Category H** | Supporting UI Libraries | **Motion** (`OS-ANIM-01`), **TanStack Table** (`OS-DASH-03`), **Recharts** (`OS-CHRT-01`), **Lucide** (`OS-ICON-01`), **Inter/Geist** (`OS-TYPO-04/05`), **Resizable Panels** (`OS-LAYT-01`) | `DEPENDENCY` / `ASSET` |

---

## 4. Deliverable Directory Map

```text
research/phase-02/phase-02.5-selection-and-prioritization/
├── README.md                                    # This index and executive roadmap
├── PHASE-02.5-MASTER-SELECTION-REPORT.md        # Comprehensive master technical decision report
├── CANONICAL-SELECTION-UNIVERSE.md              # Exhaustive candidate selection census (125 sources)
├── HARD-GATE-ELIGIBILITY-REPORT.md              # G1 through G6 hard-gate eligibility evaluations
├── TECHNICAL-SCORING-METHODOLOGY.md             # 7-dimension weighted scoring specification
├── COMPLETE-CANDIDATE-SCORECARD.md              # Ranked scorecard for all 125 candidates
├── CATEGORY-WISE-COMPARISON-REPORT.md           # Comparative analysis across Categories A–H
├── REDUNDANCY-AND-CAPABILITY-OVERLAP-REPORT.md  # Direct alternatives, overlaps, and combinations
├── BUILD-VS-ADOPT-DECISION-REPORT.md            # Analysis across 16 core platform capabilities
├── DEPENDENCY-AND-ARCHITECTURAL-COST-REPORT.md  # Core dependency budget and bloat mitigations
├── LICENSE-AND-CONSUMPTION-MODE-DECISIONS.md    # Consumption modes, notice, and legal gates
├── CORE-FOUNDATION-SHORTLIST.md                 # Tier 0 Core Foundation candidates (24)
├── OPTIONAL-INTEGRATION-SHORTLIST.md            # Tier 1 & Tier 2 candidate specifications (74)
├── REFERENCE-ONLY-AND-DEFERRED-SHORTLIST.md     # Tier 3 (16) and Tier 4 (4) candidate dossiers
├── REJECTED-CANDIDATE-REGISTER.md               # Tier 5 Rejected candidate register (7)
├── EXPERIMENTAL-VALIDATION-PLAN.md              # Proposed experiments E1 through E8
├── PHASE-02.5-ACCEPTANCE-REPORT.md              # Acceptance scorecard (AC01–AC28)
├── PHASE-03-HANDOFF.md                          # Phase 03 readiness, prerequisites, and roadmap
├── data/
│   ├── candidate-selection-scorecard.json       # Canonical machine-readable scorecard dataset
│   ├── category-decisions.json                  # Category winners and comparative decisions
│   └── evidence-and-claim-register.json         # Claim-level evidence traceability dataset
├── schemas/
│   ├── selection-scorecard.schema.json          # Draft-07 formal schema for scorecard
│   ├── category-decisions.schema.json           # Draft-07 formal schema for category decisions
│   └── evidence-and-claim.schema.json           # Draft-07 formal schema for evidence claims
├── scripts/
│   ├── build_reports.js                         # Automated report builder
│   ├── generate_selection_data.js               # Structured dataset generator
│   └── verify_babel_recovery.js                 # Empirical fixture parser recovery verification
└── validation/
    └── validate_selection.js                    # Automated integrity validation harness (61/61 PASS)
```

---

## 5. Automated Validation & Script Digest

The automated test suite certifies all 61 assertions across inventory preservation, hard-gate enforcement, scoring math, tier classifications, category coverage, and finding remediations (C11–C24):
- **Harness Script:** [`validation/validate_selection.js`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.5-selection-and-prioritization/validation/validate_selection.js)
- **Harness Result:** **61 / 61 PASS (0 failures)**
- **Script SHA-256 Digest:** `b333731ad7bf4596d0f9a96a5270935483f48ce049ee5f9bdc6ee2d9cf04b14b`
- **Digest Qualification:** Test execution certifies conditions tested under the local test environment; SHA-256 digest validates byte identity of the test script, not external third-party certification.
