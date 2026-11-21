# UIForge Phase 02.4: Phase 02.5 Handoff Document

**Document ID:** UIF-PH02.4-PHASE-02.5-HANDOFF  
**Classification:** Milestone Transition, Downstream Handoff, Selection Scoring Blueprint  
**Status:** Certified / Approved  
**Authoritative Location:** `research/phase-02/phase-02.4-internal-source-registry/PHASE-02.5-HANDOFF.md`  

---

## 1. Executive Summary & Purpose

This handoff document formally transitions the reconciled outputs of **Phase 02.4 (Internal Source Registry)** to **Phase 02.5 (Source Selection and Scoring Matrix)**.

Phase 02.4 has established the immutable truth of UIForge’s open-source universe: exactly **125 canonical candidates** (24 P0, 47 P1, 50 P2, 4 REJ), normalized into **119 authoritative Git repositories**, **147 packages**, **31 component groups**, **8 standalone assets**, and **12 canonical license entities**, governed across **6 consumption modes** ($125 \times 6 = 750$ permission records) with **625 granular evidence items** and digest-backed provenance.

Phase 02.5 researchers must utilize this registry dataset to conduct quantitative scoring, category-by-category stack trade-off analyses, and final component selection.

---

## 2. Mode-Specific Eligibility Pre-Filtering & REJ Rules (Issue 1 & 2 Resolution)

A universal eligibility filter is architecturally invalid. In accordance with the Phase 02.4 Governance Directive, **Phase 02.5 scoring must apply consumption-mode-specific eligibility gates** before evaluating any candidate:

```
┌────────────────────────────────────────────────────────────────────────┐
│  MODE-SPECIFIC PRE-FILTERING RULES                                     │
│                                                                        │
│  A candidate qualifies for selection in mode M if and only if:         │
│  1. Mode permission in consumption-permissions.json is:               │
│     APPROVED or ELIGIBLE_WITH_RESTRICTIONS                             │
│                                                                        │
│  A candidate is STRICTLY DISQUALIFIED from mode M if:                  │
│  - Mode permission is BLOCKED                                          │
│  - Mode permission is PENDING_REVIEW                                   │
│  - Mode permission is NOT_APPLICABLE                                   │
│  - Candidate freshness is STALE or EXPIRED                             │
│  - Candidate evaluation is NOT_ESTABLISHED                             │
│  - Mandatory supporting evidence items are missing                     │
│  - Candidate is approved ONLY for REFERENCE_ONLY                       │
└────────────────────────────────────────────────────────────────────────┘
```

### 2.1 Reconciled Dependency Mode Arithmetic (125 Sources)
- **Eligible Dependency Pool:** Exactly **113 candidates** (111 `APPROVED` + 2 `ELIGIBLE_WITH_RESTRICTIONS`).
- **Ineligible Dependency Pool:** Exactly **12 candidates**:
  - **7 `BLOCKED`:** `aceternity/ui`, `locofy/locofy`, `remotion`, `rebass`, `react-grid-layout`, `loki`, `backstopjs`.
  - **1 `PENDING_REVIEW`:** `pa11y` (LGPL-3.0 dynamic linking concerns).
  - **4 `NOT_APPLICABLE`:** `Every-Layout` (documentation/book), `claude-code`, `cursor`, `windsurf` (closed desktop/CLI tools).
- **Total Accounting:** $113 \text{ eligible} + 12 \text{ ineligible} = 125 \text{ sources}$ (100% exact).

### 2.2 REJ Candidates Disqualification from Default Stack (Issue 2 Resolution)
1. **Default Core Disqualification:** All 4 candidates with `originalDiscoveryPriority: REJ` (`aceternity/ui`, `greensock/gsap`, `remotion`, `locofy/locofy`) are **strictly excluded from selection as UIForge's default core runtime stack**.
2. **GSAP Secondary Plugin Role:** GSAP’s `ELIGIBLE_WITH_RESTRICTIONS` permission permits emission only as an **optional, user-requested secondary animation plugin**, subject to Webflow’s non-compete clause. GSAP will never be selected as UIForge's default core animation engine (Framer Motion / Motion One retain default status).
3. **Aceternity & Locofy Terminal Exclusion:** Both candidates remain `BLOCKED` across all operational emission modes (`DEPENDENCY`, `SOURCE_COPY`, `ASSET_REDISTRIBUTION`).

---

## 3. Transferred Assets and Inputs

| Transferred Asset | Path | Description & Downstream Purpose |
| :--- | :--- | :--- |
| **Master Source Index** | `data/sources.json` | 125 canonical candidate records with immutable `candidateId`, preserved priorities, and operational tiers. |
| **Authoritative Repositories**| `data/repositories.json`| 119 verified Git repositories with canonical URLs and branch tracking. |
| **Normalized Packages** | `data/packages.json` | 147 installable npm packages with versioning and monorepo mapping. |
| **Component Primitives** | `data/components.json` | 31 primary component groups for atomic UI template mapping. |
| **Asset Register** | `data/assets.json` | 8 assets (6 core assets + JetBrains Mono and Fira Code traced to Fontsource `OS-TYPO-03`). |
| **License Entities** | `data/licenses.json` | 12 canonical licenses including `LIC-EVERY-LAYOUT-COMMERCIAL`. |
| **Technical Evaluations** | `data/evaluations.json` | 1,250 dimensional assessments (71 complete candidate technical evaluations, 54 screened/partial). |
| **Permissions Matrix** | `data/consumption-permissions.json`| 750 mode permissions defining what can be imported, copied, or bundled with canonical enums. |
| **Digest-Backed Provenance**| `data/provenance.json` | Pinned Git commits and SHA-256 digests ensuring tamper-evident baseline. |
| **Granular Evidence Dossiers**| `data/evidence.json` | 125 candidate dossiers containing 625 granular evidence items with claim-level quality checks. |
| **Gaps & Legal Escalations**| `REGISTRY-GAP-AND-LIMITATION-REGISTER.md` | Active constraints (LEG-01 to LEG-10, GAP-01 to GAP-08). |

---

## 4. Recommended Phase 02.5 Selection Scoring Methodology

Phase 02.5 evaluates candidates within their specific category to select UIForge’s default stack. Scoring must strictly follow the 7-dimension weighted rubric:

```
┌────────────────────────────────────────────────────────┐
│  PHASE 02.5 SCORING WEIGHT DISTRIBUTION               │
│                                                        │
│  1. Code Quality & TypeScript Rigor:      20%          │
│  2. Framework & SSR Compatibility:        15%          │
│  3. Accessibility & WCAG 2.2 AA:          15%          │
│  4. Responsiveness, Layout & CSS Engine:  15%          │
│  5. Maintainability & Upstream Health:    15%          │
│  6. Customization, Theming & Tokens:      10%          │
│  7. Documentation & Developer Experience: 10%          │
│                                           ────         │
│  TOTAL COMPOSITE WEIGHT:                 100%          │
└────────────────────────────────────────────────────────┘
```

---

## 5. Sign-Off & Transfer Certification

The Phase 02.4 deliverables provide a complete, verified, and mathematically reconciled data baseline. Phase 02.5 researchers may proceed immediately with quantitative scoring and component stack selection using the mode-specific pre-filtering rules.

**Transferred By:** Principal Software Architect & Registry Platform Architect  
**Received By:** Phase 02.5 Research Team  
**Date:** 2026-11-22  
**Status:** **HANDOFF COMPLETE / APPROVED FOR PHASE 02.5**
