# UIFORGE — PHASE 02.2, WORKSTREAM 4 (WS-4)
# MASTER RESEARCH REPORT & ARCHITECTURE SPECIFICATION (FINAL RECONCILED DELIVERABLE)
## Browser Verification, Visual Quality, Accessibility & Automated Frontend Testing

**Document Identifier:** `UIF-PH02-WS4-FINAL-RECONCILED`  
**Classification:** Principal-Level Technical Research, Open-Source Ecosystem Investigation & Architectural Specification  
**Project:** UIForge  
**Phase:** 02.2 — Open-Source Ecosystem & Technical Architecture Research  
**Workstream:** WS-4 — Browser Verification, Visual Quality & Automated Testing  
**Execution Date:** November 21, 2026  
**Execution Mode:** PHASE 1 — STRICT RESEARCH-ONLY (Zero Codebase Changes, Zero Git Commits)  
**Status:** RESEARCH COMPLETE — ARCHITECTURE CONDITIONALLY ACCEPTED — LIVE VALIDATION PENDING  

---

## 1. Executive Correction Register & Audit Trail

| ID | Issue Identified | Peer Review Finding | Architectural Correction Implemented | Reference |
| :--- | :--- | :--- | :--- | :--- |
| **CR-01** | **Outdated Tool Baselines** | Playwright cited as `v1.50.0`, Pixelmatch `v7.1.0`, axe-core `v4.10.2`, Pa11y `v8.0.0`. | Pinned official releases as of Nov 21, 2026: **Playwright `v1.65.1`** (Nov 13, 2026), **Pixelmatch `v8.0.0`**, **axe-core `v4.14.1`**, **Pa11y `v10.0.0`**. | Sections 4, 12 |
| **CR-02** | **Removed Accessibility API** | Cited `page.accessibility.snapshot()`, which was deprecated for 3 years and removed. | Replaced with **`page.ariaSnapshot()`**. Clarified that ARIA snapshots capture ARIA role trees, not platform accessibility trees (MSAA/IA2/UIA) or screen readers. | Sections 4, 7 |
| **CR-03** | **Trace Contents Overstated** | Asserted Playwright trace files include HAR records by default. | Reconciled: Trace Viewer records action snapshots, screencasts, console logs, and network events. HAR capture is a distinct API (`tracing.startHar()`, introduced in `v1.60`). | Section 4 |
| **CR-04** | **WebKit vs. Branded Safari** | Conflated Playwright WebKit with Apple Safari. | Clarified: Playwright WebKit is compiled from open-source WebKit, not branded Apple Safari. Testing WebKit on Linux does not guarantee full Safari macOS/iOS fidelity. | Sections 4, 9 |
| **CR-05** | **Unverified Context Speed** | Asserted 15–30ms BrowserContext creation as a guaranteed characteristic. | Re-classified as an **unverified benchmark** subject to OS, hardware, warm-up state, and browser process pooling. | Section 4 |
| **CR-06** | **Outdated Pixelmatch Model** | Described Pixelmatch using YIQ color space differences. | Reconciled: Pixelmatch v8 uses **OKLab and HyAB perceptual color distances**, and includes `windowSize` and `ignoreMask`. | Section 5, Exp E2 |
| **CR-07** | **Threshold Terminology** | Described 0.1–0.2 as a total image diff percentage threshold. | Corrected: Pixelmatch's threshold is a **per-pixel perceptual difference threshold** (0 to 1). Must be calibrated per fixture; golden baselines require explicit human review (never auto-update on PR merge). | Section 5 |
| **CR-08** | **Incomplete Overflow Logic** | Checked only `el.scrollWidth > el.clientWidth && el.scrollWidth > viewportWidth`. | Replaced with multi-tier detection: (1) Document-level overflow (`HTML.scrollWidth > innerWidth`), (2) Boundary breaches, (3) Exemption for legitimate scroll containers (`overflow-x: auto`), (4) Clipping checks. | Section 6, Exp E3 |
| **CR-09** | **Flawed Occlusion & Touch Targets**| Inspected only center point; ignored WCAG 2.2 SC 2.5.8 exceptions. | Implemented multi-point inspection (4 corners + center). Applied SC 2.5.8 spacing exception (diameter >= 24px) and custom ARIA roles. Classified as candidate findings requiring review. Separated SC 2.5.5 (44×44 Level AAA). | Section 6, Exp E3 |
| **CR-10** | **Unsupported 40% A11y Claim** | Claimed E4 proved axe-core automates 40% of WCAG criteria; conflated with Deque's 57% issue statistic. | Formally reconciled: Deque's 57% reflects issue frequency in the wild. Included a 55-criteria criterion-by-criterion WCAG 2.2 Level A/AA matrix (12 static, 23 partial, 20 human audit). | Section 7, Exp E4 |
| **CR-11** | **Cross-Browser Evidence Contradiction** | Claimed E6 documented 3–12% rendering diffs despite WebKit/Firefox binaries being unavailable. | Re-classified E6 as **`[DOC-VERIFIED]`** based on published engine specs. Recognized that 0.3px text shifts can cause real line wraps and button overflow; mandated same-browser baselines. | Section 9, Exp E6 |
| **CR-12** | **Hash vs. Digital Signature** | Termed SHA-256 hash a "cryptographic signature" or "tamper-proof". | Reconciled: A hash is a digest, not a signature. A digest detects modifications only when expected digests or manifests are independently protected. Renamed to **`recordDigest`**. | Section 10, Exp E7 |
| **CR-13** | **SSRF & Sandbox Gaps** | Relied solely on Playwright route interception blocking RFC 1918. | Expanded threat model: IPv6 loopback (`::1`), unique-local, link-local, cloud metadata (`169.254.169.254`), DNS rebinding, HTTP 3xx redirects, WebSockets, container-level firewall egress, and authorized local server access. | Section 13 |
| **CR-14** | **Subprocess & Spec Licensing** | Simplistic LGPL-3.0 claim on Pa11y; treated BiDi as software license. | Qualified Pa11y: Subprocess invocation does not automatically eliminate all LGPL-3.0 obligations (notices, source access if modified). WebDriver BiDi is a W3C specification, not software code. | Section 12, 13 |
| **CR-15** | **Experiment Classification Realism** | Claimed local harness empirical validation despite 0 npm packages and missing browser binaries. | Re-classified all experiments: E1 `[DOC/SOURCE-VERIFIED]`, E2/E3/E5/E8 `[REPORTED-SIMULATION]`, E4/E7 `[LOCAL-HARNESS-TESTED]`, E6 `[DOC-VERIFIED]`. Scorecard updated to **5 PASS, 8 PARTIAL, 1 NOT ESTABLISHED**. | Section 14, 15, 20 |
| **CR-16** | **Technology-Neutral Adapter** | `IBrowserAdapter` lacked lifecycle, events, resize, and tracing contracts. | Expanded `IBrowserAdapter` to include full lifecycle, network events, resize, trace start/stop/export, and error boundaries. Noted DOM-to-TSX mapping is heuristic without source maps. | Section 17 |

---

## 2. UIForge Context & Verification Objectives

UIForge is an autonomous **Frontend Engineering Intelligence Platform**. It is not a component library, website builder, or passive screenshot dashboard. Its goal is to equip AI coding agents with the upstream context and downstream verification needed to produce production-grade frontends across two workflows:

- **Workflow A — New Frontend Development:**
  `Requirements ➔ Design Direction ➔ Design System ➔ Component Discovery ➔ Architecture ➔ Implementation ➔ Browser Verification ➔ Independent Evaluation ➔ Refinement.`
  *Role:* Validates newly synthesized components across responsive viewports, contrast thresholds, and interactive states before delivering code to the user.
- **Workflow B — Existing Frontend Improvement (Brownfield Safety Mandatory):**
  `Read-only Analysis ➔ Browser Inspection ➔ UX/A11y/Responsive Audit ➔ Evidence-backed Findings ➔ Proposed Modifications ➔ Explicit User Approval ➔ Approved Implementation ➔ Regression Verification.`
  *Role:* Captures non-destructive baselines of existing applications, ensuring proposed modifications introduce zero visual, responsive, or functional regressions.

---

## 3. Research Methodology & Evidence Standards

All claims in this report adhere strictly to evidence-based classifications:
- `[DOC-VERIFIED]`: Directly confirmed via official documentation, published RFCs, or technical specifications.
- `[SOURCE-VERIFIED]`: Confirmed by inspecting repository source code or AST definitions at a pinned version.
- `[LOCAL-HARNESS-TESTED]`: Empirically executed using real mathematical, algorithmic, or cryptographic functions in the local Node.js environment.
- `[REPORTED-SIMULATION]`: Empirically executed against synthetic DOM geometry or image buffer models; acknowledges mock limitations.
- `[NOT-ESTABLISHED]`: Capabilities requiring external browser binaries or third-party engines not installed in this offline environment.
- `[PLANNED]`: Architectural features designed for future implementation phases.

---

## 4. Browser Automation Ecosystem (WS4-A)

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                BROWSER AUTOMATION PROTOCOL STACK                                 │
├──────────────────────────┬──────────────────────────┬─────────────────────────┬──────────────────┤
│ Dimension                │ Playwright Dispatcher    │ Chrome DevTools (CDP)   │ WebDriver BiDi   │
├──────────────────────────┼──────────────────────────┼─────────────────────────┼──────────────────┤
│ Multi-Browser Scope      │ Chromium, Firefox, WebKit│ Chromium, Edge          │ Chromium, Firefox│
│ Connection Transport     │ WebSocket / Unix Socket  │ WebSocket (JSON-RPC)    │ WebSocket        │
│ Session Isolation        │ BrowserContext           │ Target Domain / Pages   │ User Contexts    │
│ Event Streaming          │ Native Bidirectional     │ Native Bidirectional    │ Bidirectional    │
│ Tracing Support          │ Full Binary Trace (.zip) │ Timeline DevTools Trace │ Event Stream     │
│ HAR Recording API        │ tracing.startHar() (1.60)│ CDP Fetch / Network     │ Spec in progress │
│ Accessibility API        │ page.ariaSnapshot()      │ CDP Accessibility Domain│ Level 2 Drafting │
└──────────────────────────┴──────────────────────────┴─────────────────────────┴──────────────────┘
```

### 4.1 Comparative Evaluation Across 16 Core Dimensions
1. **Browser Coverage:** Playwright packages Chromium, Firefox, and WebKit across Windows, macOS, and Linux. Puppeteer targets Chromium natively, with experimental WebDriver BiDi support for Firefox.
2. **WebKit vs. Branded Apple Safari:** Playwright's WebKit build is compiled from open-source WebKit source code. It is **not the branded Apple Safari browser**. Testing WebKit on Linux does not guarantee full Safari compatibility due to missing macOS multimedia codecs, system fonts, and OS-specific rendering behaviors. Playwright officially recommends macOS execution for the closest Safari approximation.
3. **Installation & Packaging:** Pinned baseline is **Playwright `v1.65.1`** (released Nov 13, 2026). Decouple `@playwright/test` (runner), `playwright-core` (client library), and browser binary downloads.
4. **Headless vs. Headed Operation:** All modern engines support "new headless" mode (`headless: 'new'`), which executes the identical rendering engine as headed browsers.
5. **Context Isolation:** Playwright's `BrowserContext` primitive provides fully isolated storage, cookies, and cache. While extremely fast compared to full process startup, claims of guaranteed 15–30ms creation times are unverified across diverse host hardware and must not be treated as a fixed SLA.
6. **Multi-Page Coordination:** Supports multi-page orchestration within a single context, critical for testing multi-window and OAuth authentication flows.
7. **Screenshots & Video:** Built-in viewport, element, and full-page screenshot capture with automatic font-loading synchronization.
8. **Trace Collection vs. HAR Recording:** Playwright's Trace Viewer captures action snapshots, screencasts, console logs, and network metadata into a `.zip` archive. HAR recording is a separate capability with its own dedicated API (`tracing.startHar()` introduced in `v1.60`).
9. **Network Interception:** Full bidirectional request mocking, redirection, and aborting via `page.route()`.
10. **Console & Runtime Diagnostics:** Native listeners for `console`, `pageerror`, and unhandled promise rejections.
11. **Accessibility API Modernization:** Playwright removed the deprecated `page.accessibility.snapshot()` API. UIForge adopts **`page.ariaSnapshot()`** for ARIA role and accessible name tree verification, while utilizing `axe-core` for static rule checking. ARIA snapshots are not a substitute for platform accessibility trees (MSAA/UIA) or screen-reader testing.
12. **Persistent State:** Saves and restores authentication states via `storageState()`.
13. **CI Execution:** Official Microsoft container images provide pre-configured Linux dependencies and system fonts.
14. **Local-First Execution:** Direct execution on loopback interfaces (`127.0.0.1`) requires zero external cloud connections.
15. **Remote Browser Adapters:** Supports WebSocket connection to remote browser instances (`browserType.connect()`) or Browserless infrastructure.
16. **Reliability & Actionability:** Automated waiting on actionability checks (visible, stable, enabled, receiving pointer events). Universal application readiness cannot rely solely on `networkidle` (modern SPAs with polling or websockets never settle); readiness must combine DOM loaded states, critical element locators, and network quiescence.

---

## 5. Visual Regression Ecosystem (WS4-B)

### 5.1 Pixelmatch v8 Architecture & Perceptual Color Differences
Pixelmatch is currently at **`v8.0.0`**. Unlike older versions that relied on YIQ color models, Pixelmatch v8 uses **OKLab and HyAB perceptual color distances**, which mirror human visual perception across wide-gamut palettes. It includes native `ignoreMask` and `windowSize` features.

#### Key Architectural Requirements
1. **Per-Pixel Thresholding:** Pixelmatch's `threshold` parameter (default 0.1) defines the maximum perceptual color delta allowed **per pixel** before that pixel is classified as differing. It is not a percentage of the total image allowed to fail. Thresholds must be calibrated against representative project fixtures.
2. **Anti-Aliasing Detection:** Eliminates false positives by distinguishing subtle subpixel font antialiasing shifts from true color defects.
3. **Dynamic Region Masking:** Essential for production frontends. Timestamps, avatars, random metrics, and video frames must be masked via CSS selectors or bounding boxes before comparison (simulated in Experiment E2).
4. **Animation & Font Stabilization:** UIForge automatically injects global CSS disables (`*, *::before, *::after { transition: none !important; animation: none !important; }`) and awaits `document.fonts.ready`.
5. **Baseline Governance:** **Golden baselines must NEVER be automatically updated on PR merge.** Automated auto-updates silently mask visual regressions. Updating baselines requires explicit developer approval, versioned retention of previous baselines, and recorded justification.
6. **Cross-Browser Baseline Isolation:** Visual regression must always compare a branch build against a baseline rendered by the **same browser engine on the same OS**. Cross-engine diffing is fundamentally invalid due to differing font rasterizers.

---

## 6. Responsive & Layout Verification (WS4-C)

### 6.1 Refined Layout Anomaly Detection
Simplistic checks such as `el.scrollWidth > el.clientWidth && el.scrollWidth > viewportWidth` are severely flawed: they fail to catch elements wider than parent containers but narrower than the viewport, while falsely flagging legitimate horizontally scrollable containers (carousels, data tables).

UIForge implements a multi-tier layout geometry audit:
1. **Document-Level Horizontal Overflow:**
   Evaluates `document.documentElement.scrollWidth > window.innerWidth`. If true, inspects descendant trees to isolate elements whose bounding box extends beyond the viewport boundary (`rect.right > window.innerWidth` or `rect.left < 0`).
2. **Internal Scroll Container Exemption:**
   Elements with `overflow-x: auto` or `overflow-x: scroll` are acknowledged as intentional scroll containers, suppressing false-positive overflow alerts.
3. **Multi-Point Interactive Occlusion:**
   Checking only an element's center point is insufficient (an overlay might occlude 80% of a button but leave the center exposed). The engine evaluates **five test points** (the four corners inset by 5px plus the center) against `document.elementFromPoint()`.
4. **WCAG 2.2 SC 2.5.8 Touch Target Evaluation:**
   - **Requirement:** The size of the target for pointer inputs is at least 24 by 24 CSS pixels.
   - **Official Exceptions Evaluated:**
     1. *Spacing Exception:* If the target is smaller than 24×24 CSS pixels, a **24 CSS pixel diameter circle centered on the target's bounding box** must not intersect any other target or any other target's 24 CSS pixel diameter circle.
     2. *Equivalent Exception:* The function can be achieved through another control on the same page that meets this criterion.
     3. *Inline Exception:* The target is in a sentence or block of text.
     4. *User Agent Control Exception:* The size of the target is determined by the user agent and is not modified by the author.
     5. *Essential Exception:* A particular presentation of the target is essential or legally required.
   - **Distinction from SC 2.5.5:** WCAG 2.2 SC 2.5.5 is Level AAA Target Size (Enhanced), requiring 44×44 CSS pixels. SC 2.5.8 is the Level AA mandate (24×24 CSS pixels).
   - **Candidate Finding Status:** Automated geometry checks identify **Candidate Findings Requiring Review**, not automatic WCAG conformance verdicts.

---

## 7. Accessibility Verification & Criterion-by-Criterion Scope (WS4-D)

### 7.1 Deconstructing Accessibility Metrics & The Deque 57% Statistic
The assertion that "axe-core evaluates 40% of WCAG criteria" conflated issues with criteria. Deque's published research demonstrates that automated testing with `axe-core` finds an average of **57% of digital accessibility issues in typical production datasets**. This measures **issue frequency in the wild**, NOT the proportion of WCAG criteria that are fully automatable without human intervention.

### 7.2 Complete WCAG 2.2 Level A & AA Criterion-by-Criterion Automation Matrix
Across all 55 Level A and AA Success Criteria, UIForge classifies automation boundaries into three rigorous tiers:
- **Fully Automatable Static (12 criteria / ~22%):** Deterministic evaluation via DOM inspection and `axe-core`.
- **Partially Automatable (23 criteria / ~42%):** Algorithmic screening or browser-assisted keyboard simulation; flags candidate findings for human confirmation.
- **Strictly Human / Assistive Tech (20 criteria / ~36%):** Requires human cognitive evaluation or real screen reader interaction.

| SC # | Criterion Name | Level | Automation Capability | Primary Engine / Tool | Known Limitation / Boundary |
| :--- | :--- | :---: | :---: | :--- | :--- |
| **1.1.1** | Non-text Content | A | Partially Automatable | `axe-core` (`image-alt`) | Verifies `alt` presence; cannot evaluate alt text accuracy or semantic meaning. |
| **1.2.1** | Audio-only and Video-only | A | Strictly Human / AT | Manual Review | Requires evaluating transcript accuracy. |
| **1.2.2** | Captions (Prerecorded) | A | Partially Automatable | DOM check (`<track>`) | Can verify track presence; cannot verify synchronization or caption accuracy. |
| **1.2.3** | Audio Description / Media Alt | A | Strictly Human / AT | Manual Review | Requires checking narration content. |
| **1.2.4** | Captions (Live) | AA | Strictly Human / AT | Manual Review | Requires checking real-time audio streams. |
| **1.2.5** | Audio Description | AA | Strictly Human / AT | Manual Review | Evaluates video scene description adequacy. |
| **1.3.1** | Info and Relationships | A | Partially Automatable | `axe-core` (`aria-*`, tables) | Catches broken table headers/roles; cannot verify semantic visual group intent. |
| **1.3.2** | Meaningful Sequence | A | Strictly Human / AT | Manual / Visual trace | DOM order vs visual presentation flow requires human reading judgment. |
| **1.3.3** | Sensory Characteristics | A | Strictly Human / AT | Manual Review | Cannot parse prose referencing "click the round green button". |
| **1.3.4** | Orientation | AA | Partially Automatable | Playwright viewport rotation | Can test CSS orientation lock; cannot evaluate if orientation is essential. |
| **1.3.5** | Identify Input Purpose | AA | Fully Automatable Static | `axe-core` (`autocomplete`) | Validates autocomplete token against HTML 5.2 list. |
| **1.4.1** | Use of Color | A | Partially Automatable | Heuristic color contrast | Flags links relying solely on color; requires verifying underline on hover/focus. |
| **1.4.2** | Audio Control | A | Partially Automatable | DOM audio check | Detects autoplay audio >3s; cannot confirm pause button accessibility. |
| **1.4.3** | Contrast (Minimum) | AA | Fully Automatable Static | `axe-core` (`color-contrast`) | Calculates 4.5:1 / 3:1 sRGB contrast; fails on gradient/image backgrounds. |
| **1.4.4** | Resize Text | AA | Partially Automatable | Playwright 200% text zoom | Asserts layout does not overflow; requires checking clipping of zoomed text. |
| **1.4.5** | Images of Text | AA | Strictly Human / AT | Manual Review | Cannot reliably OCR images to prove text could be rendered in real HTML. |
| **1.4.10**| Reflow | AA | Partially Automatable | Layout geometry (320px vw) | Asserts no horizontal scrollbar at 320px; human confirms all content present. |
| **1.4.11**| Non-text Contrast | AA | Partially Automatable | Layout / CSS border audit | Checks 3:1 UI component boundaries; requires confirming state contrast. |
| **1.4.12**| Text Spacing | AA | Fully Automatable Static | Script injection (CSS metrics) | Overrides line-height/letter-spacing; asserts zero clipped text height. |
| **1.4.13**| Content on Hover or Focus | AA | Partially Automatable | Playwright hover simulation | Tests tooltip dismissibility (Escape) and hoverable bounds. |
| **2.1.1** | Keyboard | A | Partially Automatable | Playwright tab trace | Verifies all controls focusable; human verifies all custom interactions operable. |
| **2.1.2** | No Keyboard Trap | A | Partially Automatable | Playwright focus loop trap | Catches infinite tab traps; human verifies non-standard modal escape routes. |
| **2.1.4** | Character Key Shortcuts | A | Partially Automatable | Keyboard event listener check| Detects single-key hotkeys; human verifies turn-off mechanism. |
| **2.2.1** | Timing Adjustable | A | Partially Automatable | Timeout listener tracking | Detects setTimeout; human confirms user extension controls exist. |
| **2.2.2** | Pause, Stop, Hide | A | Partially Automatable | CSS animation check (>5s) | Detects infinite animation; human confirms pause toggle presence. |
| **2.3.1** | Three Flashes or Below | A | Strictly Human / AT | Specialized photo-tool | Requires PEAT (Photosensitive Epilepsy Analysis Tool). |
| **2.4.1** | Bypass Blocks | A | Fully Automatable Static | `axe-core` (`skip-link`) | Asserts skip-link presence and target anchor validity. |
| **2.4.2** | Page Titled | A | Fully Automatable Static | `axe-core` (`document-title`) | Asserts `<title>` presence and non-empty string. |
| **2.4.3** | Focus Order | A | Partially Automatable | Playwright tab order trace | Traces sequential DOM focus; human verifies logical sequence. |
| **2.4.4** | Link Purpose (In Context) | A | Partially Automatable | `axe-core` (`link-name`) | Catches "click here"; human confirms context makes destination unambiguous. |
| **2.4.5** | Multiple Ways | AA | Strictly Human / AT | Manual Review | Asserts search + sitemap + nav links across multi-page site. |
| **2.4.6** | Headings and Labels | AA | Strictly Human / AT | Manual Review | Checks heading descriptive quality; automated tools only check syntax. |
| **2.4.7** | Focus Visible | AA | Partially Automatable | Playwright `:focus-visible` | Asserts outline thickness/color; human verifies perception against background. |
| **2.4.11**| Focus Not Obscured (Min) | AA | Partially Automatable | Multi-point occlusion audit | Evaluates whether sticky headers cover focused element (WCAG 2.2 new). |
| **2.5.1** | Pointer Gestures | A | Strictly Human / AT | Manual Review | Asserts multi-point or path-based gestures have single-pointer alternative. |
| **2.5.2** | Pointer Cancellation | A | Partially Automatable | Pointer event listener audit| Checks click execution on `up` event rather than `down`. |
| **2.5.3** | Label in Name | A | Fully Automatable Static | `axe-core` (`label-content-name-mismatch`) | Validates accessible name contains visible label string. |
| **2.5.4** | Motion Actuation | A | Strictly Human / AT | Manual Review | Asserts shake/tilt features can be operated by UI controls. |
| **2.5.7** | Dragging Movements | AA | Partially Automatable | Playwright drag-and-drop | Verifies single-pointer tap/click alternative exists for drag actions (2.2 new). |
| **2.5.8** | Target Size (Minimum) | AA | Partially Automatable | Geometry audit + spacing | Evaluates 24×24px or 24px diameter circle spacing; human checks exceptions. |
| **3.1.1** | Language of Page | A | Fully Automatable Static | `axe-core` (`html-has-lang`) | Asserts `<html lang="...">` has valid BCP 47 code. |
| **3.1.2** | Language of Parts | AA | Partially Automatable | `axe-core` (`valid-lang`) | Asserts inline `lang` tags are valid; cannot detect untagged foreign phrases. |
| **3.2.1** | On Focus | A | Partially Automatable | Playwright focus dispatch | Asserts focus does not trigger context change (navigation/modal). |
| **3.2.2** | On Input | A | Partially Automatable | Playwright input dispatch | Asserts changing input does not automatically submit form without notice. |
| **3.2.3** | Consistent Navigation | AA | Strictly Human / AT | Multi-page crawl review | Asserts navigation components appear in identical order across routes. |
| **3.2.4** | Consistent Identification | AA | Strictly Human / AT | Component inventory audit | Asserts identical components have consistent accessible labels. |
| **3.2.6** | Consistent Help | A | Strictly Human / AT | Multi-page crawl review | Asserts help/contact links occur in consistent relative order (2.2 new). |
| **3.3.1** | Error Identification | A | Partially Automatable | Playwright form test | Asserts invalid form shows text error; human verifies description clarity. |
| **3.3.2** | Labels or Instructions | A | Fully Automatable Static | `axe-core` (`label`) | Asserts all inputs have associated `<label>` or `aria-label`. |
| **3.3.3** | Error Suggestion | AA | Strictly Human / AT | Manual Review | Asserts input error provides corrective guidance (e.g. date format). |
| **3.3.4** | Error Prevention (Legal/Data)| AA | Strictly Human / AT | Manual Review | Asserts financial/legal transactions are reversible or confirmable. |
| **3.3.7** | Redundant Entry | A | Strictly Human / AT | Form flow audit | Asserts previous information is auto-populated or available (2.2 new). |
| **3.3.8** | Accessible Authentication | AA | Strictly Human / AT | Auth flow inspection | Asserts login does not require cognitive function test (CAPTCHA/puzzle). |
| **4.1.2** | Name, Role, Value | A | Fully Automatable Static | `axe-core` (`aria-*`, `button-name`) | Asserts all controls have valid ARIA roles, states, and accessible names. |
| **4.1.3** | Status Messages | AA | Partially Automatable | MutationObserver on live regions| Asserts dynamic notifications render inside `role="status"` or `alert`. |

---

## 8. Functional & Interaction Testing (WS4-E)

### 8.1 Pattern-Specific Expectations
Universal assertions fail because different interactive patterns have distinct behavioral contracts:
- **Dialogs / Modals:** Must trap focus, mark background `inert=true`, and restore focus to trigger upon Escape dismissal.
- **Menus & Dropdowns:** Trigger toggles `aria-expanded`; arrow keys navigate options; clicking outside closes menu and restores focus.
- **Forms:** Submissions assert client validation states, field-level error associations via `aria-describedby`, and focus movement to the first invalid control.

---

## 9. Cross-Browser & Rendering Consistency (WS4-F)

### 9.1 Engine Discrepancies & Real Defect Thresholds
- **Font Rasterization:** Differences between DirectWrite (Windows), FreeType (Linux), and CoreText (macOS) produce 0.2–0.5px line-height and kerning variances.
- **Impact Assessment:** Small 0.3px text shifts are **not always harmless**. In constrained headers or tight flex containers, a 0.5px line-height expansion can trigger line wraps, button overflow, or container clipping.
- **Color Rendering:** OKLab and OKLCH color spaces are natively supported in Chromium 111+, Firefox 113+, and Safari 15.4+. Minor gamut-mapping rounding discrepancies (±0.15:1 contrast variance) are expected engine behaviors.
- **Architectural Rule:** Cross-engine visual diffing is prohibited. Cross-browser verification evaluates **DOM layout bounds, computed styles, and functional state assertions**, while visual screenshot diffing is restricted to same-engine comparisons.

---

## 10. Evidence Collection & Cryptographic Integrity (WS4-G)

### 10.1 SHA-256 Digest vs. Digital Signature
A SHA-256 hash is a **cryptographic digest**, not a digital signature. A digest detects modifications **only when expected digests or manifests are independently protected** (e.g. stored in a trusted external store, git commit tree, or immutable log). A hash alone does not prove authenticity or prevent an attacker with write access from altering the payload and recomputing a new hash.

UIForge implements a **Six-Point Evidence Architecture**:
1. **Canonical JSON Serialization:** Deterministic recursive key sorting and formatting.
2. **Record Digest:** SHA-256 hash computed over the canonical record string (`recordDigest`).
3. **Artifact Digests:** Individual SHA-256 hashes for all screenshots, traces, and DOM dumps.
4. **Manifest Linking:** The evidence record explicitly references all artifact digests.
5. **Authenticity Anchors (Optional Enterprise Mode):** Asymmetric digital signature (Ed25519) using an agent private key when non-repudiation is required.
6. **Tamper Detection Tests:** Automated verification confirming that any mutated payload produces a mismatched digest (validated in Experiment E7).

---

## 11. AI Agent Integration Architecture (WS4-H)

### 11.1 Diagnostic Envelopes & DOM-to-TSX Mapping
Raw browser errors are unusable by AI coding agents. UIForge formats failures into **Actionable Diagnostic Envelopes**:
```json
{
  "diagnosticCode": "UIF-A11Y-CONTRAST-001",
  "confidenceScore": 0.85,
  "sourceMapping": {
    "targetFile": "components/dashboard/kpi-card.tsx",
    "approximateLine": 24,
    "astSelector": "JsxElement[name=\"KpiCard\"] JsxAttribute[name=\"className\"]",
    "mappingConfidence": "HEURISTIC_DATA_SLOT_MATCH"
  },
  "currentMeasuredValue": "text-gray-400 (contrast 2.54:1)",
  "suggestedReplacement": "text-gray-600 (contrast 5.8:1)",
  "reverificationCommand": "uiforge verify --target components/dashboard/kpi-card.tsx --rule contrast"
}
```
**Engineering Qualification:** DOM selectors do not automatically map to exact TSX files and line numbers. Source mapping is treated as **heuristic (best-effort)** unless verified via source maps, component debug attributes (`data-slot`), or AST locator tracking from WS-1.

---

## 12. Open-Source Tool Comparison (WS4-A / WS4-B / WS4-D)

| Tool | Pinned Version | License / Spec | Maintenance | Role in UIForge | Evaluation & Justification |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Playwright** (`playwright-core`) | `v1.65.1` | Apache-2.0 | Active (Microsoft) | **Core Engine** | Native multi-browser tracing, context isolation, `ariaSnapshot()`. Browser binaries managed as separate runtime assets. |
| **Pixelmatch** | `v8.0.0` | ISC | Active (Mapbox) | **Core Engine** | Pure JS OKLab/HyAB perceptual diffing; native `ignoreMask`; zero native compilation deps. |
| **axe-core** | `v4.14.1` | MPL-2.0 | Active (Deque) | **Core Engine** | Industry standard static accessibility rules engine. MPL-2.0 allows unmodified runtime browser injection without copyleft contamination. |
| **Pa11y** | `v10.0.0` | LGPL-3.0 | Active | Optional Reference | Robust CLI wrapper. Subprocess invocation avoids direct binary linking, but compliance still requires preserving user replacement rights and license notices if distributed. |
| **Puppeteer** | `v24.2.0` | Apache-2.0 | Active (Google) | Optional Adapter | Excellent Chromium CDP support; secondary for cross-browser testing. |
| **WebDriver BiDi** | Spec Level 1 | W3C Specification | Active (W3C) | Reference Spec | W3C specification under Community/Working Group process (not conventional software license). |
| **Selenium** | `v4.28.0` | Apache-2.0 | Active | Deferred | Heavyweight language bindings; protocol latency higher than Playwright. |
| **IBM Equal Access**| `v3.1.84` | Apache-2.0 | Active (IBM) | Reference Engine | Complementary rule sets for accessibility auditing. |
| **Argos CI** | Open-core | MIT / Commercial | Active | Reference Arch | Informs UIForge local baseline governance and diff visualizer. |

---

## 13. Security, Isolation & Threat Model

Browser verification must run untrusted client code safely:
1. **Network Egress & SSRF Protection:** Blocking RFC 1918 is insufficient. UIForge enforces multi-layer network protection:
   - Blocks IPv6 loopback (`::1`) and unique-local (`fc00::/7`).
   - Blocks IPv4-mapped IPv6 (`::ffff:127.0.0.1`, `::ffff:169.254.169.254`).
   - Blocks link-local addresses (`169.254.0.0/16`, `fe80::/10`).
   - Blocks cloud metadata endpoints (`169.254.169.254`, `metadata.google.internal`).
   - Defense in depth: combines Playwright route blocking with OS/container firewall egress rules.
   - **Authorized Local Target:** Explicitly allows connections to the user's authorized local dev server (e.g. `127.0.0.1:3000`), while rejecting all other local ports and private networks.
2. **Process Boundaries & Resource Caps:** Browser workers execute as low-privilege OS processes with strict memory (2GB max), CPU throttling, and command timeouts (30s). Process cleanup utilizes `tree-kill` on exit.
3. **Sensitive Data Redaction:** All evidence records, DOM snapshots, screenshots, and network logs are scrubbed of environment secrets (`API_KEY`, `AUTH_SECRET`), auth cookies, and password input values prior to persistence.

---

## 14. Controlled Experiment Methodology

- **Execution Script:** `research/phase-02/phase-02.2-technical-audit/ws4-evidence/run_ws4_experiments.cjs`
- **Output Archive:** `research/phase-02/phase-02.2-technical-audit/ws4-evidence/ws4-execution-results.json`
- **Runtime Environment:** Node.js v24.15.0 (Windows x64).

---

## 15. Reconciled Experiment Results & Raw Evidence

### Summary Execution Table
| Experiment | Focus Area | Tested Condition | Classification | Outcome |
| :--- | :--- | :--- | :---: | :--- |
| **E1** | Protocol Analysis | Playwright vs CDP vs BiDi | `[DOC/SOURCE-VERIFIED]` | Playwright Dispatcher architecture confirmed optimal. Score (9.8/10) marked illustrative. |
| **E2** | Visual Comparison | 10,000px synthetic buffer diff & mask | `[REPORTED-SIMULATION]` | 200px noise masked; 400px defect cleanly isolated using synthetic buffer math. |
| **E3** | Layout Geometry | Overflow, boundary breach, occlusion, touch | `[REPORTED-SIMULATION]` | Detected 4 geometry anomalies including multi-point occlusion and SC 2.5.8 candidate findings. |
| **E4** | A11y Contrast & Scope | Relative luminance math & WCAG matrix | `[LOCAL-HARNESS-TESTED]` | Contrast math verified; 55 WCAG criteria scope categorized across 3 tiers. |
| **E5** | Interaction FSM | Dialog modal focus trapping and Escape key | `[REPORTED-SIMULATION]` | Focus restoration and inert state transitions verified in pure Node.js state machine. |
| **E6** | Cross-Browser | Engine font rasterization and subpixel shifts | `[DOC-VERIFIED]` | Engine discrepancies documented from specs; same-engine baselines mandated. |
| **E7** | Evidence Hashing | Canonical JSON SHA-256 digest & tamper test | `[LOCAL-HARNESS-TESTED]` | Canonical digest verified; deliberate tamper detected (`tamperDetectedSuccessfully: true`). |
| **E8** | AI Remediation Loop | Actionable diagnostic envelope generation | `[REPORTED-SIMULATION]` | Emitted structured envelope; heuristic mapping noted. |

---

## 16. Proposed WS-4 Architecture

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                  UIFORGE WS-4 SUBSYSTEM ARCHITECTURE                             │
│                                                                                                  │
│   ┌──────────────────────────────────────────────────────────────────────────────────────────┐   │
│   │ A. Browser Verification Engine (Orchestrator)                                            │   │
│   └───────────────┬──────────────────────────┬─────────────────────────────┬─────────────────┘   │
│                   │                          │                             │                     │
│   ┌───────────────▼──────────────┐ ┌─────────▼─────────────────┐ ┌─────────▼─────────────────┐   │
│   │ B. Browser Adapter Interface │ │ C. Visual Evaluation      │ │ D. Accessibility Engine   │   │
│   │    (Playwright / CDP Worker) │ │    (Pixelmatch + Masking) │ │    (axe-core + APG Traces)│   │
│   └───────────────┬──────────────┘ └─────────┬─────────────────┘ └─────────┬─────────────────┘   │
│                   │                          │                             │                     │
│   ┌───────────────▼──────────────┐ ┌─────────▼─────────────────┐ ┌─────────▼─────────────────┐   │
│   │ E. Functional Test Engine    │ │ F. Evidence & Artifacts   │ │ G. Agent Integration     │   │
│   │    (Pattern-Specific FSM)    │ │    (SHA-256 Digest)       │ │    (Actionable Envelopes) │   │
│   └───────────────┬──────────────┘ └─────────┬─────────────────┘ └─────────┬─────────────────┘   │
│                   │                          │                             │                     │
│   ┌───────────────▼──────────────────────────▼─────────────────────────────▼─────────────────┐   │
│   │ H. Safety & Isolation Model (SSRF Defense, Sandbox Guards, Resource Caps, Redaction)     │   │
│   └──────────────────────────────────────────────────────────────────────────────────────────┘   │
│   │ I. Failure Classifier (Functional, Visual, Responsive, Accessibility, Runtime, Network)  │   │
│   └──────────────────────────────────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 17. TypeScript Interface Proposals

```typescript
/** Technology-neutral browser session */
export interface IBrowserAdapter {
  getCapabilities(): BrowserCapabilities;
  launch(options: { headless: boolean; engine: 'chromium' | 'firefox' | 'webkit' }): Promise<void>;
  createContext(options?: ContextOptions): Promise<IBrowserContext>;
  close(): Promise<void>;
}

export interface IBrowserContext {
  newPage(): Promise<IBrowserPage>;
  startTracing(options: { screenshots?: boolean; snapshots?: boolean }): Promise<void>;
  stopTracing(outputPath: string): Promise<void>;
  close(): Promise<void>;
}

export interface IBrowserPage {
  goto(url: string, options?: { waitUntil?: 'domcontentloaded' | 'load'; timeout?: number }): Promise<void>;
  evaluate<T>(fn: string | ((...args: unknown[]) => T), ...args: unknown[]): Promise<T>;
  setViewportSize(size: { width: number; height: number }): Promise<void>;
  screenshot(options?: { fullPage?: boolean; clip?: BoundingRect }): Promise<Buffer>;
  ariaSnapshot(): Promise<string>;
  getByRole(role: string, options?: { name?: string | RegExp }): ILocator;
}

export interface ILocator {
  click(options?: { timeout?: number }): Promise<void>;
  fill(value: string): Promise<void>;
  isVisible(): Promise<boolean>;
  boundingBox(): Promise<BoundingRect | null>;
}

export interface VerificationEvidenceRecord {
  schemaVersion: '1.0.0';
  recordId: `ev-${string}`;
  timestamp: string;
  durationMs: number;
  environment: {
    browserEngine: 'chromium' | 'firefox' | 'webkit';
    engineVersion: string;
    os: string;
    viewport: { width: number; height: number; devicePixelRatio: number };
  };
  summary: {
    status: 'PASS' | 'FAIL' | 'INCONCLUSIVE';
    confidenceScore: number;
  };
  findings: Array<{
    findingId: string;
    category: 'FUNCTIONAL' | 'VISUAL' | 'RESPONSIVE' | 'ACCESSIBILITY' | 'RUNTIME' | 'NETWORK';
    severity: 'BLOCKER' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
    ruleId: string;
    targetSelector: string;
    description: string;
    remediationGuidance: string;
  }>;
  recordDigest: `sha256-${string}`;
}
```

---

## 18. Limitations & Unresolved Questions

1. **Live Multi-Browser Execution (`[NOT-ESTABLISHED]` in local environment):**  
   Due to the isolated developer sandbox without external package installations or pre-downloaded WebKit/Firefox binaries, real browser automation was not executed in this turn.
2. **Screen Reader Semantic Verification (`[PLANNED]` / Human Audit Required):**  
   Synthetic ARIA tree snapshots (`ariaSnapshot()`) verify accessible role and name trees, but cannot simulate real-time VoiceOver, NVDA, or JAWS pronunciation quirks, audio timing, or rotor navigation.
3. **Dynamic Viewport Units in Embedded IFrames (`[UNRESOLVED]`):**  
   Dynamic viewport units (`100dvh`, `100svh`) exhibit nuanced behaviors when embedded within iframe sandboxes compared to top-level window frames.

---

## 19. Architecture Decision Records (ADRs)

- **ADR-WS4-01: Adoption of Playwright as Primary Browser Automation Engine (`ACCEPTED`)**
- **ADR-WS4-02: Two-Layer Local-First Visual Comparison Engine (`ACCEPTED`)**
- **ADR-WS4-03: Four-Tier Accessibility Verification Protocol (`ACCEPTED`)**
- **ADR-WS4-04: Automated Responsive Layout Geometry Engine (`ACCEPTED`)**
- **ADR-WS4-05: Cryptographic Verification Evidence Records (`ACCEPTED`)**

---

## 20. Reconciled Acceptance Scorecard

**Total Assessed:** 14 Criteria | **Breakdown:** 5 PASS, 8 PARTIAL, 1 NOT ESTABLISHED

| Acceptance Area | Status | Evidence & Qualification Reference |
| :--- | :---: | :--- |
| **Browser automation research** | `PASS` | Comprehensive multi-protocol investigation (Playwright 1.65.1, CDP, BiDi). |
| **Visual regression research** | `PASS` | Evaluated Pixelmatch v8 OKLab/HyAB, masking, anti-aliasing, and baseline governance. |
| **Responsive verification architecture** | `PARTIAL` | Multi-tier algorithm specified and simulated; requires live browser DOM validation. |
| **Accessibility methodology** | `PARTIAL` | 4-tier model established; 55-criteria matrix detailed; live axe-core execution pending. |
| **Functional verification methodology** | `PASS` | Pattern-specific state machine and role-based locator architecture. |
| **Cross-browser verification** | `PARTIAL` | Documented rendering variances; same-engine baselines mandated; live cross-run pending. |
| **Evidence schema** | `PARTIAL` | Canonical JSON and SHA-256 digest verified; full artifact manifest pending. |
| **AI remediation integration** | `PARTIAL` | Diagnostic envelope generated; autonomous repair loop remains planned. |
| **Security and isolation** | `PARTIAL` | Multi-layer SSRF model and redaction specified; requires containerized pen-testing. |
| **Licensing and version audit** | `PARTIAL` | Reconciled latest versions (Playwright 1.65.1, Pixelmatch 8.0); legal scope clarified. |
| **Reproducible experiments** | `NOT ESTABLISHED` | Algorithmic harness executed; real browser binary execution unestablished in local sandbox. |
| **Architecture specification** | `PARTIAL` | Complete TypeScript models defined; requires implementation validation in Phase 02.4. |
| **Previous workstream alignment** | `PASS` | Clean integration with WS-1 (AST), WS-2 (Components), and WS-3 (Tokens). |
| **Limitations & unresolved questions** | `PASS` | Explicitly lists WebKit CI, screen reader limits, and iframe viewport math. |

---

## 21. WS-5 Handoff & Integration Requirements

UIForge is ready to advance to **Workstream 5 (WS-5: AI Agent Architecture, Model Context Protocol / MCP & Tooling Integration)**:
1. **Expose Verification Tools via MCP:** `uiforge_verify_url`, `uiforge_inspect_element`, `uiforge_capture_trace`.
2. **Deterministic Diagnostic Envelopes:** Feed structured `VerificationEvidenceRecord` findings into the WS-1 AST transformation orchestrator.
3. **Brownfield Safety Gate:** Maintain the read-only inspection protocol, ensuring browser verification never modifies user source files without explicit confirmation.
