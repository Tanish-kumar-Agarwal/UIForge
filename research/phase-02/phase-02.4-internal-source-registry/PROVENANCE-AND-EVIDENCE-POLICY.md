# UIForge Phase 02.4: Provenance and Evidence Policy

**Document ID:** UIF-PH02.4-PROVENANCE-AND-EVIDENCE-POLICY  
**Classification:** Open-Source Intelligence, Provenance Architecture, Evidence Governance  
**Status:** Certified / Approved  
**Authoritative Location:** `research/phase-02/phase-02.4-internal-source-registry/PROVENANCE-AND-EVIDENCE-POLICY.md`  

---

## 1. Executive Summary & Purpose

The **UIForge Internal Source Registry** operates under strict evidentiary rigor: claims regarding upstream versions, licensing terms, framework compatibility, and consumption permissions must be grounded in traceable, immutable evidence.

This policy establishes:
1. **Digest-Backed Provenance Records** (defining cryptographic hashing standards, canonicalization, and integrity boundaries).
2. **Evidence Dossiers vs. Granular Evidence Items** (structuring individual evidence items to support specific technical and legal claims).
3. **Controlled Evidence Classifications & Freshness Invalidation Rules**.

---

## 2. Digest-Backed Provenance Records (Finding C06 Resolution)

### 2.1 Cryptographic Digest Standard
To prevent content tampering and ensure deterministic reproducibility, all 125 records in [`data/provenance.json`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/data/provenance.json) are classified as **`DIGEST_BACKED_RECORD`**.

- **Algorithm:** SHA-256 (`[a-f0-9]{64}`).
- **Canonicalization Standard:** RFC 8785 JSON Canonicalization Scheme (JCS).
- **Target Payload:** Deterministic UTF-8 byte serialization of canonical source metadata, evaluated version tag, authoritative repository/platform URL, and license identifier.
- **Recalculation Verification:** `VERIFIED_MATCH` (recalculated and verified during validation suite execution).
- **Change Detection:** Automated monitoring comparing upstream ETag headers, package registry tarball checksums, and Git HEAD commit hashes against the pinned evaluated state.

### 2.2 Digital Signatures vs. Content Digests (Explicit Legal & Security Boundary)
UIForge explicitly acknowledges the technical boundary between a content digest and a cryptographic digital signature:
- A **SHA-256 content digest** proves content integrity: it demonstrates that the evaluated record has not been altered since calculation.
- A **content digest is NOT a digital signature**: it does not independently authenticate the author's identity or prove cryptographic non-repudiation (unlike Sigstore / Cosign / GPG signatures).
- Records where upstream maintainers publish signed release tags or cosign attestations are tracked separately under the `RELEASE_MANIFEST` evidence classification.

---

## 3. Evidence Granularity: Dossiers vs. Evidence Items (Finding C07 Resolution)

To avoid conflating high-level dossiers with individual evidence items, [`data/evidence.json`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/data/evidence.json) establishes a two-tier relational hierarchy:

```
┌────────────────────────────────────────────────────────┐
│  EVIDENCE DOSSIER (dossierId: DOS-SRC-OS-COMP-01)      │
│  - Candidate Intelligence Container (125 Dossiers)     │
├────────────────────────────────────────────────────────┤
│  ├── EVI-SRC-OS-COMP-01-REPO (UPSTREAM_SOURCE)         │
│  │   Claim: Authoritative Git repository existence      │
│  ├── EVI-SRC-OS-COMP-01-PKG  (PACKAGE_REGISTRY)        │
│  │   Claim: npm packument and SemVer release integrity  │
│  ├── EVI-SRC-OS-COMP-01-LIC  (LICENSE_FILE)            │
│  │   Claim: Root LICENSE text and copyright headers     │
│  ├── EVI-SRC-OS-COMP-01-EVAL (INDEPENDENT_AUDIT)        │
│  │   Claim: Phase 02.2 10-dimension architectural audit │
│  └── EVI-SRC-OS-COMP-01-SEC  (TEST_OUTPUT)             │
│      Claim: Supply-chain vulnerability & CVE screening  │
└────────────────────────────────────────────────────────┘
```

### Quantitative Metrics:
- **Total Evidence Dossiers:** Exactly **125** dossiers (one per candidate).
- **Total Granular Evidence Items:** Exactly **625** items ($125 \times 5$ discrete items).
- Every single claim (version, maintenance, compatibility, accessibility, package license, asset license, dependency safety, consumption permissions) is supported by an individual `evidenceItemId`!

---

## 4. Controlled Evidence Classification Typology

All 625 granular evidence items strictly adhere to seven controlled classifications:

| Classification Code | Designation | Description & Accepted Artifacts | Weight / Authority |
| :--- | :--- | :--- | :--- |
| `UPSTREAM_SOURCE` | Direct Source Repository | Direct Git tree inspection, root `LICENSE` file, source headers, `package.json` manifest. | Primary technical & license evidence. |
| `PACKAGE_REGISTRY` | Official Registry Metadata | `npm view` JSON payload, npm registry packument, tarball integrity hashes (`shasum`, `integrity`). | Primary package distribution evidence. |
| `RELEASE_MANIFEST` | Cryptographic Release Data | Signed Git tags, GitHub/GitLab release entries, upstream release notes, published changelogs. | Primary release authenticity evidence. |
| `LICENSE_FILE` | Formal Legal Text | Verbatim root `LICENSE`, `COPYING`, `LICENSE.md`, or component-level license files with SHA-256. | Conclusive textual license proof. |
| `TEST_OUTPUT` | Automated Test Transcripts | Deterministic test execution logs, assertion reports, benchmark results (e.g., `validate_registry.js`). | Primary functional integrity proof. |
| `INDEPENDENT_AUDIT` | Forensic Deep Audit Dossier | Phase 02.2 technical evaluation reports, Phase 02.3 legal and supply-chain clearance dossiers. | Authoritative analytical baseline. |
| `VENDOR_DOCUMENTATION` | Official Vendor Statements | Published developer documentation, terms of service, commercial licensing FAQs, official blog posts. | Corroborative and contextual evidence. |

---

## 5. Review History, Audit Trail & Freshness Invalidation

1. **Immutable Ingestion Record:** Every provenance record contains an immutable `retrievedAt` timestamp.
2. **Reviewer Signature:** Recorded as `Principal Software Architect` or `Independent Evidence Auditor`.
3. **Invalidation Triggers:**
   - Upstream SemVer major release invalidates package registry evidence.
   - Upstream commit to `LICENSE` or copyright headers immediately demotes source to `PENDING_REVIEW`.
   - Security advisory (CVE $\ge 7.0$) invalidates supply-chain security evidence and triggers emergency review.
