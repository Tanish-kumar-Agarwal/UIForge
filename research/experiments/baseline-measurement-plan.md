# UIForge Research Protocol — Empirical Baseline Measurement & Benchmark Plan

**Document ID:** `UIF-EXP-003`  
**Phase:** 01 — Product Research, Problem Validation, Competitive Intelligence & Product Differentiation  
**Status:** Benchmark Trial Protocol (Pre-Execution Methodology)  
**Date:** November 2026  

---

## 1. Study Objective & Core Hypotheses

The objective of this experimental protocol is to establish **empirical, reproducible baseline measurements** of AI-assisted frontend generation and measure the exact statistical impact delivered by the UIForge intelligence and evaluation harness.

### Formal Experimental Hypotheses
- **Hypothesis 1 (Product Effectiveness):** Coding agents orchestrated with UIForge's structured specifications, design tokens, component discovery, and independent browser evaluation will produce fewer automated accessibility violations, fewer responsive layout collapses, and higher functional interaction completion rates than unassisted agents operating with equivalent time and token budgets.
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

### 3.1 Experiment 1: Overall Product Effectiveness (3-Arm Randomized Trial)
Evaluates whether the complete UIForge platform produces superior frontend engineering outcomes compared to standard agent workflows under **equal total token, time, and tool budgets**:
- **Arm A (Control / Raw Baseline):** Connected coding agent provided with the standardized prompt and task specification. No specialized design tokens, no automated browser testing.
- **Arm B (Conventional Tools / Component Registry):** Connected coding agent equipped with standard ecosystem tools (`shadcn-ui` CLI, Tailwind CSS v4, and standard prompt rules instructing adherence to accessibility).
- **Arm C (Experimental / Complete UIForge Layer):** Connected coding agent orchestrated through the full UIForge platform:
  - *Upstream:* `@uiforge/contracts` and `@uiforge/design-tokens` (DTCG format).
  - *Component Layer:* `@uiforge/component-registry` component discovery and state schemas.
  - *Downstream:* Automated `@uiforge/browser-automation` (Playwright multi-viewport) + `@axe-core/playwright` evaluation loop with max 3 targeted refinement passes.

### 3.2 Experiment 2: Feature Contribution Ablation Study
Once overall effectiveness is established, a subsequent ablation trial investigates which specific UIForge capabilities drive the observed improvements. To ensure clean causal attribution, the primary ablation follows a **progressive cumulative ladder** rather than arbitrary feature swapping:

| Arm | Name | Capabilities Included | Evaluated Capability Increment |
| :--- | :--- | :--- | :--- |
| **Arm A** | **Baseline Agent** | Unassisted baseline coding agent (standard prompt and tools). | Baseline reference. |
| **Arm B** | **Tokens Only** | Baseline + `@uiforge/design-tokens` (DTCG design tokens). | Main effect of token-level constraints and design variables. |
| **Arm C** | **Tokens + Registry** | Tokens + `@uiforge/component-registry` (component discovery and state schemas). | Incremental effect of constraining agent to verified component primitives. |
| **Arm D** | **Tokens + Registry + Evaluation** | Tokens + Registry + `@uiforge/browser-automation` & `@axe-core/playwright` (single-pass diagnostic feedback). | Incremental effect of deterministic browser execution & diagnostic feedback. |
| **Arm E** | **Full Workflow with Refinement** | Tokens + Registry + Browser Evaluation + Multi-turn Agent Refinement Loop (max 3 automated repair iterations). | Incremental effect of the closed-loop autonomous repair cycle. |

#### Alternative / Secondary Design: Factorial Experiment
To isolate multi-factor interactions between capabilities (e.g., whether tokens enhance browser evaluation effectiveness or vice-versa), a secondary $2^3$ factorial experiment (Tokens $\in \{0, 1\}$, Registry $\in \{0, 1\}$, Evaluation $\in \{0, 1\}$) may be conducted. However, the benchmark will not run every combinatorial permutation immediately; the progressive ladder (Arms A–E) must first establish which individual capabilities demonstrate significant main effects before committing compute to a full factorial matrix.

---

## 4. Primary and Secondary Outcome Definitions

To prevent selective reporting, metrics are strictly classified into pre-registered Primary and Secondary outcomes:

### Primary Outcomes (Mandatory Quality Gates)
1. **Automated Accessibility Violations Detected by axe-core:**
   - *Measurement:* Count of rule violations detected by `@axe-core/playwright` in headless Chromium, categorized by severity (Critical, Serious, Moderate, Minor) with verified contrast checks (4.5:1 normal text, 3:1 large text, 3:1 non-text objects).
   - *Methodological Scope & Boundary:* `axe-core` identifies automatically detectable accessibility defects. It does **not** establish complete WCAG 2.2 AA compliance. Manual keyboard navigation, semantic hierarchy review, and assistive-technology checks remain separate validation measures. UIForge does not make compliance claims based solely on automated scanning.
2. **Responsive Layout Failures:**
   - *Measurement:* Count of DOM elements exhibiting horizontal viewport overflow (`scrollWidth > clientWidth`) across 3 standardized viewports (Mobile: 375px, Tablet: 768px, Desktop: 1440px), plus touch targets failing WCAG 2.5.8 ($< 24\text{px} \times 24\text{px}$).
3. **Requirement-Based User Journey Completion Rate:**
   - *Measurement:* Percentage of pre-defined functional test steps successfully executed by Playwright synthetic interaction scripts (e.g., submitting form triggers success state, clicking filter updates table).
4. **Brownfield Test Regression Rate:**
   - *Measurement:* Binary indicator (0/1) and regression count indicating whether any existing unit or E2E tests broke following patch application.

### Secondary Outcomes (Efficiency, Quality & In-Depth Validation)
1. **Wall-Clock Completion Time:** Total elapsed minutes from initial prompt dispatch to final code delivery.
2. **Correction Turn Count:** Total number of interactive conversational turns required.
3. **Cumulative Token Consumption & Financial Cost:** Total prompt, completion, and cache tokens consumed, and dollar cost at public API rates.
4. **Code Churn & Scope:** Lines of code added, deleted, and modified (`git diff --stat`).
5. **Code Maintainability Signals:** AST cyclomatic complexity, component line count, and duplicate primitive import count.
6. **Blinded Human Visual Preference:** TrueSkill / Bradley-Terry rating computed from pairwise blind reviews by independent UI/UX designers.
7. **Comprehensive Accessibility Validation Measures (Non-Automated):**
   - *Manual Keyboard Navigation Audit:* Tab sequence order, presence of focus traps in modals/drawers, and visible focus indicator rings (`:focus-visible`).
   - *Semantic Hierarchy Review:* Correct use of landmark elements (`main`, `nav`, `header`, `footer`) and heading hierarchy (`h1`..`h6`).
   - *Assistive Technology Spot-Checks:* Screen reader read-out fidelity using VoiceOver and NVDA on representative completed journeys.

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
For existing repository refactoring, safety is measured through a dedicated six-factor safety audit:

| Safety Metric | Precise Operational Measurement | Safety Failure Condition |
| :--- | :--- | :--- |
| **1. Unrelated Files Modified** | Count of files modified outside the designated task scope boundary (e.g., modifying global layout or auth configuration when fixing settings UI). | Count $> 0$ files outside scope. |
| **2. Existing Test Regressions** | Count of previously passing unit, integration, or E2E test suites that fail following patch application (`pnpm vitest run`). | Any regression count $> 0$. |
| **3. Unapproved Dependencies** | Count of new packages introduced in `package.json` that violate or fall outside the approved project dependency policy. | Any unapproved package added. |
| **4. Protected Symbols Deleted** | Count of AST-identified protected functions, exported interfaces, custom business logic hooks (e.g., `useUserPermissions`), or config keys removed or altered without authorization. | Any protected symbol deleted or signature broken. |
| **5. Diff Scope** | Count of files, lines added, and lines removed (`git diff --stat`) relative to the approved task requirements. | Excessive churn or modification of unrelated components. |
| **6. Atomic Rollback Verification** | Binary verification (0/1) confirming that rejecting the patch cleanly restores the exact prior Git commit SHA and all passing test suites without residual untracked files or corrupt state. | Inability to restore clean prior state ($0$). |

#### Critical Methodological Distinction: Intentional vs. Unintended Modifications
- **Diff size alone is not a valid indicator of safety**:
  - A **large diff is not automatically unsafe**: An intentional, approved cross-cutting architectural refactor (e.g., migrating 15 components to a standardized design token system) produces a large diff while maintaining 100% test pass rates and zero unintended side effects.
  - A **small diff is not automatically safe**: A 1-line diff that alters a shared authentication interceptor, deletes an authorization check, or introduces an off-by-one bug in a payment calculation is catastrophic.
- The safety suite strictly measures **unintended, unapproved, and out-of-scope alterations**, distinguishing task-aligned modifications from architectural regression and behavioral drift.

---

## 6. Sample Size Justification & Two-Stage Statistical Protocol

### 6.1 Stage 1: Pilot Trial & Variance Estimation
- **Experimental Allocation:**
  The preliminary pilot evaluates:
  $$\text{Total Pilot Runs } N = 3 \text{ experimental arms} \times 5 \text{ task archetypes} \times 3 \text{ repetitions per arm/task cell} = 45 \text{ pilot runs}$$
  using a fixed model snapshot (e.g., Claude 3.5 Sonnet / GPT-4o pinned version).
- **Purpose & Scope:**
  - $N = 45$ pilot runs are **not** assumed to provide sufficient statistical power for final confirmatory hypotheses in the main experiment.
  - The explicit purpose of Stage 1 is to:
    1. Estimate empirical within-task variance ($\hat{\sigma}^2$) and between-task variance.
    2. Establish plausible effect sizes ($\delta$) and inter-cluster correlation for repeated task instances.
    3. Validate execution harness reliability, container orchestration, and logging pipelines.
- **Formal Sample-Size Derivation for Stage 2:**
  The final sample size for Stage 2 will be formally computed using:
  1. The empirical variance estimates and effect sizes obtained in Stage 1.
  2. The primary pairwise comparison of interest (Arm C vs. Arm A, and Arm C vs. Arm B).
  3. The chosen mixed-effects regression structure.
  4. Target statistical power:
     $$\text{Power} = 1 - \beta \ge 0.80 \quad \text{at} \quad \alpha = 0.05$$
     with Holm step-down adjustment applied across the pre-defined family of primary outcomes.

### 6.2 Pre-Registered Multiple-Testing Strategy (Holm Family Definition)
To control the Family-Wise Error Rate (FWER) across multiple endpoints without unnecessary loss of power, a **Holm (Bonferroni-Holm) step-down procedure** will be applied to the primary hypothesis testing families:
- **Family 1 (Primary Efficacy Contrast: Arm C vs. Arm A):**
  - $H_{0,1}$: Automated accessibility violations detected by axe-core ($Arm_C = Arm_A$).
  - $H_{0,2}$: Responsive layout failures at 375px/768px/1440px ($Arm_C = Arm_A$).
  - $H_{0,3}$: Requirement-based user journey completion rate ($Arm_C = Arm_A$).
  - $H_{0,4}$: Brownfield test regression occurrence ($Arm_C = Arm_A$).
- **Family 2 (Incremental Efficacy Contrast: Arm C vs. Arm B):**
  - $H_{0,5}$ through $H_{0,8}$ testing Arm C vs. Arm B across the same 4 primary outcomes.
- **Secondary Endpoints:**
  Secondary outcomes (wall-clock time, token count, cyclomatic complexity) are evaluated as exploratory and descriptive. They do not belong to the primary confirmatory testing family and will be reported with unadjusted $p$-values and 95% confidence intervals, clearly marked as hypothesis-generating.

---

## 7. Statistical Analysis Methodology

To ensure defensible statistical inference, models are selected based on the data-generating process and experimental structure:

| Data Type | Primary Dependent Variable | Statistical Model | Methodological Specification & Random Effects Justification |
| :--- | :--- | :--- | :--- |
| **Continuous Outcomes** | Elapsed Time, Token Usage, Diff Scope | **Linear Mixed-Effects Models (LMM)** | **Fixed Effects:** Experimental Arm (A/B/C) and Task Archetype (TSK-01..05).<br>**Random Effects:** Individual Task Instance / Repetition Seed (random intercepts).<br>*Justification:* The 5 task archetypes represent deliberately chosen fixed categories rather than a random sample of all frontend tasks; hence they are modeled as fixed effects. Random effects are reserved for exchangeable task instances and repeated runs. |
| **Count Data (Defects)** | axe-core violations, mobile overflow elements | **Negative Binomial Mixed Regression** | **Fixed Effects:** Experimental Arm, Task Archetype.<br>**Random Effects:** Task Instance / Seed.<br>*Justification:* Non-negative integers exhibiting significant overdispersion ($\text{Var} > \text{Mean}$). |
| **Binary Outcomes** | Regression occurrence (0/1), Build success | **Generalized Linear Mixed Models (GLMM, Logistic)** | **Fixed Effects:** Experimental Arm, Task Archetype.<br>**Random Effects:** Task Instance / Seed.<br>*Justification:* Models log-odds of binary pass/fail outcomes while clustering repeated measures. |
| **Human Preference** | Blinded pairwise visual preference ratings | **Bradley-Terry / TrueSkill Rating Model** | Calibrates pairwise designer comparisons into probabilistic skill scores with standard errors. |

#### Modeling Rule: Defensible Random Effects
Random effects are not applied automatically simply because observations are grouped. Categorical factors with few levels ($k = 5$) and fixed structural definitions (such as our 5 curated task archetypes) are treated as **fixed effects**. Random effects are restricted to exchangeable sampling units (e.g., individual task runs, stochastic prompt seeds, or benchmark evaluation instances) with sufficient degrees of freedom to estimate variance components reliably.

---

## 8. Model & Environment Controls

To eliminate confounding external variables:
1. **Single-Model Isolation:** Experimental arms will never mix different foundation models within a trial. Separate complete benchmark trials will be executed for each supported model series:
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
