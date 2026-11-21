# UIForge Phase 02.4: Phase 02.5 Handoff Document

**Document ID:** UIF-PH02.4-PHASE-02.5-HANDOFF  
**Classification:** Milestone Transition, Downstream Handoff, Selection Scoring Blueprint  
**Status:** Canonical / Approved  
**Authoritative Location:** `research/phase-02/phase-02.4-internal-source-registry/PHASE-02.5-HANDOFF.md`  

---

## 1. Executive Summary & Purpose

This handoff document formally transitions the outputs of **Phase 02.4 (Internal Source Registry)** to **Phase 02.5 (Source Selection and Scoring Matrix)**. 

Phase 02.4 has established the immutable truth of UIForge’s open-source universe: exactly 125 canonical candidates, normalized into 147 packages, 31 component groups, and 6 standalone assets, governed across 6 consumption modes ($125 \times 6 = 750$ permission records) with cryptographic SHA-256 provenance.

Phase 02.5 researchers must utilize this registry dataset to conduct quantitative scoring, category-by-category stack trade-off analyses, and final component selection.

---

## 2. Transferred Assets and Inputs

The following Phase 02.4 deliverables serve as primary inputs for Phase 02.5:

| Transferred Asset | Path | Description & Downstream Purpose |
| :--- | :--- | :--- |
| **Master Source Index** | `data/sources.json` | 125 canonical candidate records with priority, evaluation status, license disposition, and eligibility. |
| **Normalized Packages** | `data/packages.json` | 147 installable npm packages with versioning and monorepo mapping. |
| **Component Primitives** | `data/components.json` | 31 primary component groups for atomic UI template mapping. |
| **Asset Register** | `data/assets.json` | 6 independently verified font, icon, script, and testing assets. |
| **Technical Evaluations** | `data/evaluations.json` | 125 technical evaluations summarizing Phase 02.2 findings across 10 dimensions. |
| **Permissions Matrix** | `data/consumption-permissions.json`| 750 mode permissions defining what can be imported, copied, or bundled. |
| **Cryptographic Provenance**| `data/provenance.json` | Pinned Git commits and SHA-256 digests ensuring tamper-evident baseline. |
| **Gaps & Legal Escalations**| `REGISTRY-GAP-AND-LIMITATION-REGISTER.md` | Active constraints (LEG-01 to LEG-10, GAP-01 to GAP-08). |

---

## 3. Recommended Phase 02.5 Selection Scoring Methodology

Phase 02.5 evaluates candidates within their specific category to select UIForge’s default stack. Scoring must strictly follow the 7-dimension weighted rubric established in the Phase 02.4 architecture:

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

### 3.1 Scoring Formula
For each candidate $i$ in category $C$:
$$\text{Composite Score}_i = \sum_{k=1}^{7} (W_k \times S_{i,k})$$
Where:
- $W_k$ is the weight of dimension $k$ ($\sum W_k = 1.0$).
- $S_{i,k}$ is the normalized score ($0.0 - 10.0$) evaluated for candidate $i$ on dimension $k$.

### 3.2 Pre-Scoring Filtering Rules
Before calculating scores, apply the Phase 02.4 Eligibility Precedence Filter:
1. If `registryEligibility == 'BLOCKED'`, candidate is **DISQUALIFIED** from direct adoption (score = `0.0`, category status: `DISQUALIFIED`).
2. If `registryEligibility == 'REFERENCE_ONLY'`, candidate may be scored for architectural benchmarks but cannot be selected for `DEPENDENCY` or `SOURCE_COPY`.
3. If `registryEligibility == 'ELIGIBLE_WITH_RESTRICTIONS'` or `'APPROVED'`, candidate proceeds to full competitive ranking.

---

## 4. Candidate Pool Mapping by Category

The 125 canonical candidates map across the 14 UIForge categories as follows:

| Category Code | Category Name | Total Candidates | Pre-Filtered Status (P0/P1 High-Scrutiny Pool) |
| :--- | :--- | :---: | :--- |
| `CAT-01` | React Component Libraries | 15 | Radix UI, React Aria, Headless UI, shadcn/ui, Chakra UI |
| `CAT-02` | Styling & CSS Frameworks | 12 | Tailwind CSS, CSS Modules, StyleX, Vanilla Extract |
| `CAT-03` | Animation & Motion Engines | 8 | Framer Motion, GSAP (restricted), Motion One, Remotion (gated) |
| `CAT-04` | Data Visualization & Charts | 10 | Recharts, Tremor, Visx, Chart.js, Victory |
| `CAT-05` | Form State & Validation | 9 | React Hook Form, Zod, TanStack Form, Formik |
| `CAT-06` | Table & Data Grid | 8 | TanStack Table, AG Grid (Community), React Data Grid |
| `CAT-07` | Icons & Visual Assets | 8 | Lucide Icons, Radix Icons, Heroicons, Tabler Icons |
| `CAT-08` | Typography & Fonts | 5 | Inter (OFL), Geist (OFL), Roboto, JetBrains Mono |
| `CAT-09` | Layout & Responsive Primitives | 8 | AutoLayout patterns, CSS Grid engines, Flexbox primitives |
| `CAT-10` | Accessibility Testing Tools | 7 | axe-core (MPL-2.0 notice), pa11y (CLI tool only), Jest Axe |
| `CAT-11` | Mocking & Prototyping Utilities | 8 | MSW (Mock Service Worker), Faker.js, Mirage |
| `CAT-12` | Code Generation Engines | 9 | LiquidJS, EJS, Handlebars, Mustache |
| `CAT-13` | Headless CMS & Schema Adapters | 9 | Contentful, Strapi, Sanity schema adapters |
| `CAT-14` | Design-to-Code & AI Reference | 9 | v0, Locofy.ai, TeleportHQ (Strictly REFERENCE_ONLY) |
| **TOTAL** | **14 Categories** | **125** | **100% Accounted For** |

---

## 5. Candidate Selection Guidelines for Phase 02.5 Researchers

When conducting trade-off evaluations in Phase 02.5:
1. **Primary Component Primitive:** Strongly prioritize **Radix UI** primitives combined with **Tailwind CSS** styling (the headless composition pattern).
2. **Animation Engine:** Designate **Framer Motion** for standard declarative UI transitions; utilize **GSAP** strictly for complex timelines as an optional emitted dependency, strictly respecting non-compete clauses.
3. **Table Engine:** Select **TanStack Table** as the headless foundation due to zero-dependency architecture and complete styling flexibility.
4. **Form Management:** Standardize on **React Hook Form + Zod** for zero-re-render high-performance validation.
5. **Icon System:** Standardize on **Lucide React** (ISC licensed, 1400+ tree-shakeable icons).
6. **Accessibility Harness:** Mandate **axe-core** integrated via external runner with automated notice generation.

---

## 6. Sign-Off & Transfer Certification

The Phase 02.4 deliverables provide a complete, verified, and mathematically reconciled data baseline. Phase 02.5 researchers may proceed immediately with quantitative scoring and component stack selection.

**Transferred By:** Principal Software Architect & Registry Platform Architect  
**Received By:** Phase 02.5 Research Team  
**Date:** 2026-11-22  
**Status:** **HANDOFF COMPLETE / APPROVED FOR PHASE 02.5**
