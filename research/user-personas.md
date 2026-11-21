# UIForge Research — Target User Personas & Behavioral Profiles

**Document ID:** `UIF-USR-001`  
**Phase:** 01 — Product Research, Problem Validation, Competitive Intelligence & Product Differentiation  
**Status:** Provisional User Models (Requires Field Validation)  
**Date:** November 2026  

---

## 1. Evidentiary Disclaimer: Provisional Status

In strict adherence to UIForge Engineering Rule 4 (*No assumptions presented as facts*), these personas represent **evidence-informed provisional behavioral models**. They are constructed from developer community telemetry, GitHub issue trends, and initial problem mapping, but **have not yet completed empirical field validation interviews** (see `research/validation-results.md`).

---

## 2. In-Depth Persona Profiles

### Persona 1: Alex — The AI-Assisted Full-Stack Developer

- **Role & Background:** Senior Full-Stack Developer or Technical Founder at an early-stage startup. 7+ years of software experience; highly proficient in TypeScript, Node, and Postgres, but views CSS and design systems as a secondary chore.
- **Tools & Environment:** Uses **Claude Code**, **OpenCode**, and **Cursor** daily. Primary stack: Next.js (App Router), Tailwind CSS, Supabase, Vercel.
- **Primary Goals & Jobs-to-be-Done:**
  1. Ship complete, client-ready web features in hours instead of days.
  2. Generate clean, non-embarrassing UI without hiring an external agency.
  3. Spend engineering tokens on core backend logic rather than tweaking padding and modal focus traps.
- **Core Pain Points with Current AI Tools:**
  - *The "Correction Prompting Spiral":* Spends 10 minutes generating a feature, then 45 minutes prompting the agent to fix broken mobile layouts, unaligned icons, and missing error toasts.
  - *Generic "AI Look":* Everything generated looks like a boilerplate marketing page with purple gradients and glassmorphism cards.
  - *The "Facade" Trap:* The AI generates a gorgeous settings table, but the toggles don't persist state, forms don't show validation errors, and empty states are missing.
- **What Alex Needs from UIForge:**
  - An MCP server or CLI tool that automatically forces Claude Code/OpenCode to generate functionally complete, accessible components with zero visual slop on the first pass.
  - Ready-to-use design systems and curated component discovery inside the terminal.
- **Unvalidated Assumptions:**
  - *Assumption 1:* Alex is willing to wait 60–90 seconds for a local headless browser evaluation loop if it eliminates 5 manual prompt cycles.
  - *Assumption 2:* Alex prefers terminal CLI/MCP workflows over browser-based GUI builders like Lovable or v0.

---

### Persona 2: Maya — The Senior Frontend Engineer & Tech Lead

- **Role & Background:** Lead Frontend Architect at a Series B/C scale-up or mid-size enterprise. Responsible for a multi-app monorepo, design system governance, accessibility compliance, and code review standards.
- **Tools & Environment:** VS Code, Git, Turborepo, Next.js, Storybook, Playwright, axe-core, Jira, GitHub Actions.
- **Primary Goals & Jobs-to-be-Done:**
  1. Maintain architectural integrity, component reusability, and WCAG accessibility across a large codebase.
  2. Prevent junior engineers and AI coding agents from introducing technical debt, duplicate components, and bloated dependencies.
  3. Safely modernize and refactor legacy frontend code without introducing regressions.
- **Core Pain Points with Current AI Tools:**
  - *Destructive Hallucinations in Brownfield Repos:* AI agents rewrite 400-line files, deleting business logic comments, altering global styling tokens, and breaking adjacent routes.
  - *Accessibility Blind Spots:* AI agents produce code that fails WCAG 2.2 AA (missing ARIA attributes, contrast failures), creating regulatory and legal liability for the enterprise.
  - *Code Duplication:* Agents invent new button and modal primitives instead of importing the existing shared components from `@company/ui`.
- **What Maya Needs from UIForge:**
  - A strictly **read-only Project Analyzer** that inspects existing codebases without modifying files.
  - **Surgical, approval-gated patch proposals**: Diff previews showing exactly what will change, with automated Playwright and axe-core regression evidence before merging.
- **Unvalidated Assumptions:**
  - *Assumption 1:* Maya will trust an AI tool to suggest refactors if every change is presented as a minimal, reviewable unified diff.
  - *Assumption 2:* Maya’s team requires local command-line execution due to corporate security policies forbidding cloud code uploads.

---

### Persona 3: Liam — The Product Designer & Design System Lead

- **Role & Background:** Staff Product Designer or Design Technologist bridging the gap between Figma and production code. Obsessed with typographic scales, spatial rhythms, micro-interactions, and brand coherence.
- **Tools & Environment:** Figma (Dev Mode, Variables, Auto-Layout), Tokens Studio, Storybook, Chrome DevTools.
- **Primary Goals & Jobs-to-be-Done:**
  1. Ensure that production implementations match the fidelity, typography, and spacing defined in the design system.
  2. Prevent engineering teams from introducing rogue colors, unapproved fonts, or inconsistent layouts.
  3. Accelerate the handoff from design intent to working production code.
- **Core Pain Points with Current AI Tools:**
  - *Total Disregard for Design Discipline:* AI tools generate layouts with arbitrary margins (`p-3`, `p-7`, `m-[18px]`), broken line heights, and illegible text contrast.
  - *Inability to Compare Visual Directions:* AI tools provide one arbitrary design output; there is no structured way to explore 3 distinct aesthetic directions (e.g., Swiss Minimalist vs. Data-Dense) before committing to code.
  - *Superficial "Polish" Over Information Architecture:* AI tools add animations and gradients to mask fundamentally flawed layout composition.
- **What Liam Needs from UIForge:**
  - A **Design Intelligence Engine** and **Visual Design Lab (Studio)** that generates structured visual directions and enforces design token contracts across the entire application lifecycle.
- **Unvalidated Assumptions:**
  - *Assumption 1:* Liam is interested in using a web-based UIForge Studio interface to compare visual directions and approve design tokens before engineers start implementation.
  - *Assumption 2:* Liam cares more about layout and typographic hierarchy than complex micro-animations.

---

## 3. Persona Comparison & Priority Matrix

| Dimension | Persona 1: Alex (AI Developer) | Persona 2: Maya (Frontend Architect) | Persona 3: Liam (Product Designer) |
| :--- | :--- | :--- | :--- |
| **Primary Value Metric** | Speed & functional completeness | Safety, non-regression & a11y | Visual fidelity & token consistency |
| **Primary Interface** | CLI & MCP in Terminal | CLI, Git Diffs, CI/CD | Studio Visual Lab & Figma |
| **Adoption Friction** | Dislikes slow evaluation loops | Fear of broken production code | Skeptical of AI aesthetic taste |
| **Target Offering** | UIForge Core (CLI / MCP) | UIForge Core (Analyzer / Diff) | UIForge Studio (Design Lab) |
| **Phase Priority** | **Phase 01–16 (Immediate Focus)** | **Phase 06, 11, 15 (Critical)** | **Phase 08, 17 (Studio Horizon)** |

### Strategic Recommendation
**Persona 1 (Alex) is the initial beachhead user** for UIForge Core. Solving Alex's immediate daily pain—eliminating correction prompting loops by enforcing design systems and automated Playwright verification—establishes grassroots adoption. **Persona 2 (Maya)** validates the enterprise open-core model (safety, brownfield AST diffs), while **Persona 3 (Liam)** drives long-term commercial Studio adoption.
