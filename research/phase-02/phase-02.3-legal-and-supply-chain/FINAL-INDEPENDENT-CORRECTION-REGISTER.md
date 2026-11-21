# UIForge Phase 02.3 — Final Independent Audit Correction Register

**Document ID:** `UIF-PH02.3-CORRECTION-REGISTER`  
**Phase:** 02.3 — Master Legal, Licensing, Intellectual Property & Software Supply-Chain Audit  
**Classification:** Canonical Independent Audit Correction Register & Evidence Reconciliation  
**Date:** November 2026  
**Auditor Role:** Independent Legal, IP & Software Supply-Chain Technical Auditor  
**Final Audit Status:** **CONDITIONALLY COMPLETE — OBLIGATIONS AND COUNSEL REVIEW REMAIN**  

---

## 1. Executive Summary & Audit Mandate

This register represents the definitive **Final Independent Audit Correction Pass** for UIForge Phase 02.3.

The prior Phase 02.3 execution report asserted a monolithic "100% Audit Acceptance and Compliance Certification." In an enterprise legal, intellectual property, and software supply-chain context, such an assertion is technically overbroad and legally indefensible:
1. **A documentation audit does not equal implemented runtime compliance**: Proposing release gates, JSON schemas, and Ed25519 signatures is an essential architectural achievement, but it does not establish that production CI/CD pipelines have executed or verified those gates.
2. **A software team cannot grant legal copyright certification**: Open-source licenses create legal obligations that bind downstream users and distributors; architectural boundaries reduce risk but do not grant sovereign legal immunity.
3. **Certain legal questions remain open under global IP jurisprudence**: The copyrightability of AI-generated code, the cross-border defense of nominative fair use for brand trademarks, and the packaging boundaries of LGPL/MPL code under advanced tree-shaking bundlers require qualified external legal counsel review.

This register conducts a rigorous, evidence-driven correction across fourteen critical areas (C01 through C14). Every claim is re-evaluated, classified against our empirical evidence taxonomy, and corrected to reflect defensible technical reality.

---

## 2. Evidence Classification Standard

Every corrected claim in this register is tagged with one or more of the following formal evidence classifications:

- `PRIMARY-SOURCE-VERIFIED`: Directly cross-referenced with canonical legal statutes, official license texts, or official specification documents.
- `PACKAGE-METADATA-VERIFIED`: Confirmed by inspecting published `package.json` manifests, tarball metadata, or registry APIs.
- `VERSION-SPECIFIC-VERIFIED`: Verified against the exact pinned version string and its associated release artifacts.
- `REPOSITORY-INSPECTED`: Directly verified by inspecting files, default branch history, or documentation in the upstream Git repository.
- `PROPOSED-CONTROL`: An architectural policy, workflow rule, or schema that is specified in design but not yet active in production.
- `CONFIGURED-CONTROL`: A configuration file, rule definition, or test harness that exists in the codebase but awaits runtime execution.
- `EXECUTED-TEST`: A control or check that has been run and validated in an active execution environment.
- `NOT-ESTABLISHED`: An assertion or condition that is currently unsupported by empirical test results or legal precedent.
- `EXTERNAL-LEGAL-REVIEW-REQUIRED`: A legal ambiguity, copyleft boundary, or jurisdictional risk requiring a formal opinion from qualified legal counsel.

---

## 3. Master Table of 14 Mandatory Corrections

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        MASTER CORRECTION REGISTER (C01 - C14)                          │
├──────┬───────────────────────────────┬─────────────────────────────┬───────────────────┤
│ ID   │ Correction Topic              │ Prior Flawed Claim          │ Corrected Status  │
├──────┼───────────────────────────────┼─────────────────────────────┼───────────────────┤
│ C01  │ LGPL Process Isolation        │ "Completely prevents LGPL"  │ Mitigates linking;│
│      │ (Pa11y / LDEC-04)             │                             │ distribution open │
├──────┼───────────────────────────────┼─────────────────────────────┼───────────────────┤
│ C02  │ MPL Larger Work Analysis      │ "Unrestricted dependency    │ Conditional safe  │
│      │ (axe-core / LDEC-06)          │ isolation"                  │ harbor; obligations│
├──────┼───────────────────────────────┼─────────────────────────────┼───────────────────┤
│ C03  │ Generated-Code Ownership      │ "100% User Ownership        │ Qualified Policy; │
│      │ (Artifacts / LDEC-03)         │ Guarantee"                  │ 6 segmented layers│
├──────┼───────────────────────────────┼─────────────────────────────┼───────────────────┤
│ C04  │ SLSA v1.0 Claims & Reconcil.  │ "SLSA Level 3 Achieved"     │ Proposed Target;  │
│      │ (Build Track vs Source)       │                             │ Not certified     │
├──────┼───────────────────────────────┼─────────────────────────────┼───────────────────┤
│ C05  │ Simple Icons & Trademarks     │ "Fair use disclaimer cures  │ CC0 copyright only│
│      │ (Brand Logos / LDEC-07)       │ trademark infringement"     │ TM risks remain   │
├──────┼───────────────────────────────┼─────────────────────────────┼───────────────────┤
│ C06  │ Font & GDPR Claims            │ "Google Fonts automatically │ Privacy hygiene;  │
│      │ (Inter, Geist / LDEC-12)      │ violates GDPR"              │ OFL-1.1 RFN rules │
├──────┼───────────────────────────────┼─────────────────────────────┼───────────────────┤
│ C07  │ DCO & Contribution Governance │ "DCO assures legal chain    │ DCO ≠ Assignment; │
│      │ (Signed-off-by / LDEC-09)     │ of title"                   │ Inbound=Outbound  │
├──────┼───────────────────────────────┼─────────────────────────────┼───────────────────┤
│ C08  │ MCP Governance & Package Lic. │ "Anthropic proprietary SDK" │ Open Foundation;  │
│      │ (@modelcontextprotocol/sdk)   │                             │ MIT package lic.  │
├──────┼───────────────────────────────┼─────────────────────────────┼───────────────────┤
│ C09  │ SBOM & Provenance Trust       │ "Schema parsing proves      │ Schema ≠ Trust;   │
│      │ (CycloneDX, SPDX, VEX)        │ trustworthy provenance"     │ PKI / root needed │
├──────┼───────────────────────────────┼─────────────────────────────┼───────────────────┤
│ C10  │ JSON & Compliance Gate Valid. │ "Release gates operational" │ Valid specs;      │
│      │ (5 JSON Files / 10 Gates)     │                             │ Phase 03 runtime  │
├──────┼───────────────────────────────┼─────────────────────────────┼───────────────────┤
│ C11  │ Candidate & Package Coverage  │ "125 identical candidate    │ 119 repos, 6 web, │
│      │ (Entity Reconciliation)       │ packages"                   │ 8 monorepos, specs│
├──────┼───────────────────────────────┼─────────────────────────────┼───────────────────┤
│ C12  │ Security-Control Claims       │ "Complete protection        │ Specific scope    │
│      │ (ignore-scripts, semver, lock)│ against supply chain"       │ & limitations     │
├──────┼───────────────────────────────┼─────────────────────────────┼───────────────────┤
│ C13  │ Air-Gap Terminology           │ "Air-gapped REST/MCP        │ Logical network   │
│      │ (Studio / LDEC-15)            │ communication"              │ boundary; NOT air │
├──────┼───────────────────────────────┼─────────────────────────────┼───────────────────┤
│ C14  │ Acceptance & Readiness        │ "100% Certified Complete &  │ 4 Disaggregated   │
│      │ (Disaggregated Scorecard)     │ Phase 03 Ready"             │ Scorecards (Cond.)│
└──────┴───────────────────────────────┴─────────────────────────────┴───────────────────┘
```

---

## 4. In-Depth Correction Records (C01 through C14)

### C01 — LGPL Process Isolation & Pa11y Distribution Analysis
- **Affected Artifacts & Sections**: `DECISION-REGISTER.md` (LDEC-04), `LICENSE-COMPATIBILITY-AND-OBLIGATIONS.md` (Section 2.4), `MASTER-LEGAL-AND-SUPPLY-CHAIN-AUDIT.md` (Section 3.3).
- **Original Statement**: *"Operating-system process isolation via standard streams (stdio/JSON) constitutes two separate programs under copyright law, completely preventing LGPL copyleft propagation to UIForge Core."*
- **Corrected Statement**: 
  > Subprocess execution over standard operating-system streams (stdio/JSON pipes) prevents in-process memory-space linking, mitigating the primary risk of derivative work creation under copyright law. However, process isolation does **not** automatically extinguish all legal obligations under the GNU Lesser General Public License v3.0 (LGPL-3.0). 
  > 
  > If UIForge distributes, vendors, bundles, or packages Pa11y (e.g. inside a Docker container, CLI binary distribution, or pre-configured installer), Section 4 of LGPL-3.0 and Section 6 of GPL-3.0 still mandate conveying the complete corresponding machine-readable source code of Pa11y, preserving all copyright notices, providing a copy of the LGPL-3.0 and GPL-3.0 texts, and providing installation information where applicable. 
  > 
  > To minimize exposure, UIForge adopts an **Unbundled External Runner Architecture**: UIForge will NOT distribute Pa11y source or binaries. Pa11y must be independently installed by the end-user as an optional external CLI tool. A formal external legal opinion is required before any bundled packaging or commercial distribution occurs.
- **Primary Source**: GNU Lesser General Public License v3.0 (29 June 2007), Sections 4 and 5; FSF Frequently Asked Questions about the GNU Licenses ("If a program is designed specifically to drive another program via pipes...").
- **Exact Package & Version**: `pa11y@10.0.0` (npm).
- **Evidence Classification**: `PACKAGE-METADATA-VERIFIED`, `PRIMARY-SOURCE-VERIFIED`, `EXTERNAL-LEGAL-REVIEW-REQUIRED`.
- **Remaining Uncertainty**: Whether aggressive copyright enforcement bodies could argue that an automated CLI wrapper specifically designed around Pa11y's JSON schema constitutes an interdependent combined work.
- **Release Consequence**: Pa11y is strictly classified as an optional external prerequisite (`Mode 4`). It must never be included in `dependencies` or `optionalDependencies` of `@uiforge/core` or published CLI bundles.

---

### C02 — MPL-2.0 Larger Work Analysis & axe-core Distribution Obligations
- **Affected Artifacts & Sections**: `DECISION-REGISTER.md` (LDEC-06), `LICENSE-COMPATIBILITY-AND-OBLIGATIONS.md` (Section 2.3), `MASTER-LEGAL-AND-SUPPLY-CHAIN-AUDIT.md` (Section 3.2).
- **Original Statement**: *"Under MPL-2.0 Section 3.3 ('Larger Works'), combining unmodified MPL-2.0 files with separate proprietary or Apache-2.0 modules is fully permissible and does not trigger copyleft obligations on surrounding code."*
- **Corrected Statement**:
  > Mozilla Public License 2.0 (MPL-2.0) Section 3.3 permits creating and distributing a "Larger Work" that combines Covered Software with separate files under different license terms. However, Section 3.3 is a **conditional safe harbor**, not an unrestricted exemption.
  > 
  > To remain compliant when distributing `@uiforge/core` and its accessibility adapter:
  > 1. *Notice Requirement (Section 3.1)*: UIForge must inform all recipients that `axe-core` is governed by MPL-2.0 and provide a copy of the license or instructions on how to obtain it.
  > 2. *Source Availability (Section 3.2)*: UIForge must make the Source Code Form of the Covered Software available under the terms of MPL-2.0.
  > 3. *File-Level Modifications (Section 1.10)*: If UIForge authors modify any existing axe-core source file, those modifications remain strictly governed by MPL-2.0.
  > 4. *Bundling Boundary Risk*: If modern JavaScript bundlers (esbuild, Rollup, Webpack) inline functions or mangle axe-core code into a monolithic shared JavaScript chunk, this could blur the boundary between separate files and trigger disputes regarding whether the chunk is a "Modified Version."
- **Primary Source**: Mozilla Public License Version 2.0, Sections 1.10, 3.1, 3.2, and 3.3.
- **Exact Package & Version**: `axe-core@4.14.1` (npm), `@axe-core/playwright@4.10.1` (npm).
- **Evidence Classification**: `PACKAGE-METADATA-VERIFIED`, `VERSION-SPECIFIC-VERIFIED`, `EXTERNAL-LEGAL-REVIEW-REQUIRED`.
- **Remaining Uncertainty**: Impact of advanced code splitting and tree-shaking chunk generation on MPL-2.0 file boundaries.
- **Release Consequence**: Build tools must configure `axe-core` as an external runtime dependency (`external: ['axe-core', '@axe-core/playwright']`). Outbound npm tarballs must include an explicit MPL-2.0 attribution and source offer in `NOTICE`.

---

### C03 — Qualified Generated-Code Ownership & Licensing Policy
- **Affected Artifacts & Sections**: `DECISION-REGISTER.md` (LDEC-03), `OPEN-CORE-LICENSING-STRATEGY.md` (Section 3), `MASTER-LEGAL-AND-SUPPLY-CHAIN-AUDIT.md` (Section 8.1).
- **Original Statement**: *"All generated code, JSX, CSS, tokens, and configurations are 100% owned by the end user/customer, completely unencumbered by UIForge copyright or royalties."*
- **Corrected Statement**:
  > UIForge replaces the absolute "100% User Ownership Guarantee" with an authoritative, legally segmented **Qualified Output Ownership and Licensing Policy**:
  > 
  > 1. **UIForge Contractual Disclaimer**: UIForge, its maintainers, and its corporate contributors formally disclaim all copyright ownership, license encumbrances, and royalty claims on their own behalf regarding output generated by UIForge CLI and autonomous agents.
  > 2. **Original UIForge Template Material**: To the extent that generated output incorporates original templates, layout scaffolds, or helper code authored by UIForge, UIForge grants the user a perpetual, irrevocable, worldwide, royalty-free license under the permissive MIT license.
  > 3. **Upstream Third-Party Registry Source**: When UIForge copies or adapts component source code from upstream repositories (e.g. `shadcn/ui`, `magicui`, `radix-ui`), copyright in that expression remains with the original upstream authors. UIForge cannot legally grant original ownership of third-party copyrighted works; the user receives that code under the upstream author's permissive license (MIT/Apache-2.0), subject to mandatory copyright notice retention.
  > 4. **Licensed Typography & Brand Assets**: Bundled font software (Inter, Geist) remains governed by the SIL Open Font License 1.1 (OFL-1.1). Brand logos (Simple Icons) remain the protected trademarks of their respective corporate owners. The user does not acquire copyright in font software or trademark ownership in brand logos.
  > 5. **Raw AI-Generated Output**: Under prevailing US Copyright Office guidance (March 2023) and international human-authorship doctrines, raw machine-generated text and code lacking human creative input is not copyrightable. The user owns only their original human contributions: creative prompts, structural compilation, architectural selection, and subsequent human modifications.
  > 6. **Unresolved AI Training Data Status**: Evolving global litigation regarding whether LLM training on public codebases infringes upstream licenses cannot be contractually eliminated or indemnified by UIForge.
- **Primary Source**: US Copyright Office, *Copyright Registration Guidance: Works Containing Material Generated by Artificial Intelligence*, 88 FR 16190 (March 16, 2023); 17 U.S.C. §§ 101, 102(b), 106.
- **Evidence Classification**: `PRIMARY-SOURCE-VERIFIED`, `EXTERNAL-LEGAL-REVIEW-REQUIRED`.
- **Remaining Uncertainty**: Ongoing judicial determinations regarding copyrightability and derivative work status of LLM code synthesis in the US, EU, and India.
- **Release Consequence**: CLI banners, license files, and documentation must display the qualified policy; misleading marketing promises of "100% ownership guarantee" must be eliminated.

---

### C04 — SLSA v1.0 Specification Reconciliation & Status of Controls
- **Affected Artifacts & Sections**: `SOFTWARE-SUPPLY-CHAIN-THREAT-MODEL.md` (Sections 1 and 4), `SBOM-AND-PROVENANCE-ARCHITECTURE.md` (Section 5), `MASTER-LEGAL-AND-SUPPLY-CHAIN-AUDIT.md` (Sections 1.1 and 5).
- **Original Statement**: *"Conforming to SLSA Level 3... SLSA v1.0 Level 3 compliance... target SLSA Level 3 achieved."*
- **Corrected Statement**:
  > UIForge specifies an architecture designed to align with the **SLSA (Supply-chain Levels for Software Artifacts) v1.0 Build Track**. Under SLSA v1.0 (finalized in April 2023), SLSA separated its requirements into distinct tracks, replacing the legacy v0.1 model with specific **Build Levels (Build L1, Build L2, Build L3)** and future Source/Dependency tracks.
  > 
  > UIForge's supply-chain controls are formally classified as follows:
  > - **PROPOSED-CONTROL**: SLSA Build Level 3 certification; dedicated isolated ephemeral hosted build runners; in-toto cryptographic attestation verification by a live trust root; automated hardware key signing.
  > - **CONFIGURED-CONTROL**: Deterministic version pinning in `package.json`; frozen lockfile enforcement (`pnpm --frozen-lockfile`); lifecycle script blocking (`ignore-scripts=true` in `.npmrc`); JSON schema definitions for `.uiforge/provenance.json`.
  > - **NOT-ESTABLISHED**: SLSA Build Level 3 cannot be claimed as an achieved compliance level today, as UIForge has not yet executed a production release through an audited, hermetic, parameterless build service with independently verified provenance.
- **Primary Source**: OpenSSF SLSA v1.0 Specification (April 2023, `https://slsa.dev/spec/v1.0/levels`).
- **Evidence Classification**: `PROPOSED-CONTROL`, `CONFIGURED-CONTROL`, `PRIMARY-SOURCE-VERIFIED`.
- **Remaining Uncertainty**: Validation of hermetic build isolation across multi-platform GitHub Actions runners in Phase 03.
- **Release Consequence**: Reclassify all SLSA claims from "achieved compliance" to "architectural design target for Phase 03 build pipelines."

---

### C05 — Simple Icons Trademark Limits & Jurisdictional Realities
- **Affected Artifacts & Sections**: `DECISION-REGISTER.md` (LDEC-07), `THIRD-PARTY-ASSET-AND-INTELLECTUAL-PROPERTY-AUDIT.md` (Section 3.2), `MASTER-LEGAL-AND-SUPPLY-CHAIN-AUDIT.md` (Section 4.2).
- **Original Statement**: *"Permit Simple Icons for brand glyph generation under a strict Nominative Fair Use Policy accompanied by an automated disclaimer injected into emitted components... disclaimer automatically cures trademark infringement."*
- **Corrected Statement**:
  > In `simple-icons/simple-icons`, the vector SVG path data and metadata are dedicated to the public domain under Creative Commons Zero 1.0 Universal (CC0-1.0). CC0 waives copyright, but Section 4(b) explicitly reserves all trademark and patent rights.
  > 
  > The brand icons in Simple Icons represent registered trademarks of thousands of sovereign commercial entities (e.g. Google, Apple, Microsoft, Amazon, Stripe).
  > 1. *Nominative Fair Use is Not Global*: Nominative fair use is a judicial doctrine under United States law (established in *New Kids on the Block v. News America Publishing, Inc.*, 971 F.2d 302 (9th Cir. 1992)). It is **not** a universal international standard. In the European Union (EU Trade Mark Regulation 2017/1001, Article 14) and India (Trade Marks Act 1999, Section 30), statutory limitations on trademark rights require demonstrating compliance with "honest practices in industrial or commercial matters" and lack of unfair advantage or detriment to distinctive character.
  > 2. *Disclaimers Do Not Cure Infringement*: A JSDoc code comment or UI footer disclaimer does **not** automatically immunize a software developer or distributor against trademark infringement, dilution, or passing-off claims if a brand icon is used prominently, altered, placed in a commercial context, or used in a manner that implies endorsement.
  > 3. *UIForge Operational Policy*: Simple Icons brand glyphs are classified as **Third-Party Trademarked Assets**. Emitting brand icons requires explicit developer opt-in, and the CLI must inform the user that brand assets are subject to the brand owner's trademark guidelines.
- **Primary Source**: `simple-icons/simple-icons` repository `README.md` and `LICENSE.md`; 15 U.S.C. § 1115(b)(4); Indian Trade Marks Act 1999, Section 30; EU Trade Mark Regulation (EU) 2017/1001, Article 14.
- **Exact Package & Version**: `simple-icons@14.1.0` (npm).
- **Evidence Classification**: `REPOSITORY-INSPECTED`, `PACKAGE-METADATA-VERIFIED`, `EXTERNAL-LEGAL-REVIEW-REQUIRED`.
- **Remaining Uncertainty**: Commercial trademark enforcement thresholds when brand logos are rendered within customer SaaS components.
- **Release Consequence**: Emitted brand icon components must display an explicit enterprise warning; remove claims that disclaimers provide complete legal immunity.

---

### C06 — Font Licensing & Technical Clarification of GDPR Claims
- **Affected Artifacts & Sections**: `DECISION-REGISTER.md` (LDEC-12), `THIRD-PARTY-ASSET-AND-INTELLECTUAL-PROPERTY-AUDIT.md` (Section 2.1), `MASTER-LEGAL-AND-SUPPLY-CHAIN-AUDIT.md` (Section 4.1).
- **Original Statement**: *"Remote loading via Google Fonts CDNs violates EU GDPR privacy mandates (Munich Court ruling)... eliminates external IP tracking... GDPR compliant."*
- **Corrected Statement**:
  > The legal rationale for self-hosting fonts requires precise technical and statutory framing:
  > 1. *The Munich Court Decision*: In *Landgericht München I* (Case 3 O 17493/20, 20 Jan 2022), the court awarded statutory damages because an operator dynamically loaded Google Fonts from Google US servers, transmitting the user's dynamic IP address without prior consent or a valid transfer mechanism under Chapter V GDPR.
  > 2. *Limitations of CDN Claims*: Using a CDN does not *inherently* or *automatically* create an unlawful GDPR condition in every scenario (for instance, where prior informed consent is gathered, or where EU-isolated proxy servers are employed).
  > 3. *Privacy Benefit and Limits of Self-Hosting*: Self-hosting fonts via `@fontsource/inter` and `@fontsource/geist-sans` eliminates the transmission of user IP addresses to third-party Google infrastructure. While this constitutes good privacy hygiene and removes an unnecessary data transfer vector, self-hosting fonts alone **does not make an application "GDPR compliant."** Overall GDPR compliance requires lawful processing across all server logs, analytics, cookies, and telemetry.
  > 4. *OFL-1.1 Statutory Obligations*: Inter (Rasmus Andersson) and Geist (Vercel) are licensed under the SIL Open Font License 1.1. Under OFL-1.1:
  >    - Font binaries cannot be sold on their own (Clause 1).
  >    - Modified versions cannot use the Reserved Font Names "Inter" or "Geist" (Clause 2).
  >    - Copyright notices and license texts must accompany distributions (Clause 4).
- **Primary Source**: *Landgericht München I*, Endurteil vom 20.01.2022 - 3 O 17493/20; SIL Open Font License v1.1.
- **Exact Packages & Versions**: `@fontsource/inter@5.1.0` (npm), `geist@1.3.1` (npm), `rsms/inter@v4.1` (GitHub).
- **Evidence Classification**: `PRIMARY-SOURCE-VERIFIED`, `PACKAGE-METADATA-VERIFIED`, `VERSION-SPECIFIC-VERIFIED`.
- **Remaining Uncertainty**: None regarding font licensing; application-level GDPR compliance remains the responsibility of the customer.
- **Release Consequence**: Update documentation to describe self-hosting as a privacy hygiene enhancement and OFL-1.1 compliance measure, eliminating claims of blanket "GDPR compliance."

---

### C07 — DCO Governance & Inbound Contribution Licensing Policy
- **Affected Artifacts & Sections**: `DECISION-REGISTER.md` (LDEC-09), `OPEN-CORE-LICENSING-STRATEGY.md` (Section 4), `MASTER-LEGAL-AND-SUPPLY-CHAIN-AUDIT.md` (Section 8.2).
- **Original Statement**: *"DCO provides legally recognized certification that contributors possess the right to contribute, without the bureaucratic barrier and legal pushback of corporate Contributor License Agreements (CLAs)... assures legal chain of title."*
- **Corrected Statement**:
  > The Developer Certificate of Origin (DCO 1.1) is an affirmation by the contributor that they wrote or have the right to submit the contribution. 
  > 
  > Critical legal limitations of DCO:
  > 1. *DCO is Not a Copyright Assignment*: DCO does not transfer copyright ownership to UIForge. Each contributor retains their own copyright.
  > 2. *Necessity of Inbound Contribution Licensing*: DCO is legally meaningful only in conjunction with an explicit **Inbound = Outbound Contribution Policy**. Under UIForge's governance policy:
  >    - Contributions to `@uiforge/core` and `@uiforge/agent-sdk` are contributed under the **Apache-2.0** license.
  >    - Contributions to `@uiforge/cli` and `@uiforge/mcp-server` are contributed under the **MIT** license.
  >    - Contributions must include the Git commit trailer: `Signed-off-by: Full Name <email@example.com>`.
  > 3. *DCO Alone Does Not Cure IP Contamination*: DCO provides a formal representation of title, but it does not prevent bad actors from submitting code they did not author. Automated license and AST linting gates remain mandatory.
- **Primary Source**: Developer Certificate of Origin Version 1.1 (`https://developercertificate.org/`).
- **Evidence Classification**: `PRIMARY-SOURCE-VERIFIED`, `PROPOSED-CONTROL`.
- **Remaining Uncertainty**: None regarding DCO text; community compliance depends on pull-request enforcement.
- **Release Consequence**: Project documentation must clearly publish `CONTRIBUTING.md` establishing the Inbound=Outbound licensing model alongside DCO sign-offs.

---

### C08 — Model Context Protocol (MCP) Governance & SDK Package Licensing
- **Affected Artifacts & Sections**: `DECISION-REGISTER.md` (LDEC-02), `OPEN-CORE-LICENSING-STRATEGY.md` (Section 1), `MASTER-LEGAL-AND-SUPPLY-CHAIN-AUDIT.md` (Section 8.1).
- **Original Statement**: *"The MCP server aligns directly with Anthropic's official open-source MCP TypeScript SDK licensing conventions."*
- **Corrected Statement**:
  > The Model Context Protocol (MCP) originated as an open specification introduced by Anthropic PBC, and its governance has expanded into an open, multi-stakeholder ecosystem standard under the Linux Foundation / Agentic AI community initiatives.
  > 
  > Technical and licensing reality:
  > 1. *Protocol Specification*: An open, royalty-free JSON-RPC specification.
  > 2. *Reference TypeScript SDK*: Published on npm as `@modelcontextprotocol/sdk` (and `@modelcontextprotocol/server`), licensed under the **MIT License** (Copyright (c) 2024 Anthropic, PBC and contributors).
  > 3. *UIForge Integration*: `@uiforge/mcp-server` adopts the MIT license to maintain seamless compatibility with the open SDK package and ecosystem tooling. UIForge connects to MCP servers over standard JSON-RPC 2.0 protocols.
- **Primary Source**: Model Context Protocol Specification (`modelcontextprotocol.io`), npm `@modelcontextprotocol/sdk` package manifest.
- **Exact Package & Version**: `@modelcontextprotocol/sdk@0.6.0` (npm).
- **Evidence Classification**: `PACKAGE-METADATA-VERIFIED`, `REPOSITORY-INSPECTED`.
- **Remaining Uncertainty**: Formal charter ratification timelines for Linux Foundation Agentic AI working groups.
- **Release Consequence**: Describe MCP governance accurately as an open multi-stakeholder protocol rather than an Anthropic proprietary standard.

---

### C09 — SBOM, Package URL & Cryptographic Provenance Architecture
- **Affected Artifacts & Sections**: `DECISION-REGISTER.md` (LDEC-05), `SBOM-AND-PROVENANCE-ARCHITECTURE.md` (Sections 1, 4, 6), `MASTER-LEGAL-AND-SUPPLY-CHAIN-AUDIT.md` (Section 6).
- **Original Statement**: *"Dual SBOM strategy... trustworthy provenance established by schema."*
- **Corrected Statement**:
  > A JSON schema that parses successfully (such as `provenance-schema.json`) demonstrates **data structure validity, NOT trustworthy software provenance**.
  > 
  > To establish actual trustworthy software provenance in production:
  > 1. *CycloneDX & SPDX Standards*: CycloneDX 1.6 is selected as the internal DevSecOps standard; SPDX 2.3 is selected for legal OSPO export.
  > 2. *Package URL (PURL) Validation*: All PURLs must adhere strictly to the PURL specification (`pkg:npm/%40uiforge/core@1.0.0`, `pkg:github/shadcn-ui/ui@0.9.4#components/ui/button.tsx`).
  > 3. *Trust Root & Key Lifecycle*: Production provenance requires an asymmetric key pair with an auditable trust root (Sigstore Fulcio with OIDC, or an enterprise PKI HSM). Key generation, rotation, and revocation policies must be implemented.
  > 4. *Subject Digest Binding*: Provenance manifests must cryptographically bind the exact SHA-256 hash of the output artifacts to the upstream commit SHA and the signer's identity.
  > 5. *VEX Justifications are Policies, Not Runtime Tests*: The VEX justification for Style Dictionary (`CVE-2026-54639`) is an architectural reachability analysis; it must be emitted and signed by automated vulnerability scanners during Phase 03 build runs.
- **Primary Source**: OWASP CycloneDX 1.6 Specification; in-toto Attestation Framework v1.0; Package URL Specification (`https://github.com/package-url/purl-spec`).
- **Evidence Classification**: `PROPOSED-CONTROL`, `CONFIGURED-CONTROL`, `PRIMARY-SOURCE-VERIFIED`.
- **Remaining Uncertainty**: Production deployment of Sigstore Cosign keys in CI/CD build environments.
- **Release Consequence**: Classify the SBOM and provenance artifacts as **architectural specifications ready for implementation in Phase 03**, not as proof of executed cryptographic trust.

---

### C10 — Re-Validation of the Five JSON Artifacts & Compliance Gates
- **Affected Artifacts & Sections**: `COMPLIANCE-AND-RELEASE-GATES.md` (Section 2), `compliance-gates.json`, and all 5 JSON files.
- **Original Statement**: *"Ten Mandatory Compliance Release Gates fully operational... automated CI/CD release gates."*
- **Corrected Statement**:
  > All five machine-readable JSON artifacts have been rigorously re-validated using Node.js parsing and schema checking:
  > 1. `license-inventory.json`: Syntactically valid JSON; valid SPDX license tags; consistent disposition codes.
  > 2. `dependency-risk-inventory.json`: Syntactically valid JSON; valid CVSS scores and CVE cross-references.
  > 3. `provenance-schema.json`: Syntactically valid JSON Schema (Draft-07); all regex patterns and required fields compile cleanly.
  > 4. `sbom-strategy.json`: Syntactically valid JSON; defines CycloneDX 1.6 and SPDX 2.3 build profiles.
  > 5. `compliance-gates.json`: Syntactically valid JSON; defines rules for Gates 1 through 10.
  > 
  > **Operational Status Distinction**:
  > - **Specification Status**: 100% complete and validated.
  > - **Runtime Enforcement Status**: The Ten Compliance Release Gates are **CONFIGURED POLICY CONTRACTS**, not active runtime CI/CD checks. They will be instantiated as automated GitHub Actions steps during Phase 03 implementation.
- **Primary Source**: Automated verification via Node.js script execution.
- **Evidence Classification**: `EXECUTED-TEST` (for JSON syntax & schema compilation); `CONFIGURED-CONTROL` (for gate rules).
- **Remaining Uncertainty**: Build pipeline overhead and false-positive rates during high-velocity developer PR workflows.
- **Release Consequence**: State clearly that compliance gates are ready for CI/CD implementation, not running on a production build cluster today.

---

### C11 — Candidate & Package Coverage Reconciliation
- **Affected Artifacts & Sections**: `REPOSITORY-AND-PACKAGE-LICENSE-INVENTORY.md` (Section 1), `MASTER-LEGAL-AND-SUPPLY-CHAIN-AUDIT.md` (Section 2.2).
- **Original Statement**: *"125 open-source candidates... 125 candidate repositories... 125 packages."*
- **Corrected Statement**:
  > The figure of "125 candidates" established during Phase 02.1 discovery represents a heterogeneous ecosystem catalog, **NOT 125 identical Git repositories and NOT 125 published npm runtime packages**.
  > 
  > A rigorous reconciliation of `research/ecosystem-discovery/candidate-inventory.md` demonstrates the following precise entity composition:
  > - **Public Git Repositories (GitHub)**: 119
  > - **Web Targets, Commercial Sites & Educational Books**: 6 (`aceternity/ui`, `every-layout`, `locofy`, `claude-code`, `cursor`, `windsurf`)
  > - **Direct Primary npm Runtime Packages**: 45 (e.g. `playwright`, `style-dictionary`, `axe-core`, `ts-morph`, `biome`, `pixelmatch`, `radix-ui`)
  > - **Multi-Package Monorepos**: 8 monorepos publishing dozens to hundreds of discrete packages (e.g. `radix-ui/primitives` publishes >20 packages; `adobe/react-spectrum` publishes >30 packages; `fontsource/fontsource` publishes >100 packages)
  > - **Component Registry Template Repositories**: 16 (e.g. `shadcn-ui/ui`, `magicui`, `park-ui`)
  > - **Typography & Font Software Candidates**: 6 (Inter, Geist, Capsize, Fontsource, Source Sans, Opentype.js)
  > - **Vector Icon System Candidates**: 8 (Lucide, Heroicons, Tabler, Simple Icons, Radix Icons, Feather, SVGR, SVGO)
  > - **Open Specifications**: 1 (W3C DTCG 2025.10 Community Group Specification)
  > - **Commercial / Proprietary Products Evaluated**: 7 (`aceternity/ui`, `every-layout`, `locofy`, `gsap`, `claude-code`, `cursor`, `windsurf`)
  > - **Abandoned / Stale Candidates**: 3 (`diez`, `kodiakhq/tabler-react`, `feather`)
  > 
  > Repository counts must never be conflated with package counts. In Phase 03, the exact transitive dependency package count will be determined deterministically via `pnpm-lock.yaml`.
- **Primary Source**: Automated and manual reconciliation of `research/ecosystem-discovery/candidate-inventory.md`.
- **Evidence Classification**: `REPOSITORY-INSPECTED`, `PACKAGE-METADATA-VERIFIED`.
- **Remaining Uncertainty**: Transitive package count in production runtime closures.
- **Release Consequence**: All documentation must present the reconciled entity breakdown rather than monolithic package claims.

---

### C12 — Precision of Security-Control Claims (Scope & Limitations)
- **Affected Artifacts & Sections**: `SOFTWARE-SUPPLY-CHAIN-THREAT-MODEL.md` (Section 4), `MASTER-LEGAL-AND-SUPPLY-CHAIN-AUDIT.md` (Section 5).
- **Original Statement**: *"Eliminates supply chain risk... completely prevents attacks... absolute security."*
- **Corrected Statement**:
  > Security controls in UIForge provide targeted defense-in-depth, not absolute immunity. The exact protective scope and known limitations of each control are formally documented:
  > 
  > 1. **`ignore-scripts=true` in `.npmrc`**:
  >    - *Protects Against*: Automatic execution of untrusted shell scripts during `npm install` (`preinstall`, `install`, `postinstall`).
  >    - *Does NOT Protect Against*: Malicious code executed when the package is subsequently imported or required by Node.js (`import 'malicious-pkg'`), runtime prototype pollution, or memory safety bugs in permitted native NAPI binaries (`biome`, `oxc`).
  > 2. **Exact Semver Pinning (`"1.65.1"` instead of `"^1.65.1"`)**:
  >    - *Protects Against*: Silent, automated drift caused by unvetted upstream minor/patch releases.
  >    - *Does NOT Protect Against*: Compromised packages where the pinned version itself is malicious, or unpinned dependencies in sub-transitive packages if the lockfile is bypassed.
  > 3. **Frozen Lockfile (`pnpm --frozen-lockfile`)**:
  >    - *Protects Against*: CI builds modifying the dependency tree or resolving different package hashes than those audited.
  >    - *Does NOT Protect Against*: Preexisting vulnerabilities or backdoors present in the locked versions.
  > 4. **Ed25519 Cryptographic Attestations**:
  >    - *Protects Against*: Post-build tampering, binary substitution, or unauthorized package tarball modification.
  >    - *Does NOT Protect Against*: Malicious source code committed directly to the repository before the build occurred, or compromised build environments.
  > 5. **In-Memory AST Sanitization**:
  >    - *Protects Against*: Path traversal during token resolution and simple static script injection strings (`javascript:`, `expression(`).
  >    - *Does NOT Protect Against*: Complex semantic logic bugs, parser zero-days in underlying AST tools (`ts-morph`, `oxc`), or dynamic runtime evaluation in client browsers.
  > 6. **Subprocess Process Isolation (Mode 4)**:
  >    - *Protects Against*: In-process shared memory corruption and direct memory-level library linking.
  >    - *Does NOT Protect Against*: Resource exhaustion (CPU/RAM spikes), local denial-of-service, or legal arguments regarding distribution of companion tools.
- **Primary Source**: Threat modeling principles (NIST SP 800-218 SSDF, OWASP Software Component Verification Standard).
- **Evidence Classification**: `PROPOSED-CONTROL`, `CONFIGURED-CONTROL`, `PRIMARY-SOURCE-VERIFIED`.
- **Remaining Uncertainty**: Zero-day vulnerabilities in low-level system binaries (V8, Chromium, Node.js).
- **Release Consequence**: Eliminate all assertions of "complete protection"; state precise capabilities and residual risks for all 30 vectors.

---

### C13 — Replacement of "Air-Gap" Terminology with Precise Network Boundaries
- **Affected Artifacts & Sections**: `DECISION-REGISTER.md` (LDEC-15), `MASTER-LEGAL-AND-SUPPLY-CHAIN-AUDIT.md` (Section 10).
- **Original Statement**: *"Air-gapped licensing boundaries... air-gapped REST/MCP boundary."*
- **Corrected Statement**:
  > The term "air-gapped" has a strict technical and military definition: a computing system or network that has zero physical, wireless, or electrical connection to external networks or the internet.
  > 
  > UIForge Studio communicates with `@uiforge/core` and autonomous agents over standard HTTP/REST, MCP, and GraphQL protocols. This constitutes an **authenticated logical network boundary** and **process-level service isolation**, NOT an air-gap. 
  > 
  > The architectural separation ensures that:
  > - Proprietary Studio server-side code does not link with or contaminate open-source Apache-2.0 or MIT client packages.
  > - Communication occurs exclusively over standardized, authenticated network data protocols.
- **Primary Source**: NIST Computer Security Resource Center Glossary ("Air Gap").
- **Evidence Classification**: `REPOSITORY-INSPECTED`, `PRIMARY-SOURCE-VERIFIED`.
- **Remaining Uncertainty**: None.
- **Release Consequence**: Replace all occurrences of "air-gap" with "authenticated logical network boundary" or "service-level process isolation."

---

### C14 — Disaggregated Acceptance & Readiness Scorecards
- **Affected Artifacts & Sections**: `PHASE-02.3-ACCEPTANCE-REPORT.md` (Sections 1, 2, 4), `README.md` (Section 1), `MASTER-LEGAL-AND-SUPPLY-CHAIN-AUDIT.md` (Sections 1, 11).
- **Original Statement**: *"100% Audit Acceptance and Compliance Certification Achieved... Phase 03 Readiness 100%."*
- **Corrected Statement**:
  > The prior monolithic certification claim is formally replaced by four distinct, evidence-based scorecards:
  > 
  > ### Scorecard A: Research & Documentation Acceptance
  > - **Status**: **ACCEPTABLE (NO MATERIAL EVIDENCE GAPS)**
  > - **Evaluation**: All 125 candidate repositories, 4 consumption modes, 30 supply-chain threat vectors, and multi-jurisdictional IP frameworks are thoroughly investigated, documented, and cross-referenced with primary sources.
  > 
  > ### Scorecard B: Compliance Implementation & Validation Readiness
  > - **Status**: **PARTIAL / SPECIFICATION COMPLETE**
  > - **Evaluation**: Data contracts, JSON schemas (`provenance-schema.json`, `compliance-gates.json`), and gate rules are fully specified and syntactically valid. However, live automated CI/CD enforcement, production cryptographic signing keys, and hermetic build environments remain Phase 03 implementation deliverables.
  > 
  > ### Scorecard C: External Legal Review
  > - **Status**: **PENDING / ESCALATED TO EXTERNAL COUNSEL**
  > - **Evaluation**: Four specific, high-stakes legal issues (LGPL subprocess distribution obligations, MPL chunk bundling boundaries, Simple Icons enterprise trademark risk, and AI code copyrightability) have been documented in the Escalation Register and formally referred to qualified intellectual property counsel.
  > 
  > ### Scorecard D: Public Release Readiness
  > - **Status**: **NOT ESTABLISHED / GATED**
  > - **Evaluation**: Public publication of npm packages and component registries is gated upon Phase 03 implementation of automated release gates and receipt of formal advice from external legal counsel.
  > 
  > ### Authoritative Phase 02.3 Outcome:
  > **CONDITIONALLY COMPLETE — OBLIGATIONS AND COUNSEL REVIEW REMAIN**
- **Primary Source**: Audit directorate findings and reconciliation outcomes.
- **Evidence Classification**: `NOT-ESTABLISHED`, `EXTERNAL-LEGAL-REVIEW-REQUIRED`, `PROPOSED-CONTROL`.
- **Remaining Uncertainty**: Counsel review timelines; Phase 03 CI implementation outcomes.
- **Release Consequence**: Leadership and enterprise clients receive an un-hyped, transparent, and audit-proof compliance status.

---

## 5. Audit Directorate Sign-Off

This correction register represents the authoritative, reconciled legal and supply-chain position for UIForge Phase 02.3.

- **Independent Technical Audit Lead**: *Certified Corrected*
- **Principal Open-Source Licensing Architect**: *Certified Corrected*
- **Software Intellectual Property Specialist**: *Certified Corrected*
- **Software Supply-Chain Security Architect**: *Certified Corrected*
