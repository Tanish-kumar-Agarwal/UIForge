# UIForge Phase 02.5: Experimental Validation Plan

**Document ID:** `UIF-PH02.5-EXPERIMENTAL-VALIDATION-PLAN`  
**Classification:** Empirical Testing & Architecture De-risking Protocols  
**Status:** Certified / Complete  
**Date:** November 2026  

---

## 1. Overview

While Phase 02.5 is primarily a decision-documentation phase, major architectural commitments require concrete empirical experiments before full production implementation.

---

## 2. Experimental Protocols (E1 through E6)

### Experiment E1: AST Analysis & Surgical Mutation Benchmark
- **Hypothesis:** Native TypeScript Compiler API wrapped with write-ahead logging (WAL) performs AST mutations with 100% comment and formatting preservation, while ast-grep accelerates multi-file pattern discovery by >10x compared to full compiler passes.
- **Candidates:** Native TypeScript Compiler API vs. `ast-grep` (`OS-D2C-06`) vs. Babel (`OS-D2C-07`).
- **Fixture:** Representative Next.js 15 repository (150 components).
- **Metric:** Traversal time (ms), memory footprint (MB), formatting roundtrip fidelity (zero unwanted diffs).

### Experiment E2: Multi-Primitive Headless Composition
- **Hypothesis:** Radix UI dialog and overlay primitives can be seamlessly composed with React Aria combobox and touch hooks without CSS specificity conflicts or double-event firing.
- **Candidates:** `radix-ui/primitives` (`OS-COMP-02`) + `react-spectrum / React Aria` (`OS-COMP-03`).
- **Fixture:** Brownfield React 19 test harness with conflicting Tailwind and CSS Modules setups.
- **Metric:** Keyboard focus trap success, screen reader accessibility tree consistency, bundle size contribution.

### Experiment E3: DTCG 2025.10 Token Compilation to Tailwind v4
- **Hypothesis:** Style Dictionary can parse hierarchical DTCG 2025.10 design token JSON and compile losslessly into Tailwind v4 native CSS variables (`@theme` block).
- **Candidates:** `DTCG` (`OS-TOKN-01`) + `style-dictionary` (`OS-TOKN-02`) + `tailwindcss` v4 (`OS-TOKN-04`).
- **Metric:** Zero precision loss on fluid clamp values, dark mode variable cascade resolution, compilation time < 250ms.

### Experiment E4: Sandboxed Browser Automation & axe-core Evaluation
- **Hypothesis:** Playwright running inside an isolated Docker container with an out-of-process `@axe-core/playwright` runner can evaluate a 10-page application in <15 seconds with zero host filesystem exposure.
- **Candidates:** `playwright` (`OS-BROW-01`) + `axe-core` (`OS-A11Y-01`) + `pixelmatch` (`OS-VREG-01`).
- **Metric:** Execution latency, memory isolation, deterministic detection of injected WCAG contrast and ARIA defects.

### Experiment E5: Model Context Protocol (MCP) Efficiency
- **Hypothesis:** Exposing UIForge's design token graph and component registry via an MCP server consumes <2,000 prompt tokens while providing AI coding agents with 100% accurate component prop specifications.
- **Candidates:** `modelcontextprotocol/typescript-sdk` (`OS-AGNT-01`) + `opencode` (`OS-AGNT-02`).
- **Metric:** Prompt context efficiency, tool invocation success rate, hallucination reduction percentage.

### Experiment E6: Registry Provenance & Tamper-Evident Digest Verification
- **Hypothesis:** Local SHA-256 cryptographic verification of registry component manifests prevents malicious or altered source injection with 0% false positives.
- **Candidates:** Phase 02.4 Provenance Manifest (`data/provenance.json`).
- **Metric:** Digest calculation latency (<5ms per component), tamper detection accuracy (100%).
