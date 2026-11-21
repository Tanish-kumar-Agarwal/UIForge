# UIForge Phase 02.2 — Workstream 4: Empirical Evidence & Experiment Audit Trail (Reconciled)

**Document Identifier:** `UIF-PH02-WS4-EVIDENCE-RECONCILED`  
**Parent Workstream:** Phase 02.2 WS-4: Browser Verification, Visual Quality & Automated Frontend Testing  
**Execution Date:** November 21, 2026  
**Environment:** Node.js v24.15.0 (Windows x64), V8 Engine  
**Runner Script:** `research/phase-02/phase-02.2-technical-audit/ws4-evidence/run_ws4_experiments.cjs`  
**Raw Results:** `research/phase-02/phase-02.2-technical-audit/ws4-evidence/ws4-execution-results.json`  

---

## 1. Executive Summary & Evidence Classification Realism

This document records the empirical results, simulation models, and verification audit trail for the eight experimental proofs (E1–E8) conducted during **Workstream 4**.

In strict adherence to UIForge's **Evidence Over Assumptions** standard, this report explicitly distinguishes between tests executed on local algorithmic engines and synthetic models simulating browser behavior. Because this research turn was executed in a clean environment without external npm packages installed (`@playwright/test`, `pixelmatch`, `axe-core`) and without pre-downloaded WebKit/Firefox binaries, no claim is made that actual browser engines were locally executed.

### Evidence Classification Key
- `[LOCAL-HARNESS-TESTED]`: Empirically executed and verified using real cryptographic or mathematical algorithms in the local Node.js environment.
- `[REPORTED-SIMULATION]`: Empirically executed against synthetic DOM geometry or image buffer models; acknowledges mock limitations.
- `[DOC-VERIFIED]` / `[SOURCE-VERIFIED]`: Confirmed by inspecting official technical specifications, vendor release notes, or repository source code.
- `[NOT-ESTABLISHED]`: Capabilities requiring external browser binaries or third-party engines not installed in this offline environment.
- `[PLANNED]`: Architectural features designed for future engine implementation.

---

## 2. Reconciled Experiment Records (E1 – E8)

### Experiment E1: Browser Automation Architecture & Protocol Evaluation
- **Classification:** `[DOC-VERIFIED]` & `[SOURCE-VERIFIED]` (Protocol Analysis)
- **Objective:** Evaluate protocol latency, browser coverage, network interception, and isolation models across Playwright Dispatcher, Puppeteer CDP, and WebDriver BiDi.
- **Audited Baselines (November 2026):**
  - **Playwright:** Pinned to **`v1.65.1`** (released Nov 13, 2026). Playwright removed `page.accessibility.snapshot()` after three years of deprecation, introducing `page.ariaSnapshot()` for ARIA tree assertions. HAR recording is a distinct capability initiated via `tracing.startHar()` (introduced in `v1.60`). WebKit automation runs a derived open-source engine, not branded Apple Safari.
  - **Puppeteer:** Pinned to **`v24.2.0`**. Excellent for Chromium CDP, but Firefox BiDi remains experimental and WebKit is not maintained.
  - **WebDriver BiDi:** W3C Standard Specification Level 1 in active progress; vendor implementations lack unified tracing and deep accessibility inspection.
- **Finding:** Playwright Dispatcher represents the optimal multi-browser architecture, but claims of 15–30ms context startup are unverified benchmarks that vary significantly by OS, hardware, and warm-up state.

### Experiment E2: Visual Comparison Algorithm & Dynamic Masking Simulation
- **Classification:** `[REPORTED-SIMULATION]` (Synthetic Buffer Math)
- **Objective:** Evaluate per-pixel perceptual difference detection and dynamic region masking using a synthetic 100×100 RGBA image buffer (10,000 pixels).
- **Tool Context:** Pixelmatch is currently at **`v8.0.0`**, utilizing OKLab and HyAB perceptual color distances (replacing legacy YIQ) with native `ignoreMask` and `windowSize` features.
- **Simulation Procedure:**
  - `Buffer A`: Solid white baseline.
  - `Buffer B`: Introduced 400px true defect (red square at 10,10) + 200px dynamic timestamp noise (gray at 70,10).
  - Evaluated per-pixel color delta thresholding (`threshold = 0.1` per pixel, not a total image diff percentage).
- **Outcome:**
  - Unmasked diff: 600 differing pixels.
  - Applying bounding box mask `[x: 70..90, y: 10..20]` eliminated the dynamic noise, isolating exactly **400 differing pixels**.
- **Limitation:** Validates masking arithmetic on raw buffers; does not establish production Pixelmatch v8 package performance.

### Experiment E3: Responsive Layout Geometry & Multi-Point Occlusion Simulation
- **Classification:** `[REPORTED-SIMULATION]` (Synthetic DOM Geometry)
- **Objective:** Formulate layout anomaly detection that avoids simplistic single-element overflow formulas and accounts for WCAG 2.2 SC 2.5.8 exceptions.
- **Refined Algorithm Rules:**
  1. **Document-Level Overflow:** Asserts `document.documentElement.scrollWidth > window.innerWidth`, avoiding false positives on internal scroll containers (`overflow-x: auto`).
  2. **Viewport Boundary Breaches:** Flags elements with `rect.right > window.innerWidth` or `rect.left < 0`.
  3. **Multi-Point Occlusion:** Evaluates 5 points (4 corners + center) against overlapping z-index layers.
  4. **WCAG 2.2 SC 2.5.8 Touch Target Evaluation:** Evaluates candidate findings (< 24×24px) against the spacing exception (target size + margin >= 24px diameter). Flags results as candidate findings requiring review, not automatic violations.
- **Outcome:** Correctly caught 4 distinct geometry findings in the synthetic DOM tree.

### Experiment E4: Accessibility Contrast Calculation & Rule Scope Matrix
- **Classification:** `[LOCAL-HARNESS-TESTED]` (Contrast Math) & `[DOC-VERIFIED]` (WCAG Matrix)
- **Objective:** Evaluate relative luminance contrast math; audit the boundary between automated rule checking and manual accessibility testing.
- **Harness Outcomes:**
  - Slate on white (`#1e293b` on `#ffffff`): **14.63:1** (PASS AA Normal Text, requires 4.5:1).
  - Defective gray on white (`#9ca3af` on `#ffffff`): **2.54:1** (FAIL AA Normal Text, requires 4.5:1).
  - Active UI component border (`#94a3b8` on `#ffffff`): **2.56:1** (FAIL SC 1.4.11 Non-Text Contrast, requires 3.0:1).
- **WCAG 2.2 Scope Demarcation (Clarification of Deque Data):**
  - Deque reports that `axe-core` catches approximately **57% of digital accessibility issues** in typical production samples. This reflects **issue frequency in the wild**, NOT the percentage of WCAG 2.2 criteria that are automatable.
  - Across the **55 Level A and AA Success Criteria**:
    - **12 criteria (~22%)** are fully checkable statically (e.g. missing alt text, duplicate IDs, invalid roles).
    - **23 criteria (~42%)** are partially automatable (e.g. contrast, focusability, target size).
    - **20 criteria (~36%)** strictly require human cognitive or assistive-technology evaluation (e.g. reading order, info & relationships, error prevention).

### Experiment E5: Functional Interaction State Machine Simulation
- **Classification:** `[REPORTED-SIMULATION]` (Synthetic Dialog FSM)
- **Objective:** Verify state transitions, focus management, and inertness for an accessible modal dialog.
- **Outcome:** Model transitioned from `CLOSED` (focus on trigger) ➔ `OPEN` (focus on first input, background inert) ➔ `CLOSED` on Escape key (focus restored to trigger, inert cleared).
- **Limitation:** Evaluated in a pure Node.js state machine; live browser DOM event dispatch and focus trapping requires browser execution.

### Experiment E6: Cross-Browser Rendering Variance Analysis
- **Classification:** `[DOC-VERIFIED]` (Published Engine Documentation)
- **Objective:** Audit rendering discrepancies between Blink (Chromium), Gecko (Firefox), and WebKit.
- **Findings:**
  - Font rasterization differences (DirectWrite vs CoreText vs FreeType) produce 0.2–0.5px line-height and kerning variances.
  - Small 0.3px shifts are **not always harmless**: in constrained flex containers, fractional expansion can trigger unintended line wrapping or button truncation.
  - **Invariant:** Cross-browser visual diffing is invalid. Visual regression must always compare a pull request build against the **same browser engine baseline**.

### Experiment E7: Verification Evidence Schema & SHA-256 Digest Verification
- **Classification:** `[LOCAL-HARNESS-TESTED]` (Real Crypto Calculation & Tamper Test)
- **Objective:** Verify canonical serialization, cryptographic hashing, and tamper detection.
- **Terminology Reconciled:** The SHA-256 hash is correctly identified as a **`recordDigest` (cryptographic digest)**, not a digital signature. (A signature requires a private signing key).
- **Outcome:**
  - Valid canonical digest generated: `sha256-1e3f2afd...`.
  - Mutated payload (`status: "PASS"`) yielded `sha256-37cf5fd4...`.
  - `tamperDetectedSuccessfully: true`.

### Experiment E8: Actionable AI Remediation Envelope Simulation
- **Classification:** `[REPORTED-SIMULATION]` (Diagnostic Envelope Generation)
- **Objective:** Validate that structured diagnostic records emit actionable payloads for AI coding agents.
- **Outcome:** Emitted structured envelope linking diagnostic code `UIF-A11Y-CONTRAST-001` to `components/dashboard/kpi-card.tsx:line 24`.
- **Limitation:** DOM-to-TSX file mapping is acknowledged as heuristic unless backed by explicit `data-slot` annotations, AST source maps, or component boundary metadata.

---

## 3. Boundaries & Missing Evidence

1. **Live Multi-Browser Execution (`[NOT-ESTABLISHED]` in local environment):**  
   Due to the isolated developer sandbox without external package installations or pre-downloaded WebKit/Firefox binaries, real browser automation was not executed in this turn.
2. **Screen Reader Semantic Verification (`[PLANNED]` / Human Audit Required):**  
   Synthetic ARIA tree snapshots (`ariaSnapshot()`) verify accessible role and name trees, but cannot simulate real-time VoiceOver, NVDA, or JAWS pronunciation quirks, audio timing, or rotor navigation.
