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
| `OS-ANIM-04` | `greensock/gsap` | `LicenseRef-GSAP-Standard` | `COMPETITOR_RESTRICTION_REVIEW` | Webflow Standard License (April 30, 2025) grants 100% free commercial use for web/app development. Prohibits use in tools that build visual animations without code competing with Webflow visual canvas. External counsel review required to formally verify UIForge code generator boundary. |
| `OS-ANIM-08` | `remotion-dev/remotion` | `Remotion Commercial` | `COMMERCIAL_REDISTRIBUTION_PROHIBITION` | Commercial license required for cloud/server-side rendering. REJECTED. |
| `OS-TYPO-01` | `tailwindlabs/tailwindcss-typography` | `OFL-1.1` | `FONT_LICENSING_AND_RFN_REVIEW` | OFL-1.1 conditions: Do not sell font software standalone; bundle OFL.txt notice; respect explicitly declared Reserved Font Name "Inter" if modified (RFNs require explicit designation in copyright notice). RFC 8081 MIME typing is a transport detail, not a license obligation. |
| `OS-TYPO-02` | `seek-oss/capsize` | `OFL-1.1` | `FONT_LICENSING_AND_RFN_REVIEW` | OFL-1.1 conditions: Do not sell font software standalone; bundle OFL.txt notice; verify if upstream font declares explicit Reserved Font Name. RFC 8081 MIME typing is a transport detail, not a license obligation. |
| `OS-A11Y-01` | `dequelabs/axe-core` | `MPL-2.0` | `WEAK_COPYLEFT_LARGER_WORK_NOTICE` | MPL-2.0 weak copyleft obligations under Section 3.3: preserve notices in axe-core modules; distribute MPL-2.0 license text; make modified axe-core source available if altered. Distinct from permissive licenses. |
| `OS-A11Y-05` | `pa11y/pa11y` | `LGPL-3.0` | `COPYLEFT_SUBPROCESS_BOUNDARY` | Subprocess execution boundary only (`child_process.fork`); do not import into library bundles; external legal counsel review required to confirm subprocess insulates from LGPL copyleft obligations. |
| `OS-D2C-08` | `locofy/locofy` | `Commercial` | `COMMERCIAL_REDISTRIBUTION_PROHIBITION` | Closed-source commercial SaaS. REJECTED. |
| `OS-AGNT-03` | `anthropics/claude-code` | `Proprietary` | `PROPRIETARY_TERMS_REVIEW` | Reference-only interaction; no source code bundling authorized. |
| `OS-AGNT-04` | `anysphere/cursor` | `Proprietary` | `PROPRIETARY_TERMS_REVIEW` | External commercial IDE client; interface via standard MCP protocol only. |

---

## 3. Governance Policy

In accordance with UIForge Governance Protocol: Technical readiness does NOT constitute legal authorization. Candidates with pending legal reviews cannot receive unconditional approval for binary source redistribution until external counsel sign-off is completed.
