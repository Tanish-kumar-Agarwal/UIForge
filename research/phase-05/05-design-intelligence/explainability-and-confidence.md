# UIForge Phase 05 — Explainability & Confidence Architecture
## Traceable Evidence Linking, Epistemic Transparency & Uncertainty Reporting

**Document ID:** UIF-PH05-ENGINE-EXPLAINABILITY  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Traceable Decision Logs (The "Why" Behind Every Style)

Every CSS rule, component structure, or token choice generated or modified by UIForge is accompanied by an **Explainability Record**:

```json
{
  "decisionId": "DEC-LAYOUT-042",
  "targetSelector": ".article-body",
  "appliedProperty": "max-width: 65ch",
  "rationale": "Enforces optical line measure optimum to prevent lateral eye tracking fatigue during sustained reading.",
  "knowledgeEntryId": "ANTI-TYP-001",
  "evidenceId": "EVID-TYP-001",
  "citation": "Bringhurst (2012), Elements of Typographic Style, p. 26",
  "authorityTier": 2,
  "confidence": "VERY_HIGH"
}
```

This guarantees that developers, designers, and auditors can inspect exactly *why* a design choice was made, tracing it to empirical research.

---

## 2. Explicit Uncertainty Reporting Protocol

When context is ambiguous or evidence is incomplete, the engine must never fabricate a confident recommendation:
1. **Low Demographic Context:** If target user age or visual acuity is unknown, the engine flags:
   * `CONFIDENCE: MEDIUM`
   * `NOTICE: Target demographic unstated. Applying default WCAG 2.2 AA (4.5:1) baseline; recommend testing with elderly or low-vision users for AAA (7:1) requirement.`
2. **Conflicting Stylistic Preferences:** If an existing codebase mixes modern minimalist sans-serif with legacy serifs, the engine prompts the user for direction rather than making an arbitrary unilateral change.
