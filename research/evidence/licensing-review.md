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
3. **Third-Party Sub-Asset Auditing**: Projects like `shadcn/ui` and `tremor` are MIT or Apache-2.0 at the core repository level, but individual components frequently import third-party fonts, SVG icons (e.g., Lucide, Radix Icons), or helper utilities. Each sub-asset must retain its respective license notice and attribution.
4. **Copyleft & Distribution Policy (GPL/AGPL)**: UIForge establishes a conservative product policy: **UIForge will not include GPL/AGPL components in distributable Core packages by default**. Any proposed inclusion requires a component-specific license compatibility review and approval. This is an engineering risk-management policy to keep UIForge Core universally embeddable without legal friction, not a claim that all bundling or linking is categorically prohibited under copyright law.
5. **Weak Copyleft Compliance (MPL-2.0)**: Mozilla Public License 2.0 (used by `axe-core`) is a file-level copyleft license that permits combination with differently licensed code in a "Larger Work," provided MPL-covered files remain distinct and notices are preserved. While consuming `axe-core` as an external npm dependency (`@axe-core/playwright`) is a clean modular design choice, vendoring or bundling is not universally barred by MPL-2.0 if file obligations are met. A formal legal review will precede any packaging freeze.
6. **Proprietary & Restricted Commons Clauses**: Libraries containing restrictions on redistribution (such as the Commons Clause or Aceternity Pro marketplace restrictions) require strict scrutiny. Any library restricting redistribution of components cannot be redistributed in an open component registry without explicit authorization.

---

## 2. In-Depth Licensing Audit Matrix

| Project / Source | Organization / Author | Repository URL | Verified License (SPDX) | LICENSE File Location | Commercial Use Permitted? | Redistribution Permitted? | Attribution / Notice Obligations | Classification Decision |
| :--- | :--- | :--- | :---: | :--- | :---: | :---: | :--- | :---: |
| **shadcn/ui** | shadcn | `github.com/shadcn-ui/ui` | **MIT** | `/LICENSE.md` | Yes | Yes | Retain MIT copyright notice; track third-party icon/asset provenance. | **INTEGRATE DIRECTLY (WITH PROVENANCE)** |
| **Radix UI** | WorkOS | `github.com/radix-ui/primitives` | **MIT** | `/LICENSE` | Yes | Yes | Retain original copyright notice in source files. | **INTEGRATE DIRECTLY** |
| **React Aria** | Adobe Systems | `github.com/adobe/react-spectrum` | **Apache-2.0** | `/LICENSE.txt` | Yes | Yes | Include Apache-2.0 license, retain copyright notices, provide `NOTICE` file. | **INTEGRATE DIRECTLY** |
| **Tailwind CSS** | Tailwind Labs | `github.com/tailwindlabs/tailwindcss` | **MIT** | `/LICENSE` | Yes | Yes | Include MIT copyright notice. | **INTEGRATE DIRECTLY** |
| **Open Props** | Adam Argyle | `github.com/argyleink/open-props` | **MIT** | `/LICENSE` | Yes | Yes | Include MIT copyright notice. | **INTEGRATE DIRECTLY** |
| **Tremor** | Tremor Labs | `github.com/tremorlabs/tremor` | **Apache-2.0** | `/LICENSE` | Yes | Yes | Include Apache-2.0 notice; retain third-party component attributions. | **INTEGRATE DIRECTLY (WITH NOTICES)** |
| **Playwright** | Microsoft | `github.com/microsoft/playwright` | **Apache-2.0** | `/LICENSE` | Yes | Yes | Include Apache-2.0 notice. External dependency via npm. | **INTEGRATE DIRECTLY** |
| **axe-core** | Deque Systems | `github.com/dequelabs/axe-core` | **MPL-2.0** | `/LICENSE` | Yes | Yes (file-level copyleft) | File-level copyleft. Preserve MPL notices. Consume as standard external npm dependency (`@axe-core/playwright`). | **INTEGRATE THROUGH ADAPTER** |
| **Magic UI** | Magic UI Design | `github.com/magicuidesign/magicui` | **MIT (Core)** | `/LICENSE` | Yes | Yes (Core only) | Pro templates are proprietary. Ingest only components located in public MIT repo. | **INTEGRATE THROUGH ADAPTER** |
| **Aceternity UI** | Aceternity | `ui.aceternity.com` | **Proprietary Terms (Pro) / Custom** | N/A (Commercial Terms) | Limited (personal/client sites) | **RESTRICTED** (Pro terms prohibit redistribution as stock/marketplace) | Cannot redistribute Pro code in an open registry or resale bundle. | **EXCLUDE PRO SOURCE FROM REGISTRY** |
| **React Bits** | DavidHDev | `github.com/DavidHDev/react-bits` | **MIT + Commons Clause** | `/LICENSE` | Permitted with restrictions | **RESTRICTED** (Commons Clause forbids selling or redistributing components) | Commons Clause prohibits redistributing or selling components directly. | **REFERENCE / NO REDISTRIBUTION WITHOUT PERMISSION** |
| **Zod** | Colin McDonnell | `github.com/colinhacks/zod` | **MIT** | `/LICENSE` | Yes | Yes | Retain MIT copyright notice. | **INTEGRATE DIRECTLY** |
| **Vitest** | Vitest Dev Team | `github.com/vitest-dev/vitest` | **MIT** | `/LICENSE` | Yes | Yes | Retain MIT copyright notice. | **INTEGRATE DIRECTLY** |
| **Turborepo** | Vercel Inc. | `github.com/vercel/turborepo` | **MIT** | `/LICENSE` | Yes | Yes | Retain MIT copyright notice. | **INTEGRATE DIRECTLY** |

---

## 3. Deep Dive: Key Legal & Architectural Nuances

### 3.1 The axe-core MPL-2.0 Implication
- **The Legal Reality:** `axe-core` is licensed under the Mozilla Public License 2.0 (MPL-2.0), a file-level weak copyleft license. Mozilla's licensing documentation explicitly confirms that MPL-2.0 permits combination with differently licensed code in a "Larger Work," provided the MPL-covered files remain distinct and available under MPL-2.0 upon distribution.
- **UIForge Design Choice:** Consuming `axe-core` as an **external npm runtime dependency** (`@axe-core/playwright`) within an isolated adapter (`@uiforge/a11y-engine`) is an established engineering best practice for modularity. It avoids modifying axe-core files directly while respecting all notice requirements.

### 3.2 The React Bits "MIT + Commons Clause" Restriction
- **The Legal Reality:** While frequently described colloquially as MIT, the official React Bits repository includes the **Commons Clause** (`commons-clause.org`) attached to its MIT license.
- **The Restriction:** The Commons Clause explicitly states that the licensee may not "sell, sublicense, or redistribute the software or any portion thereof... including as a component part of a product or service whose value is substantially derived from the software."
- **UIForge Decision:** React Bits components **must not be bundled, ported, or redistributed** in the UIForge public component registry without separate written permission from the copyright holder. It may be studied as an aesthetic reference, but source code redistribution is barred.

### 3.3 The Aceternity UI Redistribution Restrictions
- **The Legal Reality:** Aceternity UI distinguishes between free website demo code and commercial Aceternity Pro licenses. Pro licensing explicitly prohibits redistributing source files as stock material, templates, or marketplace products.
- **UIForge Decision:** To prevent copyright disputes, UIForge adopts a conservative policy: source code from Aceternity Pro will not be ingested into the redistributable UIForge Registry. Any inclusion of free community snippets would require individual, component-specific license verification.

### 3.4 Per-Component Provenance in shadcn/ui and Tremor
- **The Legal Reality:** `shadcn/ui` (MIT) and `Tremor` (Apache-2.0) are open-source, but they distribute uncompiled source code that incorporates third-party icons (Lucide, Radix Icons) and data-visualization libraries (Recharts).
- **UIForge Alignment:** A permissive repository license does not eliminate attribution duties. UIForge’s registry manifest (`registry.json`) will track per-component metadata: upstream repository, commit SHA, license identifier, and third-party notice blocks.

---

## 4. Candidate Reuse Decision Summary

| Strategy Category | Candidate Libraries & Tools | Actionable Boundary |
| :--- | :--- | :--- |
| **Integrate Directly (with Provenance)** | shadcn/ui, Radix UI, Tailwind CSS, React Aria, Tremor, Playwright, Zod, Vitest, Turborepo | Approved for core architecture, monorepo foundation, and primary component registry. Must maintain per-item license metadata. |
| **Integrate via Adapter** | `axe-core` (MPL-2.0), Magic UI (MIT Core) | Consume via clean npm adapter packages; isolate copyleft and curate motion accessibility. |
| **Reference / No Redistribution Without Permission** | React Bits (MIT + Commons Clause) | Study architectural and animation patterns; do not vendor or redistribute source files without explicit permission. |
| **Exclude from Redistributable Registry** | Aceternity Pro, GPL/AGPL component libraries | Excluded by UIForge product policy to preserve permissive, unencumbered redistribution for end users. |
| **Build Native Replacement** | AST surgical patching engine, Anti-AI visual scoring heuristics, Multi-agent context adapters | Build in-house; no suitable open-source tool exists that satisfies UIForge's exact architectural requirements. |
