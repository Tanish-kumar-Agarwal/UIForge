# UIForge Phase 02.5: Optional Integration Shortlist (Tiers 1 & 2)

**Document ID:** `UIF-PH02.5-OPTIONAL-INTEGRATION-SHORTLIST`  
**Classification:** Modular Extensions, Registry Blocks & Adapters (74 Candidates)  
**Status:** Certified / Complete  
**Date:** November 2026  

---

## 1. Overview of Tiers 1 & 2

- **TIER 1 (Recommended Core-Adjacent - 34 Candidates):** High-value libraries, curated component blocks, and specialized testing utilities recommended as standard extensions.
- **TIER 2 (Optional Integrations - 40 Candidates):** Modular plugins, alternative charting libraries, secondary icon sets, and specialized UI snippets enabled on demand (including interactive dashboard grid layouts).

---

## 2. Tier 1 Recommended Core-Adjacent Candidates (34 Sources)

| Candidate ID | Name | Category | Hard Gate | Score | Proposed Mode | Role & Integration Rationale |
| :--- | :--- | :--- | :---: | :---: | :--- | :--- |
| **OS-TOKN-05** | `radix-ui/colors` | CAT_E | PASS | **84.8** | `DEPENDENCY` | Accessible color system with 12-step scales, dark mode, and alpha variants |
| **OS-D2C-05** | `WICG/open-ui` | CAT_B | PASS | **84.8** | `REFERENCE_ONLY` | W3C Open UI standard design specifications for browser-native controls |
| **OS-COMP-04** | `tailwindlabs/headlessui` | CAT_B | PASS | **84.2** | `DEPENDENCY` | Tailwind Labs headless components providing seamless utility-first accessible controls |
| **OS-MKT-04** | `cosscom/originui` | CAT_C | PASS | **84.2** | `SOURCE_COPY` | Modern Tailwind/React micro-components and application building blocks |
| **OS-DASH-04** | `TanStack/virtual` | CAT_H | PASS | **84.2** | `DEPENDENCY` | High-performance headless virtualization engine for infinite lists and massive tables |
| **OS-ICON-04** | `phosphor-icons/core` | CAT_H | PASS | **84.2** | `DEPENDENCY` | Flexible icon family with multiple weights (thin, light, regular, bold, fill) |
| **OS-CHRT-04** | `airbnb/visx` | CAT_H | PASS | **84.2** | `DEPENDENCY` | Low-level modular SVG visualization primitives (v4.0.0 with React 19 support) combining D3 math with React DOM management (~15-20 KB preliminary tree-shaken estimate subject to Phase 03 benchmark) |
| **OS-BROW-04** | `testcontainers/testcontainers-node` | CAT_F | PASS | **84.2** | `DEPENDENCY` | Isolated containerized browser environments for sandboxed execution of untrusted code |
| **OS-COMP-13** | `ariakit/ariakit` | CAT_B | PASS | **84** | `DEPENDENCY` | High-quality accessible unstyled dialog, composite, and menu primitives |
| **OS-TOKN-03** | `argyleink/open-props` | CAT_E | PASS | **83.6** | `DEPENDENCY` | Pre-configured modern CSS custom properties for color, animation, and fluid scaling |
| **OS-ICON-03** | `tabler/tabler-icons` | CAT_H | PASS | **83.6** | `DEPENDENCY` | Extensive, consistent secondary icon set covering 5,000+ domain symbols |
| **OS-CHRT-03** | `plouc/nivo` | CAT_H | PASS | **83.6** | `DEPENDENCY` | Specialized D3-based React components for heatmaps, sankey, and tree diagrams |
| **OS-TYPO-03** | `fontsource/fontsource` | CAT_H | PASS | **83.6** | `DEPENDENCY` | Self-hosted npm font package ecosystem enabling offline font bundling |
| **OS-LAYT-03** | `radix-ui/primitives (Aspect Ratio)` | CAT_H | PASS | **83.6** | `DEPENDENCY` | Zero-layout-shift aspect ratio primitive for responsive images and video containers |
| **OS-VREG-03** | `argos-ci/argos` | CAT_F | PASS | **83.6** | `EXTERNAL_TOOL` | Automated visual regression review platform adapter for CI/CD pipelines |
| **OS-AGNT-12** | `rooveterinaryinc/roo-cline` | CAT_G | PASS | **82.8** | `REFERENCE_ONLY` | Multi-mode autonomous developer agent execution patterns and MCP integration |
| **OS-DASH-02** | `tremorlabs/tremor-raw` | CAT_C | PASS | **82.4** | `SOURCE_COPY` | Tailwind-native raw dashboard components without mandatory runtime library coupling |
| **OS-ICON-02** | `tailwindlabs/heroicons` | CAT_H | PASS | **82.4** | `DEPENDENCY` | Tailwind-aligned clean icon set for standard interface navigation |
| **OS-ICON-08** | `simple-icons/simple-icons` | CAT_H | PASS | **82.4** | `DEPENDENCY` | Authoritative SVG icon set for popular developer brands and SaaS tools |
| **OS-TYPO-02** | `seek-oss/capsize` | CAT_H | PASS | **82.4** | `DEPENDENCY` | Mathematical font geometry tooling eliminating leading and ensuring baseline alignment |
| **OS-AGNT-08** | `vercel/ai` | CAT_G | PASS | **82.4** | `DEPENDENCY` | Vercel AI SDK streaming UI hooks and generative structured object primitives |
| **OS-BROW-02** | `puppeteer/puppeteer` | CAT_F | PASS | **82.4** | `DEPENDENCY` | Direct Chrome DevTools Protocol automation engine for lightweight browser probing |
| **OS-VREG-02** | `gemini-testing/looks-same` | CAT_F | PASS | **82.4** | `DEPENDENCY` | Specialized visual comparator with advanced antialiasing tolerance calibration |
| **OS-VREG-08** | `storybookjs/test-runner` | CAT_F | PASS | **82.4** | `EXTERNAL_TOOL` | Isolated component-level Playwright test runner executing against Storybook stories |
| **OS-COMP-11** | `mui/base-ui` | CAT_B | PASS | **82.2** | `DEPENDENCY` | MUI Base UI unstyled accessible components offering strong semantic ergonomics |
| **OS-AGNT-11** | `cline/cline` | CAT_G | PASS | **82.2** | `REFERENCE_ONLY` | Autonomous coding agent system architecture and tool-use loop reference |
| **OS-MKT-01** | `magicuidesign/magicui` | CAT_C | PASS | **81.8** | `SOURCE_COPY` | Curated marketing UI component registry with interactive animated sections |
| **OS-ICON-07** | `gregberge/svgr` | CAT_H | PASS | **81.8** | `DEPENDENCY` | Standard SVG to React component compiler for custom user asset pipelines |
| **OS-CHRT-07** | `d3/d3` | CAT_H | PASS | **81.8** | `DEPENDENCY` | Foundational data transformation, scaling, and mathematical visualization utilities |
| **OS-LAYT-07** | `yannickcr/eslint-plugin-react` | CAT_A | PASS | **81.8** | `DEPENDENCY` | React-specific ESLint rules verifying hook dependency hygiene and component lifecycle |
| **OS-A11Y-07** | `microsoft/accessibility-insights-web` | CAT_F | PASS | **81.8** | `EXTERNAL_TOOL` | Enterprise accessibility rule set and automated scanning extension framework |
| **OS-COMP-10** | `chakra-ui/ark` | CAT_B | PASS | **81.6** | `DEPENDENCY` | Zag.js-based state machine headless primitives supporting cross-framework adaptability |
| **OS-TOKN-06** | `tokens-studio/sd-transforms` | CAT_E | PASS | **81.2** | `DEPENDENCY` | Token Studio transforms plugin integrating complex design tokens into Style Dictionary |
| **OS-A11Y-06** | `GoogleChrome/lighthouse` | CAT_F | PASS | **81.2** | `EXTERNAL_TOOL` | Holistic audit runner evaluating accessibility, performance, and best practices |

---

## 3. Tier 2 Optional Integration Candidates (40 Sources)

| Candidate ID | Name | Category | Hard Gate | Score | Proposed Mode | Role & Integration Rationale |
| :--- | :--- | :--- | :---: | :---: | :--- | :--- |
| **OS-MKT-05** | `htmlstreamofficial/preline` | CAT_C | PASS | **77.1** | `SOURCE_COPY` | Preline UI HTML/Tailwind marketing sections and template components |
| **OS-ANIM-05** | `airbnb/lottie-web` | CAT_H | PASS | **77.1** | `DEPENDENCY` | Lottie vector animation player for complex After Effects illustration assets |
| **OS-ICON-05** | `iconify/iconify` | CAT_H | PASS | **77.1** | `DEPENDENCY` | Universal icon framework offering unified access across 150+ icon collections |
| **OS-CHRT-05** | `chartjs/Chart.js` | CAT_H | PASS | **77.1** | `DEPENDENCY` | Simple canvas charting library for lightweight dashboard implementations |
| **OS-LAYT-05** | `desandro/masonry` | CAT_H | PASS | **77.1** | `DEPENDENCY` | Masonry cascading grid layout library |
| **OS-BROW-05** | `browserless/chrome` | CAT_F | PASS | **77.1** | `EXTERNAL_TOOL` | Browserless cloud-hosted headless browser service adapter |
| **OS-ANIM-04** | `greensock/gsap` | CAT_H | PASS_WITH_RESTRICTIONS | **76.5** | `DEPENDENCY` | Optional secondary animation emission under Webflow April 2025 license; non-compete prohibits visual builders; programmatic React emission permitted |
| **OS-LAYT-04** | `drcmda/react-spring (Parallax)` | CAT_H | PASS | **76.5** | `DEPENDENCY` | React Spring Parallax scrolling effects for specialized marketing experiences |
| **OS-A11Y-04** | `nickcolley/jest-axe` | CAT_F | PASS | **76.5** | `DEPENDENCY` | jest-axe custom matcher assertions for unit tests |
| **OS-MKT-03** | `DavidHDev/react-bits` | CAT_C | PASS | **75.9** | `SOURCE_COPY` | Interactive animated UI snippets and micro-interactions |
| **OS-ANIM-03** | `pmndrs/react-spring` | CAT_H | PASS | **75.9** | `DEPENDENCY` | Alternative physics-based spring animation engine for React |
| **OS-A11Y-09** | `storybookjs/addon-a11y` | CAT_F | PASS | **75.9** | `DEPENDENCY` | Storybook accessibility addon panel for component inspection |
| **OS-AGNT-09** | `langchain-ai/langgraphjs` | CAT_G | PASS | **75.9** | `DEPENDENCY` | LangGraph multi-agent cyclical graph orchestration framework |
| **OS-BROW-03** | `webdriverio/webdriverio` | CAT_F | PASS | **75.9** | `DEPENDENCY` | WebdriverIO cross-browser automation framework for WebDriver-compliant runners |
| **OS-COMP-12** | `chakra-ui/park-ui` | CAT_C | PASS | **75.1** | `SOURCE_COPY` | Park UI Tailwind/CSS-in-JS component theme for Ark UI |
| **OS-MKT-02** | `nolly-studio/cult-ui` | CAT_C | PASS | **74.7** | `SOURCE_COPY` | Specialized brutalist and retro interactive components for landing pages |
| **OS-DASH-05** | `react-grid-layout/react-grid-layout` | CAT_H | PASS_WITH_RESTRICTIONS | **74.7** | `DEPENDENCY` | Interactive drag-and-drop dashboard grid layout adapter; active upstream v2.3.0 with React 18/19 and Playwright test harness; admitted as optional plugin for dashboard widgets (5.5/10 accessibility is a preliminary estimate subject to 6-test verification matrix) |
| **OS-ANIM-02** | `formkit/auto-animate` | CAT_H | PASS | **74.7** | `DEPENDENCY` | Zero-config DOM auto-animation utility for dynamic list reordering |
| **OS-CHRT-02** | `apache/echarts` | CAT_H | PASS | **74.7** | `DEPENDENCY` | Enterprise-grade canvas/WebGL charting engine for high-density streaming telemetry |
| **OS-CHRT-08** | `FormidableLabs/victory` | CAT_H | PASS | **74.7** | `DEPENDENCY` | Cross-platform charting components supporting React Native and web |
| **OS-BROW-08** | `cypress-io/cypress` | CAT_F | PASS | **74.7** | `DEPENDENCY` | Cypress end-to-end component and integration test runner adapter |
| **OS-MKT-07** | `markmead/hyperui` | CAT_C | PASS | **74.1** | `SOURCE_COPY` | HyperUI open-source Tailwind CSS components and page blocks |
| **OS-DASH-01** | `tremorlabs/tremor` | CAT_H | PASS | **74.1** | `DEPENDENCY` | Original Tremor dashboard component package (legacy runtime dependency model) |
| **OS-DASH-07** | `marmelab/react-admin` | CAT_H | PASS | **74.1** | `DEPENDENCY` | React Admin enterprise B2B application framework |
| **OS-ANIM-07** | `catdad/canvas-confetti` | CAT_H | PASS | **74.1** | `DEPENDENCY` | Canvas-based confetti particle animation for user milestone celebrations |
| **OS-TYPO-01** | `tailwindlabs/tailwindcss-typography` | CAT_H | PASS | **74.1** | `DEPENDENCY` | Tailwind typography plugin providing beautiful typographic defaults for markdown prose |
| **OS-AGNT-07** | `CopilotKit/CopilotKit` | CAT_G | PASS | **74.1** | `DEPENDENCY` | CopilotKit in-app AI copilot and generative UI integration framework |
| **OS-BROW-07** | `SeleniumHQ/selenium` | CAT_F | PASS | **74.1** | `DEPENDENCY` | Legacy enterprise Selenium WebDriver bridge for legacy test suites |
| **OS-VREG-07** | `rsmbl/Resemble.js` | CAT_F | PASS | **74.1** | `DEPENDENCY` | Resemble.js client-side image diffing library |
| **OS-A11Y-10** | `accesslint/accesslint` | CAT_F | PASS | **73.9** | `EXTERNAL_TOOL` | AccessLint automated pull request accessibility review bot |
| **OS-AGNT-10** | `run-llama/LlamaIndexTS` | CAT_G | PASS | **73.9** | `DEPENDENCY` | LlamaIndex data ingestion, retrieval, and document indexing engine |
| **OS-MKT-06** | `themesberg/flowbite-react` | CAT_C | PASS | **73.5** | `DEPENDENCY` | Flowbite React component library based on Tailwind CSS |
| **OS-DASH-06** | `refinedev/refine` | CAT_H | PASS | **73.5** | `DEPENDENCY` | Refine enterprise meta-framework for internal tools, admin panels, and CRUD apps |
| **OS-ANIM-06** | `animate-css/animate.css` | CAT_H | PASS | **73.5** | `DEPENDENCY` | Lightweight pure CSS keyframe animations for simple CSS-only transitions |
| **OS-ICON-06** | `google/material-design-icons` | CAT_H | PASS | **73.5** | `DEPENDENCY` | Google Material Symbols for enterprise applications adhering to Material Design |
| **OS-CHRT-06** | `observablehq/plot` | CAT_H | PASS | **73.5** | `DEPENDENCY` | Exploratory statistical charting grammar for data analysis interfaces |
| **OS-TYPO-06** | `opentypejs/opentype.js` | CAT_H | PASS | **73.5** | `DEPENDENCY` | OpenType.js font parser for client-side glyph vector inspection |
| **OS-LAYT-06** | `kristoferbaxter/flexboxgrid` | CAT_H | PASS | **73.5** | `DEPENDENCY` | FlexboxGrid responsive 12-column grid system |
| **OS-AGNT-06** | `continuedev/continue` | CAT_G | PASS | **73.5** | `REFERENCE_ONLY` | Continue IDE AI assistant protocol and custom command integration |
| **OS-VREG-06** | `lost-pixel/lost-pixel` | CAT_F | PASS | **73.5** | `EXTERNAL_TOOL` | Lost Pixel open-source visual regression testing platform |

---

## 4. Key Qualifications & Test Matrices
- **Visx (`OS-CHRT-04`, Tier 1):** Bundle size claims (~15–20 KB vs ~50 KB) are formally qualified as **preliminary tree-shaken estimates**, subject to Phase 03 Vite/Rollup benchmarks (C16).
- **React-Grid-Layout (`OS-DASH-05`, Tier 2):** Upstream v2.3.0 is verified with Playwright harness and React 18/19. Accessibility score of 5.5/10 is qualified as a **preliminary estimate** subject to a 6-test verification matrix (keyboard, focus, live region, touch gestures, landmark hierarchy, reduced motion) (C19). Distinct candidate ID: `OS-DASH-05` (Radix Aspect Ratio is `OS-LAYT-03`).
- **GSAP (`OS-ANIM-04`, Tier 2):** Scoped strictly to optional plugin code emission under Webflow April 2025 non-compete terms.
