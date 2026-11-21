# UIForge Research — Master Open-Source Candidate Inventory

**Document ID:** `UIF-OS-003`  
**Phase:** 02.1 — Open-Source Ecosystem Discovery & Intelligence  
**Status:** Canonical Repository Database (125 Evaluated Candidates)  
**Date:** November 2026  

---

## 1. Inventory Overview & Classification Schema

This document catalogues all **125 open-source repositories, developer tools, component registries, design systems, and agent frameworks** investigated during Phase 02.1.

### Primary Classifications:
- **`[DEP]` Dependency Candidate**: Core runtime library consumed directly by UIForge engines via package manager.
- **`[INT]` Integration Candidate**: External tool, agent, CLI, or IDE invoked via MCP, subprocess, or standard APIs.
- **`[REG]` Registry Candidate**: Component, token, or pattern library indexed or redistributed under verified provenance.
- **`[REF]` Reference**: Architectural pattern, design standard, or implementation study; no redistribution.
- **`[INF]` Infrastructure Candidate**: Test runner, browser execution container, or static parser.
- **`[RES]` Research-Only**: Academic prototype or emerging concept under evaluation.
- **`[REJ]` Rejected Candidate**: Unsuitable due to commercial restrictions, abandonware, or architectural conflict.

### Preliminary Priorities:
- **`P0` Foundational**: Critical architectural dependency or core protocol.
- **`P1` High Value**: Major capability accelerator or preferred registry candidate.
- **`P2` Exploratory**: Niche reference, emerging tool, or alternative approach.
- **`REJ` Rejected**: Ineligible for integration or direct distribution.

---

## 2. Category 01 — UI Component Ecosystems (15 Candidates)

| Candidate ID | Repository Name & URL | Maintainer / Org | Classification | License (Status) | Priority | Evidence | Discovery Decision & UIForge Role |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| `OS-COMP-01` | [shadcn-ui/ui](https://github.com/shadcn-ui/ui) | shadcn | `[REG]` / `[REF]` | MIT (`VERIFIED`) | **P1** | `[DOC-VERIFIED]` | Primary registry standard. Adopt `registry.json` schema; support without forcing. |
| `OS-COMP-02` | [radix-ui/primitives](https://github.com/radix-ui/primitives) | WorkOS | `[REG]` / `[DEP]` | MIT (`VERIFIED`) | **P0** | `[PRODUCT-TESTED]` | Foundational headless primitive layer for accessible interactive component modeling. |
| `OS-COMP-03` | [adobe/react-spectrum](https://github.com/adobe/react-spectrum) | Adobe | `[REG]` / `[REF]` | Apache-2.0 (`VERIFIED`) | **P0** | `[PRODUCT-TESTED]` | Benchmark standard for enterprise a11y, mobile touch quirks, and complex keyboard navigation. |
| `OS-COMP-04` | [tailwindlabs/headlessui](https://github.com/tailwindlabs/headlessui) | Tailwind Labs | `[REG]` / `[REF]` | MIT (`VERIFIED`) | **P1** | `[DOC-VERIFIED]` | First-party unstyled primitives optimized for Tailwind CSS. Supported component registry base. |
| `OS-COMP-05` | [mantinedev/mantine](https://github.com/mantinedev/mantine) | Vitaly Rtishchev | `[REF]` | MIT (`VERIFIED`) | **P2** | `[PRODUCT-TESTED]` | Feature-rich React component library with deep hooks library (`@mantine/hooks`). Reference only. |
| `OS-COMP-06` | [chakra-ui/chakra-ui](https://github.com/chakra-ui/chakra-ui) | Segun Adebayo | `[REF]` | MIT (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Study snippet-based distribution and Zag.js state machine integration (v3). |
| `OS-COMP-07` | [mui/material-ui](https://github.com/mui/material-ui) | Material UI SAS | `[REF]` | MIT (`VERIFIED`) | **P2** | `[PRODUCT-TESTED]` | Established enterprise Material Design component library. Reference for legacy refactoring. |
| `OS-COMP-08` | [ant-design/ant-design](https://github.com/ant-design/ant-design) | Ant Group | `[REF]` | MIT (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Enterprise B2B design language. Reference for high-density form and table paradigms. |
| `OS-COMP-09` | [nextui-org/nextui](https://github.com/nextui-org/nextui) | NextUI / HeroUI | `[REG]` | MIT (`VERIFIED`) | **P2** | `[PRODUCT-TESTED]` | Modern Tailwind + React Aria component library (rebranding to HeroUI). Registry candidate. |
| `OS-COMP-10` | [chakra-ui/ark](https://github.com/chakra-ui/ark) | Chakra UI Team | `[REG]` / `[REF]` | MIT (`VERIFIED`) | **P1** | `[PRODUCT-TESTED]` | Headless primitives built on Zag.js state machines; multi-framework (React, Vue, Solid). |
| `OS-COMP-11` | [mui/base-ui](https://github.com/mui/base-ui) | MUI Team | `[REG]` / `[REF]` | MIT (`VERIFIED`) | **P1** | `[DOC-VERIFIED]` | Modern unstyled headless primitives by MUI. Direct competitor/alternative to Radix. |
| `OS-COMP-12` | [chakra-ui/park-ui](https://github.com/chakra-ui/park-ui) | Christian Busch | `[REG]` | MIT (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Copy-paste component library combining Ark UI headless logic with Panda CSS tokens. |
| `OS-COMP-13` | [ariakit/ariakit](https://github.com/ariakit/ariakit) | Diego Haz | `[REG]` / `[REF]` | MIT (`VERIFIED`) | **P1** | `[PRODUCT-TESTED]` | Outstanding unstyled, accessible React components (formerly Reakit). Deep a11y reference. |
| `OS-COMP-14` | [palantir/blueprint](https://github.com/palantir/blueprint) | Palantir | `[REF]` | Apache-2.0 (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Reference for high-density data visualization and desktop web application controls. |
| `OS-COMP-15` | [saas-js/saas-ui](https://github.com/saas-js/saas-ui) | Eelco Wiersma | `[REF]` | MIT (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | SaaS-specific components built on Chakra UI (auth screens, billing forms). Reference. |

---

## 3. Category 02 — Landing Page & Marketing Section Ecosystems (8 Candidates)

| Candidate ID | Repository Name & URL | Maintainer / Org | Classification | License (Status) | Priority | Evidence | Discovery Decision & UIForge Role |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| `OS-MKT-01` | [magicuidesign/magicui](https://github.com/magicuidesign/magicui) | Dillion Verma | `[REG]` | MIT Core (`VERIFIED`) | **P1** | `[PRODUCT-TESTED]` | Curated animated landing blocks (bento grids, animated beams). Ingest with reduced-motion guard. |
| `OS-MKT-02` | [nolly-studio/cult-ui](https://github.com/nolly-studio/cult-ui) | Nolly Studio | `[REG]` | MIT (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Modern animated components and micro-interactions for design engineers. Registry candidate. |
| `OS-MKT-03` | [DavidHDev/react-bits](https://github.com/DavidHDev/react-bits) | David H. | `[REF]` | MIT (`VERIFIED`) | **P2** | `[PRODUCT-TESTED]` | Creative animation and canvas effects collection. Reference only; requires TypeScript vetting. |
| `OS-MKT-04` | [cosscom/originui](https://github.com/cosscom/ui) | Cosscom / Origin UI | `[REG]` | MIT (`VERIFIED`) | **P1** | `[DOC-VERIFIED]` | Comprehensive copy-paste collection of clean Tailwind + Radix inputs, navbars, and banners. |
| `OS-MKT-05` | [htmlstreamofficial/preline](https://github.com/htmlstreamofficial/preline) | Htmlstream | `[REG]` / `[REF]` | MIT (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Open-source Tailwind CSS component library with pre-built landing sections and marketing layouts. |
| `OS-MKT-06` | [themesberg/flowbite-react](https://github.com/themesberg/flowbite-react) | Themesberg | `[REG]` / `[REF]` | MIT (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Complete marketing and application components built on Tailwind CSS. Supported registry base. |
| `OS-MKT-07` | [markmead/hyperui](https://github.com/markmead/hyperui) | Mark Mead | `[REG]` | MIT (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Free community Tailwind CSS marketing components (heroes, footers, pricing, stats). |
| `OS-MKT-08` | [aceternity/ui](https://ui.aceternity.com) | Aceternity | `[REJ]` | Commercial (`RESTRICTIVE`) | **REJ** | `[DOC-VERIFIED]` | **REJECTED from distribution**. Commercial terms prohibit redistribution in open registries. Reference only. |

---

## 4. Category 03 — Dashboard & Application Components (8 Candidates)

| Candidate ID | Repository Name & URL | Maintainer / Org | Classification | License (Status) | Priority | Evidence | Discovery Decision & UIForge Role |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| `OS-DASH-01` | [tremorlabs/tremor](https://github.com/tremorlabs/tremor) | Tremor Labs | `[REG]` / `[REF]` | Apache-2.0 (`VERIFIED`) | **P1** | `[PRODUCT-TESTED]` | Standard component suite for analytics dashboards, KPI metric cards, and data summaries. |
| `OS-DASH-02` | [tremorlabs/tremor-raw](https://github.com/tremorlabs/tremor-raw) | Tremor Labs | `[REG]` | Apache-2.0 (`VERIFIED`) | **P1** | `[DOC-VERIFIED]` | Copy-paste Tailwind v4 compatible dashboard components following shadcn uncompiled patterns. |
| `OS-DASH-03` | [TanStack/table](https://github.com/TanStack/table) | Tanner Linsley | `[DEP]` / `[REG]` | MIT (`VERIFIED`) | **P0** | `[PRODUCT-TESTED]` | Headless data table state engine. Essential for table sorting, pagination, and multi-filter state. |
| `OS-DASH-04` | [TanStack/virtual](https://github.com/TanStack/virtual) | Tanner Linsley | `[DEP]` | MIT (`VERIFIED`) | **P1** | `[DOC-VERIFIED]` | Headless row and grid virtualization for high-density enterprise dashboard tables. |
| `OS-DASH-05` | [react-grid-layout/react-grid-layout](https://github.com/react-grid-layout/react-grid-layout) | STRML | `[REF]` / `[REG]` | MIT (`VERIFIED`) | **P2** | `[PRODUCT-TESTED]` | Draggable and resizable dashboard grid layout system for analytics workspaces. |
| `OS-DASH-06` | [refinedev/refine](https://github.com/refinedev/refine) | Refine | `[REF]` | MIT (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Open-source React framework for data-intensive internal tools and admin panels. Reference. |
| `OS-DASH-07` | [marmelab/react-admin](https://github.com/marmelab/react-admin) | Marmelab | `[REF]` | MIT (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Architecture reference for B2B admin CRUD interfaces, auth forms, and data provider adapters. |
| `OS-DASH-08` | [tabler/tabler-react](https://github.com/tabler/tabler-react) | Tabler Team | `[REF]` | MIT (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Classic open-source dashboard template components. Reference for standard SaaS layouts. |

---

## 5. Category 04 — Design Systems & Design Tokens (10 Candidates)

| Candidate ID | Repository Name & URL | Maintainer / Org | Classification | License (Status) | Priority | Evidence | Discovery Decision & UIForge Role |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| `OS-TOKN-01` | [design-tokens/community-group](https://github.com/design-tokens/community-group) | W3C DTCG | `[REF]` | W3C Software/Doc (`VERIFIED`) | **P0** | `[DOC-VERIFIED]` | The foundational standard for `@uiforge/design-tokens`. Industry schema for cross-tool token exchange. |
| `OS-TOKN-02` | [style-dictionary/style-dictionary](https://github.com/style-dictionary/style-dictionary) | Style Dictionary | `[DEP]` / `[REF]` | Apache-2.0 (`VERIFIED`) | **P1** | `[PRODUCT-TESTED]` | Build system for transforming design tokens into CSS Custom Properties, Tailwind, and iOS/Android. |
| `OS-TOKN-03` | [argyleink/open-props](https://github.com/argyleink/open-props) | Adam Argyle | `[REG]` / `[REF]` | MIT (`VERIFIED`) | **P1** | `[PRODUCT-TESTED]` | Pre-computed CSS Custom Properties (spacing, typographic ramps, fluid easing, elevation shadows). |
| `OS-TOKN-04` | [tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss) | Tailwind Labs | `[DEP]` / `[REF]` | MIT (`VERIFIED`) | **P0** | `[PRODUCT-TESTED]` | v4 `@theme` directive and utility compiler. Core styling target for UIForge code generation. |
| `OS-TOKN-05` | [radix-ui/colors](https://github.com/radix-ui/colors) | WorkOS | `[REG]` / `[DEP]` | MIT (`VERIFIED`) | **P1** | `[DOC-VERIFIED]` | Accessible, 12-step color scale system designed specifically for dark and light UI states. |
| `OS-TOKN-06` | [tokens-studio/sd-transforms](https://github.com/tokens-studio/sd-transforms) | Tokens Studio | `[DEP]` / `[REF]` | MIT (`VERIFIED`) | **P1** | `[DOC-VERIFIED]` | Transforms Tokens Studio / Figma token structures for Style Dictionary ingestion. |
| `OS-TOKN-07` | [primer/primitives](https://github.com/primer/primitives) | GitHub Primer | `[REF]` | MIT (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Production design token repository for GitHub's Primer design system. Semantic token reference. |
| `OS-TOKN-08` | [carbon-design-system/carbon](https://github.com/carbon-design-system/carbon) | IBM Carbon | `[REF]` | Apache-2.0 (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Enterprise design system reference for data density, contrast rules, and token scales. |
| `OS-TOKN-09` | [material-components/material-web](https://github.com/material-components/material-web) | Google Material 3 | `[REF]` | Apache-2.0 (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Material 3 token architecture reference (surface tonal elevation, dynamic color seeding). |
| `OS-TOKN-10` | [adobe/spectrum-tokens](https://github.com/adobe/spectrum-tokens) | Adobe | `[REF]` | Apache-2.0 (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Enterprise multi-platform token reference supporting large/compact density scaling. |

---

## 6. Category 05 — Animation & Motion Ecosystems (8 Candidates)

| Candidate ID | Repository Name & URL | Maintainer / Org | Classification | License (Status) | Priority | Evidence | Discovery Decision & UIForge Role |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| `OS-ANIM-01` | [motiondivision/motion](https://github.com/motiondivision/motion) | Motion Division | `[DEP]` / `[REG]` | MIT (`VERIFIED`) | **P0** | `[PRODUCT-TESTED]` | Leading declarative React animation library (formerly Framer Motion). Primary motion standard. |
| `OS-ANIM-02` | [formkit/auto-animate](https://github.com/formkit/auto-animate) | FormKit | `[DEP]` / `[REG]` | MIT (`VERIFIED`) | **P1** | `[PRODUCT-TESTED]` | Zero-config, drop-in automatic animation utility for dynamic list sorting and DOM mutations. |
| `OS-ANIM-03` | [pmndrs/react-spring](https://github.com/pmndrs/react-spring) | Poimandres | `[REF]` | MIT (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Physics-based spring animation library. Reference for advanced micro-interactions. |
| `OS-ANIM-04` | [greensock/gsap](https://github.com/greensock/gsap) | GreenSock | `[REJ]` | Standard GSAP (`COMMERCIAL`) | **REJ** | `[DOC-VERIFIED]` | **REJECTED from open distribution**. Commercial license requires paid tier for redistribution. |
| `OS-ANIM-05` | [airbnb/lottie-web](https://github.com/airbnb/lottie-web) | Airbnb | `[DEP]` / `[REG]` | MIT (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Render After Effects vector animations natively in web apps. Supported asset loader. |
| `OS-ANIM-06` | [animate-css/animate.css](https://github.com/animate-css/animate.css) | Daniel Eden | `[REF]` | MIT (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Cross-browser CSS animation keyframe utilities. Reference for CSS-only micro-animations. |
| `OS-ANIM-07` | [catdad/canvas-confetti](https://github.com/catdad/canvas-confetti) | Kiril Vatev | `[REG]` | ISC (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | High-performance, zero-dependency celebration effects for conversion/checkout journeys. |
| `OS-ANIM-08` | [remotion-dev/remotion](https://github.com/remotion-dev/remotion) | Jonny Burger | `[REF]` | Custom SSR (`RESTRICTIVE`) | **REJ** | `[DOC-VERIFIED]` | Programmatic video creation in React. Deprioritized; outside core frontend intelligence scope. |

---

## 7. Category 06 — Icons, Illustrations & Visual Assets (8 Candidates)

| Candidate ID | Repository Name & URL | Maintainer / Org | Classification | License (Status) | Priority | Evidence | Discovery Decision & UIForge Role |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| `OS-ICON-01` | [lucide-icons/lucide](https://github.com/lucide-icons/lucide) | Lucide Community | `[DEP]` / `[REG]` | ISC (`VERIFIED`) | **P0** | `[PRODUCT-TESTED]` | Primary open-source icon foundation for UIForge (1,400+ tree-shakable clean vector icons). |
| `OS-ICON-02` | [tailwindlabs/heroicons](https://github.com/tailwindlabs/heroicons) | Tailwind Labs | `[REG]` | MIT (`VERIFIED`) | **P1** | `[PRODUCT-TESTED]` | Verified Tailwind companion icon set (outline, solid, micro). Secondary supported icon library. |
| `OS-ICON-03` | [tabler/tabler-icons](https://github.com/tabler/tabler-icons) | Paweł Kuna | `[REG]` | MIT (`VERIFIED`) | **P1** | `[DOC-VERIFIED]` | Massive collection of 5,200+ MIT vector icons. Supported registry candidate. |
| `OS-ICON-04` | [phosphor-icons/core](https://github.com/phosphor-icons/core) | Phosphor Icons | `[REG]` | MIT (`VERIFIED`) | **P1** | `[DOC-VERIFIED]` | Flexible icon family with 6 distinct weight variations (thin, light, regular, bold, fill, duotone). |
| `OS-ICON-05` | [iconify/iconify](https://github.com/iconify/iconify) | Vjacheslav Trushkin | `[DEP]` / `[REG]` | MIT (`VERIFIED`) | **P1** | `[DOC-VERIFIED]` | Universal icon framework indexing 200,000+ vector icons across 150 icon sets. |
| `OS-ICON-06` | [google/material-design-icons](https://github.com/google/material-design-icons) | Google | `[REG]` | Apache-2.0 (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Official Google Material Symbols with variable font axes (weight, grade, optical size). |
| `OS-ICON-07` | [gregberge/svgr](https://github.com/gregberge/svgr) | Greg Berge | `[DEP]` | MIT (`VERIFIED`) | **P1** | `[PRODUCT-TESTED]` | Transforms raw SVGs into production-ready, accessible React components. Core toolchain asset. |
| `OS-ICON-08` | [simple-icons/simple-icons](https://github.com/simple-icons/simple-icons) | Simple Icons Org | `[REG]` | CC0 1.0 (`VERIFIED`) | **P1** | `[DOC-VERIFIED]` | 3,000+ brand and technology logos. Important for integration badges, social links, and auth. |

---

## 8. Category 07 — Charts & Data Visualization (8 Candidates)

| Candidate ID | Repository Name & URL | Maintainer / Org | Classification | License (Status) | Priority | Evidence | Discovery Decision & UIForge Role |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| `OS-CHRT-01` | [recharts/recharts](https://github.com/recharts/recharts) | Recharts Group | `[DEP]` / `[REG]` | MIT (`VERIFIED`) | **P0** | `[PRODUCT-TESTED]` | Declarative, SVG-based React chart library. Primary data visualization standard for UIForge. |
| `OS-CHRT-02` | [apache/echarts](https://github.com/apache/echarts) | Apache Software | `[DEP]` / `[REG]` | Apache-2.0 (`VERIFIED`) | **P1** | `[DOC-VERIFIED]` | Industrial-grade Canvas/WebGL charting engine for high-volume enterprise analytics datasets. |
| `OS-CHRT-03` | [plouc/nivo](https://github.com/plouc/nivo) | Raphaël Benitte | `[REG]` / `[REF]` | MIT (`VERIFIED`) | **P1** | `[PRODUCT-TESTED]` | Rich React data visualization components built on D3 with SVG, Canvas, and SSR support. |
| `OS-CHRT-04` | [airbnb/visx](https://github.com/airbnb/visx) | Airbnb Engineering | `[DEP]` / `[REF]` | MIT (`VERIFIED`) | **P1** | `[DOC-VERIFIED]` | Headless low-level visualization primitives combining D3 math with React DOM rendering. |
| `OS-CHRT-05` | [chartjs/Chart.js](https://github.com/chartjs/Chart.js) | Chart.js Team | `[REF]` | MIT (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Popular canvas-based chart library. Reference for legacy React wrappers (`react-chartjs-2`). |
| `OS-CHRT-06` | [observablehq/plot](https://github.com/observablehq/plot) | Observable | `[REF]` | ISC (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Grammar-of-graphics statistical charting library. Reference for exploratory data analysis UI. |
| `OS-CHRT-07` | [d3/d3](https://github.com/d3/d3) | Mike Bostock | `[DEP]` / `[REF]` | ISC (`VERIFIED`) | **P1** | `[DOC-VERIFIED]` | Underlying mathematical calculation engine (scales, curves, hierarchies) for custom visuals. |
| `OS-CHRT-08` | [FormidableLabs/victory](https://github.com/FormidableLabs/victory) | Formidable Labs | `[REF]` | MIT (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Modular charting components for React and React Native. Secondary reference. |

---

## 9. Category 08 — Typography & Content Presentation (6 Candidates)

| Candidate ID | Repository Name & URL | Maintainer / Org | Classification | License (Status) | Priority | Evidence | Discovery Decision & UIForge Role |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| `OS-TYPO-01` | [tailwindlabs/tailwindcss-typography](https://github.com/tailwindlabs/tailwindcss-typography) | Tailwind Labs | `[DEP]` / `[REG]` | MIT (`VERIFIED`) | **P0** | `[PRODUCT-TESTED]` | Official Tailwind `prose` plugin enforcing typographic scale, line-height, and rhythm. |
| `OS-TYPO-02` | [seek-oss/capsize](https://github.com/seek-oss/capsize) | SEEK Engineering | `[DEP]` / `[REF]` | MIT (`VERIFIED`) | **P1** | `[DOC-VERIFIED]` | Leading font-metric utility removing typographic leading trim and preventing layout shift (CLS). |
| `OS-TYPO-03` | [fontsource/fontsource](https://github.com/fontsource/fontsource) | Fontsource | `[DEP]` / `[REG]` | MIT Code / OFL Fonts (`VERIFIED`) | **P1** | `[PRODUCT-TESTED]` | Self-hosted, npm-distributable open-source web fonts (Inter, Roboto, Fira Code, Geist). |
| `OS-TYPO-04` | [rsms/inter](https://github.com/rsms/inter) | Rasmus Andersson | `[REG]` | SIL OFL 1.1 (`VERIFIED`) | **P0** | `[PRODUCT-TESTED]` | The industry benchmark open-source UI variable font for high-legibility digital screens. |
| `OS-TYPO-05` | [vercel/geist-font](https://github.com/vercel/geist-font) | Vercel | `[REG]` | SIL OFL 1.1 (`VERIFIED`) | **P1** | `[PRODUCT-TESTED]` | Modern monospace and sans-serif typeface designed specifically for developer tools and SaaS. |
| `OS-TYPO-06` | [opentypejs/opentype.js](https://github.com/opentypejs/opentype.js) | Frederik De Bleser | `[DEP]` / `[REF]` | MIT (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | JavaScript font parser for extracting glyph metrics, bounding boxes, and variable font tables. |

---

## 10. Category 09 — Layout & Responsive Design Patterns (8 Candidates)

| Candidate ID | Repository Name & URL | Maintainer / Org | Classification | License (Status) | Priority | Evidence | Discovery Decision & UIForge Role |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| `OS-LAYT-01` | [bvaughn/react-resizable-panels](https://github.com/bvaughn/react-resizable-panels) | Brian Vaughn | `[DEP]` / `[REG]` | MIT (`VERIFIED`) | **P0** | `[PRODUCT-TESTED]` | Essential accessible panel group layout system for IDE-style sidebars, previews, and drawers. |
| `OS-LAYT-02` | [tailwindlabs/tailwindcss-container-queries](https://github.com/tailwindlabs/tailwindcss-container-queries) | Tailwind Labs | `[DEP]` / `[REG]` | MIT (`VERIFIED`) | **P0** | `[DOC-VERIFIED]` | Enables container-relative component responsive styling (`@sm:`, `@lg:`) rather than viewport. |
| `OS-LAYT-03` | [radix-ui/primitives (Aspect Ratio)](https://github.com/radix-ui/primitives) | WorkOS | `[REG]` | MIT (`VERIFIED`) | **P1** | `[PRODUCT-TESTED]` | Prevents layout shift across image, video, and card embeds at responsive breakpoints. |
| `OS-LAYT-04` | [drcmda/react-spring (Parallax)](https://github.com/pmndrs/react-spring) | Poimandres | `[REF]` | MIT (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Reference for multi-layer scroll layouts and depth perception in editorial presentations. |
| `OS-LAYT-05` | [desandro/masonry](https://github.com/desandro/masonry) | David DeSandro | `[REF]` | MIT (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Classic masonry grid layout algorithm. Reference for asymmetrical marketing and media galleries. |
| `OS-LAYT-06` | [kristoferbaxter/flexboxgrid](https://github.com/kristoferbaxter/flexboxgrid) | Kristofer Baxter | `[REF]` | Apache-2.0 (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Declarative 12-column flexbox grid system. Reference for legacy responsive grid architectures. |
| `OS-LAYT-07` | [yannickcr/eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) | JSX ESlint | `[DEP]` | MIT (`VERIFIED`) | **P1** | `[DOC-VERIFIED]` | Static linting rules for React DOM nesting hierarchy and structural correctness. |
| `OS-LAYT-08` | [Every-Layout/every-layout](https://every-layout.dev) | Heydon Pickering | `[REF]` | Book / Proprietary (`RESTRICTIVE`) | **P1** | `[DOC-VERIFIED]` | Foundational CSS layout composition patterns (The Stack, The Cluster, The Reel). Reference only. |

---

## 11. Category 10 — Accessibility Utilities (10 Candidates)

| Candidate ID | Repository Name & URL | Maintainer / Org | Classification | License (Status) | Priority | Evidence | Discovery Decision & UIForge Role |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| `OS-A11Y-01` | [dequelabs/axe-core](https://github.com/dequelabs/axe-core) | Deque Systems | `[DEP]` | MPL-2.0 (`VERIFIED`) | **P0** | `[PRODUCT-TESTED]` | Foundational programmatic accessibility engine. Evaluates 90+ deterministic WCAG rules. |
| `OS-A11Y-02` | [axe-core/playwright](https://github.com/dequelabs/axe-core-npm) | Deque Systems | `[DEP]` | MPL-2.0 (`VERIFIED`) | **P0** | `[PRODUCT-TESTED]` | Playwright integration for running axe-core in headless Chromium during browser evaluation. |
| `OS-A11Y-03` | [jsx-eslint/eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) | JSX ESlint | `[DEP]` | MIT (`VERIFIED`) | **P0** | `[PRODUCT-TESTED]` | Static AST linting for JSX accessibility defects (missing `alt`, invalid ARIA roles, click handlers). |
| `OS-A11Y-04` | [nickcolley/jest-axe](https://github.com/nickcolley/jest-axe) | Nick Colley | `[DEP]` | MIT (`VERIFIED`) | **P1** | `[DOC-VERIFIED]` | Jest/Vitest matcher for asserting accessibility in unit tests during local CI. |
| `OS-A11Y-05` | [pa11y/pa11y](https://github.com/pa11y/pa11y) | Pa11y Team | `[INF]` | LGPL-3.0 (`REVIEW_REQ`) | **P2** | `[DOC-VERIFIED]` | Automated accessibility testing CLI. Flagged for licensing review due to LGPL-3.0 copyleft. |
| `OS-A11Y-06` | [GoogleChrome/lighthouse](https://github.com/GoogleChrome/lighthouse) | Google | `[INF]` / `[REF]` | Apache-2.0 (`VERIFIED`) | **P1** | `[PRODUCT-TESTED]` | Automated audit tool evaluating Accessibility, Performance, SEO, and Best Practices. |
| `OS-A11Y-07` | [microsoft/accessibility-insights-web](https://github.com/microsoft/accessibility-insights-web) | Microsoft | `[REF]` | MIT (`VERIFIED`) | **P1** | `[DOC-VERIFIED]` | Guided manual testing checklists and visual tab-stop mapping algorithms. |
| `OS-A11Y-08` | [w3c/aria-practices](https://github.com/w3c/aria-practices) | W3C ARIA APG | `[REF]` | W3C Doc (`VERIFIED`) | **P0** | `[DOC-VERIFIED]` | The definitive normative reference for keyboard navigation, focus management, and ARIA roles. |
| `OS-A11Y-09` | [storybookjs/addon-a11y](https://github.com/storybookjs/storybook) | Storybook | `[REF]` | MIT (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Component-level accessibility checking panel in Storybook using axe-core under the hood. |
| `OS-A11Y-10` | [accesslint/accesslint](https://github.com/accesslint/accesslint) | AccessLint | `[REF]` | MIT (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | GitHub PR review bot auditing accessibility violations. Reference for PR bot integrations. |

---

## 12. Category 11 — Design-to-Code & Design Intelligence (8 Candidates)

| Candidate ID | Repository Name & URL | Maintainer / Org | Classification | License (Status) | Priority | Evidence | Discovery Decision & UIForge Role |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| `OS-D2C-01` | [BuilderIO/mitosis](https://github.com/BuilderIO/mitosis) | Builder.io | `[REF]` / `[DEP]` | MIT (`VERIFIED`) | **P1** | `[PRODUCT-TESTED]` | Write components once, compile to React, Vue, Svelte, Qwik via AST. Cross-framework reference. |
| `OS-D2C-02` | [figma/code-connect](https://github.com/figma/code-connect) | Figma | `[INT]` | MIT (`VERIFIED`) | **P1** | `[DOC-VERIFIED]` | Maps production code components directly to Figma design components. Integration candidate. |
| `OS-D2C-03` | [abi/screenshot-to-code](https://github.com/abi/screenshot-to-code) | Abi Aryan | `[RES]` / `[REF]` | MIT (`VERIFIED`) | **P1** | `[PRODUCT-TESTED]` | Multimodal screenshot-to-code conversion using vision LLMs. Reference for reverse-engineering. |
| `OS-D2C-04` | [figma/plugin-samples](https://github.com/figma/plugin-samples) | Figma | `[REF]` | MIT (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Official samples for reading Figma node hierarchies, styles, and vector paths. |
| `OS-D2C-05` | [WICG/open-ui](https://github.com/WICG/open-ui) | W3C / WICG | `[REF]` | W3C Software/Doc (`VERIFIED`) | **P1** | `[DOC-VERIFIED]` | Open UI research documenting component state matrices, anatomy, and standard behaviors. |
| `OS-D2C-06` | [ast-grep/ast-grep](https://github.com/ast-grep/ast-grep) | Herrington Darkholme | `[DEP]` / `[INF]` | MIT (`VERIFIED`) | **P0** | `[PRODUCT-TESTED]` | High-performance AST code structural search and rewrite tool. Crucial for fast component scans. |
| `OS-D2C-07` | [babel/babel](https://github.com/babel/babel) | Babel Team | `[DEP]` | MIT (`VERIFIED`) | **P0** | `[PRODUCT-TESTED]` | Static AST parser (`@babel/parser`, `@babel/traverse`) for read-only React/TSX inspection. |
| `OS-D2C-08` | [locofy/locofy](https://www.locofy.ai) | Locofy | `[REJ]` | Commercial (`RESTRICTIVE`) | **REJ** | `[DOC-VERIFIED]` | **REJECTED**. Proprietary closed-source SaaS design-to-code converter. |

---

## 13. Category 12 — AI Agent Skills, MCP & Developer Ecosystem (12 Candidates)

| Candidate ID | Repository Name & URL | Maintainer / Org | Classification | License (Status) | Priority | Evidence | Discovery Decision & UIForge Role |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| `OS-AGNT-01` | [modelcontextprotocol/typescript-sdk](https://github.com/modelcontextprotocol/typescript-sdk) | Model Context Protocol | `[DEP]` | MIT (`VERIFIED`) | **P0** | `[PRODUCT-TESTED]` | Core foundation for `@uiforge/mcp-server`. Exposes tools, resources, and prompts over stdio/SSE. |
| `OS-AGNT-02` | [anomalyco/opencode](https://github.com/anomalyco/opencode) | Anomaly / SST | `[INT]` | MIT (`VERIFIED`) | **P0** | `[PRODUCT-TESTED]` | Leading open-source terminal coding agent (Plan/Build dual modes). Primary CLI integration target. |
| `OS-AGNT-03` | [anthropics/claude-code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code) | Anthropic | `[INT]` | Proprietary CLI / Open MCP (`VERIFIED`) | **P0** | `[PRODUCT-TESTED]` | Anthropic's local terminal agent. Primary target for UIForge MCP server and Agent Skills. |
| `OS-AGNT-04` | [anysphere/cursor](https://cursor.com) | Anysphere | `[INT]` | Proprietary IDE / Open MCP (`VERIFIED`) | **P0** | `[PRODUCT-TESTED]` | Host AI-native IDE environment. Connects to UIForge via MCP server and `.cursorrules`. |
| `OS-AGNT-05` | [codeium/windsurf](https://codeium.com/windsurf) | Codeium | `[INT]` | Proprietary IDE / Open MCP (`VERIFIED`) | **P1** | `[PRODUCT-TESTED]` | AI-native IDE with Cascade flow. Supported host environment via MCP server. |
| `OS-AGNT-06` | [continuedev/continue](https://github.com/continuedev/continue) | Continue / Cursor | `[REF]` | Apache-2.0 (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Former open-source IDE agent (acquired by Cursor, archived). Architectural reference for IDE MCP. |
| `OS-AGNT-07` | [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) | CopilotKit | `[REF]` / `[REG]` | MIT (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | In-app AI copilots and generative UI components for React applications. |
| `OS-AGNT-08` | [vercel/ai](https://github.com/vercel/ai) | Vercel | `[DEP]` / `[REF]` | Apache-2.0 (`VERIFIED`) | **P1** | `[PRODUCT-TESTED]` | TypeScript SDK for structured output, streaming UI, and generative frontend components. |
| `OS-AGNT-09` | [langchain-ai/langgraphjs](https://github.com/langchain-ai/langgraphjs) | LangChain | `[REF]` | MIT (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Cyclic multi-agent orchestration framework. Reference for stateful multi-turn evaluation loops. |
| `OS-AGNT-10` | [run-llama/LlamaIndexTS](https://github.com/run-llama/LlamaIndexTS) | LlamaIndex | `[REF]` | MIT (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Data framework for indexing and retrieving codebase context. Reference for repository RAG. |
| `OS-AGNT-11` | [cline/cline](https://github.com/cline/cline) | Cline Community | `[INT]` | Apache-2.0 (`VERIFIED`) | **P1** | `[DOC-VERIFIED]` | Open-source autonomous coding agent for VS Code. Supported MCP client. |
| `OS-AGNT-12` | [rooveterinaryinc/roo-cline](https://github.com/RooVetGit/Roo-Code) | Roo Code Team | `[INT]` | Apache-2.0 (`VERIFIED`) | **P1** | `[DOC-VERIFIED]` | Popular community fork of Cline with custom modes and MCP integration. Supported MCP client. |

---

## 14. Category 13 — Browser Testing & Execution Infrastructure (8 Candidates)

| Candidate ID | Repository Name & URL | Maintainer / Org | Classification | License (Status) | Priority | Evidence | Discovery Decision & UIForge Role |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| `OS-BROW-01` | [microsoft/playwright](https://github.com/microsoft/playwright) | Microsoft | `[DEP]` / `[INF]` | Apache-2.0 (`VERIFIED`) | **P0** | `[PRODUCT-TESTED]` | Foundational headless browser runtime. Multi-viewport rendering, DOM inspection, tracing. |
| `OS-BROW-02` | [puppeteer/puppeteer](https://github.com/puppeteer/puppeteer) | Google Chrome | `[INF]` / `[REF]` | Apache-2.0 (`VERIFIED`) | **P1** | `[PRODUCT-TESTED]` | Alternative Chrome DevTools protocol driver. Reference; Playwright preferred for multi-browser. |
| `OS-BROW-03` | [webdriverio/webdriverio](https://github.com/webdriverio/webdriverio) | OpenJS Foundation | `[INF]` / `[REF]` | MIT (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Next-gen browser automation framework based on WebDriver BiDi standard. |
| `OS-BROW-04` | [testcontainers/testcontainers-node](https://github.com/testcontainers/testcontainers-node) | AtomicJar / Docker | `[INF]` | MIT (`VERIFIED`) | **P1** | `[DOC-VERIFIED]` | Programmatic Docker container lifecycle manager for isolated browser evaluation sandboxes. |
| `OS-BROW-05` | [browserless/chrome](https://github.com/browserless/chrome) | Browserless | `[INF]` / `[REF]` | Apache-2.0 (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Containerized headless Chrome image optimized for remote execution and memory isolation. |
| `OS-BROW-06` | [browser-use/browser-use](https://github.com/browser-use/browser-use) | Browser-Use Org | `[RES]` / `[REF]` | MIT (`VERIFIED`) | **P2** | `[PRODUCT-TESTED]` | Autonomous AI agent web automation library. Reference for synthetic interaction scripts. |
| `OS-BROW-07` | [SeleniumHQ/selenium](https://github.com/SeleniumHQ/selenium) | Software Freedom Cons. | `[REF]` | Apache-2.0 (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Traditional browser automation standard. Legacy reference; deprioritized in favor of Playwright. |
| `OS-BROW-08` | [cypress-io/cypress](https://github.com/cypress-io/cypress) | Cypress.io | `[REF]` | MIT Core (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Desktop-based component and E2E test runner. Deprioritized for headless CLI evaluation. |

---

## 15. Category 14 — Visual Regression & Frontend Quality (8 Candidates)

| Candidate ID | Repository Name & URL | Maintainer / Org | Classification | License (Status) | Priority | Evidence | Discovery Decision & UIForge Role |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| `OS-VREG-01` | [mapbox/pixelmatch](https://github.com/mapbox/pixelmatch) | Mapbox | `[DEP]` | ISC (`VERIFIED`) | **P0** | `[PRODUCT-TESTED]` | Smallest, fastest pixel-level image comparison library in pure JavaScript. Core diff engine. |
| `OS-VREG-02` | [gemini-testing/looks-same](https://github.com/gemini-testing/looks-same) | Gemini Testing | `[DEP]` / `[REF]` | MIT (`VERIFIED`) | **P1** | `[PRODUCT-TESTED]` | Fast image comparison library with CIEDE2000 perceptual color difference calculation. |
| `OS-VREG-03` | [argos-ci/argos](https://github.com/argos-ci/argos) | Argos CI | `[INF]` / `[REF]` | MIT Core (`VERIFIED`) | **P1** | `[DOC-VERIFIED]` | Open-source visual testing runner with git-based baseline management and flakiness detection. |
| `OS-VREG-04` | [oblador/loki](https://github.com/oblador/loki) | Joel Arvidsson | `[REF]` | MIT (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Visual regression testing tool for Storybook using headless Chrome. |
| `OS-VREG-05` | [garris/BackstopJS](https://github.com/garris/BackstopJS) | Garris Shipon | `[REF]` | MIT (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Classic CLI-based visual regression testing harness testing responsive DOM screenshots. |
| `OS-VREG-06` | [lost-pixel/lost-pixel](https://github.com/lost-pixel/lost-pixel) | Lost Pixel | `[REF]` | MIT (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Open-source alternative to Percy and Chromatic for Storybook, Next.js, and Ladle. |
| `OS-VREG-07` | [rsmbl/Resemble.js](https://github.com/rsmbl/Resemble.js) | James Cryer | `[REF]` | MIT (`VERIFIED`) | **P2** | `[DOC-VERIFIED]` | Image analysis and comparison tool for Node.js and the browser. Legacy reference. |
| `OS-VREG-08` | [storybookjs/test-runner](https://github.com/storybookjs/test-runner) | Storybook | `[INF]` | MIT (`VERIFIED`) | **P1** | `[DOC-VERIFIED]` | Playwright-powered test runner executing component interaction, a11y, and snapshot tests. |
