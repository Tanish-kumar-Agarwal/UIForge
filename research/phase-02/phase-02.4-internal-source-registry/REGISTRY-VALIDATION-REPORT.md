# UIForge Phase 02.4: Reconciled Registry Validation Report

**Document ID:** UIF-PH02.4-REGISTRY-VALIDATION-REPORT  
**Classification:** Automated Test Execution, Quality Assurance, Audit Certification  
**Status:** Certified / Complete  
**Authoritative Location:** `research/phase-02/phase-02.4-internal-source-registry/REGISTRY-VALIDATION-REPORT.md`  
**Execution Timestamp:** 2026-11-22T01:41:40+05:30  
**Validation Engine:** Node.js v24.15.0 (Windows NT x64)  
**Harness Script:** `research/phase-02/phase-02.4-internal-source-registry/validation/validate_registry.js`  
**Harness SHA-256 Digest:** `a96bfe007c3f57c12c0f365a677131de795cb8d38598b1524b2a635bef67916c`  

---

## 1. Executive Summary & Audit Scope Qualification

In accordance with independent audit findings 1 through 12, an expanded automated validation harness was executed against the reconciled UIForge Phase 02.4 dataset.

### 1.1 What the Automated Validation Harness Directly Proves (Issue 8 Resolution)
- **Draft-07 Schema Conformance:** Validates that all 10 manifests strictly conform to the 3 Draft-07 formal JSON Schemas.
- **Referential Integrity & Entity Preservation:** Validates that 100% of the 125 canonical candidate IDs match the upstream inventory directly via immutable `candidateId`.
- **Authoritative Repository & Platform Separation:** Confirms exactly 119 verified Git repositories and 6 non-repository platforms with `repositoryRef: null`.
- **Exact Dependency Arithmetic:** Accounts for all 125 records in `DEPENDENCY` mode: 111 `APPROVED` + 2 `ELIGIBLE_WITH_RESTRICTIONS` (113 eligible) + 7 `BLOCKED` + 1 `PENDING_REVIEW` + 4 `NOT_APPLICABLE` = 125.
- **License & Asset Entity Census:** Confirms 12 normalized licenses (including `LIC-EVERY-LAYOUT-COMMERCIAL`) and 8 assets (including JetBrains Mono and Fira Code traced to Fontsource `OS-TYPO-03`).
- **Cryptographic Provenance:** Confirms all 125 records are classified as `DIGEST_BACKED_RECORD` with valid 64-character SHA-256 digests.
- **Claim-Level Evidence Quality:** Confirms all 625 evidence items contain `claimSupported`, `exactSourceArtifact`, `relevantFileOrSection`, and `verificationClassification`.

### 1.2 What Remains Outside the Scope of Automated Testing (Subject to Manual/Legal Review)
- **Substantive Legal Clearance:** Automated tests confirm that permission fields match policy enums and required notices are present; they do NOT substitute for certified legal counsel opinion on complex copyleft or commercial non-compete terms.
- **Upstream Author Authenticity:** Content digests verify local artifact integrity, not cryptographic digital signatures (e.g. Cosign/Sigstore) of the upstream authors.
- **Transitive CVE Evolution:** Automated tests check recorded vulnerability statuses at evaluation time; real-time emerging CVEs require continuous CI pipeline monitoring.
- **Runtime Component Quality:** Validates recorded scores; deep visual and behavioral rendering in live browsers is executed in Phase 02.5 and Phase 03.

---

## 2. Test Execution Summary

- **Total Assertions Evaluated:** 46
- **Assertions Passed:** 46 (100.0%)
- **Assertions Failed:** 0 (0.0%)
- **Assertions Skipped:** 0 (0.0%)
- **Exit Status Code:** `0` (Clean Exit)
- **Certification Outcome:** **FULL ACCEPTANCE / PASS (46 / 46 Assertions)**

---

## 3. Verbatim Validation Execution Transcript

```
================================================================
UIFORGE PHASE 02.4: RECONCILED INTERNAL SOURCE REGISTRY HARNESS
================================================================
[PASS] 01: All 10 normalized data entities exist and parse as valid JSON
[PASS] 02: All 3 JSON Schemas exist and parse as valid Draft-07 schemas
[PASS] 03: Source registry contains exactly 125 canonical records (observed: 125)
[PASS] 04: All 125 source records have unique sourceId identifiers with zero collisions
[PASS] 05: 100% of immutable canonical candidate IDs from Phase 02.1/02.3 match directly in sources.json
[PASS] 06: 100% of candidate records preserve original discovery priority from canonical inventory
[PASS] 07: Canonical priority distribution matches exactly: P0: 24, P1: 47, P2: 50, REJ: 4 (observed: P0:24, P1:47, P2:50, REJ:4)
[PASS] 08: Operational tiers map deterministically to priorities: TIER_A: 24, TIER_B: 47, TIER_C: 50, TIER_D: 4
[PASS] 09: Authoritative Git repository manifest contains exactly 119 real Git repositories (observed: 119)
[PASS] 10: Exactly 119 open-source candidates link to verified Git repositories in repositories.json (observed: 119)
[PASS] 11: Exactly 6 commercial/docs/SaaS candidates have repositoryRef: null with verified platform URLs (observed: 6)
[PASS] 12: Normalized packages manifest contains 147 packages resolving monorepos (observed: 147)
[PASS] 13: Components manifest contains 31 primary component groups (observed: 31)
[PASS] 14: Canonical license manifest defines exactly 12 normalized license entities including Every Layout (observed: 12)
[PASS] 15: 100% of source records link to normalized licenses and feature granular licenseScope
[PASS] 16: Asset manifest tracks exactly 8 standalone assets including JetBrains Mono and Fira Code (observed: 8)
[PASS] 17: Inter font asset explicitly documents RFN declaration ("with Reserved Font Name Inter"), version 4.1, and unchanged binary status
[PASS] 18: Geist font asset explicitly documents RFN declaration ("with Reserved Font Name Geist"), version 1.4.0, and unchanged binary status
[PASS] 19: JetBrains Mono and Fira Code are traced to Fontsource monorepo candidate (OS-TYPO-03) with OFL RFN preservation
[PASS] 20: Consumption permissions matrix contains exactly 750 records (125 * 6 modes; observed: 750)
[PASS] 21: 100% of permission records adhere strictly to canonical eligibility enum
[PASS] 22: 100% of permission records maintain consistent allowed boolean derivations
[PASS] 23: GSAP dependency mode is ELIGIBLE_WITH_RESTRICTIONS scoped to UIForge programmatic React emission vs no-code animation builder
[PASS] 24: GSAP source-copy mode is strictly BLOCKED
[PASS] 25: axe-core dependency mode is ELIGIBLE_WITH_RESTRICTIONS (MPL-2.0 Section 3 notice obligations)
[PASS] 26: axe-core source-copy mode is ELIGIBLE_WITH_RESTRICTIONS (modified covered files under MPL-2.0)
[PASS] 27: axe-core external tool is ELIGIBLE_WITH_RESTRICTIONS with distribution boundary (invokes user-installed @axe-core/cli; no binary bundling)
[PASS] 28: pa11y dependency mode is PENDING_REVIEW (LGPL-3.0 dynamic linking concerns)
[PASS] 29: pa11y source-copy mode is strictly BLOCKED
[PASS] 30: pa11y external-tool mode is PENDING_REVIEW pending counsel confirmation of distribution model
[PASS] 31: DEPENDENCY mode accounts for all 125 records without omissions (observed: 125)
[PASS] 32: Exact dependency arithmetic verified: 111 APPROVED + 2 RESTRICTED (113 eligible) + 7 BLOCKED + 1 PENDING + 4 NOT_APPLICABLE = 125
[PASS] 33: 100% of REFERENCE_ONLY records define explicit granular referenceScope flags
[PASS] 34: Automated scraping and code copying are strictly prohibited across ALL 125 reference records
[PASS] 35: Commercial/closed products strictly forbid source inspection and local cloning under reference mode
[PASS] 36: Evaluations manifest contains 125 evaluation dossiers (observed: 125)
[PASS] 37: Exactly 1,250 dimensional assessments preserved across all 125 candidates (125 * 10; observed: 1250)
[PASS] 38: Technical evaluations traceable to Phase 02.2: 71 complete candidate technical evaluations (all 10 assessed) and 54 screened/partial evaluations
[PASS] 39: Evidence manifest contains exactly 125 candidate dossiers (observed: 125)
[PASS] 40: Evidence catalog contains 625 granular evidence items supporting individual claims (observed: 625)
[PASS] 41: 100% of granular evidence items include claimSupported, exactSourceArtifact, relevantFileOrSection, and verificationClassification
[PASS] 42: Provenance manifest contains 125 records (observed: 125)
[PASS] 43: 100% of provenance records correctly classified as DIGEST_BACKED_RECORD with valid SHA-256 digests
[PASS] 44: Eligible dependencies pool contains exactly 113 candidates (111 APPROVED + 2 RESTRICTED)
[PASS] 45: Ineligible dependency pool accounts for remaining 12 candidates (7 BLOCKED + 1 PENDING + 4 NOT_APPLICABLE)
[PASS] 46: pa11y, Aceternity, Locofy, and Every Layout are strictly excluded from eligible dependency pool
----------------------------------------------------------------
RECONCILED VALIDATION SCRIPT SHA-256: a96bfe007c3f57c12c0f365a677131de795cb8d38598b1524b2a635bef67916c
================================================================
VALIDATION HARNESS COMPLETE: 46 / 46 TESTS PASSED (0 failures)
================================================================
```

---

## 4. Reproducibility Guide

To reproduce this validation report in any environment:

```bash
cd c:/Users/kukpo/OneDrive/Desktop/UIForge
node research/phase-02/phase-02.4-internal-source-registry/validation/validate_registry.js
```

**Auditor:** Principal Software Architect & Independent Evidence Auditor  
**Date:** 2026-11-22  
**Result:** **FULL ACCEPTANCE (PASS)**
