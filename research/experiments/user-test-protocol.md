# UIForge Research Protocol — Controlled User Testing & Practical Evaluation

**Document ID:** `UIF-EXP-002`  
**Phase:** 01 — Product Research, Problem Validation, Competitive Intelligence & Product Differentiation  
**Status:** Ready for Execution (Practical Test Protocol)  
**Date:** November 2026  

---

## 1. Objective of Practical Testing

The purpose of this protocol is to **empirically measure and compare developer productivity, output quality, and defect rates** between:
- **Condition A (Control / Baseline):** Developer building/modifying a frontend application using their standard AI coding agent (Claude Code, OpenCode, or Cursor) with ordinary prompts and ad-hoc iteration.
- **Condition B (Experimental / UIForge):** Developer performing the identical task assisted by UIForge's structured specifications, design tokens, component discovery, and automated Playwright/axe-core evaluation loop.

---

## 2. Standardized Evaluation Tasks

### Task 1: Greenfield Multi-Page SaaS Application (Creation)
- **Prompt Specification:**
  > *"Build a modern, accessible B2B Subscription & Billing Management portal using Next.js App Router and Tailwind CSS. The app must contain two routes: (1) `/dashboard` showing monthly recurring revenue metrics, an active plan summary card, and an invoice history table with downloadable receipt actions; and (2) `/settings/billing` containing a payment method update form (card number, expiry, CVC) and an annual/monthly billing toggle. The application must be fully responsive on mobile (375px) and pass WCAG 2.2 AA accessibility."*
- **Time Limit:** 45 minutes maximum per condition.

### Task 2: Brownfield Refactoring & Defect Remediation (Improvement)
- **Pre-existing Codebase:** A standardized, pre-built Next.js repository containing a realistic User Profile & Security settings page with 5 deliberate seeded defects:
  1. *Defect 1 (A11y):* Form input fields lacking associated `<label>` elements or `aria-label` tags.
  2. *Defect 2 (A11y):* Text color contrast of `#94A3B8` on `#FFFFFF` (2.4:1 ratio, failing WCAG 1.4.3).
  3. *Defect 3 (Responsive):* A fixed-width table container (`w-[750px]`) causing severe horizontal overflow on mobile viewports (375px).
  4. *Defect 4 (UX Facade):* A "Two-Factor Authentication" toggle button with an empty event handler (`onClick={() => {}}`).
  5. *Defect 5 (Regression Hazard):* An existing custom state hook (`useUserPermissions`) managing user role authorization that must not be deleted or bypassed.
- **Task Instruction:**
  > *"Audit this settings page, fix all accessibility and mobile responsive defects, wire the 2FA toggle to real local state, and ensure no existing permission logic is damaged."*
- **Time Limit:** 30 minutes maximum per condition.

---

## 3. Test Execution Procedure & Controls

1. **Environment Standardization:**
   - Operating System: Linux (Ubuntu 24.04 LTS) or macOS (Apple Silicon).
   - Node.js Version: Node 22/24 LTS, pnpm.
   - Screen Recording: Full-screen video + audio capture, terminal keystroke logging, and network inspector logging.
2. **Execution Steps:**
   - *Step 1:* Participant reviews the task specification (5 min).
   - *Step 2:* Participant executes the task in Condition A.
   - *Step 3:* At task completion (or timeout), automated test harness captures code snapshot, commits git SHA, and triggers headless evaluation script.
   - *Step 4:* 15-minute break.
   - *Step 5:* Participant executes equivalent task in Condition B.
   - *Step 6:* Automated test harness captures final code snapshot and triggers headless evaluation script.
   - *Step 7:* Post-test structured debrief (10 min).

---

## 4. Empirical Measurement Metrics

For each run, the following metrics are recorded deterministically by automated scripts:

| Metric Category | Specific Measurement | Tool / Verification Mechanism |
| :--- | :--- | :--- |
| **Productivity** | Total Elapsed Time to completion (minutes) | Wall-clock timer |
| **Iteration Friction** | Total Correction Prompt Turns required | Terminal transcript log analysis |
| **Accessibility** | Total WCAG 2.2 AA violations | Automated `@axe-core/playwright` audit |
| **Responsiveness** | Horizontal scroll overflow count at 375px (`scrollWidth > clientWidth`) | Playwright headless DOM script |
| **Functional Integrity** | Number of inert facade buttons (`onClick` stubbed/empty) | Static AST AST-grep / Playwright click test |
| **Code Churn** | Lines of code added, deleted, and modified | `git diff --stat` |
| **Regression Rate** | Breaking changes to seeded business logic hooks | Unit test suite (`pnpm vitest`) |
| **Token Cost** | Total input and output tokens consumed across all turns | Agent session usage metadata |

---

## 5. Defect Cataloging & Recording Template

```markdown
### Practical Test Session Record
- **Session ID:** `EXP-SESS-[001-999]`
- **Participant ID:** `Participant-[DEV|ENG|DES]-[01-99]`
- **Condition:** Condition A (Baseline) / Condition B (UIForge)
- **Task:** Task 1 (Greenfield) / Task 2 (Brownfield)

#### Quantitative Outcomes
- Elapsed Time: ______ minutes
- Total Prompt Turns: ______ turns
- axe-core Violations (WCAG 2.2 AA): ______ defects
- Mobile Overflows (375px): ______ elements
- Inert Facade Buttons: ______ controls
- Seeded Regressions Triggered: ______ / 5
- Total Tokens Consumed: ______ tokens

#### Qualitative Observer Notes
- Primary stumbling blocks:
- Participant quotes during correction turns:
- Unexpected agent behaviors observed:
```

---

## 6. Archival & Reproducibility Standards

- All captured code repositories, git bundles, Playwright test logs, and video recordings must be cataloged in `research/evidence/test-runs/` to ensure full scientific reproducibility.
