# UIForge Phase 02.5: Canonical Selection Universe

**Document ID:** `UIF-PH02.5-CANONICAL-SELECTION-UNIVERSE`  
**Classification:** Comprehensive Candidate Selection Census  
**Status:** Certified / Complete  
**Date:** November 2026  

---

## 1. Candidate Universe Overview

The canonical selection universe consists of exactly **125 candidates** originating from Phase 02.1 discovery, audited in Phase 02.2 and Phase 02.3, and normalized into the Phase 02.4 Internal Source Registry.

### Summary Distribution by Adoption Tier

| Adoption Tier | Count | Percentage | Primary Recommendation | Description |
| :--- | :---: | :---: | :--- | :--- |
| **TIER 0 (Core Foundation)** | 24 | 19.2% | `ADOPT` / `CONDITIONALLY ADOPT` | Essential architectural pillars forming core UIForge platform |
| **TIER 1 (Recommended Core-Adjacent)** | 34 | 27.2% | `ADOPT` | Curated registries, component blocks, and standard extensions |
| **TIER 2 (Optional Integrations)** | 40 | 32.0% | `OPTIONAL` | Modular plugins, secondary adapters, and optional integrations |
| **TIER 3 (Reference & Research)** | 16 | 12.8% | `REFERENCE` | Architectural patterns, layout concepts, and monolithic frameworks |
| **TIER 4 (Deferred)** | 4 | 3.2% | `DEFER` | Candidates requiring legal review or post-React framework gates |
| **TIER 5 (Rejected / Excluded)** | 7 | 5.6% | `REJECT` | Incompatible licenses, proprietary terms, or redundant tools |
| **TOTAL** | **125** | **100.0%** | — | **100% Canonical Candidates Accounted For** |

---

## 2. Canonical Identity & Supersession Reconciliation (C11)

### Canonical Identity & Supersession Table (Finding C11 Reconciliation)

To ensure tamper-evident traceability and prevent alias confusion, the following table formally maps every scrutinized candidate to its immutable identifier in the Phase 02.4 Canonical Source Registry (`sources.json`), superseding all erroneous identifiers from earlier working drafts:

| Canonical Candidate ID | Canonical Source ID | Formal Name | Primary Category | Erroneous Prior Draft ID | Root Cause & Supersession Rationale |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`OS-ANIM-08`** | `SRC-OS-ANIM-08` | `remotion-dev/remotion` | Category 07 (Motion) | `OS-ANIM-05` | `OS-ANIM-05` is canonical `airbnb/lottie-web`. Remotion is canonical `OS-ANIM-08` (REJ priority; Tier 5 Excluded due to G5 mission misfit). |
| **`OS-D2C-08`** | `SRC-OS-D2C-08` | `locofy/locofy` | Category 02 (Design-to-Code) | `OS-D2C-05` | `OS-D2C-05` is canonical `WICG/open-ui`. Locofy is canonical `OS-D2C-08` (REJ priority; Tier 5 Excluded due to closed proprietary SaaS). |
| **`OS-LAYT-08`** | `SRC-OS-LAYT-08` | `Every-Layout` | Category 09 (Layout) | `OS-LAYT-06` | `OS-LAYT-06` is canonical `kristoferbaxter/flexboxgrid`. Every Layout is canonical `OS-LAYT-08` (P1 priority; Tier 3 Reference under clean-room boundary). |
| **`OS-VREG-04`** | `SRC-OS-VREG-04` | `oblador/loki` | Category 06 (Visual Regr.) | `OS-VREG-03` | `OS-VREG-03` is canonical `argos-ci/argos`. Loki is canonical `OS-VREG-04` (P2 priority; Tier 5 Excluded due to Playwright redundancy). |
| **`OS-VREG-05`** | `SRC-OS-VREG-05` | `garris/BackstopJS` | Category 06 (Visual Regr.) | `OS-VREG-04` | `OS-VREG-04` is canonical `oblador/loki`. BackstopJS is canonical `OS-VREG-05` (P2 priority; Tier 5 Excluded due to Playwright redundancy). |
| **`OS-DASH-05`** | `SRC-OS-DASH-05` | `react-grid-layout/react-grid-layout` | Category 08 (Dashboard) | `OS-LAYT-03` | `OS-LAYT-03` is canonical Radix UI Aspect Ratio primitive. React-Grid-Layout is canonical `OS-DASH-05` (P2 priority; Tier 2 Optional adapter). |
| **`OS-LAYT-03`** | `SRC-OS-LAYT-03` | `radix-ui/primitives (Aspect Ratio)` | Category 09 (Layout) | None | Immutable Radix Aspect Ratio primitive (P1 priority; Tier 1 Core-Adjacent), strictly distinct from `OS-DASH-05`. |


---

## 3. Complete Candidate Master Census (125 Sources)

| Candidate ID | Source ID | Name | Category | Priority | Tier | Gate Result | Final Score | Mode | Adoption Tier | Recommendation |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :---: | :--- | :--- | :--- |
| OS-COMP-01 | SRC-OS-COMP-01 | shadcn-ui/ui | CAT_C | P1 | TIER_B | PASS | 95 | SOURCE_COPY | **TIER 0** | `ADOPT` |
| OS-TOKN-01 | SRC-OS-TOKN-01 | design-tokens/community-group | CAT_E | P0 | TIER_A | PASS | 95 | REFERENCE_ONLY | **TIER 0** | `ADOPT` |
| OS-ANIM-01 | SRC-OS-ANIM-01 | motiondivision/motion | CAT_H | P0 | TIER_A | PASS | 95 | DEPENDENCY | **TIER 0** | `ADOPT` |
| OS-ICON-01 | SRC-OS-ICON-01 | lucide-icons/lucide | CAT_H | P0 | TIER_A | PASS | 95 | DEPENDENCY | **TIER 0** | `ADOPT` |
| OS-CHRT-01 | SRC-OS-CHRT-01 | recharts/recharts | CAT_H | P0 | TIER_A | PASS | 95 | DEPENDENCY | **TIER 0** | `ADOPT` |
| OS-TYPO-05 | SRC-OS-TYPO-05 | vercel/geist-font | CAT_H | P1 | TIER_B | PASS_WITH_RESTRICTIONS | 95 | ASSET_REDISTRIBUTION | **TIER 0** | `ADOPT` |
| OS-LAYT-01 | SRC-OS-LAYT-01 | bvaughn/react-resizable-panels | CAT_H | P0 | TIER_A | PASS | 95 | DEPENDENCY | **TIER 0** | `ADOPT` |
| OS-A11Y-01 | SRC-OS-A11Y-01 | dequelabs/axe-core | CAT_F | P0 | TIER_A | PASS_WITH_RESTRICTIONS | 95 | EXTERNAL_TOOL | **TIER 0** | `CONDITIONALLY ADOPT — RELEASE BLOCKED PENDING COUNSEL CLEARANCE` |
| OS-AGNT-01 | SRC-OS-AGNT-01 | modelcontextprotocol/typescript-sdk | CAT_G | P0 | TIER_A | PASS | 95 | DEPENDENCY | **TIER 0** | `ADOPT` |
| OS-BROW-01 | SRC-OS-BROW-01 | microsoft/playwright | CAT_F | P0 | TIER_A | PASS | 95 | DEPENDENCY | **TIER 0** | `ADOPT` |
| OS-VREG-01 | SRC-OS-VREG-01 | mapbox/pixelmatch | CAT_F | P0 | TIER_A | PASS | 95 | DEPENDENCY | **TIER 0** | `ADOPT` |
| OS-D2C-06 | SRC-OS-D2C-06 | ast-grep/ast-grep | CAT_A | P0 | TIER_A | PASS | 94.7 | EXTERNAL_TOOL | **TIER 0** | `ADOPT` |
| OS-TOKN-04 | SRC-OS-TOKN-04 | tailwindlabs/tailwindcss | CAT_E | P0 | TIER_A | PASS | 94.2 | DEPENDENCY | **TIER 0** | `ADOPT` |
| OS-TYPO-04 | SRC-OS-TYPO-04 | rsms/inter | CAT_H | P0 | TIER_A | PASS_WITH_RESTRICTIONS | 94.2 | ASSET_REDISTRIBUTION | **TIER 0** | `ADOPT` |
| OS-COMP-03 | SRC-OS-COMP-03 | adobe/react-spectrum | CAT_B | P0 | TIER_A | PASS | 93.4 | DEPENDENCY | **TIER 0** | `ADOPT` |
| OS-DASH-03 | SRC-OS-DASH-03 | TanStack/table | CAT_H | P0 | TIER_A | PASS | 93.4 | DEPENDENCY | **TIER 0** | `ADOPT` |
| OS-A11Y-03 | SRC-OS-A11Y-03 | jsx-eslint/eslint-plugin-jsx-a11y | CAT_A | P0 | TIER_A | PASS | 93.4 | DEPENDENCY | **TIER 0** | `ADOPT` |
| OS-A11Y-08 | SRC-OS-A11Y-08 | w3c/aria-practices | CAT_F | P0 | TIER_A | PASS | 93.2 | REFERENCE_ONLY | **TIER 0** | `ADOPT` |
| OS-COMP-02 | SRC-OS-COMP-02 | radix-ui/primitives | CAT_B | P0 | TIER_A | PASS | 92.4 | DEPENDENCY | **TIER 0** | `ADOPT` |
| OS-TOKN-02 | SRC-OS-TOKN-02 | style-dictionary/style-dictionary | CAT_E | P1 | TIER_B | PASS | 92.4 | DEPENDENCY | **TIER 0** | `ADOPT` |
| OS-LAYT-02 | SRC-OS-LAYT-02 | tailwindlabs/tailwindcss-container-queries | CAT_E | P0 | TIER_A | PASS | 92.4 | DEPENDENCY | **TIER 0** | `ADOPT` |
| OS-A11Y-02 | SRC-OS-A11Y-02 | axe-core/playwright | CAT_F | P0 | TIER_A | PASS | 92.4 | DEPENDENCY | **TIER 0** | `ADOPT` |
| OS-AGNT-02 | SRC-OS-AGNT-02 | anomalyco/opencode | CAT_G | P0 | TIER_A | PASS | 92.4 | REFERENCE_ONLY | **TIER 0** | `ADOPT` |
| OS-D2C-07 | SRC-OS-D2C-07 | babel/babel | CAT_A | P0 | TIER_A | PASS | 92.3 | DEPENDENCY | **TIER 0** | `ADOPT` |
| OS-TOKN-05 | SRC-OS-TOKN-05 | radix-ui/colors | CAT_E | P1 | TIER_B | PASS | 84.8 | DEPENDENCY | **TIER 1** | `ADOPT` |
| OS-D2C-05 | SRC-OS-D2C-05 | WICG/open-ui | CAT_B | P1 | TIER_B | PASS | 84.8 | REFERENCE_ONLY | **TIER 1** | `ADOPT` |
| OS-COMP-04 | SRC-OS-COMP-04 | tailwindlabs/headlessui | CAT_B | P1 | TIER_B | PASS | 84.2 | DEPENDENCY | **TIER 1** | `ADOPT` |
| OS-MKT-04 | SRC-OS-MKT-04 | cosscom/originui | CAT_C | P1 | TIER_B | PASS | 84.2 | SOURCE_COPY | **TIER 1** | `ADOPT` |
| OS-DASH-04 | SRC-OS-DASH-04 | TanStack/virtual | CAT_H | P1 | TIER_B | PASS | 84.2 | DEPENDENCY | **TIER 1** | `ADOPT` |
| OS-ICON-04 | SRC-OS-ICON-04 | phosphor-icons/core | CAT_H | P1 | TIER_B | PASS | 84.2 | DEPENDENCY | **TIER 1** | `ADOPT` |
| OS-CHRT-04 | SRC-OS-CHRT-04 | airbnb/visx | CAT_H | P1 | TIER_B | PASS | 84.2 | DEPENDENCY | **TIER 1** | `ADOPT` |
| OS-BROW-04 | SRC-OS-BROW-04 | testcontainers/testcontainers-node | CAT_F | P1 | TIER_B | PASS | 84.2 | DEPENDENCY | **TIER 1** | `ADOPT` |
| OS-COMP-13 | SRC-OS-COMP-13 | ariakit/ariakit | CAT_B | P1 | TIER_B | PASS | 84 | DEPENDENCY | **TIER 1** | `ADOPT` |
| OS-TOKN-03 | SRC-OS-TOKN-03 | argyleink/open-props | CAT_E | P1 | TIER_B | PASS | 83.6 | DEPENDENCY | **TIER 1** | `ADOPT` |
| OS-ICON-03 | SRC-OS-ICON-03 | tabler/tabler-icons | CAT_H | P1 | TIER_B | PASS | 83.6 | DEPENDENCY | **TIER 1** | `ADOPT` |
| OS-CHRT-03 | SRC-OS-CHRT-03 | plouc/nivo | CAT_H | P1 | TIER_B | PASS | 83.6 | DEPENDENCY | **TIER 1** | `ADOPT` |
| OS-TYPO-03 | SRC-OS-TYPO-03 | fontsource/fontsource | CAT_H | P1 | TIER_B | PASS | 83.6 | DEPENDENCY | **TIER 1** | `ADOPT` |
| OS-LAYT-03 | SRC-OS-LAYT-03 | radix-ui/primitives (Aspect Ratio) | CAT_H | P1 | TIER_B | PASS | 83.6 | DEPENDENCY | **TIER 1** | `ADOPT` |
| OS-VREG-03 | SRC-OS-VREG-03 | argos-ci/argos | CAT_F | P1 | TIER_B | PASS | 83.6 | EXTERNAL_TOOL | **TIER 1** | `ADOPT` |
| OS-AGNT-12 | SRC-OS-AGNT-12 | rooveterinaryinc/roo-cline | CAT_G | P1 | TIER_B | PASS | 82.8 | REFERENCE_ONLY | **TIER 1** | `ADOPT` |
| OS-DASH-02 | SRC-OS-DASH-02 | tremorlabs/tremor-raw | CAT_C | P1 | TIER_B | PASS | 82.4 | SOURCE_COPY | **TIER 1** | `ADOPT` |
| OS-ICON-02 | SRC-OS-ICON-02 | tailwindlabs/heroicons | CAT_H | P1 | TIER_B | PASS | 82.4 | DEPENDENCY | **TIER 1** | `ADOPT` |
| OS-ICON-08 | SRC-OS-ICON-08 | simple-icons/simple-icons | CAT_H | P1 | TIER_B | PASS | 82.4 | DEPENDENCY | **TIER 1** | `ADOPT` |
| OS-TYPO-02 | SRC-OS-TYPO-02 | seek-oss/capsize | CAT_H | P1 | TIER_B | PASS | 82.4 | DEPENDENCY | **TIER 1** | `ADOPT` |
| OS-AGNT-08 | SRC-OS-AGNT-08 | vercel/ai | CAT_G | P1 | TIER_B | PASS | 82.4 | DEPENDENCY | **TIER 1** | `ADOPT` |
| OS-BROW-02 | SRC-OS-BROW-02 | puppeteer/puppeteer | CAT_F | P1 | TIER_B | PASS | 82.4 | DEPENDENCY | **TIER 1** | `ADOPT` |
| OS-VREG-02 | SRC-OS-VREG-02 | gemini-testing/looks-same | CAT_F | P1 | TIER_B | PASS | 82.4 | DEPENDENCY | **TIER 1** | `ADOPT` |
| OS-VREG-08 | SRC-OS-VREG-08 | storybookjs/test-runner | CAT_F | P1 | TIER_B | PASS | 82.4 | EXTERNAL_TOOL | **TIER 1** | `ADOPT` |
| OS-COMP-11 | SRC-OS-COMP-11 | mui/base-ui | CAT_B | P1 | TIER_B | PASS | 82.2 | DEPENDENCY | **TIER 1** | `ADOPT` |
| OS-AGNT-11 | SRC-OS-AGNT-11 | cline/cline | CAT_G | P1 | TIER_B | PASS | 82.2 | REFERENCE_ONLY | **TIER 1** | `ADOPT` |
| OS-MKT-01 | SRC-OS-MKT-01 | magicuidesign/magicui | CAT_C | P1 | TIER_B | PASS | 81.8 | SOURCE_COPY | **TIER 1** | `ADOPT` |
| OS-ICON-07 | SRC-OS-ICON-07 | gregberge/svgr | CAT_H | P1 | TIER_B | PASS | 81.8 | DEPENDENCY | **TIER 1** | `ADOPT` |
| OS-CHRT-07 | SRC-OS-CHRT-07 | d3/d3 | CAT_H | P1 | TIER_B | PASS | 81.8 | DEPENDENCY | **TIER 1** | `ADOPT` |
| OS-LAYT-07 | SRC-OS-LAYT-07 | yannickcr/eslint-plugin-react | CAT_A | P1 | TIER_B | PASS | 81.8 | DEPENDENCY | **TIER 1** | `ADOPT` |
| OS-A11Y-07 | SRC-OS-A11Y-07 | microsoft/accessibility-insights-web | CAT_F | P1 | TIER_B | PASS | 81.8 | EXTERNAL_TOOL | **TIER 1** | `ADOPT` |
| OS-COMP-10 | SRC-OS-COMP-10 | chakra-ui/ark | CAT_B | P1 | TIER_B | PASS | 81.6 | DEPENDENCY | **TIER 1** | `ADOPT` |
| OS-TOKN-06 | SRC-OS-TOKN-06 | tokens-studio/sd-transforms | CAT_E | P1 | TIER_B | PASS | 81.2 | DEPENDENCY | **TIER 1** | `ADOPT` |
| OS-A11Y-06 | SRC-OS-A11Y-06 | GoogleChrome/lighthouse | CAT_F | P1 | TIER_B | PASS | 81.2 | EXTERNAL_TOOL | **TIER 1** | `ADOPT` |
| OS-COMP-05 | SRC-OS-COMP-05 | mantinedev/mantine | CAT_D | P2 | TIER_C | PASS | 79.2 | REFERENCE_ONLY | **TIER 3** | `REFERENCE` |
| OS-AGNT-05 | SRC-OS-AGNT-05 | codeium/windsurf | CAT_G | P1 | TIER_B | PASS | 79.2 | REFERENCE_ONLY | **TIER 3** | `REFERENCE` |
| OS-COMP-14 | SRC-OS-COMP-14 | palantir/blueprint | CAT_D | P2 | TIER_C | PASS | 79 | REFERENCE_ONLY | **TIER 3** | `REFERENCE` |
| OS-D2C-04 | SRC-OS-D2C-04 | figma/plugin-samples | CAT_H | P2 | TIER_C | PASS | 78.6 | REFERENCE_ONLY | **TIER 3** | `REFERENCE` |
| OS-AGNT-04 | SRC-OS-AGNT-04 | anysphere/cursor | CAT_G | P0 | TIER_A | PASS | 78.6 | REFERENCE_ONLY | **TIER 3** | `REFERENCE` |
| OS-COMP-09 | SRC-OS-COMP-09 | nextui-org/nextui | CAT_D | P2 | TIER_C | PASS | 78 | REFERENCE_ONLY | **TIER 3** | `REFERENCE` |
| OS-TOKN-09 | SRC-OS-TOKN-09 | material-components/material-web | CAT_E | P2 | TIER_C | PASS | 78 | REFERENCE_ONLY | **TIER 3** | `REFERENCE` |
| OS-D2C-03 | SRC-OS-D2C-03 | abi/screenshot-to-code | CAT_H | P1 | TIER_B | PASS | 78 | REFERENCE_ONLY | **TIER 3** | `REFERENCE` |
| OS-AGNT-03 | SRC-OS-AGNT-03 | anthropics/claude-code | CAT_G | P0 | TIER_A | PASS | 78 | REFERENCE_ONLY | **TIER 3** | `REFERENCE` |
| OS-COMP-08 | SRC-OS-COMP-08 | ant-design/ant-design | CAT_D | P2 | TIER_C | PASS | 77.4 | REFERENCE_ONLY | **TIER 3** | `REFERENCE` |
| OS-TOKN-08 | SRC-OS-TOKN-08 | carbon-design-system/carbon | CAT_E | P2 | TIER_C | PASS | 77.4 | REFERENCE_ONLY | **TIER 3** | `REFERENCE` |
| OS-LAYT-08 | SRC-OS-LAYT-08 | Every-Layout/every-layout | CAT_E | P1 | TIER_B | PASS_WITH_RESTRICTIONS | 77.4 | REFERENCE_ONLY | **TIER 3** | `REFERENCE` |
| OS-MKT-05 | SRC-OS-MKT-05 | htmlstreamofficial/preline | CAT_C | P2 | TIER_C | PASS | 77.1 | SOURCE_COPY | **TIER 2** | `OPTIONAL` |
| OS-ANIM-05 | SRC-OS-ANIM-05 | airbnb/lottie-web | CAT_H | P2 | TIER_C | PASS | 77.1 | DEPENDENCY | **TIER 2** | `OPTIONAL` |
| OS-ICON-05 | SRC-OS-ICON-05 | iconify/iconify | CAT_H | P1 | TIER_B | PASS | 77.1 | DEPENDENCY | **TIER 2** | `OPTIONAL` |
| OS-CHRT-05 | SRC-OS-CHRT-05 | chartjs/Chart.js | CAT_H | P2 | TIER_C | PASS | 77.1 | DEPENDENCY | **TIER 2** | `OPTIONAL` |
| OS-LAYT-05 | SRC-OS-LAYT-05 | desandro/masonry | CAT_H | P2 | TIER_C | PASS | 77.1 | DEPENDENCY | **TIER 2** | `OPTIONAL` |
| OS-BROW-05 | SRC-OS-BROW-05 | browserless/chrome | CAT_F | P2 | TIER_C | PASS | 77.1 | EXTERNAL_TOOL | **TIER 2** | `OPTIONAL` |
| OS-COMP-07 | SRC-OS-COMP-07 | mui/material-ui | CAT_D | P2 | TIER_C | PASS | 76.8 | REFERENCE_ONLY | **TIER 3** | `REFERENCE` |
| OS-TOKN-07 | SRC-OS-TOKN-07 | primer/primitives | CAT_E | P2 | TIER_C | PASS | 76.8 | REFERENCE_ONLY | **TIER 3** | `REFERENCE` |
| OS-TOKN-10 | SRC-OS-TOKN-10 | adobe/spectrum-tokens | CAT_E | P2 | TIER_C | PASS | 76.6 | REFERENCE_ONLY | **TIER 3** | `REFERENCE` |
| OS-ANIM-04 | SRC-OS-ANIM-04 | greensock/gsap | CAT_H | REJ | TIER_D | PASS_WITH_RESTRICTIONS | 76.5 | DEPENDENCY | **TIER 2** | `OPTIONAL` |
| OS-LAYT-04 | SRC-OS-LAYT-04 | drcmda/react-spring (Parallax) | CAT_H | P2 | TIER_C | PASS | 76.5 | DEPENDENCY | **TIER 2** | `OPTIONAL` |
| OS-A11Y-04 | SRC-OS-A11Y-04 | nickcolley/jest-axe | CAT_F | P1 | TIER_B | PASS | 76.5 | DEPENDENCY | **TIER 2** | `OPTIONAL` |
| OS-COMP-06 | SRC-OS-COMP-06 | chakra-ui/chakra-ui | CAT_D | P2 | TIER_C | PASS | 76.2 | REFERENCE_ONLY | **TIER 3** | `REFERENCE` |
| OS-MKT-03 | SRC-OS-MKT-03 | DavidHDev/react-bits | CAT_C | P2 | TIER_C | PASS | 75.9 | SOURCE_COPY | **TIER 2** | `OPTIONAL` |
| OS-ANIM-03 | SRC-OS-ANIM-03 | pmndrs/react-spring | CAT_H | P2 | TIER_C | PASS | 75.9 | DEPENDENCY | **TIER 2** | `OPTIONAL` |
| OS-A11Y-09 | SRC-OS-A11Y-09 | storybookjs/addon-a11y | CAT_F | P2 | TIER_C | PASS | 75.9 | DEPENDENCY | **TIER 2** | `OPTIONAL` |
| OS-AGNT-09 | SRC-OS-AGNT-09 | langchain-ai/langgraphjs | CAT_G | P2 | TIER_C | PASS | 75.9 | DEPENDENCY | **TIER 2** | `OPTIONAL` |
| OS-BROW-03 | SRC-OS-BROW-03 | webdriverio/webdriverio | CAT_F | P2 | TIER_C | PASS | 75.9 | DEPENDENCY | **TIER 2** | `OPTIONAL` |
| OS-COMP-12 | SRC-OS-COMP-12 | chakra-ui/park-ui | CAT_C | P2 | TIER_C | PASS | 75.1 | SOURCE_COPY | **TIER 2** | `OPTIONAL` |
| OS-MKT-02 | SRC-OS-MKT-02 | nolly-studio/cult-ui | CAT_C | P2 | TIER_C | PASS | 74.7 | SOURCE_COPY | **TIER 2** | `OPTIONAL` |
| OS-DASH-05 | SRC-OS-DASH-05 | react-grid-layout/react-grid-layout | CAT_H | P2 | TIER_C | PASS_WITH_RESTRICTIONS | 74.7 | DEPENDENCY | **TIER 2** | `OPTIONAL` |
| OS-ANIM-02 | SRC-OS-ANIM-02 | formkit/auto-animate | CAT_H | P1 | TIER_B | PASS | 74.7 | DEPENDENCY | **TIER 2** | `OPTIONAL` |
| OS-CHRT-02 | SRC-OS-CHRT-02 | apache/echarts | CAT_H | P1 | TIER_B | PASS | 74.7 | DEPENDENCY | **TIER 2** | `OPTIONAL` |
| OS-CHRT-08 | SRC-OS-CHRT-08 | FormidableLabs/victory | CAT_H | P2 | TIER_C | PASS | 74.7 | DEPENDENCY | **TIER 2** | `OPTIONAL` |
| OS-BROW-08 | SRC-OS-BROW-08 | cypress-io/cypress | CAT_F | P2 | TIER_C | PASS | 74.7 | DEPENDENCY | **TIER 2** | `OPTIONAL` |
| OS-MKT-07 | SRC-OS-MKT-07 | markmead/hyperui | CAT_C | P2 | TIER_C | PASS | 74.1 | SOURCE_COPY | **TIER 2** | `OPTIONAL` |
| OS-DASH-01 | SRC-OS-DASH-01 | tremorlabs/tremor | CAT_H | P1 | TIER_B | PASS | 74.1 | DEPENDENCY | **TIER 2** | `OPTIONAL` |
| OS-DASH-07 | SRC-OS-DASH-07 | marmelab/react-admin | CAT_H | P2 | TIER_C | PASS | 74.1 | DEPENDENCY | **TIER 2** | `OPTIONAL` |
| OS-ANIM-07 | SRC-OS-ANIM-07 | catdad/canvas-confetti | CAT_H | P2 | TIER_C | PASS | 74.1 | DEPENDENCY | **TIER 2** | `OPTIONAL` |
| OS-TYPO-01 | SRC-OS-TYPO-01 | tailwindlabs/tailwindcss-typography | CAT_H | P0 | TIER_A | PASS | 74.1 | DEPENDENCY | **TIER 2** | `OPTIONAL` |
| OS-AGNT-07 | SRC-OS-AGNT-07 | CopilotKit/CopilotKit | CAT_G | P2 | TIER_C | PASS | 74.1 | DEPENDENCY | **TIER 2** | `OPTIONAL` |
| OS-BROW-07 | SRC-OS-BROW-07 | SeleniumHQ/selenium | CAT_F | P2 | TIER_C | PASS | 74.1 | DEPENDENCY | **TIER 2** | `OPTIONAL` |
| OS-VREG-07 | SRC-OS-VREG-07 | rsmbl/Resemble.js | CAT_F | P2 | TIER_C | PASS | 74.1 | DEPENDENCY | **TIER 2** | `OPTIONAL` |
| OS-A11Y-10 | SRC-OS-A11Y-10 | accesslint/accesslint | CAT_F | P2 | TIER_C | PASS | 73.9 | EXTERNAL_TOOL | **TIER 2** | `OPTIONAL` |
| OS-AGNT-10 | SRC-OS-AGNT-10 | run-llama/LlamaIndexTS | CAT_G | P2 | TIER_C | PASS | 73.9 | DEPENDENCY | **TIER 2** | `OPTIONAL` |
| OS-MKT-06 | SRC-OS-MKT-06 | themesberg/flowbite-react | CAT_C | P2 | TIER_C | PASS | 73.5 | DEPENDENCY | **TIER 2** | `OPTIONAL` |
| OS-DASH-06 | SRC-OS-DASH-06 | refinedev/refine | CAT_H | P2 | TIER_C | PASS | 73.5 | DEPENDENCY | **TIER 2** | `OPTIONAL` |
| OS-ANIM-06 | SRC-OS-ANIM-06 | animate-css/animate.css | CAT_H | P2 | TIER_C | PASS | 73.5 | DEPENDENCY | **TIER 2** | `OPTIONAL` |
| OS-ICON-06 | SRC-OS-ICON-06 | google/material-design-icons | CAT_H | P2 | TIER_C | PASS | 73.5 | DEPENDENCY | **TIER 2** | `OPTIONAL` |
| OS-CHRT-06 | SRC-OS-CHRT-06 | observablehq/plot | CAT_H | P2 | TIER_C | PASS | 73.5 | DEPENDENCY | **TIER 2** | `OPTIONAL` |
| OS-TYPO-06 | SRC-OS-TYPO-06 | opentypejs/opentype.js | CAT_H | P2 | TIER_C | PASS | 73.5 | DEPENDENCY | **TIER 2** | `OPTIONAL` |
| OS-LAYT-06 | SRC-OS-LAYT-06 | kristoferbaxter/flexboxgrid | CAT_H | P2 | TIER_C | PASS | 73.5 | DEPENDENCY | **TIER 2** | `OPTIONAL` |
| OS-AGNT-06 | SRC-OS-AGNT-06 | continuedev/continue | CAT_G | P2 | TIER_C | PASS | 73.5 | REFERENCE_ONLY | **TIER 2** | `OPTIONAL` |
| OS-VREG-06 | SRC-OS-VREG-06 | lost-pixel/lost-pixel | CAT_F | P2 | TIER_C | PASS | 73.5 | EXTERNAL_TOOL | **TIER 2** | `OPTIONAL` |
| OS-D2C-02 | SRC-OS-D2C-02 | figma/code-connect | CAT_H | P1 | TIER_B | PENDING | 68.8 | DEPENDENCY | **TIER 4** | `DEFER` |
| OS-BROW-06 | SRC-OS-BROW-06 | browser-use/browser-use | CAT_F | P2 | TIER_C | PENDING | 68.8 | EXTERNAL_TOOL | **TIER 4** | `DEFER` |
| OS-A11Y-05 | SRC-OS-A11Y-05 | pa11y/pa11y | CAT_F | P2 | TIER_C | PENDING | 68.2 | EXTERNAL_TOOL | **TIER 4** | `DEFER` |
| OS-D2C-01 | SRC-OS-D2C-01 | BuilderIO/mitosis | CAT_H | P1 | TIER_B | PENDING | 68.2 | DEPENDENCY | **TIER 4** | `DEFER` |
| OS-COMP-15 | SRC-OS-COMP-15 | saas-js/saas-ui | CAT_D | P2 | TIER_C | FAIL | 50.6 | DEPENDENCY | **TIER 5** | `REJECT` |
| OS-VREG-05 | SRC-OS-VREG-05 | garris/BackstopJS | CAT_F | P2 | TIER_C | PASS_WITH_RESTRICTIONS | 50.2 | DEPENDENCY | **TIER 5** | `REJECT` |
| OS-VREG-04 | SRC-OS-VREG-04 | oblador/loki | CAT_F | P2 | TIER_C | PASS_WITH_RESTRICTIONS | 49 | DEPENDENCY | **TIER 5** | `REJECT` |
| OS-MKT-08 | SRC-OS-MKT-08 | aceternity/ui | CAT_H | REJ | TIER_D | FAIL | 48.4 | SOURCE_COPY | **TIER 5** | `REJECT` |
| OS-DASH-08 | SRC-OS-DASH-08 | tabler/tabler-react | CAT_H | P2 | TIER_C | FAIL | 48.4 | DEPENDENCY | **TIER 5** | `REJECT` |
| OS-ANIM-08 | SRC-OS-ANIM-08 | remotion-dev/remotion | CAT_H | REJ | TIER_D | FAIL | 48.4 | DEPENDENCY | **TIER 5** | `REJECT` |
| OS-D2C-08 | SRC-OS-D2C-08 | locofy/locofy | CAT_H | REJ | TIER_D | FAIL | 48.4 | REFERENCE_ONLY | **TIER 5** | `REJECT` |

---

## 4. Census Reconciliation Proof

- Total Records: **125**
- Mathematical Tier Balance: **$24 + 34 + 40 + 16 + 4 + 7 = 125$**
- Original Discovery Priority Preservation: **P0: 24, P1: 47, P2: 50, REJ: 4**
- Registry Operational Tier Preservation: **TIER_A: 24, TIER_B: 47, TIER_C: 50, TIER_D: 4**
- 100% of candidates have hard-gate evaluations (G1–G6) and 7-dimension weighted technical scores.
