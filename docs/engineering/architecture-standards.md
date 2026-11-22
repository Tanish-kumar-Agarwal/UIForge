# UIForge Engineering Standards: Architecture & Package Boundaries

**Document ID:** `UIF-ENG-STD-001`  
**Classification:** Authoritative Engineering Standard  

---

## 1. Multi-Tier Layered DAG Topology

UIForge packages are strictly partitioned into 7 architectural levels ($0 \dots 6$). Dependencies flow strictly in one direction:
`Ingress Adapters (Level 6) -> Agent SDK (Level 5) -> Core Orchestration (Level 4) -> Design Engine (Level 3) -> Domain Engines (Level 2) -> Infrastructure (Level 1) -> Contracts (Level 0)`.

```
Level 0: @uiforge/contracts
Level 1: @uiforge/storage, @uiforge/security
Level 2: @uiforge/project-intelligence, @uiforge/tokens, @uiforge/component-registry,
         @uiforge/safe-modifier, @uiforge/browser-eval, @uiforge/eval, @uiforge/reporting
Level 3: @uiforge/design-engine
Level 4: @uiforge/core
Level 5: @uiforge/agent-sdk
Level 6: @uiforge/cli, @uiforge/mcp-server, @uiforge/studio
```

---

## 2. Prohibited Import Rules
- A package at Level $N$ is **strictly forbidden** from importing any package at Level $\ge N$.
- Domain engines must never import ingress adapters (`@uiforge/cli`, `@uiforge/mcp-server`, `@uiforge/studio`).
- Level 0 (`@uiforge/contracts`) must remain pure, importing only `zod` and zero internal `@uiforge/*` packages.
- Circular dependencies are strictly forbidden across the monorepo graph and are continuously verified via `pnpm test:boundaries`.
