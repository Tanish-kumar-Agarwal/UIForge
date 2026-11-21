# UIForge Research Protocol — Empirical Baseline Measurement & Benchmark Plan

**Document ID:** `UIF-EXP-003`  
**Phase:** 01 — Product Research, Problem Validation, Competitive Intelligence & Product Differentiation  
**Status:** Benchmark Trial Protocol (Pre-Execution Methodology)  
**Date:** November 2026  

---

## 1. Study Objective & Core Hypotheses

The objective of this experimental protocol is to establish **empirical, reproducible baseline measurements** of AI-assisted frontend generation and measure the exact statistical impact delivered by the UIForge intelligence and evaluation harness.

### Formal Experimental Hypotheses
- **Hypothesis 1 (Product Effectiveness):** Coding agents orchestrated with UIForge's structured specifications, design tokens, component discovery, and independent browser evaluation will produce fewer accessibility violations, fewer responsive layout collapses, and higher functional interaction completion rates than unassisted agents operating with equivalent time and token budgets.
- **Hypothesis 2 (Brownfield Safety):** A local-first, read-only AST analyzer paired with scoped unified patch generation and regression testing will significantly reduce regression rates and unrelated code churn in existing codebases compared to direct agent file-editing.

---

## 2. Multi-Task Specification Suite

To ensure findings generalize across diverse frontend domains rather than reflecting a single application type, the benchmark evaluates **five representative task archetypes**:

| Task ID | Archetype | Specific Requirements & Interactions | Primary Dimensions Tested |
| :--- | :--- | :--- | :--- |
| **TSK-01** | **B2B SaaS Analytics Dashboard** | Multi-metric KPI cards, interactive date-range filter, data table with sorting, pagination, empty state, and responsive drawer navigation. | Data density, state machines (empty/loading), table reflow, responsive drawer. |
| **TSK-02** | **E-Commerce Storefront & Cart** | Product grid with category filters, dynamic cart drawer, quantity adjustment with optimistic UI, and accessible checkout modal. | Interactive state updates, modal focus traps, image aspect ratios, touch targets. |
| **TSK-03** | **Brand & Marketing Landing Page** | Asymmetric hero section, typography-driven narrative, responsive pricing comparison table with monthly/annual toggle, and contact form validation. | Typographic scale coherence, visual hierarchy, layout composition, form errors. |
| **TSK-04** | **Brownfield Enterprise Refactor** | Existing Next.js repository containing a settings module with 5 seeded defects (contrast failure, mobile overflow, missing labels, inert toggle, and custom auth hook). | Safety, AST preservation, minimal diff scope, zero regressions to business logic. |
| **TSK-05** | **Multi-Route Application** | Three interconnected routes (`/`, `/team`, `/billing`) sharing a global layout, user profile menu, and persistent theme switcher. | Cross-page design token consistency, shared layout state, client-side routing. |

---

## 3. Two-Tier Experimental Structure

To isolate overall product value from the contribution of individual features, the benchmark separates product comparison from feature ablation:

### Experiment 1: Overall Product Effectiveness (3-Arm Randomized Trial)
Evaluates whether the complete UIForge platform produces superior frontend engineering outcomes compared to standard agent workflows under **equal total token, time, and tool budgets**:
- **Arm A (Control / Raw Baseline):** Connected coding agent provided with the standardized prompt and task specification. No specialized design tokens, no automated browser testing.
- **Arm B (Conventional Tools / Component Registry):** Connected coding agent equipped with standard ecosystem tools (`shadcn-ui` CLI, Tailwind CSS v4, and standard prompt rules instructing adherence to accessibility).
- **Arm C (Experimental / Complete UIForge Layer):** Connected coding agent orchestrated through the full UIForge platform:
  - *Upstream:* `@uiforge/contracts` and `@uiforge/design-tokens` (DTCG format).
  - *Component Layer:* `@uiforge/component-registry` component discovery and state schemas.
  - *Downstream:* Automated `@uiforge/browser-automation` (Playwright multi-viewport) + `@axe-core/playwright` evaluation loop with max 3 targeted refinement passes.

### Experiment 2: Feature Contribution Ablation Study
Once overall effectiveness is established, a subsequent ablation trial investigates which specific UIForge capabilities drive the observed improvements:
1. *Ablation 1:* Design Tokens only (no component registry, no automated browser testing).
2. *Ablation 2:* Design Tokens + Component Discovery (no browser testing).
3. *Ablation 3:* Browser Evaluation only (axe-core + Playwright feedback, but no upstream tokens).
4. *Ablation 4:* Full UIForge Platform (Tokens + Discovery + Evaluation + Refinement).

---

## 4. Primary and Secondary Outcome Definitions

To prevent selective reporting, metrics are strictly classified into pre-registered Primary and Secondary outcomes:

### Primary Outcomes (Mandatory Quality Gates)
1. **Automated Accessibility Violations (WCAG 2.2 AA):** Count of rule violations detected by `@axe-core/playwright`, categorized by severity (Critical, Serious, Moderate, Minor) with verified contrast checks (4.5:1 normal text, 3:1 large text, 3:1 non-text objects).
2. **Responsive Layout Failures:** Count of elements exhibiting horizontal overflow (`scrollWidth > clientWidth`) at 375px mobile viewport, plus touch targets failing WCAG 2.5.8 ($< 24\text{px} \times 24\text{px}$).
3. **Requirement-Based User Journey Completion Rate:** Percentage of pre-defined functional test steps successfully executed by Playwright synthetic interaction scripts (e.g., submitting form triggers success state, clicking filter updates table).
4. **Brownfield Test Regression Rate:** Binary indicator (0/1) and regression count indicating whether any existing unit or E2E tests broke following patch application.

### Secondary Outcomes (Efficiency & Engineering Discipline)
1. **Wall-Clock Completion Time:** Total elapsed minutes from initial prompt dispatch to final code delivery.
2. **Correction Turn Count:** Total number of interactive conversational turns required.
3. **Cumulative Token Consumption & Financial Cost:** Total prompt, completion, and cache tokens consumed, and dollar cost at public API rates.
4. **Code Churn & Scope:** Lines of code added, deleted, and modified (`git diff --stat`).
5. **Code Maintainability Signals:** AST cyclomatic complexity, component line count, and duplicate primitive import count.
6. **Blinded Human Visual Preference:** TrueSkill / Bradley-Terry rating computed from pairwise blind reviews by independent UI/UX designers.

---

## 5. Requirement-Based Functional Testing & Brownfield Safety Metrics

### 5.1 Requirement-Based Functional Testing Framework
Rather than relying on static heuristics (such as searching for empty `onClick` handlers), every task specification includes an executable Playwright verification script testing **concrete state journeys**:
```typescript
// Example: TSK-01 Functional Verification Script
test("TSK-01: Table filtering and empty state behavior", async ({ page }) => {
  await page.goto("/dashboard");
  // 1. Verify initial data rows render
  const rows = page.locator('[data-testid="invoice-row"]');
  await expect(rows).toHaveCount(5);

  // 2. Apply search filter that yields zero results
  await page.fill('[data-testid="search-input"]', "NON_EXISTENT_QUERY");
  
  // 3. Verify empty state displays with expected message
  await expect(page.locator('[data-testid="empty-state"]')).toBeVisible();
  await expect(page.locator('[data-testid="empty-state"]')).toContainText("No invoices found");
  
  // 4. Clear filter and verify state restores
  await page.click('[data-testid="clear-filter-btn"]');
  await expect(rows).toHaveCount(5);
});
```

### 5.2 Brownfield Safety Measurement Suite (Task TSK-04)
For existing repository refactoring, safety is measured through a dedicated multi-factor audit:
1. **Unrelated Files Modified:** Count of files touched outside the designated task scope.
2. **Existing Test Regression:** Count of previously passing test suites that fail (`pnpm vitest`).
3. **Unapproved Dependencies Added:** Count of new packages added to `package.json`.
4. **Protected Symbols / Logic Deleted:** AST comparison verifying that custom business logic hooks (e.g., `useUserPermissions`) remain intact.
5. **Diff Scope & Review Time:** Total lines of diff proposed and wall-clock seconds required for a senior engineer to inspect and approve the patch.
6. **Atomic Rollback Verification:** Verifying that rejecting a patch cleanly restores the exact prior git commit SHA.

---

## 6. Sample Size Justification & Two-Stage Statistical Protocol

### Stage 1: Pilot Trial & Variance Estimation
- **Procedure:** Run a preliminary pilot of $N = 3$ runs per task across all three arms ($3 \times 5 \times 3 = 45$ pilot runs) using a fixed model snapshot.
- **Goal:** Estimate within-task variance ($\sigma^2$), inter-task variance, and preliminary effect sizes ($\delta$) across the primary outcomes (a11y violations and functional completion).
- **Power Calculation:** Using the observed pilot variance, compute the formal sample size $N$ required to achieve statistical power:
  $$\text{Power} = 1 - \beta \ge 0.80 \quad \text{at} \quad \alpha = 0.05$$
  with Bonferroni-Holm adjustment for multiple primary endpoints.

### Stage 2: Main Benchmark Trial
- Execute the full sample size determined by Stage 1 power calculations across randomized model seeds.

---

## 7. Statistical Analysis Methodology

To account for repeated tasks and potential non-independence across runs using the same model endpoints:

| Data Type | Primary Dependent Variable | Recommended Statistical Model | Justification |
| :--- | :--- | :--- | :--- |
| **Continuous Outcomes** | Elapsed Time, Token Usage, Diff Scope | **Linear Mixed-Effects Models (LMM)** | Accounts for fixed effects of experimental Arm (A/B/C) while treating Task Archetype (TSK-01..05) as a random effect. |
| **Count Data (Defects)** | axe-core violations, mobile overflow elements | **Negative Binomial or Poisson Mixed Regression** | Defect counts are non-negative integers exhibiting overdispersion ($\text{Var} > \text{Mean}$). |
| **Binary Outcomes** | Regression occurrence (0/1), Build success | **Generalized Linear Mixed Models (GLMM, Logistic)** | Evaluates the log-odds of regression occurrence across arms with task-level random intercepts. |
| **Human Preference** | Blinded pairwise design ratings | **Bradley-Terry / TrueSkill Rating Model** | Calibrates pairwise designer comparisons into probabilistic skill scores with confidence intervals. |

---

## 8. Model & Environment Controls

To eliminate confounding external variables:
1. **Single-Model Isolation:** Experimental arms will never mix different foundation models. Separate complete benchmark trials will be executed for each supported model:
   - Trial Series 1: Claude 3.5 Sonnet / Claude 3.7 Sonnet (Anthropic API).
   - Trial Series 2: GPT-4o / o3 (OpenAI API).
   - Trial Series 3: Gemini 1.5 Pro / Gemini 2.0 Pro (Google API).
2. **Snapshot Invariance:** Exact pinned model snapshot strings, provider endpoints, and API versions will be recorded.
3. **Execution Environment:** Pinned Docker container (`ubuntu:24.04`, Node.js 22 LTS, pnpm, Chromium headless via Playwright). Loopback networking only during evaluation; external mock servers for data dependencies.
4. **Budget Parity:** In Experiment 1, all three arms operate under an identical maximum time limit (45 minutes per task) and token budget.

---

## 9. Compliance Statement: Zero Pre-Emptive Claims

In strict accordance with Phase 01 guidelines:
- **No benchmark improvements are claimed in this research document.**
- All comparative cells in reporting remain formally labeled `PENDING EXECUTION` until the full two-stage trial is physically conducted and verified in Phase 19.
