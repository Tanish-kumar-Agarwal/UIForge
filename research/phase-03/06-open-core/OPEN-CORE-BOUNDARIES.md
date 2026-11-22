# UIFORGE — PHASE 03: OPEN-CORE BOUNDARIES & PRODUCT SEPARATION
## Permissive Open-Source Core, Commercial Delimitation, Data Ownership & API Boundaries

**Document ID:** `UIF-PH03-OPEN-CORE-BOUNDARIES`  
**Phase:** 03 — Product Specification & Architecture Freeze  
**Status:** Certified / Complete  
**Date:** November 22, 2026  
**Standard:** Principal Software Architect & Legal/Supply-Chain Auditor  

---

## 1. Executive Open-Core Strategy

UIForge establishes a clear, permanent, and developer-aligned **Open-Core Product Boundary**. In accordance with ADR-010, the core engineering engine is 100% open-source, fully featured, and completely functional offline under the permissive **Apache-2.0 License**.

Commercial extensions (UIForge Studio Hosted, Enterprise Compliance Vault, Organization Component Hub) are strictly additive, targeting enterprise team collaboration, cross-repository governance, and regulatory audit streaming without crippling local developer capabilities.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              OPEN-CORE PRODUCT TOPOLOGY                                │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. OPEN-SOURCE CORE PLATFORM (Apache-2.0 / MIT - 100% Free & Local-First)              │
│ - @uiforge/core (Orchestration Engine, Task State Machine)                             │
│ - @uiforge/contracts (Shared Zod Schemas & TypeScript Types)                           │
│ - @uiforge/project-intelligence (AST Parser, Route Tree Generator)                     │
│ - @uiforge/tokens (W3C DTCG Token Engine, Style Dictionary v5.8 Compiler)              │
│ - @uiforge/component-registry (shadcn Source-Copy Registry Engine)                     │
│ - @uiforge/safe-modifier (Coordinate Slice Patcher, WAL Engine, TS Diagnostic Check)   │
│ - @uiforge/browser-eval (Playwright Headless Runner, Pixelmatch Visual Diffing)        │
│ - @uiforge/eval & @uiforge/reporting (Finding Scorer, HTML & Markdown Dossier Builder) │
│ - @uiforge/mcp-server (Official Model Context Protocol 2026-07-28 Ingress Server)      │
│ - @uiforge/cli (Developer Terminal Command-Line Executable uiforge)                    │
│ - @uiforge/storage (Local .uiforge/ JSON manifests, SQLite state.db)                   │
│ - @uiforge/security (5-Level Security Ladder, Diff-Bound HMAC Token Signer)            │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 2. COMMERCIAL & HOSTED EXTENSIONS (Proprietary / Additive - Level C Scope)             │
│ - UIForge Studio Cloud (Multi-Tenant Collaborative Web Workspace)                      │
│ - Organization Component Hub (Private Enterprise Registries & Cross-Repo Sync)        │
│ - Enterprise Compliance Vault (Centralized European Accessibility Act / ADA Reporting)│
│ - Enterprise Governance (SAML 2.0 / OIDC SSO, Role-Based Access Control, Audit Stream) │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Granular Subsystem Boundary Specifications

### 2.1 UIForge Core (`@uiforge/core`)
- **Responsibilities:** Central application orchestration, task lifecycle management, engine dispatching, and task state machine execution.
- **Data Ownership:** In-memory task state, workflow execution graphs, active run contexts.
- **Dependency Direction:** Consumes `@uiforge/contracts`, `@uiforge/storage`, `@uiforge/security`; consumed by CLI and MCP Server.
- **Public API:** `IWorkflowCoordinator`, `TaskRunner`, `TaskStateMachine`.
- **Licensing:** Apache-2.0 (Permissive open source).
- **Optionality:** Required Core Subsystem.
- **Deployment:** Embedded in Node.js process; runs 100% locally offline.

### 2.2 Developer CLI (`@uiforge/cli`)
- **Responsibilities:** Human developer command-line interaction (`uiforge [command]`), terminal flag parsing, Clack interactive prompts, unified diff rendering, and local status output.
- **Data Ownership:** User CLI config (`~/.uiforge/config.json`), terminal session state.
- **Dependency Direction:** Consumes `@uiforge/core`, `@uiforge/contracts`; never consumed by Core.
- **Public API:** Executable binary `uiforge`.
- **Licensing:** Apache-2.0.
- **Optionality:** Standard Ingress Interface for human developers.
- **Deployment:** Installed globally (`npm install -g @uiforge/cli`) or executed via `npx @uiforge/cli`.

### 2.3 Agent Integration SDK (`@uiforge/agent-sdk`)
- **Responsibilities:** Provides typed programmatic interfaces, tool descriptor definitions, context token budgeting, and authorization bridges for external AI coding agents.
- **Data Ownership:** Agent tool definitions, context token usage metrics.
- **Dependency Direction:** Consumes `@uiforge/core`, `@uiforge/contracts`; consumed by MCP Server.
- **Public API:** `AgentToolRegistry`, `ContextTokenBudgeter`, `ApprovalBridge`.
- **Licensing:** Apache-2.0.
- **Optionality:** Required for agent integrations.
- **Deployment:** Embedded in `@uiforge/mcp-server` or imported by programmatic agent runners.

### 2.4 Model Context Protocol Server (`@uiforge/mcp-server`)
- **Responsibilities:** Implements official MCP specification `2026-07-28` (with automatic `2025-11-25` legacy fallback). Exposes typed tools over `stdio` pipes and Streamable HTTP (`POST /mcp`).
- **Data Ownership:** Active MCP JSON-RPC connection sessions.
- **Dependency Direction:** Consumes `@uiforge/agent-sdk`, `@uiforge/core`, `@uiforge/contracts`.
- **Public API:** Stdio launcher `uiforge mcp`, HTTP server daemon.
- **Licensing:** Apache-2.0.
- **Optionality:** Optional Ingress Adapter (installed on-demand for agent workflows).
- **Deployment:** Child subprocess of coding agents (Claude Code, Cursor) or local background daemon.

### 2.5 Local Studio Workspace (`@uiforge/studio` - Level B)
- **Responsibilities:** Optional local graphical web/desktop SPA for visual token editing, component inspection, interactive diff approval, and real-time verification galleries.
- **Data Ownership:** Local Studio UI preferences, active visual view state.
- **Dependency Direction:** Consumes `@uiforge/core` via local HTTP/WebSocket API; Core has ZERO dependencies on Studio.
- **Public API:** Studio launcher `uiforge studio`.
- **Licensing:** Apache-2.0 (Local-first open-source edition).
- **Optionality:** Strictly Optional (Core and CLI are 100% complete without Studio).
- **Deployment:** Spun up locally on `http://127.0.0.1:4200` on developer demand.

### 2.6 Hosted Enterprise Services (Level C Scope)
- **Responsibilities:** Centralized cross-repository management, private organization component registries, historical compliance audit vault, and team collaboration.
- **Data Ownership:** Multi-tenant user accounts, organization memberships, aggregated compliance metrics.
- **Dependency Direction:** External cloud service; communicates with local CLI via signed API tokens.
- **Public API:** REST API / Webhooks (`https://api.uiforge.com/v1`).
- **Licensing:** Proprietary Commercial SaaS.
- **Optionality:** Completely Optional (Targeted strictly at enterprise teams; individual developers never need an account).
- **Deployment:** Multi-region cloud infrastructure (AWS/GCP, PostgreSQL, Redis, S3).
