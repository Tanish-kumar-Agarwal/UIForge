# UIForge Phase 02.4: Phase 02.5 Handoff Document

**Document ID:** UIF-PH02.4-PHASE-02.5-HANDOFF  
**Classification:** Milestone Transition, Downstream Handoff, Selection Scoring Blueprint  
**Status:** Certified / Approved  
**Authoritative Location:** `research/phase-02/phase-02.4-internal-source-registry/PHASE-02.5-HANDOFF.md`  

---

## 1. Executive Summary & Purpose

This handoff document formally transitions the outputs of **Phase 02.4 (Internal Source Registry)** to **Phase 02.5 (Source Selection and Scoring Matrix)**.

Phase 02.4 has established the immutable truth of UIForge’s open-source universe: exactly **125 canonical candidates** (24 P0, 47 P1, 50 P2, 4 REJ), normalized into **119 authoritative Git repositories**, **147 packages**, **31 component groups**, and **6 standalone assets**, governed across **6 consumption modes** ($125 \times 6 = 750$ permission records) with **625 granular evidence items** and digest-backed provenance.

Phase 02.5 researchers must utilize this registry dataset to conduct quantitative scoring, category-by-category stack trade-off analyses, and final component selection.

---

## 2. Mode-Specific Eligibility Pre-Filtering (Crucial Governance Gate)

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

### 2.1 Mode-Specific Pool Isolation Matrix:

| Candidate ID & Name | Mode 2: `DEPENDENCY` Selection Pool | Mode 3: `SOURCE_COPY` Selection Pool | Mode 1: `REFERENCE_ONLY` Pool | Phase 02.5 Scoring Action |
| :--- | :---: | :---: | :---: | :--- |
| **`SRC-OS-COMP-01` (shadcn/ui)** | **QUALIFIED** | **QUALIFIED** | **QUALIFIED** | Score for template copying & component CLI scaffolding. |
| **`SRC-OS-COMP-02` (Radix UI)** | **QUALIFIED** | **QUALIFIED** | **QUALIFIED** | Score as foundational headless UI dependency. |
| **`SRC-OS-ANIM-04` (GSAP)** | **QUALIFIED (Restricted)** | **DISQUALIFIED (BLOCKED)** | **QUALIFIED** | Score strictly as an optional emitted dependency (`npm i gsap`). Strictly forbidden from source-code copying. |
| **`SRC-OS-A11Y-01` (axe-core)** | **QUALIFIED (Notice)** | **QUALIFIED (MPL)** | **QUALIFIED** | Score for testing engine with automated notice injection. |
| **`SRC-OS-A11Y-05` (pa11y)** | **DISQUALIFIED (PENDING)** | **DISQUALIFIED (BLOCKED)** | **QUALIFIED** | Excluded from runtime dependencies and source-copying pending legal counsel review. External tool mode is also PENDING_REVIEW. |
| **`SRC-OS-MKT-08` (Aceternity UI)** | **DISQUALIFIED (BLOCKED)** | **DISQUALIFIED (BLOCKED)** | **QUALIFIED** | Excluded from generation dependencies and code emission. Reference-only for clean-room pattern benchmarks. |
| **`SRC-OS-D2C-08` (Locofy.ai)** | **DISQUALIFIED (BLOCKED)** | **DISQUALIFIED (BLOCKED)** | **QUALIFIED** | Excluded from generation dependencies. Reference-only for prompt engineering and design-to-code research. |

> [!CRITICAL]
> **Reference-Only Exclusion Principle:** A candidate approved under `REFERENCE_ONLY` does **NOT** qualify for selection as an emitted dependency or copied template. Selecting an external package for UIForge code generation requires explicit clearance in `DEPENDENCY` or `SOURCE_COPY` mode.

---

## 3. Transferred Assets and Inputs

The following Phase 02.4 deliverables serve as primary inputs for Phase 02.5:

| Transferred Asset | Path | Description & Downstream Purpose |
| :--- | :--- | :--- |
| **Master Source Index** | `data/sources.json` | 125 canonical candidate records with preserved original priorities (P0: 24, P1: 47, P2: 50, REJ: 4) and operational tiers. |
| **Authoritative Repositories**| `data/repositories.json`| 119 verified Git repositories with canonical URLs and branch tracking. |
| **Normalized Packages** | `data/packages.json` | 147 installable npm packages with versioning and monorepo mapping. |
| **Component Primitives** | `data/components.json` | 31 primary component groups for atomic UI template mapping. |
| **Asset Register** | `data/assets.json` | 6 independently verified font, icon, script, and testing assets with explicit RFN evidence. |
| **Technical Evaluations** | `data/evaluations.json` | 1,250 dimensional assessments across 10 dimensions (71 complete, 54 partial). |
| **Permissions Matrix** | `data/consumption-permissions.json`| 750 mode permissions defining what can be imported, copied, or bundled with canonical enums. |
| **Digest-Backed Provenance**| `data/provenance.json` | Pinned Git commits and SHA-256 digests ensuring tamper-evident baseline. |
| **Granular Evidence Dossiers**| `data/evidence.json` | 125 candidate dossiers containing 625 granular evidence items supporting individual claims. |
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

### 4.1 Scoring Formula
For each candidate $i$ in category $C$:
$$\text{Composite Score}_i = \sum_{k=1}^{7} (W_k \times S_{i,k})$$
Where:
- $W_k$ is the weight of dimension $k$ ($\sum W_k = 1.0$).
- $S_{i,k}$ is the normalized score ($0.0 - 10.0$) evaluated for candidate $i$ on dimension $k$.

---

## 5. Sign-Off & Transfer Certification

The Phase 02.4 deliverables provide a complete, verified, and mathematically reconciled data baseline. Phase 02.5 researchers may proceed immediately with quantitative scoring and component stack selection using the mode-specific pre-filtering rules.

**Transferred By:** Principal Software Architect & Registry Platform Architect  
**Received By:** Phase 02.5 Research Team  
**Date:** 2026-11-22  
**Status:** **HANDOFF COMPLETE / APPROVED FOR PHASE 02.5**
