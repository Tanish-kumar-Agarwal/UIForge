# UIForge Phase 05 — Knowledge Quality Standard
## The Ten Cardinal Quality Principles & Acceptance Benchmarks

**Document ID:** UIF-PH05-QUALITY-STANDARD  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. The Ten Cardinal Quality Principles

1. **Principle 1 — Context Over Universal Rules:** Design choices depend strictly on product domain, user intent, content structure, and device ergonomics.
2. **Principle 2 — Intentionality Over Decoration:** Every visual element, margin, border, and color hue must have an identifiable ergonomic or communicative reason to exist.
3. **Principle 3 — Function and Aesthetics Together:** A visually attractive interface that fails usability or task completion is an engineering failure.
4. **Principle 4 — Accessibility From the Beginning:** Accessibility (WCAG 2.2 AA) is an architectural floor, not a post-hoc compliance audit.
5. **Principle 5 — Consistency Without Monotony:** Design systems must enforce strict component predictability while permitting intentional, purposeful variation.
6. **Principle 6 — Evidence Over Trends:** Social media popularity or aesthetic novelty does not constitute evidence of design quality.
7. **Principle 7 — Explainability:** Every automated design recommendation must trace to specific knowledge entries and empirical citations.
8. **Principle 8 — Epistemic Honesty:** The system must distinguish mathematical standards, empirical research, heuristics, and subjective preferences, acknowledging uncertainty when context is missing.
9. **Principle 9 — Preserve Existing Design Identity:** Workflow B (improving existing software) must never obliterate a brand's visual identity with generic templates.
10. **Principle 10 — Measurable Quality Without False Precision:** Evaluation metrics must reflect measurable signals; arbitrary aggregate scores are prohibited.

---

## 2. Canonical Epistemic Classification of Design Guidance

To prevent presenting subjective practitioner conventions or domain heuristics as universal laws, UIForge mandates strict four-tier epistemological classification for all design guidance:

| Guidance Tier | Authority & Basis | Typical Examples | Enforcement & Override Policy |
| :--- | :--- | :--- | :--- |
| **Tier 1: Normative Standards** | Formal web and accessibility recommendations (W3C WCAG 2.2 AA, WAI-ARIA APG, WHATWG HTML). | 4.5:1 text contrast, 3:1 non-text contrast, 24×24 CSS px target minimum (SC 2.5.8), visible focus (SC 2.4.7). | **Mandatory & Blocking:** Absolute compliance floor. Cannot be overridden by aesthetic preference, brand guidelines, or developer convenience. |
| **Tier 2: Evidence-Supported Ergonomics** | Replicated human perception, optical mechanics, and HCI laboratory research (Bringhurst, NN/g, Ware, Fitts). | Bounded line measure (45–75 characters), cognitive chunking ($4 \pm 1$ items), F-shaped scanning corridors. | **High-Priority Guidance:** Governs layout readability and visual hierarchy. Requires explicit ergonomic justification to deviate. |
| **Tier 3: Contextual Domain Conventions** | Production-proven design system heuristics optimized for specific domains (IBM Carbon, Polaris, GOV.UK). | 8px/4px spatial baseline grid, tabular lining numerals in finance, single-column administrative form flows. | **Contextual Recommendation:** Enforced within matching domains (e.g. tabular numbers in fintech); never applied blindly as universal mandates for unrelated domains. |
| **Tier 4: Brand & Stylistic Preferences** | Subjective aesthetic choices that establish brand identity and emotional resonance. | Serif vs sans-serif display flair, specific corner radius personality (4px vs 12px), primary brand hues. | **Advisory & Preserved:** Never penalized or overridden unless they directly breach Tier 1 Normative Standards or severe Tier 2 ergonomics. |

