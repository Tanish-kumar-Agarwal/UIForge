# UIFORGE — PHASE 03: MASTER PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Comprehensive Product Definition, Architectural Positioning, Strategy & Scope Boundaries

**Document ID:** `UIF-PH03-MASTER-PRD`  
**Phase:** 03 — Product Specification & Architecture Freeze  
**Status:** Certified / Complete  
**Date:** November 22, 2026  
**Standard:** Principal Software Architect, Staff Product Engineer & AI Systems Architect  

---

## 1. Executive Product Vision & Mission

### 1.1 Product Vision
To establish the industry-standard **Frontend Engineering Intelligence & Orchestration Platform** that empowers human developers and autonomous AI coding agents to build, understand, maintain, and evolve production web interfaces safely, accessibly, and systematically.

### 1.2 Product Mission
UIForge bridges the semantic and physical chasm between high-level product intent and concrete web implementations. It provides:
1. **Sensory Intelligence:** Deep syntactic and semantic comprehension of existing frontend codebases (AST/CST analysis, route hierarchies, component dependency graphs, styling systems, and design tokens).
2. **Generative Design Engineering:** Structured translation of product requirements into cohesive design briefs, visual directions, W3C DTCG-compliant design token systems, and framework-agnostic component specifications.
3. **Deterministic Verification:** Independent, multi-viewport headless browser execution verifying accessibility (WCAG 2.2 AA), responsive usability, visual diffs, and functional console/network cleanliness.
4. **Safe Action Space:** Non-destructive, human-authorized AST code modifications backed by pre-image write-ahead logging (WAL) and TypeScript semantic regression comparators.
5. **Agent Interoperability:** Model Context Protocol (MCP) server endpoints and Agent Integration SDKs that transform external coding agents from blind code generators into precision engineering instruments.

### 1.3 What UIForge Is NOT
- **NOT a generic website builder (Wix, Webflow, Squarespace):** Does not lock users into proprietary hosted runtimes or drag-and-drop silos.
- **NOT an autonomous coding agent (Claude Code, Cursor, OpenCode):** Does not replace agent reasoning or sell LLM inference; acts as the authoritative execution oracle and verification gatekeeper.
- **NOT a component library (MUI, Chakra, Ant Design):** Does not force a monolithic runtime UI component dependency upon consumer projects.
- **NOT a mere shadcn/ui wrapper:** Supports multi-framework architectures (React, Vue, Svelte), native CSS variables, Tailwind v3/v4, CSS Modules, and custom token pipelines.
- **NOT a generic AI chatbot or prompt generator:** Operates deterministically via typed schemas, AST manipulation, and headless browser instrumentation.
- **NOT a closed, cloud-dependent SaaS:** The entire core engine runs 100% locally on developer machines and in headless CI/CD pipelines.

---

## 2. Core Value Proposition & Competitive Differentiation

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 THE UIFORGE ADVANTAGE                                  │
├──────────────────────────┬─────────────────────────────────────────────────────────────┤
│ Dimension                │ How UIForge Radically Differs from Existing Tools           │
├──────────────────────────┼─────────────────────────────────────────────────────────────┤
│ 1. Sensory Grounding     │ Deep AST analysis of routes, tokens, and components vs      │
│                          │ blind text-scraping and shallow file concatenation.         │
├──────────────────────────┼─────────────────────────────────────────────────────────────┤
│ 2. Design System Focus   │ First-class W3C DTCG design tokens compiling to native CSS  │
│                          │ variables & Tailwind v4 vs hardcoded inline hex colors.     │
├──────────────────────────┼─────────────────────────────────────────────────────────────┤
│ 3. Independent QA        │ Headless browser verification (Playwright + Pixelmatch +    │
│                          │ axe-core) producing cryptographic evidence vs LLM guesswork.│
├──────────────────────────┼─────────────────────────────────────────────────────────────┤
│ 4. Non-Destructive Edits │ Pre-image Write-Ahead Logging (WAL) + TS diagnostic baseline│
│                          │ regression checks vs silent, destructive multi-file rewrites│
├──────────────────────────┼─────────────────────────────────────────────────────────────┤
│ 5. Agent Interoperability│ Native Model Context Protocol (MCP 2026-07-28) providing    │
│                          │ typed, permission-bounded tools to any external coding agent│
└──────────────────────────┴─────────────────────────────────────────────────────────────┘
```

### Detailed Differentiation Analysis

#### 1. vs. Website Builders (Webflow, Framer, Wix)
- **Code Ownership:** Website builders output proprietary or convoluted compiled HTML/CSS hosted on their infrastructure. UIForge outputs clean, maintainable, standard TypeScript/JSX source code directly into the developer's Git repository.
- **Developer Workflow:** Website builders isolate developers in visual canvas silos. UIForge integrates natively into standard developer toolchains (Git, VS Code, CI/CD, npm/pnpm).

#### 2. vs. AI Coding Agents (Cursor, Claude Code, GitHub Copilot)
- **Role Separation:** Coding agents are *reasoning engines* that generate probabilistic text. UIForge is the *deterministic substrate* that provides accurate project context, verifies generated UI in a real browser, checks accessibility rules, and gates file writes behind user authorization.
- **Verification Feedback Loops:** Coding agents cannot see rendered DOM layouts, computed CSS styles, or console errors unless paired with an environment tool. UIForge provides these sensory capabilities through standardized MCP endpoints.

#### 3. vs. Component Registries & UI Kits (shadcn/ui, Aceternity, Tailwind UI)
- **Dynamic Adaptation:** Component registries provide static copy-paste snippets that assume a specific Tailwind configuration and icon library. UIForge actively inspects the consumer's existing styling system and adapts imported components to match the target project's design tokens and conventions.
- **Governance & Verification:** UIForge audits registry components for accessibility defects, bundle size impacts, and license compliance before allowing source adaptation.

#### 4. vs. Browser Automation & Visual Regression Tools (Cypress, Percy, Chromatic, BackstopJS)
- **Integration with Code Mutation:** Existing visual regression tools are passive post-commit CI monitors. UIForge bridges verification directly into the active editing loop: agents propose changes, UIForge renders the proposed change in a headless sandbox, computes pixel and DOM differences, and feeds visual evidence back to the agent before committing.
- **Zero Heavy SaaS Dependency:** Standard visual diffing runs locally via `pixelmatch` without requiring paid third-party cloud screenshot storage.

#### 5. vs. Accessibility Scanners (Lighthouse, axe DevTools, Pa11y)
- **Active Remediation:** Traditional scanners produce static lists of WCAG failures that overwhelm developers. UIForge pairs accessibility scanning with project intelligence to pinpoint the exact AST node responsible, generate an accessible code patch, and verify the repair in headless Playwright.

---

## 3. Product Scope, Boundaries & Invariants

### 3.1 Non-Negotiable Product Invariants
1. **Read-Only by Default:** All scanning, AST parsing, token extraction, and audit operations are strictly non-mutating `[PHASE-02-DECIDED]`.
2. **Headless Core Independence:** The core analysis and verification engine operates 100% locally via CLI or programmatic API with zero network connectivity or cloud dependencies `[ARCHITECTURE-DECISION]`.
3. **Human-in-the-Loop Modification Gate:** No file modification, package installation, or configuration change may occur without human review and approval of a structured, diff-bound proposal `[PHASE-02-DECIDED]`.
4. **Zero Proprietary Framework Lock-In:** Core design contracts and token representations remain framework-agnostic, supporting React, Next.js, Vite, Vue, Svelte, and native CSS `[ARCHITECTURE-DECISION]`.
5. **Deterministic Evidence Over Probabilistic Claims:** Quality scores must be backed by reproducible test logs, axe-core assertion arrays, pixel difference ratios, or TypeScript diagnostic comparisons `[PHASE-02-DECIDED]`.

### 3.2 Explicit Exclusions from Product Scope (Out of Scope)
- Backend API implementation, database schema migrations, or server-side ORM management.
- Custom LLM model training, fine-tuning, or proprietary weight hosting.
- WYSIWYG visual drag-and-drop site building or freeform graphic vector drawing.
- Mobile native application compilation (iOS/Android native binaries).
- Production web application hosting, domain DNS management, or cloud CDN provisioning.

---

## 4. Open-Source vs. Open-Core Product Strategy

UIForge adopts an **Open-Core Strategy** that protects developer trust, enables broad community adoption, and establishes sustainable commercial boundaries:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              OPEN-CORE PRODUCT BOUNDARIES                              │
├──────────────────────────────────────────┬─────────────────────────────────────────────┤
│ Free Open-Source Core (Apache-2.0 / MIT) │ Commercial Enterprise / Hosted Extensions   │
├──────────────────────────────────────────┼─────────────────────────────────────────────┤
│ - UIForge Core Engine (@uiforge/core)    │ - UIForge Studio Hosted Cloud Workspace     │
│ - Project Intelligence Scanner           │ - Multi-User Team Collaboration & RBAC      │
│ - Design Token Engine (W3C DTCG Format)  │ - Centralized Cross-Project Design Systems  │
│ - Local Headless Browser Evaluator       │ - Hosted Continuous Accessibility Audits    │
│ - Model Context Protocol Server (MCP)    │ - Enterprise SSO, SAML & Audit Log Streaming│
│ - Local Developer CLI (@uiforge/cli)     │ - SOC2 / HIPAA Compliance Evidence Vault    │
│ - Community Component Registry Adaptor   │ - Private Organizational Component Hubs     │
└──────────────────────────────────────────┴─────────────────────────────────────────────┘
```

### 4.1 Local-First vs. Hosted Responsibilities
- **Local-First (Always Free & Open):**
  - Parsing local source code on the developer's workstation.
  - Generating and transforming local design tokens.
  - Launching local headless Playwright browser instances.
  - Storing project snapshots and transaction journals in local `.uiforge/` directory.
  - Serving local MCP endpoints over stdio or local HTTP ports.
- **Hosted (Optional Value-Add Service):**
  - Cross-team component registries and private token hubs.
  - Persistent historical regression analytics across hundreds of repositories.
  - Centralized executive compliance dashboards for European Accessibility Act / ADA audits.

---

## 5. Developer & AI Agent Interoperability Model

UIForge provides two symmetrical ingress vectors that share the exact same underlying domain logic:

```
┌──────────────────────────────────┐        ┌──────────────────────────────────┐
│        HUMAN DEVELOPER           │        │       AUTONOMOUS AI AGENT        │
│   (Terminal, IDE, VS Code)       │        │ (Claude Code, Cursor, OpenCode)  │
└─────────────────┬────────────────┘        └─────────────────┬────────────────┘
                  │                                           │
                  │ CLI Flags & Prompts                       │ MCP JSON-RPC 2026-07-28
                  ▼                                           ▼
┌──────────────────────────────────┐        ┌──────────────────────────────────┐
│      @uiforge/cli (Layer 1)      │        │   @uiforge/mcp-server (Layer 2)  │
└─────────────────┬────────────────┘        └─────────────────┬────────────────┘
                  │                                           │
                  └─────────────────────┬─────────────────────┘
                                        ▼
                      ┌──────────────────────────────────┐
                      │    UIFORGE CORE ORCHESTRATION    │
                      │    (@uiforge/core - Layer 3)     │
                      └─────────────────┬────────────────┘
                                        ▼
  ┌───────────────────────┬───────────────────────┬───────────────────────┐
  ▼                       ▼                       ▼                       ▼
Project Intel          Design Tokens          Browser Eval          Safe Modifier
(AST & Routes)         (W3C DTCG v5)          (Playwright)          (WAL & Patches)
```

1. **Human CLI (`uiforge`):** Interactive terminal commands formatted with clear spinners, formatted tables, unified diffs, and color-coded accessibility findings.
2. **Agent Ingress (MCP Server):** Model Context Protocol specification `2026-07-28` exposing structured, capability-bounded tools (`analyze_project`, `extract_tokens`, `search_components`, `verify_in_browser`, `propose_modification`). Every write operation requires explicit human authorization tokens.
