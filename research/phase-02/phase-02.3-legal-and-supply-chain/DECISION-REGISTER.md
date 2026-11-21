# UIForge Legal & Supply-Chain Decision Register (LDEC-01 to LDEC-15)

**Document ID:** `UIF-PH02.3-DECISIONS`  
**Phase:** 02.3 — Master Legal, Licensing, Intellectual Property & Software Supply-Chain Audit  
**Classification:** Canonical Legal, Licensing & Supply-Chain Decision Records (Post-Audit Reconciled)  
**Date:** November 2026  
**Status:** Authoritative Architectural & Legal Decision Baseline — Corrected  
**Auditor Lead:** Independent Technical Audit Lead & Principal Open-Source Licensing Architect  

---

## 1. Executive Summary & Purpose

This register establishes fifteen authoritative, binding **Legal and Supply-Chain Decision Records (LDEC-01 through LDEC-15)**. 

Following the Phase 02.3 Independent Audit Correction Pass (`UIF-PH02.3-CORRECTION-REGISTER`), these records reflect defensible legal analysis, exact statutory scopes, explicit residual risk boundaries, and necessary escalations to qualified external legal counsel.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        LEGAL & SUPPLY-CHAIN DECISION INDEX                             │
├─────────┬──────────────────────────────────────────┬─────────────┬─────────────────────┤
│ ID      │ Title                                    │ Status      │ Affected Subsystems │
├─────────┼──────────────────────────────────────────┼─────────────┼─────────────────────┤
│ LDEC-01 │ Apache-2.0 Adoption for Core & Agent SDK │ APPROVED    │ Core, Agent SDK     │
│ LDEC-02 │ MIT License for CLI & MCP Server         │ APPROVED    │ CLI, MCP Server     │
│ LDEC-03 │ Qualified Output Ownership Policy        │ APPROVED    │ CLI, Registry, Gen  │
│ LDEC-04 │ Mode 4 Unbundled Subprocess for Pa11y    │ CONDITIONAL │ A11y Engine, CLI    │
│ LDEC-05 │ Dual SBOM Strategy (CycloneDX + SPDX)    │ APPROVED    │ Build Pipeline, OSPO│
│ LDEC-06 │ MPL-2.0 Conditional Larger Work Wrapper  │ APPROVED    │ A11y Engine, Test   │
│ LDEC-07 │ Simple Icons Trademark Risk Demarcation  │ APPROVED    │ Registry, CLI Icons │
│ LDEC-08 │ Prohibition of Aceternity & Tailwind UI  │ APPROVED    │ Registry, Discovery │
│ LDEC-09 │ DCO 1.1 with Inbound=Outbound Licensing  │ APPROVED    │ Git Repo, Community │
│ LDEC-10 │ Pinned Baseline Dependencies (Exact Sem) │ APPROVED    │ Lockfile, Toolchain │
│ LDEC-11 │ Mandatory Mode 3 JSDoc Legal Headers     │ APPROVED    │ Registry, CLI add   │
│ LDEC-12 │ Self-Hosted Font Delivery (Privacy/OFL)  │ APPROVED    │ Typography, Assets  │
│ LDEC-13 │ Style Dictionary CVE-2026-54639 VEX      │ APPROVED    │ Tokens, Security    │
│ LDEC-14 │ Biome Dual-Licensing Election (Apache)   │ APPROVED    │ AST Tooling, Build  │
│ LDEC-15 │ Commercial Studio Logical Boundary       │ APPROVED    │ Studio, Enterprise  │
└─────────┴──────────────────────────────────────────┴─────────────┴─────────────────────┘
```

---

## 2. Master Decision Records (LDEC-01 through LDEC-15)

### LDEC-01: Adoption of Apache License 2.0 for `@uiforge/core` and `@uiforge/agent-sdk`
- **Context**: UIForge Core and Agent SDK provide foundational infrastructure, AST transformers, and autonomous AI tool execution engines. Enterprise adoption requires strong IP certainty.
- **Decision**: License `@uiforge/core` and `@uiforge/agent-sdk` under the **Apache License 2.0 (Apache-2.0)**.
- **Rationale**: Apache-2.0 Section 3 provides an express, royalty-free patent license from all contributors, backed by an automatic patent retaliation defense clause. This provides enterprise legal counsel with maximum protection against patent trolls.
- **Consequences**: Outbound distributions must bundle Apache-2.0 license text and retain a consolidated `NOTICE` file.
- **Evidence Classification**: `PRIMARY-SOURCE-VERIFIED`.

---

### LDEC-02: Adoption of MIT License for `@uiforge/cli` and `@uiforge/mcp-server`
- **Context**: The CLI tool (`@uiforge/cli`) and Model Context Protocol server (`@uiforge/mcp-server`) are developer-facing touchpoints.
- **Decision**: License `@uiforge/cli` and `@uiforge/mcp-server` under the **MIT License**.
- **Rationale**: The MIT License offers zero friction for developer onboarding. Global developer tooling standardly uses MIT. For MCP, the protocol specification is an open royalty-free standard, and the reference TypeScript SDK packages (`@modelcontextprotocol/sdk`) are published under MIT by Anthropic and open-source contributors. UIForge's MCP server adopts MIT to match the package-level ecosystem standard under emerging multi-stakeholder foundation governance (Linux Foundation / Agentic AI community).
- **Consequences**: Users can incorporate the CLI and MCP server without complex corporate licensing reviews.
- **Evidence Classification**: `PACKAGE-METADATA-VERIFIED`, `REPOSITORY-INSPECTED`.

---

### LDEC-03: Qualified Generated-Code Ownership and Licensing Policy
- **Context**: Developers need certainty regarding the legal status of code emitted by UIForge CLI and autonomous agents. Prior claims of an absolute "100% user ownership guarantee" were legally overbroad and inaccurate regarding third-party and AI content.
- **Decision**: UIForge formally adopts a **Qualified Output Ownership and Licensing Policy**:
  1. *UIForge Contractual Disclaimer*: UIForge formally disclaims all copyright ownership, license encumbrances, and royalty claims on its own behalf over generated output.
  2. *Original UIForge Templates*: Emitted original template and scaffolding code authored by UIForge is licensed to the user under the permissive MIT license.
  3. *Upstream Third-Party Source*: Code copied or derived from upstream component registries (e.g., `shadcn/ui`, `magicui`) remains copyrighted by upstream authors and is licensed to the user under upstream terms (MIT/Apache-2.0), subject to copyright notice retention. UIForge cannot and does not grant original authorship or copyright ownership of third-party code.
  4. *Licensed Typography & Brand Assets*: Bundled font software (Inter, Geist) remains governed by OFL-1.1; brand logos remain protected trademarks of their owners. The user does not acquire copyright in font binaries or trademark rights in brand logos.
  5. *Raw AI-Generated Output*: Under US Copyright Office guidance (March 2023), raw machine-generated output lacks human authorship and is not subject to copyright. The user owns only their human creative contributions (prompts, compilation, creative selection, subsequent human edits).
  6. *Unresolved Training Data Status*: Potential infringement risks related to foundation model training data cannot be contractually eliminated or indemnified by UIForge.
- **Rationale**: Legally defensible, transparent, and accurate under international copyright law.
- **Consequences**: CLI banners, licenses, and documentation will reflect this qualified segmentation. Unresolved questions escalated to external counsel.
- **Evidence Classification**: `PRIMARY-SOURCE-VERIFIED`, `EXTERNAL-LEGAL-REVIEW-REQUIRED`.

---

### LDEC-04: Strict Subprocess Execution & Unbundled Architecture for LGPL-3.0 Pa11y (Mode 4)
- **Context**: `pa11y/pa11y` (`v10.0.0`) is an accessibility CLI runner licensed under the reciprocal **GNU Lesser General Public License v3.0 (LGPL-3.0)**.
- **Decision**: Pa11y is strictly excluded from in-process linking in `@uiforge/core`. UIForge supports Pa11y solely as an **Unbundled External Runner** invoked via `child_process.spawn()` over standard OS process boundaries (**Mode 4: Infrastructure & Tooling**). UIForge will NOT vendor, package, or distribute Pa11y binaries or source. Pa11y must be installed independently by the user.
- **Rationale**: Subprocess execution over stdio/JSON pipes prevents in-process memory linking. However, process isolation does not eliminate all LGPL obligations if software is bundled or conveyed. Adopting an unbundled external runner model ensures UIForge does not convey LGPL-3.0 binaries, leaving distribution obligations with the independent package manager.
- **Consequences**: Pa11y is an optional peer CLI runner. A formal legal opinion is required before any bundled packaging, Docker distribution, or commercial offering includes Pa11y.
- **Evidence Classification**: `PACKAGE-METADATA-VERIFIED`, `EXTERNAL-LEGAL-REVIEW-REQUIRED`.

---

### LDEC-05: Adoption of Dual-Standard SBOM Architecture (CycloneDX 1.6 + SPDX 2.3)
- **Context**: Enterprise customers, regulatory mandates (EU Cyber Resilience Act), and DevSecOps pipelines require machine-readable software bills of materials.
- **Decision**: Adopt **CycloneDX 1.6 (JSON)** as the primary internal and runtime SBOM standard, while providing on-demand **SPDX 2.3 (JSON)** export via CLI for corporate OSPO legal audits.
- **Rationale**: CycloneDX offers native support for VEX, non-code design tokens, and CI tooling. SPDX provides standard legal licensing cross-examination.
- **Operational Reality**: The JSON schemas define data structure contracts. Trustworthy provenance requires an active trust root (Sigstore Fulcio / PKI), cryptographic key lifecycle, and verified subject-digest bindings implemented in Phase 03.
- **Consequences**: Build pipelines will generate CycloneDX SBOMs and sign attestations during Phase 03 CI execution.
- **Evidence Classification**: `PROPOSED-CONTROL`, `CONFIGURED-CONTROL`, `PRIMARY-SOURCE-VERIFIED`.

---

### LDEC-06: File-Scoped Weak Copyleft Encapsulation of MPL-2.0 `axe-core`
- **Context**: `dequelabs/axe-core` (`v4.14.1`) is licensed under **Mozilla Public License 2.0 (MPL-2.0)**.
- **Decision**: Consume `axe-core` strictly as an unmodified external npm dependency wrapped behind `@uiforge/a11y-engine`. UIForge will write zero patches or modifications into axe-core source files and will configure bundlers to treat axe-core as an external package.
- **Rationale**: Under MPL-2.0 Section 3.3 ("Larger Works"), combining unmodified MPL-2.0 files with separate modules is permitted, provided the distributor complies with Section 3.1 (license notice) and Section 3.2 (source code availability). Treating axe-core as an external dynamic dependency prevents bundlers (esbuild, Rollup) from merging MPL-2.0 code into shared application chunks.
- **Consequences**: Outbound distributions must include MPL-2.0 license text and source availability notices in `NOTICE`. Bundler chunking boundaries escalated to external legal counsel.
- **Evidence Classification**: `PACKAGE-METADATA-VERIFIED`, `VERSION-SPECIFIC-VERIFIED`, `EXTERNAL-LEGAL-REVIEW-REQUIRED`.

---

### LDEC-07: Simple Icons Trademark Demarcation & Multi-Jurisdictional Realities
- **Context**: `simple-icons/simple-icons` releases SVG code under CC0-1.0, but brand logos (Google, Apple, AWS) are legally protected trademarks of third parties.
- **Decision**: Permit Simple Icons brand SVGs strictly under an **Explicit Developer Opt-In Model** accompanied by prominent trademark warnings. Disclaimers do not cure infringement, and nominative fair use is a US legal defense, not a universal global permission.
- **Rationale**: CC0 waives copyright, but Section 4(b) explicitly reserves trademark rights. In the EU and India, statutory trademark defenses require proof of honest practices and non-detriment to distinctive character. A code disclaimer comment does not automatically insulate users against trademark infringement or dilution claims.
- **Consequences**: UIForge CLI must require explicit user opt-in before emitting brand icons, displaying a warning that brand logos remain subject to the respective trademark owner's guidelines.
- **Evidence Classification**: `REPOSITORY-INSPECTED`, `PACKAGE-METADATA-VERIFIED`, `EXTERNAL-LEGAL-REVIEW-REQUIRED`.

---

### LDEC-08: Complete Prohibition of Scraping or Copying Proprietary Components
- **Context**: Commercial design libraries such as **Aceternity UI Pro** and **Tailwind UI** publish attractive components on the web, but their Terms of Service prohibit redistribution in libraries, registries, or generators.
- **Decision**: Strictly prohibit copying, scraping, indexing, or redistributing source code or markup from Aceternity UI or Tailwind UI into `@uiforge/component-registry` (`[REJ]` / `[COM]`).
- **Rationale**: Violating upstream commercial EULAs constitutes breach of contract and willful copyright infringement.
- **Consequences**: Any aesthetic concepts inspired by modern web trends must be built using the Clean-Room Engineering Protocol from public, permissive primitives.
- **Evidence Classification**: `PRIMARY-SOURCE-VERIFIED`, `REPOSITORY-INSPECTED`.

---

### LDEC-09: Adoption of Developer Certificate of Origin (DCO 1.1) with Inbound=Outbound Licensing
- **Context**: Managing incoming community contributions requires establishing a clear, unbroken chain of legal copyright title.
- **Decision**: Adopt the **Developer Certificate of Origin (DCO 1.1)** model, requiring all git commits to include a `Signed-off-by: Name <email>` trailer, coupled with an explicit **Inbound = Outbound Contribution Policy**: contributions to Apache-2.0 modules are licensed under Apache-2.0; contributions to MIT modules are licensed under MIT.
- **Rationale**: DCO is an affirmation of title, not a copyright assignment. Contributors retain their copyright. Defining the inbound=outbound license policy ensures legal coherence without the bureaucratic friction of corporate CLAs.
- **Consequences**: Automated GitHub PR check verifies DCO trailers; `CONTRIBUTING.md` will publish the Inbound=Outbound licensing terms.
- **Evidence Classification**: `PRIMARY-SOURCE-VERIFIED`, `PROPOSED-CONTROL`.

---

### LDEC-10: Pinned Baseline Dependency Policy (Exact Semver, Zero Floating Ranges)
- **Context**: Transitive drift and unexpected minor/patch updates in npm dependencies can introduce breaking architectural changes or security vulnerabilities.
- **Decision**: All production dependencies across UIForge workspace packages must be pinned to **exact semver versions** (e.g. `"1.65.1"` instead of `"^1.65.1"`), backed by a frozen `pnpm-lock.yaml`.
- **Rationale**: Eliminates automated upstream minor/patch drift and ensures reproducible builds.
- **Limitations**: Exact pinning protects against unexpected upstream updates, but does not protect against vulnerabilities in the pinned version itself.
- **Consequences**: Renovate bot creates isolated PRs for updates, each verified through the test suite.
- **Evidence Classification**: `CONFIGURED-CONTROL`, `PRIMARY-SOURCE-VERIFIED`.

---

### LDEC-11: Mandatory Mode 3 JSDoc Legal Headers for Copied Components
- **Context**: When `@uiforge/cli add` copies component source code from upstream repositories (shadcn/ui, Magic UI) into a customer codebase, copyright law requires retaining upstream copyright notices.
- **Decision**: Mandatory automated injection of a standardized JSDoc legal header at the top of every copied component file, documenting original author, upstream repo URL, SPDX license, and UIForge modification history.
- **Rationale**: Stripping copyright notices violates Section 1 of the MIT License and 17 U.S.C. § 106.
- **Consequences**: CLI code generators must reject emitting component files if header metadata is missing.
- **Evidence Classification**: `PRIMARY-SOURCE-VERIFIED`, `CONFIGURED-CONTROL`.

---

### LDEC-12: Self-Hosted Font Delivery (Privacy Hygiene & OFL-1.1 Compliance)
- **Context**: Modern frontend typography relies on fonts like Inter and Geist (OFL-1.1). Dynamic loading via remote Google CDNs creates third-party IP transmission risks highlighted by European courts (*Landgericht München I*, 2022).
- **Decision**: UIForge standardizes typography on **100% self-hosted font loading** via `@fontsource` packages. Font binaries remain unmodified, preserving Reserved Font Names ("Inter", "Geist") under OFL-1.1.
- **Rationale**: Eliminates transmission of end-user IP addresses to Google, providing good privacy hygiene and enabling offline development. However, self-hosting fonts does not automatically make an entire website "GDPR compliant," as compliance requires lawful processing across all site data.
- **Consequences**: CLI initializes local font assets and emits `OFL.txt` in the customer project.
- **Evidence Classification**: `PRIMARY-SOURCE-VERIFIED`, `PACKAGE-METADATA-VERIFIED`, `VERSION-SPECIFIC-VERIFIED`.

---

### LDEC-13: Style Dictionary CVE-2026-54639 Remediation and Machine-Readable VEX
- **Context**: Style Dictionary versions `< 5.4.4` were flagged with path traversal advisory `CVE-2026-54639`.
- **Decision**: Pin `style-dictionary@5.8.0`, restrict token operations strictly to in-memory DTCG ASTs, and publish a machine-readable CycloneDX VEX statement justifying `not_affected` status based on call-graph reachability.
- **Rationale**: Resolves vulnerability upstream while formally documenting reachability status for enterprise scanners.
- **Operational Reality**: The VEX document is an architectural policy justification; it must be emitted and cryptographically signed during Phase 03 automated build pipelines.
- **Consequences**: Enterprise security scanners will not block UIForge token compilation pipelines.
- **Evidence Classification**: `PACKAGE-METADATA-VERIFIED`, `VERSION-SPECIFIC-VERIFIED`, `PROPOSED-CONTROL`.

---

### LDEC-14: Biome Dual-Licensing Election (Electing Apache-2.0 for Patent Protection)
- **Context**: `biomejs/biome` (`v2.6.8`) is dual-licensed under `MIT OR Apache-2.0`.
- **Decision**: UIForge formally elects the **Apache-2.0** licensing option for Biome.
- **Rationale**: Electing Apache-2.0 extends Section 3 patent grant protections to all AST parsing, linting, and formatting operations executed by Biome within UIForge.
- **Consequences**: Recorded in UIForge's package attribution manifest.
- **Evidence Classification**: `PACKAGE-METADATA-VERIFIED`, `PRIMARY-SOURCE-VERIFIED`.

---

### LDEC-15: Commercial Studio Architectural Boundary & Logical Network Isolation
- **Context**: UIForge Studio is a proprietary commercial product that builds on the open-core foundation. Prior descriptions of this boundary as an "air-gap" were technically inaccurate.
- **Decision**: Maintain an **authenticated logical network boundary** and **process-level service isolation** between the open-core packages (`@uiforge/*`) and commercial Studio services via standardized REST/MCP/GraphQL protocols.
- **Rationale**: Prevents proprietary server-side code from linking with or contaminating open-source packages, while accurately describing the TCP/IP network protocol boundary.
- **Consequences**: Studio can be licensed under commercial enterprise agreements without relicensing core libraries.
- **Evidence Classification**: `REPOSITORY-INSPECTED`, `PRIMARY-SOURCE-VERIFIED`.

---

## 3. Verification Checkpoint & Sign-Off

- **Decisions Recorded:** 15 / 15 (100.0%)
- **Status:** All decisions formally audited, corrected, and reconciled for Phase 03 implementation.
- **Auditor Verification:** Approved by Independent Technical Audit Lead.
