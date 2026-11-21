# UIForge Phase 02.4: Provenance and Evidence Policy

**Document ID:** UIF-PH02.4-PROVENANCE-AND-EVIDENCE-POLICY  
**Classification:** Open-Source Intelligence, Provenance Architecture, Evidence Governance  
**Status:** Canonical / Approved  
**Authoritative Location:** `research/phase-02/phase-02.4-internal-source-registry/PROVENANCE-AND-EVIDENCE-POLICY.md`  

---

## 1. Executive Summary & Purpose

The **UIForge Internal Source Registry** operates under an absolute governance principle: **zero unverified claims**. Every entity, evaluation, eligibility determination, and consumption permission recorded in the registry must be anchored in immutable, cryptographic, and traceable upstream evidence.

This policy defines the cryptographic standards, evidence classifications, identity conventions, retention policies, and invalidation rules governing the lifecycle of source intelligence within UIForge.

---

## 2. Source Identity Standards

To prevent namespace ambiguity, dependency confusion, and repository spoofing, all entities registered in UIForge must adhere to canonical identity schemas:

### 2.1 Upstream Repository Identity
- **Canonical Repository URL:** Must point to the authoritative upstream Git repository (`https://github.com/<owner>/<repo>` or `https://gitlab.com/<owner>/<repo>`). Mirrors, unofficial forks, and scraper mirrors are strictly prohibited.
- **Provider Identity:** Explicitly designated enum (`GITHUB`, `GITLAB`, `SELF_HOSTED`).
- **Default Branch Identity:** Authoritatively recorded (e.g., `main`, `master`, `next`).

### 2.2 Package Identity
- **Canonical Package Name:** Full npm package identifier, including official scope (e.g., `@radix-ui/react-primitive`, `@tanstack/react-table`, `lucide-react`).
- **Registry Origin:** Designated npm or GitHub Packages registry URL.
- **Tarball URL:** Upstream npm registry distribution URL (`https://registry.npmjs.org/<package>/-/<package>-<version>.tgz`).

### 2.3 Component & Asset Identity
- **Component ID:** Namespaced identifier (`CMP-<CATEGORY>-<SLUG>`, e.g., `CMP-PRIMITIVE-RADIX-DIALOG`).
- **Asset ID:** Namespaced identifier (`AST-<TYPE>-<SLUG>`, e.g., `AST-FONT-INTER-OFL`, `AST-ICON-LUCIDE-SVG`).
- **Artifact Typology:** Strictly typed enum (`FONT_BINARY`, `SVG_ICON_LIBRARY`, `BUNDLED_JAVASCRIPT_RUNTIME`, `JAVASCRIPT_RULES_BUNDLE`, `BROWSER_EXECUTABLE_ARTIFACT`).

---

## 3. Cryptographic Digest & Verification Policy

### 3.1 Mandatory SHA-256 Digesting
All external artifacts, source trees, test suites, and audit manifests referenced by UIForge must have a calculated and recorded **SHA-256 cryptographic digest** (`[a-f0-9]{64}`).

- **Source Code Tarballs:** SHA-256 of the exact unpacked or packed upstream archive.
- **Asset Binaries:** SHA-256 of the font binary (`.woff2`), SVG asset pack, or script bundle.
- **Evaluation Manifests:** SHA-256 of the local audit script and resulting evidence files.

### 3.2 Git Tree & Commit Pinning
- Head-of-branch tracking is strictly prohibited for production evaluation.
- Every evaluation in `evaluations.json` and provenance record in `provenance.json` must record the exact evaluated Git commit hash (40-character hex) or release tag (e.g., `v1.2.0`).
- If an upstream project updates its default branch, UIForge’s internal registry record remains pinned to the evaluated commit until an explicit update workflow (Workflow B) is executed.

---

## 4. Controlled Evidence Classification Typology

To ensure evidence is treated with appropriate legal and technical weight, UIForge categorizes all supporting evidence into seven controlled classifications:

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

## 5. Evidence Dossier Structure & Storage

All evidence supporting the internal source registry is maintained under the structured directory `research/phase-02/phase-02.4-internal-source-registry/`:

```
research/phase-02/phase-02.4-internal-source-registry/
├── data/
│   ├── sources.json                # Master source index
│   ├── provenance.json             # Provenance records with SHA-256
│   └── evidence.json               # Evidence catalog linked by EvidenceID
├── evidence/
│   ├── licenses/                   # Verbatim captured license texts
│   ├── manifests/                  # Upstream package.json & lockfile snapshots
│   └── transcripts/                # Automated execution logs and test outputs
└── validation/
    ├── validate_registry.js        # Automated verification harness
    └── test_transcript.log         # Test output verification trace
```

### 5.1 Evidence Record Schema
Every entry in `evidence.json` must supply:
1. `evidenceId`: Unique identifier (`EVD-<SOURCE_ID>-<NNN>`).
2. `sourceId`: Reference to parent `SRC-<NNN>`.
3. `classification`: One of the 7 controlled classifications.
4. `description`: Objective explanation of what this evidence proves.
5. `artifactPath`: Relative path to the local evidence file or canonical upstream URL.
6. `sha256`: 64-character hexadecimal digest of the local artifact.
7. `verifiedAt`: ISO 8601 timestamp of verification.
8. `verifiedBy`: System or principal engineer who conducted the audit.

---

## 6. Review History & Audit Trail Standards

The source registry maintains an immutable audit trail for all evaluations and approvals:
- **Created Timestamp:** Immutable ISO 8601 record of initial ingestion.
- **Last Verified Timestamp:** Timestamp of the most recent audit or automated validation pass.
- **Reviewer Signature:** Identity of the principal engineer or automated harness validating the record.
- **Preceding Status:** If a source’s eligibility changes (e.g., from `APPROVED` to `BLOCKED`), the previous status, transition date, and justification must be recorded in `REGISTRY-GAP-AND-LIMITATION-REGISTER.md` and `REGISTRY-CHANGELOG.md`.

---

## 7. Evidence Invalidation & Freshness Triggers

Evidence does not remain valid indefinitely. UIForge establishes strict invalidation triggers:

1. **Upstream Release Invalidation:** A new major or minor version tag invalidates `PACKAGE_REGISTRY` and `RELEASE_MANIFEST` evidence for that version line.
2. **License Text Modification:** Any alteration in the upstream repository's `LICENSE` file invalidates all prior license clearances and immediately demotes the source to `PENDING_REVIEW`.
3. **Repository Transfer or Renaming:** Changes in repository ownership or URL invalidate repository-level identity and trigger identity re-verification.
4. **Digest Mismatch:** Any mismatch between a newly downloaded tarball and recorded SHA-256 triggers an immediate critical security alert (`THREAT-02`, Tampering).
5. **Periodic Expiration:** Evaluated sources expire according to their freshness tier (P0: 30 days, P1: 60 days, P2: 90 days, P3: 180 days).
