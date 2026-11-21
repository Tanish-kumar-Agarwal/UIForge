# UIFORGE PHASE 02.4 — INITIAL CANONICAL REGISTRY DATASET
# Narrative Analysis of the 125 Normalized Candidate Records

**Document ID:** `UIF-PH02.4-INITIAL-DATASET`  
**Phase:** 02.4 — Internal Source Registry  
**Standard:** Open-Source Ecosystem Researcher & Data Governance Architect  
**Data Directory:** [`data/`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/data/)  
**Status:** 100% Normalized Across Canonical 125 Universe  

---

## 1. Master Dataset Summary Metrics

```
┌────────────────────────────────────────────────────────────────────────┐
│                   INITIAL CANONICAL DATASET METRICS                    │
├──────────────────────────────────────────┬──────────────┬──────────────┤
│ Entity Classification                    │ Count        │ Scope        │
├──────────────────────────────────────────┼──────────────┼──────────────┤
│ Canonical Source Records (`sources.json`) │ 125          │ 100% Universe│
│ Upstream Repositories (`repositories.j`) │ 125          │ 1:1 Mapping  │
│ Installable Packages (`packages.json`)   │ 147          │ Monorepo Subs│
│ Component Group Primitives (`components`)│ 31           │ UI / Layout  │
│ Standalone Assets (`assets.json`)        │ 6            │ Font/Icon/JS │
│ Normalized Licenses (`licenses.json`)    │ 11           │ SPDX & Custom│
│ Technical Evaluations (`evaluations.j`)  │ 125          │ 10 Dimensions│
│ Mode Permissions (`consumption-perms.j`) │ 750          │ 125 * 6 Modes│
│ Provenance Digest Records (`provenance.j`)│ 125         │ SHA-256 Seal │
│ Evidence Dossiers (`evidence.json`)      │ 125          │ Linked Proofs│
└──────────────────────────────────────────┴──────────────┴──────────────┘
```

---

## 2. Category Distribution across the 125 Sources

All 14 canonical categories from Phase 02.1 are represented without omissions:

| Category ID & Title | Canonical Sources | P0 | P1 | P2 | REJ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| 1. Category 01 — UI Component Ecosystems | 17 Sources | 4 | 7 | 6 | 0 |
| 2. Category 02 — Landing Page & Marketing Section Ecosystems | 8 Sources | 0 | 3 | 4 | 1 |
| 3. Category 03 — Dashboard & Application Components | 8 Sources | 0 | 3 | 5 | 0 |
| 4. Category 04 — Design Systems & Design Tokens | 9 Sources | 2 | 4 | 3 | 0 |
| 5. Category 05 — Animation & Motion Ecosystems | 8 Sources | 1 | 3 | 2 | 2 |
| 6. Category 06 — Icons, Illustrations & Visual Assets | 8 Sources | 2 | 3 | 3 | 0 |
| 7. Category 07 — Charts & Data Visualization | 8 Sources | 0 | 4 | 4 | 0 |
| 8. Category 08 — Typography & Content Presentation | 7 Sources | 2 | 3 | 2 | 0 |
| 9. Category 09 — Layout & Responsive Design Patterns | 8 Sources | 1 | 4 | 3 | 0 |
| 10. Category 10 — Accessibility Utilities | 8 Sources | 3 | 2 | 3 | 0 |
| 11. Category 11 — Design-to-Code & Design Intelligence | 8 Sources | 0 | 3 | 4 | 1 |
| 12. Category 12 — AI Agent Skills, MCP & Developer Ecosystem | 11 Sources | 4 | 4 | 3 | 0 |
| 13. Category 13 — Browser Testing & Execution Infrastructure | 9 Sources | 2 | 2 | 5 | 0 |
| 14. Category 14 — Visual Regression & Frontend Quality | 8 Sources | 3 | 2 | 3 | 0 |
| **TOTALS** | **125 Sources** | **24** | **47** | **50** | **4** |

---

## 3. License & Legal Disposition Breakdown

### Entire Universe (125 Sources)
- **Permissive Open-Source (114 sources / 91.2%):**
  - MIT: 110 sources
  - Apache-2.0: 2 sources (`OS-TOK-01` Style Dictionary, `OS-BROW-01` Playwright)
  - ISC: 2 sources (`OS-ICON-01` Lucide, `OS-ICON-02` Radix Icons)
- **Weak Copyleft (1 source / 0.8%):**
  - MPL-2.0: 1 source (`OS-A11Y-01` axe-core; Section 3 Larger Work notice & source availability obligations)
- **Copyleft Subprocess Boundary (1 source / 0.8%):**
  - LGPL-3.0: 1 source (`OS-A11Y-05` pa11y; isolated CLI process execution required)
- **Open Font Software (2 sources / 1.6%):**
  - OFL-1.1: 2 sources (`OS-TYPO-04` Inter, `OS-TYPO-05` Geist; RFN compliance required)
- **Community Specification (1 source / 0.8%):**
  - W3C-20150513: 1 source (`OS-SPEC-01` DTCG Design Tokens Specification)
- **Custom Proprietary Free Commercial with Restriction (1 source / 0.8%):**
  - `LicenseRef-GSAP-Standard`: 1 source (`OS-ANIM-04` GSAP; Webflow Standard License: free commercial web/app use; non-compete for visual animation builders)
- **Commercial / Closed SaaS / Proprietary (5 sources / 4.0%):**
  - Commercial / Closed: 3 sources (`OS-MKT-08` Aceternity UI, `OS-ANIM-08` Remotion, `OS-D2C-08` Locofy)
  - Proprietary Ecosystem Clients: 2 sources (`OS-AGNT-03` Claude Code, `OS-AGNT-04` Cursor)

$$\text{Sum: } 114 + 1 + 1 + 2 + 1 + 1 + 5 = \mathbf{125}\text{ Sources}$$

---

## 4. Operational Registry Eligibility Distribution

| Registry Eligibility State | Count | Percentage | Operational Meaning |
| :--- | :---: | :---: | :--- |
| **`approved`** | 67 Sources | 53.6% | Permissive open-source libraries satisfying all technical and legal gates for operational integration. |
| **`conditional`** | 43 Sources | 34.4% | Permitted subject to documented conditions (e.g. MPL notices, RFN font preservation, emitted GSAP dependency). |
| **`reference_only`** | 9 Sources | 7.2% | Permitted exclusively for architectural analysis, W3C specification study, or MCP client interaction. |
| **`blocked`** | 6 Sources | 4.8% | Strictly prohibited from operational scaffolding due to commercial paywalls or technical maintenance failure. |
| **TOTAL** | **125 Sources** | **100.0%** | Comprehensive deterministic classification. |
