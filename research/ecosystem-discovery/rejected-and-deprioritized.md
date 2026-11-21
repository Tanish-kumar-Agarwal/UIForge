# UIForge Research — Rejected & Deprioritized Candidates

**Document ID:** `UIF-OS-009`  
**Phase:** 02.1 — Open-Source Ecosystem Discovery & Intelligence  
**Status:** Exclusion Log & Architectural Decision Records  
**Date:** November 2026  

---

## 1. Overview of Excluded Technologies

In engineering research, deciding what **not** to build or integrate is as critical as selecting foundational dependencies. From the initial survey of 125 candidates, **17 candidates** were formally rejected or deprioritized for core UIForge integration.

Every rejection is supported by traceable technical or legal evidence.

---

## 2. Catalog of Rejected Candidates

### 2.1 Aceternity UI (`OS-MKT-08`)
- **Category:** Landing Page & Marketing Components
- **Stated License / Status:** Website offers copy-paste components; commercial Terms of Service.
- **Reason for Rejection:** **Commercial Redistribution Restrictions**. Official Terms of Service explicitly prohibit bundling, packaging, or redistributing Aceternity UI components inside developer CLI tools, public registries, or competing component products.
- **UIForge Decision:** **REJECTED from distribution**. The research team may analyze Aceternity's visual designs for aesthetic trend research, but zero Aceternity code will be ingested into UIForge registries.

### 2.2 GreenSock Animation Platform / GSAP (`OS-ANIM-04`)
- **Category:** Animation & Motion Ecosystems
- **Stated License / Status:** Custom GreenSock "Standard License" with paid "Business Green" commercial tier.
- **Reason for Rejection:** **Commercial Licensing Incompatibility**. GSAP requires a paid commercial license if incorporated into products that charge multiple customers. This conflicts with UIForge's permissive open-core MIT/Apache-2.0 distribution model.
- **UIForge Decision:** **REJECTED**. Motion (`motiondivision/motion`) adopted as the 100% MIT-licensed declarative physics alternative.

### 2.3 Pa11y (`OS-A11Y-05`)
- **Category:** Accessibility Utilities
- **Stated License / Status:** GNU Lesser General Public License v3.0 (LGPL-3.0).
- **Reason for Rejection:** **Reciprocal Copyleft Risk & Architectural Redundancy**. Pa11y is an external CLI wrapper around HTML CodeSniffer and axe-core. Incorporating LGPL-3.0 tooling introduces compliance complexity for enterprise users without providing any technical capability beyond what `@axe-core/playwright` provides natively.
- **UIForge Decision:** **REJECTED as Dependency**. `@axe-core/playwright` adopted directly under MPL-2.0.

### 2.4 Continue IDE Extension Repository (`OS-AGNT-06`)
- **Category:** AI Agent Skills & Developer Ecosystem
- **Stated License / Status:** Apache-2.0 (`github.com/continuedev/continue`).
- **Reason for Rejection:** **Archived / Inactive Upstream Repository**. The Continue repository was officially archived and marked read-only following the team's acquisition by Cursor.
- **UIForge Decision:** **DEPRIORITIZED to Reference Only**. Useful for studying historical IDE MCP client implementations, but unsuitable as an active integration partner.

### 2.5 Remotion (`OS-ANIM-08`)
- **Category:** Animation & Video Creation
- **Stated License / Status:** Custom "Remotion License" (free for individuals/small business, paid for companies with >3 employees).
- **Reason for Rejection:** **Domain Scope Creep & Commercial Restrictions**. Remotion is designed for programmatic MP4/WebM video rendering in React, which falls outside UIForge's core frontend UI intelligence mission.
- **UIForge Decision:** **REJECTED**.

### 2.6 Locofy.ai (`OS-D2C-08`)
- **Category:** Design-to-Code Platforms
- **Stated License / Status:** Proprietary Commercial SaaS.
- **Reason for Rejection:** **Closed Ecosystem**. Does not offer an open-source engine, local-first CLI, or open MCP server.
- **UIForge Decision:** **REJECTED**.

### 2.7 Selenium WebDriver (`OS-BROW-07`)
- **Category:** Browser Testing & Execution
- **Stated License / Status:** Apache-2.0.
- **Reason for Rejection:** **Excessive Execution Latency & Heavyweight Infrastructure**. Selenium relies on standalone WebDriver server processes with slow startup times (>1.5s vs. <150ms for Playwright).
- **UIForge Decision:** **REJECTED**. Playwright selected as the modern, lightweight headless standard.

### 2.8 Monolithic UI Libraries as Hard Dependencies (MUI, Ant Design, Mantine)
- **Candidates:** `OS-COMP-05`, `OS-COMP-07`, `OS-COMP-08`
- **Reason for Deprioritization:** **Architectural Anti-Pattern**. Forcing a monolithic npm component library into UIForge Core violates Principle 1 ("Do not force every project to use a single library").
- **UIForge Decision:** **DEPRIORITIZED to Reference / AST Scanners Only**. UIForge's AST analyzer will recognize when an existing repository uses MUI or Ant Design, but UIForge Core will never bundle them as mandatory dependencies.
