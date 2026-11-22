# UIForge Phase 02.5: Core Foundation Shortlist (Tier 0)

**Document ID:** `UIF-PH02.5-CORE-FOUNDATION-SHORTLIST`  
**Classification:** Tier 0 Architectural Foundation (24 Candidates)  
**Status:** Certified / Complete  
**Date:** November 2026  

---

## 1. Core Foundation Selection Rationale

The **24 Tier 0 Core Foundation candidates** represent the indispensable architectural pillars of UIForge. Each candidate satisfies the following criteria:
1. Exceptional technical score ($ge 92.0$ weighted score).
2. Unconditional or restricted pass on all six mandatory hard gates (G1–G6).
3. Zero unresolved legal copyleft or commercial non-compete contamination.
4. Directly addresses one of UIForge's 16 core platform capabilities.

---

## 2. Tier 0 Candidates Master Registry (24 Sources)

| Candidate ID | Source ID | Name | Category | Hard Gate | Score | Proposed Mode | Architectural Role & Selection Rationale |
| :--- | :--- | :--- | :--- | :---: | :---: | :--- | :--- |
| **OS-COMP-01** | SRC-OS-COMP-01 | `shadcn-ui/ui` | CAT_C | PASS | **95** | `SOURCE_COPY` | Canonical component registry format & CLI distribution standard; zero runtime dependency coupling |
| **OS-TOKN-01** | SRC-OS-TOKN-01 | `design-tokens/community-group` | CAT_E | PASS | **95** | `REFERENCE_ONLY` | Canonical W3C Community Group Design Token exchange specification (DTCG 2025.10) |
| **OS-ANIM-01** | SRC-OS-ANIM-01 | `motiondivision/motion` | CAT_H | PASS | **95** | `DEPENDENCY` | Production-grade declarative React spring/physics animation engine with zero layout thrash |
| **OS-ICON-01** | SRC-OS-ICON-01 | `lucide-icons/lucide` | CAT_H | PASS | **95** | `DEPENDENCY` | Consistent, accessible, modern SVG icon primitives with tree-shakeable exports |
| **OS-CHRT-01** | SRC-OS-CHRT-01 | `recharts/recharts` | CAT_H | PASS | **95** | `DEPENDENCY` | Declarative React SVG data visualization standard with composable chart primitives |
| **OS-TYPO-05** | SRC-OS-TYPO-05 | `vercel/geist-font` | CAT_H | PASS_WITH_RESTRICTIONS | **95** | `ASSET_REDISTRIBUTION` | Primary monospace and geometric sans typeface (OFL 1.1) for code and metric display |
| **OS-LAYT-01** | SRC-OS-LAYT-01 | `bvaughn/react-resizable-panels` | CAT_H | PASS | **95** | `DEPENDENCY` | Accessible, persistent resizable panel layouts for UIForge Studio and workspace sidebars |
| **OS-A11Y-01** | SRC-OS-A11Y-01 | `dequelabs/axe-core` | CAT_F | PASS_WITH_RESTRICTIONS | **95** | `EXTERNAL_TOOL` | Authoritative automated WCAG accessibility rule engine invoked out-of-process via user CLI |
| **OS-AGNT-01** | SRC-OS-AGNT-01 | `modelcontextprotocol/typescript-sdk` | CAT_G | PASS | **95** | `DEPENDENCY` | Model Context Protocol (MCP) TypeScript SDK establishing standard agent tool/resource connectivity |
| **OS-BROW-01** | SRC-OS-BROW-01 | `microsoft/playwright` | CAT_F | PASS | **95** | `DEPENDENCY` | Multi-browser headless automation, tracing, visual screenshotting, and event replay platform |
| **OS-VREG-01** | SRC-OS-VREG-01 | `mapbox/pixelmatch` | CAT_F | PASS | **95** | `DEPENDENCY` | Deterministic, zero-dependency, pure JS pixel difference engine for screenshot regression |
| **OS-D2C-06** | SRC-OS-D2C-06 | `ast-grep/ast-grep` | CAT_A | PASS | **94.7** | `EXTERNAL_TOOL` | High-performance tree-sitter based AST structural search and code-rewriting tool |
| **OS-TOKN-04** | SRC-OS-TOKN-04 | `tailwindlabs/tailwindcss` | CAT_E | PASS | **94.2** | `DEPENDENCY` | Foundational utility CSS engine v4 with native CSS variable cascade and container queries |
| **OS-TYPO-04** | SRC-OS-TYPO-04 | `rsms/inter` | CAT_H | PASS_WITH_RESTRICTIONS | **94.2** | `ASSET_REDISTRIBUTION` | Primary UI sans-serif typeface (OFL 1.1) optimized for high-density screen readability |
| **OS-COMP-03** | SRC-OS-COMP-03 | `adobe/react-spectrum` | CAT_B | PASS | **93.4** | `DEPENDENCY` | Comprehensive accessible interaction hooks, state management, and mobile touch primitives |
| **OS-DASH-03** | SRC-OS-DASH-03 | `TanStack/table` | CAT_H | PASS | **93.4** | `DEPENDENCY` | Headless, robust table state machine with sorting, filtering, and grouping primitives |
| **OS-A11Y-03** | SRC-OS-A11Y-03 | `jsx-eslint/eslint-plugin-jsx-a11y` | CAT_A | PASS | **93.4** | `DEPENDENCY` | Static JSX accessibility linting rules enforcing ARIA and semantic HTML at build time |
| **OS-A11Y-08** | SRC-OS-A11Y-08 | `w3c/aria-practices` | CAT_F | PASS | **93.2** | `REFERENCE_ONLY` | W3C ARIA Authoring Practices Guide (APG) specification and keyboard interaction reference |
| **OS-COMP-02** | SRC-OS-COMP-02 | `radix-ui/primitives` | CAT_B | PASS | **92.4** | `DEPENDENCY` | Industry-standard unstyled accessible primitives; clean React 18/19 server component boundaries |
| **OS-TOKN-02** | SRC-OS-TOKN-02 | `style-dictionary/style-dictionary` | CAT_E | PASS | **92.4** | `DEPENDENCY` | Battle-tested token transformation build engine converting DTCG tokens to CSS/Tailwind |
| **OS-LAYT-02** | SRC-OS-LAYT-02 | `tailwindlabs/tailwindcss-container-queries` | CAT_E | PASS | **92.4** | `DEPENDENCY` | Standard Tailwind container query plugin enabling component-level responsive reflow |
| **OS-A11Y-02** | SRC-OS-A11Y-02 | `axe-core/playwright` | CAT_F | PASS | **92.4** | `DEPENDENCY` | Official Playwright axe integration runner for end-to-end DOM accessibility assertion |
| **OS-AGNT-02** | SRC-OS-AGNT-02 | `anomalyco/opencode` | CAT_G | PASS | **92.4** | `REFERENCE_ONLY` | Open-source autonomous AI coding agent reference architecture and execution harness |
| **OS-D2C-07** | SRC-OS-D2C-07 | `babel/babel` | CAT_A | PASS | **92.3** | `DEPENDENCY` | Standard JavaScript/JSX parsing and AST traversal infrastructure for code transformations |

---

## 3. Tier 0 Integration Architecture

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        UIFORGE CORE PLATFORM                           │
├────────────────────────────────┬───────────────────────────────────────┤
│ 1. Intelligence & AST Analysis │ TypeScript Compiler API + ast-grep     │
│ 2. Primitives & Interaction    │ Radix UI Primitives + React Aria      │
│ 3. Component Distribution      │ shadcn/ui Source-Copy Registry        │
│ 4. Design Tokens & Styling     │ Tailwind CSS v4 + DTCG + Style Dict.  │
│ 5. Automated Verification      │ Playwright + axe-core + Pixelmatch    │
│ 6. Agent Communication         │ Model Context Protocol TypeScript SDK │
│ 7. Core UI Controls & Assets   │ Motion + TanStack Table + Lucide      │
│ 8. Design System Typography    │ Inter + Geist (SIL OFL 1.1 RFN)       │
└────────────────────────────────┴───────────────────────────────────────┘
```
