# UIForge Phase 05 — Typography Anti-Patterns
## Catalog of Typographic Failures, Optical Breakdowns & Legibility Defects

**Document ID:** UIF-PH05-ANTI-TYPOGRAPHY  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Catalog of Typography Anti-Patterns

### `ANTI-TYP-001`: Unbounded Line Measure (Extreme Text Width)
- **Description:** Letting body paragraphs span the entire viewport width on desktop monitors (>100 characters per line).
- **Symptom:** Readers struggle to track the start of the next line, leading to line-skipping and eye strain.
- **Root Defect:** Violating the optical measure optimum (45-75 characters, `EVID-TYP-001`).
- **Severity:** `HIGH`
- **Remediation:** Enforce `max-width: 65ch` on all narrative text containers.
- **Positive Counterpart:** `PATT-EDT-001`.

### `ANTI-TYP-002`: Weak Heading Hierarchy & Flat Typography Ramp
- **Description:** Using heading sizes that are barely larger than body text (e.g. H1: 18px, H2: 16px, Body: 14px).
- **Symptom:** Page looks like an unformatted wall of text; readers cannot quickly scan section boundaries.
- **Root Defect:** Failure to apply harmonic musical ratios to typographic sizing (`EVID-TYP-002`).
- **Severity:** `HIGH`
- **Remediation:** Implement a standard harmonic scale: H1: 30px+, H2: 24px, H3: 20px, Body: 16px.
- **Positive Counterpart:** `PATT-EDT-001`.

### `ANTI-TYP-003`: Proportional Numerals in Tabular Financial Data
- **Description:** Rendering balance sheets or data grids with proportional numbers where `1` is narrower than `8`.
- **Symptom:** Jagged, ragged decimal alignment down table columns making financial comparison impossible.
- **Root Defect:** Missing OpenType tabular figures declaration (`EVID-DOM-001`).
- **Severity:** `HIGH`
- **Remediation:** Set `font-variant-numeric: tabular-nums lining-nums` and `text-align: right` on all numeric data columns.
- **Positive Counterpart:** `PATT-FIN-001`, `PATT-DSB-001`.

### `ANTI-TYP-004`: Inappropriate Font Pairing Clash
- **Description:** Combining two expressive fonts with conflicting historical origins (e.g. geometric futuristic sans with ornate Victorian serif).
- **Symptom:** Visual discordance; typography feels uncoordinated and amateur.
- **Root Defect:** Combining multiple focal typefaces rather than pairing a distinct display font with a neutral workhorse body font.
- **Severity:** `MEDIUM`
- **Remediation:** Pair an expressive display typeface with a neutral neo-grotesque (e.g. Fraunces + Inter, or Playfair + Roboto).
- **Positive Counterpart:** `PATT-EDT-001`.
