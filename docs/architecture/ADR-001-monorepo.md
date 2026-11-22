# ADR-001: Monorepo Architecture and Workspace Tooling
## Selection of Monorepo Strategy, Workspace Management & Build Tooling

**Status:** Accepted  
**Date:** 2026-11-22  
**Decision Driver:** Principal Software Architect & Infrastructure Engineer  

---

## 1. Context & Problem Statement
UIForge consists of multiple tightly coordinated packages: shared contracts, core orchestration, domain engines (project intelligence, tokens, component registry, safe modifier, browser evaluation), ingress adapters (CLI, MCP server, agent SDK), and storage/security infrastructure.

We must decide whether to structure UIForge as a **multi-repository (polyrepo)** system or a **single repository (monorepo)**, and select the optimal package management and build orchestration tooling.

---

## 2. Decision Constraints
1. **Atomic Contract Changes:** Changes to shared contracts (`@uiforge/contracts`) must be instantly available to all consuming engines without intermediate npm publish cycles.
2. **Strict Boundary Enforcement:** Must prevent accidental circular dependencies and enforce strict layer hierarchies.
3. **Local Development Ergonomics:** Developers and contributors must be able to clone, install, build, and test the entire platform with a single command.
4. **Tooling Maturity:** Must run on Node.js 22 LTS across Windows, macOS, and Linux.

---

## 3. Options Considered
- **Option 1: Polyrepo (Separate Git Repositories per Package):** Each engine and adapter maintained as an independent repository with its own CI/CD and npm release lifecycle.
- **Option 2: pnpm Workspaces with Turborepo:** Single Git repository with `pnpm workspaces` for dependency symlinking and Turborepo for cached, parallel build execution.
- **Option 3: npm/yarn Workspaces with Lerna:** Traditional monorepo setup using npm or yarn with Lerna orchestration.

---

## 4. Evaluation of Options

| Criteria | Option 1: Polyrepo | Option 2: pnpm + Turborepo | Option 3: npm + Lerna |
| :--- | :--- | :--- | :--- |
| **Contract Synchronization** | Fragile; requires continuous alpha publishing | Instant; symlinked in local workspace | Good; symlinked in workspace |
| **Disk & Install Efficiency** | Duplicate `node_modules` across 15 repos | Content-addressable hard link store (fastest) | High disk duplication |
| **Build Caching** | External CI caching only | Local & remote computation caching DAG | Basic task running |
| **Circularity Detection** | N/A (separated) | Trivially checked via `madge` in monorepo | Requires custom scripts |
| **Release Coordination** | Complex cross-repo dependency coordination | Coordinated changesets release workflow | Complex version bumps |

---

## 5. Decision Outcome
**Selected Option:** **Option 2: pnpm Workspaces with Turborepo.**

### Rationale:
- `pnpm` provides the fastest, most disk-efficient package manager in the JavaScript ecosystem through its global content-addressable store and strict non-flat `node_modules` structure (preventing phantom dependencies).
- Turborepo builds a topological dependency graph (DAG) and caches build/test artifacts, ensuring that unmodified packages are never redundantly re-compiled.
- All packages live under `packages/*` and share root TypeScript configs (`tsconfig.base.json`), ESLint configs, and Vitest test runners.

---

## 6. Consequences & Impact
- **Positive:**
  - Zero-friction refactoring of shared schemas and interfaces in `@uiforge/contracts`.
  - Single CI pipeline verifies end-to-end integration across all 123 automated assertion baselines.
  - Consistent formatting, linting, and TypeScript compiler settings across the entire codebase.
- **Negative:**
  - Repository size will grow over time as more packages are added.
  - Requires developers to use `pnpm` rather than `npm` or `yarn`.

---

## 7. Security & Operational Impact
- `pnpm` prevents phantom dependencies (packages cannot import transitively installed libraries that are not explicitly declared in their own `package.json`).
- Root `package.json` pins exact dependency versions, avoiding supply-chain version drift.

---

## 8. Research References
- Phase 02.2: `DEPENDENCY-AND-PACKAGE-ARCHITECTURE.md` (Monorepo Layering).
- Phase 02.5: `CORE-FOUNDATION-SHORTLIST.md` (Declared semver ranges).

---

## 9. Open Questions
- None. Monorepo strategy is confirmed and frozen.
