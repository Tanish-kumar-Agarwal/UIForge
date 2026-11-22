# ADR-002: Monorepo Package Boundaries & Circularity Guards
## Layered Architecture Partitioning, Public Surface Definitions & Import Invariants

**Status:** Accepted  
**Date:** 2026-11-22  
**Decision Driver:** Principal Software Architect & Principal Infrastructure Engineer  

---

## 1. Context & Problem Statement
Without strictly enforced package boundaries, multi-package monorepos rapidly deteriorate into circular dependencies, leaky abstractions, and spaghetti code. In UIForge, domain engines (tokens, AST parsing, browser evaluation) must remain reusable in headless CLI commands, background agent MCP daemons, and future Studio interfaces without circular coupling.

---

## 2. Decision Constraints
1. **Strict DAG:** Monorepo package dependencies must form a strictly acyclic directed graph.
2. **Pure Contracts Ground State:** All shared schemas, interfaces, and error codes must reside in a zero-dependency ground package (`@uiforge/contracts`).
3. **No Ingress Leakage:** Domain engines must have zero dependencies on ingress adapters (`@uiforge/cli`, `@uiforge/mcp-server`, `@uiforge/studio`).
4. **Automated Enforcement:** Circularity must be checked and blocked automatically in CI.

---

## 3. Options Considered
- **Option 1: Flat Package Structure (Permissive Internal Imports):** Packages import whatever they need from neighboring packages without structural hierarchy.
- **Option 2: Strict Multi-Tier Layered Hierarchy (DAG):** Packages are strictly partitioned into 7 distinct architectural levels ($0 \dots 6$). Level $N$ may only import packages at Level $< N$. Shared contracts reside at Level 0.
- **Option 3: Single Monolithic Core Package:** Merge all domain engines into a single `@uiforge/core` package.

---

## 4. Evaluation of Options

| Criteria | Option 1: Flat Permissive | Option 2: Strict Multi-Tier (DAG) | Option 3: Monolithic Core |
| :--- | :--- | :--- | :--- |
| **Circularity Risk** | Critical (almost certain) | Zero (mathematically prevented) | Zero (single package) |
| **Separation of Concerns** | Very Poor | Excellent | Poor (internal spaghetti) |
| **Testability & Mocking** | Difficult | High (each engine isolated) | Moderate |
| **Tree-Shaking & Footprint** | Poor | High (consumers import only needed engines) | Heavy bundle bloat |

---

## 5. Decision Outcome
**Selected Option:** **Option 2: Strict Multi-Tier Layered Hierarchy (DAG).**

### Architectural Levels:
- **Level 0 (Ground):** `@uiforge/contracts` (pure schemas, zero internal deps).
- **Level 1 (Infra):** `@uiforge/storage`, `@uiforge/security`.
- **Level 2 (Engines):** `@uiforge/project-intelligence`, `@uiforge/tokens`, `@uiforge/component-registry`, `@uiforge/safe-modifier`, `@uiforge/browser-eval`, `@uiforge/eval`, `@uiforge/reporting`.
- **Level 3 (Design):** `@uiforge/design-engine` (may import tokens and registry).
- **Level 4 (Core):** `@uiforge/core` (Application Orchestrator & Task State Machine).
- **Level 5 (Agent SDK):** `@uiforge/agent-sdk` (Agent abstractions).
- **Level 6 (Ingress):** `@uiforge/cli`, `@uiforge/mcp-server`, `@uiforge/studio`.

### Import Invariant:
A package at Level $N$ is **strictly forbidden** from importing any package at Level $\ge N$.

---

## 6. Consequences & Impact
- **Positive:**
  - Complete elimination of circular dependencies.
  - Core orchestration and domain engines can be tested in isolation.
  - Ingress adapters remain thin, interchangeable transport wrappers.
- **Negative:**
  - Requires developers to deliberately hoist shared data types into `@uiforge/contracts`.

---

## 7. Security & Operational Impact
- Domain engines cannot accidentally trigger unauthorized filesystem writes because the Safe Modifier and Security subsystems enforce diff-bound token checks at lower layers.

---

## 8. Research References
- Phase 02.2: `MASTER-ARCHITECTURE.md` (11 Canonical Layers).
- Phase 03: `PACKAGE-BOUNDARIES.md` and `PACKAGE-DEPENDENCY-GRAPH.md`.

---

## 9. Open Questions
- None. Package boundaries are locked and frozen.
