# UIForge Phase 05 — Interaction & Motion Anti-Patterns
## Catalog of Behavioral Defects, Focus Traps & Gratuitous Animation Friction

**Document ID:** UIF-PH05-ANTI-INTERACTION  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Catalog of Interaction Anti-Patterns

### `ANTI-INT-001`: Invisible Keyboard Focus Indicators (`outline: none`)
- **Description:** Removing default browser focus rings via `outline: none` without providing an alternative high-contrast indicator.
- **Symptom:** Keyboard users cannot see which element is active; complete barrier for motor-impaired users.
- **Root Defect:** Prioritizing clean mouse clicks over fundamental accessibility laws (`EVID-A11Y-004`).
- **Severity:** `CRITICAL`
- **Remediation:** Declare `:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px; }`.
- **Positive Counterpart:** `PATT-ADM-001`.

### `ANTI-INT-002`: Sluggish & Excessive UI Animations (>400ms)
- **Description:** Applying lingering, cartoonish transitions (>400ms) to simple utility controls like dropdowns and modals.
- **Symptom:** Sluggish interface; users waiting for animations to complete before they can interact.
- **Root Defect:** Confusing decorative entertainment with functional feedback (`EVID-SYS-006`).
- **Severity:** `MEDIUM`
- **Remediation:** Clamp micro-interactions to 100-150ms and modal expansions to 200-300ms using decelerate easing.
- **Positive Counterpart:** `PATT-ENT-001`.

### `ANTI-INT-003`: Missing Empty States (Dead-End Blank Canvas)
- **Description:** Rendering a blank white box or raw `"No items found"` text when an entity list is empty.
- **Symptom:** User disorientation; no guidance on how to populate the view.
- **Root Defect:** Failure to design the zero-data state as an onboarding activation channel (`EVID-SYS-005`).
- **Severity:** `HIGH`
- **Remediation:** Provide an illustrative icon, explanation of value, and a primary CTA button to create the first entity.
- **Positive Counterpart:** `PATT-ECM-001`.

### `ANTI-INT-004`: Destructive Actions Without Safeguards
- **Description:** Deleting a database, project, or workspace upon a single click of a button without a two-step confirmation dialog.
- **Symptom:** Catastrophic accidental data loss.
- **Root Defect:** Missing error prevention guardrails.
- **Severity:** `CRITICAL`
- **Remediation:** Implement a two-step modal confirmation dialog requiring the user to type the exact entity name for irreversible deletions.
- **Positive Counterpart:** `PATT-ENT-001`.
