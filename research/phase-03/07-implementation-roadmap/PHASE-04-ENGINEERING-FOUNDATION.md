# UIFORGE — PHASE 03: PHASE 04 ENGINEERING FOUNDATION SPECIFICATION
## Phase 04 Execution Blueprint, Monorepo Scaffolding, Package Handoff & Quality Gates

**Document ID:** `UIF-PH03-PHASE-04-SPECIFICATION`  
**Phase:** 03 — Product Specification & Architecture Freeze  
**Status:** Certified / Complete  
**Date:** November 22, 2026  
**Standard:** Principal Software Architect & Principal Engineering Manager  

---

## 1. Executive Mission for Phase 04

Phase 04 represents the transition from **Research & Architecture Specification** into **Production Software Engineering**.

The objective of Phase 04 is to construct the foundational `@uiforge/*` monorepo, implement all Level A (MVP) packages, establish the automated test pipelines, and deliver the working vertical slice of UIForge.

Phase 04 does **not** design architecture or invent requirements. It executes the frozen specifications established in Phase 03.

---

## 2. Phase 04 Implementation Packages Scope

```
packages/
├── contracts/             # Phase 04.1: Canonical Zod schemas & TypeScript types
├── storage/               # Phase 04.2: .uiforge/ state, snapshots & SQLite store
├── security/              # Phase 04.2: 5-level security ladder & HMAC token signer
├── project-intelligence/  # Phase 04.2: Non-destructive AST parser & route extractor
├── tokens/                # Phase 04.2: W3C DTCG parser & Style Dictionary v5.8 compiler
├── component-registry/    # Phase 04.3: shadcn source-copy model & Phase 02.4 source query
├── safe-modifier/         # Phase 04.3: Coordinate slice patcher, WAL engine & TS comparator
├── browser-eval/          # Phase 04.4: Playwright runner, pixelmatch & axe-core testing
├── eval/                  # Phase 04.4: Finding categorizer & quality policy evaluator
├── reporting/             # Phase 04.4: Standalone HTML & Markdown compliance dossier builder
├── agent-sdk/             # Phase 04.5: Agent tool descriptors & context token budgeter
├── mcp-server/            # Phase 04.5: Model Context Protocol 2026-07-28 stdio/HTTP server
├── cli/                   # Phase 04.5: Developer terminal CLI binary (uiforge)
└── core/                  # Phase 04.6: Workflow coordinator & Task State Machine
```

---

## 3. Prerequisites & Infrastructure Setup

1. **Runtime & Toolchain:**
   - Node.js: `v22.12.0 LTS` (Active).
   - Package Manager: `pnpm@9.15.0` (Workspaces enabled).
   - Monorepo Build Orchestration: `turbo@2.3.0`.
   - TypeScript: `typescript@5.7.0` (`strict: true`, ES2024 target).
   - Test Runner: `vitest@3.0.0` with `@vitest/coverage-v8`.
2. **Browser Engine:**
   - Playwright: `^1.50.1` (`npx playwright install chromium`).
3. **Python (Font Subsetter):**
   - Python 3.10+ with `fonttools` (for `pyftsubset` execution).

---

## 4. Key Engineering Risks & Mitigations

| Risk ID | Identified Engineering Risk | Architectural Mitigation Strategy |
| :---: | :--- | :--- |
| **R01** | Babel parser crashing on streaming LLM syntax | Enable `@babel/parser` with `errorRecovery: true`; hold unclosed templates/comments in WAL stream buffer (Finding C26). |
| **R02** | Playwright headless browser flakiness in CI | Use deterministic render flags: `--font-render-hinting=none`, fixed device pixel ratio, and `networkidle` waits. |
| **R03** | SQLite native compilation failure on Windows | Pin `better-sqlite3` to verified prebuilt NAPI binary releases; provide memory fallback. |
| **R04** | Accidental circular package imports | Enforce `pnpm madge --circular packages/*/src` in pre-commit and CI verification gates. |
| **R05** | Destructive file clobbering | Pre-image Write-Ahead Logging (WAL) writes to `.uiforge/wal/` prior to any source file modification. |

---

## 5. Phase 04 Acceptance & Exit Gate Criteria

Phase 04 will conclude successfully only when:
1. All 14 Level A MVP packages compile cleanly with zero TypeScript errors (`tsc --noEmit`).
2. Unit and integration test suites achieve $\ge 85.0\%$ code coverage across core engines.
3. Zero circular package dependencies detected across the entire monorepo DAG.
4. The full Brownfield Improvement workflow (Workflow B) executes end-to-end on a test repository:
   - Scans project routes and tokens.
   - Audits rendered page via headless Playwright and flags a deliberate contrast defect.
   - Proposes a targeted coordinate slice patch.
   - Prompts for human approval, signs token, and applies patch via WAL.
   - Evaluates TypeScript compiler diagnostics, commits transaction, and exports HTML audit dossier.
5. All 123 automated assertion baselines carried forward from Phase 02 remain 100% passing.
