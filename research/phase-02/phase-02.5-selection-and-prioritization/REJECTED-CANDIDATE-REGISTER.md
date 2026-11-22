# UIForge Phase 02.5: Rejected Candidate Register (Tier 5)

**Document ID:** `UIF-PH02.5-REJECTED-CANDIDATE-REGISTER`  
**Classification:** Quarantined & Ineligible Candidates (8 Candidates)  
**Status:** Certified / Complete  
**Date:** November 2026  

---

## 1. Exclusion Policy & Enforcement

Candidates assigned to **Tier 5** have failed mandatory hard gates (Licensing G2, Security/Maintenance G3, Fit G5, or Viability G6). They are strictly excluded from UIForge's core runtime, recommended extensions, and optional plugin registries.

---

## 2. Excluded Candidates Register (8 Sources)

| Candidate ID | Name | Category | Priority | Hard Gate | Score | Detailed Disqualification Rationale & Root Cause |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| **OS-COMP-15** | `saas-js/saas-ui` | CAT_D | P2 | **FAIL** | **50.6** | Tightly coupled commercial Pro upsell with crippled community edition and high architectural lock-in |
| **OS-DASH-05** | `react-grid-layout/react-grid-layout` | CAT_H | P2 | **FAIL** | **50.2** | Unmaintained library with severe React 18/19 compatibility regressions and layout shift defects |
| **OS-VREG-05** | `garris/BackstopJS` | CAT_F | P2 | **FAIL** | **50.2** | Legacy visual regression tool with unmaintained Puppeteer dependency chain and high maintenance overhead |
| **OS-VREG-04** | `oblador/loki` | CAT_F | P2 | **FAIL** | **49** | Abandoned Storybook visual regression tool; failing modern Playwright/Chromium dependencies |
| **OS-MKT-08** | `aceternity/ui` | CAT_H | REJ | **FAIL** | **48.4** | REJ discovery priority. Commercial proprietary terms prohibit redistribution, reselling, or platform embedding |
| **OS-DASH-08** | `tabler/tabler-react` | CAT_H | P2 | **FAIL** | **48.4** | Abandoned React 16 legacy wrapper; completely incompatible with modern React Server Components and Tailwind |
| **OS-ANIM-08** | `remotion-dev/remotion` | CAT_H | REJ | **FAIL** | **48.4** | REJ discovery priority. Commercial Company License with strict employee count restriction (<= 3 employees) |
| **OS-D2C-08** | `locofy/locofy` | CAT_H | REJ | **FAIL** | **48.4** | REJ discovery priority. Closed proprietary SaaS platform; no public repository, no open integration API |

---

## 3. Exclusion Rationale Summary

1. **Commercial Redistribution Prohibitions (`OS-MKT-08` Aceternity, `OS-D2C-08` Locofy):** Proprietary terms forbid redistributing, reselling, or embedding components into open developer tools.
2. **Employee Threshold License Restrictions (`OS-ANIM-08` Remotion):** Remotion Company License imposes restrictive headcount caps (<= 3 employees) that contradict open-core redistribution.
3. **Severe Maintenance Abandonment (`OS-DASH-05` React-Grid-Layout, `OS-VREG-04` Loki, `OS-VREG-05` BackstopJS, `OS-DASH-08` Tabler React):** Inactive maintainers, broken dependencies against modern React 18/19, and unmitigated security vulnerabilities.
4. **Rigid Vendor Lock-In (`OS-COMP-15` SaaS UI):** Crippled community edition with aggressive Pro tier upsell gating.
