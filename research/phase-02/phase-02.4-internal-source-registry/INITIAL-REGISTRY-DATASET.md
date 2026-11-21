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
| **Sources** | [`data/sources.json`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/data/sources.json) | **125** | Canonical candidate universe preserving 100% of Phase 02.1 IDs (`SRC-001`–`SRC-125`). |
| **Repositories** | [`data/repositories.json`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/data/repositories.json) | **119** | Authoritative Git repositories (GitHub/GitLab); 6 non-repo candidates tracked via platform URLs. |
| **Packages** | [`data/packages.json`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/data/packages.json) | **147** | Normalized installable npm packages resolving monorepos (e.g. Radix sub-packages). |
| **Components** | [`data/components.json`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/data/components.json) | **31** | Primary component groups across primitives, layout blocks, and compound controls. |
| **Assets** | [`data/assets.json`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/data/assets.json) | **6** | Standalone font, icon, script, and testing assets with explicit typologies & RFN evidence. |
| **Licenses** | [`data/licenses.json`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/data/licenses.json) | **11** | Canonical license definitions with permissions, restrictions, and notice obligations. |
| **Evaluations** | [`data/evaluations.json`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/data/evaluations.json) | **125** | 1,250 dimensional assessments across 10 dimensions (71 complete, 54 partial). |
| **Permissions** | [`data/consumption-permissions.json`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/data/consumption-permissions.json) | **750** | Exhaustive mode matrix ($125 \times 6$) defining conditions, notices, and legal reviews. |
| **Provenance** | [`data/provenance.json`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/data/provenance.json) | **125** | Digest-backed provenance records with evaluated commits and 64-character SHA-256 digests. |
| **Evidence** | [`data/evidence.json`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/data/evidence.json) | **125** | 125 candidate dossiers containing 625 granular evidence items linked to controlled typologies. |

---

## 2. Canonical Priority Reconciliation (Finding C01 Resolution)

To eliminate mathematical contradictions and prevent priority drift, every candidate record in [`data/sources.json`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/data/sources.json) explicitly tracks three separate priority/tier fields:
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
| **`REJ`** | Terminal Legal / Policy Gating | **4** | `TIER_D` | Aceternity UI, GSAP, Remotion, Locofy.ai. Strict policy restriction. |
| **TOTAL** | **Canonical Candidate Universe** | **125** | — | **100% Mathematically Reconciled** |

### ID-Level Register for the Four `REJ` Candidates:
1. **`SRC-OS-MKT-08` (`aceternity/ui`):** Original Priority: `REJ`. Current Priority: `REJ`. Operational Tier: `TIER_D`. Rationale: Commercial Terms of Service prohibit component redistribution. License: `LIC-COMMERCIAL`. Status: `BLOCKED` for runtime dependency and source-copy.
2. **`SRC-OS-ANIM-04` (`greensock/gsap`):** Original Priority: `REJ`. Current Priority: `REJ`. Operational Tier: `TIER_D`. Rationale: Webflow April 2025 non-compete clause prohibits inclusion in visual builders. License: `LIC-GSAP-STANDARD`. Status: `ELIGIBLE_WITH_RESTRICTIONS` for emitted user dependencies (`npm i gsap`); `BLOCKED` for source copying.
3. **`SRC-OS-ANIM-08` (`remotion-dev/remotion`):** Original Priority: `REJ`. Current Priority: `REJ`. Operational Tier: `TIER_D`. Rationale: Dual-licensing threshold (paid commercial license required for companies > 3 employees). License: `LIC-REMOTION-COMMERCIAL`. Status: `PENDING_REVIEW` / gated.
4. **`SRC-OS-D2C-08` (`locofy/locofy`):** Original Priority: `REJ`. Current Priority: `REJ`. Operational Tier: `TIER_D`. Rationale: Commercial SaaS platform with closed proprietary runtime. License: `LIC-COMMERCIAL`. Status: `BLOCKED` for runtime dependency and source-copy.

---

## 3. Authoritative Git Repositories vs Platforms (Finding C02 Resolution)

UIForge explicitly separates candidates with authoritative Git repositories from commercial products, documentation portals, and SaaS platforms:
- **Authoritative Git Repositories:** Exactly **119** records in [`data/repositories.json`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/data/repositories.json).
- **Non-Repository Sources:** Exactly **6** candidates in [`data/sources.json`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/data/sources.json) have `repositoryRef: null` and `repositoryUrl: null`, with explicit platform/documentation links:
  1. `SRC-OS-MKT-08` (`aceternity/ui`) — `COMMERCIAL_PRODUCT` (`https://ui.aceternity.com`)
  2. `SRC-OS-LAYT-08` (`Every-Layout/every-layout`) — `DOCUMENTATION_RESOURCE` (`https://every-layout.dev`)
  3. `SRC-OS-D2C-08` (`locofy/locofy`) — `COMMERCIAL_PRODUCT` (`https://www.locofy.ai`)
  4. `SRC-OS-AGNT-03` (`anthropics/claude-code`) — Commercial CLI documentation (`https://docs.anthropic.com/...`)
  5. `SRC-OS-AGNT-04` (`anysphere/cursor`) — Commercial IDE platform (`https://cursor.com`)
  6. `SRC-OS-AGNT-05` (`codeium/windsurf`) — Commercial IDE platform (`https://codeium.com/windsurf`)

Zero artificial placeholder Git repositories exist in the registry dataset.

---

## 4. Canonical License Entities Reconciliation (Finding C09 Resolution)

The registry defines **11 normalized license entities** in [`data/licenses.json`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/data/licenses.json). The following table maps the 11 license entities to candidate counts, high-level dispositions, and obligations:

| License Entity ID | Formal License Name | Primary Candidates Count | High-Level Disposition | Transitive / Per-Asset Obligations |
| :--- | :--- | :---: | :--- | :--- |
| **`LIC-MIT`** | MIT License | **110** | `PERMISSIVE` | Standard copyright notice retention in source headers and distributions. |
| **`LIC-APACHE-2.0`** | Apache License 2.0 | **2** | `PERMISSIVE` | Section 4 notice retention; explicit patent license grant included. |
| **`LIC-ISC`** | ISC License | **2** | `PERMISSIVE` | Functionally equivalent to 2-clause BSD; notice retention in Lucide icon pack. |
| **`LIC-MPL-2.0`** | Mozilla Public License 2.0 | **1** | `COPYLEFT_RESTRICTED` | `axe-core`: Section 3 Larger Work notice required; modified covered files must be offered under MPL-2.0. |
| **`LIC-LGPL-3.0`** | GNU Lesser General Public License v3.0 | **1** | `COPYLEFT_RESTRICTED` | `pa11y`: Out-of-process CLI boundary required; runtime dynamic linking `PENDING_REVIEW`. |
| **`LIC-OFL-1.1`** | SIL Open Font License 1.1 | **2** | `PERMISSIVE_WITH_NOTICE` | `Inter`, `Geist`: Explicit Reserved Font Name (RFN) active; font binary cannot be sold standalone. |
| **`LIC-W3C`** | W3C Software and Document Notice and License | **1** | `PERMISSIVE_WITH_NOTICE` | `w3c/aria-practices`: Retain verbatim W3C copyright notice and URL reference. |
| **`LIC-GSAP-STANDARD`** | GreenSock Standard Commercial License | **1** | `CONDITIONAL` | Webflow April 2025 commercial free terms; non-compete prohibits inclusion in competing visual builders. |
| **`LIC-REMOTION-COMMERCIAL`**| Remotion Company License | **1** | `CONDITIONAL` | Free for individuals / companies $\le 3$ employees; commercial license key required for $>3$ employees. |
| **`LIC-COMMERCIAL`** | Commercial Terms of Service | **2** | `PROPRIETARY_CLOSED` | `Aceternity UI`, `Locofy.ai`: Redistribution and code copying strictly prohibited. |
| **`LIC-PROPRIETARY`** | Closed Proprietary Platform Terms | **2** | `PROPRIETARY_CLOSED` | `Cursor`, `Windsurf`: Closed-source developer IDE platforms. |
| **TOTAL** | **11 License Entities** | **125** | — | **100% Candidates Accounted For** |

---

## 5. Technical Evaluations & 10-Dimension Preservation (Finding C08 Resolution)

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
- **71 candidates** evaluated across all 10 dimensions (`complete`).
- **54 candidates** screened for metadata, licensing, and critical compatibility (`partial`).
