# UIForge Phase 02.5: Rejected Candidate Register (Tier 5)

**Document ID:** `UIF-PH02.5-REJECTED-CANDIDATE-REGISTER`  
**Classification:** Quarantined & Ineligible Candidates (7 Candidates)  
**Status:** Certified / Complete  
**Date:** November 2026  

---

## 1. Exclusion Policy & Enforcement

Candidates assigned to **Tier 5** have failed mandatory hard gates (Licensing G2, Fit G5, or Viability G6) or have been excluded during architectural deduplication due to direct capability redundancy with core engines. They are strictly excluded from UIForge's core runtime, recommended extensions, and optional plugin registries.

---

## 2. Excluded Candidates Register (7 Sources)

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

## 3. Exclusion Rationale Summary

1. **Commercial Redistribution Prohibitions (`OS-MKT-08` Aceternity, `OS-D2C-08` Locofy):** Proprietary terms forbid redistributing, reselling, or embedding components into open developer tools.
2. **Mission Scope Misfit & Organization-Size Licensing (`OS-ANIM-08` Remotion):** Programmatic video composition and rendering engine (Chrome/FFmpeg) rather than interactive web UI design-to-code generation. Free license is restricted to <=3 employee entities.
3. **Severe Maintenance Abandonment (`OS-DASH-08` Tabler React):** Inactive maintainers, broken dependencies against modern React 18/19, and unmitigated security vulnerabilities.
4. **Capability Redundancy & Runner Coupling (`OS-VREG-04` Loki, `OS-VREG-05` BackstopJS):** Functional visual testing tools (BackstopJS v6.3.25; Loki Storybook runner), but excluded from adoption due to direct capability overlap with Playwright multi-browser engine + Pixelmatch diffing and legacy runner harness.
5. **Rigid Vendor Lock-In (`OS-COMP-15` SaaS UI):** Crippled community edition with aggressive Pro tier upsell gating.
