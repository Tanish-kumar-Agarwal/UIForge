# Category 10 — Accessibility Utilities & Automated Auditing

**Document ID:** `UIF-CAT-008`  
**Phase:** 02.1 — Open-Source Ecosystem Discovery & Intelligence  
**Category Focus:** Programmatic WCAG Rule Engines, Linters & Assistive Technology Standards  
**Date:** November 2026  

---

## 1. Category Overview

Accessibility (a11y) is a first-class engineering invariant for UIForge, not an optional post-hoc retrofit. AI coding agents routinely produce inaccessible markup because visual screenshots do not penalize missing accessible names, broken tab orders, or low contrast ratios.

This document audits the tools available for static analysis, browser-based evaluation, and manual testing guidance.

---

## 2. In-Depth Comparative Analysis

| Candidate ID | Project & URL | License | Type | Strengths & Capabilities | UIForge Role |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `OS-A11Y-01` | **axe-core** (`dequelabs/axe-core`) | MPL-2.0 | Engine | 90+ programmatic WCAG 2.0/2.1/2.2 rules; zero-hallucination DOM violation mapping. | **`[DEP]` Foundational Core Engine (P0)** |
| `OS-A11Y-02` | **@axe-core/playwright** (`dequelabs/axe-core-npm`) | MPL-2.0 | Adapter | Injects axe-core directly into headless Chromium during Playwright evaluation runs. | **`[DEP]` Headless A11y Runner (P0)** |
| `OS-A11Y-03` | **eslint-plugin-jsx-a11y** (`jsx-eslint/eslint-plugin-jsx-a11y`) | MIT | Linter | Static AST inspection catching static defects (missing `alt`, non-interactive `onClick`). | **`[DEP]` Static Pre-Flight Linter (P0)** |
| `OS-A11Y-04` | **jest-axe** (`nickcolley/jest-axe`) | MIT | Matcher | Custom matchers for Vitest/Jest unit tests (`expect(html).toHaveNoViolations()`). | `[DEP]` Unit Test Integration (P1) |
| `OS-A11Y-05` | **Pa11y** (`pa11y/pa11y`) | LGPL-3.0 | CLI | CLI accessibility testing wrapper. | **`[REJ]` Rejected (LGPL Copyleft Risk)** |
| `OS-A11Y-06` | **Google Lighthouse** (`GoogleChrome/lighthouse`) | Apache-2.0 | Engine | Holistic web audits (Performance, Accessibility, SEO). Useful for composite scores. | `[INF]` / `[REF]` Composite Auditor (P1) |
| `OS-A11Y-07` | **Accessibility Insights** (`microsoft/accessibility-insights-web`) | MIT | Extension | Microsoft guided manual testing workflows and visual tab-stop mapping overlays. | **`[REF]` Manual Testing Guide (P1)** |
| `OS-A11Y-08` | **W3C ARIA APG** (`w3c/aria-practices`) | W3C Doc | Normative | The definitive standard for keyboard navigation patterns and expected ARIA states. | **`[REF]` Normative Behavioral Spec (P0)** |

---

## 3. The Multi-Layer Accessibility Architecture

UIForge implements a **three-tier accessibility defense**:

```
┌────────────────────────────────────────────────────────┐
│  TIER 1: STATIC PRE-FLIGHT (During AST Parsing)        │
│  - Tool: eslint-plugin-jsx-a11y                        │
│  - Catches: Static missing alt, role="presentation",   │
│    missing button labels before rendering.             │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│  TIER 2: PROGRAMMATIC DOM AUDIT (In Headless Browser)  │
│  - Tool: @axe-core/playwright                          │
│  - Catches: Exact contrast ratios, duplicate IDs,      │
│    invalid computed ARIA states, color reflows.        │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│  TIER 3: SYNTHETIC INTERACTION & CHECKLISTS            │
│  - Tool: Playwright Tab Scripts + Manual Checklist     │
│  - Catches: Focus traps in modals, keyboard tab order, │
│    visible focus rings (:focus-visible).               │
└────────────────────────────────────────────────────────┘
```

---

## 4. Licensing Boundary Analysis (MPL-2.0)

Deque's `axe-core` and `@axe-core/playwright` are licensed under the **Mozilla Public License 2.0 (MPL-2.0)**.
- **Risk Assessment:** MPL-2.0 is a file-scoped weak copyleft license. It does **not** contaminate software that merely calls or imports it dynamically via npm.
- **Architectural Safeguard:** UIForge encapsulates axe-core entirely inside an internal adapter package (`@uiforge/a11y-engine`). UIForge does not modify axe-core source files directly. This completely preserves the permissive licensing (MIT/Apache-2.0) of UIForge Core.
