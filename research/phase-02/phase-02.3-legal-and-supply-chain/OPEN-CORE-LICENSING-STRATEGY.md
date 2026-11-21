# UIForge Licensing Strategy — Open-Core Architecture, Intellectual Property & Jurisdictional Analysis

**Document ID:** `UIF-PH02.3-LIC-STRATEGY`  
**Phase:** 02.3 — Master Legal, Licensing, Intellectual Property & Software Supply-Chain Audit  
**Classification:** Canonical Open-Core Licensing Strategy & International IP Standard  
**Date:** November 2026  
**Status:** Complete Architectural & Legal Baseline  
**Auditor Lead:** Principal Open-Source Licensing Architect & Commercial Licensing Analyst  

---

## 1. Executive Summary & Open-Core Mission

UIForge operates on an **Open-Core Commercial Architecture**. Our licensing model must achieve three simultaneous objectives:
1. **Frictionless Developer Adoption**: Ensure that individual developers, startup teams, and open-source contributors can install, integrate, and extend UIForge without legal hesitation.
2. **Enterprise Patent & IP Defense**: Provide Fortune 500 enterprises with ironclad legal certainty, express patent grants, and clear boundaries between open-source tools and proprietary customer code.
3. **Sustainable Commercialization**: Establish a protected commercial boundary for UIForge Studio, multi-tenant fleet management, and cloud orchestration services.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        UIFORGE OPEN-CORE LICENSING ARCHITECTURE                        │
├────────────────────┬────────────────────┬───────────┬──────────────────────────────────┤
│ Subsystem / Layer  │ Target Package     │ License   │ Strategic & Legal Rationale      │
├────────────────────┼────────────────────┼───────────┼──────────────────────────────────┤
│ Core Engine        │ @uiforge/core      │ Apache-2.0│ Express patent grant (Sec. 3);   │
│                    │                    │           │ enterprise anti-troll defense.   │
├────────────────────┼────────────────────┼───────────┼──────────────────────────────────┤
│ Developer CLI      │ @uiforge/cli       │ MIT       │ Zero friction; universal global  │
│                    │                    │           │ developer CLI adoption.          │
├────────────────────┼────────────────────┼───────────┼──────────────────────────────────┤
│ Agent SDK          │ @uiforge/agent-sdk │ Apache-2.0│ Patent protection for autonomous │
│                    │                    │           │ tool calling & orchestration.    │
├────────────────────┼────────────────────┼───────────┼──────────────────────────────────┤
│ MCP Server         │ @uiforge/mcp-server│ MIT       │ Alignment with Anthropic MCP     │
│                    │                    │           │ ecosystem norms.                 │
├────────────────────┼────────────────────┼───────────┼──────────────────────────────────┤
│ Component Registry │ Public Templates   │ MIT       │ Unencumbered code copying;       │
│ (Mode 3 Copying)   │ (registry.json)    │           │ zero customer IP restrictions.   │
├────────────────────┼────────────────────┼───────────┼──────────────────────────────────┤
│ Generated Output   │ Customer Codebase  │ UNRESTRICT│ Customers hold 100% ownership    │
│                    │ (JSX, CSS, Tokens) │ (Customer)│ of generated project output.     │
├────────────────────┼────────────────────┼───────────┼──────────────────────────────────┤
│ UIForge Studio     │ Cloud Platform /   │ Commercial│ Proprietary SaaS / Enterprise    │
│ (Hosted / On-Prem) │ Fleet Dashboard    │ / BSL 1.1 │ multi-tenant collaboration.      │
└────────────────────┴────────────────────┴───────────┴──────────────────────────────────┘
```

---

## 2. Comparative Evaluation of Licensing Models

UIForge evaluated four open-source and source-available licensing models across its subsystem portfolio:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        COMPARATIVE LICENSING EVALUATION                                │
├─────────────────┬───────────┬─────────────┬───────────┬────────────────────────────────┤
│ Feature         │ MIT       │ Apache-2.0  │ MPL-2.0   │ AGPL-3.0                       │
├─────────────────┼───────────┼─────────────┼───────────┼────────────────────────────────┤
│ Copyleft Scope  │ None      │ None        │ File-level│ Whole-project + Network trigger│
│ Express Patents │ No        │ Yes (Sec. 3)│ Yes       │ Implied                        │
│ Notice Mandate  │ Header    │ NOTICE File │ File head │ Source code offer via network  │
│ Commercial SaaS │ Permitted │ Permitted   │ Permitted │ Compels SaaS source disclosure │
│ Enterprise Trust│ High      │ Very High   │ Medium    │ Extremely Low (Banned by corps)│
└─────────────────┴───────────┴─────────────┴───────────┴────────────────────────────────┘
```

### 2.1 Why AGPL-3.0 Was Firmly Rejected
While AGPL-3.0 is popular among some developer-tool vendors seeking to prevent cloud provider resale, it is an **anti-adoption poison pill** in enterprise settings. Major technology enterprises (Google, Microsoft, Amazon, JPMorgan) maintain strict global bans on AGPL-3.0 code inside enterprise networks. Placing AGPL-3.0 on UIForge Core or CLI would disqualify UIForge from enterprise adoption.

### 2.2 Why Apache-2.0 for Core and Agent SDK (`LDEC-01`)
Apache-2.0 provides the gold standard for foundational software infrastructure:
1. **Section 3 Patent Grants**: Contributor patent claims are licensed royalty-free.
2. **Defensive Termination**: Protects UIForge and its community from aggressive patent assertion.
3. **Enterprise Compliance Familiarity**: Unconditionally approved by corporate OSPOs worldwide.

---

## 3. The Generated Artifact Ownership Guarantee

A critical anxiety among developers adopting AI code generation tools is: **"Who owns the code that UIForge generates?"**

UIForge provides an explicit, legally binding **Artifact Ownership Covenant**:

> **UIForge Artifact Ownership Covenant**:
> UIForge, its contributors, and copyright holders claim **zero copyright, zero licensing restrictions, and zero royalties** over any source code, components, CSS styles, design tokens, AST transformations, or configuration files generated or copied into customer repositories by `@uiforge/cli`, `@uiforge/agent-sdk`, or UIForge autonomous agents.
> 
> The customer or developer possesses 100% exclusive copyright ownership of all generated application code, subject only to the preservation of upstream third-party open-source attribution headers where preexisting open-source templates were ingested.

This guarantee eliminates any risk of UIForge attempting to claim derivative work rights over customer intellectual property.

---

## 4. Contributor Governance: DCO vs CLA

To ensure that UIForge's open-source codebase maintains an unbroken, legally defensible chain of title without discouraging community participation, UIForge evaluated contributor governance models:

- **Corporate CLA (Contributor License Agreement)**:
  - Requires contributors to sign legal contracts transferring or exclusively licensing their copyright.
  - *Disadvantage*: Creates significant friction; discourages casual contributors; requires legal review by contributor employers.
- **Developer Certificate of Origin (DCO - 1.1)**:
  - The model pioneered by Linus Torvalds for the Linux kernel and adopted by Git, Docker, and Kubernetes.
  - Contributors certify that they wrote the code or have the right to submit it by appending a simple `Signed-off-by: Author Name <email>` trailer to Git commits.

### 4.1 Decision (`LDEC-09`)
UIForge adopts the **Developer Certificate of Origin (DCO 1.1)** enforced via automated GitHub pull request checks. This guarantees that all incoming contributions are legally cleared without imposing cumbersome legal contracts on community developers.

---

## 5. Multi-Jurisdictional Intellectual Property Analysis

UIForge's international development footprint requires compliance across three major legal jurisdictions:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        JURISDICTIONAL IP COMPLIANCE MATRIX                             │
├───────────────────┬────────────────────────────────────────────────────────────────────┤
│ Jurisdiction      │ Key Statutory Framework & UIForge Compliance Strategy              │
├───────────────────┼────────────────────────────────────────────────────────────────────┤
│ **India**         │ **Indian Copyright Act, 1957**                                     │
│                   │ - *Section 14*: Exclusive economic rights in computer software.    │
│                   │ - *Section 17*: Work-for-hire doctrine; employer owns copyright    │
│                   │   created under contract of service. Explicit assignment required. │
│                   │ - *Section 57*: Inalienable Moral Rights (paternity & integrity).  │
│                   │   UIForge preserves author attribution headers to satisfy Sec. 57. │
├───────────────────┼────────────────────────────────────────────────────────────────────┤
│ **United States** │ **US Copyright Act (17 U.S.C.)**                                   │
│                   │ - *17 U.S.C. § 102(b)*: Exclusion of ideas, functional systems, and│
│                   │   data formats. Validates clean-room token schema implementations. │
│                   │ - *17 U.S.C. § 106*: Exclusive reproduction and adaptation rights. │
│                   │ - *17 U.S.C. § 201(b)*: Work made for hire statutory boundaries.   │
├───────────────────┼────────────────────────────────────────────────────────────────────┤
│ **European Union**│ **EU Software Directive (Directive 2009/24/EC)**                   │
│                   │ - *Article 1(2)*: Protection covers expression, not ideas/logic.   │
│                   │ - *Articles 5 & 6*: Mandatory decompilation and interoperability   │
│                   │   rights that cannot be contractually waived.                      │
│                   │ - *EU Cyber Resilience Act (CRA)*: Mandatory SBOM & vulnerability  │
│                   │   handling for commercial software products.                       │
└───────────────────┴────────────────────────────────────────────────────────────────────┘
```

### 5.1 Special Focus: Moral Rights under Indian Law (Section 57)
Under Section 57 of the Indian Copyright Act, an author retains the moral right to claim authorship of their work (Right of Paternity) even after transferring economic copyright. UIForge's automated preservation of original author credits and upstream repository URLs in generated component headers directly protects against moral rights infringement claims.

---

## 6. UIForge Studio & Commercial Dual-Licensing Boundary

UIForge Studio represents the commercial offering that sustains the open-core project:

```
┌────────────────────────────────────────────────────────────────────────┐
│               OPEN-CORE VS COMMERCIAL BOUNDARY SEPARATION              │
├───────────────────────────────────┬────────────────────────────────────┤
│ Open-Core (Free / Apache-2.0 / MIT)│ Commercial Studio (Proprietary)   │
├───────────────────────────────────┼────────────────────────────────────┤
│ - @uiforge/core runtime engine    │ - Multi-tenant team workspace      │
│ - @uiforge/cli developer tooling  │ - Real-time collaborative canvas   │
│ - @uiforge/agent-sdk library      │ - Centralized enterprise analytics │
│ - @uiforge/mcp-server protocol    │ - Cloud visual regression hosting  │
│ - Public component registry       │ - SSO / SAML / RBAC access control │
│ - In-memory AST transformers      │ - Private enterprise registry sync │
└───────────────────────────────────┴────────────────────────────────────┘
```

The architectural boundary between Open-Core and Studio is maintained through standard REST and GraphQL APIs. UIForge Core functions as a 100% complete, fully operational developer tool on its own, ensuring the open-source community is never crippled to force commercial upgrades.

---

## 7. Conclusions & Governance Directives

1. **Subsystem Licenses**: Standardize `@uiforge/core` on Apache-2.0, `@uiforge/cli` on MIT, and generated components on unencumbered MIT.
2. **Artifact Covenant**: Prominently display the zero-ownership guarantee for user-generated code across documentation and CLI banners.
3. **DCO Enforcement**: Enforce DCO 1.1 `Signed-off-by` git commit trailers on all internal and external pull requests.
