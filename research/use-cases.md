# UIForge Research — Detailed Use Cases & Workflow Specifications

**Document ID:** `UIF-USE-001`  
**Phase:** 01 — Product Research, Problem Validation, Competitive Intelligence & Product Differentiation  
**Status:** Architectural Specification  
**Date:** November 2026  

---

## 1. Overview of Core Workflows

UIForge formalizes frontend engineering into two distinct, deterministic operational workflows:
- **Workflow A: Greenfield Creation (Create a New Website/App)**
- **Workflow B: Brownfield Refinement (Analyze and Safely Improve an Existing Website/App)**

Both workflows reuse the identical Core engines (`@uiforge/contracts`, `@uiforge/design-intelligence`, `@uiforge/a11y-engine`, `@uiforge/evaluation-engine`), guaranteeing behavioral consistency whether starting from scratch or modifying a legacy enterprise application.

---

## 2. Use Case A: Greenfield Creation (New Website / App)

### 2.1 Metadata
- **Primary Actor:** AI-Assisted Developer (Persona 1) or Product Designer (Persona 3).
- **Secondary Actor:** Connected AI Coding Agent (OpenCode, Claude Code, OpenAI Codex, or MCP client).
- **Preconditions:** Developer has a local workspace initialized with Node.js LTS and a target framework preference (Next.js / Vite React).
- **Trigger:** Developer executes `uiforge create` via CLI, invokes the MCP tool `create_application_spec`, or initiates a new project in UIForge Studio.

### 2.2 Inputs
- High-level product description / prompt (e.g., "Build a modern B2B SaaS billing and subscription portal").
- Target audience definition and business objective.
- Brand constraints (optional: primary hex colors, logo, typography preference).
- Application archetype (e.g., Data Dashboard, E-Commerce, Marketing Landing Page, Docs).

### 2.3 Step-by-Step Lifecycle Flow
1. **Requirements Intake & Disambiguation:** The Requirement Engine parses the input, identifies ambiguities or missing parameters, and prompts the user for clarification (e.g., "What auth provider is used? Are there team tiers?").
2. **Structured Product Specification:** Emits a validated `app-spec.json` defining user personas, route hierarchy, data entities, and page specifications.
3. **Visual Direction Exploration:** The Design Intelligence Engine generates three distinct, contextual visual directions (e.g., *Direction 1: High-Density Technical Mono*; *Direction 2: Clean Swiss Modernist*; *Direction 3: Warm Editorial*).
4. **Direction Selection & Comparison:** User or developer selects the preferred aesthetic direction.
5. **Design System & Token Generation:** Synthesizes a complete DTCG-compliant design token file (`design-tokens.json`) providing mathematical typographic scales, semantic color pairings (with guaranteed $\ge 4.5:1$ contrast), and spatial scales.
6. **Component Discovery & Architecture Planning:** The Component Registry Engine indexes matching accessible primitives (shadcn/ui, Radix, Tremor) and outputs an architecture plan (`component-tree.json`).
7. **Interactive State Machine Definition:** The UX Engine attaches state matrices (idle, loading, empty, error, submitting) to every interactive control.
8. **Agent Implementation Orchestration:** UIForge dispatches the structured task, token contracts, and component schemas to the connected coding agent via Agent SDK / MCP.
9. **Code Synthesis by Coding Agent:** The agent writes the Next.js/Tailwind components into the local workspace following strict architectural rules.
10. **Headless Browser Spin-Up:** Playwright automatically boots a local development server in a sandboxed process.
11. **Multi-Viewport Rendering & Capture:** Captures full-page DOM states and screenshots across 3 viewports: Mobile (375px), Tablet (768px), Desktop (1440px).
12. **Automated Accessibility Audit:** `@axe-core/playwright` runs against the rendered DOM, checking for WCAG 2.2 AA violations.
13. **Responsive Overflow Inspection:** Playwright scripts check for horizontal scroll violations (`scrollWidth > clientWidth`) and overlapping elements.
14. **Interaction State Verification:** Playwright scripts simulate form submissions, button clicks, and modal openings to verify that event handlers are not empty facades.
15. **Independent Quality Evaluation:** The Evaluation Engine aggregates findings into a deterministic scorecard across the 6 quality dimensions.
16. **Targeted Refinement Loop (Max 3 turns):** If quality gates fail, UIForge returns a structured defect list to the coding agent for surgical correction.
17. **Final Evidence Report Generation:** Emits a comprehensive `uiforge-report.html` and JSON audit summarizing passes, a11y compliance, and screenshots.

### 2.4 Outputs
- Production-ready frontend codebase in the user's workspace.
- `design-tokens.json` in `.uiforge/`.
- `uiforge-report.html` containing visual screenshots, a11y audit results, and performance metrics.

### 2.5 Acceptance Criteria
- 100% pass on WCAG 2.2 AA automated axe-core rules.
- 0 horizontal overflow errors on mobile (375px).
- 0 inert button facades (`onClick` must trigger demonstrable state change).
- Zero circular dependencies or broken TypeScript imports (`tsc --noEmit` passes).

### 2.6 Edge Cases & Failure Recovery
- *Edge Case 1: Dev server fails to start.* Recovery: Capture stderr, return compilation error log to agent with instruction to fix missing package or import before proceeding with browser evaluation.
- *Edge Case 2: Agent enters an infinite refinement loop.* Recovery: Hard cutoff at 3 refinement iterations. Emit detailed failure report highlighting remaining defects for human developer review.

---

## 3. Use Case B: Brownfield Refinement (Analyze & Improve Existing Website)

### 3.1 Metadata
- **Primary Actor:** Frontend Engineer / Tech Lead (Persona 2).
- **Secondary Actor:** Connected AI Coding Agent.
- **Preconditions:** Developer opens UIForge CLI or Studio pointing to an existing Git repository containing a frontend application.
- **Trigger:** Developer executes `uiforge analyze` or calls MCP tool `analyze_project`.

### 3.2 Inputs
- Path to the local repository.
- Scope flags (e.g., `--path=src/components/billing`, `--check=a11y,responsive`).

### 3.3 Step-by-Step Lifecycle Flow
1. **Git State Verification:** UIForge inspects `git status` to verify the working tree is clean or records existing untracked/modified files to prevent accidental overwrites.
2. **Safe Read-Only Project Inspection:** The Project Analyzer scans `package.json`, route directories, styling configs (Tailwind, CSS modules), and component trees using static AST parsing.
3. **Design System & Token Extraction:** Reconstructs the existing design system (identifies CSS variables, typography classes, spacing conventions, and recurring component patterns).
4. **Multi-Faceted Defect Detection:**
   - Static AST checks flag hardcoded colors, non-semantic HTML (`<div onClick>`), and inconsistent margin scales.
   - Playwright boots the existing app and runs axe-core audits and mobile responsive checks.
5. **Prioritized Evidence-Based Audit:** Generates an audit report (`uiforge-audit.json`) categorizing findings by severity: Critical (A11y/Breakage), High (UX/Responsive), Medium (Inconsistency).
6. **Scoped Code Change Proposals:** For each approved finding, the Frontend Implementation Engine synthesizes minimal, surgical code changes that preserve existing business logic, comments, and framework idioms.
7. **Unified Diff Generation:** Diffs are formatted as standard `.patch` unified diffs.
8. **Mandatory Human Approval Gate:** UIForge presents the proposed diffs in the terminal or Studio UI. **No files are modified on disk without explicit user approval.**
9. **Atomic Patch Application:** Upon user approval, UIForge applies the approved patch to the designated files.
10. **Automated Regression Verification:** Playwright re-runs tests on the modified project to verify that the target defect is resolved and no adjacent components broke.
11. **Visual Diff Computation:** Generates side-by-side before-and-after screenshot comparisons using `pixelmatch`.
12. **Improvement Report:** Emits a final diff report detailing the measurable before-and-after delta (e.g., "+18% a11y score, 0 mobile overflows, 42 lines modified").

### 3.4 Outputs
- Minimal, clean git diffs applied to user files.
- `uiforge-improvement-report.html` with side-by-side visual diffs and before/after metrics.

### 3.5 Acceptance Criteria
- **Read-Only Invariant:** Zero disk modifications during the `analyze` phase.
- **Architectural Preservation:** Zero re-writes of unrelated files, zero new unapproved dependencies, zero deletions of existing business logic comments.
- **Atomic Rollback:** If the applied patch fails regression tests, UIForge offers an instant one-click or single-command rollback to the prior git commit SHA.

### 3.6 Edge Cases & Failure Recovery
- *Edge Case 1: Dirty git working directory.* UIForge alerts the user and refuses to apply patches until changes are committed or stashed, preventing destructive overwrites.
- *Edge Case 2: Patch application conflict.* If a file changed between analysis and patch approval, the patch rejects cleanly, and UIForge prompts the user to re-analyze.

---

## 4. Cross-Cutting Engineering Constraints

1. **Static AST Analysis vs. Runtime Execution Sandboxing**:
   - The Project Analyzer must never use `eval()`, `require()`, or dynamic imports when analyzing user code. It must use static Babel/TypeScript AST traversal exclusively to read source files without executing untrusted repository code.
   - However, building the project, installing dependencies, or booting a local development server for Playwright browser testing *does* execute project-controlled code. Therefore, dynamic evaluation runs must operate within isolated execution boundaries (restricted process permissions, ephemeral local ports, loopback network restriction).
2. **Local Execution & Model Provider Data Flow**:
   - UIForge Core is designed for local execution and does not require a UIForge-hosted backend.
   - If the developer connects an external cloud-based model provider (e.g., Anthropic, OpenAI) or cloud coding agent, source snippets, prompts, or AST context are transmitted to that provider according to the user's specific API configuration. UIForge will provide clear telemetry toggles and context-minimization controls to ensure user transparency.
