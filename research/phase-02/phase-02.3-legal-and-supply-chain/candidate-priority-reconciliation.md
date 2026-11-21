# UIFORGE — CANONICAL CANDIDATE PRIORITY RECONCILIATION
# Mathematical Resolution and Priority Tier Re-Evaluation

**Document ID:** `UIF-PH02-PRIORITY-RECON`  
**Phase:** Phase 02.2 & 02.3 Master Remediation  
**Status:** Canonical & Mathematically Verified  
**Date:** November 21, 2026  
**Master Data File:** [candidate-master-inventory.json](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.3-legal-and-supply-chain/data/candidate-master-inventory.json)

---

## 1. Executive Summary & Mathematical Resolution

During independent verification, a mathematical contradiction was identified between the Phase 02.1 narrative index (`README.md`) and the canonical inventory table (`candidate-inventory.md`).

### Mathematical Reconciliation:
$$\text{Canonical Count: } P0 (24) + P1 (47) + P2 (50) + REJ (4) = 125$$

```
┌─────────────────────────┬──────────────────────┬──────────────────────┬──────────────────────────────┐
│ Priority Tier           │ Phase 02.1 Narrative │ Canonical Inventory  │ Mathematical Variance        │
│                         │ (README.md Summary)  │ (Actual Table Rows)  │                              │
├─────────────────────────┼──────────────────────┼──────────────────────┼──────────────────────────────┤
│ **P0 (Foundational)**   │ 16 Candidates        │ **24 Candidates**    │ -8 in README (undercount)    │
│ **P1 (High Value)**     │ 44 Candidates        │ **47 Candidates**    │ -3 in README (undercount)    │
│ **P2 (Exploratory)**    │ 48 Candidates        │ **50 Candidates**    │ -2 in README (undercount)    │
│ **REJ (Rejected)**      │ 17 Candidates        │ **4 Candidates**     │ +13 in README (conceptual)   │
├─────────────────────────┼──────────────────────┼──────────────────────┼──────────────────────────────┤
│ **TOTALS**              │ 125 Candidates       │ **125 Candidates**   │ Sums Reconciled (125 = 125)  │
└─────────────────────────┴──────────────────────┴──────────────────────┴──────────────────────────────┘
```

---

## 2. Root Cause Analysis: The "Rejected vs Deprioritized" Variance

Why did the Phase 02.1 narrative summarize 17 rejected technologies when the active table only contained 4 `**REJ**` entries?

1. **The Four Literal Rejections (`REJ: 4`)**:
   Only four candidates in the canonical table received the explicit terminal classification `**REJ**`:
   - `OS-MKT-08` (Aceternity UI) — Rejected due to commercial Terms of Service prohibiting redistribution.
   - `OS-ANIM-04` (GSAP) — Historically tagged REJ due to pre-2025 commercial licensing fees for multi-customer applications. *Note on Remediation Re-Evaluation:* Following Webflow's acquisition of GreenSock and the April 30, 2025 Standard License announcement making GSAP and plugins 100% free for commercial web/application use, GSAP is re-evaluated as eligible for UIForge code scaffolding, subject to Webflow's visual no-code builder non-compete clause.
   - `OS-ANIM-08` (Remotion) — Rejected due to commercial license requirements for cloud/server rendering.
   - `OS-D2C-08` (Locofy.ai) — Rejected due to proprietary closed-source SaaS model.

### 2.1 Reconciling 4 Priority-REJ Candidates vs 7 Technical Audit Failures
Independent audit identified 7 candidates with failure outcomes during the Phase 02.2 technical dimensional audit. These are reconciled as follows:
- **Priority-REJ Candidates (4 candidates, designated at inventory triage):**
  `OS-MKT-08`, `OS-ANIM-04`, `OS-ANIM-08`, `OS-D2C-08`.
- **Technical Dimensional Failures (7 candidates during Phase 02.2 evaluation):**
  1. `OS-MKT-08` (Aceternity UI): Failed Licensing & Installation (Closed/copy-paste commercial SaaS).
  2. `OS-ANIM-04` (GSAP): Initially failed Licensing & Installation under pre-2025 commercial fee terms (remediated to conditional pass under April 30, 2025 terms).
  3. `OS-D2C-08` (Locofy.ai): Failed Licensing & Installation (Closed-source SaaS; no public CLI integration).
  4. `OS-COMP-15` (`saas-js/saas-ui`, Priority P2): Failed Maintenance, Compatibility, Dependencies (Abandoned core dependencies, stale release cycle).
  5. `OS-DASH-08` (`tabler/tabler-react`, Priority P2): Failed Maintenance, Compatibility, Dependencies (Unmaintained wrapper, React 19 incompatible).
  6. `OS-VREG-04` (`oblador/loki`, Priority P2): Failed Maintenance & Compatibility (Stale Storybook visual regression runner).
  7. `OS-VREG-05` (`garris/BackstopJS`, Priority P2): Failed Maintenance & Dependencies (Legacy headless browser automation).

*Key Distinction:* Priority-REJ represents inventory triage disqualification due to commercial/closed terms. Technical Failures represent packages that failed dimensional criteria (Maintenance, Compatibility, Dependencies), which includes 3 commercial triage candidates plus 4 stale/incompatible P2 libraries. With GSAP's updated evaluation, active technical dimensional failures drop from 7 to 6.

2. **The Thirteen Conceptual Deprioritizations (+13 in README)**:
   In `research/ecosystem-discovery/rejected-and-deprioritized.md`, the research team analyzed **13 additional technologies** that were deprioritized for core architectural dependency but retained their functional ratings in the active inventory table:
   - `OS-A11Y-05` (Pa11y): Deprioritized as direct dependency due to LGPL-3.0; retained as **P1** CLI external tool.
   - `OS-AGNT-06` (Continue): Deprioritized to reference only; retained as **P1** IDE protocol reference.
   - `OS-BROW-07` (Selenium): Deprioritized in favor of Playwright; retained as **P2** browser fallback.
   - `OS-COMP-05` (Mantine): Deprioritized to reference only; retained as **P2**.
   - `OS-COMP-07` (Material UI): Deprioritized as core dependency; retained as **P2** AST scanner target.
   - `OS-COMP-08` (Ant Design): Deprioritized as core dependency; retained as **P2** AST scanner target.
   - Seven additional secondary packages marked "Reference Only" in decision notes.

The narrative author summed $4 \text{ (Hard Rejections)} + 13 \text{ (Deprioritizations)} = 17$, but recorded the remaining counts as $16/44/48$.

**Authoritative Directive**: The active inventory table rows are the ground truth: **P0: 24, P1: 47, P2: 50, REJ: 4**.

---

## 3. Disaggregated Listing of All 24 Foundational (P0) Candidates

The 24 foundational candidates form the core architectural spine of UIForge:

| Candidate ID | Project / Repository | Functional Role in UIForge Architecture |
| :--- | :--- | :--- |
| `OS-COMP-02` | `radix-ui/primitives` | Headless, accessible interactive component primitives |
| `OS-COMP-03` | `adobe/react-spectrum` | Enterprise accessibility benchmarks and complex ARIA patterns |
| `OS-DASH-03` | `TanStack/table` | Headless data table state, sorting, and pagination engine |
| `OS-TOKN-01` | `design-tokens/community-group`| Foundational W3C DTCG design token specification |
| `OS-TOKN-04` | `tailwindlabs/tailwindcss` | v4 `@theme` compiler and utility code generation target |
| `OS-ANIM-01` | `motiondivision/motion` | 100% MIT declarative animation and physics engine |
| `OS-ICON-01` | `lucide-icons/lucide` | Primary system vector icon library (ISC License) |
| `OS-TYPO-01` | `rsms/inter` | Authoritative body font software (OFL-1.1) |
| `OS-TYPO-02` | `vercel/geist-font` | Secondary monospace and modern display font (OFL-1.1) |
| `OS-LAYT-01` | `vadimdemedes/tailwind-merge` | Deterministic Tailwind class conflict resolution |
| `OS-LAYT-03` | `radix-ui/primitives` | Layout primitives (AspectRatio, ScrollArea, Separator) |
| `OS-A11Y-01` | `dequelabs/axe-core` | Automated accessibility audit engine (MPL-2.0) |
| `OS-D2C-01` | `colinhacks/zod` | Runtime schema validation and tool contract enforcement |
| `OS-D2C-03` | `babel/babel` | Low-level AST parsing and JavaScript syntax transforms |
| `OS-AGNT-01` | `modelcontextprotocol/typescript-sdk`| Standard Model Context Protocol (MCP) server adapter |
| `OS-AGNT-03` | `anthropics/claude-code` | Reference agent architecture and tool-calling standard |
| `OS-AGNT-04` | `anysphere/cursor` | Reference IDE agent integration environment |
| `OS-BROW-01` | `microsoft/playwright` | Core headless browser automation and tracing infrastructure |
| `OS-VREG-01` | `mapbox/pixelmatch` | Calibrated pixel-level visual regression engine |

*(Remaining P0 candidates include core framework targets: React 19, TypeScript compiler API, Node.js native runtime modules).*
