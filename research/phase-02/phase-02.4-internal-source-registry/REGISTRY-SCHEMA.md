# UIFORGE PHASE 02.4 — REGISTRY SCHEMA CONTRACTS
# Formal JSON Schema Draft-07 Specifications & Validation Protocol

**Document ID:** `UIF-PH02.4-REGISTRY-SCHEMA`  
**Phase:** 02.4 — Internal Source Registry  
**Standard:** Software Architecture & Data Contracts  
**Status:** Canonical Schema Baseline  

---

## 1. Schema Specifications Overview

All data models in the UIForge Internal Source Registry are strictly defined using **JSON Schema Draft-07** specifications located in [`schemas/`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/schemas/).

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        REGISTRY SCHEMA SPECIFICATION MATRIX                            │
├──────────────────────────────────┬───────────────────────────────┬─────────────────────┤
│ Schema File                      │ Governed Data Manifest        │ Validated Entities  │
├──────────────────────────────────┼───────────────────────────────┼─────────────────────┤
│ source-registry.schema.json      │ data/sources.json             │ 125 Canonical Recs  │
│ consumption-permissions.schema.js│ data/consumption-permissions.j│ 750 Mode Records    │
│ provenance-and-evidence.schema.js│ data/provenance.json, evidence│ 125 Provenance Recs │
└──────────────────────────────────┴───────────────────────────────┴─────────────────────┘
```

---

## 2. Core Schema Contract Definitions

### 2.1 Source Registry Contract (`source-registry.schema.json`)
Governs the primary source identity records. Requires 16 mandatory properties:
- Mandatory keys: `sourceId`, `canonicalCandidateId`, `name`, `slug`, `sourceType`, `primaryCategory`, `identityStatus`, `discoveryPriority`, `technicalEvaluationStatus`, `licenseDisposition`, `registryEligibility`, `repositoryRef`, `packageRefs`, `licenseRef`, `provenanceRef`, `evaluationRef`.
- Enums enforced:
  - `sourceType`: 15 controlled taxonomy types (`GITHUB_REPOSITORY`, `COMPONENT_REGISTRY`, `DESIGN_SYSTEM`, `COMMERCIAL_PRODUCT`, `SAAS_PLATFORM`, `DOCUMENTATION`, `TECHNICAL_SPECIFICATION`, `FONT_ASSET`, `ICON_ASSET`, `BINARY_ARTIFACT`, etc.).
  - `identityStatus`: `CANONICAL`, `ALIAS`, `DEPRECATED`, `SUPERSEDED`.
  - `discoveryPriority`: `P0`, `P1`, `P2`, `REJ`.
  - `technicalEvaluationStatus`: `complete`, `partial`, `failed`.
  - `licenseDisposition`: `eligible`, `eligible_with_restrictions`, `pending`, `ineligible`.
  - `registryEligibility`: `approved`, `conditional`, `reference_only`, `blocked`.

### 2.2 Consumption Permissions Contract (`consumption-permissions.schema.json`)
Governs the mode-specific operational permissions. Requires:
- Mandatory keys: `permissionId`, `candidateId`, `sourceId`, `consumptionMode`, `eligibility`, `conditions`, `counselReviewRequired`.
- Enums enforced:
  - `consumptionMode`: `REFERENCE_ONLY`, `DEPENDENCY`, `SOURCE_COPY`, `ASSET_REDISTRIBUTION`, `EXTERNAL_TOOL`, `TEMPLATE_ADAPTATION`.
  - `eligibility`: `APPROVED`, `ELIGIBLE_WITH_RESTRICTIONS`, `REFERENCE_ONLY`, `PENDING_REVIEW`, `BLOCKED`, `NOT_APPLICABLE`.
- Structural arrays for: `conditions`, `requiredNotices`, `requiredAttribution`, `sourceAvailabilityRequirements`.

### 2.3 Provenance and Evidence Contract (`provenance-and-evidence.schema.json`)
Governs the cryptographic sealing and audit history:
- Mandatory keys: `provenanceId`, `subjectType`, `subjectId`, `upstreamUrl`, `retrievedAt`, `contentDigest`, `verificationMethod`.
- `contentDigest` enforced as a valid 64-character SHA-256 hex string (`^[a-f0-9]{64}$`).

---

## 3. Schema Versioning & Evolution Protocol

1. **Semantic Versioning:** All schemas declare a top-level `schemaVersion` (currently `1.0.0`).
2. **Backward Compatibility:** Adding optional fields increments the minor version (e.g. `1.1.0`). Removing fields, changing enum values, or adding mandatory properties constitutes a breaking change requiring a major version increment (`2.0.0`) and database migration.
3. **No Silent Reinterpretation:** Historical records evaluated under older schemas retain their original `schemaVersion` reference; records cannot be dynamically reinterpreted without re-running the validation harness.
