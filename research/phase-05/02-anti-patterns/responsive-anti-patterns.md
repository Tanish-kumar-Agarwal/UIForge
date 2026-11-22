# UIForge Phase 05 — Responsive Physics Anti-Patterns
## Catalog of Mobile Squeezing, Horizontal Overflow & Touch Target Failures

**Document ID:** UIF-PH05-ANTI-RESPONSIVE  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Catalog of Responsive Anti-Patterns

### `ANTI-RSP-001`: Desktop Layout Merely Squeezed Onto Mobile Viewport
- **Description:** Failing to reflow multi-column tables, side-by-side forms, or complex toolbars on mobile screens ($< 768\text{px}$).
- **Symptom:** Content truncated; page triggers horizontal scrolling on the root `<body>` element; text is unreadable without pinch-to-zoom.
- **Root Defect:** Designing desktop-first without mobile ergonomic reflow architecture (`EVID-LAY-001`).
- **Severity:** `CRITICAL`
- **Remediation:** Reflow multi-column layouts into single-column stacks, wrap wide data tables in touch-scrolling containers with sticky key columns, and stack form inputs vertically.
- **Positive Counterpart:** `PATT-ENT-001`.

### `ANTI-RSP-002`: Cramped Mobile Touch Targets (<24×24px WCAG AA / <44×44px Touch Ergonomics)
- **Description:** Interactive buttons, pagination icons, or table action links rendered smaller than 24×24 CSS pixels (violating WCAG 2.2 Level AA SC 2.5.8) or failing to provide recommended 44×44px touch targets on coarse pointer devices (WCAG Level AAA SC 2.5.5 / Apple HIG platform standards).
- **Symptom:** Users repeatedly tap the wrong button; high input friction on mobile touch devices.
- **Root Defect:** Assuming mouse cursor precision applies to coarse human finger pads (`EVID-A11Y-003`, `EVID-SYS-003`).
- **Severity:** `HIGH`
- **Remediation:** Enforce a strict minimum target size of 24×24 CSS pixels for WCAG 2.2 Level AA compliance, and expand touch target padding to 44×44 CSS pixels (or 44×44 pt) on touch viewports (`@media (pointer: coarse)`).
- **Positive Counterpart:** `PATT-MKT-001`, `PATT-CON-001`.

### `ANTI-RSP-003`: Destructive Text Truncation (`text-overflow: ellipsis` on Vital Data)
- **Description:** Applying ellipsis truncation to unique identifiers, monetary amounts, or error messages without a tooltip or expansion mechanism.
- **Symptom:** Users see `"Transaction ID: tx_984..."` and cannot copy or verify the actual full value.
- **Root Defect:** Prioritizing rigid visual line heights over data integrity.
- **Severity:** `HIGH`
- **Remediation:** Allow essential identifiers to wrap, break cleanly (`overflow-wrap: break-word`), or provide an inline one-click copy button.
- **Positive Counterpart:** `PATT-FIN-001`.

### `ANTI-RSP-004`: Desktop-Only Hover Dependency (Touch Inaccessibility)
- **Description:** Concealing essential interactive actions (e.g. edit, delete, share, or dropdown disclosure) exclusively behind mouse `:hover` states without an alternative trigger for touchscreens.
- **Symptom:** Mobile touch users cannot access core functions because touch displays do not have a continuous hover cursor state.
- **Root Defect:** Designing with desktop-pointer assumptions, ignoring multi-input device modalities (`EVID-SYS-003`, `EVID-LAY-001`).
- **Severity:** `HIGH`
- **Remediation:** Make primary actions permanently visible, or provide an explicit overflow icon button (e.g. three-dot action menu) that triggers on click/tap across all pointer types.
- **Positive Counterpart:** `PATT-ENT-001`, `PATT-CON-001`.

