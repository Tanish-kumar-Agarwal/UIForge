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

## 3. Qualified Generated-Output Ownership & Licensing Policy

A critical question among developers adopting autonomous AI frontend engineering tools is: **"What is the legal status and ownership of code that UIForge emits?"**

Rather than making an overbroad and legally inaccurate "100% user ownership guarantee," UIForge provides a transparent, legally segmented **Qualified Output Ownership and Licensing Policy (`LDEC-03`)**:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        OUTPUT OWNERSHIP & LICENSING SEGMENTATION                       │
├──────────────────────────┬──────────────────────────┬──────────────────────────────────┤
│ Output Layer             │ Copyright Status         │ Governing Terms & User Rights    │
├──────────────────────────┼──────────────────────────┼──────────────────────────────────┤
│ 1. UIForge Claim         │ Formally Disclaimed      │ UIForge claims zero copyright,   │
│                          │                          │ zero encumbrance, and zero fees. │
├──────────────────────────┼──────────────────────────┼──────────────────────────────────┤
│ 2. Original Templates /  │ UIForge Original Source  │ Licensed to user under MIT;      │
│    Scaffolding Code      │                          │ unrestricted commercial usage.   │
├──────────────────────────┼──────────────────────────┼──────────────────────────────────┤
│ 3. Ingested Third-Party  │ Upstream Authors         │ Licensed under upstream MIT /    │
│    Registry Components   │ (shadcn, Magic UI, etc.) │ Apache-2.0; retain author notice.│
├──────────────────────────┼──────────────────────────┼──────────────────────────────────┤
│ 4. Bundled Typography &  │ Third-Party Licensors    │ Fonts under OFL-1.1; Brand SVGs  │
│    Brand SVG Icons       │ (Rasmus, Vercel, Brands) │ subject to brand owner trademarks│
├──────────────────────────┼──────────────────────────┼──────────────────────────────────┤
│ 5. Raw AI-Generated Code │ Public Domain /          │ Lacks human authorship under US  │
│    Synthesis             │ Uncopyrightable (USCO)   │ Copyright law; user owns edits.  │
├──────────────────────────┼──────────────────────────┼──────────────────────────────────┤
│ 6. User Creative Input   │ User / Enterprise        │ Prompts, creative selection,     │
│    & Human Modifications │                          │ compilation, and custom code.    │
└──────────────────────────┴──────────────────────────┴──────────────────────────────────┘
```

### 3.1 What UIForge Can Contractually Disclaim
UIForge, its maintainers, and contributors formally disclaim all copyright ownership, license encumbrances, and royalty claims on their own behalf regarding output generated by UIForge CLI and autonomous agents.

### 3.2 What UIForge Can Grant
UIForge grants the user a perpetual, worldwide, royalty-free permissive license (MIT) to use, modify, and distribute any original scaffolding or template code authored by UIForge.

### 3.3 What UIForge Cannot Grant
UIForge cannot grant original authorship or exclusive copyright ownership of third-party open-source components, cannot waive third-party trademark rights in brand logos, and cannot cure international copyright ambiguities regarding raw machine-generated LLM outputs.

---

## 4. Contributor Governance: DCO 1.1 & Inbound=Outbound Licensing

To ensure that UIForge's open-source codebase maintains an unbroken, legally defensible chain of title without discouraging community participation, UIForge evaluated contributor governance models:

- **Corporate CLA (Contributor License Agreement)**:
  - Requires contributors to sign legal contracts transferring or exclusively licensing their copyright.
  - *Disadvantage*: Creates significant friction; discourages casual contributors; requires legal review by contributor employers.
- **Developer Certificate of Origin (DCO 1.1)**:
  - The model pioneered by Linus Torvalds for the Linux kernel and adopted by Git, Docker, and Kubernetes.
  - Contributors certify that they wrote the code or have the right to submit it by appending a simple `Signed-off-by: Author Name <email>` trailer to Git commits.

### 4.1 Inbound = Outbound Licensing Rule (`LDEC-09`)
DCO is an affirmation of title, not a copyright assignment. Contributors retain their copyright. For DCO to be legally complete, UIForge couples it with an explicit **Inbound = Outbound Licensing Policy**:
- Contributions to `@uiforge/core` and `@uiforge/agent-sdk` are contributed under **Apache-2.0**.
- Contributions to `@uiforge/cli` and `@uiforge/mcp-server` are contributed under **MIT**.
- Every commit must carry a valid `Signed-off-by` trailer verified by automated CI checks.

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
