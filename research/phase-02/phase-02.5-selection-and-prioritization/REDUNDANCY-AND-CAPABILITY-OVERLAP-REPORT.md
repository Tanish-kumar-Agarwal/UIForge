# UIForge Phase 02.5: Redundancy & Capability Overlap Report

**Document ID:** `UIF-PH02.5-REDUNDANCY-AND-CAPABILITY-OVERLAP-REPORT`  
**Classification:** Overlap Analysis, Pairwise Classification & Rationalization  
**Status:** Certified / Complete  
**Date:** November 2026  

---

## 1. Overlap Classification Matrix

To prevent technology accumulation and dependency bloat, competing technologies were evaluated using formal pairwise classifications:
- `DIRECT_ALTERNATIVE`: Solves the exact same problem at the same architectural layer. Only one should be chosen as default.
- `COMPLEMENTARY`: Solves different aspects of a domain; can be combined synergistically.
- `PARTIAL_OVERLAP`: Overlaps in a subset of features; requires explicit boundary demarcation.
- `DIFFERENT_LAYER`: Operates at different levels of the software stack (e.g. specification vs build compiler).
- `NOT_COMPARABLE`: Solves fundamentally unrelated engineering problems.

---

## 2. Key Pairwise Rationalizations

| Pairwise Comparison | Classification | Architectural Analysis & Selection Decision |
| :--- | :---: | :--- |
| **TypeScript Compiler API vs. ts-morph** | `DIRECT_ALTERNATIVE` | **Decision: Wrap TypeScript Compiler API directly.** ts-morph adds an external dependency wrapper that lags behind new TS language features. Native TS Compiler API provides 100% type-checking fidelity with zero third-party bloat. |
| **ast-grep vs. TypeScript Compiler API** | `COMPLEMENTARY` | **Decision: Combine.** ast-grep provides ultra-fast pattern searching and structural AST grepping across thousands of files. TS Compiler API handles in-depth semantic type checking, symbol resolution, and surgical AST patching. |
| **Radix UI vs. Base UI vs. React Aria** | `PARTIAL_OVERLAP` | **Decision: Multi-primitive foundation.** Radix UI is adopted for standard DOM composable overlays (dialogs, dropdowns, popovers). React Aria is adopted for complex interactive states requiring advanced touch and keyboard state machines (comboboxes, date pickers, number steppers). |
| **shadcn/ui vs. Monolithic UI Frameworks** | `DIFFERENT_LAYER` | **Decision: Adopt shadcn/ui source-copy model.** Monolithic frameworks (Mantine, MUI) enforce heavy runtime wrappers. shadcn/ui emits raw Tailwind/JSX source directly into the project repository, leaving zero persistent runtime dependencies. |
| **DTCG vs. Style Dictionary** | `DIFFERENT_LAYER` | **Decision: Combine.** DTCG 2025.10 is the canonical JSON interchange format. Style Dictionary is the build-time compilation engine that reads DTCG tokens and generates CSS custom properties and Tailwind themes. |
| **Playwright vs. Puppeteer vs. Cypress** | `DIRECT_ALTERNATIVE` | **Decision: Select Playwright exclusively for Core.** Playwright supports Chromium, Firefox, and WebKit out of the box with built-in tracing, network mocking, and locator auto-waiting. Puppeteer is retained as an optional lightweight adapter; Cypress is redundant. |
| **Pixelmatch vs. Looks-Same** | `DIRECT_ALTERNATIVE` | **Decision: Select Pixelmatch for Core.** Pixelmatch has zero native dependencies and runs purely in JavaScript/Node. Looks-Same is supported as an optional adapter where specialized antialiasing curve tolerance is required. |
| **Model Context Protocol SDK vs. LangGraph** | `DIFFERENT_LAYER` | **Decision: Select MCP SDK.** MCP defines the open client/server communication standard. LangGraph is a workflow graph library that can operate as an optional consumer of UIForge MCP tools. |
| **Lucide vs. Heroicons vs. Tabler Icons** | `DIRECT_ALTERNATIVE` | **Decision: Select Lucide as canonical default.** Lucide provides the cleanest, most consistent 24x24 stroke aesthetic and comprehensive icon coverage. Heroicons and Tabler are supported as secondary user-selectable registries. |
| **Motion vs. GSAP** | `DIRECT_ALTERNATIVE` | **Decision: Motion for core; GSAP for optional emission.** Motion is fully permissive (MIT) with clean React hooks. GSAP is restricted by Webflow commercial terms (non-compete for visual builders) and is enabled only as an optional secondary code emission plugin. |
