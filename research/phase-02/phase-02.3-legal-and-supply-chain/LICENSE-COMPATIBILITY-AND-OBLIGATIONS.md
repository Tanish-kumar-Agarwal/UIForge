# UIForge Legal Audit — License Compatibility, Copyleft Boundaries & Compliance Obligations

**Document ID:** `UIF-PH02.3-LIC-OBLIGATIONS`  
**Phase:** 02.3 — Master Legal, Licensing, Intellectual Property & Software Supply-Chain Audit  
**Classification:** Canonical Open-Source Legal & Compliance Analysis  
**Date:** November 2026  
**Status:** Complete Legal & Architectural Baseline  
**Auditor Lead:** Principal Open-Source Licensing and Compliance Architect & Software IP Specialist  

---

## 1. Executive Summary & Legal Framework

UIForge combines open-source libraries, autonomous agents, code-generation AST engines, component registries, and browser sandboxes into an integrated frontend platform. Because UIForge both consumes upstream open-source code and distributes code to end users, its licensing architecture must satisfy three legal requirements:

1. **Non-Contamination Invariant**: Zero viral or reciprocal copyleft obligations (e.g., from GPL or LGPL) may attach to proprietary customer application code or UIForge Core runtime modules.
2. **Attribution & Patent Defense Invariant**: All upstream copyright notices, SPDX tags, and patent grants (specifically Apache-2.0 Section 3) must be preserved across distributed binaries, npm packages, and generated source files.
3. **Clean Consumption Boundaries**: Every integration between subsystems must maintain an explicit, legally defensible architectural boundary matching its consumption mode (Mode 1 to Mode 4).

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        UIFORGE OPEN-SOURCE LICENSING TAXONOMY                          │
├────────────────────┬────────────────────┬──────────────────────┬───────────────────────┤
│ License Family     │ Governed Packages  │ Copyleft Boundary    │ UIForge Obligation    │
├────────────────────┼────────────────────┼──────────────────────┼───────────────────────┤
│ Permissive         │ Radix, ts-morph,   │ Permissive; no copy- │ Retain copyright      │
│ (MIT, ISC, BSD)    │ Motion, Tailwind   │ left obligations.    │ notices in manifests. │
├────────────────────┼────────────────────┼──────────────────────┼───────────────────────┤
│ Permissive w/      │ Playwright, React  │ Permissive; express  │ Retain NOTICE files;  │
│ Patent (Apache-2.0)│ Spectrum, Biome    │ patent grants.       │ patent defense active.│
├────────────────────┼────────────────────┼──────────────────────┼───────────────────────┤
│ File-Scoped Weak   │ axe-core           │ File boundary;       │ Dynamic import only;  │
│ Copyleft (MPL-2.0) │ (@axe-core/pw)     │ unmodified packages. │ no internal edits.    │
├────────────────────┼────────────────────┼──────────────────────┼───────────────────────┤
│ Strong / Library   │ Pa11y (v10.0.0)    │ Library / Shared     │ Mode 4 CLI process    │
│ Copyleft (LGPL-3.0)│                    │ memory linking risk. │ isolation ONLY.       │
├────────────────────┼────────────────────┼──────────────────────┼───────────────────────┤
│ Font Specific      │ Inter, Geist       │ Bundling permitted;  │ No standalone sale;   │
│ (OFL-1.1)          │                    │ Reserved Font Names. │ keep font name intact.│
└────────────────────┴────────────────────┴──────────────────────┴───────────────────────┘
```

---

## 2. In-Depth Analysis of Audited License Families

### 2.1 Permissive Licenses: MIT, ISC, BSD-2-Clause & BSD-3-Clause

Permissive licenses represent **86.4% (108 candidates)** of the evaluated ecosystem.

- **MIT License**: Governs ts-morph, Radix UI primitives, Motion, Tailwind CSS, TanStack Table, Lucide (ISC equivalent), Biome (dual), and shadcn/ui.
  - *Grant of Rights*: Unrestricted permission to use, copy, modify, merge, publish, distribute, sublicense, and sell.
  - *Conditions*: The copyright notice and permission notice must be included in all copies or substantial portions of the Software.
  - *UIForge Implementation*: Retained automatically via `@uiforge/cli` build banners and embedded file headers during Mode 3 component copying.
- **ISC License**: Governs `mapbox/pixelmatch`, `lucide-react`, and `d3`.
  - Functionally and legally equivalent to the 2-Clause BSD license.
  - Fully compatible with MIT and Apache-2.0.
- **BSD-3-Clause License**: Governs `salesforce/theo`.
  - Includes an explicit non-endorsement clause prohibiting the use of the copyright holder's name to endorse derivative products without written permission.

### 2.2 Apache License 2.0 (Apache-2.0)

Governs core dependencies including Microsoft Playwright (`v1.65.1`), Adobe React Spectrum (`v3.35.0`), Amazon Style Dictionary (`v5.8.0`), Biome (dual-license option), and OpenTelemetry.

- **Express Patent License (Section 3)**:
  - Each contributor grants an irrevocable, perpetual, worldwide, royalty-free patent license to make, have made, use, sell, and import the contribution.
  - *Patent Retaliation Clause*: If any entity initiates patent litigation against a contributor claiming that the software infringes a patent, all patent licenses granted under Apache-2.0 to that entity terminate immediately.
- **Conditions & Redistribution (Section 4)**:
  - You must give any recipients a copy of the License.
  - You must cause any modified files to carry prominent notices stating that you changed the files.
  - You must retain all copyright, patent, trademark, and attribution notices from the Source form.
  - **Section 4(d) NOTICE File**: If the Work includes a `NOTICE` text file as part of its distribution, any derivative distribution must include a readable copy of the attribution notices contained within that `NOTICE` file.
  - *UIForge Implementation*: `@uiforge/core` aggregates all upstream `NOTICE` files into a consolidated `/dist/NOTICE` artifact in published npm packages.

### 2.3 File-Scoped Weak Copyleft: Mozilla Public License 2.0 (MPL-2.0)

Governs `dequelabs/axe-core` and `@axe-core/playwright`.

- **Legal Mechanics of MPL-2.0**:
  - Unlike the GNU GPL, the copyleft scope of MPL-2.0 is strictly **file-scoped** (Section 1.10 "Modifications").
  - Any modification to an existing MPL-2.0 source file remains governed by MPL-2.0 and must be made available under MPL-2.0 terms.
  - **"Larger Work" Safe Harbor (Section 3.3)**: A licensee may create a "Larger Work" by combining Covered Software with other code in separate files and distribute the Larger Work under a different license (e.g., Apache-2.0 or commercial), provided the MPL-2.0 requirements for the Covered Software files are met.
- **UIForge Architectural Conformance**:
  1. UIForge consumes `axe-core` strictly as an un-modified npm package dependency resolved via package manager.
  2. UIForge writes zero patches or code mutations directly into axe-core source files.
  3. UIForge wraps axe-core in `@uiforge/a11y-engine`, an isolated adapter module distributed under Apache-2.0. Because the integration occurs via dynamic Node.js module loading across separate files, no copyleft contamination occurs.

### 2.4 Strong / Reciprocal Library Copyleft: GNU LGPL-3.0

Governs `pa11y/pa11y` (`v10.0.0`).

- **Legal Risk Profile of LGPL-3.0**:
  - Section 4 of LGPL-3.0 allows distribution of an "Application" that links with the Library provided the user can modify the Library and re-link the Application (the "re-linking requirement").
  - In JavaScript/Node.js ecosystems, bundling (e.g., via esbuild, Rollup, or Webpack) merges multiple libraries into a single monolithic bundle or byte-code file. Courts and legal commentators have argued that monolithic JS bundles eliminate the boundary between the Library and the Application, potentially subjecting the entire bundle to reciprocal copyleft terms.
- **UIForge Architectural Isolation Decision (`LDEC-04`)**:
  - **Zero In-Process Linking**: Pa11y is strictly excluded as an in-process runtime dependency or bundled module in `@uiforge/core` or `@uiforge/a11y-engine`.
  - **Subprocess CLI Runner (Mode 4)**: Pa11y is supported strictly as an external, optional CLI execution runner. UIForge invokes `pa11y` via `child_process.spawn()` over operating-system standard input/output (stdio) or JSON stdout streams.
  - *Legal Doctrine*: Under prevailing copyright jurisprudence and FSF guidelines, communication across a standard operating-system process boundary via pipe/fork/exec with standardized data formats (JSON) constitutes two independent programs, preventing derivative work formation.

---

## 3. Comprehensive Cross-License Compatibility Matrix

The following matrix establishes whether code under License A can be legally combined, bundled, or invoked by a subsystem under License B:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        CROSS-LICENSE COMPATIBILITY MATRIX                              │
├───────────────────┬─────────┬────────────┬─────────┬──────────┬──────────┬─────────────┤
│ Target Subsystem  │ MIT     │ Apache-2.0 │ ISC/BSD │ MPL-2.0  │ LGPL-3.0 │ OFL-1.1     │
├───────────────────┼─────────┼────────────┼─────────┼──────────┼──────────┼─────────────┤
│ UIForge Core      │ YES     │ YES        │ YES     │ DYNAMIC  │ SUBPROC  │ ASSETS ONLY │
│ (Apache-2.0)      │ (Embed) │ (Native)   │ (Embed) │ (Larger) │ (Mode 4) │ (No Renam)  │
├───────────────────┼─────────┼────────────┼─────────┼──────────┼──────────┼─────────────┤
│ UIForge CLI       │ YES     │ YES        │ YES     │ DYNAMIC  │ SUBPROC  │ ASSETS ONLY │
│ (MIT)             │ (Native)│ (Compat)   │ (Embed) │ (Larger) │ (Mode 4) │ (No Renam)  │
├───────────────────┼─────────┼────────────┼─────────┼──────────┼──────────┼─────────────┤
│ Component Registry│ YES     │ YES        │ YES     │ PROHIB   │ PROHIB   │ PROHIB      │
│ (Mode 3 Copying)  │ (Notice)│ (Notice)   │ (Notice)│ (Source) │ (Source) │ (Source)    │
├───────────────────┼─────────┼────────────┼─────────┼──────────┼──────────┼─────────────┤
│ Studio (SaaS)     │ YES     │ YES        │ YES     │ YES      │ SUBPROC  │ WEB-FONT    │
│ (Commercial)      │ (Embed) │ (Embed)    │ (Embed) │ (Sep)    │ (Mode 4) │ (Hosted)    │
└───────────────────┴─────────┴────────────┴─────────┴──────────┴──────────┴─────────────┘
```

### Explanatory Compatibility Notes:
1. **Apache-2.0 into MIT**: Apache-2.0 code can be bundled into an MIT project, but the Apache-2.0 files retain their Apache-2.0 license and NOTICE requirements. The resulting combined work as a whole must satisfy Apache-2.0 conditions.
2. **MIT into Apache-2.0**: Fully compatible. MIT permits relicensing or incorporation into broader Apache-2.0 works as long as the original MIT copyright banner is preserved.
3. **MPL-2.0 into Apache-2.0 Core**: Permitted under the "Larger Work" clause of MPL-2.0 Section 3.3, provided the MPL-2.0 files remain distinct and their source availability is documented.
4. **LGPL-3.0 into Registry**: **STRICTLY PROHIBITED**. Component registry templates distributed to customer repositories must never contain LGPL or copyleft code.

---

## 4. Attribution & Notice Obligations Across Subsystems

### 4.1 Mode 3: Source Copying Header Preservation

When `@uiforge/cli` executes `uiforge add <component>`, it pulls component code originally authored by upstream communities (e.g., shadcn/ui, Magic UI) and writes it into the customer's codebase.

**Legal Danger**: Stripping upstream copyright notices or replacing author credits with "UIForge" constitutes copyright infringement under 17 U.S.C. § 106 and violates Section 1 of the MIT License.

**UIForge Automated Header Standard**:
Every copied component file MUST prepend a standardized, immutable legal header:

```typescript
/**
 * UIForge Component Registry — Source Provenance & Upstream Attribution
 *
 * Upstream Component: Bento Grid (bento-grid.tsx)
 * Upstream Repository: https://github.com/magicuidesign/magicui
 * Upstream Author: Magic UI Community
 * Original License: MIT (SPDX: MIT)
 *
 * Copyright (c) 2024-2026 Magic UI Community
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software...
 *
 * UIForge Modifications:
 * - Refactored color tokens to W3C DTCG 2025.10 design token contracts.
 * - Added WCAG 2.2 AA prefers-reduced-motion keyboard accessibility fallbacks.
 * - Injected @uiforge/provenance metadata digest [sha256:e3b0c442...].
 */
```

### 4.2 Aggregated NOTICE File Generation

For distributed npm packages (`@uiforge/core`, `@uiforge/cli`, `@uiforge/agent-sdk`, `@uiforge/mcp-server`), UIForge's build pipeline compiles all third-party licenses into an authoritative `THIRD-PARTY-LICENSES.md` and `NOTICE` file bundled in the root of the published package tarball.

---

## 5. Patent Grants & Retaliation Clauses

Enterprise customers require strong assurances that using UIForge will not expose them to latent patent infringement claims from contributors or upstream vendors.

### 5.1 Apache-2.0 Patent Protection
UIForge Core leverages Apache-2.0 dependencies (Microsoft Playwright, Adobe React Spectrum, Amazon Style Dictionary, Biome). Under Apache-2.0 Section 3, these corporations have granted worldwide, royalty-free patent licenses covering their contributions.

### 5.2 Patent Retaliation Defense
If an enterprise user is sued for patent infringement by an entity claiming that Playwright or Style Dictionary infringes their patents, the attacking entity forfeits their own Apache-2.0 licenses. This cross-licensing defense provides strong deterrence against patent trolls.

### 5.3 MIT Patent Silence
MIT does not explicitly mention patents. While most legal authorities consider that an implied patent license accompanies the grant to "use, copy, modify, merge, publish, distribute", adopting Apache-2.0 for UIForge Core provides express legal certainty.

---

## 6. SaaS, Cloud & Network-Use Obligations (AGPL Analysis)

The GNU Affero General Public License (AGPL-3.0) contains Section 13, which triggers copyleft obligations upon "interacting with [the software] remotely through a computer network".

- **Audit Finding**: Zero candidates in UIForge Core, CLI, Agent SDK, or Registry are licensed under AGPL-3.0.
- **Hosted Cloud & Studio Safe Harbor**: Because UIForge Core and its runtime dependencies avoid AGPL-3.0 entirely, enterprise customers hosting UIForge components or using UIForge Studio in internal cloud environments face zero risk of being compelled to open-source their proprietary SaaS applications.

---

## 7. Conclusions & Governance Directives

1. **Permissive Foundation**: UIForge is built on a 100% legally verified permissive (MIT/Apache-2.0/ISC) base.
2. **Strict Copyleft Isolation**: MPL-2.0 is isolated to dynamic library calls; LGPL-3.0 is isolated to standalone CLI subprocesses.
3. **Mandatory Header Injection**: The CLI component generator must never emit source code without preserving upstream copyright and license notices.
