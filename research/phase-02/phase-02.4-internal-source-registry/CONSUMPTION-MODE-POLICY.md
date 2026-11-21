# UIForge Phase 02.4: Consumption Mode Policy

**Document ID:** UIF-PH02.4-CONSUMPTION-MODE-POLICY  
**Classification:** Open-Source Governance, Legal Risk Mitigation, Consumption Architecture  
**Status:** Certified / Approved  
**Authoritative Location:** `research/phase-02/phase-02.4-internal-source-registry/CONSUMPTION-MODE-POLICY.md`  

---

## 1. Executive Summary & Purpose

A monolithic "approved / rejected" binary classification is legally and architecturally hazardous. A library may be ideal as an emitted user dependency but illegal to copy into proprietary source code; an accessibility engine may be licensed under a copyleft regime (MPL-2.0 or LGPL-3.0) that permits isolated external execution but imposes strict notice or distribution obligations if linked at runtime.

This policy defines the **Six Consumption Modes** of UIForge, the canonical decision enum, the granular activities governed under `REFERENCE_ONLY`, and the specific governance boundaries for critical candidates.

---

## 2. The Six Formal Consumption Modes

UIForge evaluates every source candidate across six independent consumption modes:

```
┌────────────────────────────────────────────────────────┐
│  MODE 1: REFERENCE_ONLY                                │
│  - Architectural inspection & factual benchmarking     │
│  - Zero code emission, zero asset redistribution       │
├────────────────────────────────────────────────────────┤
│  MODE 2: DEPENDENCY                                    │
│  - Package listed in emitted user package.json         │
│  - Resolved and installed via npm/pnpm                 │
├────────────────────────────────────────────────────────┤
│  MODE 3: SOURCE_COPY                                   │
│  - Component source code copied into user workspace    │
│  - Scaffolding & adaptation (shadcn/ui model)          │
├────────────────────────────────────────────────────────┤
│  MODE 4: ASSET_REDISTRIBUTION                          │
│  - Static assets (fonts, icons, WASM, rule bundles)    │
│  - Bundled directly into UIForge runtime or templates  │
├────────────────────────────────────────────────────────┤
│  MODE 5: EXTERNAL_TOOL                                 │
│  - Executed as out-of-process CLI tool in pipeline     │
│  - Strict process boundary (e.g. axe-core CLI, pa11y)  │
├────────────────────────────────────────────────────────┤
│  MODE 6: TEMPLATE_ADAPTATION                           │
│  - Code generator / AST transformation templates       │
│  - Scaffolding engines (LiquidJS, Handlebars)          │
└────────────────────────────────────────────────────────┘
```

---

## 3. Canonical Decision Enum & Precedence

To eliminate conflicting terminology and ensure semantic consistency, all 750 permission records in [`data/consumption-permissions.json`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/data/consumption-permissions.json) strictly adhere to a single canonical eligibility enum:

| Canonical Eligibility State | Semantic Definition & Legal Impact | `allowed` Boolean |
| :--- | :--- | :---: |
| **`APPROVED`** | Unconditional permission granted under permissive terms (MIT, Apache-2.0, ISC). | `true` |
| **`ELIGIBLE_WITH_RESTRICTIONS`** | Permission granted subject to strict notice, attribution, or non-compete conditions. | `true` |
| **`REFERENCE_ONLY`** | Permission restricted strictly to architectural inspection and factual research. | `true` |
| **`PENDING_REVIEW`** | Permission suspended pending formal legal counsel or technical architecture review. | `false` |
| **`BLOCKED`** | Prohibited under all circumstances due to licensing incompatibility or proprietary terms. | `false` |
| **`NOT_APPLICABLE`** | Consumption mode does not apply to this candidate typology (e.g. font asset in CLI tool mode). | `false` |

### Strict Decision Precedence:
$$\text{BLOCKED} > \text{PENDING\_REVIEW} > \text{REFERENCE\_ONLY} > \text{ELIGIBLE\_WITH\_RESTRICTIONS} > \text{APPROVED} > \text{NOT\_APPLICABLE}$$

---

## 4. Reference-Only Scope & Activity Boundaries (Finding C04 Resolution)

Approval under `REFERENCE_ONLY` does **NOT** grant unrestricted inspection, cloning, or extraction rights. The registry distinguishes six discrete activities:

| Activity | Open-Source Repositories (119 Sources) | Commercial / Closed Portals (6 Sources) |
| :--- | :---: | :---: |
| **1. Public Documentation Inspection** | **AUTHORIZED** | **AUTHORIZED** |
| **2. Architectural Factual Research** | **AUTHORIZED** | **AUTHORIZED** |
| **3. Public Source Code Inspection** | **AUTHORIZED** | **PROHIBITED** (Source code closed/proprietary) |
| **4. Local Repository Cloning** | **AUTHORIZED** | **PROHIBITED** (No public Git repository) |
| **5. Automated Mass Scraping** | **STRICTLY PROHIBITED** | **STRICTLY PROHIBITED** |
| **6. Source Code Copying** | **PROHIBITED** (Governed by Mode 3) | **PROHIBITED** (Governed by Mode 3) |

Every `REFERENCE_ONLY` record in `consumption-permissions.json` encodes this granular breakdown in its `referenceScope` object:
```json
{
  "publicDocumentationInspection": true,
  "factualResearch": true,
  "publicSourceCodeInspection": false,
  "localCloning": false,
  "automatedScraping": false,
  "codeCopying": false
}
```

---

## 5. Domain Governance Boundaries for Critical Candidates (Finding C03 Resolution)

### 5.1 GSAP (`SRC-OS-ANIM-04`)
- **`DEPENDENCY`: `ELIGIBLE_WITH_RESTRICTIONS` (`allowed: true`)**
  - **Condition:** Emitted user dependency allowed under Webflow April 2025 commercial free terms (`npm install gsap`).
  - **Restriction:** Non-compete clause strictly prohibits inclusion in competing visual no-code animation builders. Flagged `counselReviewRequired: true`.
- **`SOURCE_COPY`: `BLOCKED` (`allowed: false`)**
  - **Condition:** Copying GSAP source code into user templates or UIForge core is strictly illegal under proprietary terms.

### 5.2 axe-core (`SRC-OS-A11Y-01`)
- **`DEPENDENCY`: `ELIGIBLE_WITH_RESTRICTIONS` (`allowed: true`)**
  - **Condition:** Governed by Mozilla Public License 2.0 (MPL-2.0). Section 3.3 "Larger Works" notice obligations require retaining MPL-2.0 copyright notices in generated distributions.
- **`SOURCE_COPY`: `ELIGIBLE_WITH_RESTRICTIONS` (`allowed: true`)**
  - **Condition:** If any axe-core source file is modified, the modified covered file must be made available under MPL-2.0.
- **`EXTERNAL_TOOL`: `APPROVED` (`allowed: true`)**
  - **Condition:** Execution as an isolated out-of-process CLI tool across a process boundary.

### 5.3 pa11y (`SRC-OS-A11Y-05`)
- **`DEPENDENCY`: `PENDING_REVIEW` (`allowed: false`)**
  - **Condition:** Governed by GNU Lesser General Public License v3.0 (LGPL-3.0). Direct dynamic linking into compiled JavaScript runtime bundles carries viral copyleft risk. Suspended pending formal legal counsel review.
- **`SOURCE_COPY`: `BLOCKED` (`allowed: false`)**
  - **Condition:** Copying LGPL-3.0 source code into user project trees is strictly prohibited.
- **`EXTERNAL_TOOL`: `PENDING_REVIEW` (`allowed: false`)**
  - **Condition:** A proposed subprocess architecture does not itself establish that distribution and execution satisfy every applicable LGPL obligation. External tool execution remains `PENDING_REVIEW` pending formal counsel review of the packaging and distribution model. Flagged `counselReviewRequired: true`.

### 5.4 LiquidJS (`SRC-OS-UTIL-01`)
- **`DEPENDENCY`: `APPROVED` (`allowed: true`)**
- **`SOURCE_COPY`: `APPROVED` (`allowed: true`)**
- **`TEMPLATE_ADAPTATION`: `APPROVED` (`allowed: true`)**
  - **Condition:** Fully verified MIT license. Historical MulanPSL references reconciled and confirmed non-applicable to audited v10.x line.

### 5.5 Commercial Closed Platforms (Aceternity UI, Locofy.ai)
- **`DEPENDENCY`: `BLOCKED` (`allowed: false`)**
- **`SOURCE_COPY`: `BLOCKED` (`allowed: false`)**
- **`REFERENCE_ONLY`: `ELIGIBLE_WITH_RESTRICTIONS` (`allowed: true`)**
  - **Condition:** Commercial Terms of Service strictly forbid redistribution, copying, or embedding. Reference access is restricted strictly to public documentation inspection.
