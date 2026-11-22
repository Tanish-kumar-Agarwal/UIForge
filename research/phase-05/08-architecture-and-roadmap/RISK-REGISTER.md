# UIForge Phase 05 — Architectural Risk Register
## Identified Technical, Legal & Ergonomic Risks with Formal Mitigation Paths

**Document ID:** UIF-PH05-RISK-REGISTER  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Technical & Ergonomic Risk Matrix

| Risk ID | Risk Description | Severity | Likelihood | Mitigation Architecture |
| :--- | :--- | :---: | :---: | :--- |
| **RSK-05-01** | **Legacy Browser Incompatibility with OKLCH:** Older browsers do not support `oklch()` color syntax. | Medium | Low | Style Dictionary compilation pipeline automatically generates fallback sRGB/hex custom properties alongside OKLCH definitions. |
| **RSK-05-02** | **Container Query Nesting Overhead:** Deeply nested container query containers can induce layout recalculation lag. | Low | Low | Enforce maximum container query nesting depth $\le 2$ via automated AST linting. |
| **RSK-05-03** | **APCA vs WCAG 2.2 Contrast Conflict:** Future WCAG 3.0 APCA contrast formulas diverge from current WCAG 2.2 relative luminance math. | High | Medium | Enforce WCAG 2.2 AA as the legal gate today, while designing contrast algorithms to satisfy APCA dark-mode thresholds concurrently. |
| **RSK-05-04** | **Excessive Density in Enterprise Tables:** Dense 32px tables become un-tappable on touchscreens. | High | High | Implement mandatory coarse pointer splitting: `@media (pointer: coarse)` expands row heights to 44px minimum. |
| **RSK-05-05** | **AI Hallucination of Design Rules:** Future LLM integrations inventing fake design justifications. | Critical | Medium | Mandate that all generated recommendations explicitly cite an active `EVID-*` ID from `EVIDENCE-REGISTER.json`. |
