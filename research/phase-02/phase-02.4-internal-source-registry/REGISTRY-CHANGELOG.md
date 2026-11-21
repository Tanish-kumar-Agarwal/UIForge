# UIForge Phase 02.4: Registry Changelog

**Document ID:** UIF-PH02.4-REGISTRY-CHANGELOG  
**Classification:** Version History, Release Notes, Audit Traceability  
**Status:** Canonical / Active  
**Authoritative Location:** `research/phase-02/phase-02.4-internal-source-registry/REGISTRY-CHANGELOG.md`  

---

## [1.1.0] — 2026-11-22

### Final Independent Reconciliation & Acceptance Correction (C01–C10 Resolution)

#### Canonical Priority & Entity Model Corrections
- **C01 (Priority Distribution Reconciliation):** Preserved canonical Phase 02.1 / Phase 02.3 priority census in `data/sources.json`: **P0: 24, P1: 47, P2: 50, REJ: 4**. Added `originalDiscoveryPriority`, `currentDiscoveryPriority`, and `registryOperationalTier` (`TIER_A`: 24, `TIER_B`: 47, `TIER_C`: 50, `TIER_D`: 4). Zero silent conversions of P2/REJ to P3.
- **C02 (Repository Identity & Placeholder Removal):** Reconciled `data/repositories.json` to exactly **119 authoritative Git repositories**. Removed 6 placeholder repositories for commercial products and documentation portals (`aceternity/ui`, `Every-Layout/every-layout`, `locofy/locofy`, `anthropics/claude-code`, `anysphere/cursor`, `codeium/windsurf`). Updated sources to set `repositoryRef: null` and track verified platform URLs.
- **C03 (Consumption Permissions Consistency):** Unified all 750 permission records under a single canonical eligibility enum (`APPROVED`, `ELIGIBLE_WITH_RESTRICTIONS`, `REFERENCE_ONLY`, `PENDING_REVIEW`, `BLOCKED`, `NOT_APPLICABLE`). Set `pa11y` external tool mode to `PENDING_REVIEW` pending formal counsel confirmation of distribution model.
- **C04 (Reference-Only Scope Clarification):** Defined explicit 6-activity scope flags in `consumption-permissions.json`. Prohibited mass automated scraping and code copying across all 125 sources. Prohibited source code inspection and local cloning for commercial/closed products.
- **C05 (Multi-Level License Scoping):** Added granular `licenseScope` to all source records, linking repository, package, component, and asset licenses, along with trademark policies and commercial terms.
- **C06 (Digest-Backed Provenance Records):** Re-classified provenance from "cryptographically verified" to `DIGEST_BACKED_RECORD`. Documented SHA-256 calculation over RFC 8785 JSON Canonicalization Scheme (JCS) and explicitly distinguished content digests from digital signatures.
- **C07 (Granular Evidence Dossiers):** Restructured `data/evidence.json` into 125 candidate dossiers containing **625 granular evidence items** ($125 \times 5$), each supporting discrete technical and legal claims.
- **C08 (10-Dimension Technical Evaluations):** Preserved all **1,250 dimensional assessments** across 10 dimensions in `data/evaluations.json`, traceable to 71 complete (P0/P1) and 54 partial/screened evaluations.
- **C09 (Canonical License Reconciliation):** Documented explicit mapping from 11 canonical license entities in `data/licenses.json` to the 125 candidate records.
- **C10 (Font Asset RFN Evidence):** Verified explicit Reserved Font Name (RFN) declarations for Inter ("with Reserved Font Name Inter", v4.1) and Geist ("with Reserved Font Name Geist", v1.4.0) in `data/assets.json`.
- **Phase 02.5 Filter Correction:** Formulated mode-specific pre-filtering in `PHASE-02.5-HANDOFF.md`, strictly excluding `BLOCKED`, `PENDING_REVIEW`, `STALE`, `EXPIRED`, `NOT_ESTABLISHED`, and reference-only sources from dependency and source-copy selection pools.
- **Validation Harness Expansion:** Expanded `validation/validate_registry.js` from 35 to **41 comprehensive assertions** (all 41 passing cleanly, 0 failures; Script SHA-256: `502067519829c38183122f6332e3b096083aa2a983b8ca0a12ce0cb1641a2d28`).

---

## [1.0.0] — 2026-11-22

### Initial Authoritative Release of the UIForge Internal Source Registry
- Established multi-entity normalized model (sources, repositories, packages, components, assets, licenses, evaluations, permissions, provenance, evidence).
- Defined formal JSON Schema Draft-07 contracts.
- Documented 6 consumption modes, 30-threat security model, freshness tiers, operating model, and platform integration contracts.
