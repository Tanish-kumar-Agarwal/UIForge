# UIFORGE — PHASE 04: ENGINEERING FOUNDATION SPECIFICATION
## Monorepo Scaffolding, Package Handoff, Toolchain Qualification & Quality Gates

**Document ID:** `UIF-PH04-ENGINEERING-FOUNDATION-SPEC`  
**Phase:** 04 — Repository Setup, Engineering Infrastructure & Developer Standards  
**Status:** Certified Architecture & Implementation Baseline  
**Date:** November 22, 2026  
**Standard:** Principal Software Architect, Staff Platform Engineer & Lead Quality Auditor  

---

## 1. Executive Mission & Scope of Phase 04

Phase 04 executes the transition from **Research & Architecture Specification** into **Production Software Engineering**.

The objective of Phase 04 is to establish the production monorepo infrastructure, toolchain, developer standards, CI/CD pipelines, and deliver the **initial working vertical slice** of UIForge.

Phase 04 does **not** design architecture, invent requirements, or introduce unapproved packages. It strictly implements the frozen specifications established in Phase 03 ([ADR-001](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/docs/architecture/ADR-001-monorepo.md) through [ADR-011](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/docs/architecture/ADR-011-versioning.md), [PACKAGE-BOUNDARIES.md](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-03/03-system-architecture/PACKAGE-BOUNDARIES.md), and [PACKAGE-DEPENDENCY-GRAPH.md](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-03/03-system-architecture/PACKAGE-DEPENDENCY-GRAPH.md)).

---

## 2. Canonical Monorepo Package Topology & Reconciliation

### 2.1 Complete Architectural Topology (Authoritative 16 Packages)
The frozen Phase 03 architectural topology ([ADR-002](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/docs/architecture/ADR-002-package-boundaries.md)) defines 16 domain packages across 7 DAG levels ($0 \dots 6$):

```
Level 0 (Ground):      @uiforge/contracts (Pure schemas, zero internal dependencies)
Level 1 (Infra):       @uiforge/storage, @uiforge/security
Level 2 (Engines):     @uiforge/project-intelligence, @uiforge/tokens, @uiforge/component-registry,
                       @uiforge/safe-modifier, @uiforge/browser-eval, @uiforge/eval, @uiforge/reporting
Level 3 (Design):      @uiforge/design-engine
Level 4 (Core):        @uiforge/core (Orchestrator & Task State Machine)
Level 5 (Agent SDK):   @uiforge/agent-sdk
Level 6 (Ingress):     @uiforge/cli, @uiforge/mcp-server, @uiforge/studio
```

In addition to the 16 architectural domain packages, the monorepo includes **`@uiforge/config`**, an internal developer tooling configuration package providing shared, reusable `tsconfig`, `eslint`, and `prettier` presets across the workspace.

### 2.2 Reconciled Initial Implemented Vertical Slice
To eliminate phantom dependencies, premature implementations, and unnecessary project references, **Phase 04 implements ONLY the 5 packages required for the initial working vertical slice**:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                    PHASE 04 IMPLEMENTED VERTICAL SLICE PACKAGES                        │
├────┬─────────────────────────────┬───────┬────────────────────────────────────────────┤
│ #  │ Package                     │ Level │ Phase 04 Responsibilities & Scope          │
├────┼─────────────────────────────┼───────┼────────────────────────────────────────────┤
│ 1  │ @uiforge/contracts          │ 0     │ All 28 canonical Zod schemas, TS types,    │
│    │                             │       │ and E1000–E8000 error taxonomy. Pure.      │
├────┼─────────────────────────────┼───────┼────────────────────────────────────────────┤
│ 2  │ @uiforge/config             │ Tool  │ Shared TypeScript configs (base, node, lib)│
│    │                             │       │ and internal tooling standards.            │
├────┼─────────────────────────────┼───────┼────────────────────────────────────────────┤
│ 3  │ @uiforge/project-analyzer   │ 2     │ Read-only AST project scanner & route      │
│    │                             │       │ extractor (Layer 4 / FR-02 initial slice). │
├────┼─────────────────────────────┼───────┼────────────────────────────────────────────┤
│ 4  │ @uiforge/core               │ 4     │ Engine coordinator, task runner, and       │
│    │                             │       │ pipeline dispatcher for discovery slice.   │
├────┼─────────────────────────────┼───────┼────────────────────────────────────────────┤
│ 5  │ @uiforge/mcp-server         │ 6     │ Model Context Protocol 2026-07-28 stdio    │
│    │                             │       │ server exposing `scan_project` tool.       │
└────┴─────────────────────────────┴───────┴────────────────────────────────────────────┘
```

> [!IMPORTANT]
> **Strict Anti-Placeholder Invariant:**
> Do NOT create empty placeholder directories, stub manifests, or dangling project references for the remaining 11 future domain packages (`@uiforge/storage`, `@uiforge/security`, `@uiforge/tokens`, `@uiforge/component-registry`, `@uiforge/safe-modifier`, `@uiforge/browser-eval`, `@uiforge/eval`, `@uiforge/reporting`, `@uiforge/design-engine`, `@uiforge/agent-sdk`, `@uiforge/cli`, `@uiforge/studio`). Those packages will be introduced solely in their designated phases when their implementation begins.

---

## 3. Pinned Runtime & Toolchain Compatibility (Node.js 24 LTS)

All selected tools are verified fully compatible with **Node.js 24 LTS** (`v24.15.0`) on Windows and Unix environments:

```
┌────────────────────────────────────────────────────────────────────────────────────┐
│                        PINNED TOOLCHAIN SPECIFICATION                              │
├──────────────────────┬─────────────────┬───────────────────────────────────────────┤
│ Component            │ Pinned Version  │ Compatibility & Verification Notes        │
├──────────────────────┼─────────────────┼───────────────────────────────────────────┤
│ Node.js Runtime      │ v24.15.0 LTS    │ Target baseline (>= 22.12.0 LTS).         │
├──────────────────────┼─────────────────┼───────────────────────────────────────────┤
│ Package Manager      │ pnpm@9.15.0     │ Pinned via Corepack (`packageManager`).   │
│                      │                 │ Strict content-addressable store.         │
├──────────────────────┼─────────────────┼───────────────────────────────────────────┤
│ Monorepo Engine      │ turbo@^2.3.4    │ Dependency-aware DAG task cache.          │
├──────────────────────┼─────────────────┼───────────────────────────────────────────┤
│ TypeScript           │ typescript@^5.7 │ NodeNext module resolution, ES2024 target.│
├──────────────────────┼─────────────────┼───────────────────────────────────────────┤
│ Test Runner          │ vitest@^3.0.5   │ Native ESM, v8 coverage, workspace tasks. │
├──────────────────────┼─────────────────┼───────────────────────────────────────────┤
│ Linter               │ eslint@^9.20.0  │ Flat config (`eslint.config.mjs`) with    │
│                      │                 │ typescript-eslint@^8.24.0.                │
├──────────────────────┼─────────────────┼───────────────────────────────────────────┤
│ Formatter            │ prettier@^3.4.2 │ Standardized styling with .editorconfig.  │
├──────────────────────┼─────────────────┼───────────────────────────────────────────┤
│ Release Orchestrator │ @changesets/cli │ Multi-package SemVer versioning and notes.│
├──────────────────────┼─────────────────┼───────────────────────────────────────────┤
│ MCP SDK              │ @modelcontext-  │ Official Model Context Protocol SDK       │
│                      │ protocol/sdk    │ for 2026-07-28 stdio JSON-RPC transport.  │
└──────────────────────┴─────────────────┴───────────────────────────────────────────┘
```

---

## 4. Architectural Boundary & Import Enforcement

To ensure strict adherence to the [ADR-002](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/docs/architecture/ADR-002-package-boundaries.md) DAG, verification in Phase 04 goes beyond simple circularity checks:

### 4.1 Automated Boundary Verification Suite (`pnpm test:boundaries`)
1. **Madge Circularity Guard:**
   - Command: `pnpm exec madge --circular packages/*/src`
   - Invariant: Zero cycles permitted across the module graph.
2. **Explicit Architectural Allowlist & Forbidden-Import Scanner:**
   - Dedicated test script `scripts/check-boundaries.mjs` (and Vitest architectural suite) that statically inspects all `import` and `require` statements:
     - **`@uiforge/contracts`**: Allowed imports: `zod` only. Forbidden: Any `@uiforge/*` package.
     - **`@uiforge/config`**: Allowed imports: None (presets only). Forbidden: Any `@uiforge/*` package.
     - **`@uiforge/project-analyzer`**: Allowed imports: `@uiforge/contracts`, `@uiforge/config`, `@babel/*`, `typescript`. Forbidden: `@uiforge/core`, `@uiforge/mcp-server`, `@uiforge/cli`, `@uiforge/safe-modifier`.
     - **`@uiforge/core`**: Allowed imports: `@uiforge/contracts`, `@uiforge/config`, `@uiforge/project-analyzer`. Forbidden: `@uiforge/mcp-server`, `@uiforge/cli`, `@uiforge/studio`.
     - **`@uiforge/mcp-server`**: Allowed imports: `@uiforge/contracts`, `@uiforge/config`, `@uiforge/core`, `@uiforge/project-analyzer`, `@modelcontextprotocol/sdk`. Forbidden: `@uiforge/cli`, `@uiforge/studio`.

---

## 5. Licensing, Governance & Copyleft Compliance

### 5.1 Corrected Licensing Position & Legal Acceptance Criteria
- **MPL-2.0 Classification:** MPL-2.0 (under which `@axe-core/playwright` is licensed) is **NOT** an automatic violation or license defect. It was fully evaluated and approved as a Tier 0 dependency in Phase 02.4 (`OS-A11Y-02`).
- **Notice & Source Obligations:** Package and process isolation does **NOT** eliminate MPL-2.0 obligations. Under MPL-2.0 Section 3:
  1. Covered files must remain available in source code form under MPL-2.0.
  2. Modifications to covered files must remain under MPL-2.0.
  3. UIForge must provide appropriate notices and license texts in the `NOTICE` file and user-facing documentation.
- **Consumption Mode Governance:** Every external dependency must adhere to its approved Phase 02.4 consumption mode (`SOURCE_COPY`, `DEPENDENCY`, `REFERENCE`, `ASSET_REDISTRIBUTION`, `EXTERNAL`).
- **Copyleft Isolation & Quarantine:**
  - `pa11y` (LGPL-3.0) remains strictly quarantined in Tier 4 (`DEFER`) pending formal legal counsel review regarding subprocess boundaries; it is **strictly barred** from production dependencies in Phase 04.
  - Reciprocal licenses (`GPL-2.0`, `GPL-3.0`, `AGPL-3.0`, `SSPL`) are strictly barred from all direct and transitive production dependencies.
- **Automated License Audit:** Automated script `scripts/check-licenses.mjs` verifies all production dependencies against the approved license list (`MIT`, `Apache-2.0`, `ISC`, `BSD-2-Clause`, `BSD-3-Clause`, `MPL-2.0` with notice compliance).

---

## 6. Storage Architecture Invariant (ADR-009)

> [!CAUTION]
> **Strict Prohibition of In-Memory JSON Storage Fallbacks:**
> In-memory JSON storage is **strictly prohibited** as a substitute for approved SQLite persistence.
> - [ADR-009](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/docs/architecture/ADR-009-storage.md) establishes that UIForge state persistence requires **SQLite with Write-Ahead Logging (WAL)** for transactional ACID guarantees, combined with filesystem content-addressed storage for code snapshots.
> - `@uiforge/storage` is deferred to Phase 05/Milestone 2 and is **NOT** included in the initial 5-package vertical slice of Phase 04. When implemented, it will utilize pure, approved SQLite via verified prebuilt binaries, without introducing unauthorized in-memory JSON compromises.

---

## 7. CI/CD, Supply Chain Security & Repository Standards

### 7.1 GitHub Actions CI Pipeline (`.github/workflows/ci.yml`)
- Executes across Ubuntu and Windows runners.
- **Least-Privilege Permissions:** Enforces top-level `permissions: contents: read` across all CI jobs.
- **Strict Pipeline Stages:**
  1. `setup`: Node.js 24 LTS, Corepack, `pnpm install --frozen-lockfile`.
  2. `format:check`: Prettier validation.
  3. `lint`: ESLint 9 type-aware linting.
  4. `typecheck`: TypeScript `tsc --noEmit` across all workspace project references.
  5. `test`: Vitest unit and contract tests (including all 28 canonical schemas).
  6. `test:boundaries`: Madge circularity + architectural allowlist verification.
  7. `test:licenses`: Production dependency license compliance check.
  8. `build`: Turborepo build of all packages.
  9. `fresh-clone`: Verifies clean clone, installation, build, and test in an isolated runner environment.

### 7.2 Security & CodeQL Scanning (`.github/workflows/security.yml`, `codeql.yml`)
- **Secret Scanning:** Gitleaks action scanning pull requests and commits for leaked credentials.
- **CodeQL SAST:** Static application security analysis for `javascript-typescript`.
- **Dependabot:** Weekly automated security updates for npm and GitHub Actions.

### 7.3 Branch Protection Rules
- Require pull request reviews before merging into `main`.
- Require linear commit history (Conventional Commits).
- Require all status checks to pass before merging (`format`, `lint`, `typecheck`, `test`, `boundaries`, `licenses`, `codeql`).

---

## 8. Phase 04 Acceptance & Exit Gate Criteria

Phase 04 will conclude successfully when and only when:
1. **Vertical Slice Execution:** The initial vertical slice executes end-to-end:
   - `@uiforge/contracts`: All 28 canonical contracts parse and validate 100% of valid payloads and reject malformed inputs.
   - `@uiforge/config`: Exports valid shared compiler and linter presets.
   - `@uiforge/project-analyzer`: Non-destructively scans a target directory and extracts project framework, styling conventions, and routes into a canonical `AnalysisRun` contract (`ANL-`).
   - `@uiforge/core`: Coordinates the scan task through the Task State Machine.
   - `@uiforge/mcp-server`: Exposes the `scan_project` tool over stdio JSON-RPC and successfully responds to an MCP client.
2. **TypeScript Cleanliness:** `pnpm typecheck` passes with zero compiler errors across all packages.
3. **Boundary Integrity:** `pnpm test:boundaries` confirms zero circular dependencies and 100% compliance with architectural import allowlists.
4. **License Compliance:** `pnpm test:licenses` confirms zero unapproved copyleft licenses, with MPL-2.0 notice obligations satisfied.
5. **Fresh-Clone Validation:** Complete repository builds and tests cleanly from a fresh checkout.
6. **Legacy Assertion Preservation:** All 320 legacy research assertions remain 100% passing.
