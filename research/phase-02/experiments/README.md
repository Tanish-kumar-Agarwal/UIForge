# UIForge Phase 02 — Empirical Experiments & Reproducible Evidence

**Directory:** `research/phase-02/experiments/`  
**Phase:** 02.2 — Open-Source Ecosystem & Technical Architecture Research  
**Status:** AUDITED & REPRODUCIBLE  
**Environment:** Node.js (Windows x64 / POSIX)  

---

## 1. Overview

This directory preserves the empirical testing infrastructure, fixture projects, and captured execution evidence developed during **UIForge Phase 02.2 (Technical Repository Audit & Architecture)**.

To uphold UIForge's core engineering principle of **Evidence Over Assumptions**, all key architectural claims are backed by self-contained, reproducible scripts that execute without network access or heavy external dependencies.

---

## 2. Directory Structure

```text
research/phase-02/experiments/
├── README.md                          # This index and execution guide
├── ws1-experiments/                   # Workstream 1: Project Intelligence & AST
│   ├── run_experiments.cjs           # Self-contained Node.js experiment runner (E1–E7)
│   └── fixtures/                      # Next.js App Router style test project
│       ├── tsconfig.json
│       ├── app/dashboard/page.tsx
│       ├── components/dashboard/kpi-card.tsx
│       ├── components/ui/card.tsx
│       └── lib/utils.ts
├── ws3-experiments/                   # Workstream 3: Registry, DTCG & Styling
│   └── run_ws3_unified_suite.cjs      # Unified experiment suite for E1–E8
├── ws4-experiments/                   # Workstream 4: Browser, A11y & Testing
│   └── run_ws4_experiments.cjs        # Standalone experiment runner for E1–E8
├── ws5-experiments/                   # Workstream 5: AI Agent Arch, MCP & Tooling
│   ├── README.md
│   └── run_ws5_experiments.cjs        # Standalone experiment runner for E1–E10
└── evidence/                          # Captured benchmark data and audit trails
    ├── ws1-execution-results.json     # Captured JSON stdout from WS-1 runner
    ├── ws1-evidence.md                # Comprehensive evidence audit for WS-1
    ├── ws3-execution-results.json     # Captured JSON stdout from WS-3 runner
    ├── ws3-evidence.md                # Comprehensive evidence audit for WS-3
    ├── ws4-execution-results.json     # Captured JSON stdout from WS-4 runner
    ├── ws4-evidence.md                # Comprehensive evidence audit for WS-4
    ├── ws5-execution-results.json     # Captured JSON stdout from WS-5 runner
    └── ws5-evidence.md                # Comprehensive evidence audit for WS-5
```

---

## 3. How to Run the Experiments

All experiment suites run on any standard Node.js installation (Node >= 18.0) using standard built-in modules (`fs`, `path`, `crypto`, `perf_hooks`):

### Running WS-1 Experiments (Project Intelligence & Safe Transformation)
```bash
node research/phase-02/experiments/ws1-experiments/run_experiments.cjs
```
- **Tests Evaluated:**
  - `E1`: Multi-file AST project discovery and indexing.
  - `E2`: Type-aware diagnostic validation (catches `TS2322` union mismatch).
  - `E3`: Structural JSX pattern matching with trivia preservation.
  - `E4`: Non-destructive CST code insertion with byte-level fidelity.
  - `E5`: Pre-flight concurrency and drift detection (Rule 1).
  - `E6`: Single-file transactional rollback.
  - `E7`: Boundary acknowledgment (Rule 2 & Rule 3: unmanaged npm cache state).

### Running WS-3 Experiments (Registry, Tokens & Styling Architecture)
```bash
node research/phase-02/experiments/ws3-experiments/run_ws3_unified_suite.cjs
```
- **Tests Evaluated:**
  - `E1`: shadcn Registry Specification schema validation (12 item types).
  - `E2`: W3C DTCG 2025.10 token ingestion (`components`, group `$type` inheritance, composite shadows).
  - `E3`: CSS Custom Property generation.
  - `E4`: Cross-paradigm emission (Tailwind v4 `@theme`, CSS Modules, Ant Design v5).
  - `E5`: Round-trip reversibility audit (Value vs. Semantic preservation).
  - `E6`: CSS specificity and cascade layer audit (`@layer components` vs. unlayered CSS Modules).
  - `E7`: Cycle detection and unresolved reference trapping.
  - `E8`: Multi-file journaled rollback (SHA-256 restoration across multiple files).

### Running WS-4 Experiments (Browser Verification, A11y & Testing)
```bash
node research/phase-02/experiments/ws4-experiments/run_ws4_experiments.cjs
```
- **Tests Evaluated:**
  - `E1`: Browser automation protocol architecture comparison (Playwright vs CDP vs BiDi).
  - `E2`: Visual comparison & bounding box dynamic content masking simulation.
  - `E3`: Responsive layout geometry (horizontal overflow, element occlusion, touch targets).
  - `E4`: Accessibility WCAG 2.2 AA contrast calculation and automation coverage boundary.
  - `E5`: Functional interaction state machine verification (dialog focus trapping & restore).
  - `E6`: Cross-browser rendering variance analysis (font metrics, OKLCH, scrollbar styling).
  - `E7`: Verification evidence schema & SHA-256 cryptographic provenance hashing.
  - `E8`: AI agent actionable diagnostic envelope generation for AST repair.

### Running WS-5 Experiments (AI Agent Arch, MCP & Tooling Integration)
```bash
node research/phase-02/experiments/ws5-experiments/run_ws5_experiments.cjs
```
- **Tests Evaluated:**
  - `E1`: Model Context Protocol (MCP) specification baseline (2026-07-28 & 2025-11-25) & modular v2 SDK architecture audit (`[DOC/SOURCE-VERIFIED]`).
  - `E2`: AI coding agent compatibility matrix across 5 clients (Claude, Cursor, Codex, Open, AGY) labeled DOCUMENTATION VERIFIED (`[DOC/SOURCE-VERIFIED]`).
  - `E3`: Strict JSON Schema & input boundary validation for tool parameters (`[LOCAL-HARNESS-TESTED]`).
  - `E4`: 5-layer context compression approximation harness result (**91.2% text reduction**) (`[LOCAL-HARNESS-TESTED]`).
  - `E5`: Multi-tier permission policy evaluation simulation (Levels 0–4 with scoped approval tokens) (`[LOCAL-HARNESS-TESTED]`).
  - `E6`: Untrusted code sanitization & inert packaging simulation (`[REPORTED-SIMULATION]`).
  - `E7`: In-memory session lifecycle state machine with idempotency duplicate trapping (`[REPORTED-SIMULATION]`).
  - `E8`: Single-agent vs. multi-agent coordination overhead: SIMULATED COST MODEL — NOT A LIVE AGENT BENCHMARK (**3.28x token bloat**) (`[REPORTED-SIMULATION]`).
  - `E9`: HASH-CHAIN AND SELECTED REDACTION CASES (Bearer tokens, passwords; noting external anchoring requirement) (`[LOCAL-HARNESS-TESTED]`).
  - `E10`: Simulated JSON-RPC 2.0 stdio loopback — Not a Real MCP Process Integration Test (`[REPORTED-SIMULATION]`).

---

## 4. Evidence Classification Standards

Every claim in the accompanying reports is tagged:
- `[LOCAL-HARNESS-TESTED]`: Empirically validated via deterministic execution script in a clean local Node.js environment.
- `[REPORTED-SIMULATION]`: Validated on controlled synthetic scenarios.
- `[DOC/SOURCE-VERIFIED]`: Derived from published technical specifications or official SDK code.
- `[NOT-ESTABLISHED]`: Requires external daemon or multi-tenant infrastructure not running locally.
- `[PLANNED]`: Architectural capabilities designed for future engine layers.
