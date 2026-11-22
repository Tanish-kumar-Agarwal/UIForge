# UIForge Phase 05 — Evidence Limitations & Uncertainty Boundaries
## Epistemic Guardrails, Known Limitations & Non-Dogmatic Reasoning Bounds

**Document ID:** UIF-PH05-EVIDENCE-LIMITS  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Epistemic Humility & The Boundaries of Automated Design Reasoning

Design engineering is not pure mathematics. While physical ergonomics, optical physics, and accessibility standards provide hard mathematical boundaries, aesthetic suitability and contextual trade-offs involve qualitative judgment.

UIForge establishes three cardinal epistemic boundaries:
1. **Never Confuse Aesthetic Trends with Functional Quality:** Just because a visual technique (e.g. glassmorphism, neo-brutalism, bento grids) is popular on design social media does not mean it is functionally effective, accessible, or appropriate for an enterprise banking portal.
2. **Never Claim False Precision:** A tool that outputs an overall score of `92.47% Design Quality` is deceptive. Quality must be decomposed into measurable dimensions (e.g. contrast ratio, touch target size, typographic measure, DOM nesting depth) with discrete evidence and confidence bounds.
3. **Explicit Uncertainty Reporting:** If an AI coding agent or design evaluation engine lacks sufficient domain context (e.g. unknown user demographic, unstated branding requirements, ambiguous conversion goals), it must explicitly return `CONFIDENCE: LOW` and explain what information is missing.

---

## 2. Catalog of Known Evidence Limitations

| Area | Current Known Limitation | Engine Guardrail & Fallback Behavior |
| :--- | :--- | :--- |
| **Contrast Algorithms** | WCAG 2.2 uses relative luminance ($\frac{L_1 + 0.05}{L_2 + 0.05}$), which has known flaws for dark mode and high-frequency colored text (APCA addresses this in WCAG 3 drafts). | Enforce WCAG 2.2 AA mathematically as the legal baseline, but cross-check with APCA (Accessible Perceptual Contrast Algorithm) heuristics for dark mode text clarity. |
| **Eye-Tracking Generalization** | Most eye-tracking studies (NN/g) are conducted on desktop monitors with Western (left-to-right) reading participants. | Explicitly annotate reading direction exceptions; invert scanning corridors for RTL (Right-to-Left) languages (Arabic, Hebrew). |
| **Touch Target vs Density** | Strict 44x44px touch targets conflict directly with dense enterprise data grids requiring compact 32px row heights. | Permit 32px row heights on desktop mouse pointer interfaces; enforce 44px minimum when viewport or user agent indicates primary touch input (`@media (pointer: coarse)`). |
| **Color Blindness Simulation** | Static color blindness filters (deuteranopia, protanopia) approximate, but cannot replicate the full spectrum of lived human visual diversity. | Never rely solely on color to convey status or state. Enforce secondary visual indicators (icons, text labels, pattern fills) across all feedback states. |
| **Automated Layout Quality** | AST and DOM analysis can measure alignment, container nesting, and overflow, but cannot definitively evaluate visual balance or emotional resonance without human review. | Restrict automated checks to deterministic properties; flag composition balance as `REQUIRES_HUMAN_REVIEW`. |
