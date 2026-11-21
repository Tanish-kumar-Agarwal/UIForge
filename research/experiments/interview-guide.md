# UIForge Research Protocol — Empirical User Interview Guide

**Document ID:** `UIF-EXP-001`  
**Phase:** 01 — Product Research, Problem Validation, Competitive Intelligence & Product Differentiation  
**Status:** Ready for Execution (Field Protocol)  
**Date:** November 2026  

---

## 1. Participant Recruitment & Screening Criteria

To ensure reliable, non-biased empirical data, recruitment must adhere strictly to these criteria:

| Cohort | Target Count | Mandatory Qualification Criteria | Disqualification Criteria |
| :--- | :---: | :--- | :--- |
| **Cohort 1: AI Developers (Persona 1)** | 5 | Actively uses an AI coding agent (Claude Code, OpenCode, Cursor, Codex) at least 3 days/week to build frontend interfaces. | Has never used an AI coding agent; builds purely backend CLI/database tools. |
| **Cohort 2: Frontend Engineers (Persona 2)** | 5 | Senior/Staff Frontend Engineer maintaining an enterprise or team codebase with >50 components; conducts code reviews. | Junior developers with <2 years frontend experience; non-web mobile developers. |
| **Cohort 3: Product Designers (Persona 3)** | 5 | Professional UI/UX Designer or Design Technologist managing a Figma design system or design token pipeline. | Visual-only graphic designers who do not design responsive web interfaces. |

---

## 2. Interview Structure & Timing (45 Minutes Total)

- **00:00–05:00:** Introduction, Recording Consent, and Workflow Warm-up.
- **05:00–15:00:** Current AI Usage, Workflow Frustrations & The "Correction Loop".
- **15:00–30:00:** Deep Dive: Role-Specific Engineering & Design Failure Modes.
- **30:00–40:00:** Concept Testing: UIForge Core (CLI/MCP) & Brownfield Patching.
- **40:00–45:00:** Wrap-up, Quantitative Rating Rubric, and Follow-Up Permission.

---

## 3. Detailed Interview Scripts by Persona

### Part 1: Common Warm-Up & Workflow Context (All Cohorts)
1. "Walk me through the last time you used an AI coding agent or website generator to build or modify a user interface."
2. "What was the initial prompt or task, and what did the first output look like?"
3. "At what exact point did you realize you needed to intervene or correct the output?"

---

### Part 2: Cohort 1 Script — AI-Assisted Developers (Persona 1)
1. **The Correction Prompt Spiral:**
   - "How many prompt iterations does it typically take you to get an AI-generated page from 'initial rendering' to 'acceptable for deployment'?"
   - "What specific types of defects force you into back-and-forth prompt loops (e.g., mobile layout shifts, broken icons, wrong colors, dead buttons)?"
2. **The Facade Problem:**
   - "How often does an AI agent give you a component that looks great in a preview, but turns out to have empty event handlers (`onClick={() => {}}`) or missing error states?"
   - "How do you currently verify that forms, search filters, and modal toggles actually work?"
3. **Component Discovery & Tooling:**
   - "Do you currently use component registries like shadcn/ui or libraries like Aceternity/Magic UI? How do you instruct your coding agent to use them?"
   - "What happens when the agent tries to install or customize those components?"
4. **Verification & Testing:**
   - "Do you run any automated accessibility or responsive tests on AI-generated code, or do you inspect it manually in the browser?"
   - "Would you trust a CLI tool or MCP server that ran headless Playwright and axe-core tests automatically in the background and fixed defects before showing you the code?"

---

### Part 3: Cohort 2 Script — Senior Frontend Engineers (Persona 2)
1. **Brownfield Maintenance & Technical Debt:**
   - "What are the most frequent structural defects you see when reviewing pull requests containing AI-generated frontend code?"
   - "Have you ever experienced an AI agent overwriting existing business logic, deleting comments, or breaking adjacent routes in an existing project? Walk me through what happened."
2. **Design System & Architectural Preservation:**
   - "How well do AI agents adhere to your project's existing styling approach (e.g., CSS Modules vs Tailwind vs styled-components)? How often do they introduce rogue dependencies?"
   - "If an AI tool could inspect your repository, what would it need to prove before you allowed it to propose code changes?"
3. **Approval-Based Patching Workflow:**
   - "Would you prefer an AI tool that directly commits changes to your branch, or one that presents surgical, unified diffs (`.patch`) with automated Playwright/a11y test evidence for explicit approval?"
   - "What is your team’s policy regarding third-party cloud tools accessing your source code? Does your security model require 100% local execution?"

---

### Part 4: Cohort 3 Script — Product Designers & Design Technologists (Persona 3)
1. **Aesthetic & Typographic Discipline:**
   - "What design decisions do current AI tools consistently get wrong (e.g., font pairing, line height, padding scales, contrast)?"
   - "Why do so many AI-generated interfaces end up looking like generic 'AI-slop' with purple gradients and floating cards?"
2. **Visual Direction & Intent:**
   - "When you design a new product, how do you explore different aesthetic directions? Would it be valuable if an AI tool generated 3 distinct, contextual visual directions (e.g., Swiss Minimalist vs. Data-Dense) before writing code?"
   - "How do you currently ensure that design tokens defined in Figma (colors, spacing, typography) remain consistent when an engineer builds multiple pages with an AI agent?"
3. **Design Audits & Automated Evaluation:**
   - "Which quality dimensions in a frontend interface can be reliably evaluated by automated software, and which strictly require human designer judgment?"
   - "What would make an automated design audit report actually useful to you, rather than just noise?"

---

## 4. Post-Interview Quantitative Scoring Rubric

At the conclusion of each interview, the interviewer records quantitative ratings (1 to 5 scale, where 1 = Not a Problem / Strongly Disagree, 5 = Critical Pain / Strongly Agree):

| Evaluation Dimension | Metric Evaluated | Score (1–5) | Field Notes & Direct Quotes |
| :--- | :--- | :---: | :--- |
| **Correction Fatigue** | Severity of time lost in back-and-forth prompt loops | `[ ]` | |
| **Facade Pain** | Frequency of encountering dead buttons and missing states | `[ ]` | |
| **Brownfield Fear** | Reluctance to let AI agents modify existing production code | `[ ]` | |
| **A11y Priority** | Business/compliance necessity of automated WCAG 2.2 AA testing | `[ ]` | |
| **Approval Willingness** | Preference for surgical diff approval over autonomous file writes | `[ ]` | |
| **Local Execution Need** | Requirement for 100% offline/local CLI execution (no cloud code leaks) | `[ ]` | |

---

## 5. Data Handling & Anonymization Standards

- All audio recordings and raw notes must be stored in encrypted local storage.
- Participant names, employer names, and proprietary codebase references must be pseudonymized (e.g., `Participant-DEV-01`, `Participant-ENG-03`).
- Completed rubrics and anonymized notes will be archived in `research/evidence/transcripts/`.
