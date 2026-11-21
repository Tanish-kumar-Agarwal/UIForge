# UIForge Research — Deep Problem Analysis: The 10 Failure Modes of AI Frontend Generation

**Document ID:** `UIF-PRB-001`  
**Phase:** 01 — Product Research, Problem Validation, Competitive Intelligence & Product Differentiation  
**Status:** In-Depth Problem Decomposition & Evidence Mapping  
**Date:** November 2026  

---

## 1. Introduction & Analytical Framework

Modern AI coding agents (Claude Code, OpenCode, Codex, Cursor, v0) demonstrate high facility with JavaScript/TypeScript syntax and basic React rendering. However, their generated frontends repeatedly fail in production environments due to structural blind spots in visual reasoning, spatial composition, interactive state handling, and architectural empathy.

This document systematically investigates the **ten foundational failure modes** of AI-assisted frontend development.

### Evidence Classification Standards
To maintain scientific rigor, every citation in this document is labeled using a four-tier evidence classification:
- **Direct Evidence**: The cited study or benchmark explicitly measured and quantified this specific failure mode.
- **Indirect Evidence**: The cited study evaluated a related mechanism (e.g., agent browsing failure) that supports the plausibility of this defect.
- **Contextual Evidence**: The cited study establishes the broader problem domain or tool variance, without isolating the specific code-level failure.
- **Hypothesis**: The failure mechanism is an observation or engineering deduction that UIForge plans to measure empirically in controlled trials (Phase 19).

### Dual Confidence Scoring
To distinguish mathematical/mechanical certainty from empirical market occurrence, two separate confidence metrics are reported:
- **Mechanism Confidence**: How certain are we that the described software mechanism or failure mode exists? (High / Medium / Low)
- **Prevalence Confidence**: How certain are we about how frequently it occurs across real-world workflows? (High / Medium / Low / Unmeasured)

---

## 2. In-Depth Analysis of the 10 Failure Modes

### UIF-PROB-01: Visual Design Homogenization ("AI-Slop" Aesthetics)

- **Problem Description:** AI-generated interfaces frequently converge on a homogenized aesthetic: dark-mode glassmorphism, gratuitous purple-to-cyan gradients, floating 3D neon cards, and arbitrary rounded borders (`rounded-2xl` everywhere). The design lacks distinct brand identity and feels synthetic and disconnected.
- **Likely Root Causes:**
  1. *Statistical Mean Regression:* LLMs predict tokens based on statistical frequency. Training distributions are heavily weighted with public concept shots, landing page templates, and popular open-source boilerplates.
  2. *Lack of Brand Context:* Coding agents often generate interfaces in a vacuum without understanding the company's industry, brand personality, or target emotional resonance.
  3. *Overcompensation via Decoration:* Lacking spatial and structural design principles, the model frequently adds decorative elements (gradients, drop shadows, borders) to simulate polish.
- **Evidence & Source Mapping:**
  - *Source:* *UI-Bench* (arXiv:2508.20410, REF-02).
  - *Evidence Level:* **Contextual Evidence**.
  - *What This Source Actually Establishes:* Evaluated 10 commercial text-to-app tools across 300 apps with expert designer pairwise comparisons; establishes substantial variance in visual design quality across complete systems, but does not isolate individual stylistic failure rates.
- **Frequency & Severity:** 
  - Frequency: **Not yet measured (Hypothesis)**.
  - Potential Impact: **High (Hypothesis)** (erodes user trust, looks unprofessional).
- **Current Detection Methods:** Primarily subjective human visual review.
- **Existing Solutions:** Manually curated prompt libraries; Tailwind template marketplaces.
- **Remaining Gaps:** No programmatic system enforces visual restraint or tailors aesthetic style to brand archetype.
- **Potential UIForge Capability:** **Design Intelligence Engine (Phase 08)** with an **Anti-AI Rulebook (Phase 05)** that penalizes gratuitous ornamentation and generates distinct, contextual visual directions (e.g., Editorial, Swiss Minimalist, Technical Utility).
- **Confidence Assessment:**
  - *Mechanism Confidence:* **High** (the phenomenon of visual decoration over structural composition is readily observable).
  - *Prevalence Confidence:* **Unmeasured** (industry-wide prevalence across diverse prompts remains to be quantified).
- **Unresolved Research Question:** Can visual distinctiveness be scored mathematically without penalizing intentional minimalism?

---

### UIF-PROB-02: Typography Inconsistency & Broken Hierarchy

- **Problem Description:** Poor typographic hierarchy: headline text is either oversized or insufficiently distinguished from subheads; body copy line lengths frequently exceed comfortable reading widths (e.g., 45–85 characters, an established readability heuristic); line heights are mismatched (e.g., tight leading on dense body copy); and font weights are chosen arbitrarily.
- **Likely Root Causes:**
  1. *Token Prediction Without Spatial Rendering:* The agent selects utility classes (`text-xl`, `font-bold`) without calculating the rendered line wrap, pixel density, or aspect ratio.
  2. *Lack of Modular Type Scales:* Code is generated without a mathematical scale (e.g., Minor Third 1.2x or Major Third 1.25x), resulting in arbitrary sizes like `text-lg` next to `text-3xl`.
- **Evidence & Source Mapping:**
  - *Source:* *Design2Code* (arXiv:2403.03163, REF-01).
  - *Evidence Level:* **Indirect Evidence**.
  - *What This Source Actually Establishes:* Evaluated screenshot-to-code generation; demonstrated that models frequently misalign structural bounding boxes and text blocks when attempting to replicate layouts. It does not measure dynamic typographic scale coherence in text-to-code generation.
- **Frequency & Severity:** 
  - Frequency: **Not yet measured (Hypothesis)**.
  - Potential Impact: **High (Hypothesis)** (directly impairs content comprehension).
- **Current Detection Methods:** Manual CSS inspection; lighthouse SEO audits (basic font size check only).
- **Existing Solutions:** Tailwind's default typography plugin (`@tailwindcss/typography`), but agents often bypass it with chaotic inline classes.
- **Remaining Gaps:** Lack of automated checking for measure (characters per line), vertical rhythm, and modular scale adherence.
- **Potential UIForge Capability:** **Design System Engine (Phase 09)** that establishes strict typographic scales and mathematical line-height pairings, enforced via AST linter rules and computed-style verification.
- **Confidence Assessment:**
  - *Mechanism Confidence:* **High** (mathematical ratios and computed line lengths are deterministic).
  - *Prevalence Confidence:* **Unmeasured** (frequency of typographic errors in agent output requires benchmark evaluation).
- **Unresolved Research Question:** What is the ideal heuristic tolerance for headline-to-body size ratios across mobile vs. desktop viewports?

---

### UIF-PROB-03: Layout Monotony & Compositional Repetition

- **Problem Description:** AI agents default frequently to two layouts: (1) a centered hero with two buttons, followed by (2) an endless 3-column grid of rounded cards containing an icon, title, and sentence. They struggle with asymmetric balance, sticky navigation rails, split-screen layouts, and narrative content flow.
- **Likely Root Causes:**
  1. *Component Independence Trap:* Agents generate code block by block. A card grid is statistically safe and modular, avoiding the need to reason about holistic page geometry.
  2. *Ignorance of Information Scent:* Different content types (tabular data, comparisons, timelines, narratives) require bespoke compositions. Agents treat all content as "cardable."
- **Evidence & Source Mapping:**
  - *Source:* Qualitative analysis of public generative AI output repositories (v0 public showcase, Bolt community templates).
  - *Evidence Level:* **Hypothesis / Qualitative Observation**.
  - *What This Source Actually Establishes:* Qualitative reviews consistently identify repetitive 3-column card grids across diverse prompts; systematic frequency across prompt distributions has not been formally measured in academic literature.
- **Frequency & Severity:** 
  - Frequency: **Not yet measured (Hypothesis)**.
  - Potential Impact: **Medium-High (Hypothesis)** (creates monotonous, low-converting pages).
- **Current Detection Methods:** Visual human review.
- **Existing Solutions:** Component libraries (shadcn/ui blocks).
- **Remaining Gaps:** No system analyzes raw content structure to recommend layout archetypes (e.g., "This data represents a sequence, use a vertical timeline or zigzag layout instead of 3 cards").
- **Potential UIForge Capability:** **UX Engine (Phase 11)** analyzing content semantics and prescribing alternative compositional patterns.
- **Confidence Assessment:**
  - *Mechanism Confidence:* **Medium-High** (structural analysis of generated DOM trees can confirm layout repetition).
  - *Prevalence Confidence:* **Unmeasured** (formal sampling needed to establish cross-model recurrence).
- **Unresolved Research Question:** How do we algorithmically detect layout monotony across multiple sequential sections?

---

### UIF-PROB-04: Color and Contrast Problems

- **Problem Description:** Color contrast failing WCAG 2.2 AA standards:
  - Normal body text failing the 4.5:1 minimum contrast requirement (Criterion 1.4.3).
  - Large text (at least 18pt or 14pt bold) failing the 3:1 minimum contrast requirement (Criterion 1.4.3).
  - Non-text interface components and graphical objects failing the 3:1 contrast requirement (Criterion 1.4.11).
  - Arbitrary accent colors used for non-interactive elements; lack of semantic distinction between brand colors and functional states (success, warning, destructive).
- **Likely Root Causes:**
  1. *Absence of Contrast Evaluation in Synthesis Loop:* Observed coding-agent workflows typically generate classnames or hex colors without evaluating mathematical relative luminance contrast:
     $$\text{Contrast Ratio} = \frac{L_1 + 0.05}{L_2 + 0.05}$$
  2. *Dark Mode Inversion Failures:* Agents attempt dark mode by naively swapping `bg-white` to `bg-black`, causing crushed contrast and unreadable dark borders.
- **Evidence & Source Mapping:**
  - *Source:* WebAIM Million Reports & Deque Systems Accessibility Research.
  - *Evidence Level:* **Contextual Evidence**.
  - *What This Source Actually Establishes:* Establishes that low-contrast text is the most common automated accessibility failure on the web (>80% of audited homepages). It provides strong contextual grounds for prioritizing contrast verification, but does not isolate AI-generated code as a distinct dataset.
- **Frequency & Severity:** 
  - Frequency: **Not yet measured (Hypothesis)**.
  - Potential Impact: **Critical (Hypothesis)** (legal liability under ADA/EAA; illegibility).
- **Current Detection Methods:** axe-core, Lighthouse, WebAIM contrast checker.
- **Existing Solutions:** Color palette generators (Coolors, Radix Colors).
- **Remaining Gaps:** AI coding agents do not execute contrast algorithms before generating JSX classnames.
- **Potential UIForge Capability:** **Design System Engine (Phase 09)** that mathematically calculates WCAG 2.2 AA contrast compliance at token generation time.
- **Confidence Assessment:**
  - *Mechanism Confidence:* **High (Deterministic)** (relative luminance formulas are mathematically exact).
  - *Prevalence Confidence:* **Unmeasured** (exact frequency of contrast violations in AI-synthesized code requires empirical testing).
- **Unresolved Research Question:** How to handle dynamic contrast on elements with semi-transparent backgrounds or background images?

---

### UIF-PROB-05: UX Facades & Missing States

- **Problem Description:** Frontend components appear visually complete in screenshots but are functionally inert ("The Facade Pattern"):
  - Buttons have empty event handlers: `onClick={() => {}}`.
  - Forms lack validation, error messages, and submission feedback.
  - Search inputs do not filter or trigger queries.
  - Absence of edge states: Zero handling of `isLoading`, `isError`, `isEmpty`, or optimistic mutations.
- **Likely Root Causes:**
  1. *Screenshot-Centric Optimization:* Models are optimized to satisfy visual prompts ("Make a dashboard") rather than functional specifications.
  2. *Token Economy:* Writing complete state machines, error boundaries, and skeleton loaders consumes significantly more tokens, which agents skip unless explicitly prompted.
- **Evidence & Source Mapping:**
  - *Source:* *VisualWebArena* (arXiv:2401.13649, REF-03) and *WebArena* (arXiv:2307.13854, REF-04).
  - *Evidence Level:* **Indirect Evidence**.
  - *What This Source Actually Establishes:* Evaluated autonomous web agents completing tasks in live web environments; proves that missing visual feedback, unhandled errors, and inert elements cause high task failure rates. It does not measure the rate at which code-generation agents generate dummy `onClick` handlers.
- **Frequency & Severity:** 
  - Frequency: **Not yet measured (Hypothesis)**.
  - Potential Impact: **Critical (Hypothesis)** (unusable in production).
- **Current Detection Methods:** Manual QA, Playwright end-to-end testing, static AST checks for empty handlers (heuristic only; complete testing requires requirement-based interaction tests).
- **Existing Solutions:** Form libraries (React Hook Form, Zod), state machines (XState).
- **Remaining Gaps:** Coding agents omit state machines unless forced by strict specification templates.
- **Potential UIForge Capability:** **Requirement Engine (Phase 07)** and **UX Engine (Phase 11)** requiring explicit state matrices (idle, loading, error, empty, success) for every interactive component, paired with requirement-based synthetic interaction testing.
- **Confidence Assessment:**
  - *Mechanism Confidence:* **High** (state machine presence or absence can be verified via AST and runtime interaction).
  - *Prevalence Confidence:* **Unmeasured** (frequency across prompt complexity levels to be measured in Phase 19).
- **Unresolved Research Question:** What is the minimal schema necessary to define component state behavior without bloating the agent prompt context?

---

### UIF-PROB-06: Responsive Failures & Viewport Breakpoints

- **Problem Description:** Desktop layouts break on mobile viewports:
  - Horizontal scrolling caused by fixed widths (`w-[600px]`) or unconstrained flex containers.
  - Text overflowing bounding boxes or overlapping floating elements.
  - Mobile hamburger menus that either do not open, cannot be closed, or fail to trap focus.
  - Touch targets smaller than 24x24px (failing WCAG 2.5.8).
- **Likely Root Causes:**
  1. *Desktop-Only Synthesis:* Agents generate code assuming a standard 1440px desktop screen. Responsive utility prefixes (`sm:`, `md:`, `lg:`) are added inconsistently or omit mobile padding.
  2. *Lack of Multi-Viewport Rendering Feedback:* The agent has no visibility into how the code renders at 375px (iPhone SE) or 768px (iPad).
- **Evidence & Source Mapping:**
  - *Source:* *SWE-bench Multimodal* (REF-05).
  - *Evidence Level:* **Contextual Evidence**.
  - *What This Source Actually Establishes:* Demonstrates that multimodal software engineering agents struggle to resolve visual and layout issues without direct visual feedback loops. It does not measure general responsive CSS overflow rates in AI-generated web apps.
- **Frequency & Severity:** 
  - Frequency: **Not yet measured (Hypothesis)**.
  - Potential Impact: **High (Hypothesis)** (>50% of real web traffic is mobile).
- **Current Detection Methods:** Playwright multi-viewport screenshot testing; Chrome DevTools Device Mode. (Note: `scrollWidth > clientWidth` detects basic overflow, but complete responsive verification requires testing routes, components, and content reflow across viewports).
- **Existing Solutions:** Responsive CSS frameworks (Tailwind, CSS Grid).
- **Remaining Gaps:** AI agents do not automatically test their generated code across multiple viewports before declaring the task done.
- **Potential UIForge Capability:** **Browser Automation (Phase 10/14)** testing three standard viewports (375px, 768px, 1440px), inspecting computed layout bounds, and evaluating interactive elements on mobile.
- **Confidence Assessment:**
  - *Mechanism Confidence:* **High** (DOM overflow and touch target dimensions are deterministically measurable).
  - *Prevalence Confidence:* **Unmeasured** (needs empirical measurement across mobile viewports).
- **Unresolved Research Question:** Can horizontal overflow be fixed autonomously via AST transforms without distorting nested table layouts?

---

### UIF-PROB-07: Cross-Page Design Inconsistency

- **Problem Description:** When an AI agent generates multiple pages for an application (e.g., Home, Settings, Billing, Dashboard), pages often exhibit inconsistent design choices:
  - Page A uses `indigo-600` for primary buttons; Page B uses `blue-500`.
  - Page A uses `rounded-lg`; Page B uses `rounded-full`.
  - Spacing between sections varies widely (`py-8` vs `py-24`).
- **Likely Root Causes:**
  1. *Context Window Statelessness:* Agents process each page in isolation or lose global context as token windows fill.
  2. *Lack of Centralized Design Token Abstraction:* Instead of consuming shared semantic tokens (`bg-primary`), the agent writes literal utility classes (`bg-blue-600`) per file.
- **Evidence & Source Mapping:**
  - *Source:* Qualitative user testing of multi-page AI application generation.
  - *Evidence Level:* **Hypothesis / Qualitative Observation**.
  - *What This Source Actually Establishes:* Multi-turn generation workflows frequently show visual token drift as conversation context grows; no formal benchmark currently evaluates multi-route aesthetic consistency.
- **Frequency & Severity:** 
  - Frequency: **Not yet measured (Hypothesis)**.
  - Potential Impact: **High (Hypothesis)** (destroys professional application feel).
- **Current Detection Methods:** Manual visual design audits; Design linting tools.
- **Existing Solutions:** Shared design system repositories, Figma tokens.
- **Remaining Gaps:** Agents lack a persistent, project-wide design token contract that is enforced across all file-writing sessions.
- **Potential UIForge Capability:** **Design System Engine (Phase 09)** and `@uiforge/contracts` storing design tokens in `.uiforge/design-tokens.json` and injecting them into the agent's context rules.
- **Confidence Assessment:**
  - *Mechanism Confidence:* **High** (token variance across files can be verified via AST analysis).
  - *Prevalence Confidence:* **Unmeasured** (drift rate across N routes requires controlled testing).
- **Unresolved Research Question:** How do we gracefully detect when a developer intentionally wants an atypical page (e.g., an unbranded marketing splash page)?

---

### UIF-PROB-08: Accessibility Failures (a11y)

- **Problem Description:** AI-generated code frequently omits essential accessibility markup:
  - Icon buttons missing `aria-label`.
  - Images missing `alt` attributes or containing useless `alt="image"`.
  - Non-semantic clickable elements (`<div onClick={...}>` instead of `<button>`).
  - Missing visible focus rings (`focus:outline-none` with no replacement focus state).
  - Modal dialogues that do not trap focus or dismiss on `Escape`.
- **Likely Root Causes:**
  1. *Visual-Only Bias in Training Data:* Web code frequently omits ARIA attributes for brevity; models mimic this minimal, inaccessible syntax.
  2. *Invisible Failure Mode:* An inaccessible button still looks visually acceptable in a screenshot. Because visual evaluation does not penalize missing accessibility, agents treat it as optional.
- **Evidence & Source Mapping:**
  - *Source:* WebAIM Million & Industry Accessibility Audits.
  - *Evidence Level:* **Contextual Evidence**.
  - *What This Source Actually Establishes:* Establishes widespread prevalence of missing ARIA attributes and inaccessible interactive elements across web pages globally. Specific failure rates in AI-generated code remain a hypothesis to be measured.
- **Frequency & Severity:** 
  - Frequency: **Not yet measured (Hypothesis)**.
  - Potential Impact: **Critical (Hypothesis)** (regulatory non-compliance, exclusion of disabled users).
- **Current Detection Methods:** `axe-core`, Google Lighthouse accessibility score, manual keyboard navigation testing, screen reader testing.
  > **Crucial Boundary:** Automated accessibility testing tools (like `axe-core`) detect a subset of potential WCAG criteria (such as contrast, missing labels, and duplicate IDs). An axe-clean page is **not** automatically fully WCAG 2.2 AA compliant. True compliance requires manual keyboard testing, semantic HTML review, and assistive-technology verification.
- **Existing Solutions:** Radix UI primitives, React Aria.
- **Remaining Gaps:** Agents regularly misconfigure or strip accessible primitives when assembling compound components.
- **Potential UIForge Capability:** **Accessibility Engine (Phase 11)** integrating `@axe-core/playwright` as an automated testing layer, supplemented by synthetic keyboard navigation scripts and semantic HTML linters.
- **Confidence Assessment:**
  - *Mechanism Confidence:* **High (Deterministic for Automated Rules)** (axe-core rule violations are programmatically reproducible).
  - *Prevalence Confidence:* **Unmeasured** (exact defect rates in AI outputs to be quantified in Phase 19).
- **Unresolved Research Question:** How can manual WCAG criteria (e.g., meaningful screen reader reading order) be approximated deterministically without human evaluators?

---

### UIF-PROB-09: Code Quality and Duplication

- **Problem Description:** AI-generated frontend code can degenerate into unmaintainable structures:
  - Large monolithic component files containing mixed data fetching, business logic, and JSX.
  - Copy-pasting identical utility functions or UI elements across multiple files.
  - Adding unnecessary third-party libraries when native platform APIs suffice.
  - Inconsistent state management (mixing prop drilling, redundant `useState`, and disparate global stores).
- **Likely Root Causes:**
  1. *Locality of Reference:* It is computationally easier for an LLM to inline all logic in one file than to reason across a modular directory structure (`hooks/`, `components/`, `utils/`).
  2. *Hallucinated Utility Libraries:* Models hallucinate helper functions or install heavy dependencies to solve trivial problems.
- **Evidence & Source Mapping:**
  - *Source:* Developer code reviews of AI-generated repositories.
  - *Evidence Level:* **Hypothesis / Qualitative Observation**.
  - *What This Source Actually Establishes:* Qualitative observations report high file length and duplication in AI outputs; cyclomatic complexity and line counts serve as useful signals alongside cohesion and architecture review, but do not alone prove unmaintainability.
- **Frequency & Severity:** 
  - Frequency: **Not yet measured (Hypothesis)**.
  - Potential Impact: **Medium-High (Hypothesis)** (creates technical debt, slows down subsequent agent turns).
- **Current Detection Methods:** ESLint, SonarQube, TypeScript compilation (`tsc`), AST metrics.
- **Existing Solutions:** Strict linter rules, architectural conventions.
- **Remaining Gaps:** AI coding agents frequently ignore linter warnings unless execution is halted by CI.
- **Potential UIForge Capability:** **Frontend Implementation Engine (Phase 13)** with architectural linters and strict component decomposition rules.
- **Confidence Assessment:**
  - *Mechanism Confidence:* **Medium-High** (AST parsing can measure duplication and component boundaries).
  - *Prevalence Confidence:* **Unmeasured** (requires empirical code-quality audits).
- **Unresolved Research Question:** What component size threshold (lines of code / cyclomatic complexity) optimizes both human maintainability and LLM context efficiency?

---

### UIF-PROB-10: Existing-Project Safety (Brownfield Regressions)

- **Problem Description:** When asked to make a minor visual or functional improvement to an existing codebase, AI agents can:
  - Rewrite entire files, deleting existing comments, business logic, or edge-case handling.
  - Overwrite the project's established styling conventions (e.g., replacing CSS Modules with Tailwind).
  - Break unrelated routes or components due to missing global state awareness.
  - Re-install conflicting versions of existing dependencies.
- **Likely Root Causes:**
  1. *Text-Based Editing Limitations:* Some coding-agent workflows rely heavily on text-based file editing and may lack sufficiently reliable project-wide structural understanding. UIForge investigates when AST-informed context and scoped patching materially reduce unintended changes.
  2. *Autonomous Write Overconfidence:* Agents with direct filesystem write access can apply changes before verifying that the build passes or that regression tests pass.
- **Evidence & Source Mapping:**
  - *Source:* Qualitative user feedback from developers using coding agents in production repositories.
  - *Evidence Level:* **Hypothesis / Ecosystem Observation**.
  - *What This Source Actually Establishes:* Fear of breaking working code is widely reported in developer discussions; regression frequency and diff scope have not been formally measured in frontend-specific benchmarks.
- **Frequency & Severity:** 
  - Frequency: **Not yet measured (Hypothesis)**.
  - Potential Impact: **Catastrophic (Hypothesis)** (downtime, lost work, broken deployments).
- **Current Detection Methods:** Git diff review, CI/CD automated test suites.
- **Existing Solutions:** Git version control, pull request reviews.
- **Remaining Gaps:** No frontend AI tool provides an integrated, local-first safety system combining read-only AST inspection, scoped diff review, and regression verification before applying changes.
- **Potential UIForge Capability:** **Safe Improvement Engine (Phase 06/15)**: A comprehensive safety system comprising:
  1. Read-only AST project inspection (reading source files statically without code execution).
  2. Framework and dependency detection.
  3. Narrowly scoped unified patch generation (`.patch`).
  4. Mandatory human approval gate before file modification.
  5. Automated regression testing and rollback capabilities.
  6. Sandboxed execution for build and browser evaluation.
- **Confidence Assessment:**
  - *Mechanism Confidence:* **High (Architectural Principle)** (enforcing read-only parsing and human-in-the-loop diff approval deterministically prevents unauthorized writes).
  - *Prevalence Confidence:* **Unmeasured** (regression rates in unassisted agent refactoring require empirical baseline measurement).
- **Unresolved Research Question:** How can complex AST transformations (e.g., refactoring state management) be previewed visually before modifying local files?

---

## 3. Summary Problem Prioritization Matrix

> **Note on Prioritization Coordinates:** Coordinates below represent the **researcher's subjective prioritization estimates of potential impact and qualitative likelihood**. They are not measured benchmark percentages. Exact statistical prevalence across industry models remains unmeasured pending controlled benchmarking in Phase 19.

```mermaid
quadrantChart
    title Hypothesized Defect Prioritization
    x-axis Lower Estimated Likelihood --> Higher Estimated Likelihood
    y-axis Low Potential Impact --> Critical Potential Impact
    quadrant-1 Highest Priority (Focus First)
    quadrant-2 High Risk
    quadrant-3 Lower Priority
    quadrant-4 Secondary Polish
    "UIF-PROB-05 UX Facades & States": [0.85, 0.90]
    "UIF-PROB-08 Accessibility Failures": [0.80, 0.88]
    "UIF-PROB-10 Existing-Project Safety": [0.55, 0.95]
    "UIF-PROB-01 Visual Homogenization": [0.75, 0.75]
    "UIF-PROB-02 Typography Inconsistency": [0.75, 0.70]
    "UIF-PROB-04 Color & Contrast": [0.70, 0.80]
    "UIF-PROB-06 Responsive Failures": [0.65, 0.75]
    "UIF-PROB-07 Cross-Page Inconsistency": [0.70, 0.70]
    "UIF-PROB-09 Code Quality & Duplication": [0.70, 0.65]
    "UIF-PROB-03 Layout Monotony": [0.80, 0.55]
```

### Strategic Takeaway for UIForge
The three highest-priority failure modes demanding immediate architectural enforcement are:
1. **UIF-PROB-10 (Existing-Project Safety)**: Non-destructive AST inspection, scoped diff review, and regression verification (table stakes for developer adoption).
2. **UIF-PROB-05 (UX Facades & State Completeness)**: Deterministic state machine specifications and requirement-based interaction tests.
3. **UIF-PROB-08 (Accessibility Compliance)**: Automated WCAG 2.2 AA testing via `axe-core`, supplemented by manual testing scripts.
