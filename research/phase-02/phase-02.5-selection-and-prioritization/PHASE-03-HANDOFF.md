# UIForge Phase 02.5 to Phase 03: Architectural Handoff Specification

**Document ID:** `UIF-PH02.5-PHASE-03-HANDOFF`  
**Classification:** Phase Transition Roadmap & Implementation Prerequisites  
**Status:** Certified / Complete  
**Date:** November 2026  

---

## 1. Executive Handoff Statement

Phase 02.5 successfully concludes the exploratory, audit, licensing, and selection phases of **Phase 02 (Open-Source Ecosystem, Technical Architecture & Supply-Chain Validation)**.

UIForge is now equipped with an authoritative, evidence-backed technology foundation and is prepared to transition to **Phase 03: Core Platform Architecture, Monorepo Setup & Integration Engine Specification**.

---

## 2. Handoff Classification of Decisions

### 2.1 Decisions Ready for Implementation Planning (Phase 03 Core Foundation)
The following 24 Tier 0 selections are frozen and ready for architecture specification:
1. **Component Primitives:** `radix-ui/primitives` (`OS-COMP-02`) + `react-spectrum / React Aria` (`OS-COMP-03`).
2. **Component Emission Format:** `shadcn-ui/ui` (`OS-COMP-01`) source-copy model.
3. **Design Tokens & Styling:** `tailwindcss` v4 (`OS-TOKN-04`), `DTCG 2025.10` (`OS-TOKN-01`), `style-dictionary` v5.8.0 (`OS-TOKN-02`), and `container-queries` (`OS-LAYT-02`).
4. **Browser Testing & Evaluation:** `playwright` (`OS-BROW-01`), `axe-core` (`OS-A11Y-01`, out-of-process CLI; release blocked pending counsel clearance), and `pixelmatch` (`OS-VREG-01`).
5. **Agent Connectivity:** `@modelcontextprotocol/server` (^2.1.0; `OS-AGNT-01`) with 2026-07-28 / 2024-11-05 wire protocol negotiation.
6. **Core UI Controls & Typefaces:** `motion` (`OS-ANIM-01`), `TanStack Table` (`OS-DASH-03`), `recharts` (`OS-CHRT-01`), `lucide-icons` (`OS-ICON-01`), `react-resizable-panels` (`OS-LAYT-01`), and `Inter` / `Geist` (`OS-TYPO-04/05`, SIL OFL 1.1 RFN notice preservation).

### 2.2 Decisions Requiring Pre-Implementation Experiments (Phase 03 Prep)
Before freezing final monorepo dependency boundaries, execute experiments E1 through E8:
- **E1 (AST Engine):** Benchmark native TS Compiler API vs ast-grep vs Babel 6-stage pipeline.
- **E3 (Token Pipeline):** Test DTCG 2025.10 compilation into Tailwind v4 `@theme` blocks via Style Dictionary v5.8.0.
- **E4 (Sandbox Execution):** Validate Docker-isolated Playwright execution latency.
- **E5 (MCP Handshake):** Validate wire protocol negotiation for `2026-07-28` with fallback to `2024-11-05`.
- **E7 (Chart Bundle):** Measure tree-shaken Visx wire footprint (~15–20 KB preliminary estimate) under production Vite build.
- **E8 (Dashboard Grid):** Verify React-Grid-Layout 6-test accessibility matrix.

### 2.3 Decisions Awaiting Formal Legal Counsel Sign-off
- **axe-core (`OS-A11Y-01`):** Classified as `CONDITIONALLY ADOPT — RELEASE BLOCKED PENDING COUNSEL CLEARANCE`. Formal counsel confirmation of out-of-process user-managed CLI invocation model required before production distribution.
- **pa11y (`OS-A11Y-05`):** Gated in Tier 4 Deferred pending LGPL-3.0 dynamic linking opinion (`LEG-02`).
- **GSAP (`OS-ANIM-04`):** Preserved in Tier 2 Optional Plugin Emission under Webflow April 2025 non-compete terms.

---

## 3. Recommended Phase 03 Implementation Sequence

1. **Step 1: Monorepo & Toolchain Initialization:** Configure Turborepo + pnpm workspaces with strict TypeScript strictness, Node.js 22 LTS, and Biome/ESLint linting.
2. **Step 2: Core Platform Schema Definitions:** Implement Zod contracts for DTCG design tokens, component registry manifests, and AST patch journals.
3. **Step 3: AST Engine & Patch Recovery Engine:** Implement Gate 1 TypeScript Compiler API visitor and Gate 2 Write-Ahead Log (WAL) transaction manager with Babel 6-stage fallback pipeline.
4. **Step 4: Model Context Protocol (MCP) Server:** Implement UIForge MCP server using `@modelcontextprotocol/server` (^2.1.0) exposing AST inspection and component discovery tools to AI coding agents via 2026-07-28 / 2024-11-05 wire protocol.
5. **Step 5: Browser Verification Sandbox:** Implement Docker containerized Playwright + axe-core + Pixelmatch evaluation service.

**Phase 02.5 is concluded. Phase 03 is ready for authorization.**
