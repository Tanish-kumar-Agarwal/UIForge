# UIForge Research — Open-Source Discovery Sources & Citations

**Document ID:** `UIF-OS-011`  
**Phase:** 02.1 — Open-Source Ecosystem Discovery & Intelligence  
**Status:** Canonical Citation Directory  
**Date:** November 2026  

---

## 1. Specifications & Normative Industry Standards

| Reference ID | Standard / Specification Title | Authoring Body / Organization | Canonical URL | Relevant Architecture Section |
| :--- | :--- | :--- | :--- | :--- |
| `SPEC-01` | **Design Tokens Community Group Specification** | W3C Community Group (DTCG) | https://design-tokens.github.io/community-group/format/ | `@uiforge/design-tokens` schema |
| `SPEC-02` | **Model Context Protocol Specification** | Model Context Protocol / Anthropic | https://modelcontextprotocol.io/specification/ | `@uiforge/mcp-server` protocol bus |
| `SPEC-03` | **W3C WAI-ARIA 1.2 & Authoring Practices Guide (APG)** | W3C Web Accessibility Initiative | https://www.w3.org/WAI/ARIA/apg/ | `@uiforge/contracts` a11y patterns |
| `SPEC-04` | **Web Content Accessibility Guidelines (WCAG) 2.2** | W3C Accessibility Guidelines Working Group | https://www.w3.org/TR/WCAG22/ | `@uiforge/a11y-engine` audit rules |
| `SPEC-05` | **shadcn/ui Registry Specification Schema** | shadcn Community | https://ui.shadcn.com/docs/registry | `@uiforge/component-registry` format |
| `SPEC-06` | **Open Props CSS Custom Properties Specification** | Adam Argyle / Open Props Community | https://open-props.style | Base CSS token definitions |

---

## 2. Core Open-Source Repositories Audited

| Candidate ID | Project / Repository Name | Official Repository URL | SPDX License | Primary Audit Touchpoint |
| :--- | :--- | :--- | :--- | :--- |
| `OS-AGNT-01` | **Model Context Protocol TS SDK** | https://github.com/modelcontextprotocol/typescript-sdk | MIT | MCP JSON-RPC stdio/SSE engine |
| `OS-AGNT-02` | **OpenCode AI Terminal Agent** | https://github.com/anomalyco/opencode | MIT | Local open-source agent integration |
| `OS-BROW-01` | **Microsoft Playwright** | https://github.com/microsoft/playwright | Apache-2.0 | Headless multi-viewport runner |
| `OS-A11Y-01` | **Deque axe-core** | https://github.com/dequelabs/axe-core | MPL-2.0 | Programmatic DOM a11y checking |
| `OS-A11Y-02` | **@axe-core/playwright** | https://github.com/dequelabs/axe-core-npm | MPL-2.0 | Headless browser a11y injection |
| `OS-D2C-06` | **ast-grep** | https://github.com/ast-grep/ast-grep | MIT | High-performance AST code search |
| `OS-D2C-07` | **Babel AST Parser** | https://github.com/babel/babel | MIT | Read-only TSX/JSX AST parsing |
| `OS-COMP-01` | **shadcn/ui** | https://github.com/shadcn-ui/ui | MIT | Uncompiled component registry |
| `OS-COMP-02` | **Radix UI Primitives** | https://github.com/radix-ui/primitives | MIT | Headless interactive state machines |
| `OS-COMP-03` | **Adobe React Spectrum (Aria)**| https://github.com/adobe/react-spectrum | Apache-2.0 | Enterprise a11y & touch hooks |
| `OS-DASH-03` | **TanStack Table** | https://github.com/TanStack/table | MIT | Headless data table state engine |
| `OS-TOKN-02` | **Style Dictionary** | https://github.com/style-dictionary/style-dictionary | Apache-2.0 | Multi-platform token compiler |
| `OS-TOKN-03` | **Open Props** | https://github.com/argyleink/open-props | MIT | CSS custom property tokens |
| `OS-TOKN-04` | **Tailwind CSS v4** | https://github.com/tailwindlabs/tailwindcss | MIT | Utility CSS engine & `@theme` |
| `OS-ANIM-01` | **Motion (Framer Motion)** | https://github.com/motiondivision/motion | MIT | Declarative React physics engine |
| `OS-ICON-01` | **Lucide Icons** | https://github.com/lucide-icons/lucide | ISC | Primary vector icon library |
| `OS-CHRT-01` | **Recharts** | https://github.com/recharts/recharts | MIT | Declarative React SVG charts |
| `OS-VREG-01` | **Mapbox pixelmatch** | https://github.com/mapbox/pixelmatch | ISC | Fast pixel image comparison |
| `OS-LAYT-01` | **React Resizable Panels** | https://github.com/bvaughn/react-resizable-panels | MIT | Accessible split-pane layouts |
| `OS-TYPO-04` | **Inter Font** | https://github.com/rsms/inter | SIL OFL 1.1 | Open-source screen typeface |

---

## 3. Academic Papers & Benchmark Literature

1. **UI-Bench (arXiv:2508.20410)**: *Evaluating AI Coding Agents on User Interface Design and Usability*. Used as benchmark context establishing variance in AI-generated visual design quality.
2. **WebAIM Million Report (2025/2026)**: *An accessibility evaluation of the top 1,000,000 home pages*. Provides empirical baseline context on the prevalence of unlabelled form controls, contrast failures, and missing ARIA landmarks across the web.
