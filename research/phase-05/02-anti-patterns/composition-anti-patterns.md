# UIForge Phase 05 — Visual Composition Anti-Patterns
## Catalog of Aesthetic Gimmicks, Glassmorphism Blur & Floating Blobs

**Document ID:** UIF-PH05-ANTI-COMPOSITION  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Catalog of Composition Anti-Patterns

### `ANTI-COM-001`: Unnecessary Floating Blobs & Glassmorphism Blur
- **Description:** Scattering blurred neon gradient spheres (floating blobs) behind frosted-glass cards (`backdrop-filter: blur`) on utility software.
- **Symptom:** Distracting visual noise, severe GPU scroll stutter, text illegibility over blurred edges.
- **Root Defect:** Superficial AI-template gimmickry substituting for structural visual hierarchy (`EVID-HCI-003`).
- **Severity:** `HIGH`
- **Remediation:** Replace floating blobs with crisp spatial separation on solid neutral surfaces.
- **Positive Counterpart:** `PATT-DEV-001`, `PATT-ENT-001`.

### `ANTI-COM-002`: Excessive Pill Buttons & Container Over-Rounding
- **Description:** Applying `rounded-full` (pill, 9999px) border radius to large cards, data tables, and input fields simultaneously.
- **Symptom:** Content clipped at corners; playful toy aesthetic inappropriate for serious tools.
- **Root Defect:** Absence of a disciplined corner radius token scale (`EVID-TOK-001`).
- **Severity:** `LOW`
- **Remediation:** Restrict pill radius strictly to small badges/tags. Use 4px-8px for inputs/cards.
- **Positive Counterpart:** `PATT-FIN-001`.

### `ANTI-COM-003`: Generic Hero with Repetitive Icon-and-Text Grids
- **Description:** A centered hero followed immediately by 6 identical cards, each containing a pastel circle, a Lucide icon, a 2-word title, and 2 lines of generic copy.
- **Symptom:** Instantly recognizable as low-effort AI slop; zero communicative depth.
- **Root Defect:** Lack of bespoke visual direction and realistic product interaction previews.
- **Severity:** `HIGH`
- **Remediation:** Replace generic icon cards with interactive product UI previews, workflow diagrams, or customer evidence.
- **Positive Counterpart:** `PATT-MKT-001`.

### `ANTI-COM-004`: Excessive Muddy Shadows & Uncontrolled Elevation
- **Description:** Stacking multiple heavy, dark, highly blurred drop shadows (`box-shadow: 0 20px 50px rgba(0,0,0,0.5)`) across adjacent cards and panels without a coherent elevation token ramp.
- **Symptom:** Murky, ungrounded surfaces; blurry dark halos bleeding into neighboring text; visual heaviness that obscures layout boundaries.
- **Root Defect:** Attempting to simulate physical depth without an optical elevation ramp or ambient light modeling (`EVID-SYS-001`, `EVID-HCI-004`).
- **Severity:** `MEDIUM`
- **Remediation:** Implement a disciplined 3-tier elevation token system using subtle, layered ambient shadows (`rgba(0,0,0,0.04)` to `0.08`) combined with 1px border keylines. In dark mode, rely on surface lightness shifts rather than shadows.
- **Positive Counterpart:** `PATT-ENT-001`, `PATT-DEV-001`.

