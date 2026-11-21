# UIForge Legal & Supply-Chain Decision Register (LDEC-01 to LDEC-15)

**Document ID:** `UIF-PH02.3-DECISIONS`  
**Phase:** 02.3 — Master Legal, Licensing, Intellectual Property & Software Supply-Chain Audit  
**Classification:** Canonical Legal, Licensing & Supply-Chain Decision Records  
**Date:** November 2026  
**Status:** Complete Architectural & Legal Baseline  
**Auditor Lead:** Independent Technical Audit Lead & Principal Open-Source Licensing Architect  

---

## 1. Executive Summary & Purpose

This register establishes fifteen authoritative, binding **Legal and Supply-Chain Decision Records (LDEC-01 through LDEC-15)**. These decisions govern all architectural, licensing, distribution, and security boundaries across the UIForge engineering lifecycle.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        LEGAL & SUPPLY-CHAIN DECISION INDEX                             │
├─────────┬──────────────────────────────────────────┬─────────────┬─────────────────────┤
│ ID      │ Title                                    │ Status      │ Affected Subsystems │
├─────────┼──────────────────────────────────────────┼─────────────┼─────────────────────┤
│ LDEC-01 │ Apache-2.0 Adoption for Core & Agent SDK │ APPROVED    │ Core, Agent SDK     │
│ LDEC-02 │ MIT License for CLI & MCP Server         │ APPROVED    │ CLI, MCP Server     │
│ LDEC-03 │ Unencumbered Ownership of Generated Code │ APPROVED    │ CLI, Registry, Gen  │
│ LDEC-04 │ Mode 4 Subprocess Isolation of Pa11y     │ APPROVED    │ A11y Engine, CLI    │
│ LDEC-05 │ Dual SBOM Strategy (CycloneDX + SPDX)    │ APPROVED    │ Build Pipeline, OSPO│
│ LDEC-06 │ MPL-2.0 Encapsulation of axe-core        │ APPROVED    │ A11y Engine, Test   │
│ LDEC-07 │ Simple Icons Trademark Demarcation       │ APPROVED    │ Registry, CLI Icons │
│ LDEC-08 │ Prohibition of Aceternity & Tailwind UI  │ APPROVED    │ Registry, Discovery │
│ LDEC-09 │ DCO 1.1 Contributor Governance           │ APPROVED    │ Git Repo, Community │
│ LDEC-10 │ Pinned Baseline Dependencies (Exact Sem) │ APPROVED    │ Lockfile, Toolchain │
│ LDEC-11 │ Mandatory Mode 3 JSDoc Legal Headers     │ APPROVED    │ Registry, CLI add   │
│ LDEC-12 │ Self-Hosted Font Delivery (GDPR / OFL)   │ APPROVED    │ Typography, Assets  │
│ LDEC-13 │ Style Dictionary CVE-2026-54639 VEX      │ APPROVED    │ Tokens, Security    │
│ LDEC-14 │ Biome Dual-Licensing Election (Apache)   │ APPROVED    │ AST Tooling, Build  │
│ LDEC-15 │ Commercial Studio Architectural Boundary │ APPROVED    │ Studio, Enterprise  │
└─────────┴──────────────────────────────────────────┴─────────────┴─────────────────────┘
```

---

## 2. Master Decision Records (LDEC-01 through LDEC-15)

### LDEC-01: Adoption of Apache License 2.0 for `@uiforge/core` and `@uiforge/agent-sdk`
- **Context**: UIForge Core and Agent SDK provide foundational infrastructure, AST transformers, and autonomous AI tool execution engines. Enterprise adoption requires strong IP certainty.
- **Decision**: License `@uiforge/core` and `@uiforge/agent-sdk` under the **Apache License 2.0 (Apache-2.0)**.
- **Rationale**: Apache-2.0 Section 3 provides an express, royalty-free patent license from all contributors, backed by an automatic patent retaliation defense clause. This provides enterprise legal counsel with maximum protection against patent trolls.
- **Consequences**: Outbound distributions must bundle Apache-2.0 license text and retain a consolidated `NOTICE` file.

---

### LDEC-02: Adoption of MIT License for `@uiforge/cli` and `@uiforge/mcp-server`
- **Context**: The CLI tool (`@uiforge/cli`) and Model Context Protocol server (`@uiforge/mcp-server`) are customer-facing developer touchpoints.
- **Decision**: License `@uiforge/cli` and `@uiforge/mcp-server` under the **MIT License**.
- **Rationale**: The MIT License offers zero friction for developer onboarding. Global developer tooling ecosystems (Vite, Next.js, Prettier) standardly use MIT. The MCP server aligns directly with Anthropic's official open-source MCP TypeScript SDK licensing conventions.
- **Consequences**: Users can incorporate the CLI into CI pipelines and workflows without complex corporate review.

---

### LDEC-03: Unencumbered User Ownership of Generated Artifacts and Component Code
- **Context**: Autonomous AI agents and CLI generators emit components, tokens, and layouts directly into customer repositories. Developers need guarantees that UIForge will never assert copyright over their application code.
- **Decision**: UIForge formally adopts an immutable legal covenant declaring that **all generated code, JSX, CSS, tokens, and configurations are 100% owned by the end user/customer**, completely unencumbered by UIForge copyright or royalties.
- **Rationale**: Eliminates copyright infringement fears and aligns with developer expectations established by tools like `shadcn/ui`.
- **Consequences**: CLI banners and documentation will explicitly state this legal ownership covenant.

---

### LDEC-04: Strict Subprocess CLI Isolation of LGPL-3.0 Pa11y (Mode 4 Only)
- **Context**: `pa11y/pa11y` (`v10.0.0`) is a powerful accessibility CLI runner, but it is licensed under the reciprocal **GNU Lesser General Public License v3.0 (LGPL-3.0)**. Linking LGPL-3.0 code inside bundled JavaScript engines poses copyleft contamination risks.
- **Decision**: Pa11y is strictly excluded from in-process linking in `@uiforge/core`. It is supported solely as an optional, external command-line runner invoked via `child_process.spawn()` over standard OS process boundaries (**Mode 4: Infrastructure & Tooling**).
- **Rationale**: Operating-system process isolation via standard streams (stdio/JSON) constitutes two separate programs under copyright law, completely preventing LGPL copyleft propagation to UIForge Core.
- **Consequences**: Pa11y is an optional peer CLI; users must install it independently if they desire Pa11y runner support.

---

### LDEC-05: Adoption of Dual-Standard SBOM Architecture (CycloneDX 1.6 + SPDX 2.3)
- **Context**: Enterprise customers, regulatory mandates (EU Cyber Resilience Act), and DevSecOps pipelines require machine-readable software bills of materials.
- **Decision**: Adopt **CycloneDX 1.6 (JSON)** as the primary internal and runtime SBOM standard, while providing on-demand **SPDX 2.3 (JSON)** export via CLI for corporate OSPO legal audits.
- **Rationale**: CycloneDX offers native support for VEX, non-code design tokens, and CI tooling (`@cyclonedx/cyclonedx-npm`). SPDX provides standard legal licensing cross-examination.
- **Consequences**: Build pipelines generate CycloneDX SBOMs automatically on every tagged release.

---

### LDEC-06: File-Scoped Weak Copyleft Encapsulation of MPL-2.0 `axe-core`
- **Context**: `dequelabs/axe-core` (`v4.14.1`) is the gold standard for accessibility testing, licensed under **Mozilla Public License 2.0 (MPL-2.0)**.
- **Decision**: Consume `axe-core` strictly as an unmodified external npm dependency wrapped behind `@uiforge/a11y-engine`. UIForge developers will write zero patches or modifications into axe-core source files.
- **Rationale**: Under MPL-2.0 Section 3.3 ("Larger Works"), combining unmodified MPL-2.0 files with separate proprietary or Apache-2.0 modules is fully permissible and does not trigger copyleft obligations on surrounding code.
- **Consequences**: All accessibility wrapper code resides in separate files under Apache-2.0.

---

### LDEC-07: Simple Icons Trademark Demarcation and Nominative Fair Use Policy
- **Context**: `simple-icons/simple-icons` releases SVG code under CC0-1.0, but brand logos (Google, Apple, AWS) are legally protected trademarks of third parties.
- **Decision**: Permit Simple Icons for brand glyph generation under a strict **Nominative Fair Use Policy** accompanied by an automated disclaimer injected into emitted components.
- **Rationale**: CC0 waives copyright, but trademark rights remain intact. Nominative fair use permits using a trademark solely to identify the authentic product or service.
- **Consequences**: Emitted brand components must include the standard UIForge trademark disclaimer comment.

---

### LDEC-08: Complete Prohibition of Scraping or Copying Proprietary Components
- **Context**: Commercial design libraries such as **Aceternity UI Pro** and **Tailwind UI** publish attractive components on the web, but their Terms of Service prohibit redistribution in libraries, registries, or generators.
- **Decision**: Strictly prohibit copying, scraping, indexing, or redistributing source code or markup from Aceternity UI or Tailwind UI into `@uiforge/component-registry` (`[REJ]` / `[COM]`).
- **Rationale**: Violating upstream commercial EULAs constitutes breach of contract and willful copyright infringement.
- **Consequences**: Any aesthetic concepts inspired by modern web trends must be built using the Clean-Room Engineering Protocol from public, permissive primitives.

---

### LDEC-09: Adoption of Developer Certificate of Origin (DCO 1.1) over Corporate CLA
- **Context**: Managing incoming community contributions requires establishing a clear, unbroken chain of legal copyright title.
- **Decision**: Adopt the **Developer Certificate of Origin (DCO 1.1)** model, requiring all git commits to include a `Signed-off-by: Name <email>` trailer.
- **Rationale**: DCO provides legally recognized certification that contributors possess the right to contribute, without the bureaucratic barrier and legal pushback of corporate Contributor License Agreements (CLAs).
- **Consequences**: Automated GitHub PR gate verifies DCO sign-offs on all incoming pull requests.

---

### LDEC-10: Pinned Baseline Dependency Policy (Exact Semver, Zero Floating Ranges)
- **Context**: Transitive drift and unexpected minor/patch updates in npm dependencies can introduce breaking architectural changes or security vulnerabilities.
- **Decision**: All production dependencies across UIForge workspace packages must be pinned to **exact semver versions** (e.g. `"1.65.1"` instead of `"^1.65.1"`), backed by a frozen `pnpm-lock.yaml`.
- **Rationale**: Guarantees deterministic, reproducible builds and eliminates automated supply-chain drift.
- **Consequences**: Automated Renovate bot creates isolated PRs for dependency updates, each verified through the test suite.

---

### LDEC-11: Mandatory Mode 3 JSDoc Legal Headers for Copied Components
- **Context**: When `@uiforge/cli add` copies component source code from upstream repositories (shadcn/ui, Magic UI) into a customer codebase, copyright law requires retaining upstream copyright notices.
- **Decision**: Mandatory automated injection of a standardized JSDoc legal header at the top of every copied component file, documenting original author, upstream repo URL, SPDX license, and UIForge modification history.
- **Rationale**: Stripping copyright notices violates Section 1 of the MIT License and 17 U.S.C. § 106.
- **Consequences**: CLI code generators must reject emitting component files if header metadata is missing.

---

### LDEC-12: Self-Hosted Font Delivery (OFL-1.1 Compliance & GDPR Privacy)
- **Context**: Modern frontend typography relies on fonts like Inter and Geist (OFL-1.1). Remote loading via Google Fonts CDNs violates EU GDPR privacy mandates (Munich Court ruling).
- **Decision**: UIForge standardizes typography on **100% self-hosted font loading** via `@fontsource` packages. Font binaries remain unmodified, preserving Reserved Font Names under OFL-1.1.
- **Rationale**: Eliminates external IP tracking, ensures offline development capabilities, and complies fully with OFL-1.1 and European data privacy laws.
- **Consequences**: CLI initializes local font assets and emits `OFL.txt` in the customer project.

---

### LDEC-13: Style Dictionary CVE-2026-54639 Remediation and Machine-Readable VEX
- **Context**: Style Dictionary versions `< 5.4.4` were flagged with path traversal advisory `CVE-2026-54639`.
- **Decision**: Pin `style-dictionary@5.8.0`, restrict token operations strictly to in-memory DTCG ASTs, and publish a machine-readable CycloneDX VEX statement justifying `not_affected` status.
- **Rationale**: Resolves vulnerability upstream while formally documenting reachability status for enterprise scanners.
- **Consequences**: Enterprise security scanners will not block UIForge token compilation pipelines.

---

### LDEC-14: Biome Dual-Licensing Election (Electing Apache-2.0 for Patent Protection)
- **Context**: `biomejs/biome` (`v2.6.8`) is dual-licensed under `MIT OR Apache-2.0`.
- **Decision**: UIForge formally elects the **Apache-2.0** licensing option for Biome.
- **Rationale**: Electing Apache-2.0 extends Section 3 patent grant protections to all AST parsing, linting, and formatting operations executed by Biome within UIForge.
- **Consequences**: Recorded in UIForge's package attribution manifest.

---

### LDEC-15: Commercial Studio Architectural Boundary and Air-Gapped Licensing
- **Context**: UIForge Studio is a proprietary commercial product that builds on the open-core foundation.
- **Decision**: Maintain a strict, clean architectural boundary between the open-core packages (`@uiforge/*`) and commercial Studio services via standardized REST/MCP/GraphQL network protocols.
- **Rationale**: Prevents proprietary code from contaminating open-source packages, and guarantees that open-source users enjoy a complete, un-crippled CLI and engine experience.
- **Consequences**: Studio can be licensed under commercial enterprise agreements without relicensing core libraries.

---

## 3. Verification Checkpoint & Sign-Off

- **Decisions Recorded:** 15 / 15 (100.0%)
- **Status:** All decisions formally approved and binding for Phase 03 implementation.
- **Auditor Verification:** Approved by Independent Technical Audit Lead.
