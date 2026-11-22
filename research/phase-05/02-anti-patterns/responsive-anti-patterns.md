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

### `ANTI-RSP-002`: Cramped Mobile Touch Targets (<24px / <44px)
- **Description:** Interactive buttons, pagination icons, or table action links rendered smaller than 24x24px (WCAG minimum) or without 44x44px touch buffers.
- **Symptom:** Users repeatedly tap the wrong button; high input friction on mobile devices.
- **Root Defect:** Assuming mouse cursor precision applies to coarse human finger pads (`EVID-A11Y-003`, `EVID-SYS-003`).
- **Severity:** `HIGH`
- **Remediation:** Enforce minimum 44x44px tappable area on coarse pointer viewports (`@media (pointer: coarse)`).
- **Positive Counterpart:** `PATT-MKT-001`.

### `ANTI-RSP-003`: Destructive Text Truncation (`text-overflow: ellipsis` on Vital Data)
- **Description:** Applying ellipsis truncation to unique identifiers, monetary amounts, or error messages without a tooltip or expansion mechanism.
- **Symptom:** Users see `"Transaction ID: tx_984..."` and cannot copy or verify the actual full value.
- **Root Defect:** Prioritizing rigid visual line heights over data integrity.
- **Severity:** `HIGH`
- **Remediation:** Allow essential identifiers to wrap, break cleanly (`overflow-wrap: break-word`), or provide an inline one-click copy button.
- **Positive Counterpart:** `PATT-FIN-001`.
