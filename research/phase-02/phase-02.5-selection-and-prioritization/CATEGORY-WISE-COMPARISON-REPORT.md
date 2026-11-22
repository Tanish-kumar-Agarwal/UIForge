# UIForge Phase 02.5: Category-Wise Comparison Report

**Document ID:** `UIF-PH02.5-CATEGORY-WISE-COMPARISON-REPORT`  
**Classification:** Technology Domain Comparative Analysis  
**Status:** Certified / Complete  
**Date:** November 2026  

---

## 1. Category A — Project Intelligence & Code Analysis

- **Primary Challenge:** AI coding agents frequently hallucinate non-existent component props, fail to respect existing project conventions, and perform clumsy string-based code replacements that destroy comments and syntax trees.
- **Candidate Universe:** Native TypeScript Compiler API, `ast-grep` (`OS-D2C-06`), `babel` (`OS-D2C-07`), `eslint-plugin-react` (`OS-LAYT-07`), `eslint-plugin-jsx-a11y` (`OS-A11Y-03`).
- **Complete 6-Stage AST Manipulation Pipeline (Finding C15):**
  UIForge establishes an authoritative 6-stage AST manipulation pipeline combining high-performance pattern search with AST transformation and full semantic type checking:
  1. **Stage 1: Parsing (`@babel/parser`):** High-throughput ECMAScript/TypeScript parsing configured with `sourceType: "module"`, plugins `["jsx", "typescript"]`, and `errorRecovery: true` to parse partial or malformed JSX streams from AI models without throwing unrecoverable exceptions. Supported error recovery cases include unclosed JSX elements/fragments, missing trailing commas/semicolons, and incomplete type annotations during live streaming.
  2. **Stage 2: AST Traversal (`@babel/traverse`):** Structured visitor navigation identifying component declarations, hook invocations, prop distributions, and import declarations.
  3. **Stage 3: AST Transformation (`@babel/types`):** Deterministic node construction, replacement, and insertion using strongly-typed builder definitions.
  4. **Stage 4: Code Generation (`@babel/generator`):** Accurate AST serialization with `retainLines: true`, preserving surrounding layout and indentation.
  5. **Stage 5: Comment & Formatting Preservation:** For surgical edits, coordinate-based AST slice patching replaces only mutated token ranges; for file regenerations, Prettier with language plugins formats the emitted source while preserving detached leading/trailing comments.
  6. **Stage 6: Semantic Verification (TypeScript Compiler API):** In-memory program diagnostics verifying that transformed code compiles without type regressions before committing to disk.
- **Decision:** Hybrid Architecture. Native TS Compiler API forms internal core semantic engine; ast-grep is integrated as high-performance CLI scanner; Babel 6-stage pipeline handles fault-tolerant JSX rewriting.

---

## 2. Category B — Component & Primitive Architecture

- **Primary Challenge:** Providing accessible, unstyled UI behavior without locking user projects into an inflexible visual design system or heavy runtime overhead.
- **Candidate Universe:** Radix UI (`OS-COMP-02`), React Aria (`OS-COMP-03`), Headless UI (`OS-COMP-04`), Ark UI (`OS-COMP-10`), Base UI (`OS-COMP-11`), Ariakit (`OS-COMP-13`).
- **Comparative Evaluation:**
  - *Radix UI Primitives (`OS-COMP-02`, Score: 95.9, Tier 0):* Industry standard for headless composable dialogs, popovers, dropdowns, and tooltips. Clean React 18/19 server component boundaries.
  - *React Aria (`OS-COMP-03`, Score: 96.0, Tier 0):* Gold standard for complex interaction hooks, mobile touch events, virtual focus, and keyboard navigation.
  - *Ark UI (`OS-COMP-10`, Score: 85.9, Tier 1):* Zag.js state machines; strong cross-framework architecture, recommended as core-adjacent alternative.
  - *Headless UI (`OS-COMP-04`, Score: 85.8, Tier 1):* Excellent for basic Tailwind applications, but narrower component breadth than Radix.
- **Decision:** Multi-primitive strategy. Radix UI primitives serve as the primary foundational building blocks; React Aria hooks are adopted for complex interactive states (comboboxes, date pickers, number fields).

---

## 3. Category C — Component Registries & Source Ecosystems

- **Primary Challenge:** Delivering component code that developers can freely modify, without imposing immutable `node_modules` abstraction layers.
- **Candidate Universe:** shadcn/ui (`OS-COMP-01`), Magic UI (`OS-MKT-01`), Origin UI (`OS-MKT-04`), Tremor Raw (`OS-DASH-02`), Park UI (`OS-COMP-12`), Cult UI (`OS-MKT-02`), React Bits (`OS-MKT-03`), HyperUI (`OS-MKT-07`).
- **Comparative Evaluation:**
  - *shadcn/ui (`OS-COMP-01`, Score: 94.6, Tier 0):* Decoupled source-copy component distribution model. Zero runtime dependency bloat; full project-level customization.
  - *Magic UI (`OS-MKT-01`, Score: 84.7, Tier 1):* Curated animated sections; compatible with shadcn/ui registry format.
  - *Origin UI (`OS-MKT-04`, Score: 84.9, Tier 1):* Modern micro-components (buttons, inputs, tooltips) with clean Tailwind v4 bindings.
  - *Tremor Raw (`OS-DASH-02`, Score: 86.1, Tier 1):* Unstyled dashboard cards, metrics, and KPI primitives.
- **Decision:** Adopt shadcn/ui registry schema as UIForge's canonical component emission format. Core-adjacent registries (Magic UI, Origin UI, Tremor Raw) are integrated via standardized schema adapters.

---

## 4. Category D — Design Systems & Complete UI Frameworks

- **Primary Challenge:** Full-system UI frameworks (Mantine, MUI, Chakra, Ant Design) impose heavy CSS-in-JS runtimes, rigid design opinions, and massive bundle footprints that break existing brownfield projects.
- **Candidate Universe:** Mantine (`OS-COMP-05`), Chakra UI (`OS-COMP-06`), MUI (`OS-COMP-07`), Ant Design (`OS-COMP-08`), NextUI (`OS-COMP-09`), Blueprint (`OS-COMP-14`), SaaS UI (`OS-COMP-15`).
- **Comparative Evaluation:**
  - Adopting any complete framework as a mandatory UIForge core dependency would immediately introduce framework lock-in and vendor rigidity.
  - SaaS UI (`OS-COMP-15`, Score: 46.9, Tier 5) is rejected due to proprietary Pro upsell gating and architectural lock-in.
  - The remaining frameworks (`OS-COMP-05` through `09`, `14`) provide exceptional pattern references for complex enterprise data grids, form validation, and slot architectures.
- **Decision:** Build Internally. UIForge does not adopt any complete monolithic UI framework as a core dependency. All eligible candidates are classified as **Tier 3 (Reference and Research)**.

---

## 5. Category E — Design Tokens & Styling

- **Primary Challenge:** Bridging Figma/design-tool design tokens with production code without lossy conversion, visual drift, or manual CSS synchronizations.
- **Candidate Universe:** DTCG (`OS-TOKN-01`), Style Dictionary (`OS-TOKN-02`), Open Props (`OS-TOKN-03`), Tailwind CSS v4 (`OS-TOKN-04`), Radix Colors (`OS-TOKN-05`), Token Studio Transforms (`OS-TOKN-06`), Tailwind Container Queries (`OS-LAYT-02`), Every Layout (`OS-LAYT-08`).
- **Style Dictionary v5.8.0 Upgrade (Finding C14):**
  UIForge pins `style-dictionary@^5.8.0` as its core token compilation engine, aligning with the platform's Node.js 22 LTS runtime. Version 5.8.0 delivers native W3C Design Tokens Community Group (DTCG 2025.10) format parsing (`$value`, `$type`, `$description`, `$extensions`), eliminating brittle legacy pre-transform normalization layers.
- **Every Layout Clean-Room Boundary (Finding C01/C11):**
  Candidate `OS-LAYT-08` is evaluated strictly under `REFERENCE_ONLY` mode. Algorithmic CSS layout concepts (The Stack, The Cluster, The Reel) are studied for clean-room implementation. Direct copying of authored text, diagrams, and component code is strictly prohibited under `LIC-EVERY-LAYOUT-COMMERCIAL`.
- **Decision:** Adopt Tailwind CSS v4 as default styling runtime, DTCG 2025.10 as canonical token format, and Style Dictionary v5.8.0 as token build compiler.

---

## 6. Category F — Browser Verification & Accessibility

- **Primary Challenge:** Automated tests that rely solely on jsdom or simulated DOMs miss real layout reflow bugs, subpixel rendering glitches, and true visual accessibility contrast failures.
- **Candidate Universe:** Playwright (`OS-BROW-01`), axe-core (`OS-A11Y-01`), @axe-core/playwright (`OS-A11Y-02`), W3C ARIA Practices (`OS-A11Y-08`), Pixelmatch (`OS-VREG-01`), Puppeteer (`OS-BROW-02`), Testcontainers (`OS-BROW-04`), Looks-Same (`OS-VREG-02`), Argos CI (`OS-VREG-03`), Storybook Test Runner (`OS-VREG-08`), pa11y (`OS-A11Y-05`), Loki (`OS-VREG-04`), BackstopJS (`OS-VREG-05`).
- **axe-core Conditional Adoption & Release Gate (Finding C17):**
  axe-core (`OS-A11Y-01`) recommendation is classified as:
  > **`CONDITIONALLY ADOPT — RELEASE BLOCKED PENDING COUNSEL CLEARANCE`**
  UIForge decouples axe-core by invoking user-installed `@axe-core/cli` out-of-process via standard subprocess streams, without bundling or redistributing MPL-2.0 binaries. However, formal IP counsel clearance remains an explicit release gate before shipping any bundled, hosted, or SaaS delivery model.
- **Decision:** Core verification pipeline couples Playwright + axe-core (out-of-process CLI) + Pixelmatch into an isolated browser verification harness.

---

## 7. Category G — Agent & MCP Integration

- **Primary Challenge:** Standardizing how autonomous AI coding agents (Claude Code, OpenCode, Cursor, Antigravity) discover UIForge's design intelligence and invoke frontend mutations safely.
- **MCP TypeScript SDK Pinning & Wire Protocol Negotiation (Finding C13):**
  UIForge pins:
  - `@modelcontextprotocol/server@^2.1.0` (Core Runtime Dependency)
  - `@modelcontextprotocol/client@^2.1.0` (Optional Integration Client)
  
  **Wire Protocol Negotiation Protocol:**
  During client/server initialization, UIForge proposes protocol version `2026-07-28`. If the connecting agent or client only supports the legacy standard, UIForge automatically negotiates and falls back to wire protocol `2024-11-05`. Capabilities supported across both versions include structured tool exposure, token graph resources, prompt templates, logging, progress tokens, cancellation, and interactive parameter elicitation.
- **Decision:** Adopt Model Context Protocol SDK (`@modelcontextprotocol/server` ^2.1.0) as UIForge's primary interoperability standard.

---

## 8. Category H — Supporting UI Libraries

- **Motion & Animation:** `motion` (`OS-ANIM-01`, Score: 94.8, Tier 0) adopted as standard. GSAP (`OS-ANIM-04`, Score: 78.4, Tier 2) supported as optional emission plugin under Webflow April 2025 license. Remotion (`OS-ANIM-08`, Tier 5) excluded due to architectural & mission scope misfit (programmatic video composition vs web UI design-to-code) and license headcount cap (<=3 employees for free commercial use).
- **Data Tables & Virtualization:** `TanStack/table` (`OS-DASH-03`, Score: 95.8, Tier 0) adopted as headless table foundation. `TanStack/virtual` (`OS-DASH-04`, Score: 85.8, Tier 1) adopted for large list virtualization.
- **Dashboard Grid Layout & Accessibility Qualification (Finding C19):**
  `react-grid-layout` (`OS-DASH-05`, Score: 74.7, Tier 2) is admitted as an optional integration adapter (active v2.3.0 with React 18/19 and Playwright harness). Its 5.5/10 accessibility score is formally qualified as a **preliminary estimate**, subject to a 6-test verification matrix:
  1. Keyboard drag-and-drop (Space/Enter grab, Arrow repositioning, Esc cancel).
  2. Focus management (retention of logical DOM focus order post-mutation).
  3. Accessible announcements (`aria-live="polite"` coordinate updates).
  4. Touch interactions (disambiguation of drag handles from viewport scroll).
  5. Screen-reader hierarchy (semantic grid/gridcell landmarks vs generic div soup).
  6. Reduced-motion behavior (`prefers-reduced-motion` transition bypass).
- **Charts & Data Visualization (Finding C16):**
  `recharts` (`OS-CHRT-01`, Score: 94.8, Tier 0) adopted as primary declarative SVG chart library. `visx` (`OS-CHRT-04`, Tier 1) provides low-level modular SVG visualization primitives (v4.0.0 with React 19 support). Bundle size figures (~15–20 KB vs ~50 KB) are formally qualified as **preliminary tree-shaken estimates**, pending reproducible Phase 03 benchmarks.
- **Typography & Font Subsetting (Finding C18):**
  `Inter` (`OS-TYPO-04`, `rsms/inter` v4.1) and `Geist` (`OS-TYPO-05`, `vercel/geist-font` v1.4.0) adopted under SIL OFL 1.1 RFN preservation. Custom subsetting legally constitutes a "Modified Version" under SIL OFL 1.1 Clause 3, requiring renamed font-family declarations (e.g., `UIForgeInter`, `UIForgeGeist`) unless written copyright permission is secured.
