# UIFORGE — PHASE 03: FUNCTIONAL REQUIREMENTS REGISTER (FR-01 TO FR-15)
## Authoritative Technical Capabilities, Acceptance Criteria & System Contracts

**Document ID:** `UIF-PH03-FUNCTIONAL-REQUIREMENTS`  
**Phase:** 03 — Product Specification & Architecture Freeze  
**Status:** Certified / Complete  
**Date:** November 22, 2026  
**Standard:** Principal Software Architect & Staff Product Engineer  

---

## 1. Overview of Functional Requirements

This register defines the 15 core functional capabilities of UIForge. Each requirement is specified with unambiguous actors, preconditions, inputs, workflows, outputs, testable acceptance criteria, failure recovery states, security constraints, and MVP boundary classifications.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        FUNCTIONAL REQUIREMENTS INDEX (FR-01–FR-15)                     │
├───────┬────────────────────────────────────┬──────────┬──────────────┬─────────────────┤
│ ID    │ Capability Name                    │ Priority │ Phase Scope  │ Target Module   │
├───────┼────────────────────────────────────┼──────────┼──────────────┼─────────────────┤
│ FR-01 │ New Project Creation               │ P1       │ Level B      │ @uiforge/core   │
│ FR-02 │ Existing Project Analysis          │ P0       │ Level A (MVP)│ @uiforge/intel  │
│ FR-03 │ Design Brief Generation            │ P1       │ Level A (MVP)│ @uiforge/design │
│ FR-04 │ Visual Direction Generation        │ P1       │ Level B      │ @uiforge/design │
│ FR-05 │ Design-System Generation           │ P0       │ Level A (MVP)│ @uiforge/tokens │
│ FR-06 │ Component Discovery & Evaluation   │ P0       │ Level A (MVP)│ @uiforge/reg    │
│ FR-07 │ UX Evaluation                      │ P1       │ Level A (MVP)│ @uiforge/eval   │
│ FR-08 │ Accessibility Evaluation (WCAG)    │ P0       │ Level A (MVP)│ @uiforge/eval   │
│ FR-09 │ Agent Integration & MCP Ingress    │ P0       │ Level A (MVP)│ @uiforge/agent  │
│ FR-10 │ Browser Headless Evaluation        │ P0       │ Level A (MVP)│ @uiforge/browser│
│ FR-11 │ Safe Modification & WAL Recovery   │ P0       │ Level A (MVP)│ @uiforge/safe   │
│ FR-12 │ Studio Workspace & Management      │ P2       │ Level B / C  │ @uiforge/studio │
│ FR-13 │ Project History & Snapshots        │ P1       │ Level A (MVP)│ @uiforge/store  │
│ FR-14 │ Evidence-Backed Quality Reports    │ P0       │ Level A (MVP)│ @uiforge/report │
│ FR-15 │ Benchmark Management & Evals       │ P2       │ Level C      │ @uiforge/bench  │
└───────┴────────────────────────────────────┴──────────┴──────────────┴─────────────────┘
```

---

## 2. Granular Functional Requirement Specifications

### FR-01: New Project Creation
- **Requirement ID:** `FR-01`
- **Name:** New Project Scaffolding & Initial Specification
- **Description:** Scaffolds a modern, production-grade frontend project from scratch based on user product requirements, detected framework preferences, styling selections, and an initial UIForge configuration.
- **User Problem:** Setting up new frontend projects requires hours configuring build tools, design token pipelines, component registries, linting, and accessibility test harnesses.
- **Actors:** Human Developer, Autonomous Coding Agent, CLI.
- **Preconditions:** Target directory must be empty or non-existent; Node.js >= 22.0.0 installed.
- **Inputs:** Project name, target framework (Next.js, Vite-React, SvelteKit), styling engine (Tailwind v4, CSS Modules), initial design brief / product intent prompt.
- **Workflow:**
  1. User runs `uiforge init <project-name>`.
  2. CLI prompts for framework, styling, and design preferences (or accepts JSON configuration).
  3. UIForge invokes scaffold generator creating directory structure, `package.json`, and `@uiforge` configuration.
  4. Generates initial W3C DTCG design token file (`tokens.json`) with primitive color, spacing, and typography scales.
  5. Scaffolds initial component registry adapter (`components.json` for shadcn/ui or custom registry).
  6. Configures automated Playwright and accessibility test harness.
  7. Creates baseline Project Snapshot `v1.0.0` in `.uiforge/snapshots/`.
- **Outputs:** Complete project repository with buildable code, test harness, design token pipeline, and `.uiforge/` project manifest.
- **Acceptance Criteria:**
  - AC-01.1: Scaffolding completes with clean exit code 0 and passes `npm run build` or `pnpm build` with zero TypeScript errors.
  - AC-01.2: Generates valid W3C DTCG 2025.10 token file compilable by Style Dictionary v5.8.0.
  - AC-01.3: Initializes git repository with clean baseline commit if target is not already inside a git tree.
- **Failure Cases:** Target directory non-empty (halts and prompts for `--force`); unsupported framework choice (displays supported matrix).
- **Security Considerations:** Target directory path traversal validation; prevents initializing inside system directories (`/etc`, `C:\Windows`).
- **Dependencies:** `@uiforge/core`, `@uiforge/tokens`, template starter kits.
- **Priority:** P1 | **Scope:** Level B (Product Expansion) | **Evidence Class:** `[ARCHITECTURE-DECISION]`

---

### FR-02: Existing Project Analysis
- **Requirement ID:** `FR-02`
- **Name:** Read-Only Existing Project Inspection & Semantic Comprehension
- **Description:** Performs deep, non-mutating AST/CST analysis of a brownfield codebase to discover directory structure, package dependencies, routing hierarchies, component trees, styling systems, and active design tokens.
- **User Problem:** AI coding agents and new developers lack structural context in large codebases, leading to hallucinated styles, duplicate components, and broken routing logic.
- **Actors:** Human Developer, Autonomous Coding Agent, CLI, MCP Server.
- **Preconditions:** Target directory contains a readable package manifest (`package.json`) or recognized frontend files.
- **Inputs:** Project root path, optional scan depth, optional path inclusion/exclusion patterns.
- **Workflow:**
  1. User/Agent executes `uiforge analyze [path]`.
  2. File scanner traverses repository obeying `.gitignore` and `.uiforgeignore`.
  3. AST engine parses `package.json` to detect active framework (Next.js, React, Remix, Vue), styling libraries (Tailwind v3/v4, CSS Modules, styled-components), and component packages.
  4. Route parser extracts file-based routing trees (Next.js app/pages router, React Router).
  5. Component discovery engine parses JSX/TSX files via `@babel/parser` / TypeScript Compiler API to identify exported components, prop interfaces, and dependency graphs.
  6. Token extractor scans CSS files and Tailwind configurations to extract active color palettes, font ramps, and spacing scales.
  7. Creates a read-only `ProjectAnalysisRecord` in memory or caches to `.uiforge/cache/analysis.json`.
- **Outputs:** Structured `ProjectAnalysisRecord` (JSON) containing framework metadata, route tree, component catalog, token map, and architectural summary.
- **Acceptance Criteria:**
  - AC-02.1: 100% read-only execution; zero files modified, created, or deleted in the target codebase.
  - AC-02.2: Correctly identifies Next.js (App vs Pages), Vite-React, and SvelteKit across 100% of tested fixtures.
  - AC-02.3: Parses at least 1,000 source files in under 5.0 seconds on standard 8-core workstations.
- **Failure Cases:** Unparseable syntax in legacy files (logs warning, collects error, continues scanning remaining files without crashing).
- **Security Considerations:** Enforces symlink cycle detection; denies scanning paths outside repository root (path traversal block).
- **Dependencies:** `@uiforge/project-intelligence`, `@babel/parser`, `ast-grep`, `typescript`.
- **Priority:** P0 | **Scope:** Level A (MVP) | **Evidence Class:** `[PHASE-02-DECIDED]`

---

### FR-03: Design Brief Generation
- **Requirement ID:** `FR-03`
- **Name:** Product Intent & Design Brief Formulation
- **Description:** Translates natural language feature requests, PRDs, or user stories into a structured, machine-actionable Design Brief detailing user personas, information architecture, page requirements, accessibility criteria, and design constraints.
- **User Problem:** Vague product prompts given to AI agents result in generic, uninspired layouts that miss critical functional states (loading, empty, error) and accessibility needs.
- **Actors:** Product Manager, Human Developer, AI Agent.
- **Preconditions:** Project context must be established (via FR-01 or FR-02).
- **Inputs:** Plain-text requirement prompt, target route/page context, brand guidelines, target audience description.
- **Workflow:**
  1. User runs `uiforge design brief "Add interactive analytics dashboard with filtering"`.
  2. Engine combines requirement input with existing project tokens and component catalog.
  3. Formulates structured `DesignBriefRecord` defining:
     - Target user personas and core jobs-to-be-done.
     - Information architecture and layout hierarchy.
     - Key states: Default, Loading, Empty, Error, Filtered.
     - Responsive breakpoint constraints (Mobile, Tablet, Desktop).
     - Accessibility constraints (Keyboard navigation, ARIA live regions, minimum 4.5:1 contrast).
  4. Emits formatted Markdown specification and machine-readable JSON schema.
- **Outputs:** `DesignBriefRecord` artifact (`.uiforge/briefs/BRIEF-<id>.json`).
- **Acceptance Criteria:**
  - AC-03.1: Emitted brief validates 100% against `uiforge.contract.design-brief.v1` JSON Schema.
  - AC-03.2: Every brief includes explicit state definitions for loading, empty, and error conditions.
  - AC-03.3: Integrates existing project token constraints rather than inventing conflicting color systems.
- **Failure Cases:** Empty or ambiguous requirement input (prompts for clarification on target page and user intent).
- **Security Considerations:** Sanitizes prompt text to prevent prompt-injection attacks targeting downstream LLM agents.
- **Dependencies:** `@uiforge/design-engine`, `@uiforge/project-intelligence`.
- **Priority:** P1 | **Scope:** Level A (MVP) | **Evidence Class:** `[ARCHITECTURE-DECISION]`

---

### FR-04: Visual Direction Generation
- **Requirement ID:** `FR-04`
- **Name:** Multi-Variant Visual Direction Formulation & Selection
- **Description:** Generates 2–3 cohesive visual directions (color palettes, typography pairings, surface elevation, density, radius ramps) matching a Design Brief, allowing the user to select and lock an aesthetic theme.
- **User Problem:** Developers struggle to pick harmonious color palettes and typography that match the brand archetype, resulting in visually dissonant interfaces.
- **Actors:** Human Developer, UI/UX Designer, CLI.
- **Preconditions:** Approved `DesignBriefRecord` from FR-03.
- **Inputs:** `DesignBriefRecord`, brand archetype (e.g. Modern Minimalist, High-Density Enterprise, Vibrant Consumer, Technical Terminal).
- **Workflow:**
  1. User runs `uiforge design direction --brief=BRIEF-<id>`.
  2. Engine synthesizes 3 distinct visual variants conforming to the brief constraints:
     - Variant A: High-contrast, clean enterprise layout.
     - Variant B: Soft-elevation, modern consumer layout.
     - Variant C: Compact, high-density analytical layout.
  3. Displays side-by-side terminal comparison of color ramps, font scales, and component sample mockups.
  4. User selects preferred variant via interactive CLI menu or web preview.
  5. Locks selected direction as `VisualDirectionRecord`.
- **Outputs:** `VisualDirectionRecord` artifact (`.uiforge/directions/DIR-<id>.json`).
- **Acceptance Criteria:**
  - AC-04.1: All generated color pairs mathematically verify WCAG 2.2 AA contrast ($\ge 4.5:1$ text, $\ge 3.0:1$ large text/icons).
  - AC-04.2: Typography pairings select from verified open font universe (Inter `OS-TYPO-04`, Geist `OS-TYPO-05`, JetBrains Mono `OS-TYPO-03`).
  - AC-04.3: User selection is persisted immutably with cryptographic timestamp.
- **Failure Cases:** Conflicting user brand color that fails accessibility contrast (warns user and provides accessible adjusted hex variant).
- **Security Considerations:** No external asset downloading; utilizes locally cached font assets and CSS variables.
- **Dependencies:** `@uiforge/design-engine`, `@uiforge/tokens`.
- **Priority:** P1 | **Scope:** Level B (Product Expansion) | **Evidence Class:** `[ARCHITECTURE-DECISION]`

---

### FR-05: Design-System Generation
- **Requirement ID:** `FR-05`
- **Name:** W3C DTCG Token Compilation & Style System Adaptation
- **Description:** Compiles W3C Design Tokens Community Group (DTCG 2025.10) formatted token files into production-ready styling artifacts: native CSS custom properties, Tailwind CSS v4 `@theme` rules, or Tailwind v3 configuration.
- **User Problem:** Manually maintaining design tokens across Figma, CSS variables, and Tailwind configs leads to sync discrepancies, broken dark modes, and hardcoded hex values in component code.
- **Actors:** Human Developer, Design System Engineer, Build Pipeline.
- **Preconditions:** `VisualDirectionRecord` or raw DTCG `tokens.json`.
- **Inputs:** DTCG token dictionary (colors, typography, spacing, radius, shadows, motion, breakpoints).
- **Workflow:**
  1. User runs `uiforge tokens build`.
  2. Engine validates token input against W3C DTCG Draft 2025.10 schema via `@uiforge/tokens`.
  3. Resolves aliases and token math (e.g. `{spacing.base} * 2`).
  4. Invokes Style Dictionary v5.8.0 compiler running on Node.js 22 LTS.
  5. Generates target deliverables:
     - `globals.css` with `:root` and `.dark` CSS custom properties.
     - Tailwind CSS v4 `@theme` block in CSS (or `tailwind.config.js` for legacy v3).
     - TypeScript type declarations (`tokens.d.ts`) enabling typed style consumption.
  6. Executes font subsetter pipeline via `pyftsubset` for Inter / Geist if custom subsetting is configured, enforcing font-family rename (`UIForgeInter`, `UIForgeGeist`) to honor SIL OFL 1.1 RFN constraints.
- **Outputs:** Compiled CSS variable manifests, Tailwind configuration, TypeScript types, font binaries.
- **Acceptance Criteria:**
  - AC-05.1: Emitted CSS custom properties match 100% of defined tokens with zero missing aliases.
  - AC-05.2: Compatible with Tailwind CSS v4 native CSS engine without requiring legacy JavaScript config files.
  - AC-05.3: Custom font subsets enforce SIL OFL 1.1 Clause 3 RFN renaming rules by default.
- **Failure Cases:** Circular token reference (detects cycle and displays exact token path causing recursion).
- **Security Considerations:** Sanitizes CSS variable values to prevent CSS-injection attacks (e.g. `url('javascript:...')`).
- **Dependencies:** `style-dictionary` (`OS-TOKN-02`), `tailwindcss` (`OS-TOKN-04`), Inter (`OS-TYPO-04`), Geist (`OS-TYPO-05`).
- **Priority:** P0 | **Scope:** Level A (MVP) | **Evidence Class:** `[PHASE-02-DECIDED]`

---

### FR-06: Component Discovery & Evaluation
- **Requirement ID:** `FR-06`
- **Name:** Semantic Component Search, Compatibility & License Vetting
- **Description:** Discovers existing local components or queries approved external component registries (shadcn/ui model), evaluates license eligibility, accessibility conformance, and responsive maturity, and recommends optimal integration candidates.
- **User Problem:** Developers frequently reinvent existing buttons, dialogs, and tables because they cannot locate existing implementations in large codebases, or they copy inaccessible, GPL-contaminated code from random websites.
- **Actors:** Human Developer, AI Coding Agent, CLI.
- **Preconditions:** Project analysis completed or registry index loaded.
- **Inputs:** Search query (e.g. "accessible modal dialog with multi-step wizard"), target framework.
- **Workflow:**
  1. User/Agent executes `uiforge component search "data table with pagination"`.
  2. Engine searches local component catalog first. If match found, returns local import path.
  3. If local match absent, queries approved internal source registry (Phase 02.4 `sources.json`).
  4. Filters candidates against strict consumption permissions matrix (blocks Tier 5 rejects like SaaS UI Pro, checks LGPL gating).
  5. Evaluates candidate headless primitives (`@radix-ui/react-*`, `@react-aria/*`) against project dependencies.
  6. Returns ranked recommendations with scorecards, accessibility tiers, bundle size estimates, and copy-paste / source-copy instructions.
- **Outputs:** Ranked `ComponentRecommendationRecord` array with code blueprints and license disclosures.
- **Acceptance Criteria:**
  - AC-06.1: Strictly filters out any component governed by prohibited licenses (e.g. Aceternity resale restrictions).
  - AC-06.2: Identifies headless primitive requirements (e.g. `@radix-ui/react-dialog`) and informs caller if installation is required.
  - AC-06.3: Returns exact source URLs, package versions, and SPDX license tags for 100% of external recommendations.
- **Failure Cases:** No candidate matches query (returns fallback suggestions based on base primitives like Radix / React Aria).
- **Security Considerations:** Rejects malicious registries; verifies candidate integrity against Phase 02.4 provenance digests.
- **Dependencies:** `@uiforge/component-registry`, `sources.json`, `packages.json`.
- **Priority:** P0 | **Scope:** Level A (MVP) | **Evidence Class:** `[PHASE-02-DECIDED]`

---

### FR-07: UX Evaluation
- **Requirement ID:** `FR-07`
- **Name:** Information Hierarchy, Layout & Responsive Usability Audit
- **Description:** Evaluates rendered web interfaces across mobile, tablet, and desktop viewports to identify broken layouts, awkward wrapping, tap target clipping, unstyled text, and visual hierarchy flaws.
- **User Problem:** AI-generated UI frequently looks acceptable on desktop viewports but breaks catastrophically on mobile devices, with overlapping text, broken flexbox wrapping, and tiny tap targets.
- **Actors:** Human Developer, QA Engineer, Headless Browser Runner.
- **Preconditions:** Target frontend application running locally (or served via static HTML/Vite preview).
- **Inputs:** Target URL (e.g. `http://localhost:3000`), route path, viewport test matrix (375px, 768px, 1280px, 1920px).
- **Workflow:**
  1. User runs `uiforge audit ux --url=http://localhost:3000/dashboard`.
  2. Engine orchestrates headless Playwright instance navigating to URL.
  3. Evaluates DOM layout across each viewport:
     - Measures interactive element dimensions (minimum $44 \times 44\text{px}$ touch target rule).
     - Checks horizontal scrollbar overflow on mobile screens.
     - Inspects flexbox and grid containers for clipped or overlapping children.
     - Evaluates font scaling and line-height readability.
  4. Generates structured `UXFindingRecord` array with element CSS selectors, offending DOM coordinates, and viewport classifications.
- **Outputs:** `UXEvaluationRecord` containing categorized findings, screenshots, and remediation recommendations.
- **Acceptance Criteria:**
  - AC-07.1: Detects unintended horizontal document overflow on 375px mobile viewports with 100% reliability.
  - AC-07.2: Flags all interactive buttons/links with effective bounding boxes $< 24 \times 24\text{px}$ as Critical UX violations.
  - AC-07.3: Produces screenshot highlighting the offending bounding box for each finding.
- **Failure Cases:** Target URL unreachable or connection refused (halts gracefully with `NETWORK_TARGET_UNREACHABLE` error).
- **Security Considerations:** Headless browser runs in isolated sandbox; network requests restricted to localhost and configured staging domains.
- **Dependencies:** `@uiforge/browser-eval`, `playwright` (`OS-BROW-01`).
- **Priority:** P1 | **Scope:** Level A (MVP) | **Evidence Class:** `[ARCHITECTURE-DECISION]`

---

### FR-08: Accessibility Evaluation (WCAG 2.2 AA)
- **Requirement ID:** `FR-08`
- **Name:** Automated & Semi-Automated WCAG 2.2 AA Accessibility Auditing
- **Description:** Executes comprehensive DOM accessibility audits combining static JSX linting (`eslint-plugin-jsx-a11y`) and dynamic headless browser evaluation (`@axe-core/playwright`), evaluating color contrast, focus rings, keyboard navigation, and ARIA semantics.
- **User Problem:** Manual accessibility testing is complex, slow, and neglected, exposing organizations to major legal liabilities (ADA, European Accessibility Act) and excluding users with disabilities.
- **Actors:** Human Developer, QA Auditor, CI/CD Pipeline.
- **Preconditions:** Target page rendered in headless browser or source JSX files available for static linting.
- **Inputs:** Target URL or file paths, target WCAG level (`WCAG_2_2_AA`).
- **Workflow:**
  1. User/CI runs `uiforge audit a11y --url=http://localhost:3000`.
  2. Engine injects `@axe-core/playwright` runner into the active page context.
  3. Evaluates 100% of applicable automated rules (contrast, form labels, image alt text, heading order, ARIA attributes).
  4. Simulates Tab key navigation sequence to verify visible focus indicators and trap boundaries in modals/drawers.
  5. Computes mathematical contrast ratios across all rendered text nodes and background colors using real computed styles.
  6. Maps every failure to specific WCAG 2.2 Success Criteria (e.g. SC 1.4.3 Contrast Minimum, SC 2.1.1 Keyboard, SC 2.4.7 Focus Visible).
  7. Emits structured `AccessibilityEvaluationRecord` distinguishing automated passes from required manual verification tests.
- **Outputs:** `AccessibilityEvaluationRecord` with exact DOM selectors, HTML snippets, failure impact (critical, serious, moderate), and remediation code patches.
- **Acceptance Criteria:**
  - AC-08.1: Correctly flags 100% of standard axe-core rule violations with zero false positives on compliant baseline fixtures.
  - AC-08.2: Never issues a false "100% WCAG Compliant" certification; explicitly enumerates non-automatable manual criteria (screen reader testing, cognitive clarity).
  - AC-08.3: Governed by MPL-2.0 notice compliance for `@axe-core/playwright` without contaminating application runtime code.
- **Failure Cases:** Page dynamic content fails to render before timeout (waits for `networkidle` or custom selector before scanning).
- **Security Considerations:** axe-core script injection executed in restricted sandbox context; zero external script loading.
- **Dependencies:** `@axe-core/playwright` (`OS-A11Y-02`), `eslint-plugin-jsx-a11y` (`OS-A11Y-03`), `playwright` (`OS-BROW-01`).
- **Priority:** P0 | **Scope:** Level A (MVP) | **Evidence Class:** `[PHASE-02-DECIDED]`

---

### FR-09: Agent Integration & MCP Ingress
- **Requirement ID:** `FR-09`
- **Name:** Model Context Protocol (MCP) Server & Agent Tool Dispatch
- **Description:** Implements the official Model Context Protocol (MCP specification `2026-07-28`) exposing UIForge's sensory intelligence, component discovery, browser verification, and modification tools to external AI coding agents over stdio and HTTP.
- **User Problem:** Autonomous coding agents operate blind; they cannot inspect runtime DOM layout, verify rendered visual output, or check design token consistency, leading to repetitive trial-and-error hallucinations.
- **Actors:** Autonomous Coding Agent (Claude Code, Cursor, OpenCode, Codex, Antigravity), MCP Client.
- **Preconditions:** UIForge MCP server running via stdio or streamable HTTP.
- **Inputs:** JSON-RPC MCP requests (`tools/list`, `tools/call`, `server/discover`).
- **Workflow:**
  1. External agent connects to UIForge MCP server endpoint.
  2. Protocol negotiation executes: discovers modern `2026-07-28` capabilities via `server/discover` and `_meta` headers; falls back to legacy initialize flow (`2025-11-25` / `2024-11-05`) if client requires.
  3. UIForge advertises typed tools:
     - `analyze_project`: Returns route trees, styling systems, and token summaries.
     - `search_components`: Queries approved component registries.
     - `verify_in_browser`: Launches headless browser, captures screenshot, runs a11y audit.
     - `propose_modification`: Submits a proposed AST code diff for human authorization.
  4. When agent invokes a tool, engine validates arguments against Zod contract schemas.
  5. If tool requires Level 2+ permissions (mutations), server halts execution and returns a structured `ApprovalRequiredError` containing the diff and authorization token.
  6. Once approved by user, tool executes and returns deterministic results.
- **Outputs:** JSON-RPC tool call responses, structured error codes, verification evidence records.
- **Acceptance Criteria:**
  - AC-09.1: Fully conforms to MCP 2026-07-28 specification with automatic legacy fallback support.
  - AC-09.2: Never executes a filesystem write tool without receiving a valid, cryptographically signed approval token.
  - AC-09.3: Tool latency $< 150\text{ms}$ for read-only project intelligence queries.
- **Failure Cases:** Agent provides malformed tool arguments (returns schema validation error with Zod formatted field paths).
- **Security Considerations:** Strict input sanitization; prompt injection containment; rate-limiting; subprocess isolation.
- **Dependencies:** `@modelcontextprotocol/server` (`OS-AGNT-01`), `@uiforge/agent-sdk`, OpenCode patterns (`OS-AGNT-02`).
- **Priority:** P0 | **Scope:** Level A (MVP) | **Evidence Class:** `[PHASE-02-DECIDED]`

---

### FR-10: Browser Headless Evaluation
- **Requirement ID:** `FR-10`
- **Name:** Multi-Viewport Headless Browser Automation & Visual Diffing
- **Description:** Manages the lifecycle of headless Chromium/WebKit browser instances to navigate target pages, capture high-resolution screenshots, evaluate computed CSS, and compute deterministic pixel differences against baseline images.
- **User Problem:** Verifying visual layout changes manually requires switching to a browser, resizing windows across multiple devices, and eyeballing differences, which is tedious and prone to human error.
- **Actors:** Evaluation Engine, AI Agent, Human Developer.
- **Preconditions:** Headless browser binaries installed via `playwright install`.
- **Inputs:** Target URL, viewport configuration, capture selectors, baseline image path for comparison.
- **Workflow:**
  1. Engine receives verification task for URL and viewports (e.g. Mobile 375px, Desktop 1280px).
  2. Acquires browser context from Playwright pool with deterministic flags (`--font-render-hinting=none`, fixed device pixel ratio).
  3. Navigates to target URL, awaits network idle and web font stabilization.
  4. Collects console log events, runtime JavaScript exceptions, and failed network asset requests.
  5. Captures full-page and element-specific PNG screenshot buffers.
  6. If baseline image provided, executes `pixelmatch` pure-JS diffing:
     - Computes pixel delta count and mismatch percentage.
     - Generates highlighted visual diff image showing exact added/removed pixel clusters.
  7. Emits `BrowserEvaluationRecord` with screenshots, metrics, and console error arrays.
- **Outputs:** `BrowserEvaluationRecord`, visual diff PNGs, console error logs, network failure manifests.
- **Acceptance Criteria:**
  - AC-10.1: Deterministic pixel comparison: identical page renders yield exactly 0 pixel diffs ($0.00\%$).
  - AC-10.2: Flags all unhandled JavaScript exceptions (`page.on('pageerror')`) as Critical failures.
  - AC-10.3: Cleans up all browser contexts and processes upon completion or timeout with zero zombie process leaks.
- **Failure Cases:** Browser crashes or navigation times out (terminates process, quarantines error, returns structured timeout).
- **Security Considerations:** Browser sandbox enabled; file URL schemes (`file://`) blocked; external network egress restricted.
- **Dependencies:** `playwright` (`OS-BROW-01`), `pixelmatch` (`OS-VREG-01`).
- **Priority:** P0 | **Scope:** Level A (MVP) | **Evidence Class:** `[PHASE-02-DECIDED]`

---

### FR-11: Safe Modification & WAL Recovery
- **Requirement ID:** `FR-11`
- **Name:** Non-Destructive AST Modification, Write-Ahead Logging & Rollback
- **Description:** Proposes, stages, validates, and applies code changes to existing projects using coordinate-based slice patching, pre-image Write-Ahead Logging (WAL), and TypeScript Compiler API diagnostic baselines, ensuring zero silent code destruction.
- **User Problem:** AI coding assistants frequently overwrite working business logic, break imports, clobber custom formatting, or introduce TypeScript compile regressions when modifying existing files.
- **Actors:** Human Developer, AI Agent, Safe Modifier Engine.
- **Preconditions:** Clean git working tree or explicit override; human approval granted.
- **Inputs:** Target file path, proposed mutation (AST patch, replacement span, or new component code), user authorization token.
- **Workflow:**
  1. Safe Modifier receives proposed modification and validates authorization token signature.
  2. Creates a pre-image snapshot of target files in `.uiforge/wal/journal-<id>.log` containing SHA-256 hashes and original contents.
  3. Runs baseline TypeScript diagnostic evaluation on target project ($\text{baselineErrors}$).
  4. Applies modification using coordinate slice patching (replaces only exact mutated character spans $[start, end]$, preserving surrounding comments, whitespace, and formatting).
  5. Runs post-modification TypeScript diagnostic check ($\text{postErrors}$).
  6. Computes regression delta: $\text{newRegressions} = \text{postErrors} \setminus \text{baselineErrors}$.
  7. If $\text{newRegressions} > 0$:
     - Mutation is rejected as regressive.
     - WAL transaction engine automatically rolls back files from the journal pre-image.
     - Returns detailed diagnostic report to caller.
  8. If $\text{newRegressions} === 0$:
     - Transaction is committed.
     - Journal marked `COMMITTED`.
     - Returns success with applied unified diff.
- **Outputs:** `ModificationResultRecord`, unified diff, TypeScript regression check result.
- **Acceptance Criteria:**
  - AC-11.1: 100% rollback guarantee: if a compile error is introduced, files are restored to their exact pre-image bytes.
  - AC-11.2: Preserves 100% of surrounding comments, indentation, and formatting outside the targeted mutation slice.
  - AC-11.3: Never performs a disk write if the authorization token is missing, expired, or tampered with.
- **Failure Cases:** Process killed mid-write (on next startup, WAL recovery scanner detects uncommitted journal and restores pre-image).
- **Security Considerations:** Enforces canonical path verification (blocks path traversal outside project root); prevents symlink following.
- **Dependencies:** `@uiforge/safe-modifier`, TypeScript Compiler API, `@babel/parser` with `errorRecovery: true`.
- **Priority:** P0 | **Scope:** Level A (MVP) | **Evidence Class:** `[PHASE-02-DECIDED]`

---

### FR-12: Studio Workspace & Management
- **Requirement ID:** `FR-12`
- **Name:** Visual Workspace, Design Lab & Interactive Project Management
- **Description:** Provides an optional graphical web/desktop Studio interface allowing developers and designers to visually inspect design tokens, compare visual directions, review component catalogs, manage agent sessions, and authorize proposed code diffs.
- **User Problem:** Non-technical stakeholders (designers, product managers) cannot interact with terminal CLIs or MCP JSON streams, creating a barrier to visual collaboration and design system governance.
- **Actors:** Human Developer, UI/UX Designer, Product Manager.
- **Preconditions:** UIForge Core running; optional Studio web server or Electron shell launched.
- **Inputs:** Project path, Studio port configuration (`--port=4200`).
- **Workflow:**
  1. User runs `uiforge studio`.
  2. Local server launches serving React-based Studio SPA.
  3. Connects to local Core API via WebSocket and HTTP.
  4. Provides visual modules:
     - **Design Lab:** Live interactive token palette editor with WCAG contrast indicators.
     - **Component Explorer:** Visual catalog of local and registry components with live property controls.
     - **Verification Gallery:** Side-by-side visual diff inspector and accessibility failure highlighter.
     - **Agent Control Deck:** Active agent session monitor with human authorization approval buttons.
  5. User actions in Studio dispatch standard, signed commands to Core.
- **Outputs:** Interactive visual interface; saved token adjustments; approved change dispatches.
- **Acceptance Criteria:**
  - AC-12.1: Core functionality remains 100% operational via CLI even if Studio package is omitted entirely.
  - AC-12.2: Studio communications strictly obey Core permission ladder and authorization tokens.
  - AC-12.3: Zero cloud dependency; runs 100% locally on `localhost`.
- **Failure Cases:** Port conflict (prompts to use alternate open port).
- **Security Considerations:** Binds strictly to `127.0.0.1` by default; CSRF protection on local API endpoints.
- **Dependencies:** `@uiforge/studio`, `@uiforge/core`, React, `react-resizable-panels` (`OS-LAYT-01`).
- **Priority:** P2 | **Scope:** Level B / C | **Evidence Class:** `[ARCHITECTURE-DECISION]`

---

### FR-13: Project History & Snapshots
- **Requirement ID:** `FR-13`
- **Name:** Immutable Project Snapshots, Audit Log & Decision Traceability
- **Description:** Captures immutable project state snapshots (tokens, component lists, package versions, design decisions, verification results) enabling historical comparisons, audit logging, and point-in-time state recovery.
- **User Problem:** Teams lose track of why design decisions were made, when accessibility regressions were introduced, or what external components were imported over time.
- **Actors:** Human Developer, Team Lead, CI/CD Runner.
- **Preconditions:** Project initialized with `.uiforge/` state repository.
- **Inputs:** Snapshot label, trigger event (pre-modification, post-verification, release milestone).
- **Workflow:**
  1. User/Pipeline runs `uiforge snapshot create --label="Pre-Redesign Baseline"`.
  2. Engine collects current project state:
     - Full design token dictionary and computed CSS variable hashes.
     - Component inventory with file paths and interfaces.
     - Active package versions and lockfile digest.
     - Recent accessibility and visual verification scorecards.
  3. Writes immutable, content-addressed snapshot manifest to `.uiforge/snapshots/SNAP-<hash>.json`.
  4. Appends audit event to append-only event journal (`.uiforge/audit.jsonl`).
- **Outputs:** Content-addressed snapshot record, updated audit journal.
- **Acceptance Criteria:**
  - AC-13.1: Snapshots store metadata and diff references without duplicating full project source trees (compact storage).
  - AC-13.2: Audit log is strictly append-only; existing entries cannot be modified or deleted.
  - AC-13.3: Supports instant comparison between any two historical snapshots (`uiforge compare SNAP-A SNAP-B`).
- **Failure Cases:** Disk space exhausted (fails gracefully with descriptive storage error; does not corrupt existing logs).
- **Security Considerations:** File permissions on `.uiforge/` restricted to current OS user; SHA-256 hash chaining on audit records.
- **Dependencies:** `@uiforge/storage`, SQLite or local filesystem JSON store.
- **Priority:** P1 | **Scope:** Level A (MVP) | **Evidence Class:** `[ARCHITECTURE-DECISION]`

---

### FR-14: Evidence-Backed Quality Reports
- **Requirement ID:** `FR-14`
- **Name:** Structured Quality Dossier & Compliance Report Generation
- **Description:** Consolidates technical audit findings, accessibility test results, visual regression diffs, and bundle size metrics into professional, tamper-evident HTML and Markdown quality dossiers.
- **User Problem:** Engineering teams spend days preparing accessibility compliance reports and executive summaries for leadership, clients, or regulatory auditors.
- **Actors:** Developer, QA Lead, Compliance Auditor.
- **Preconditions:** Completed verification runs (FR-07, FR-08, FR-10).
- **Inputs:** Evaluation records, report format preference (Markdown, standalone HTML, JSON).
- **Workflow:**
  1. User runs `uiforge export report --format=html --out=audit-report.html`.
  2. Reporter aggregates latest evaluation data from `.uiforge/evaluations/`.
  3. Formulates executive summary:
     - Overall quality score and tier distribution.
     - WCAG 2.2 AA automated criteria pass rate with exact failure counts.
     - Visual diff statistics and responsive layout status.
     - Package dependency footprint and license attribution register.
  4. Generates self-contained, responsive HTML dossier (or structured Markdown).
  5. Computes SHA-256 cryptographic digest of the dossier and embeds provenance stamp.
- **Outputs:** Standalone `audit-report.html`, `audit-report.md`, and raw JSON data artifact.
- **Acceptance Criteria:**
  - AC-14.1: Standalone HTML report requires zero external CDN dependencies (all styles, scripts, and screenshot thumbnails inlined).
  - AC-14.2: Every reported accessibility violation links to authoritative W3C WCAG 2.2 criteria URLs.
  - AC-14.3: Includes complete third-party open-source attribution notice register matching Phase 02.4 licenses.
- **Failure Cases:** Missing evaluation data (warns user and generates report covering only available data dimensions).
- **Security Considerations:** HTML generation uses strict context-aware escaping to prevent XSS from scanned user code comments.
- **Dependencies:** `@uiforge/reporting`, `@uiforge/eval`.
- **Priority:** P0 | **Scope:** Level A (MVP) | **Evidence Class:** `[PHASE-02-DECIDED]`

---

### FR-15: Benchmark Management & Evals
- **Requirement ID:** `FR-15`
- **Name:** Standardized Benchmark Suite, Task Archetypes & Agent Evaluation
- **Description:** Provides a standalone evaluation harness for benchmarking coding agent models and frontend tools across standardized frontend tasks (design reproduction, accessibility repair, token migration, responsive fixing).
- **User Problem:** Teams cannot scientifically measure whether a new AI model (Claude 3.7, GPT-4.5) or prompt strategy improves or degrades frontend code quality without a reproducible benchmark suite.
- **Actors:** AI Researcher, Systems Architect, Benchmark Harness.
- **Preconditions:** Dedicated benchmark workspace; agent integration configured.
- **Inputs:** Task archetype ID, target model/agent, repetition count, evaluation rubric.
- **Workflow:**
  1. Researcher runs `uiforge bench run --archetype=a11y-repair --model=claude-3-7-sonnet --runs=5`.
  2. Benchmark harness provisions an isolated, clean sandboxed project fixture.
  3. Dispatches task prompt to target agent via MCP interface.
  4. Records agent tool execution trace, token consumption, and wall-clock execution time.
  5. Once agent signals completion, harness runs automated evaluation battery:
     - Playwright browser render & visual diff against golden baseline.
     - axe-core accessibility score delta ($\Delta \text{violations}$).
     - TypeScript compiler error check.
  6. Computes statistical score across all repetitions (pass rate, median duration, token efficiency).
  7. Emits structured benchmark report and appends to longitudinal benchmark leaderboard.
- **Outputs:** `BenchmarkRunRecord`, JSON evaluation metrics, comparative performance charts.
- **Acceptance Criteria:**
  - AC-15.1: 100% isolated fixture execution: each test run executes in an ephemeral directory reset between repetitions.
  - AC-15.2: Benchmark infrastructure is strictly decoupled from normal project execution code (zero overhead in production CLI).
  - AC-15.3: Reproducible results with detailed token counts, latency timestamps, and execution traces.
- **Failure Cases:** Agent times out or crashes (records task as failed, captures error trace, terminates cleanly).
- **Security Considerations:** Sandboxed execution prevents untrusted agent code from modifying the host system or accessing external networks.
- **Dependencies:** `@uiforge/benchmark`, `@uiforge/agent-sdk`, `playwright`.
- **Priority:** P2 | **Scope:** Level C (Advanced Platform) | **Evidence Class:** `[ARCHITECTURE-DECISION]`
