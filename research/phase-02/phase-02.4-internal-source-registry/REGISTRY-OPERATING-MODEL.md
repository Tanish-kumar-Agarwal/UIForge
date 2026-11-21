# UIForge Phase 02.4: Registry Operating Model

**Document ID:** UIF-PH02.4-REGISTRY-OPERATING-MODEL  
**Classification:** Operational Governance, Registry Workflows, Standard Operating Procedures  
**Status:** Canonical / Approved  
**Authoritative Location:** `research/phase-02/phase-02.4-internal-source-registry/REGISTRY-OPERATING-MODEL.md`  

---

## 1. Executive Summary & Purpose

The **UIForge Internal Source Registry** is an active intelligence and governance platform, not a static document. Maintaining its integrity requires standard operating procedures (SOPs) for all lifecycle events: onboarding candidates, auditing updates, clearing components for emission, redistributing assets, and revoking compromised packages.

This operating model defines seven formal workflows (**Workflows A through G**), specifying preconditions, procedural steps, validation gates, artifacts, and responsible engineering roles.

---

## 2. Standard Operating Workflows

```
┌────────────────────────────────────────────────────────┐
│  WORKFLOW A: Register New Source Candidate             │
│  WORKFLOW B: Update Existing Source Record             │
│  WORKFLOW C: Approve Source for Dependency Consumption │
│  WORKFLOW D: Approve Component for Source Copying      │
│  WORKFLOW E: Approve Asset for Binary Redistribution   │
│  WORKFLOW F: Revoke or Suspend Source Approval         │
│  WORKFLOW G: Audit Registry Integrity & Cross-Refs     │
└────────────────────────────────────────────────────────┘
```

---

### Workflow A: Registering a New Source Candidate

- **Trigger:** A developer or researcher identifies a new open-source candidate for potential UIForge adoption.
- **Responsible Role:** Principal Software Architect / Open-Source Researcher.
- **Preconditions:** Candidate repository is publicly accessible and has a clearly defined open-source or source-available license.
- **Execution Steps:**
  1. *Canonical Identity Discovery:* Identify authoritative GitHub/GitLab URL, primary maintainer organization, and official npm package scope.
  2. *Initial Screening:* Ensure the package is not a duplicate, typosquat, or scraper mirror (`THREAT-01`).
  3. *Entity Generation:* Allocate unique ID (`SRC-NNN`). Add records to `sources.json`, `repositories.json`, and `packages.json`.
  4. *Initial Ingestion:* Set initial status: `registryEligibility: PENDING_REVIEW`, `technicalEvaluationStatus: NOT_EVALUATED`, `licenseDisposition: UNKNOWN`.
  5. *Mode Matrix Generation:* Generate 6 default permissions in `consumption-permissions.json` with `allowed: false`.
- **Validation Check:** Run `validate_registry.js` to ensure referential integrity and schema compliance.
- **Output:** Newly registered entity awaiting technical and legal evaluation.

---

### Workflow B: Updating an Existing Source Record (New Version / Release)

- **Trigger:** Upstream publishes a new release, or automated freshness monitor flags an entity as `STALE`.
- **Responsible Role:** Supply-Chain Security Engineer.
- **Preconditions:** Candidate is already registered in `sources.json`.
- **Execution Steps:**
  1. *Release Verification:* Verify the new release tag, commit hash, and published npm tarball.
  2. *Digest Recalculation:* Download tarball in isolated sandbox, compute SHA-256 digest, and record in `provenance.json`.
  3. *Diff Inspection:* Compare upstream AST, `LICENSE`, and `package.json` against the previous version. Check for subdependency expansion or license drift.
  4. *Automated Test Run:* Execute UIForge integration test suite against the new version.
  5. *Status Update:* If diff passes, update evaluated commit/version in `evaluations.json` and reset `freshnessStatus` to `FRESH`.
- **Validation Check:** Confirm SHA-256 digest matches npm registry metadata.
- **Output:** Updated and re-verified source record.

---

### Workflow C: Approving a Source for Dependency Consumption

- **Trigger:** UIForge generator templates require adding an external package to user project `package.json`.
- **Responsible Role:** Principal Software Architect.
- **Preconditions:** Source has passed Technical Gates G01 through G07 and Licensing Gate G09.
- **Execution Steps:**
  1. *License Verification:* Verify root license is permissive (`MIT`, `Apache-2.0`, `ISC`) or conditional with clear terms.
  2. *Transitive Copyleft Audit:* Inspect entire transitive dependency tree to verify no hidden `GPL`/`AGPL` packages exist.
  3. *Bundle & Runtime Impact:* Check bundle size impact via Bundlephobia/AST metrics.
  4. *Permission Update:* In `consumption-permissions.json`, locate `DEPENDENCY` mode record for source. Set `allowed: true`.
  5. *Notice Injection:* Record exact required copyright string in `requiredNotices`.
- **Validation Check:** Run dependency resolver simulation to ensure zero conflicts with core UIForge dependencies.
- **Output:** Source authorized for `npm install` in generated templates.

---

### Workflow D: Approving a Component for Source-Code Copying

- **Trigger:** UIForge CLI or generator needs to copy an individual component file into a user's local source tree (e.g., shadcn/ui pattern).
- **Responsible Role:** Principal Architect + Legal Counsel.
- **Preconditions:** Candidate license allows modification and sublicensing (`MIT`, `Apache-2.0`). Copyleft licenses strictly prohibited.
- **Execution Steps:**
  1. *Component Extraction:* Isolate the exact component code file (`CMP-NNN`).
  2. *Header Audit:* Retain upstream copyright headers verbatim at the top of the file.
  3. *Tailwind / Styling Decoupling:* Verify component styles align with UIForge tokens and do not leak external CSS variables.
  4. *Accessibility Assertion:* Execute automated axe-core accessibility audit against component DOM output.
  5. *Permission Authorization:* Set `SOURCE_COPY` mode permission to `allowed: true` in `consumption-permissions.json`.
- **Validation Check:** Verify copied component compiles cleanly under `tsc --noEmit` and passes axe-core tests with zero violations.
- **Output:** Component authorized for generator template emission.

---

### Workflow E: Approving an Asset for Redistribution

- **Trigger:** UIForge needs to bundle or distribute a static asset (font binary, icon SVG, rule bundle).
- **Responsible Role:** Legal Counsel + Data Governance Architect.
- **Preconditions:** Asset is explicitly recorded in `assets.json` with an independent cryptographic hash.
- **Execution Steps:**
  1. *License & Reserved Name Audit:* For OFL fonts, verify Reserved Font Names (RFN) are not violated. For icons, verify permissive attribution terms.
  2. *Binary Integrity:* Compute and verify SHA-256 digest of the exact `.woff2` or `.svg` asset bundle.
  3. *Attribution Embedding:* Embed required license file in the distribution directory (`/public/fonts/OFL.txt` or `/public/icons/LICENSE.txt`).
  4. *Permission Authorization:* Set `ASSET_REDISTRIBUTION` mode permission to `allowed: true` with strict notice conditions.
- **Validation Check:** Verify SHA-256 digest of distributed asset matches `assets.json` entry exactly.
- **Output:** Asset cleared for inclusion in UIForge runtime distributions.

---

### Workflow F: Revoking or Suspending a Source Approval

- **Trigger:** A critical CVE is discovered, upstream repository is compromised, or legal dispute arises.
- **Responsible Role:** Supply-Chain Security Engineer / Principal Architect.
- **Preconditions:** Source is currently marked `APPROVED` or `ELIGIBLE_WITH_RESTRICTIONS`.
- **Execution Steps:**
  1. *Immediate Status Demotion:* In `sources.json`, set `registryEligibility: BLOCKED`.
  2. *Permission Revocation:* In `consumption-permissions.json`, set `allowed: false` across all 6 modes with reason `REVOKED_EMERGENCY`.
  3. *Generator Quarantine:* Trigger internal CI rule disabling emission of templates referencing this source.
  4. *Incident Logging:* Log the incident in `REGISTRY-GAP-AND-LIMITATION-REGISTER.md` and `REGISTRY-CHANGELOG.md`.
  5. *Downstream Advisory:* Publish remediation guidance specifying replacement candidates.
- **Validation Check:** Run generator test suite to ensure no generated output references the revoked package.
- **Output:** Source quarantined and blocked across the entire UIForge ecosystem.

---

### Workflow G: Auditing Registry Integrity and Cross-References

- **Trigger:** Scheduled CI pipeline run, pre-release milestone, or manual audit invocation.
- **Responsible Role:** Independent Evidence Auditor.
- **Preconditions:** None (read-only audit).
- **Execution Steps:**
  1. *Schema Validation:* Validate all 10 JSON manifests in `data/` against formal Draft-07 schemas in `schemas/`.
  2. *Referential Integrity Check:* Verify that every foreign key (`repositoryId`, `licenseId`, `sourceId`, etc.) resolves to a valid entity.
  3. *Business Rule Validation:* Verify strict rules (P0/P1 IP clearances, 6 modes per source, SHA-256 digest format, GSAP/axe-core bounds).
  4. *Transcript Generation:* Capture full execution output to `REGISTRY-VALIDATION-REPORT.md`.
- **Validation Check:** Automated test suite `validation/validate_registry.js` must exit with code `0` and 100% assertions passing.
- **Output:** Cryptographically verifiable validation transcript and certified registry state.
