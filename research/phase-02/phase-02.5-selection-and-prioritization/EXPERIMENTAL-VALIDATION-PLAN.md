# UIForge Phase 02.5: Experimental Validation Plan

**Document ID:** `UIF-PH02.5-EXPERIMENTAL-VALIDATION-PLAN`  
**Classification:** Empirical Testing & Architecture De-risking Protocols  
**Status:** Certified / Complete  
**Date:** November 2026  

---

## 1. Overview

While Phase 02.5 is primarily a decision-documentation phase, major architectural commitments require concrete empirical experiments before full production implementation.

---

## 2. Experimental Protocols (E1 through E8)

### Experiment E1: AST Analysis, Recovery Boundaries & Surgical Mutation (Findings C15 & C22)
- **Hypothesis:** Native TypeScript Compiler API wrapped with write-ahead logging (WAL) performs AST mutations with 100% comment and formatting preservation, while ast-grep accelerates multi-file pattern discovery by >10x compared to full compiler passes.
- **Candidates:** Native TypeScript Compiler API vs. `ast-grep` (`OS-D2C-06`) vs. Babel 6-stage pipeline (`OS-D2C-07`).
- **Fixture Verification:** Tested via `scripts/verify_babel_recovery.js`:
  - *Recoverable:* Unclosed JSX elements, missing property commas, missing semicolons produce navigable partial AST with errors logged to `ast.errors`.
  - *Fatal / WAL Hold:* Unterminated template literals and mismatched expression parentheses throw fatal `SyntaxError`, safely held by UIForge's token-stream WAL buffer.
  - *TypeScript Baseline Comparison:* Diagnostic comparator verifies that mutations introduce zero *new* regressions against baseline program state.

### Experiment E2: Multi-Primitive Headless Composition
- **Hypothesis:** Radix UI dialog and overlay primitives can be seamlessly composed with React Aria combobox and touch hooks without CSS specificity conflicts or double-event firing.
- **Candidates:** `radix-ui/primitives` (`OS-COMP-02`) + `react-spectrum / React Aria` (`OS-COMP-03`).
- **Metric:** Keyboard focus trap success, screen reader accessibility tree consistency, bundle size contribution.

### Experiment E3: DTCG 2025.10 Token Compilation via Style Dictionary v5.8.0 (Finding C14)
- **Hypothesis:** Style Dictionary v5.8.0 can parse hierarchical DTCG 2025.10 design token JSON natively on Node.js 22 LTS and compile losslessly into Tailwind v4 native CSS variables (`@theme` block).
- **Candidates:** `DTCG` (`OS-TOKN-01`) + `style-dictionary` v5.8.0 (`OS-TOKN-02`) + `tailwindcss` v4 (`OS-TOKN-04`).
- **Metric:** Zero precision loss on fluid clamp values, dark mode variable cascade resolution, compilation time < 250ms.

### Experiment E4: Sandboxed Browser Automation & axe-core Evaluation (Finding C17)
- **Hypothesis:** Playwright running inside an isolated Docker container with an out-of-process `@axe-core/playwright` runner can evaluate a 10-page application in <15 seconds with zero host filesystem exposure.
- **Candidates:** `playwright` (`OS-BROW-01`) + `axe-core` (`OS-A11Y-01`) + `pixelmatch` (`OS-VREG-01`).
- **Metric:** Execution latency, memory isolation, deterministic detection of injected WCAG contrast and ARIA defects.

### Experiment E5: Model Context Protocol (MCP) Modern Discovery & Version Negotiation (Findings C13, C20, C24)
- **Hypothesis:** `@modelcontextprotocol/server` (^2.1.0, evaluated v2.1.1) successfully executes modern stateless discovery via `server/discover` with per-request `_meta` versioning (2026-07-28), and gracefully falls back via `versionNegotiation: { mode: "auto" }` to legacy stateful handshake revisions (`2025-11-25` and `2024-11-05`).
- **Candidates:** `@modelcontextprotocol/server` (^2.1.0, `OS-AGNT-01`) + `opencode` (`OS-AGNT-02`).
- **Metric:** Discovery endpoint response latency, handshake fallback fidelity, prompt context efficiency (<2,000 tokens), tool invocation success rate.

### Experiment E6: Registry Provenance & Tamper-Evident Digest Verification
- **Hypothesis:** Local SHA-256 cryptographic verification of registry component manifests prevents malicious or altered source injection with 0% false positives.
- **Candidates:** Phase 02.4 Provenance Manifest (`data/provenance.json`).
- **Metric:** Digest calculation latency (<5ms per component), tamper detection accuracy (100%).

### Experiment E7: Chart Library Bundle Size & Rendering Benchmark (Finding C16)
- **Hypothesis:** Tree-shaken modular Visx primitives achieve ~15–20 KB bundle footprint under Rollup/Vite production builds compared to ~50 KB for monolithic chart bundles.
- **Candidates:** `recharts` (`OS-CHRT-01`) vs `visx` (`OS-CHRT-04`).
- **Fixture:** Production Vite 6.x build with Brotli/Gzip compression measuring `@visx/shape`, `@visx/scale`, `@visx/axis` vs Recharts line chart package.
- **Metric:** Wire size (KB), SVG DOM node count, initial render latency (ms).

### Experiment E8: React-Grid-Layout 6-Test Accessibility Verification (Finding C19)
- **Hypothesis:** React-Grid-Layout (v2.3.0, `OS-DASH-05`) can be retrofitted with an accessible wrapper layer meeting all 6 test requirements:
  1. Keyboard drag-and-drop navigation (Space/Enter grab, Arrow keys to reposition, Esc to cancel).
  2. Focus management (logical focus order retention during/after layout mutation).
  3. Accessible announcements (`aria-live="polite"` coordinate updates).
  4. Touch interactions (disambiguating drag gestures from mobile viewport scrolling).
  5. Screen-reader hierarchy (semantic `role="grid"` / `role="gridcell"` structure).
  6. Reduced-motion behavior (`prefers-reduced-motion` transition bypass).
- **Metric:** Automated axe-core score, NVDA/VoiceOver manual audit pass rate.
