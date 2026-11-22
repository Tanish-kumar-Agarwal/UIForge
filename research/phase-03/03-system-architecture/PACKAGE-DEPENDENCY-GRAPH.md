# UIFORGE — PHASE 03: PACKAGE DEPENDENCY GRAPH & EXTERNAL DEPENDENCY MATRIX
## Monorepo Directed Acyclic Graph (DAG), External Package Allocations & Circularity Guards

**Document ID:** `UIF-PH03-PACKAGE-DEPENDENCY-GRAPH`  
**Phase:** 03 — Product Specification & Architecture Freeze  
**Status:** Certified / Complete  
**Date:** November 22, 2026  
**Standard:** Principal Software Architect & Principal Infrastructure Engineer  

---

## 1. Executive Monorepo Dependency Hierarchy (DAG)

UIForge enforces a strict **Directed Acyclic Graph (DAG)** across its monorepo packages. Dependencies flow in a single direction: **Ingress Adapters $\rightarrow$ Core Orchestration $\rightarrow$ Domain Engines $\rightarrow$ Infrastructure $\rightarrow$ Contracts**.

Zero circular dependencies are permitted. Circularity is verified at build-time and in CI via `madge --circular packages/*/src`.

```
                  ┌─────────────────┐       ┌──────────────────────┐
                  │  @uiforge/cli   │       │ @uiforge/mcp-server  │
                  └────────┬────────┘       └──────────┬───────────┘
                           │                           │
                           │                           ▼
                           │                ┌──────────────────────┐
                           │                │  @uiforge/agent-sdk  │
                           │                └──────────┬───────────┘
                           │                           │
                           └─────────────┬─────────────┘
                                         ▼
                             ┌──────────────────────┐
                             │    @uiforge/core     │ (Orchestrator)
                             └──────────┬───────────┘
                                        │
    ┌──────────────────────┬────────────┼────────────┬──────────────────────┐
    ▼                      ▼            ▼            ▼                      ▼
┌───────────────┐ ┌───────────────┐ ┌────────┐ ┌───────────────┐ ┌────────────────────┐
│@uiforge/      │ │@uiforge/      │ │@uiforge│ │@uiforge/      │ │@uiforge/           │
│project-intel  │ │design-engine  │ │/tokens │ │safe-modifier  │ │browser-eval        │
└───────┬───────┘ └───────┬───────┘ └───┬────┘ └───────┬───────┘ └─────────┬──────────┘
        │                 │             │              │                   │
        │                 ▼             │              ▼                   ▼
        │          ┌──────────────┐     │      ┌───────────────┐   ┌────────────────┐
        │          │@uiforge/     │     │      │@uiforge/      │   │@uiforge/       │
        │          │component-reg │     │      │security       │   │eval & reporting│
        │          └──────┬───────┘     │      └───────┬───────┘   └────────┬───────┘
        │                 │             │              │                    │
        └─────────────────┴─────────────┼──────────────┴────────────────────┘
                                        ▼
                             ┌──────────────────────┐
                             │   @uiforge/storage   │
                             └──────────┬───────────┘
                                        │
                                        ▼
                             ┌──────────────────────┐
                             │  @uiforge/contracts  │ (Pure Schemas / Types)
                             └──────────────────────┘
```

---

## 2. Monorepo Package Hierarchy Levels

| Level | Monorepo Package | Allowed Imports from Levels | Strict Prohibitions |
| :---: | :--- | :---: | :--- |
| **Level 0** | `@uiforge/contracts` | None (Zero internal deps) | Must NEVER import any other `@uiforge/*` package |
| **Level 1** | `@uiforge/storage`<br>`@uiforge/security` | Level 0 | Cannot import domain engines or core orchestration |
| **Level 2** | `@uiforge/project-intelligence`<br>`@uiforge/tokens`<br>`@uiforge/component-registry`<br>`@uiforge/safe-modifier`<br>`@uiforge/browser-eval`<br>`@uiforge/eval`<br>`@uiforge/reporting` | Levels 0, 1 | Domain engines cannot import each other (except design-engine importing tokens/registry) |
| **Level 3** | `@uiforge/design-engine` | Levels 0, 1, 2 (tokens, registry) | Cannot import safe-modifier, browser-eval, or CLI |
| **Level 4** | `@uiforge/core` | Levels 0, 1, 2, 3 | Cannot import ingress adapters (CLI, MCP, Studio) |
| **Level 5** | `@uiforge/agent-sdk` | Levels 0, 1, 4 | Cannot import CLI or Studio |
| **Level 6** | `@uiforge/mcp-server`<br>`@uiforge/cli`<br>`@uiforge/studio` | Levels 0, 1, 4, 5 (MCP only) | Ingress adapters cannot import each other |

---

## 3. External Dependency Allocation Matrix (Phase 02.4 / 02.5 Integration)

UIForge adopts external dependencies selectively from the approved Phase 02.4 / Phase 02.5 canonical pool. No unvetted, unlicensed, or uncataloged dependencies are permitted.

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                              EXTERNAL DEPENDENCY ALLOCATION MATRIX                               │
├─────────────┬───────────────────────────────┬──────────────┬────────────────────────┬────────────┤
│ Candidate ID│ Upstream Identity / Package   │ Adoption Tier│ Owning Package         │ Mode       │
├─────────────┼───────────────────────────────┼──────────────┼────────────────────────┼────────────┤
│ OS-COMP-01  │ shadcn-ui/ui                  │ Tier 0       │ @uiforge/component-reg │ SOURCE_COPY│
│ OS-COMP-02  │ @radix-ui/react-* primitives  │ Tier 0       │ @uiforge/component-reg │ DEPENDENCY │
│ OS-COMP-03  │ adobe/react-spectrum (Aria)   │ Tier 0       │ @uiforge/component-reg │ DEPENDENCY │
│ OS-TOKN-01  │ design-tokens/community-group │ Tier 0       │ @uiforge/tokens        │ REFERENCE  │
│ OS-TOKN-02  │ style-dictionary (v5.8.0)     │ Tier 0       │ @uiforge/tokens        │ DEPENDENCY │
│ OS-TOKN-04  │ tailwindlabs/tailwindcss (v4) │ Tier 0       │ @uiforge/tokens        │ DEPENDENCY │
│ OS-LAYT-02  │ @tailwindcss/container-queries│ Tier 0       │ @uiforge/tokens        │ DEPENDENCY │
│ OS-TYPO-04  │ rsms/inter (UIForgeInter)     │ Tier 0       │ @uiforge/tokens        │ ASSET_RED. │
│ OS-TYPO-05  │ vercel/geist-font             │ Tier 0       │ @uiforge/tokens        │ ASSET_RED. │
│ OS-D2C-06   │ ast-grep/ast-grep (NAPI)      │ Tier 0       │ @uiforge/project-intel │ EXTERNAL   │
│ OS-D2C-07   │ babel/babel (Parser v7.26+)   │ Tier 0       │ @uiforge/project-intel │ DEPENDENCY │
│ OS-A11Y-01  │ dequelabs/axe-core (CLI)      │ Tier 0       │ @uiforge/browser-eval  │ EXTERNAL*  │
│ OS-A11Y-02  │ @axe-core/playwright (MPL-2.0)│ Tier 0       │ @uiforge/browser-eval  │ DEPENDENCY │
│ OS-A11Y-03  │ eslint-plugin-jsx-a11y        │ Tier 0       │ @uiforge/eval          │ DEPENDENCY │
│ OS-A11Y-08  │ w3c/aria-practices (APG)      │ Tier 0       │ @uiforge/design-engine │ REFERENCE  │
│ OS-BROW-01  │ microsoft/playwright (v1.50+) │ Tier 0       │ @uiforge/browser-eval  │ DEPENDENCY │
│ OS-VREG-01  │ mapbox/pixelmatch (v7.1.0)    │ Tier 0       │ @uiforge/browser-eval  │ DEPENDENCY │
│ OS-AGNT-01  │ @modelcontextprotocol/server  │ Tier 0       │ @uiforge/mcp-server    │ DEPENDENCY │
│ OS-AGNT-02  │ anomalyco/opencode            │ Tier 0       │ @uiforge/agent-sdk     │ REFERENCE  │
│ OS-ANIM-01  │ motiondivision/motion         │ Tier 0       │ @uiforge/studio        │ DEPENDENCY │
│ OS-ICON-01  │ lucide-icons/lucide           │ Tier 0       │ @uiforge/studio        │ DEPENDENCY │
│ OS-CHRT-01  │ recharts/recharts             │ Tier 0       │ @uiforge/studio        │ DEPENDENCY │
│ OS-DASH-03  │ TanStack/table                │ Tier 0       │ @uiforge/studio        │ DEPENDENCY │
│ OS-LAYT-01  │ bvaughn/react-resizable-panels│ Tier 0       │ @uiforge/studio        │ DEPENDENCY │
└─────────────┴───────────────────────────────┴──────────────┴────────────────────────┴────────────┘
*Note: axe-core CLI remains CONDITIONALLY ADOPT — RELEASE BLOCKED PENDING LEGAL COUNSEL CLEARANCE.
```

---

## 4. Circular Dependency Mitigation Strategy

1. **Strict Dependency Hierarchy Rule:** A package at Level $N$ may only import packages at Level $< N$.
2. **Contracts as Ground State:** Any interface, data type, or schema shared between two or more packages must be hoisted into `@uiforge/contracts`.
3. **Automated CI Circularity Gate:**
   ```bash
   pnpm madge --circular --extensions ts packages/*/src
   ```
   If any cycle is introduced, the CI build immediately exits with code 1.
