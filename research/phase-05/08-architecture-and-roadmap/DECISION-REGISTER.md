# UIForge Phase 05 — Architectural Decision Register
## Canonical Decisions Frozen in Phase 05 Knowledge Engineering

**Document ID:** UIF-PH05-DECISION-REGISTER  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Architectural Decisions Frozen in Phase 05

| Decision ID | Decision Title | Context & Driver | Selected Architectural Option | Downstream Impact |
| :--- | :--- | :--- | :--- | :--- |
| **DEC-05-01** | OKLCH Color Modeling | sRGB/HSL have non-uniform luminance distortion | Adopt OKLCH for all internal color calculations and ramps | True perceptual uniformity; reliable automated contrast generation |
| **DEC-05-02** | 8px/4px Spatial Grid | Arbitrary odd-pixel margins cause visual chaos | Enforce strict 8px base rhythm with 4px micro-spacing | Predictable vertical rhythm; eliminated subpixel alignment errors |
| **DEC-05-03** | DTCG 2025.10 Token Schema | Fragmentation of token formats in ecosystem | Strictly adopt W3C DTCG Draft 2025.10 format (`$type`, `$value`) | Zero-shim compilation via Style Dictionary v5.8.0; full Figma interoperability |
| **DEC-05-04** | Container Query First | Viewport queries break modular components | Mandate `@container` for multi-slot component responsiveness | Components adapt to slot width, not screen width |
| **DEC-05-05** | Precedence Arbitration | Unresolved trade-offs between brand & a11y | Normative Standards > Perceptual > Domain > Brand | Absolute legal and ergonomic safety; zero aesthetic regressions |
| **DEC-05-06** | Decoupled Aesthetic Scoring | High aesthetics mask severe usability failures | Separate measurable technical signals from subjective review | No deceptive aggregate scores; absolute epistemic honesty |
