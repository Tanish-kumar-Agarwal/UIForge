# UIForge Phase 05 — Normative Standards & Platform Specifications
## Formal Specifications, Web Standards, Accessibility Mandates & CSS Modular Baselines

**Document ID:** UIF-PH05-STANDARDS-SPECS  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Web Content Accessibility Guidelines (WCAG) 2.2 AA Baseline

UIForge enforces WCAG 2.2 Level AA as the non-negotiable floor for all generated interfaces and evaluation heuristics.

### Key Mandatory Success Criteria:
1. **SC 1.4.3 Contrast (Minimum) — Level AA:**
   * Text & images of text: Contrast ratio $\ge 4.5:1$ against background.
   * Large text ($\ge 18\text{pt} / 24\text{px}$ regular, or $\ge 14\text{pt} / 18.66\text{px}$ bold): Contrast ratio $\ge 3:1$.
2. **SC 1.4.11 Non-text Contrast — Level AA:**
   * UI components (borders of form inputs, buttons, sliders) & graphical objects: Contrast ratio $\ge 3:1$ against adjacent colors.
3. **SC 2.4.7 Focus Visible & SC 2.4.13 Focus Appearance — Level AA:**
   * Focus indicator must have a contrast ratio of at least $3:1$ between the focused and unfocused state, and at least $3:1$ against the background. Minimum area must equal a 2 CSS pixel perimeter line.
4. **SC 2.5.8 Target Size (Minimum) — Level AA:**
   * Pointer target size must be at least $24 \times 24$ CSS pixels, unless spacing offsets prevent overlap with adjacent targets.
5. **SC 2.5.7 Dragging Movements — Level AA:**
   * Any feature using a dragging movement can be operated by a single pointer without dragging (e.g. keyboard accessible sliders, reordering buttons).
6. **SC 3.2.6 Consistent Help — Level AA:**
   * Help mechanisms (contact info, self-help, chat) occur in the same relative order across multiple pages.

---

## 2. W3C Design Tokens Community Group (DTCG) 2025.10 Specification

UIForge token systems strictly implement the DTCG 2025.10 format (`OS-TOKN-01`):
* All tokens are declared as JSON objects with explicit `$value` and `$type`.
* Supported `$type` primitives:
  * `color` (hex, rgb, oklch)
  * `dimension` (px, rem, em)
  * `fontFamily` (string or array of font names)
  * `fontWeight` (numeric 100-900 or recognized keywords)
  * `duration` (ms, s)
  * `cubicBezier` (array of four floats: `[x1, y1, x2, y2]`)
  * `shadow` (composite token: color, offsetX, offsetY, blur, spread)
* Aliasing is expressed via `{group.token.name}` braces and resolved recursively with cycle detection.

---

## 3. Modern W3C CSS Modules & Platform Standards

UIForge design knowledge explicitly relies on modern, standardized CSS platform features, rejecting legacy JavaScript layout workarounds:
1. **CSS Containment Level 3 (`@container`):** Layouts must be component-responsive using container query length units (`cqi`, `cqw`, `cqb`).
2. **CSS Color Module Level 4 (`oklch()`):** Color harmonies, palettes, and contrast calculations must leverage OKLCH for true perceptual uniformity across hues.
3. **CSS Grid Level 2 (`subgrid`):** Multi-card alignment and complex forms must leverage subgrid to maintain continuous vertical and horizontal rhythm across nested DOM structures.
4. **WAI-ARIA 1.2 / 1.3:** Semantic HTML elements (`<main>`, `<nav>`, `<aside>`, `<header>`, `<footer>`, `<button>`) must be used as primary structure; ARIA roles and attributes are added only when native HTML semantics cannot satisfy APG requirements.
