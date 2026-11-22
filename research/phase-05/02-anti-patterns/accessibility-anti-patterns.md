# UIForge Phase 05 — Accessibility Anti-Patterns
## Catalog of Legal Regressions, Screen Reader Barriers & Focus Leaks

**Document ID:** UIF-PH05-ANTI-A11Y  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Catalog of Accessibility Anti-Patterns

### `ANTI-A11Y-001`: Color-Only Communication of Status or Priority
- **Description:** Using isolated red, yellow, or green dots to represent status without accompanying text labels or distinct icon shapes.
- **Symptom:** Inaccessible to users with red-green color blindness (~8% of males); immediate WCAG 2.2 SC 1.4.1 failure.
- **Root Defect:** Relying on single-channel visual encoding (`EVID-A11Y-001`).
- **Severity:** `CRITICAL`
- **Remediation:** Always combine color tint with an explicit text label (`"Failed"`, `"Active"`) and a distinct icon glyph (`Checkmark` vs `Triangle Alert`).
- **Positive Counterpart:** `PATT-ADM-001`.

### `ANTI-A11Y-002`: Inaccessible Div Buttons Without ARIA & Keyboard Handling
- **Description:** Using `<div onClick={...}>` or `<a href="#">` instead of native `<button>` elements.
- **Symptom:** Component cannot be reached via Tab key; Space and Enter keys do not activate it; screen readers announce it as plain text.
- **Root Defect:** Amateur HTML engineering ignoring native platform semantics (`EVID-DOM-003`).
- **Severity:** `CRITICAL`
- **Remediation:** Use native `<button type="button">` elements.
- **Positive Counterpart:** `PATT-ADM-001`.

### `ANTI-A11Y-003`: Missing Form Labels (Placeholder-Only Inputs)
- **Description:** Omitting `<label>` elements and relying solely on `<input placeholder="...">`.
- **Symptom:** Screen readers announce an unlabelled input; once a user begins typing, the hint disappears and they forget what the field is for.
- **Root Defect:** Violating WCAG 2.2 SC 3.3.2 (Labels or Instructions).
- **Severity:** `CRITICAL`
- **Remediation:** Provide explicit, visible `<label for="input-id">` elements permanently positioned above inputs.
- **Positive Counterpart:** `PATT-ADM-001`.

### `ANTI-A11Y-004`: Keyboard Traps in Custom Widgets
- **Description:** Keyboard focus enters a custom datepicker or dropdown and cannot exit via standard Tab or Escape keys.
- **Symptom:** Keyboard-only users are trapped on a single widget and forced to refresh the page.
- **Root Defect:** Violating WCAG 2.2 SC 2.1.2 (No Keyboard Trap).
- **Severity:** `CRITICAL`
- **Remediation:** Adhere strictly to W3C ARIA Authoring Practices Guide (APG) keyboard contracts; ensure Escape closes widgets and returns focus cleanly.
- **Positive Counterpart:** `PATT-ENT-001`.
