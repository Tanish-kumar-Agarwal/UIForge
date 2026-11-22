# UIForge Phase 05 — Color Anti-Patterns
## Catalog of Chromatic Failures, Contrast Regressions & Dark Mode Smearing

**Document ID:** UIF-PH05-ANTI-COLOR  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Catalog of Color Anti-Patterns

### `ANTI-COL-001`: Low-Contrast Placeholder & Muted Text
- **Description:** Styling form field placeholders, helper captions, or footers with faint grey text (<3:1 contrast ratio against background).
- **Symptom:** Text is invisible to low-vision users and under bright sunlight; immediate WCAG 2.2 failure.
- **Root Defect:** Mistaking low contrast for visual sophistication (`EVID-A11Y-001`).
- **Severity:** `CRITICAL`
- **Remediation:** Enforce minimum 4.5:1 contrast for all essential text and minimum 3:1 for placeholder hints and UI boundaries.
- **Positive Counterpart:** `PATT-ADM-001`.

### `ANTI-COL-002`: Gratuitous Multi-Color Gradients on Text & Borders
- **Description:** Applying rainbow or neon multi-stop gradients across headings, borders, and buttons on utilitarian software.
- **Symptom:** Visual vibration; tacky AI-template appearance; poor contrast against mixed background pixels.
- **Root Defect:** Relying on superficial color noise instead of functional visual hierarchy (`EVID-HCI-003`).
- **Severity:** `MEDIUM`
- **Remediation:** Replace text gradients with solid, high-contrast text. Use subtle single-hue tints for backgrounds.
- **Positive Counterpart:** `PATT-DEV-001`.

### `ANTI-COL-003`: Pitch Black Dark Mode Surfaces (`#000000` Glare)
- **Description:** Using pure `#000000` black for canvas, cards, and modal surfaces in dark themes.
- **Symptom:** Extreme halation/glare against white text, invisible drop shadows, OLED scroll smearing.
- **Root Defect:** Inverting light mode colors without an elevation-based surface lightening architecture (`EVID-COL-001`).
- **Severity:** `MEDIUM`
- **Remediation:** Use deep neutral slates (`oklch(0.18 0.01 260)` / `#121417`) for base canvas, lightening elevated cards.
- **Positive Counterpart:** `PATT-DEV-001`.

### `ANTI-COL-004`: Inappropriate Semantic Status Color Hijacking
- **Description:** Using red for a non-destructive primary brand button, or using bright green for a non-success warning banner.
- **Symptom:** Cognitive dissonance; users hesitate out of fear of making a destructive error.
- **Root Defect:** Violating universal semantic color conventions.
- **Severity:** `HIGH`
- **Remediation:** Reserve red strictly for critical errors and destructive deletions. Reserve green strictly for verified success.
- **Positive Counterpart:** `PATT-ADM-001`.
