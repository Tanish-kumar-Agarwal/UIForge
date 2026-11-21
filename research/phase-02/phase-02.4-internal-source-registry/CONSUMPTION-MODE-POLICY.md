# UIForge Phase 02.4: Consumption Mode Policy

**Document ID:** UIF-PH02.4-CONSUMPTION-MODE-POLICY  
**Classification:** Open-Source Governance, Legal Risk Mitigation, Consumption Architecture  
**Status:** Certified / Approved  
**Authoritative Location:** `research/phase-02/phase-02.4-internal-source-registry/CONSUMPTION-MODE-POLICY.md`  

---

## 1. Executive Summary & Purpose

A monolithic "approved / rejected" binary classification is legally and architecturally hazardous. A library may be ideal as an emitted user dependency but illegal to copy into proprietary source code; an accessibility engine may be licensed under a copyleft regime (MPL-2.0 or LGPL-3.0) that permits isolated external execution but imposes strict notice or distribution obligations if linked at runtime.

This policy defines the **Six Consumption Modes** of UIForge, the canonical decision enum, the granular activities governed under `REFERENCE_ONLY`, and the concrete product-scoped boundaries for critical candidates.

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

All 750 permission records in [`data/consumption-permissions.json`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/data/consumption-permissions.json) strictly adhere to a single canonical eligibility enum:

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

## 4. REJ Candidates vs. Mode-Level Permissions (Issue 2 Resolution)

To prevent mode-level permissions from silently overriding terminal exclusions, UIForge establishes an explicit rule:

1. **Meaning of `REJ`:** `originalDiscoveryPriority: REJ` signifies exclusion from UIForge’s default core runtime stack during Phase 02.1 screening.
2. **Disqualification from Default Core Stack:** No `REJ` candidate can ever be selected by UIForge as the default core runtime component or animation engine in Phase 02.5.
3. **Scope of Mode-Level `ELIGIBLE_WITH_RESTRICTIONS` (e.g. GSAP):** Mode-level permission defines legal emission boundaries for **optional, user-selected, secondary plugins only**. It does NOT elevate a candidate to the default stack.
4. **Terminal Exclusion for Closed Platforms:** For `Aceternity UI` and `Locofy.ai`, their commercial terms result in `BLOCKED` across all runtime modes (`DEPENDENCY`, `SOURCE_COPY`, `ASSET_REDISTRIBUTION`), enforcing an absolute runtime exclusion.

---

## 5. Domain Governance Boundaries for Critical Candidates

### 5.1 GSAP (`SRC-OS-ANIM-04`) — Scoped to UIForge Product Behavior (Issue 9 Resolution)
- **`DEPENDENCY`: `ELIGIBLE_WITH_RESTRICTIONS` (`allowed: true`)**
  - **License Context:** Webflow’s April 30, 2025 Standard Commercial License makes GSAP and its core plugins free for commercial use in websites, web applications, and digital interfaces, even for products competing with Webflow in other domains.
  - **Prohibited Use Definition:** The license strictly prohibits incorporating GSAP into *no-code visual animation-building tools that compete with Webflow's animation authoring capabilities*.
  - **UIForge Product Boundary:** UIForge is a developer-facing code generation CLI and component scaffolding platform emitting clean React/TypeScript code (`import gsap from 'gsap'`) where animations are written programmatically in code. UIForge is **NOT** a drag-and-drop visual keyframe timeline animation builder. Therefore, emitting GSAP as a user dependency is permitted.
  - **Prohibition:** UIForge must NOT construct or bundle a visual no-code timeline animation editor powered by GSAP. Flagged `counselReviewRequired: true`.
- **`SOURCE_COPY`: `BLOCKED` (`allowed: false`)**
  - **Condition:** Copying GSAP source code into UIForge or user project repositories is strictly prohibited under proprietary license terms.

### 5.2 axe-core (`SRC-OS-A11Y-01`) — User-Managed External Integration Boundary (Issue 6 & 11 Resolution)
- **`DEPENDENCY`: `ELIGIBLE_WITH_RESTRICTIONS` (`allowed: true`)**
  - **Condition:** Governed by Mozilla Public License 2.0 (MPL-2.0). Section 3.3 "Larger Works" notice obligations require retaining MPL-2.0 copyright notices in generated distributions.
- **`SOURCE_COPY`: `ELIGIBLE_WITH_RESTRICTIONS` (`allowed: true`)**
  - **Condition:** Any modified covered files must be offered under MPL-2.0 and source made available.
- **`EXTERNAL_TOOL`: `ELIGIBLE_WITH_RESTRICTIONS` (`allowed: true`)**
  - **Architectural Boundary:** UIForge supports axe-core execution strictly as a **user-managed external integration**. UIForge invokes a user-installed copy or devDependency (`@axe-core/cli`, MPL-2.0) via an out-of-process CLI runner. UIForge does **NOT** bundle, redistribute, or host executable axe-core binaries.
  - **Legal Review Scope & Caveat:** While this out-of-process, user-installed architecture establishes a sound architectural boundary against direct binary bundling and redistribution risks, it does **not** constitute unconditional legal clearance or a universal exemption from copyleft scrutiny. The permission status is strictly classified as `ELIGIBLE_WITH_RESTRICTIONS` and preserves `counselReviewRequired: true` pending formal confirmation from qualified intellectual property counsel.

### 5.3 pa11y (`SRC-OS-A11Y-05`) — Prudent Legal Review Gating
- **`DEPENDENCY`: `PENDING_REVIEW` (`allowed: false`)**
  - **Condition:** Governed by GNU Lesser General Public License v3.0 (LGPL-3.0). Direct runtime dynamic linking into compiled JavaScript bundles carries viral copyleft risk. Gated pending formal legal counsel review.
- **`SOURCE_COPY`: `BLOCKED` (`allowed: false`)**
  - **Condition:** Copying LGPL-3.0 source code into user project trees is strictly prohibited.
- **`EXTERNAL_TOOL`: `PENDING_REVIEW` (`allowed: false`)**
  - **Condition:** A proposed subprocess architecture does not itself establish that distribution and execution satisfy every applicable LGPL obligation. External tool execution remains `PENDING_REVIEW` pending formal counsel review of the packaging and distribution model. Flagged `counselReviewRequired: true`.

### 5.4 Every Layout (`SRC-OS-LAYT-08`) — Authoritative License Basis & Clean-Room Boundary (Issue 3 & 10 Resolution)
- **`DEPENDENCY`: `NOT_APPLICABLE` (`allowed: false`)** (No installable npm package).
- **`SOURCE_COPY`: `BLOCKED` (`allowed: false`)** (Authored component code copying prohibited).
- **`REFERENCE_ONLY`: `ELIGIBLE_WITH_RESTRICTIONS` (`allowed: true`)**
  - **Reviewed Scope:** Free public articles on `every-layout.dev` were reviewed for general algorithmic layout patterns (The Stack, The Cluster, The Reel). The authored book, full illustrations, and component library are paid content published under commercial terms prohibiting redistribution.
  - **Clean-Room Scope vs. Authored Protection Boundary:** Studying general, uncopyrightable CSS layout concepts (such as flexbox wrapping, CSS grid auto-fit/auto-fill calculations, and clamp-based fluid spacing) is permissible as architectural research. However, copying, reproducing, republishing, or redistributing protected authored text, explanatory prose, copyrighted diagrams, illustrations, or proprietary implementation code from Heydon Pickering and Andy Bell's book is strictly prohibited under `LIC-EVERY-LAYOUT-COMMERCIAL`. UIForge makes **no unconditional legal guarantee** that every algorithm-related layout implementation is automatically permitted; any clean-room implementation must be independently developed without copying authored artifacts and remains subject to clean-room verification and legal counsel review before production distribution.

---

## 6. Reference-Only Scope & Activity Boundaries

| Activity | Open-Source Repositories (119 Sources) | Commercial / Closed Portals (6 Sources) |
| :--- | :---: | :---: |
| **1. Public Documentation Inspection** | **AUTHORIZED** | **AUTHORIZED** |
| **2. Architectural Factual Research** | **AUTHORIZED** | **AUTHORIZED** |
| **3. Public Source Code Inspection** | **AUTHORIZED** | **PROHIBITED** (Source code closed/proprietary) |
| **4. Local Repository Cloning** | **AUTHORIZED** | **PROHIBITED** (No public Git repository) |
| **5. Automated Mass Scraping** | **STRICTLY PROHIBITED** | **STRICTLY PROHIBITED** |
| **6. Source Code Copying** | **PROHIBITED** (Governed by Mode 3) | **PROHIBITED** (Governed by Mode 3) |
