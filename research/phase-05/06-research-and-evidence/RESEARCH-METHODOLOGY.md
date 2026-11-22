# UIForge Phase 05 — Research Methodology & Epistemic Framework
## Evidence-Driven Knowledge Engineering, Epistemology & Non-Fabrication Invariants

**Document ID:** UIF-PH05-RESEARCH-METHODOLOGY  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Executive Summary & Epistemic Mandate

UIForge rejects the prevailing industry practice of populating AI coding systems with uncurated, generic, or hallucinated design advice. AI-generated interfaces look artificial and generic precisely because prompt templates and foundation models regurgitate superficial design tropes without understanding:
1. The **perceptual physiology** of the human visual cortex.
2. The **mathematical constraints** of display technology, typography, and optical alignment.
3. The **ergonomic friction** of human motor control (Fitts's Law, touch target physics).
4. The **normative legal standards** of accessible web software (WCAG 2.2 AA).
5. The **contextual trade-offs** inherent to real-world domain engineering.

This document defines the rigorous research methodology, empirical evaluation criteria, and non-fabrication protocols governing Phase 05.

---

## 2. Epistemic Hierarchy & Source Triangulation

Every design rule, heuristic, anti-pattern, and evaluation metric in UIForge is established via **Source Triangulation**. A rule cannot be elevated to the canonical knowledge base based on the opinion of a single designer, blog post, or aesthetic trend.

```
                  ┌──────────────────────────────────────────────┐
                  │          TIER 1: NORMATIVE STANDARDS         │
                  │   (WCAG 2.2, W3C CSS, WAI-ARIA APG, DTCG)    │
                  │      Weight: 1.0 — Legally Non-Negotiable    │
                  └──────────────────────┬───────────────────────┘
                                         │
                  ┌──────────────────────▼───────────────────────┐
                  │       TIER 2: PLATFORM & EMPIRICAL HCI       │
                  │ (WHATWG, Eye-Tracking, Cognitive Ergonomics) │
                  │       Weight: 0.90 — Empirically Proven      │
                  └──────────────────────┬───────────────────────┘
                                         │
                  ┌──────────────────────▼───────────────────────┐
                  │    TIER 3: SCALE ENTERPRISE DESIGN SYSTEMS   │
                  │ (Material 3, Apple HIG, Carbon, GOV.UK, etc) │
                  │      Weight: 0.80 — Battle-Tested at Scale   │
                  └──────────────────────────────────────────────┘
```

### Triangulation Rule:
A canonical design principle or anti-pattern must be supported by:
- **At least one Tier 1 or Tier 2 source** (providing the normative standard or perceptual mechanism), AND
- **At least one Tier 3 production system** (demonstrating practical, scalable implementation).

If a rule is supported only by practitioner convention without empirical backing, it is classified strictly as a **Heuristic** with confidence `MEDIUM` and requires explicit human judgment.

---

## 3. Strict Non-Fabrication & Evidence Invariants

In accordance with `GEMINI.md` Core Invariant: **Evidence Over Assumptions**:
1. **Zero Citation Fabrication:** Every `SRC-*` ID must point to a real, verifiable standard, academic paper, or official design system specification.
2. **Zero Fictitious Metrics:** Scoring algorithms must never output pseudo-scientific precision (e.g. "Beauty Score: 87.4%"). All scores must be bounded, explained, and directly derived from measurable signals.
3. **Traceability Guarantee:** Every knowledge entry in `knowledge-entry.schema.json` and every anti-pattern in `anti-pattern-catalogue.json` must explicitly cite its supporting `evidence` array referencing IDs in `EVIDENCE-REGISTER.json`.
4. **Explicit Uncertainty:** When evidence is insufficient, contradictory, or heavily context-dependent, the engine is explicitly programmed to report uncertainty rather than inventing a rationalization.

---

## 4. Distinction Between Principles, Heuristics, and Preferences

| Category | Definition | Enforcement Level | Verification Method |
| :--- | :--- | :--- | :--- |
| **Normative Standard** | Mandatory accessibility or web platform specification (e.g. 4.5:1 contrast, 24px target). | Absolute Gate (Blocking) | Automated static/browser AST and colorimetry audit. |
| **Perceptual Principle** | Invariant human visual processing mechanism (e.g. Gestalt proximity, F-shaped scanning, optical line measure). | High Priority Heuristic | Algorithmic layout calculation and spatial density analysis. |
| **Contextual Pattern** | Proven layout/interaction solution optimized for a specific domain (e.g. tabular numbers for finance). | Domain Recommended | Context-matching evaluation engine. |
| **Stylistic Preference** | Subjective aesthetic choice (e.g. pastel vs bold saturation, serif vs sans-serif brand flair). | Advisory / Non-Blocking | Preserved unless it directly violates a higher tier. |

---

## 5. Research Workstream Execution Lifecycle

Each workstream follows a 5-step engineering pipeline:
1. **Literature Audit:** Review canonical specifications and empirical benchmarks.
2. **Failure Mode Analysis:** Catalog real-world failures, particularly in AI-generated and junior-developer interfaces.
3. **Structured Knowledge Encoding:** Formalize findings into machine-readable JSON Schema contracts.
4. **Counter-Example & Exception Mapping:** Identify valid edge cases where the rule should intentionally be broken.
5. **Independent Quality Gate:** Execute automated integrity scripts to guarantee 100% referential closure.
