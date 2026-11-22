# ADR-007: Independent Frontend Evaluation & Verification Architecture
## Multi-Viewport Headless Execution, Pixelmatch Diffing, axe-core WCAG Auditing & Evidence Envelopes

**Status:** Accepted  
**Date:** 2026-11-22  
**Decision Driver:** Developer Tools Architect & Principal Software Architect  

---

## 1. Context & Problem Statement
AI coding agents and modern frontend development frameworks lack independent verification. Tools declare code "ready" merely because a prompt completed or TypeScript compiled, ignoring:
1. Rendered visual breaks (text overlapping, broken flexbox wrapping, missing images).
2. Accessibility violations (inaccessible color contrast, missing form labels, broken keyboard traps).
3. Runtime JavaScript console exceptions and failed network asset requests.

UIForge requires an independent, automated verification architecture that executes in real browser environments and produces reproducible evidence without requiring expensive third-party cloud services.

---

## 2. Decision Constraints
1. **Real Headless Browser Execution:** Must execute against real browser rendering engines (Chromium/WebKit via Playwright v1.50+ `OS-BROW-01`), not simulated DOMs (JSDOM).
2. **Deterministic Visual Diffing:** Must compute pixel differences locally using a pure-JavaScript engine (`pixelmatch` `OS-VREG-01`) without native C++ compilation dependencies.
3. **Automated Accessibility Compliance:** Must evaluate WCAG 2.2 AA rules via `@axe-core/playwright` (`OS-A11Y-02`), respecting MPL-2.0 notice obligations.
4. **Evidence Over Opaque Scores:** Must output structured, explainable test assertions rather than a single opaque quality score.

---

## 3. Options Considered
- **Option 1: Simulated In-Memory DOM Testing (JSDOM / Happy-DOM):** Run component tests in Node.js without a real browser.
- **Option 2: Cloud Visual SaaS Providers (Percy, Chromatic, Applitools):** Offload screenshot capture and visual diffing to hosted cloud services.
- **Option 3: Local-First Headless Browser Runner (Playwright + Pixelmatch + axe-core):** Execute locally inside headless Playwright Chromium instances; diff in memory; audit via axe-core.

---

## 4. Evaluation of Options

| Criteria | Option 1: JSDOM | Option 2: Cloud SaaS | Option 3: Local Playwright + Pixelmatch |
| :--- | :--- | :--- | :--- |
| **Visual Layout Accuracy** | 0% (No real layout or CSS) | 100% | 100% (Real Chromium/WebKit render) |
| **Offline / CI Capability** | 100% Offline | Fails without internet / API key | 100% Local / Self-contained |
| **Cost & Latency** | Instant | High SaaS bills; high latency | Zero cost; fast local execution |
| **Accessibility Realism** | Limited DOM checks only | Basic visual checks | Real computed styles & ARIA tree |

---

## 5. Decision Outcome
**Selected Option:** **Option 3: Local-First Headless Browser Runner (Playwright + Pixelmatch + axe-core).**

### Architectural Specification:
1. **Headless Browser Runner (`@uiforge/browser-eval`):**
   - Managed via Microsoft Playwright (`OS-BROW-01`, Apache-2.0, Tier 0 Core Foundation).
   - Evaluates target pages across configured viewports (Mobile: 375px, Tablet: 768px, Desktop: 1280px, Wide: 1920px).
   - Enforces deterministic render flags: `--font-render-hinting=none`, fixed device pixel ratio, and web font stabilization checks.
2. **Visual Diffing Engine:**
   - Powered by Mapbox Pixelmatch (`OS-VREG-01`, ISC, Tier 0 Core Foundation).
   - Compares current render against golden baseline PNGs in `.uiforge/evaluations/screenshots/`.
   - Computes exact pixel delta counts, mismatch percentages, and highlighted visual diff images.
3. **Accessibility Auditing Engine:**
   - Injects `@axe-core/playwright` (`OS-A11Y-02`, MPL-2.0, Tier 0 Core Foundation).
   - Maps violations to authoritative WCAG 2.2 criteria (contrast, labels, landmarks, focus).
   - Preserves MPL-2.0 notice compliance; restricted strictly to `devDependencies` test harnesses.
4. **Independent Evidence Envelopes:**
   - Results are packaged into a structured `BrowserEvaluationRecord` containing screenshot SHA-256 digests, axe violation arrays, and console error logs.
   - Evaluates project quality policies (`maxCriticalA11y: 0`, `maxPixelMismatch: 0.05%`).

---

## 6. Consequences & Impact
- **Positive:**
  - True visual and accessibility verification without third-party SaaS dependencies or subscription fees.
  - Can run in local developer terminals and headless CI/CD pipelines (GitHub Actions).
  - Provides objective, evidence-backed feedback loops to AI coding agents over MCP.
- **Negative:**
  - Requires Playwright browser binaries to be installed locally (`playwright install chromium`).

---

## 7. Security & Operational Impact
- Playwright instances run in sandboxed processes with `file://` scheme access blocked to prevent local file exfiltration.

---

## 8. Research References
- Phase 02.2: `WS4-BROWSER-VERIFICATION.md`.
- Phase 02.5: `CORE-FOUNDATION-SHORTLIST.md` (`OS-BROW-01`, `OS-VREG-01`, `OS-A11Y-02`).
- Phase 02.5: Finding C37 (`@axe-core/playwright` MPL-2.0 licensing reconciliation).

---

## 9. Open Questions
- None. Evaluation architecture is locked and frozen.
