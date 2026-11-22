# UIForge Phase 02.5: License & Consumption Mode Decisions

**Document ID:** `UIF-PH02.5-LICENSE-AND-CONSUMPTION-MODE-DECISIONS`  
**Classification:** Legal Governance, IP Clearance & Permitted Mode Matrix  
**Status:** Certified / Complete  
**Date:** November 2026  

---

## 1. Six-Mode Consumption Governance Matrix

Adoption decisions strictly enforce the six canonical consumption modes established in Phase 02.4:

| Consumption Mode | Primary Application Scope | Mandatory Legal & Governance Restrictions |
| :--- | :--- | :--- |
| **Mode 1: REFERENCE_ONLY** | Architectural research, pattern discovery, specification study | Automated scraping and source code copying are strictly prohibited. Commercial terms respected. |
| **Mode 2: DEPENDENCY** | Direct `import` as runtime or development dependency | Governed by package license (MIT, Apache-2.0, BSD-3-Clause). Retain copyright headers. |
| **Mode 3: SOURCE_COPY** | Code emitted directly into user projects (shadcn model) | Permissive open-source licenses only. Original author copyright headers must be preserved in file comments. |
| **Mode 4: ASSET_REDISTRIBUTION** | Bundling fonts, icons, or vector media | Governed by asset-specific licenses (SIL OFL 1.1). Must preserve Reserved Font Name (RFN) notices. |
| **Mode 5: EXTERNAL_TOOL** | Out-of-process CLI invocation or subprocess execution | UIForge does NOT bundle or redistribute third-party binaries. Invokes user-managed local installation. |
| **Mode 6: TEMPLATE_ADAPTATION** | Scaffold project starter kits or page templates | Retain original attribution in project README and license notices. |

---

## 2. Special Governance Cases

### 2.1 axe-core (`OS-A11Y-01`) — User-Managed External Tool Boundary & Legal Clearance Gate (C05)
- **Consumption Mode:** `EXTERNAL_TOOL` (`ELIGIBLE_WITH_RESTRICTIONS`, `allowed: true`, `counselReviewRequired: true`).
- **Architectural Isolation Strategy:** UIForge invokes user-installed `@axe-core/cli` via out-of-process subprocess execution over standard stdio JSON streams. UIForge does **not** bundle, vendor, or redistribute executable axe-core binaries.
- **Legal Compliance Boundary:** While the subprocess boundary provides strong architectural decoupling, it does **not** automatically eliminate MPL-2.0 copyleft obligations in every hypothetical distribution or hosted architecture. Legal clearance from qualified IP counsel remains an **explicit release gate** before shipping any bundled, hosted, SaaS, or redistributed delivery model.
- **Package & Integration Separation:**
  1. `axe-core`: Core rule engine script / npm library (governed by MPL-2.0).
  2. `@axe-core/playwright`: Headless browser test runner adapter for CI/local verification (MPL-2.0).
  3. `@axe-core/cli`: Out-of-process command-line executable invoked via user environment.

### 2.2 pa11y (`OS-A11Y-05`) — Prudent Copyleft Gating
- **Consumption Mode:** `EXTERNAL_TOOL` (`PENDING_REVIEW`, `allowed: false`, Tier 4 Deferred).
- **Reason:** Governed by LGPL-3.0. Direct dynamic linking carries copyleft risk. Gated pending legal counsel review (`LEG-02`, `counselReviewRequired: true`).

### 2.3 GSAP (`OS-ANIM-04`) — Webflow Commercial License Scoping
- **Consumption Mode:** `DEPENDENCY` (`ELIGIBLE_WITH_RESTRICTIONS`, `allowed: true`, Tier 2 Optional Plugin Emission).
- **Condition:** Scoped to Webflow's April 30, 2025 Standard License terms. The prohibited-use clause strictly targets competing no-code visual animation builders. UIForge's programmatic developer-facing React code generation is permitted. GSAP is strictly excluded from Tier 0 Core Foundation.

### 2.4 Every Layout (`OS-LAYT-08`) — Authored Content Protection Boundary
- **Consumption Mode:** `REFERENCE_ONLY` (`ELIGIBLE_WITH_RESTRICTIONS`, `allowed: true`, Tier 3 Reference).
- **Condition:** Studying general, uncopyrightable CSS layout concepts (The Stack, The Cluster, The Reel) is permissible as architectural research. Direct copying of authored book text, diagrams, and component code is strictly prohibited under `LIC-EVERY-LAYOUT-COMMERCIAL`. UIForge makes no unconditional legal guarantee of non-infringement without clean-room engineering verification.

### 2.5 SIL OFL 1.1 Fonts (Inter `OS-TYPO-04`, Geist `OS-TYPO-05`)
- **Consumption Mode:** `ASSET_REDISTRIBUTION` (`ELIGIBLE_WITH_RESTRICTIONS`, `allowed: true`, Tier 0).
- **Condition:** Both typefaces carry Reserved Font Name declarations ("with Reserved Font Name Inter", "with Reserved Font Name Geist"). Distributed unchanged as unmodified font binaries accompanied by the full OFL 1.1 license text.

### 2.6 Remotion (`OS-ANIM-08`) — Tiered Headcount Commercial Licensing (C02)
- **Consumption Mode:** `DEPENDENCY` (`RESTRICTED`, Tier 5 Excluded).
- **License Terms:** Remotion's license is not a blanket commercial prohibition. It permits free, unlimited commercial use for individuals and small entities of up to 3 people. Entities with >3 employees must purchase a paid commercial Company License.
- **Architectural Scope Misfit:** Remotion is excluded based on Gate G5 (Product and Architectural Fit): it is a specialized programmatic video rendering and composition engine (HTML/CSS to MP4 via headless Chromium/FFmpeg), whereas UIForge's mission is web UI design-to-code generation.
