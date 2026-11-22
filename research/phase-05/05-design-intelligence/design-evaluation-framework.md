# UIForge Phase 05 — Design Evaluation & Scoring Framework
## Measurable Ergonomics, Non-Arbitrary Quality Gates & Anti-False-Precision Invariants

**Document ID:** UIF-PH05-ENGINE-EVALUATION  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Rejection of Arbitrary "Design Scores"

Most automated design tools output pseudoscientific metrics (e.g. `"UI Quality: 87.5/100"`). These arbitrary numbers have zero pedagogical value, cannot be independently audited, and provide no actionable path to improvement.

UIForge establishes a **Multi-Dimensional, Evidence-Backed Evaluation Framework**. Quality is evaluated across eight discrete, measurable axes:

| Evaluation Dimension | Measurable Physical Signal | Verification Method | Pass Threshold |
| :--- | :--- | :--- | :--- |
| **1. Accessibility** | Luminance contrast, target size, focus rings | `AUTOMATED_BROWSER` (axe-core) | 100% WCAG 2.2 AA (Zero blocking violations) |
| **2. Layout Stability** | Cumulative Layout Shift (CLS), horizontal overflow | `AUTOMATED_BROWSER` | CLS $< 0.1$, Zero unintended body horizontal scroll |
| **3. Typographic Scannability**| Measure (ch), harmonic ratio, tabular figures | `AUTOMATED_STATIC` (AST) | Measure $45-75\text{ch}$, H1/Body ratio $\ge 1.75$ |
| **4. Spatial Consistency** | Conformance to 8px/4px spatial token ramp | `AUTOMATED_STATIC` (AST) | $0$ arbitrary odd pixel margins/paddings |
| **5. Information Chunking** | Section item count, form field count per step | `AUTOMATED_STATIC` (AST) | Form steps $\le 6$ fields, nav groups $\le 7$ links |
| **6. State Completeness** | Presence of hover, focus, disabled, loading, empty | `AUTOMATED_STATIC` (AST) | $9/9$ canonical states handled on interactive controls |
| **7. Anti-Pattern Absence** | Zero matching signatures from Anti-Pattern Catalog | `AUTOMATED_STATIC` (AST) | $0$ Critical, $0$ High anti-pattern detections |
| **8. Performance Budget** | Font file payload, DOM tree depth, CSS bundle size | `AUTOMATED_BROWSER` | DOM depth $\le 16$, total fonts $\le 200\text{KB}$ woff2 |

---

## 2. Qualitative Evaluation Protocol (Human-in-the-Loop)

Where subjective design qualities cannot be mathematically computed (e.g. visual balance, emotional tone, brand alignment), the engine explicitly emits a `REQUIRES_HUMAN_REVIEW` finding with targeted questions:
- *"Does the chosen high-contrast serif font (Fraunces) align with the client's corporate brand personality?"*
- *"Is the 36px row density appropriate for the operational pace of your triage nurses?"*

This maintains absolute epistemic honesty and prevents the engine from hallucinating qualitative consensus.
