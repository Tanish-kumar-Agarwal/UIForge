# UIForge Phase 02.4: Initial Registry Dataset

**Document ID:** UIF-PH02.4-INITIAL-REGISTRY-DATASET  
**Classification:** Baseline Data Manifest Documentation, Entity Census, Mathematical Reconciliation  
**Status:** Certified / Approved  
**Authoritative Location:** `research/phase-02/phase-02.4-internal-source-registry/INITIAL-REGISTRY-DATASET.md`  

---

## 1. Executive Summary & Inventory Census

The initial dataset of the **UIForge Internal Source Registry** represents the authoritative, mathematically reconciled open-source universe derived from Phase 02.1 (`candidate-inventory.md`), Phase 02.2 (`MASTER-ARCHITECTURE.md`), and Phase 02.3 (`candidate-master-inventory.json`).

The dataset cleanly decomposes candidates across 10 normalized entities, strictly distinguishing code repositories from documentation portals, SaaS platforms, installable packages, UI primitives, and binary assets:

| Entity Manifest | Storage Path | Reconciled Record Count | Architectural & Legal Role |
| :--- | :--- | :---: | :--- |
| **Sources** | [`data/sources.json`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/data/sources.json) | **125** | Canonical candidate universe preserving 100% of Phase 02.1 IDs (`candidateId` & `sourceId`). |
| **Repositories** | [`data/repositories.json`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/data/repositories.json) | **119** | Authoritative Git repositories (GitHub/GitLab); 6 non-repo candidates tracked via platform URLs. |
| **Packages** | [`data/packages.json`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/data/packages.json) | **147** | Normalized installable npm packages resolving monorepos (e.g. Radix sub-packages). |
| **Components** | [`data/components.json`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/data/components.json) | **31** | Primary component groups across primitives, layout blocks, and compound controls. |
| **Assets** | [`data/assets.json`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/data/assets.json) | **8** | 6 core standalone assets + 2 font packages (JetBrains Mono, Fira Code) traced to Fontsource. |
| **Licenses** | [`data/licenses.json`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/data/licenses.json) | **12** | Canonical license definitions including `LIC-EVERY-LAYOUT-COMMERCIAL`. |
| **Evaluations** | [`data/evaluations.json`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/data/evaluations.json) | **125** | 1,250 assessments: 71 complete candidate technical evaluations, 54 screened/partial. |
| **Permissions** | [`data/consumption-permissions.json`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/data/consumption-permissions.json) | **750** | Exhaustive mode matrix ($125 \times 6$) defining conditions, notices, and legal reviews. |
| **Provenance** | [`data/provenance.json`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/data/provenance.json) | **125** | Digest-backed provenance records with evaluated commits and 64-character SHA-256 digests. |
| **Evidence** | [`data/evidence.json`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/data/evidence.json) | **125** | 125 candidate dossiers containing 625 granular evidence items with claim-level quality checks. |

---

## 2. Canonical Priority Reconciliation & Operational Tiers

Every candidate record in [`data/sources.json`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/data/sources.json) explicitly tracks three separate priority/tier fields:
- `originalDiscoveryPriority`: Exact preservation of the Phase 02.1/Phase 02.3 canonical classification.
- `currentDiscoveryPriority`: Active operational priority (identical to original; zero silent conversions).
- `registryOperationalTier`: Architectural monitoring tier for freshness scheduling.

### Mathematical Distribution:
$$\text{Canonical Sum: } P0 (24) + P1 (47) + P2 (50) + REJ (4) = 125$$

| Priority Code | Discovery Tier Description | Candidate Count | Operational Tier | Operational Scope |
| :--- | :--- | :---: | :---: | :--- |
| **`P0`** | Foundational / Critical Path | **24** | `TIER_A` | Core architecture primitives (Radix, React Aria, Tailwind, etc.). 30-day freshness. |
| **`P1`** | High Value / Strategic Secondary | **47** | `TIER_B` | Advanced components, utilities, and testing tools. 60-day freshness. |
| **`P2`** | Exploratory / Niche Alternatives | **50** | `TIER_C` | Candidate alternatives and reference libraries. 90-day freshness. |
| **`REJ`** | Terminal Policy Gating | **4** | `TIER_D` | Aceternity UI, GSAP, Remotion, Locofy.ai. Excluded from default core stack. |
| **TOTAL** | **Canonical Candidate Universe** | **125** | — | **100% Mathematically Reconciled** |

---

## 3. Dependency Eligibility Arithmetic Reconciliation (Issue 1 Resolution)

Accounting for all 125 candidate sources in `DEPENDENCY` mode:

```
┌────────────────────────────────────────────────────────┐
│  DEPENDENCY MODE ELIGIBILITY CENSUS (125 Sources)      │
│                                                        │
│  - APPROVED:               111 Candidates              │
│  - RESTRICTED:               2 Candidates (GSAP, axe)  │
│    ├── Total Eligible:     113 Candidates              │
│                                                        │
│  - BLOCKED:                  7 Candidates              │
│  - PENDING_REVIEW:           1 Candidate (pa11y)       │
│  - NOT_APPLICABLE:           4 Candidates              │
│    ├── Total Ineligible:    12 Candidates              │
│                                                        │
│  SUM: 111 + 2 + 7 + 1 + 4 = 125 Sources (100% Exact)   │
└────────────────────────────────────────────────────────┘
```

### Breakdown of the 12 Ineligible Dependencies:
1. `SRC-OS-MKT-08` (`aceternity/ui`) — `BLOCKED` (Commercial terms prohibit package embedding).
2. `SRC-OS-D2C-08` (`locofy/locofy`) — `BLOCKED` (Closed SaaS platform).
3. `SRC-OS-ANIM-08` (`remotion`) — `BLOCKED` (Requires commercial company license for $>3$ employees).
4. `SRC-OS-COMP-15` (`rebass`) — `BLOCKED` (Abandoned project).
5. `SRC-OS-DASH-08` (`react-grid-layout`) — `BLOCKED` (Abandoned project).
6. `SRC-OS-VREG-04` (`loki`) — `BLOCKED` (Abandoned visual testing library).
7. `SRC-OS-VREG-05` (`backstopjs`) — `BLOCKED` (Abandoned visual regression library).
8. `SRC-OS-A11Y-05` (`pa11y`) — `PENDING_REVIEW` (LGPL-3.0 copyleft dynamic linking concerns).
9. `SRC-OS-LAYT-08` (`Every-Layout`) — `NOT_APPLICABLE` (Web book & documentation resource; no npm package).
10. `SRC-OS-AGNT-03` (`claude-code`) — `NOT_APPLICABLE` (Closed developer CLI; interface via MCP).
11. `SRC-OS-AGNT-04` (`cursor`) — `NOT_APPLICABLE` (Closed developer IDE platform).
12. `SRC-OS-AGNT-05` (`windsurf`) — `NOT_APPLICABLE` (Closed developer IDE platform).

---

## 4. Canonical License Entities Reconciliation (12 Normalized Entities)

| License Entity ID | Formal License Name | Candidate Count | High-Level Disposition | Governance Conditions |
| :--- | :--- | :---: | :--- | :--- |
| **`LIC-MIT`** | MIT License | **109** | `PERMISSIVE` | Retain copyright notice in source headers and distributions. |
| **`LIC-APACHE-2.0`** | Apache License 2.0 | **2** | `PERMISSIVE` | Section 4 notice retention; explicit patent license grant included. |
| **`LIC-ISC`** | ISC License | **2** | `PERMISSIVE` | Equivalent to 2-clause BSD; notice retention in Lucide icon pack. |
| **`LIC-MPL-2.0`** | Mozilla Public License 2.0 | **1** | `COPYLEFT_RESTRICTED` | `axe-core`: Section 3 Larger Work notice required; modified covered files under MPL-2.0. |
| **`LIC-LGPL-3.0`** | GNU Lesser General Public License 3.0 | **1** | `COPYLEFT_RESTRICTED` | `pa11y`: Out-of-process CLI boundary required; dynamic linking `PENDING_REVIEW`. |
| **`LIC-OFL-1.1`** | SIL Open Font License 1.1 | **2** | `PERMISSIVE_WITH_NOTICE` | `Inter`, `Geist`: Explicit Reserved Font Name (RFN) active; font cannot be sold standalone. |
| **`LIC-W3C`** | W3C Software and Document License | **1** | `PERMISSIVE_WITH_NOTICE` | `w3c/aria-practices`: Retain verbatim W3C copyright notice and URL reference. |
| **`LIC-GSAP-STANDARD`**| GreenSock Standard Commercial License | **1** | `CONDITIONAL` | Webflow April 2025 commercial free terms; non-compete prohibits inclusion in visual builders. |
| **`LIC-REMOTION-COMMERCIAL`**| Remotion Company License | **1** | `CONDITIONAL` | Free for individuals / companies $\le 3$ employees; commercial key required for $>3$ employees. |
| **`LIC-COMMERCIAL`** | Commercial Terms of Service | **2** | `PROPRIETARY_CLOSED` | `Aceternity UI`, `Locofy.ai`: Redistribution and code copying strictly prohibited. |
| **`LIC-PROPRIETARY`** | Closed Proprietary Platform Terms | **2** | `PROPRIETARY_CLOSED` | `Cursor`, `Windsurf`: Closed-source developer IDE platforms. |
| **`LIC-EVERY-LAYOUT-COMMERCIAL`** | Every Layout Paid Authored Content Terms | **1** | `PROPRIETARY_CLOSED` | Authored book text, diagrams, and components are paid content. Clean-room CSS algorithms permitted. |
| **TOTAL** | **12 License Entities** | **125** | — | **100% Candidates Accounted For** |

---

## 5. Font Asset Census & Fontsource Monorepo Mapping (Issue 4 Resolution)

The registry tracks **8 standalone assets** in [`data/assets.json`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/data/assets.json):
1. **`ASSET-OS-ICON-01-1`:** Lucide SVG Vector Icons (ISC License)
2. **`ASSET-OS-TYPO-04-1`:** Inter Variable Font (`Inter.var.woff2`, v4.1, OFL 1.1, RFN: "Inter")
3. **`ASSET-OS-TYPO-05-1`:** Geist Variable Font (`Geist-Variable.woff2`, v1.4.0, OFL 1.1, RFN: "Geist")
4. **`ASSET-OS-A11Y-01-1`:** axe-core runtime bundle (`axe.min.js`, MPL-2.0)
5. **`ASSET-OS-A11Y-05-1`:** HTML_CodeSniffer Rules Bundle (LGPL-3.0)
6. **`ASSET-OS-BROW-01-1`:** Chromium Headless Shell (Apache-2.0 / Chromium BSD)
7. **`ASSET-OS-TYPO-03-JB`:** JetBrains Mono Variable Font (`jetbrains-mono-variable.woff2`, v2.304, OFL 1.1, RFN: "JetBrains Mono"). Traced directly to Fontsource monorepo candidate (`OS-TYPO-03`).
8. **`ASSET-OS-TYPO-03-FC`:** Fira Code Variable Font (`fira-code-variable.woff2`, v6.2, OFL 1.1, RFN: "Fira Code"). Traced directly to Fontsource monorepo candidate (`OS-TYPO-03`).

---

## 6. Technical Evaluations & 10-Dimension Preservation (Issue 12 Resolution)

Every candidate evaluation record in [`data/evaluations.json`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/data/evaluations.json) preserves the individual dimensional assessments across all 10 architectural dimensions:
- `D01`: Maintenance & Release Cadence
- `D02`: Adoption & Community Velocity
- `D03`: Code Quality & TypeScript Rigor
- `D04`: Framework & SSR Compatibility
- `D05`: Accessibility & WAI-ARIA
- `D06`: Responsiveness & Layout Engine
- `D07`: Dependencies & Bundle Overhead
- `D08`: Licensing & Legal Dispositions
- `D09`: Installation & CLI DX
- `D10`: Customization, Theming & Tokens

**Total Dimensional Assessments:** Exactly **1,250** assessments ($125 \times 10$).  
**Traceability:**
- **71 complete candidate technical evaluations** (all 10 dimensions evaluated).
- **54 screened/partial technical evaluations** (metadata, licensing, and critical compatibility screened).
