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
- Where its authoritative source lives (distinguishing real Git repositories from documentation portals and SaaS products).
- Which exact package, release, version, commit, or asset was evaluated.
- Whether it can be installed as an emitted user dependency, copied into user trees, or redistributed as an asset.
- What technical, legal, and operational restrictions apply under six distinct consumption modes.
- What granular evidence supports each decision.
- When the information was last verified and what triggers re-evaluation.

---

## 2. Reconciled Master Entity Statistics

The registry decomposes the open-source universe into 10 relational entities, resolving monorepos and separating code repositories from installable packages, UI primitives, and binary assets:

| Entity Manifest | Path | Reconciled Record Count | Architectural & Legal Role |
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

## 3. Canonical Priority & Operational Tier Distribution

In accordance with finding C01, original discovery priorities are preserved without alteration:
- **Canonical Priority Census:**
  - `P0` (Critical Path): **24** sources (19.2%) $\to$ Operational Tier `TIER_A`
  - `P1` (High Value): **47** sources (37.6%) $\to$ Operational Tier `TIER_B`
  - `P2` (Standard / Exploratory): **50** sources (40.0%) $\to$ Operational Tier `TIER_C`
  - `REJ` (Terminal Policy Gating): **4** sources (3.2%) $\to$ Operational Tier `TIER_D`
  - *Total:* **125** sources (100.0%)

---

## 4. The Six Consumption Modes & Key Candidates

1. `REFERENCE_ONLY`: Architectural inspection and factual benchmarking.
2. `DEPENDENCY`: Package listed in emitted user `package.json`.
3. `SOURCE_COPY`: Component source code copied into user workspace (shadcn/ui model).
4. `ASSET_REDISTRIBUTION`: Static assets (fonts, icons, WASM, rule bundles) bundled into runtime.
5. `EXTERNAL_TOOL`: Executed as out-of-process CLI tool in pipeline.
6. `TEMPLATE_ADAPTATION`: Code generator / AST transformation templates.

### Critical Candidates Governance Summary:
- **GSAP (`SRC-OS-ANIM-04`):** `DEPENDENCY: ELIGIBLE_WITH_RESTRICTIONS` (emitted user dependency with non-compete clause); `SOURCE_COPY: BLOCKED`.
- **axe-core (`SRC-OS-A11Y-01`):** `DEPENDENCY: ELIGIBLE_WITH_RESTRICTIONS` (MPL-2.0 Section 3 notices); `SOURCE_COPY: ELIGIBLE_WITH_RESTRICTIONS` (modified files under MPL); `EXTERNAL_TOOL: APPROVED`.
- **pa11y (`SRC-OS-A11Y-05`):** `DEPENDENCY: PENDING_REVIEW`; `SOURCE_COPY: BLOCKED`; `EXTERNAL_TOOL: PENDING_REVIEW` (pending legal counsel review of distribution model).
- **LiquidJS (`SRC-OS-UTIL-01`):** `DEPENDENCY: APPROVED`; `SOURCE_COPY: APPROVED` (verified MIT license; historical MulanPSL reconciled).
- **Inter (`ASSET-OS-TYPO-04-1`) & Geist (`ASSET-OS-TYPO-05-1`):** SIL OFL 1.1 fonts with explicit Reserved Font Name (RFN) evidence; redistributed unchanged with full license text.
- **Aceternity UI & Locofy.ai:** Commercial / proprietary platforms. Strictly `BLOCKED` for dependencies and source copying; restricted to clean-room reference only.

---

## 5. Automated Validation & Independent Certification

The reconciled automated test harness [`validation/validate_registry.js`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/validation/validate_registry.js) executed **41 / 41 assertions with 100% pass (0 failures)**.

- **Harness Digest:** `502067519829c38183122f6332e3b096083aa2a983b8ca0a12ce0cb1641a2d28`
- **Validation Report:** [`REGISTRY-VALIDATION-REPORT.md`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/REGISTRY-VALIDATION-REPORT.md)
- **Scorecard:** 33 PASS, 3 PARTIAL (Gated/Deferred), 0 FAIL. Certified ready for Phase 02.5.
