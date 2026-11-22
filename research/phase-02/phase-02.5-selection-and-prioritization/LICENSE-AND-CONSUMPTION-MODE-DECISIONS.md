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

### 2.1 axe-core (`OS-A11Y-01`) — User-Managed External Tool Boundary
- **Consumption Mode:** `EXTERNAL_TOOL` (`ELIGIBLE_WITH_RESTRICTIONS`, `allowed: true`).
- **Architectural Isolation:** UIForge invokes user-installed `@axe-core/cli` or `@axe-core/playwright` via out-of-process test runners. UIForge does **not** bundle, redistribute, or host executable binaries.
- **Legal Caveat:** This architectural boundary isolates binary redistribution risks but does not constitute unconditional legal clearance. The flag `counselReviewRequired: true` is preserved pending formal sign-off from IP counsel.

### 2.2 pa11y (`OS-A11Y-05`) — Prudent Copyleft Gating
- **Consumption Mode:** `EXTERNAL_TOOL` (`PENDING_REVIEW`, `allowed: false`, Tier 4 Deferred).
- **Reason:** Governed by LGPL-3.0. Direct dynamic linking carries copyleft risk. Gated pending legal counsel review (`LEG-02`).

### 2.3 GSAP (`OS-ANIM-04`) — Webflow Commercial License Scoping
- **Consumption Mode:** `DEPENDENCY` (`ELIGIBLE_WITH_RESTRICTIONS`, `allowed: true`, Tier 2 Optional Plugin Emission).
- **Condition:** Scoped to Webflow's April 30, 2025 Standard License terms. The prohibited-use clause strictly targets competing no-code visual animation builders. UIForge's programmatic developer-facing React code generation is permitted. GSAP is strictly excluded from Tier 0 Core Foundation.

### 2.4 Every Layout (`OS-LAYT-08`) — Authored Content Protection Boundary
- **Consumption Mode:** `REFERENCE_ONLY` (`ELIGIBLE_WITH_RESTRICTIONS`, `allowed: true`, Tier 3 Reference).
- **Condition:** Studying general, uncopyrightable CSS layout concepts (The Stack, The Cluster, The Reel) is permissible as architectural research. Direct copying of authored book text, diagrams, and component code is strictly prohibited under `LIC-EVERY-LAYOUT-COMMERCIAL`. UIForge makes no unconditional legal guarantee of non-infringement without clean-room engineering verification.

### 2.5 SIL OFL 1.1 Fonts (Inter `OS-TYPO-04`, Geist `OS-TYPO-05`)
- **Consumption Mode:** `ASSET_REDISTRIBUTION` (`ELIGIBLE_WITH_RESTRICTIONS`, `allowed: true`, Tier 0).
- **Condition:** Both typefaces carry Reserved Font Name declarations ("with Reserved Font Name Inter", "with Reserved Font Name Geist"). Distributed unchanged as unmodified font binaries accompanied by the full OFL 1.1 license text.
