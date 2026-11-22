# UIForge Phase 02.5: Core Foundation Shortlist (Tier 0)

**Document ID:** `UIF-PH02.5-CORE-FOUNDATION-SHORTLIST`  
**Classification:** Tier 0 Architectural Foundation (24 Candidates)  
**Status:** Certified / Complete  
**Date:** November 2026  

---

## 1. Core Foundation Selection Rationale & Architectural Decoupling

> **Tier 0 — Core Foundation:** Strategic architectural foundations and capabilities to adopt selectively according to product requirements, existing infrastructure, compatibility and eligibility.

Tier 0 candidates do not represent an undifferentiated bundle of mandatory runtime dependencies. Instead, they are partitioned across seven distinct architectural and consumption layers:

1. **Core Runtime Dependencies (8 candidates):** Directly integrated into production application bundles (`@radix-ui/react-*` `OS-COMP-02`, `@react-aria/*` `OS-COMP-03`, `motion` `OS-ANIM-01`, `lucide-react` `OS-ICON-01`, `recharts` `OS-CHRT-01`, `@tanstack/react-table` `OS-DASH-03`, `react-resizable-panels` `OS-LAYT-01`, `@modelcontextprotocol/typescript-sdk` `OS-AGNT-01`).
2. **Development, Build & Testing Tooling (8 candidates):** Compilers, generators, linters, and test execution harnesses (`style-dictionary` `OS-TOKN-02`, `tailwindcss` `OS-TOKN-04`, `tailwindcss-container-queries` `OS-LAYT-02` [Tailwind v3 compatibility plugin; native container queries in Tailwind v4], `babel/babel` `OS-D2C-07`, `eslint-plugin-jsx-a11y` `OS-A11Y-03`, `playwright` `OS-BROW-01`, `@axe-core/playwright` `OS-A11Y-02`, `pixelmatch` `OS-VREG-01`).
3. **External CLI Subprocesses (2 candidates):** Isolated CLI subprocesses invoked out-of-process without binary bundling (`@axe-core/cli` `OS-A11Y-01` [release blocked pending legal counsel clearance], `ast-grep` `OS-D2C-06`).
4. **Source-Copy Component Blueprints (1 candidate):** Zero-runtime scaffolding templates (`shadcn-ui/ui` `OS-COMP-01`).
5. **Open Design & Accessibility Standards (2 candidates):** Non-executable governance specifications (`W3C Design Tokens Community Group Format` `OS-TOKN-01`, `W3C ARIA Authoring Practices Guide 1.2` `OS-A11Y-08`).
6. **Design System Assets (2 candidates):** Static typefaces with RFN compliance obligations (`Inter` `OS-TYPO-04`, `Geist` `OS-TYPO-05`).
7. **Agent Reference Architectures & Execution Patterns (1 candidate):** Autonomous coding agent reference execution harness and shadow-workspace patterns (`anomalyco/opencode` `OS-AGNT-02`).

Each Tier 0 candidate satisfies the following baseline criteria:
1. Exceptional technical score ($ge 92.0$ weighted score).
2. Unconditional or restricted pass on all six mandatory hard gates (G1–G6).
3. Zero unresolved legal copyleft or commercial non-compete contamination.
4. Directly addresses one of UIForge's 16 core platform capabilities.

---

## 2. Tier 0 Candidates Master Registry (24 Sources)

| Candidate ID | Source ID | Name | Category | Hard Gate | Score | Proposed Mode | Recommendation | Architectural Role & Selection Rationale |
| :--- | :--- | :--- | :--- | :---: | :---: | :--- | :--- | :--- |
| **OS-COMP-01** | SRC-OS-COMP-01 | `shadcn-ui/ui` | CAT_C | PASS | **95** | `SOURCE_COPY` | `ADOPT` | Canonical component registry format & CLI distribution standard; zero runtime dependency coupling |
| **OS-TOKN-01** | SRC-OS-TOKN-01 | `design-tokens/community-group` | CAT_E | PASS | **95** | `REFERENCE_ONLY` | `ADOPT` | Canonical W3C Community Group Design Token exchange specification (DTCG 2025.10) |
| **OS-ANIM-01** | SRC-OS-ANIM-01 | `motiondivision/motion` | CAT_H | PASS | **95** | `DEPENDENCY` | `ADOPT` | Production-grade declarative React spring/physics animation engine with zero layout thrash |
| **OS-ICON-01** | SRC-OS-ICON-01 | `lucide-icons/lucide` | CAT_H | PASS | **95** | `DEPENDENCY` | `ADOPT` | Consistent, accessible, modern SVG icon primitives with tree-shakeable exports |
| **OS-CHRT-01** | SRC-OS-CHRT-01 | `recharts/recharts` | CAT_H | PASS | **95** | `DEPENDENCY` | `ADOPT` | Declarative React SVG data visualization standard with composable chart primitives |
| **OS-TYPO-05** | SRC-OS-TYPO-05 | `vercel/geist-font` | CAT_H | PASS_WITH_RESTRICTIONS | **95** | `ASSET_REDISTRIBUTION` | `ADOPT` | Primary monospace and geometric sans typeface (OFL 1.1) for code and metric display; custom subsetting defaults to font-family rename (UIForgeGeist) unless SIL functional-equivalence exception (SIL OFL FAQ Q5.3) or copyright permission applies; pyftsubset flags --layout-features=* --desubroutinize --flavor=woff2 --name-IDs=* |
| **OS-LAYT-01** | SRC-OS-LAYT-01 | `bvaughn/react-resizable-panels` | CAT_H | PASS | **95** | `DEPENDENCY` | `ADOPT` | Accessible, persistent resizable panel layouts for UIForge Studio and workspace sidebars |
| **OS-A11Y-01** | SRC-OS-A11Y-01 | `dequelabs/axe-core` | CAT_F | PASS_WITH_RESTRICTIONS | **95** | `EXTERNAL_TOOL` | `CONDITIONALLY ADOPT — RELEASE BLOCKED PENDING COUNSEL CLEARANCE` | Authoritative automated WCAG accessibility rule engine invoked out-of-process via user CLI (@axe-core/cli); release blocked pending formal legal counsel clearance for distribution boundaries (counselReviewRequired: true) |
| **OS-AGNT-01** | SRC-OS-AGNT-01 | `modelcontextprotocol/typescript-sdk` | CAT_G | PASS | **95** | `DEPENDENCY` | `ADOPT` | Model Context Protocol (MCP) TypeScript SDKs (declared semver ranges: @modelcontextprotocol/server ^2.1.0, evaluated v2.1.1; @modelcontextprotocol/client ^2.1.0) establishing agent connectivity via modern 2026-07-28 discovery (server/discover, _meta headers) with versionNegotiation: { mode: "auto" } fallback to legacy revisions 2025-11-25 and 2024-11-05; live socket runtime tests classified NOT-EXECUTED pending Phase 03 |
| **OS-BROW-01** | SRC-OS-BROW-01 | `microsoft/playwright` | CAT_F | PASS | **95** | `DEPENDENCY` | `ADOPT` | Multi-browser headless automation, tracing, visual screenshotting, and event replay platform |
| **OS-VREG-01** | SRC-OS-VREG-01 | `mapbox/pixelmatch` | CAT_F | PASS | **95** | `DEPENDENCY` | `ADOPT` | Deterministic, zero-dependency, pure JS pixel difference engine for screenshot regression |
| **OS-D2C-06** | SRC-OS-D2C-06 | `ast-grep/ast-grep` | CAT_A | PASS | **94.7** | `EXTERNAL_TOOL` | `ADOPT` | High-performance tree-sitter based AST structural search and code-rewriting tool |
| **OS-TOKN-04** | SRC-OS-TOKN-04 | `tailwindlabs/tailwindcss` | CAT_E | PASS | **94.2** | `DEPENDENCY` | `ADOPT` | Foundational utility CSS engine v4 with native CSS variable cascade and container queries |
| **OS-TYPO-04** | SRC-OS-TYPO-04 | `rsms/inter` | CAT_H | PASS_WITH_RESTRICTIONS | **94.2** | `ASSET_REDISTRIBUTION` | `ADOPT` | Primary UI sans-serif typeface (OFL 1.1) optimized for high-density screen readability; custom subsetting defaults to font-family rename (UIForgeInter) unless SIL functional-equivalence exception (SIL OFL FAQ Q5.3) or copyright permission applies; pyftsubset flags --layout-features=* --desubroutinize --flavor=woff2 --name-IDs=* |
| **OS-COMP-03** | SRC-OS-COMP-03 | `adobe/react-spectrum` | CAT_B | PASS | **93.4** | `DEPENDENCY` | `ADOPT` | Comprehensive accessible interaction hooks, state management, and mobile touch primitives |
| **OS-DASH-03** | SRC-OS-DASH-03 | `TanStack/table` | CAT_H | PASS | **93.4** | `DEPENDENCY` | `ADOPT` | Headless, robust table state machine with sorting, filtering, and grouping primitives |
| **OS-A11Y-03** | SRC-OS-A11Y-03 | `jsx-eslint/eslint-plugin-jsx-a11y` | CAT_A | PASS | **93.4** | `DEPENDENCY` | `ADOPT` | Static JSX accessibility linting rules enforcing ARIA and semantic HTML at build time |
| **OS-A11Y-08** | SRC-OS-A11Y-08 | `w3c/aria-practices` | CAT_F | PASS | **93.2** | `REFERENCE_ONLY` | `ADOPT` | W3C ARIA Authoring Practices Guide (APG) specification and keyboard interaction reference |
| **OS-COMP-02** | SRC-OS-COMP-02 | `radix-ui/primitives` | CAT_B | PASS | **92.4** | `DEPENDENCY` | `ADOPT` | Industry-standard unstyled accessible primitives; clean React 18/19 server component boundaries |
| **OS-TOKN-02** | SRC-OS-TOKN-02 | `style-dictionary/style-dictionary` | CAT_E | PASS | **92.4** | `DEPENDENCY` | `ADOPT` | Battle-tested token transformation build engine (style-dictionary v5.8.0) natively converting W3C DTCG tokens to CSS custom properties and Tailwind themes on Node.js 22 LTS |
| **OS-LAYT-02** | SRC-OS-LAYT-02 | `tailwindlabs/tailwindcss-container-queries` | CAT_E | PASS | **92.4** | `DEPENDENCY` | `ADOPT` | Standard Tailwind container query plugin enabling component-level responsive reflow |
| **OS-A11Y-02** | SRC-OS-A11Y-02 | `axe-core/playwright` | CAT_F | PASS | **92.4** | `DEPENDENCY` | `ADOPT` | Official Playwright axe integration runner for end-to-end DOM accessibility assertion |
| **OS-AGNT-02** | SRC-OS-AGNT-02 | `anomalyco/opencode` | CAT_G | PASS | **92.4** | `REFERENCE_ONLY` | `ADOPT` | Open-source autonomous AI coding agent reference architecture and execution harness |
| **OS-D2C-07** | SRC-OS-D2C-07 | `babel/babel` | CAT_A | PASS | **92.3** | `DEPENDENCY` | `ADOPT` | Babel AST infrastructure (@babel/parser, @babel/traverse, @babel/types, @babel/generator) providing 6-stage AST manipulation with errorRecovery: true for streaming JSX, decoupled from UIForge WAL token buffering (specified architecturally & simulated), coordinate-based slice patching, and TS baseline diagnostic regression checks |

---

## 3. Tier 0 Key Specifications & Boundaries
- **axe-core (`OS-A11Y-01`):** Classified as `CONDITIONALLY ADOPT — RELEASE BLOCKED PENDING COUNSEL CLEARANCE` (C17). Out-of-process CLI execution decoupled from UIForge core binaries.
- **@axe-core/playwright (`OS-A11Y-02`):** Official Playwright accessibility testing runner licensed under Mozilla Public License 2.0 (MPL-2.0). Restricted to `devDependencies` test suites; weak file-level copyleft ensures zero runtime contamination (C37).
- **Style Dictionary (`OS-TOKN-02`):** Upgraded to `v5.8.0` supporting native W3C DTCG format on Node.js 22 LTS (C14).
- **Model Context Protocol SDK (`OS-AGNT-01`):** Declared semver ranges (`@modelcontextprotocol/server@^2.1.0`, evaluated on v2.1.1; `@modelcontextprotocol/client@^2.1.0`). Implements modern 2026-07-28 discovery (`server/discover`, `_meta`) with auto-negotiation fallback to 2025-11-25 / 2024-11-05 (C13, C20, C24).
- **anomalyco/opencode (`OS-AGNT-02`):** Autonomous AI coding agent reference architecture (Score: 92.4, Tier 0 Core Foundation, `REFERENCE_ONLY`). Serves as clean-room pattern for agent loop execution and shadow workspaces (C36).
- **Babel Infrastructure (`OS-D2C-07`):** Complete 6-stage AST manipulation pipeline with `@babel/generator` and `errorRecovery: true` for fault-tolerant JSX parsing, coupled with WAL token buffering and TS baseline diagnostic regression checks (C15, C22).
- **Fonts (`OS-TYPO-04`, `OS-TYPO-05`):** Inter v4.1 and Geist v1.4.0 distributed under SIL OFL 1.1 RFN preservation; custom subsetting defaults to font-family rename (`UIForgeInter`, `UIForgeGeist`) unless functional-equivalence exception or permission applies (C18, C21).

---

## 4. Tier 0 Integration Architecture

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        UIFORGE CORE PLATFORM                           │
├────────────────────────────────┬───────────────────────────────────────┤
│ 1. Intelligence & AST Analysis │ TS Compiler API + ast-grep + Babel    │
│ 2. Primitives & Interaction    │ Radix UI Primitives + React Aria      │
│ 3. Component Distribution      │ shadcn/ui Source-Copy Registry        │
│ 4. Design Tokens & Styling     │ Tailwind CSS v4 + DTCG + Style Dict.  │
│ 5. Automated Verification      │ Playwright + axe-core + Pixelmatch    │
│ 6. Agent Communication         │ Model Context Protocol TypeScript SDK │
│ 7. Core UI Controls & Assets   │ Motion + TanStack Table + Lucide      │
│ 8. Design System Typography    │ Inter + Geist (SIL OFL 1.1 RFN)       │
└────────────────────────────────┴───────────────────────────────────────┘
```
