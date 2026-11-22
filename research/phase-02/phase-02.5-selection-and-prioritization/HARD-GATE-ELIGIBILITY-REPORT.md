# UIForge Phase 02.5: Hard-Gate Eligibility Report

**Document ID:** `UIF-PH02.5-HARD-GATE-ELIGIBILITY-REPORT`  
**Classification:** Pre-Scoring Gate Verification & Exclusion Registry  
**Status:** Certified / Complete  
**Date:** November 2026  

---

## 1. Hard-Gate Evaluation Architecture

Before weighted technical scoring, every candidate is subjected to **six mandatory hard gates (G1 through G6)** across its proposed consumption mode:
- **Gate G1 — Identity and Source Integrity:** Canonical upstream repository, verified package metadata, exact commit/version evaluated, zero placeholder sources.
- **Gate G2 — Licensing and Intellectual Property:** Permissive, weak-copyleft, or clear commercial terms; notice retention; font RFN compliance; zero viral copyleft contamination; counsel review gating.
- **Gate G3 — Security, Maintenance & Quality:** Active commits/releases within 12 months, zero critical unmitigated CVEs, clean install script behaviors, active maintainer trust (or N/A for stable specifications/assets).
- **Gate G4 — Technical Evidence Sufficiency:** Sufficient empirical documentation and package metadata to substantiate adoption in the proposed consumption mode.
- **Gate G5 — Product and Architectural Fit:** Aligned with UIForge's mission as a headless agentic UI design-to-code platform (rejecting generic SaaS builders, video rendering engines, or monolithic black-box lock-in).
- **Gate G6 — Operational Viability:** Feasible installation, manageable maintenance overhead, modern React 18/19 compatibility, cross-platform portability.

### 1.1 Gate-Applicability Matrix Across Source Types (C04)

Hard-gate evaluation criteria are adapted specifically to the canonical nature of the source to avoid false-positive failures:

| Canonical Source Type | Gate G1 (Identity) | Gate G2 (Licensing) | Gate G3 (Maintenance) | Gate G4 (Evidence) | Gate G5 (Mission Fit) | Gate G6 (Viability) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Runtime Software Package** | Verified npm/git repo | OSI/FSF approved or permissive | Commits/releases within 12 mos, 0 CVEs | Registry & package docs | Design-to-code headless UI | React 18/19, ESM, bundle size |
| **Standard / Specification** | Standardizing body (W3C/DTCG) | Open specification license | `NOT_APPLICABLE` (Spec stability) | Published working drafts | Design token / ARIA grammar | `NOT_APPLICABLE` (No binaries) |
| **Font / Icon Asset** | Upstream foundry repo | SIL OFL 1.1 / MIT + RFN notice | `PASS` (Asset glyph stability) | Vector files & font tables | Modern screen typography/icons | WOFF2 subsets, no vendor drift |
| **Documentation / Reference** | Authoritative publisher | `REFERENCE_ONLY` mode terms | `PASS` (Pattern freshness) | Portal/book content | Clean-room algorithm synthesis | `NOT_APPLICABLE` (No binaries) |
| **Commercial Product / SaaS** | Registered commercial entity | Exportability, redistribution terms | API availability & uptime | Platform documentation | Open developer tool alignment | Vendor lock-in & API drift |
| **Native Browser Capability** | W3C/WHATWG standard | Public open web standard | `NOT_APPLICABLE` (Engine cadence) | MDN / WebKit / Blink status | Native responsive primitive | Baseline browser support |

### 1.2 Gate Results Classification
- `PASS`: Unconditional pass across all evaluated criteria.
- `PASS_WITH_RESTRICTIONS`: Eligible for adoption subject to strictly enforced boundary conditions (e.g. out-of-process CLI boundary for axe-core; SIL OFL RFN notice preservation; organization-size license terms).
- `PENDING`: Gated pending formal legal counsel review or experimental benchmarking. Prevents default adoption.
- `NOT_APPLICABLE`: Gate criterion does not apply to this non-software source type (e.g. maintenance commits for W3C specifications).
- `FAIL`: Unmitigated failure on a mandatory gate. Results in immediate rejection to Tier 5.

---

## 2. Hard-Gate Evaluation Summary

| Gate | Description | Passing / N/A | Restricted Pass | Pending Review | Failed Candidates |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Gate G1** | Identity & Source Integrity | 124 | 0 | 0 | 1 (`OS-D2C-08` Locofy) |
| **Gate G2** | Licensing & Intellectual Property | 118 | 5 (axe-core, GSAP, Inter, Geist, Remotion) | 1 (`OS-A11Y-05` pa11y) | 1 (`OS-MKT-08` Aceternity) |
| **Gate G3** | Security, Maintenance & Quality | 124 | 0 | 0 | 1 (`OS-DASH-08` Tabler React) |
| **Gate G4** | Evidence Sufficiency | 121 | 0 | 4 (Deferred candidates) | 0 |
| **Gate G5** | Product & Architectural Fit | 119 | 3 (RGL, BackstopJS, Loki) | 0 | 3 (Locofy, SaaS UI, Remotion) |
| **Gate G6** | Operational Viability | 119 | 0 | 4 (Deferred candidates) | 2 (Tabler React, SaaS UI) |

---

## 3. Quarantined & Gated Candidates

### 3.1 Tier 5 Rejection Register (7 Excluded Candidates)
1. **`OS-MKT-08` (Aceternity UI):** **FAIL on Gate G2 (Licensing)**. Proprietary commercial terms strictly prohibit reselling, redistributing, or embedding components into open developer platforms.
2. **`OS-D2C-08` (Locofy.ai):** **FAIL on Gate G1 (Identity) & Gate G5 (Fit)**. Closed proprietary SaaS platform; no public source repository, no open integration API.
3. **`OS-ANIM-08` (Remotion):** **FAIL on Gate G5 (Fit)**. Programmatic video composition and rendering engine (Chrome/FFmpeg) rather than interactive web UI design-to-code generation. Free license is restricted to entities with <=3 employees.
4. **`OS-COMP-15` (SaaS UI):** **FAIL on Gate G5 (Fit) & Gate G6 (Viability)**. Tightly coupled proprietary Pro tier upsell; poor standalone maintainability and restrictive community edition.
5. **`OS-DASH-08` (Tabler React):** **FAIL on Gate G3 (Maintenance) & Gate G6 (Viability)**. Abandoned React 16 legacy wrapper; completely incompatible with React 18/19 and modern Tailwind styling.
6. **`OS-VREG-04` (Loki):** **PASS_WITH_RESTRICTIONS on Hard Gates**. Excluded in Tier 5 due to capability redundancy with Playwright multi-browser engine + Pixelmatch and heavy Storybook runtime coupling.
7. **`OS-VREG-05` (BackstopJS):** **PASS_WITH_RESTRICTIONS on Hard Gates**. Functional visual regression tool (v6.3.25), but excluded in Tier 5 due to capability overlap with Playwright + Pixelmatch and legacy external runner harness.

*Note on `OS-DASH-05` (React-Grid-Layout):* Following maintenance re-evaluation (v2.3.0 published Oct 5, 2026, active Playwright E2E harness, React 18/19 support), React-Grid-Layout passes G1-G6 and is admitted to Tier 2 (Optional Integrations) as an interactive dashboard grid adapter. Candidate ID confirmed as `OS-DASH-05` (distinct from `OS-LAYT-03` Radix Aspect Ratio).

### 3.2 Tier 4 Deferred Register (4 Pending Candidates)
1. **`OS-A11Y-05` (pa11y):** **PENDING on Gate G2 (Licensing)**. Governed by LGPL-3.0; direct dynamic linking into compiled JavaScript bundles carries viral copyleft risk. Gated pending formal legal counsel review (`counselReviewRequired: true`, `LEG-02`).
2. **`OS-D2C-01` (BuilderIO/mitosis):** **PENDING on Gate G4/G6**. Cross-framework JSX compilation engine; deferred to post-React multi-framework expansion phase.
3. **`OS-D2C-02` (figma/code-connect):** **PENDING on Gate G4/G6**. Component mapping deferred to Phase 04 design tool integration.
4. **`OS-BROW-06` (browser-use):** **PENDING on Gate G4/G6**. Python-based LLM browser automation agent; deferred pending evaluation of Node/Python IPC performance.
