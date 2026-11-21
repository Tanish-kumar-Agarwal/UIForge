# UIForge Phase 02.2 — Workstream 4 Evidence Directory

**Directory:** `research/phase-02/phase-02.2-technical-audit/ws4-evidence/`  
**Parent Workstream:** Phase 02.2 WS-4: Browser Verification, Visual Quality & Automated Frontend Testing  
**Status:** COMPLETE & AUDITED  
**Execution Date:** November 21, 2026  

---

## 1. Directory Contents

This directory contains the executable experiment runner, raw execution outputs, and empirical audit trail for Workstream 4:

1. **`README.md`**: This orientation guide.
2. **`run_ws4_experiments.cjs`**: Self-contained Node.js experiment runner executing experiments E1 through E8 deterministically using standard built-ins (`fs`, `path`, `crypto`, `perf_hooks`).
3. **`ws4-execution-results.json`**: Captured raw JSON output from the execution of `run_ws4_experiments.cjs`.
4. **`ws4-evidence.md`**: Complete analytical evidence register detailing hypotheses, execution methodologies, results, and explicit evidence classification tags (`[LOCAL-HARNESS-TESTED]`, `[DOC-VERIFIED]`, `[SOURCE-VERIFIED]`, `[NOT-ESTABLISHED]`, `[REPORTED-SIMULATION]`).

---

## 2. Reproducibility Instructions

To reproduce all local harness experiments:

```bash
# From workspace root
node research/phase-02/phase-02.2-technical-audit/ws4-evidence/run_ws4_experiments.cjs
```

The script executes without external npm dependencies and outputs structured JSON results for E1–E8 in under 10 milliseconds.
