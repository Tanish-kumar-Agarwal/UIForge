# UIForge Phase 05 — Layout Anti-Patterns
## Rigorous Catalog of Spatial Engineering Failures, Grid Monotony & Container Inception

**Document ID:** UIF-PH05-ANTI-LAYOUT  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Catalog of Layout Anti-Patterns

### `ANTI-LAY-001`: Identical Card Grids Across Disparate Content
- **Description:** Stacking repeated 3-column card grids down an entire page for features, customer logos, testimonials, pricing, and blog posts.
- **Symptom:** Rhythmic monotony; the user’s eye glazes over because every section looks identical regardless of information type.
- **Root Defect:** Failure to design distinct visual structures that match content semantics (`EVID-HCI-001`).
- **Severity:** `HIGH`
- **Remediation:** Map layout to content: split-screen for features, horizontal carousel for testimonials, structured comparison grid for pricing.
- **Positive Counterpart:** `PATT-EDT-001`, `PATT-MKT-001`.

### `ANTI-LAY-002`: Excessive Bento Grid Overuse
- **Description:** Forcing sequential, tabular, or highly structured information into an asymmetrical bento box grid simply because it is currently popular on design social media.
- **Symptom:** Data tables sliced into small boxes; users forced to jump between erratic cell spans to read continuous information.
- **Root Defect:** Subordinating functional ergonomics to superficial trends.
- **Severity:** `MEDIUM`
- **Remediation:** Reserve bento grids strictly for high-level visual overviews. Use linear tables or standard columns for operational data.
- **Positive Counterpart:** `PATT-DSB-001`.

### `ANTI-LAY-003`: Excessive Container Inception (Nested Card Syndrome)
- **Description:** Placing cards inside cards inside panels, creating four nested layers of rounded borders and cumulative padding.
- **Symptom:** Content measure squeezed into tiny narrow strips; visual clutter from stacked borders.
- **Root Defect:** Relying on physical borders rather than whitespace to communicate grouping (`EVID-HCI-002`).
- **Severity:** `MEDIUM`
- **Remediation:** Flatten container hierarchy. Maximize use of whitespace (`space-6`) and subtle background surface fills without borders.
- **Positive Counterpart:** `PATT-ENT-001`.

### `ANTI-LAY-004`: Repeated Centered Hero Syndrome
- **Description:** Centering every single headline, paragraph, and button down an entire landing page.
- **Symptom:** Lack of an anchor edge; ragged text on both left and right edges causing scanning fatigue.
- **Root Defect:** Failure to establish a strong vertical reading alignment edge (`SRC-HCI-001`).
- **Severity:** `MEDIUM`
- **Remediation:** Left-align body copy and feature descriptions in LTR languages. Restrict center alignment strictly to standalone hero titles or final CTA banners.
- **Positive Counterpart:** `PATT-MKT-001`.
