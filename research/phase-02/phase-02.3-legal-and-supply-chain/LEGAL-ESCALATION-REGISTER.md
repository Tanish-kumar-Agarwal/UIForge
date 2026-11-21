# UIFORGE — LEGAL & IP COUNSEL ESCALATION REGISTER
# Register of Issues Requiring Independent Legal Counsel Review

**Document ID:** `UIF-PH02.3-LEGAL-ESCALATIONS`  
**Phase:** Phase 02.3 Remediation  
**Date:** November 21, 2026  

---

## 1. Executive Summary

This register documents the 10 intellectual property, copyright, and commercial licensing issues identified across the 125 candidate universe that require formal external legal counsel review before commercial distribution.

---

## 2. Master Escalations Table

| Candidate ID | Project / Repository | SPDX License | Escalation Issue Type | Legal Risk Summary |
| :--- | :--- | :--- | :--- | :--- |
| `OS-MKT-08` | `aceternity/ui` | `Commercial` | `COMMERCIAL_REDISTRIBUTION_PROHIBITION` | Commercial Terms of Service strictly prohibit redistribution or packaging in developer tools. REJECTED. |
| `OS-ANIM-04` | `greensock/gsap` | `LicenseRef-GSAP-Standard` | `COMPETITOR_RESTRICTION_AND_REDISTRIBUTION_REVIEW` | Webflow Standard License (April 30, 2025) grants 100% free commercial use for web/app development, but prohibits use in tools that build visual animations without code competing with Webflow visual canvas. Scenarios distinguished: (1) Internal tool use: Permitted. (2) Emitting user-project dependency (`import gsap`): Permitted. (3) Source copying into UIForge registry: Restricted/Prohibited. (4) Bundling binary into CLI: Prohibited. Counsel review required to formalize CLI dependency emission boundary. |
| `OS-ANIM-08` | `remotion-dev/remotion` | `Remotion Commercial` | `COMMERCIAL_REDISTRIBUTION_PROHIBITION` | Commercial license required for cloud/server-side rendering. REJECTED. |
| `OS-TYPO-04` | `rsms/inter` | `OFL-1.1` | `FONT_LICENSING_AND_RFN_REVIEW` | OFL-1.1 conditions: Do not sell font software standalone; bundle OFL.txt notice; respect explicitly declared Reserved Font Name "Inter" if modified (RFNs require explicit designation in copyright notice). RFC 8081 defines the font top-level media type and associated font media types—not a general network-configuration requirement that every font distribution must satisfy. |
| `OS-TYPO-05` | `vercel/geist-font` | `OFL-1.1` | `FONT_LICENSING_AND_RFN_REVIEW` | OFL-1.1 conditions: Do not sell font software standalone; bundle OFL.txt notice; respect explicitly declared Reserved Font Name "Geist" if modified. RFC 8081 defines font media types, not an OFL copyright obligation. |
| `OS-A11Y-01` | `dequelabs/axe-core` | `MPL-2.0` | `WEAK_COPYLEFT_LARGER_WORK_NOTICE` | MPL-2.0 obligations under Section 3: Covered Software source code must be made available under MPL-2.0; Executable Form distribution requires notice of source availability; Larger Work combination permits separate license provided MPL rights in covered code are preserved. Classification: ELIGIBLE_WITH_FILE_LEVEL_MPL_OBLIGATIONS (provisional engineering disposition, not a legal clearance certificate). |
| `OS-A11Y-05` | `pa11y/pa11y` | `LGPL-3.0` | `COPYLEFT_SUBPROCESS_BOUNDARY` | Subprocess execution boundary only (`child_process.fork`); do not import into library bundles; external legal counsel review required to confirm subprocess insulates from LGPL copyleft obligations. |
| `OS-D2C-08` | `locofy/locofy` | `Commercial` | `COMMERCIAL_REDISTRIBUTION_PROHIBITION` | Closed-source commercial SaaS. REJECTED. |
| `OS-AGNT-03` | `anthropics/claude-code` | `Proprietary` | `PROPRIETARY_TERMS_REVIEW` | Reference-only interaction via MCP; no source code bundling authorized. |
| `OS-AGNT-04` | `anysphere/cursor` | `Proprietary` | `PROPRIETARY_TERMS_REVIEW` | External commercial IDE client; interface via standard MCP protocol only. |

---

## 3. Governance Policy

In accordance with UIForge Governance Protocol: Technical readiness does NOT constitute legal authorization. Candidates with pending legal reviews cannot receive unconditional approval for binary source redistribution until external counsel sign-off is completed.
