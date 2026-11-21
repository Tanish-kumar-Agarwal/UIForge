# UIForge Research — Open-Source & Asset Licensing Review

**Document ID:** `UIF-REF-004`  
**Phase:** 01 — Product Research, Problem Validation, Competitive Intelligence & Product Differentiation  
**Status:** Legal & Architecture Compliance Audit  
**Date:** November 2026  

---

## 1. Compliance Principles & Mandatory Rules

UIForge follows strict intellectual property, licensing, and provenance standards. For every candidate project, component, or dependency considered for integration into UIForge Core or the UIForge Component Registry:

1. **Explicit Repository & Package Verification**: A license is never inferred from website marketing or homepages. It must be verified against the official `LICENSE`, `COPYING`, or `package.json` file in the root repository.
2. **Provenance & Per-Item Metadata Tracking**: A permissive license (e.g., MIT, Apache-2.0) does not eliminate compliance obligations. UIForge must preserve copyright notices, record upstream sources, commit hashes, and versions, and track each distributed component's individual license metadata.
3. **Third-Party Sub-Asset Auditing**: Projects like `shadcn/ui` are MIT-licensed at the core repository level, but components frequently import third-party fonts, SVG icons (e.g., Lucide, Radix Icons), or utility packages. Each sub-asset must be verified independently.
4. **Copyleft & Distribution Quarantine**: Strong copyleft licenses (GPL-2.0, GPL-3.0, AGPL-3.0) must not be statically linked, bundled, or co-distributed within UIForge Core packages to preserve permissive Apache-2.0 / MIT licensing for end users.
5. **Weak Copyleft Compliance (MPL-2.0)**: Weak copyleft licenses such as Mozilla Public License 2.0 (used by `axe-core`) allow combination in "Larger Works." While consuming `axe-core` via external npm dependencies (`@axe-core/playwright`) is a safe design pattern, precise legal review is required before freezing bundling or vendoring rules as immutable architectural invariants.
6. **Proprietary & Marketplace Redistribution Restrictions**: Terms of service restricting redistribution (such as Aceternity Pro terms prohibiting distribution as stock or marketplace material) require strict caution. Ingestion into open-source registries must be evaluated on a per-component basis.

---

## 2. In-Depth Licensing Audit Matrix

| Project / Source | Organization / Author | Repository URL | Verified License (SPDX) | LICENSE File Location | Commercial Use Permitted? | Redistribution Permitted? | Attribution / Notice Obligations | Classification Decision |
| :--- | :--- | :--- | :---: | :--- | :---: | :---: | :--- | :---: |
| **shadcn/ui** | shadcn | `github.com/shadcn-ui/ui` | **MIT** | `/LICENSE.md` | Yes | Yes | Include copyright notice and permission notice. | **INTEGRATE DIRECTLY** |
| **Radix UI** | WorkOS | `github.com/radix-ui/primitives` | **MIT** | `/LICENSE` | Yes | Yes | Retain original copyright notice in source files. | **INTEGRATE DIRECTLY** |
| **React Aria** | Adobe Systems | `github.com/adobe/react-spectrum` | **Apache-2.0** | `/LICENSE.txt` | Yes | Yes | Include Apache-2.0 license, retain copyright notices, provide `NOTICE` file. | **INTEGRATE DIRECTLY** |
| **Tailwind CSS** | Tailwind Labs | `github.com/tailwindlabs/tailwindcss` | **MIT** | `/LICENSE` | Yes | Yes | Include MIT copyright notice. | **INTEGRATE DIRECTLY** |
| **Open Props** | Adam Argyle | `github.com/argyleink/open-props` | **MIT** | `/LICENSE` | Yes | Yes | Include MIT copyright notice. | **INTEGRATE DIRECTLY** |
| **Tremor** | Tremor Labs | `github.com/tremorlabs/tremor` | **Apache-2.0** | `/LICENSE` | Yes | Yes | Include Apache-2.0 notice. | **INTEGRATE DIRECTLY** |
| **Playwright** | Microsoft | `github.com/microsoft/playwright` | **Apache-2.0** | `/LICENSE` | Yes | Yes | Include Apache-2.0 notice. External dependency via npm. | **INTEGRATE DIRECTLY** |
| **axe-core** | Deque Systems | `github.com/dequelabs/axe-core` | **MPL-2.0** | `/LICENSE` | Yes | Yes (as external package) | File-level copyleft. Must NOT vendor/modify source files directly. Keep as standard npm package dependency (`@axe-core/playwright`). | **INTEGRATE THROUGH ADAPTER** |
| **Magic UI** | Magic UI Design | `github.com/magicuidesign/magicui` | **MIT (Core)** | `/LICENSE` | Yes | Yes (Core only) | Pro templates are proprietary. Ingest only components located in public MIT repo. | **INTEGRATE THROUGH ADAPTER** |
| **Aceternity UI** | Aceternity | `ui.aceternity.com` | **Proprietary Terms** | N/A (Commercial Terms) | Limited (personal/client sites) | **NO** (Redistribution explicitly prohibited) | Cannot redistribute code in an open registry or resale bundle. | **REJECT FROM REGISTRY** |
| **React Bits** | DavidHDev | `github.com/DavidHDev/react-bits` | **MIT** | `/LICENSE` | Yes | Yes | MIT notice required. Code quality and accessibility require manual audit before ingestion. | **REFERENCE ONLY** |
| **Zod** | Colin McDonnell | `github.com/colinhacks/zod` | **MIT** | `/LICENSE` | Yes | Yes | Retain MIT copyright notice. | **INTEGRATE DIRECTLY** |
| **Vitest** | Vitest Dev Team | `github.com/vitest-dev/vitest` | **MIT** | `/LICENSE` | Yes | Yes | Retain MIT copyright notice. | **INTEGRATE DIRECTLY** |
| **Turborepo** | Vercel Inc. | `github.com/vercel/turborepo` | **MIT** | `/LICENSE` | Yes | Yes | Retain MIT copyright notice. | **INTEGRATE DIRECTLY** |

---

## 3. Deep Dive: Key Legal & Architectural Nuances

### 3.1 The axe-core MPL-2.0 Implication
- **The Context:** `axe-core` is licensed under Mozilla Public License 2.0 (MPL-2.0), a file-level weak copyleft license.
- **The Obligation:** Modifications made directly to MPL-2.0 source files must be made available under MPL-2.0 if distributed. However, MPL-2.0 explicitly permits "Larger Works," allowing MPL-2.0 code to be combined with code under other licenses provided the covered files remain distinct.
- **UIForge Design Choice:** Consuming `axe-core` as an **external npm runtime dependency** (`@axe-core/playwright`) within an isolated adapter (`@uiforge/a11y-engine`) is an established, low-risk architectural pattern. Before freezing any vendoring or packaging decisions as immutable architectural invariants, formal legal and compliance reviews will be conducted in Phase 03.

### 3.2 The Aceternity UI Redistribution Restrictions
- **The Context:** Aceternity UI provides web components, differentiating between free website examples and commercial Aceternity Pro licenses. Pro licensing explicitly prohibits redistributing or reselling source files as stock material, templates, or marketplace products.
- **UIForge Position:** To prevent copyright or licensing disputes, UIForge adopts a conservative policy: source code from Aceternity Pro will not be ingested into a redistributable UIForge Registry. Any inclusion of free community components would require individual, per-component terms and licensing verification.
- **Alternative:** High-impact visual animations will be sourced from verified MIT libraries (e.g., Magic UI core) or authored natively as clean, accessible CSS/Framer Motion primitives owned by UIForge.

### 3.3 The shadcn/ui Provenance Model
- **The Reality:** While `shadcn/ui` is MIT-licensed, it distributes **uncompiled source code** directly into user repositories rather than compiled npm binaries. Furthermore, individual community blocks or components may pull in diverse icons, typography assets, or helper utilities.
- **UIForge Alignment:** UIForge will support source-level component installation while attaching clear provenance metadata (upstream repo, commit SHA, license identifier, attribution notices) to every indexed component in `@uiforge/registry`.

---

## 4. Candidate Reuse Decision Summary

| Strategy Category | Candidate Libraries & Tools | Actionable Boundary |
| :--- | :--- | :--- |
| **Integrate Directly** | shadcn/ui, Radix UI, Tailwind CSS, React Aria, Tremor, Playwright, Zod, Vitest, Turborepo | Approved for core architecture, monorepo foundation, and primary component registry. |
| **Integrate via Adapter** | `axe-core` (MPL-2.0), Magic UI (MIT Core) | Wrap in strict adapter packages to isolate licensing copyleft and curate motion accessibility. |
| **Reference Only** | React Bits, Builder.io Mitosis, Open Props | Study architectural patterns and token formats, but do not vendor source code directly. |
| **Build Native Replacement** | AST surgical patching engine, Anti-AI visual scoring heuristics, Multi-agent context adapters | Build in-house; no suitable open-source tool exists that satisfies UIForge's precise requirements. |
| **Reject Completely** | Aceternity UI, any GPL/AGPL-licensed frontend component libraries | Legally incompatible with commercial open-core distribution. |
