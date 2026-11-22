# UIForge Phase 05 — Knowledge Contradiction Register
## Identified Dialectical Tensions, Contextual Trade-Offs & Systematic Reconciliations

**Document ID:** UIF-PH05-CONTRADICTION-REGISTER  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Register Architecture

Design engineering frequently encounters dialectical tensions where two established principles appear to give conflicting advice. Rather than ignoring these contradictions or allowing arbitrary non-deterministic decisions, UIForge catalogs every known tension and establishes its **Canonical Reconciliation**:

| Contradiction ID | Principle A | Principle B | Apparent Conflict | Canonical Resolution | Authority Reference |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **CONT-001** | Visual Whitespace (`KNOW-VIS-012`) | High Information Density (`KNOW-VIS-013`) | Whitespace demands generous breathing room; operational dashboards demand high data density. | **Productive vs Expressive Mode Switch:** Implement explicit density modes. Dashboards use compact 32px row heights; marketing uses 64px+ section buffers. | `SRC-SYS-003`, `EVID-SYS-001` |
| **CONT-002** | Brand Vibrant Color (`KNOW-COL-003`) | Accessible Contrast (`KNOW-COL-002`) | Bright neon brand colors (yellow/cyan) produce illegible text buttons. | **Precedence Gate:** WCAG 2.2 AA (4.5:1) strictly overrides brand aesthetics. Compute dark slate text for light accents. | `SRC-STD-001`, `EVID-A11Y-001` |
| **CONT-003** | Touch Target Size (`KNOW-INT-003`) | Compact Table Density (`KNOW-LAY-001`) | 44x44px touch targets conflict with 32px dense data grid rows. | **Coarse vs Fine Pointer Splitting:** Enforce 32px on desktop mice (`pointer: fine`); switch to 44px on touch screens (`pointer: coarse`). | `SRC-SYS-002`, `EVID-SYS-003` |
| **CONT-004** | Expressive Animation (`KNOW-INT-004`) | Vestibular Health (`KNOW-INT-005`) | Rich brand motion causes nausea and disorientation for sensitive users. | **`prefers-reduced-motion` Clamp:** Parallax and spatial movement clamped to instantaneous opacity crossfades. | `SRC-STD-001`, `EVID-SYS-006` |
| **CONT-005** | Optimistic UI (`KNOW-INT-006`) | Financial Audit Safety (`KNOW-FIN-001`) | Optimistic UI updates state before server verification; finance requires absolute transaction certainty. | **Risk-Tier Isolation:** Prohibit optimistic UI for irreversible, destructive, or monetary transactions. | `SRC-SYS-007`, `EVID-DOM-002` |
