# UIFORGE — PHASE 03: MVP SCOPE, PRODUCT BOUNDARIES & ROADMAP TIERS
## Three-Tier Scope Architecture, Vertical Slice Justification & Feature Boundary Governance

**Document ID:** `UIF-PH03-MVP-SCOPE`  
**Phase:** 03 — Product Specification & Architecture Freeze  
**Status:** Certified / Complete  
**Date:** November 22, 2026  
**Standard:** Principal Software Architect & Staff Product Engineer  

---

## 1. Executive Scope Strategy

A common failure mode in developer tools is attempting to build a massive, sprawling platform—combining a CLI, desktop GUI, cloud backend, multi-agent orchestrator, custom web framework, and hosting service—before delivering a single working vertical slice.

UIForge establishes a strict **Three-Tier Scope Architecture**:
- **Level A (MVP):** The leanest, fully coherent vertical slice that delivers UIForge's defining value proposition. Focuses on **brownfield codebase comprehension, token governance, headless browser verification, safe modifications, and agent MCP tooling via the CLI**.
- **Level B (Product Expansion):** Greenfield project generation, multi-variant visual directions, more framework adapters, and the local visual Studio workspace.
- **Level C (Advanced Enterprise Platform):** Standalone benchmark evaluation suites, multi-agent swarm collaboration, private enterprise registries, and hosted team synchronization.

---

## 2. Granular Three-Tier Scope Partitioning

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              THREE-TIER SCOPE MATRIX                                   │
├─────────┬────────────────────────────────┬────────────────────────────┬────────────────┤
│ Scope   │ Capability Scope & Focus       │ Target Modules             │ Delivery Phase │
├─────────┼────────────────────────────────┼────────────────────────────┼────────────────┤
│ LEVEL A │ Core Brownfield Intelligence,  │ @uiforge/core              │ Phase 04 / 05  │
│ (MVP)   │ W3C Tokens, Browser Eval,      │ @uiforge/project-intel     │ (Initial GA)   │
│         │ Safe Modifier, MCP Server,     │ @uiforge/tokens            │                │
│         │ Local CLI & Quality Reports    │ @uiforge/component-reg     │                │
│         │                                │ @uiforge/browser-eval      │                │
│         │                                │ @uiforge/safe-modifier     │                │
│         │                                │ @uiforge/mcp-server        │                │
│         │                                │ @uiforge/cli               │                │
├─────────┼────────────────────────────────┼────────────────────────────┼────────────────┤
│ LEVEL B │ Greenfield Project Generation, │ @uiforge/scaffold          │ Phase 06       │
│ (Exp.)  │ Multi-Variant Visual Themes,   │ @uiforge/design-engine     │ (Expansion)    │
│         │ Vue & Svelte Adapters,         │ @uiforge/adapter-vue       │                │
│         │ Local Studio GUI Workspace     │ @uiforge/studio            │                │
├─────────┼────────────────────────────────┼────────────────────────────┼────────────────┤
│ LEVEL C │ Benchmark Evaluation Platform, │ @uiforge/bench             │ Phase 07+      │
│ (Adv.)  │ Multi-Agent Swarm Orchestration│ @uiforge/swarm             │ (Enterprise)   │
│         │ Hosted Team Collaboration Hub, │ @uiforge/cloud-sync        │                │
│         │ Enterprise RBAC & SSO          │                            │                │
└─────────┴────────────────────────────────┴────────────────────────────┴────────────────┤
│ TOTAL   │ Complete 15 Functional Reqs    │ 16 Monorepo Packages       │ Full Roadmap   │
└─────────┴────────────────────────────────┴────────────────────────────┴────────────────┘
```

---

## 3. Justification of Level A (MVP) Boundaries

### 3.1 Why Brownfield Before Greenfield?
Greenfield project creation is already crowded with thousands of starter kits and `create-*` CLIs (`create-next-app`, `create-vite`). The true, unaddressed crisis in frontend engineering is **brownfield codebases**: existing production applications where styles are fragmented, components are duplicated, accessibility is broken, and AI coding agents make uncontrolled, destructive edits.

By optimizing Level A for **Existing Project Analysis (`FR-02`) and Safe Modification (`FR-11`)**, UIForge provides immediate, irreplaceable utility to every working frontend developer and coding agent on day one.

### 3.2 Why Headless CLI & MCP Before Studio GUI?
Developers and coding agents work in terminals, code editors (VS Code, Cursor), and background daemons. A visual web Studio is valuable for visual designers, but it is **not** on the critical path for automated CI verification or agent tool execution.

Building `@uiforge/cli` and `@uiforge/mcp-server` first ensures that the underlying domain contracts, token compilers, and headless browser runners are thoroughly tested, performant, and reliable before building visual UI layers on top.

### 3.3 What Is Explicitly Excluded from Level A (MVP)?
1. **No Hosted Cloud Backend:** Level A is 100% local-first; no databases, no AWS/GCP services, no cloud user accounts.
2. **No Visual Desktop/Web Studio:** Level A is operated strictly via terminal CLI and MCP protocol.
3. **No Closed-Source Multi-Model Wrappers:** UIForge does not bundle or bill for LLM inference; external agents connect over MCP.
4. **No Non-React/Tailwind Deep Adapters:** Level A focuses deeply on React/Next.js/Vite with Tailwind v3/v4 and native CSS custom properties before expanding to Vue, Svelte, or Angular in Level B.

---

## 4. MVP Functional Capability Checklist (Level A)

| Feature ID | Feature Name | Included in MVP? | Justification |
| :--- | :--- | :---: | :--- |
| **FR-01** | New Project Creation | **NO (Level B)** | Brownfield analysis delivers higher immediate value; greenfield deferred to Phase 06. |
| **FR-02** | Existing Project Analysis | **YES (Level A)** | Critical core foundation for all downstream operations; non-destructive AST scanning. |
| **FR-03** | Design Brief Generation | **YES (Level A)** | Translates user requirements into structured constraints for agents and developers. |
| **FR-04** | Visual Direction Generation | **NO (Level B)** | Advanced visual styling variants deferred to Studio integration in Level B. |
| **FR-05** | Design-System Generation | **YES (Level A)** | W3C DTCG token compilation to native CSS variables and Tailwind v4 `@theme`. |
| **FR-06** | Component Discovery | **YES (Level A)** | Semantic search of local and approved Phase 02.4 component registries (shadcn model). |
| **FR-07** | UX Evaluation | **YES (Level A)** | Responsive viewport testing (375px–1920px), horizontal overflow detection, tap targets. |
| **FR-08** | Accessibility Evaluation | **YES (Level A)** | Automated WCAG 2.2 AA testing via `@axe-core/playwright` and `eslint-plugin-jsx-a11y`. |
| **FR-09** | Agent Integration (MCP) | **YES (Level A)** | Official MCP specification 2026-07-28 server exposing typed tools to coding agents. |
| **FR-10** | Browser Evaluation | **YES (Level A)** | Playwright headless automation, console exception collection, and pixelmatch diffing. |
| **FR-11** | Safe Modification (WAL) | **YES (Level A)** | Coordinate slice patching, Write-Ahead Logging, and TypeScript baseline diagnostic checks. |
| **FR-12** | Studio Workspace | **NO (Level B)** | Optional graphical workspace deferred to Level B; Core remains 100% headless. |
| **FR-13** | Project History | **YES (Level A)** | Immutable snapshot manifests and append-only `.uiforge/audit.jsonl` event journals. |
| **FR-14** | Quality Reports | **YES (Level A)** | Self-contained, tamper-evident HTML and Markdown quality compliance dossiers. |
| **FR-15** | Benchmark Management | **NO (Level C)** | Dedicated agent evaluation platform deferred to Level C research tooling. |
