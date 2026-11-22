# UIFORGE — PHASE 03: USER PERSONAS, JOBS-TO-BE-DONE & INTERVENTION MATRIX
## Comprehensive User Analysis, Workflow Pain Points & Boundary Definitions

**Document ID:** `UIF-PH03-USER-PERSONAS-AND-JOBS`  
**Phase:** 03 — Product Specification & Architecture Freeze  
**Status:** Certified / Complete  
**Date:** November 22, 2026  
**Standard:** Staff Product Engineer & Developer Tools Architect  

---

## 1. Executive Persona Strategy

UIForge serves as an AI-assisted frontend engineering intelligence and orchestration platform. It is engineered specifically for practitioners and autonomous agents operating across complex, heterogeneous web codebases.

UIForge rejects the assumption that frontend development can be reduced to one-shot code generation. Real frontend engineering requires continuous project comprehension, design token consistency, component reuse, accessibility verification, and safe, regression-free modification.

---

## 2. Eight Core User Persona Profiles

### Persona 1: Individual Frontend Developer
- **Profile:** Independent software engineer or solo founder building modern web applications (React, Next.js, Vite, Vue, Svelte).
- **Core Problem:** Context switching between design tool mockups, CSS/Tailwind configuration, headless UI state management, and manual accessibility debugging. Heavy cognitive load maintaining clean component structure.
- **Current Workflow:** Writes JSX/TSX manually, inspects browser devtools, copies code from public component registries (e.g. shadcn/ui), tweaks Tailwind classes by trial-and-error, skips formal accessibility testing due to lack of tooling.
- **UIForge Intervention:**
  - Fast CLI analysis of existing styles and components (`uiforge analyze`).
  - Automated generation of accessible, DTCG-compliant design tokens and component blueprints.
  - Multi-viewport browser verification with instant DOM visual diffs and axe-core WCAG checks.
- **Expected Outcome:** High-fidelity UI implementation in half the time, with verified WCAG 2.2 AA compliance and zero architectural drift.
- **Important Limitations:** UIForge is not a visual drag-and-drop website builder; the developer must understand TypeScript, JSX, and web fundamentals.

### Persona 2: Full-Stack Developer
- **Profile:** Engineer whose core strength lies in backend architecture, databases, and APIs, but who is required to deliver production-ready frontend user interfaces.
- **Core Problem:** "Design paralysis" and fragile frontend styling. Tendency to generate inconsistent margins, mismatched colors, poor responsive layouts, and inaccessible HTML forms.
- **Current Workflow:** Relies on AI coding assistants (ChatGPT, Claude, Cursor) to generate entire components, resulting in bloated styling, duplicated CSS rules, broken mobile layouts, and subtle hydration errors.
- **UIForge Intervention:**
  - Generates cohesive design briefs and visual directions from plain-text requirements (`uiforge design`).
  - Enforces systematic token constraints (spacing, color scales, typography ramps) so LLM-generated code cannot introduce rogue styles.
  - Automatically identifies responsive layout breaks and missing ARIA attributes before code lands.
- **Expected Outcome:** Visually polished, accessible frontend code without requiring deep design intuition or manual CSS wizardry.
- **Important Limitations:** Does not generate backend APIs, database schemas, or server-side business logic; focuses strictly on client and server UI presentation layers.

### Persona 3: Professional Senior Frontend Engineer
- **Profile:** Staff or Lead engineer maintaining a large enterprise design system or complex frontend monorepo.
- **Core Problem:** Design token fragmentation across legacy CSS, Tailwind, and component libraries; high review burden auditing PRs for accessibility regressions; junior developers and AI tools introducing non-standard components.
- **Current Workflow:** Runs ESLint rules, conducts manual PR reviews, writes brittle Playwright visual tests, manually audits Figma token updates against CSS variables.
- **UIForge Intervention:**
  - Automated project intelligence scanning that extracts full component dependency graphs and token usage metrics.
  - Diff-bound change proposals with pre-image write-ahead logging (WAL) that guarantee zero silent code formatting destruction.
  - Headless CI verification mode (`uiforge validate`) executing deterministic pixel difference checks and semantic AST linters.
- **Expected Outcome:** Automated design system governance, elimination of UI regressions, and a reliable gate for AI agent code contributions.
- **Important Limitations:** UIForge does not replace architectural code reviews or high-level system decisions; it automates deterministic structural and visual verifications.

### Persona 4: UI/UX Designer Collaborating with Engineering
- **Profile:** Product designer using Figma or Penpot who delivers design tokens, wireframes, and design specs to engineering teams.
- **Core Problem:** The "Figma-to-Code chasm." Developers misinterpret spacing, substitute arbitrary colors, break component variants, or drop micro-interactions during implementation.
- **Current Workflow:** Manually creates design handoff specs in Figma, writes redline documentation, inspects production staging links, logs endless Jira tickets for visual defects.
- **UIForge Intervention:**
  - Ingests W3C DTCG-compliant design tokens and transforms them directly into framework-agnostic CSS/Tailwind variables.
  - Evaluates rendered production components against design specifications using headless browser capture and pixelmatch diffing.
  - Generates clear, evidence-backed visual regression reports showing exact pixel deltas and layout deviations.
- **Expected Outcome:** Near-zero handoff discrepancy; automated confirmation that coded UI matches design specifications.
- **Important Limitations:** UIForge is not a design authoring tool (does not replace Figma); it validates and translates design tokens and components into code.

### Persona 5: AI-Assisted Software Developer
- **Profile:** Developer utilizing autonomous coding agents (Claude Code, Cursor, OpenCode, Codex, Antigravity) as primary implementation drivers.
- **Core Problem:** Coding agents make uncontrolled, destructive edits to existing codebases—overwriting working business logic, clobbering existing formatting, inventing non-existent packages, and hallucinating visual styling that cannot be verified without manual inspection.
- **Current Workflow:** Prompts agent, waits for multi-file edit, discovers compilation errors or visual regressions, spends hours prompting the agent to fix its own bugs.
- **UIForge Intervention:**
  - Operates as the **environment oracle and execution gatekeeper** via Model Context Protocol (MCP).
  - Provides agents with typed, bounded tools (`analyze_project`, `extract_tokens`, `search_components`, `verify_in_browser`).
  - Requires all file mutations to pass through the 5-level security ladder and human-authorized, diff-bound approvals.
- **Expected Outcome:** Agents become 5x more effective because they operate against verified project context and receive instant visual/accessibility feedback loops.
- **Important Limitations:** UIForge does not provide the LLM reasoning or prompt models; it acts as the deterministic execution and verification substrate.

### Persona 6: Development Team & Engineering Lead
- **Profile:** Engineering team of 5–20 developers shipping features across shared web codebases.
- **Core Problem:** Inconsistent UI standards across squad boundaries; lack of centralized component discovery leading to duplicated button and modal implementations; flaky visual regression CI pipelines.
- **Current Workflow:** Ad-hoc component documentation (often outdated Storybook instances); visual QA performed manually by QA engineers or skipped entirely under deadline pressure.
- **UIForge Intervention:**
  - Shared, local-first component registry and token catalogue that discovers all reusable components in the repository.
  - Standardized operating workflows for auditing (`uiforge audit`) and improving (`uiforge improve`) frontend code.
  - Reproducible evidence dossiers documenting test passes, WCAG criteria, and bundle size impacts.
- **Expected Outcome:** High team velocity, unified UI consistency across all feature squads, and auditable quality assurance in CI/CD.
- **Important Limitations:** Does not manage team task tracking (Jira/Linear) or general project management workflows.

### Persona 7: Agency & Product Studio
- **Profile:** Development agency building diverse client web applications on tight deadlines across varying tech stacks (Next.js, Remix, Astro, SvelteKit, plain HTML/CSS).
- **Core Problem:** High setup cost bootstrapping new client design systems; frequent onboarding onto unfamiliar legacy client codebases with zero documentation and undocumented styles.
- **Current Workflow:** Scaffolds new projects from custom internal templates; spends days manually reverse-engineering client codebases to discover active styling patterns.
- **UIForge Intervention:**
  - Instant brownfield codebase onboarding via `uiforge analyze`, outputting full technology detection, route trees, and active color/typography scales.
  - Rapid greenfield scaffolding (`uiforge generate`) producing a tailor-made design system and verified component registry.
  - Client-ready quality audit reports detailing accessibility, performance, and responsive conformance.
- **Expected Outcome:** Rapid onboarding onto legacy client apps, fast greenfield delivery, and credible, evidence-backed deliverable reports for clients.
- **Important Limitations:** Requires client code to be accessible on local disk or via standard git repository access.

### Persona 8: Enterprise Engineering & Governance Organization
- **Profile:** Enterprise IT, security, and architectural governance teams overseeing hundreds of frontend micro-frontends and enterprise portals.
- **Core Problem:** Legal liability from inaccessible public web properties (ADA / European Accessibility Act compliance); supply chain risks from unvetted npm packages; uncontrolled AI agent code generation violating corporate IP policies.
- **Current Workflow:** Annual third-party accessibility audits (expensive and slow); heavy-handed security scanning tools that flag false positives but miss structural frontend vulnerabilities.
- **UIForge Intervention:**
  - Automated, continuous WCAG 2.2 AA evaluation integrated into pull requests with cryptographic evidence dossiers.
  - Strict consumption-mode governance (`REFERENCE_ONLY`, `DEPENDENCY`, `SOURCE_COPY`) blocking GPL/LGPL copyleft risks and unapproved commercial licenses.
  - Non-repudiable audit logs recording every AI agent tool execution and user approval event.
- **Expected Outcome:** Enterprise-wide accessibility compliance, automated IP and license protection, and safe adoption of AI coding assistants.
- **Important Limitations:** Does not provide formal legal representation; outputs evidence dossiers for review by qualified corporate counsel.

---

## 3. Summary Persona & Intervention Matrix

| Persona | Primary Friction | Core UIForge Value | Primary Interface | Key Verification Gate |
| :--- | :--- | :--- | :--- | :--- |
| **Solo Frontend Dev** | Design token & responsive chore | Automated tokens & instant headless visual diffs | CLI (`uiforge analyze/design`) | Visual regression & mobile viewport pass |
| **Full-Stack Dev** | Design paralysis & inconsistent CSS | Systematic design brief to token generation | CLI + MCP Agent | Automated WCAG AA & token constraint checks |
| **Senior Frontend Eng** | Token drift & manual PR reviews | Non-destructive AST patching & design governance | CLI CI/CD (`uiforge validate`) | TypeScript regression comparator ($newRegressions=0$) |
| **UI/UX Designer** | Figma-to-code discrepancy | DTCG token translation & rendered pixel comparison | Studio GUI / Reports | Pixel delta < 0.1% against design baseline |
| **AI-Assisted Dev** | Uncontrolled agent code destruction | Environment oracle & diff-bound approval tokens | MCP Server (`POST /mcp`) | Human-authorized diff verification |
| **Dev Team Lead** | Component duplication across squads | Shared component intelligence & automated audit | CLI (`uiforge audit/improve`) | Centralized component reuse metrics |
| **Agency / Studio** | Reverse-engineering legacy client apps | Instant brownfield analysis & client audit reports | CLI (`uiforge analyze/export`) | Complete project snapshot & evidence dossier |
| **Enterprise Gov** | Accessibility liability & supply chain | Cryptographic evidence & fail-closed license checks | CI/CD + Headless Engine | WCAG 2.2 AA automated criteria + SPDX audit |
