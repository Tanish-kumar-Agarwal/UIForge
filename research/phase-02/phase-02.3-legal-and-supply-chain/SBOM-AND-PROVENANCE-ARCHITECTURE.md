# UIForge Provenance Architecture — SBOM Specifications, PURL, VEX & Attestations

**Document ID:** `UIF-PH02.3-SBOM-PROVENANCE`  
**Phase:** 02.3 — Master Legal, Licensing, Intellectual Property & Software Supply-Chain Audit  
**Classification:** Canonical Software Bill of Materials & Provenance Architecture  
**Date:** November 2026  
**Status:** Complete Architectural Baseline  
**Auditor Lead:** SBOM and Software Provenance Specialist & Software Supply-Chain Security Architect  

---

## 1. Executive Summary & Provenance Mandate

In autonomous software development, code generation agents and registry engines manipulate source code across enterprise boundaries. To meet enterprise security compliance (e.g., US Executive Order 14028, EU Cyber Resilience Act) and eliminate licensing ambiguity, UIForge establishes an end-to-end **Software Bill of Materials (SBOM) and Software Provenance Architecture**.

UIForge treats software provenance not as a post-build afterthought, but as an active, machine-readable data contract generated at every stage: from upstream candidate discovery to component generation, local testing, and release distribution.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        UIFORGE PROVENANCE & SBOM PIPELINE                              │
├──────────────────────────┬────────────────────────────┬────────────────────────────────┤
│ Upstream Source          │ Ingestion & Compilation    │ Downstream Artifact            │
├──────────────────────────┼────────────────────────────┼────────────────────────────────┤
│ Candidate Repositories   │ @uiforge/core / CLI        │ Customer Project / Registry    │
│ PURL: pkg:github/...     │ CycloneDX 1.6 Generator    │ .uiforge/provenance.json       │
│ Git Commit SHA (40-char) │ SPDX 2.3 Legal Export      │ SLSA Level 3 Provenance        │
│ Tarball SHA-512          │ VEX Analysis Engine        │ in-toto Cosign Signed Envelope │
└──────────────────────────┴────────────────────────────┴────────────────────────────────┘
```

---

## 2. Technical Comparison: SPDX vs CycloneDX

UIForge evaluated both major international SBOM standards: **SPDX (Software Package Data Exchange - ISO/IEC 5962:2021)** and **CycloneDX (OWASP Foundation)**.

| Architecture Dimension | SPDX 2.3 / 3.0 | OWASP CycloneDX 1.6 | UIForge Evaluation & Architecture Decision |
| :--- | :--- | :--- | :--- |
| **Primary Focus** | Open-source licensing, legal IP compliance, copyright notices. | Full-spectrum supply-chain security, vulnerability tracking, dependencies, VEX. | CycloneDX 1.6 is superior for automated DevSecOps; SPDX 2.3 is standard for legal OSPO reviews. |
| **Component Granularity** | Files, packages, snippets, license expressions. | Hardware, software, services, ML models, cryptographic assets, formulations. | CycloneDX 1.6 natively supports non-code assets (e.g., Design Tokens, Fonts, ML Prompt models). |
| **VEX Native Support** | Added in SPDX 3.0 (still emerging tooling). | First-class native schema (`vulnerabilities`, `analysis.state`). | CycloneDX VEX enables automated machine-readable triage of non-exploitable transitive CVEs. |
| **Ecosystem Tooling** | `spdx-tools`, FOSSology, ScanCode. | `@cyclonedx/cyclonedx-npm`, Trivy, Grype, Dependency-Track. | Excellent native Node.js and TypeScript tooling support in CycloneDX. |
| **Serialization Formats** | Tag/Value, JSON, YAML, RDF/XML. | JSON, XML, Protocol Buffers. | UIForge prioritizes JSON-schema-validated workflows across all subsystems. |

### 2.1 The Dual-Standard Architecture Decision (`LDEC-05`)
UIForge adopts a **Dual-Standard Strategy**:
1. **Primary Security & Runtime Standard: CycloneDX 1.6 (JSON)**:
   - Emitted during CI builds and embedded in published npm packages.
   - Powers automated vulnerability scanning, dependency graphs, and VEX triage.
2. **Legal & Compliance Export Standard: SPDX 2.3 (JSON)**:
   - Generated on-demand via `@uiforge/cli sbom --format=spdx` for legal counsel, M&A due diligence, and enterprise procurement.

---

## 3. Package URL (PURL) Specification

All components, dependencies, upstream repositories, and assets within UIForge are uniquely identified using the universal **Package URL (PURL) specification** (`scheme:type/namespace/name@version?qualifiers#subpath`):

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        UIFORGE CANONICAL PURL TAXONOMY                                 │
├────────────────────┬───────────────────────────────────────────────────────────────────┤
│ Asset Type         │ Canonical PURL Format & Real-World Example                        │
├────────────────────┼───────────────────────────────────────────────────────────────────┤
│ Core npm Package   │ pkg:npm/%40uiforge/core@1.0.0                                     │
│ Third-Party npm    │ pkg:npm/%40radix-ui/react-primitive@1.1.2                         │
│ Upstream Repo Code │ pkg:github/shadcn-ui/ui@v0.9.4#components/ui/button.tsx          │
│ Ingested Registry  │ pkg:uiforge/registry/card-bento@1.2.0?source=magicui              │
│ Self-Hosted Font   │ pkg:npm/%40fontsource/inter@5.1.0?download_url=https://...        │
│ DTCG Token Bundle  │ pkg:generic/uiforge-tokens/core-tokens@2025.10#tokens/color.json  │
└────────────────────┴───────────────────────────────────────────────────────────────────┘
```

PURLs guarantee deterministic, cross-ecosystem referencing without ambiguity across npm, GitHub, and custom UIForge registries.

---

## 4. Vulnerability Exploitability eXchange (VEX) Architecture

A major challenge in enterprise software supply chains is "vulnerability noise": automated scanners flag transitive dependencies that contain known CVEs, but whose vulnerable code paths are never executed by the consuming application.

UIForge implements a formal **VEX Workflow** complying with the CycloneDX 1.6 VEX standard.

### 4.1 VEX Status States
Every reported CVE is triaged into one of four states:
- `resolved`: Remediated by upgrading the package.
- `not_affected`: The application is not affected by the vulnerability.
- `in_triage`: Under active investigation.
- `exploitable`: Confirmed exploitable; blocks release gates.

### 4.2 Concrete Case Study: Style Dictionary CVE Mitigation
- **Vulnerability**: In Style Dictionary versions `< 5.4.4`, a potential path traversal vulnerability existed in custom transform file resolution.
- **UIForge Analysis**:
  1. UIForge pins `style-dictionary@5.8.0`, resolving the issue upstream.
  2. UIForge's token pipeline uses in-memory JSON objects and strictly validated relative paths, eliminating dynamic filesystem loading.
- **Machine-Readable VEX Record**:
```json
{
  "bomFormat": "CycloneDX",
  "specVersion": "1.6",
  "vulnerabilities": [
    {
      "id": "CVE-2026-54639",
      "source": { "name": "NVD", "url": "https://nvd.nist.gov/vuln/detail/CVE-2026-54639" },
      "affects": [{ "ref": "pkg:npm/style-dictionary@5.8.0" }],
      "analysis": {
        "state": "not_affected",
        "justification": "code_not_reachable",
        "detail": "UIForge operates Style Dictionary exclusively with in-memory DTCG AST tokens. Dynamic file traversal endpoints are disabled."
      }
    }
  ]
}
```

---

## 5. SLSA v1.0 Build Track (Targeting Build Level 3) & in-toto Framework

UIForge targets alignment with the official **SLSA (Supply-chain Levels for Software Artifacts) v1.0 Build Track (targeting Build Level 3)** for official releases of `@uiforge/core`, `@uiforge/cli`, and component registries.

> [!NOTE]
> SLSA Build Level 3 is formally classified as a **Phase 03 implementation target (`PROPOSED-CONTROL`)**. It represents a design specification for Phase 03 build pipelines, not an executed or independently certified compliance level today.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                   SLSA v1.0 BUILD LEVEL 3 ARCHITECTURAL SPECIFICATION                  │
├─────────────────────────┬──────────────────────────────────────────────────────────────┤
│ SLSA Requirement        │ UIForge Implementation Plan (Phase 03 Deliverable)           │
├─────────────────────────┼──────────────────────────────────────────────────────────────┤
│ 1. Source Integrity     │ Version controlled in Git; verified GPG/SSH commit signatures│
│ 2. Retained History     │ Immutable commit history; branch protection on `main`.       │
│ 3. Build Service        │ Dedicated, isolated GitHub Actions hosted runners.           │
│ 4. Ephemeral Environment│ Fresh VM spawned per build; zero reuse of dirty state.       │
│ 5. Isolated Build       │ Zero network access during compilation; pre-fetched hashes.  │
│ 6. Parameterless Build  │ Build commands defined purely in workflow YAML.              │
│ 7. Hermetic Provenance  │ in-toto attestation signed using Sigstore Cosign OIDC.       │
└─────────────────────────┴──────────────────────────────────────────────────────────────┘
```

---

## 6. Authoritative Provenance Schema: `.uiforge/provenance.json`

When components, design tokens, or templates are added to a customer project via `@uiforge/cli`, UIForge records a cryptographic manifest at `.uiforge/provenance.json`.

> [!IMPORTANT]
> A JSON schema that compiles cleanly (such as `provenance-schema.json`) demonstrates **data structure validity, NOT trustworthy software provenance**. In production, trustworthy provenance requires an active trust root (Sigstore Fulcio or enterprise PKI), auditable subject-digest bindings, and an operational key lifecycle. This infrastructure will be instantiated during Phase 03 build pipeline execution.

When components, design tokens, or templates are added to a customer project via `@uiforge/cli`, UIForge records an immutable cryptographic manifest at `.uiforge/provenance.json`:

```json
{
  "$schema": "https://uiforge.dev/schemas/provenance-v1.json",
  "schemaVersion": "1.0.0",
  "generatedAt": "2026-11-21T17:55:00.000Z",
  "generator": {
    "name": "@uiforge/cli",
    "version": "1.0.0",
    "purl": "pkg:npm/%40uiforge/cli@1.0.0"
  },
  "artifacts": [
    {
      "targetPath": "src/components/ui/bento-grid.tsx",
      "purl": "pkg:uiforge/registry/bento-grid@1.0.0",
      "fileSha256": "4a7d1ed414474e4033ac29ccb8653d9b048a82d39ecc0e0e10bee79ced6ace6f",
      "upstream": {
        "repository": "https://github.com/magicuidesign/magicui",
        "purl": "pkg:github/magicuidesign/magicui@0.2.1#components/magicui/bento-grid.tsx",
        "commitSha": "b3e51f8a84620f4c9b207218671ff889d1029c78",
        "author": "Magic UI Community",
        "license": "MIT",
        "licenseUrl": "https://github.com/magicuidesign/magicui/blob/main/LICENSE"
      },
      "transformations": [
        {
          "engine": "@uiforge/token-engine",
          "action": "DTCG-2025.10-token-refactoring",
          "timestamp": "2026-11-21T17:55:00.100Z"
        },
        {
          "engine": "@uiforge/a11y-engine",
          "action": "WCAG-2.2-AA-motion-reduction-injection",
          "timestamp": "2026-11-21T17:55:00.150Z"
        }
      ],
      "compliance": {
        "retainsCopyrightNotice": true,
        "containsReciprocalCopyleft": false,
        "a11yAuditPassed": true,
        "axeCoreVersion": "4.14.1"
      }
    }
  ],
  "signatures": [
    {
      "keyId": "uiforge-release-signer-2026",
      "algorithm": "Ed25519",
      "signature": "3b9a1c...f8e2"
    }
  ]
}
```

---

## 7. Conclusions & Governance Directives

1. **Dual SBOM Standards**: CycloneDX 1.6 for automated DevSecOps pipelines; SPDX 2.3 for legal and OSPO compliance.
2. **Universal PURL Referencing**: All assets, packages, and components must use unambiguous Package URLs.
3. **Automated VEX Processing**: Triaged CVEs must carry machine-readable VEX justification records before passing release gates.
4. **SLSA Level 3 Compliance**: All distributed packages must be built on ephemeral, isolated runners with signed provenance.
