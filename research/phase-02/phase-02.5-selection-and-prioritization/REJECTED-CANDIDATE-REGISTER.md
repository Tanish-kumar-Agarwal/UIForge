# UIForge Phase 02.5: Rejected Candidate Register (Tier 5)

**Document ID:** `UIF-PH02.5-REJECTED-CANDIDATE-REGISTER`  
**Classification:** Quarantined & Ineligible Candidates (7 Candidates)  
**Status:** Certified / Complete  
**Date:** November 2026  

---

## 1. Exclusion Policy & Enforcement

Candidates assigned to **Tier 5** have failed mandatory hard gates (Licensing G2, Architecture G4, Fit G5, or Security G6) or have been excluded during architectural deduplication due to direct capability redundancy with core engines. They are strictly excluded from UIForge's core runtime, recommended extensions, and optional plugin registries.

---

## 2. Canonical Identity & Supersession Table (C11)

### Canonical Identity & Supersession Table (Finding C11 Reconciliation)

To ensure tamper-evident traceability and prevent alias confusion, the following table formally maps every scrutinized candidate to its immutable identifier in the Phase 02.4 Canonical Source Registry (`sources.json`), superseding all erroneous identifiers from earlier working drafts:

| Canonical Candidate ID | Canonical Source ID | Formal Name | Primary Category | Erroneous Prior Draft ID | Root Cause & Supersession Rationale |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`OS-ANIM-08`** | `SRC-OS-ANIM-08` | `remotion-dev/remotion` | Category 07 (Motion) | `OS-ANIM-05` | `OS-ANIM-05` is canonical `airbnb/lottie-web`. Remotion is canonical `OS-ANIM-08` (REJ priority; Tier 5 Excluded due to G5 mission misfit). |
| **`OS-D2C-08`** | `SRC-OS-D2C-08` | `locofy/locofy` | Category 02 (Design-to-Code) | `OS-D2C-05` | `OS-D2C-05` is canonical `WICG/open-ui`. Locofy is canonical `OS-D2C-08` (REJ priority; Tier 5 Excluded due to closed proprietary SaaS). |
| **`OS-LAYT-08`** | `SRC-OS-LAYT-08` | `Every-Layout` | Category 09 (Layout) | `OS-LAYT-06` | `OS-LAYT-06` is canonical `kristoferbaxter/flexboxgrid`. Every Layout is canonical `OS-LAYT-08` (P1 priority; Tier 3 Reference under clean-room boundary). |
| **`OS-VREG-04`** | `SRC-OS-VREG-04` | `oblador/loki` | Category 06 (Visual Regr.) | `OS-VREG-03` | `OS-VREG-03` is canonical `argos-ci/argos`. Loki is canonical `OS-VREG-04` (P2 priority; Tier 5 Excluded due to Playwright redundancy). |
| **`OS-VREG-05`** | `SRC-OS-VREG-05` | `garris/BackstopJS` | Category 06 (Visual Regr.) | `OS-VREG-04` | `OS-VREG-04` is canonical `oblador/loki`. BackstopJS is canonical `OS-VREG-05` (P2 priority; Tier 5 Excluded due to Playwright redundancy). |
| **`OS-DASH-05`** | `SRC-OS-DASH-05` | `react-grid-layout/react-grid-layout` | Category 08 (Dashboard) | `OS-LAYT-03` | `OS-LAYT-03` is canonical Radix UI Aspect Ratio primitive. React-Grid-Layout is canonical `OS-DASH-05` (P2 priority; Tier 2 Optional adapter). |
| **`OS-LAYT-03`** | `SRC-OS-LAYT-03` | `radix-ui/primitives (Aspect Ratio)` | Category 09 (Layout) | None | Immutable Radix Aspect Ratio primitive (P1 priority; Tier 1 Core-Adjacent), strictly distinct from `OS-DASH-05`. |


---

## 3. Excluded Candidates Register (7 Sources)

| Candidate ID | Name | Category | Priority | Hard Gate | Score | Detailed Disqualification Rationale & Root Cause |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| **OS-COMP-15** | `saas-js/saas-ui` | CAT_D | P2 | **FAIL** | **50.6** | Tightly coupled commercial Pro upsell with crippled community edition and high architectural lock-in |
| **OS-VREG-05** | `garris/BackstopJS` | CAT_F | P2 | **PASS_WITH_RESTRICTIONS** | **50.2** | Functional visual regression tool (v6.3.25), but excluded from adoption due to direct capability overlap with Playwright multi-browser engine + Pixelmatch and legacy external runner harness |
| **OS-VREG-04** | `oblador/loki` | CAT_F | P2 | **PASS_WITH_RESTRICTIONS** | **49** | Functional Storybook visual testing tool, but excluded from adoption due to direct capability redundancy with Playwright multi-browser engine + Pixelmatch and heavy Storybook runtime coupling |
| **OS-MKT-08** | `aceternity/ui` | CAT_H | REJ | **FAIL** | **48.4** | REJ discovery priority. Commercial proprietary terms prohibit redistribution, reselling, or platform embedding |
| **OS-DASH-08** | `tabler/tabler-react` | CAT_H | P2 | **FAIL** | **48.4** | Abandoned React 16 legacy wrapper; completely incompatible with modern React Server Components and Tailwind |
| **OS-ANIM-08** | `remotion-dev/remotion` | CAT_H | REJ | **FAIL** | **48.4** | REJ discovery priority. Excluded under Gate G5 due to mission and architectural misfit: programmatic video rendering engine (video composition) rather than interactive web UI design-to-code generation. Free license is restricted to <=3 person entities. |
| **OS-D2C-08** | `locofy/locofy` | CAT_H | REJ | **FAIL** | **48.4** | REJ discovery priority. Closed proprietary SaaS platform; no public repository, no open integration API |

---

## 4. Exclusion Rationale Summary

1. **Commercial Redistribution Prohibitions (`OS-MKT-08` Aceternity, `OS-D2C-08` Locofy):** Proprietary terms forbid redistributing, reselling, or embedding components into open developer tools.
2. **Mission Scope Misfit & Organization-Size Licensing (`OS-ANIM-08` Remotion):** Programmatic video composition and rendering engine (Chrome/FFmpeg) rather than interactive web UI design-to-code generation. Free license is restricted to <=3 employee entities.
3. **Severe Maintenance Abandonment (`OS-DASH-08` Tabler React):** Inactive maintainers, broken dependencies against modern React 18/19, and unmitigated security vulnerabilities.
4. **Capability Redundancy & Runner Coupling (`OS-VREG-04` Loki, `OS-VREG-05` BackstopJS):** Functional visual testing tools (BackstopJS v6.3.25; Loki Storybook runner), but excluded from adoption due to direct capability overlap with Playwright multi-browser engine + Pixelmatch diffing and legacy runner harness.
5. **Rigid Vendor Lock-In (`OS-COMP-15` SaaS UI):** Crippled community edition with aggressive Pro tier upsell gating and architectural coupling.
