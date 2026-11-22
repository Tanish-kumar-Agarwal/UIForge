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
- **Gate G3 — Security and Supply-Chain Integrity:** No critical unmitigated CVEs, no typosquatting risks, clean install script behaviors, active maintainer trust.
- **Gate G4 — Technical Evidence Sufficiency:** Sufficient empirical documentation and package metadata to substantiate adoption in the proposed consumption mode.
- **Gate G5 — Product and Architectural Fit:** Aligned with UIForge's mission as an open engineering intelligence platform (rejecting generic SaaS builders, static templates, or monolithic black-box lock-in).
- **Gate G6 — Operational Viability:** Feasible installation, manageable maintenance overhead, modern React 18/19 compatibility, cross-platform portability.

### Gate Results Classification
- `PASS`: Unconditional pass across all evaluated criteria.
- `PASS_WITH_RESTRICTIONS`: Eligible for adoption subject to strictly enforced boundary conditions (e.g. out-of-process CLI boundary for axe-core; SIL OFL RFN notice preservation).
- `PENDING`: Gated pending formal legal counsel review or experimental benchmarking. Prevents default adoption.
- `FAIL`: Unmitigated failure on a mandatory gate. Results in immediate rejection to Tier 5.

---

## 2. Hard-Gate Evaluation Summary

| Gate | Description | Passing Candidates | Restricted Pass | Pending Review | Failed Candidates |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Gate G1** | Identity & Source Integrity | 124 | 0 | 0 | 1 (`OS-D2C-08` Locofy) |
| **Gate G2** | Licensing & Intellectual Property | 119 | 4 (axe-core, GSAP, Inter, Geist) | 1 (`OS-A11Y-05` pa11y) | 2 (`OS-MKT-08` Aceternity, `OS-ANIM-08` Remotion) |
| **Gate G3** | Security & Supply Chain | 121 | 0 | 0 | 4 (`OS-DASH-05`, `OS-VREG-04`, `OS-VREG-05`, `OS-DASH-08`) |
| **Gate G4** | Evidence Sufficiency | 121 | 0 | 4 (Deferred candidates) | 0 |
| **Gate G5** | Product & Architectural Fit | 122 | 0 | 0 | 3 (Locofy, SaaS UI, Aceternity) |
| **Gate G6** | Operational Viability | 113 | 0 | 4 (Deferred candidates) | 8 (All Tier 5 candidates) |

---

## 3. Quarantined & Gated Candidates

### 3.1 Tier 5 Rejection Register (8 Failed Candidates)
1. **`OS-MKT-08` (Aceternity UI):** **FAIL on Gate G2 (Licensing)**. Proprietary commercial terms strictly prohibit reselling, redistributing, or embedding components into open developer platforms.
2. **`OS-D2C-08` (Locofy.ai):** **FAIL on Gate G1 (Identity) & Gate G5 (Fit)**. Closed proprietary SaaS platform; no public source repository, no open integration API.
3. **`OS-ANIM-08` (Remotion):** **FAIL on Gate G2 (Licensing)**. Commercial Company License with strict employee count restriction (<= 3 employees); incompatible with open-source core redistribution.
4. **`OS-DASH-05` (React-Grid-Layout):** **FAIL on Gate G3 (Security/Maintenance) & Gate G6 (Viability)**. Abandoned maintenance, severe React 18/19 compatibility regressions, open issues regarding layout shift and reflow calculation bugs.
5. **`OS-VREG-04` (Loki):** **FAIL on Gate G3/G6**. Abandoned visual regression tool with broken dependencies against modern Playwright and Chromium.
6. **`OS-VREG-05` (BackstopJS):** **FAIL on Gate G3/G6**. Legacy visual regression tool with heavy unmaintained Puppeteer dependency chain and high maintenance overhead.
7. **`OS-COMP-15` (SaaS UI):** **FAIL on Gate G5 (Fit) & Gate G6 (Viability)**. Tightly coupled proprietary Pro tier upsell; poor standalone maintainability and restrictive community edition.
8. **`OS-DASH-08` (Tabler React):** **FAIL on Gate G2/G6**. Abandoned React 16 legacy wrapper; completely incompatible with React 18/19 and modern Tailwind styling.

### 3.2 Tier 4 Deferred Register (4 Pending Candidates)
1. **`OS-A11Y-05` (pa11y):** **PENDING on Gate G2 (Licensing)**. Governed by LGPL-3.0; direct dynamic linking into compiled JavaScript bundles carries viral copyleft risk. Gated pending formal legal counsel review (`counselReviewRequired: true`, `LEG-02`).
2. **`OS-D2C-01` (BuilderIO/mitosis):** **PENDING on Gate G4/G6**. Cross-framework JSX compilation engine; deferred to post-React multi-framework expansion phase.
3. **`OS-D2C-02` (figma/code-connect):** **PENDING on Gate G4/G6**. Component mapping deferred to Phase 04 design tool integration.
4. **`OS-BROW-06` (browser-use):** **PENDING on Gate G4/G6**. Python-based LLM browser automation agent; deferred pending evaluation of Node/Python IPC performance.
