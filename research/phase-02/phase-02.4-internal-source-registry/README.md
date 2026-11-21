# UIForge Phase 02.4: Internal Source Registry

**Document ID:** `UIF-PH02.4-INTERNAL-SOURCE-REGISTRY`  
**Parent Phase:** Phase 02 — Open-Source Ecosystem, Technical Architecture & Supply-Chain Validation  
**Phase Status:** Complete, Reconciled & Formally Certified  
**Audit Standard:** Principal Software Architect + Registry Platform Architect + Open-Source Ecosystem Researcher + Software Supply-Chain Security Engineer + Independent Evidence Auditor  
**Candidate Universe:** Canonical Phase 02.1 / Phase 02.3 Inventory — Exactly 125 Candidate Identities  

---

## 1. Mission & Architectural Overview

The **UIForge Internal Source Registry** is the authoritative intelligence and supply-chain governance layer of the UIForge platform. It acts as the single source of truth for external dependencies, component primitives, layout patterns, testing utilities, and binary assets.

The registry is **NOT** a flat collection of URLs or an unvetted package mirror. It is a structured, normalized, machine-readable intelligence system that answers:
- What an external source is and who maintains it.
- Where its authoritative source lives (distinguishing 119 verified Git repositories from 6 documentation portals and SaaS products).
- Which exact package, release, version, commit, or asset was evaluated.
- Whether it can be installed as an emitted user dependency, copied into user trees, or redistributed as an asset.
- What technical, legal, and operational restrictions apply under six distinct consumption modes.
- What granular evidence supports each decision across 625 claim-level items.
- When the information was last verified and what triggers re-evaluation.

---

## 2. Reconciled Master Entity Statistics

The registry decomposes the open-source universe into 10 relational entities, resolving monorepos and separating code repositories from installable packages, UI primitives, and binary assets:

| Entity Manifest | Path | Reconciled Record Count | Architectural & Legal Role |
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

## 3. Canonical Priority & Operational Tier Distribution

Original discovery priorities are preserved immutably from the Phase 02.1/02.3 canonical baseline:
- **Canonical Priority Census:**
  - `P0` (Critical Path): **24** sources (19.2%) $\to$ Operational Tier `TIER_A`
  - `P1` (High Value): **47** sources (37.6%) $\to$ Operational Tier `TIER_B`
  - `P2` (Standard / Exploratory): **50** sources (40.0%) $\to$ Operational Tier `TIER_C`
  - `REJ` (Terminal Policy Gating): **4** sources (3.2%) $\to$ Operational Tier `TIER_D` (Excluded from default core stack)
  - *Total:* **125** sources (100.0%)

---

## 4. Reconciled Dependency Arithmetic (125 Sources)

Accounting for all 125 candidate sources in `DEPENDENCY` mode:
- **Approved Permissive Dependencies:** **111 candidates**
- **Restricted Eligible Dependencies:** **2 candidates** (`GSAP`, `axe-core`)
  - *Total Eligible Dependencies:* **113 candidates**
- **Blocked Dependencies:** **7 candidates** (`Aceternity`, `Locofy`, `Remotion`, `Rebass`, `React-Grid-Layout`, `Loki`, `BackstopJS`)
- **Pending Legal Review Dependencies:** **1 candidate** (`pa11y` LGPL-3.0)
- **Not Applicable (Non-Package Sources):** **4 candidates** (`Every-Layout`, `Claude Code`, `Cursor`, `Windsurf`)
- *Sum:* $111 + 2 + 7 + 1 + 4 = 125 \text{ sources}$ (100% exact).

---

## 5. Critical Candidates Governance Summary

- **GSAP (`SRC-OS-ANIM-04`):** `DEPENDENCY: ELIGIBLE_WITH_RESTRICTIONS` (emitted user dependency permitted under Webflow April 2025 Standard License; non-compete applies to visual animation builders; UIForge React emission permitted); `SOURCE_COPY: BLOCKED`.
- **axe-core (`SRC-OS-A11Y-01`):** `DEPENDENCY: ELIGIBLE_WITH_RESTRICTIONS` (MPL-2.0 Section 3 notices); `SOURCE_COPY: ELIGIBLE_WITH_RESTRICTIONS` (modified files under MPL); `EXTERNAL_TOOL: ELIGIBLE_WITH_RESTRICTIONS` (user-managed integration model: invokes user-installed CLI; zero binary bundling; preserves `counselReviewRequired: true`).
- **pa11y (`SRC-OS-A11Y-05`):** `DEPENDENCY: PENDING_REVIEW`; `SOURCE_COPY: BLOCKED`; `EXTERNAL_TOOL: PENDING_REVIEW` (pending legal counsel review of packaging and distribution model).
- **Every Layout (`SRC-OS-LAYT-08`):** `DEPENDENCY: NOT_APPLICABLE`; `SOURCE_COPY: BLOCKED`; `REFERENCE_ONLY: ELIGIBLE_WITH_RESTRICTIONS` (licensed under paid authored content terms; studying general CSS layout concepts is permissible, while copying authored text/diagrams is strictly prohibited; derived implementations require clean-room verification and counsel review without unconditional guarantees).
- **Inter (`ASSET-OS-TYPO-04-1`) & Geist (`ASSET-OS-TYPO-05-1`):** SIL OFL 1.1 fonts with explicit Reserved Font Name (RFN) evidence; redistributed unchanged with full license text.
- **JetBrains Mono & Fira Code:** Traced directly to Fontsource monorepo candidate (`OS-TYPO-03`) with SIL OFL 1.1 RFN preservation.
- **Aceternity UI & Locofy.ai:** Commercial / proprietary platforms. Strictly `BLOCKED` for dependencies and source copying; restricted to clean-room reference only.

---

## 6. Automated Validation & Independent Certification

The reconciled automated test harness [`validation/validate_registry.js`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/validation/validate_registry.js) executed **46 / 46 assertions with 100% pass (0 failures)**.

- **Harness Digest:** `a96bfe007c3f57c12c0f365a677131de795cb8d38598b1524b2a635bef67916c`
- **Validation Report:** [`REGISTRY-VALIDATION-REPORT.md`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/REGISTRY-VALIDATION-REPORT.md)
- **Scorecard:** 33 PASS, 3 PARTIAL (Gated/Deferred), 0 FAIL. Certified ready for Phase 02.5.
