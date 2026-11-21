# UIForge Research — Preliminary Licensing & Provenance Register

**Document ID:** `UIF-OS-008`  
**Phase:** 02.1 — Open-Source Ecosystem Discovery & Intelligence  
**Status:** Legal Intelligence & Supply-Chain Risk Register  
**Date:** November 2026  

---

## 1. Legal & Licensing Classification Scheme

To ensure that UIForge's open-core foundation remains legally uncompromised, all 125 discovered repositories have been classified into four distinct **Licensing Risk Categories**:

```
┌────────────────────────────────────────────────────────────────────────┐
│                      LICENSING RISK TAXONOMY                           │
├────────────────────┬──────────────────┬────────────────────────────────┤
│ Category           │ License Families │ UIForge Permissibility         │
├────────────────────┼──────────────────┼────────────────────────────────┤
│ 1. Permissive      │ MIT, Apache-2.0, │ APPROVED for dependency,       │
│                    │ ISC, BSD, CC0    │ integration, and registry.     │
├────────────────────┼──────────────────┼────────────────────────────────┤
│ 2. File-Scoped     │ MPL-2.0          │ APPROVED AS DEPENDENCY ONLY.   │
│    Copyleft        │ (axe-core)       │ No code modifications bundled. │
├────────────────────┼──────────────────┼────────────────────────────────┤
│ 3. Strong          │ LGPL-3.0,        │ REVIEW REQUIRED. Avoid linking │
│    Copyleft        │ GPL-3.0          │ in core runtime bundles.       │
├────────────────────┼──────────────────┼────────────────────────────────┤
│ 4. Commercial /    │ Proprietary,     │ STRICTLY PROHIBITED from       │
│    Restrictive     │ Paid Resale      │ registry bundling/redistrib.   │
└────────────────────┴──────────────────┴────────────────────────────────┘
```

---

## 2. In-Depth Analysis of Key Licensing Models

### 2.1 Permissive Licenses (MIT, Apache-2.0, ISC, BSD)
- **Status:** **APPROVED for Core Consumption & Distribution**.
- **Applicable Candidates (106 candidates):**
  - MIT: Radix UI, TanStack Table, Motion, Tailwind CSS, Style Dictionary, Lucide (ISC), pixelmatch (ISC).
  - Apache-2.0: Microsoft Playwright, React Spectrum, Tremor, Apache ECharts.
- **Redistribution Invariants:**
  1. *Attribution Notice:* All components indexed in `@uiforge/component-registry` copied from MIT/Apache-2.0 sources must retain the original copyright notice and license header in the generated file.
  2. *Patent Grants:* Apache-2.0 dependencies (Playwright, React Spectrum) provide explicit patent licenses, providing additional enterprise legal safety.

### 2.2 File-Scoped Weak Copyleft: Mozilla Public License 2.0 (MPL-2.0)
- **Applicable Candidate:** `dequelabs/axe-core` & `@axe-core/playwright`.
- **Legal Analysis:**
  - MPL-2.0 applies **at the file level**, not at the whole-project level.
  - Consuming `@axe-core/playwright` as an external npm package dependency that is installed and dynamically invoked via Node.js runtime does **not** cause copyleft contamination of UIForge Core's MIT/Apache-2.0 codebase.
  - If UIForge developers modify axe-core's internal source files directly, those specific modified files must remain under MPL-2.0. However, wrapping axe-core behind an isolated `@uiforge/a11y-engine` adapter module is completely legally compliant.

### 2.3 SIL Open Font License 1.1 (OFL-1.1)
- **Applicable Candidates:** `rsms/inter` (Inter), `vercel/geist-font` (Geist).
- **Legal Analysis:**
  - OFL-1.1 permits bundling, embedding, and commercial redistribution of fonts with software, provided:
    1. The fonts are not sold on their own.
    2. Modified versions of the font do not use the Reserved Font Name.
  - UIForge can safely distribute pre-configured font configurations and recommend Inter/Geist fonts via Fontsource or standard web imports.

### 2.4 Restrictive Commercial & Custom Licenses (Explicitly Prohibited)
The following candidates have been flagged and **prohibited from direct registry bundling or redistribution**:

| Candidate | Claimed Status | Actual License Restriction | UIForge Action |
| :--- | :--- | :--- | :--- |
| **Aceternity UI** | Free code snippets on web | Commercial Terms of Service forbid redistributing components in open libraries, CLI tools, or competing registries. | **REJECTED from distribution**. Reference only for visual aesthetic trends. |
| **GreenSock (GSAP)** | Free for standard sites | Commercial "Business Green" license required for software products and paid commercial templates. | **REJECTED**. Motion (`motiondivision/motion`) adopted as the 100% MIT alternative. |
| **Pa11y** | Open-source CLI | LGPL-3.0 reciprocal copyleft. | **DEPENDECY EXCLUDED**. `@axe-core/playwright` adopted instead. |
| **Locofy.ai** | Free tier available | Closed-source commercial SaaS with proprietary terms. | **REJECTED**. |

---

## 3. Mandatory Provenance Tracking Schema

Every component, token set, and icon indexed into UIForge registries must maintain an immutable provenance manifest:

```json
{
  "id": "card-01",
  "name": "Bento Metric Card",
  "provenance": {
    "sourceRepository": "https://github.com/magicuidesign/magicui",
    "upstreamComponent": "bento-grid",
    "upstreamCommit": "a1b2c3d4e5f6...",
    "originalAuthor": "Magic UI Community",
    "spdxLicense": "MIT",
    "licenseUrl": "https://github.com/magicuidesign/magicui/blob/main/LICENSE",
    "modificationLog": "Added prefers-reduced-motion fallback; refactored to DTCG tokens."
  }
}
```

This prevents accidental license contamination and gives enterprise users total supply-chain transparency.

---

## 4. Phase 02.3 Legal Audit Agenda

The following items are scheduled for formal verification in Phase 02.3:
1. Verification of third-party dependencies inside `shadcn/ui` components (e.g., Lucide, Radix, Vaul).
2. Deep audit of trademark restrictions on brand icons in `simple-icons`.
3. Validation of font bundling versus font referencing strategies for enterprise distributions.
