# UIForge Phase 02.2 — Workstream 1: Empirical Evidence & Experiment Audit Trail

**Document Identifier:** `UIF-PH02-WS1-EVIDENCE`  
**Parent Workstream:** Phase 02.2 WS-1: Project Intelligence & Safe Code Transformation  
**Execution Date:** November 21, 2026  
**Environment:** Node.js (Windows x64), V8 Engine  
**Fixture Path:** `research/phase-02/experiments/ws1-experiments/fixtures/`  
**Runner Script:** `research/phase-02/experiments/ws1-experiments/run_experiments.cjs`  
**Raw Results:** `research/phase-02/experiments/evidence/ws1-execution-results.json`

---

## 1. Executive Summary & Evidence Classification

This document records the empirical results, test fixtures, and verification outcomes for the seven experimental proofs (E1–E7) conducted during **Workstream 1 (Project Intelligence & Safe Code Transformation)**.

All claims adhere strictly to UIForge Evidence Classification standards:
- `[PRODUCT-TESTED]`: Empirically validated via deterministic execution script in a clean local Node.js environment.
- `[REPORTED-SIMULATION]`: Validated on an isolated synthetic Next.js fixture project; caveats apply for enterprise monorepos.
- `[DOC-VERIFIED]`: Derived from published technical RFCs, package manifests, or official vendor iteration plans.
- `[PLANNED]` / `[UNVERIFIED IN PRODUCTION]`: Architectural capability designed for future engine layers, pending large-scale validation.

---

## 2. Test Environment & Fixture Specification

The test environment simulates a modern React 19 / Next.js App Router brownfield application with TypeScript:

```text
fixtures/
├── tsconfig.json                      # Target ES2022, moduleResolution: bundler, strict: true
├── app/
│   └── dashboard/
│       └── page.tsx                   # Multi-component dashboard page consuming UI primitives
├── components/
│   ├── dashboard/
│   │   └── kpi-card.tsx               # Structured component with discriminated union props
│   └── ui/
│       └── card.tsx                   # Low-level container primitive
└── lib/
    └── utils.ts                       # Class merging utility (clsx + twMerge)
```

---

## 3. Experiment Records (E1 – E7)

### Experiment E1: Multi-File Project Discovery & AST Indexing
- **Classification:** `[PRODUCT-TESTED]`
- **Objective:** Discover all relevant project source files and index AST trees.
- **Outcome:** Indexed 5 project files in **2.5ms**.
- **Evidence:**
  ```json
  {
    "fileCount": 5,
    "files": [
      "app/dashboard/page.tsx",
      "components/dashboard/kpi-card.tsx",
      "components/ui/card.tsx",
      "lib/utils.ts",
      "tsconfig.json"
    ],
    "durationMs": 2.544
  }
  ```

### Experiment E2: Type-Aware Component Prop Validation
- **Classification:** `[PRODUCT-TESTED]`
- **Objective:** Detect type mismatches against TypeScript union types without full build execution.
- **Tested Prop:** `trend="positive"` on `<KpiCard />` (where allowed union is `"up" | "down" | "neutral" | undefined`).
- **Outcome:** Correctly caught diagnostic error **`TS2322`** (*Type '"positive"' is not assignable to type '"up" | "down" | "neutral" | undefined'*).
- **Finding:** Programmatic type checking prevents coding agents from introducing invalid JSX attributes into commercial components.

### Experiment E3: Structural Semantic Search via AST Pattern Matching
- **Classification:** `[PRODUCT-TESTED]`
- **Objective:** Locate all JSX invocations of `<KpiCard />` with arbitrary props while ignoring whitespace and comments.
- **Pattern:** `<KpiCard $$$PROPS />`
- **Outcome:** Located all 3 component instances in `page.tsx` with 100% precision. Comments (`/* Formatted in USD */`) were retained in AST span mappings.

### Experiment E4: Non-Destructive Code Transformation (CST Preservation)
- **Classification:** `[PRODUCT-TESTED]`
- **Objective:** Insert `description="Healthy retention rate"` into an existing JSX element without mutating surrounding code, whitespace, or comments.
- **Outcome:** Exact surgical insertion. Pre-transformation SHA-256: `c42d0a8b...` -> Transformed SHA-256: `730ac628...`. Non-targeted lines remained byte-for-byte identical.

### Experiment E5: Pre-Flight Concurrency & Drift Detection
- **Classification:** `[PRODUCT-TESTED]`
- **Objective:** Verify UIForge Rule 1: *Never overwrite unrelated user work*. Detect out-of-band file modifications prior to AST write.
- **Test Sequence:**
  1. Record expected file hash: `c42d0a8b...`.
  2. Simulate concurrent user modification (altering file content directly on disk).
  3. Pre-write check detects hash mismatch: disk hash is `a072822e...`.
- **Outcome:** Transaction aborted immediately. Overwrite prevented.

### Experiment E6: Single-File Transactional Rollback
- **Classification:** `[PRODUCT-TESTED]`
- **Objective:** Verify automatic restoration of modified source files when an operation crashes midway.
- **Outcome:** File restored to exact initial hash `c42d0a8b...` (100% hash parity verified).

### Experiment E7: Honest Boundary Acknowledgment & Unmanaged External State
- **Classification:** `[REPORTED-SIMULATION]` & `[DOC-VERIFIED]`
- **Objective:** Document and enforce UIForge Rule 2 and Rule 3: *Atomicity must be scoped honestly; do not claim rollback restores everything unless it actually does*.
- **Reported Scope:**
  - Filesystem files: **RESTORED** (Reverted `app/dashboard/page.tsx`).
  - NPM Cache: **MODIFIED** (Explicitly reported as unmanaged external state; local tarball cache cannot be rolled back by filesystem journal).
  - Package Lock: **INSPECT_REQUIRED** (No speculative lockfile writes occurred).

---

## 4. Boundaries, Limitations & Missing Evidence

1. **Large Monorepo Throughput (`[UNVERIFIED IN PRODUCTION]`):**  
   The experiment was executed against a micro-fixture (5 files). Benchmark throughput on 10,000+ file enterprise repositories with complex tsconfig path mappings has not yet been benchmarked on TypeScript 7.1 Beta and remains scheduled for Phase 02.4.
2. **TypeScript 7.1 Stable API (`[PLANNED]`):**  
   Evaluations are based on TypeScript 7.1 Beta specifications. The final stable API release is scheduled for November 24, 2026. Production dependency pinning remains `@typescript/typescript6@6.0.2` until post-release validation.
