# UIForge Phase 02.2 — Workstream 3: Empirical Evidence & Experiment Audit Trail

**Document Identifier:** `UIF-PH02-WS3-EVIDENCE`  
**Parent Workstream:** Phase 02.2 WS-3: Registry, Design Tokens & Styling Architecture  
**Execution Date:** November 21, 2026  
**Environment:** Node.js (Windows x64), V8 Engine  
**Runner Script:** `research/phase-02/experiments/ws3-experiments/run_ws3_unified_suite.cjs`  
**Raw Results:** `research/phase-02/experiments/evidence/ws3-execution-results.json`

---

## 1. Executive Summary & Evidence Classification

This document records the empirical results and test verification outcomes for the eight experimental proofs (E1–E8) conducted during **Workstream 3 (Registry, Design Tokens, Transformation Infrastructure & Cross-Paradigm Styling Architecture)**.

All claims adhere strictly to UIForge Evidence Classification standards:
- `[PRODUCT-TESTED]`: Empirically validated via deterministic execution script in a clean local Node.js environment.
- `[REPORTED-SIMULATION]`: Validated on controlled token schemas and synthetic styling fixtures.
- `[DOC-VERIFIED]`: Derived from published technical specifications (W3C DTCG 2025.10, shadcn registry schema, Style Dictionary v5.8.0 release notes).
- `[PLANNED]` / `[UNVERIFIED IN PRODUCTION]`: Capabilities targeted for future engine integration.

---

## 2. Experiment Records (E1 – E8)

### Experiment E1: shadcn Registry Specification Interoperability Validation
- **Classification:** `[PRODUCT-TESTED]`
- **Objective:** Validate registry manifest against official `registry-item.json` schema supporting all 12 item types (`registry:base`, `registry:component`, `registry:font`, `registry:page`, `registry:file`, `registry:style`, `registry:theme`, `registry:item`, `registry:ui`, `registry:block`, `registry:hook`, `registry:lib`).
- **Outcome:** 
  - Valid `registry:component` fixture passed validation cleanly.
  - Invalid fixture was correctly rejected with 3 specific diagnostic errors:
    1. Missing required field `name`.
    2. Invalid item type `registry:unsupported_custom_type`.
    3. Field `files` must be an array.

### Experiment E2: W3C DTCG 2025.10 Normalization & Group Inheritance
- **Classification:** `[PRODUCT-TESTED]`
- **Objective:** Ingest DTCG 2025.10 tokens; verify group-level `$type` inheritance, composite shadow arrays, and alias resolution.
- **Specification Invariant Verified:** Canonical color object uses **`components`** (not `channels`):
  ```json
  {
    "$type": "color",
    "$value": { "colorSpace": "oklch", "components": [0.65, 0.24, 258.2], "alpha": 1 }
  }
  ```
- **Outcome:** Successfully resolved alias `{color.primitive.blue.500}` to `#3b82f6`, propagated parent group `$type: "color"` down to leaf tokens, and normalized multi-layer shadow arrays.

### Experiment E3: CSS Custom Property Generation
- **Classification:** `[PRODUCT-TESTED]`
- **Objective:** Serialize normalized design tokens into standard CSS Custom Properties under `:root`.
- **Outcome:** Emitted clean `:root` definitions with valid hyphenated variable names (`--color-primitive-blue-500: #3b82f6;`, `--color-semantic-action-primary: #3b82f6;`, multi-layer shadow declarations).

### Experiment E4: Cross-Paradigm Multi-Target Output Generation
- **Classification:** `[PRODUCT-TESTED]`
- **Objective:** Compile single normalized token graph into three distinct styling targets:
  1. **Tailwind v4:** Emitted `@theme` block with CSS custom properties.
  2. **CSS Modules:** Emitted global custom properties in `:root` and scoped class selectors in `.module.css` consuming `var(...)`.
  3. **Ant Design v5:** Emitted typed JavaScript theme configuration (`colorPrimary`, `colorBgBase`, `borderRadius`).
- **Outcome:** All three targets generated syntactically valid code matching target framework conventions.

### Experiment E5: Round-Trip Reversibility Audit (Value vs. Semantic Preservation)
- **Classification:** `[PRODUCT-TESTED]`
- **Objective:** Audit round-trip conversion: `DTCG JSON ➔ CSS ➔ DTCG JSON`.
- **Outcome:**
  - **Value Preserved:** `true` (Visual hex color `#3b82f6` matches).
  - **Semantic Preserved:** `false` (DTCG `$description`, alias links, and composite shadow array collapsed into literal string).
- **Classification:** `APPROXIMATE_RECOVERY_WITH_METADATA_LOSS`.

### Experiment E6: Styling Cascade & Specificity Verification
- **Classification:** `[PRODUCT-TESTED]`
- **Objective:** Determine specificity conflict outcome when Tailwind utilities in `@layer components` interact with unlayered CSS Modules.
- **Outcome:** In accordance with CSS Cascade Level 5 specifications, unlayered CSS Modules take precedence over `@layer` utilities regardless of document source order.
- **Mitigation Documented:** CSS Modules must be wrapped in explicit cascade layers or isolated from utility overrides to prevent styling bugs.

### Experiment E7: Graph Cycle & Unresolved Reference Trapping
- **Classification:** `[PRODUCT-TESTED]`
- **Objective:** Verify safe termination when encountering circular aliases (`nodeA ➔ nodeB ➔ nodeA`) or dangling token references.
- **Outcome:** Trapped circular loop safely via visited node stack, throwing `GraphCycleError` with zero stack overflow. Dangling references were intercepted and flagged with diagnostic reports.

### Experiment E8: Multi-File Journaled Rollback
- **Classification:** `[PRODUCT-TESTED]`
- **Objective:** Verify transactional restoration across multiple touched files (`styles/globals.css`, `theme/tokens.ts`) when an error occurs during multi-file token writing.
- **Outcome:**
  - Initial `globals.css` SHA-256: `f0825cde...` -> Post-Rollback: `f0825cde...` (100% Match).
  - Initial `tokens.ts` SHA-256: `37b78855...` -> Post-Rollback: `37b78855...` (100% Match).
  - Pristine filesystem recovery verified.

---

## 3. Boundaries, Limitations & Missing Evidence

1. **Complex Dynamic Math Expressions (`[REPORTED-SIMULATION]`):**  
   CSS `calc()` expressions combining mixed dynamic units (e.g. `calc(100vw - 2rem)`) cannot be statically resolved into fixed dimension numbers in DTCG without runtime viewport context.
2. **Extreme Scale Multi-Brand Compilation (`[UNVERIFIED IN PRODUCTION]`):**  
   While Style Dictionary v5.8.0 handles standard enterprise palettes, compilation benchmarks across >10,000 multi-brand, multi-density permutations are scheduled for Phase 02.4.
