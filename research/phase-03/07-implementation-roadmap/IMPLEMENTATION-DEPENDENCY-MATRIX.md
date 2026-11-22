# UIForge Phase 03 — Implementation Dependency Matrix

**Document ID:** `UIF-PH03-DEP-MATRIX`  
**Phase:** 03 — Master Product Specification & System Architecture Freeze  
**Status:** Approved Architecture Baseline  
**Classification:** `[ARCHITECTURE-DECISION]`  
**Target:** Monorepo Package Implementation Ordering & Critical Path Analysis  

---

## 1. Executive Summary & Objective

The UIForge monorepo consists of 16 workspace packages structured across 7 strictly layered topological levels (Levels 0 through 6). To ensure deterministic compilation, prevent circular dependencies, enable independent unit testing, and maximize concurrent development velocity during Phase 04 and Phase 05, this document establishes the authoritative **Implementation Dependency Matrix**.

Every package is mapped to its:
1. Exact monorepo topological level (Levels 0–6).
2. Direct internal package dependencies (`@uiforge/*`).
3. External runtime dependencies.
4. Implementation prerequisite gates (packages that must reach 100% test pass before development begins).
5. Downstream packages blocked by its completion.
6. Assigned parallelization track.

---

## 2. Monorepo Topological Levels & Package Mapping

```
Level 0: Foundation / Core Contracts
  └─ @uiforge/contracts

Level 1: System State & Security Foundations
  ├─ @uiforge/storage
  └─ @uiforge/security

Level 2: Domain Capabilities & Engines
  ├─ @uiforge/project-intelligence
  ├─ @uiforge/tokens
  ├─ @uiforge/component-registry
  ├─ @uiforge/safe-modifier
  ├─ @uiforge/browser-eval
  ├─ @uiforge/eval
  └─ @uiforge/reporting

Level 3: Design Engine Synthesis
  └─ @uiforge/design-engine

Level 4: Central Orchestration Engine
  └─ @uiforge/core

Level 5: Agent Abstraction & Ingress Integration
  └─ @uiforge/agent-sdk

Level 6: User & Ingress Surfaces
  ├─ @uiforge/cli
  ├─ @uiforge/mcp-server
  └─ @uiforge/studio (Level B Scope)
```

---

## 3. Package Implementation Dependency Matrix

| Level | Package Name | Direct `@uiforge/*` Dependencies | Key External Runtime Dependencies | Prerequisite Gates (Must be 100% Complete) | Downstream Packages Blocked | Parallel Track | Critical Path? |
| :---: | :--- | :--- | :--- | :--- | :--- | :---: | :---: |
| **0** | `@uiforge/contracts` | *None (Root)* | `zod` | Phase 03 Architecture Freeze | All 15 downstream packages | Track A | **YES (Bottleneck)** |
| **1** | `@uiforge/storage` | `@uiforge/contracts` | `better-sqlite3`, `pathe` | `@uiforge/contracts` | Levels 2–6 | Track B | **YES** |
| **1** | `@uiforge/security` | `@uiforge/contracts` | Standard Node.js `node:crypto` | `@uiforge/contracts` | `@uiforge/safe-modifier`, `@uiforge/core` | Track B | **YES** |
| **2** | `@uiforge/project-intelligence` | `@uiforge/contracts`, `@uiforge/storage` | `@babel/parser`, `@babel/traverse`, `typescript`, `@ast-grep/napi` | `@uiforge/storage` | `@uiforge/safe-modifier`, `@uiforge/core` | Track C | **YES** |
| **2** | `@uiforge/tokens` | `@uiforge/contracts`, `@uiforge/storage` | `style-dictionary`, `colord`, `culori`, `tailwindcss` | `@uiforge/storage` | `@uiforge/design-engine`, `@uiforge/core` | Track C | No |
| **2** | `@uiforge/component-registry` | `@uiforge/contracts`, `@uiforge/storage` | `@radix-ui/*`, `lucide-react` | `@uiforge/storage` | `@uiforge/design-engine`, `@uiforge/core` | Track D | No |
| **2** | `@uiforge/safe-modifier` | `@uiforge/contracts`, `@uiforge/storage`, `@uiforge/security` | `typescript`, `diff`, `prettier` | `@uiforge/storage`, `@uiforge/security` | `@uiforge/core` | Track B | **YES** |
| **2** | `@uiforge/browser-eval` | `@uiforge/contracts`, `@uiforge/storage` | `playwright`, `axe-core`, `pixelmatch`, `pngjs` | `@uiforge/storage` | `@uiforge/eval`, `@uiforge/core` | Track D | No |
| **2** | `@uiforge/eval` | `@uiforge/contracts`, `@uiforge/storage` | `eslint-plugin-jsx-a11y` | `@uiforge/storage` | `@uiforge/reporting`, `@uiforge/core` | Track D | No |
| **2** | `@uiforge/reporting` | `@uiforge/contracts`, `@uiforge/storage` | `picocolors` | `@uiforge/storage` | `@uiforge/core` | Track A | No |
| **3** | `@uiforge/design-engine` | `@uiforge/contracts`, `@uiforge/tokens`, `@uiforge/component-registry` | *None* | `@uiforge/tokens`, `@uiforge/component-registry` | `@uiforge/core` | Track C | No |
| **4** | `@uiforge/core` | `@uiforge/contracts`, `@uiforge/storage`, `@uiforge/security`, `@uiforge/project-intelligence`, `@uiforge/tokens`, `@uiforge/component-registry`, `@uiforge/safe-modifier`, `@uiforge/browser-eval`, `@uiforge/eval`, `@uiforge/reporting`, `@uiforge/design-engine` | *None* | All Level 1, 2, 3 Packages | Level 5 & 6 (Agent SDK, CLI, MCP) | Track E | **YES (Convergence)** |
| **5** | `@uiforge/agent-sdk` | `@uiforge/contracts`, `@uiforge/core`, `@uiforge/storage` | *None* | `@uiforge/core` | `@uiforge/mcp-server` | Track E | **YES** |
| **6** | `@uiforge/cli` | `@uiforge/contracts`, `@uiforge/core` | `cac`, `prompts`, `picocolors` | `@uiforge/core` | End-User Human Developers | Track E | No |
| **6** | `@uiforge/mcp-server` | `@uiforge/contracts`, `@uiforge/core`, `@uiforge/agent-sdk` | `@modelcontextprotocol/sdk` | `@uiforge/agent-sdk` | External AI Coding Agents | Track E | **YES (Primary Ingress)** |
| **6** | `@uiforge/studio` | `@uiforge/contracts`, `@uiforge/core` | `ws` (Bridge) | `@uiforge/core` | UIForge Studio Visual Surface (Level B) | Track E | No |

---

## 4. Parallelization Tracks & Implementation Waves

```
Wave 1 (Foundation):
  Track A: [@uiforge/contracts]
  Track B: [@uiforge/storage], [@uiforge/security]

Wave 2 (Domain Engines in Parallel):
  Track B: [@uiforge/safe-modifier]
  Track C: [@uiforge/project-intelligence], [@uiforge/tokens]
  Track D: [@uiforge/component-registry], [@uiforge/browser-eval], [@uiforge/eval], [@uiforge/reporting]

Wave 3 (Design Synthesis & Intermediate Integration):
  Track C: [@uiforge/design-engine]

Wave 4 (Core Orchestration):
  Track E: [@uiforge/core]

Wave 5 (Ingress & Protocol Surfaces):
  Track E: [@uiforge/agent-sdk] ───► [@uiforge/mcp-server], [@uiforge/cli], [@uiforge/studio]
```

### Detailed Track Assignments

#### Track A: Core Contracts & Common Reporting
- **Packages:** `@uiforge/contracts`, `@uiforge/reporting`.
- **Primary Focus:** Pure TypeScript schemas, Zod validation pipelines, immutable error codes, markdown/JSON report formatters.
- **Dependencies:** Zero internal dependencies at start.
- **Exit Condition:** 100% TypeScript compilation, 100% unit test coverage on Zod schema round-trips.

#### Track B: Safety, Security & Transaction Storage
- **Packages:** `@uiforge/security`, `@uiforge/storage`, `@uiforge/safe-modifier`.
- **Primary Focus:** Path traversal sandbox validation, SHA-256 diff-bound HMAC authorization tokens, SQLite schema creation, WAL roll-forward/rollback engines, coordinate slice patching, TypeScript Compiler API diagnostic regression gate.
- **Dependencies:** Requires Track A completion.
- **Exit Condition:** Full verification of all 20 STRIDE threat scenarios, zero unauthorized file writes, atomic rollbacks under simulated crash.

#### Track C: Parsers, Tokens & Design Engine
- **Packages:** `@uiforge/project-intelligence`, `@uiforge/tokens`, `@uiforge/design-engine`.
- **Primary Focus:** Babel parser configuration, JSX/TSX AST inspection, coordinate preservation, Tailwind CSS token extraction, W3C DTCG 2025.10 token parsing, WCAG contrast mathematics via `colord`/`culori`, design brief synthesis.
- **Dependencies:** Requires Track A and Level 1 storage completion.
- **Exit Condition:** Extraction of component props from sample components, 100% pass on W3C token parser tests, coordinate slice calculation verification.

#### Track D: Evaluation, Discovery & Accessibility
- **Packages:** `@uiforge/component-registry`, `@uiforge/browser-eval`, `@uiforge/eval`.
- **Primary Focus:** Headless Chromium orchestration via Playwright, axe-core 4.10 accessibility scanning, pixel-diff regression testing via Pixelmatch, shadcn/Radix component discovery and scoring against UIForge criteria.
- **Dependencies:** Requires Track A and Level 1 storage completion.
- **Exit Condition:** Headless browser audit completion under 2000ms for standard pages, accurate axe-core violation grouping, component capability scoring verification.

#### Track E: Orchestration & Ingress Surfaces
- **Packages:** `@uiforge/core`, `@uiforge/agent-sdk`, `@uiforge/cli`, `@uiforge/mcp-server`, `@uiforge/studio`.
- **Primary Focus:** Operating-mode state machines (Analyze, Design, Generate, Audit, Improve, Compare, Validate, Export), end-to-end Workflows A–D, CLI argument parsing via `cac`, MCP 2026-07-28 stateless server with legacy fallback negotiation, agent session isolation.
- **Dependencies:** Requires completion of Tracks B, C, and D.
- **Exit Condition:** Successful end-to-end execution of Workflow A (Greenfield) and Workflow B (Brownfield) through both CLI and MCP server.

---

## 5. Critical Path Analysis

```
[Phase 03 Architecture Freeze]
              │
              ▼
    @uiforge/contracts (Level 0)
              │
              ▼
    @uiforge/storage & @uiforge/security (Level 1)
              │
              ▼
    @uiforge/project-intelligence & @uiforge/safe-modifier (Level 2)
              │
              ▼
    @uiforge/core (Level 4 Orchestrator)
              │
              ▼
    @uiforge/agent-sdk (Level 5)
              │
              ▼
    @uiforge/mcp-server (Level 6)
              │
              ▼
[Production Acceptance & Release]
```

---

## 6. Circular Dependency Prevention Protocol

1. **Static Linting Gate:**
   - Every monorepo build runs `madge --circular --extensions ts packages/` as a blocking pre-commit and CI verification gate. Any circular dependency fails the build immediately.
2. **Import Rule Linting:**
   - ESLint rule `no-restricted-imports` is configured in the root `.eslintrc.cjs` to enforce strict topological hierarchy:
     - Level $N$ packages may import only from Level $M$ where $M < N$.
     - Sibling packages at the same level may not import each other (except `@uiforge/design-engine` importing Level 2 tokens and registry).
     - Level 6 ingress packages cannot import each other.
3. **Internal Package Publishing Standard:**
   - All internal packages publish clean type declarations (`.d.ts`) and ESM entry points. Wildcard or direct internal file imports are strictly prohibited.

---

## 7. Evidence & Traceability

- **ADR Reference:** `ADR-001-monorepo.md`, `ADR-002-package-boundaries.md` `[PHASE-02-DECIDED]`
- **System Architecture:** `PACKAGE-BOUNDARIES.md`, `PACKAGE-DEPENDENCY-GRAPH.md` `[ARCHITECTURE-DECISION]`
- **Contract Reference:** `CONTRACT-CATALOGUE.md`, `API-SPECIFICATION.md` `[ARCHITECTURE-DECISION]`
- **Status:** Complete, consistent, and ready for Phase 04 execution.
