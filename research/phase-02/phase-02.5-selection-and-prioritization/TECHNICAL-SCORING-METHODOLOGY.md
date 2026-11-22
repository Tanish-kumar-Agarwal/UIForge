# UIForge Phase 02.5: Technical Scoring Methodology

**Document ID:** `UIF-PH02.5-TECHNICAL-SCORING-METHODOLOGY`  
**Classification:** Technical Evaluation & Mathematical Weighting Model  
**Status:** Certified / Complete  
**Date:** November 2026  

---

## 1. Mathematical Weighting Framework

Candidates passing mandatory hard gates are evaluated across **seven technical dimensions**, weighted to reflect UIForge's engineering priorities:

| Dimension | Weight | Primary Architectural Focus |
| :--- | :---: | :--- |
| **D1: Code Quality** | **20%** | TypeScript type safety, architectural modularity, error resilience, and separation of concerns |
| **D2: Compatibility** | **15%** | React 18/19 compatibility, Next.js App Router boundaries, TypeScript strictness, and zero framework lock-in |
| **D3: Accessibility** | **15%** | W3C WAI-ARIA conformance, keyboard navigation, focus trap management, accessible naming, and contrast |
| **D4: Responsiveness** | **15%** | Mobile-first CSS flex/grid reflow, container query adaptability, and intrinsic layout elasticity |
| **D5: Maintainability** | **15%** | Active maintainer response, regular releases, healthy issue triage, clean dependencies, and long-term sustainability |
| **D6: Customization** | **10%** | Unstyled primitive ergonomics, CSS custom property theming, Tailwind class overrides, and slot extensibility |
| **D7: Documentation** | **10%** | Comprehensive API references, copy-paste examples, migration guides, and clear licensing disclosures |
| **TOTAL** | **100%** | **Normalized Mathematical Scoring Formula: Final Score = Σ (Dim × Weight) × 10** |

---

## 2. Evidence Confidence Classification (Independent of Hard Gates)

Scores are paired with an independent **Evidence Confidence Classification**:
- **HIGH:** Backed by direct repository inspection, audited package exports, and verified unit test suites.
- **MEDIUM:** Backed by authoritative documentation, published release histories, and verified community adoption.
- **LOW:** Backed by secondary analyses or provisional technical demonstrations.
- **INSUFFICIENT:** Lacking verified source code or active repository metadata (quarantines candidates to Tier 5).

---

## 3. Score Interpretation Guidance

- **90.0 – 100.0 (Exceptional Candidate):** Gold standard architecture; eligible for Tier 0 Core Foundation.
- **80.0 – 89.9 (Strong Candidate):** Robust, high-value library; eligible for Tier 1 Core-Adjacent or Tier 2 Modular Integration.
- **70.0 – 79.9 (Viable Candidate):** Functional specialized package; eligible for Tier 2 Optional or Tier 3 Reference.
- **60.0 – 69.9 (Conditional / Deferred):** Technical limitations or pending gates; deferred to Tier 4.
- **Below 60.0 (Weak / Ineligible):** Severe regressions, abandonment, or license violations; rejected in Tier 5.
