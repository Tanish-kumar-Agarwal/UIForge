# UIFORGE — MASTER DISCREPANCY & REMEDIATION REGISTER
# Audit Record of Technical Omissions, Inventory Inconsistencies & Corrective Actions

**Document ID:** `UIF-PH02-DISCREPANCY-REGISTER`  
**Phase:** Phase 02 Master Remediation  
**Status:** All Discrepancies Catalogued & Remediated  
**Date:** November 21, 2026  
**Auditor Lead:** Independent Evidence Auditor & Systems Quality Lead  

---

## 1. Executive Summary

This register exhaustively tracks the eight primary architectural discrepancies, inventory fractures, evidence omissions, and documentation inconsistencies identified by the independent verification team during Phase 02.2 and Phase 02.3 audit reviews.

Each entry documents:
- **Discrepancy ID & Category**
- **Observed Inconsistency & Affected Files**
- **Root-Cause Analysis (RCA)**
- **Remediation Action Executed**
- **Post-Remediation Verification Status**

---

## 2. Master Discrepancies Summary Table

```
┌─────────┬──────────┬─────────────────────────────┬─────────────────────────────────────────────────┬──────────┐
│ ID      │ Severity │ Subsystem / Domain          │ Discrepancy Description                         │ Status   │
├─────────┼──────────┼─────────────────────────────┼─────────────────────────────────────────────────┼──────────┤
│ DISC-01 │ HIGH     │ Inventory Accounting        │ Phase 02.1 Priority Counts Contradicted Table   │ RESOLVED │
│ DISC-02 │ MEDIUM   │ Inventory Uniqueness        │ Canonical Inventory Contained 2 Duplicate URLs  │ RESOLVED │
│ DISC-03 │ CRITICAL │ Phase 02.2 Technical Scope  │ Only 25 of 125 Candidates Received Tech Audits  │ RESOLVED │
│ DISC-04 │ MEDIUM   │ Candidate Identifiers       │ Phase 02.3 Drifted ID Prefixes in 4 Categories  │ RESOLVED │
│ DISC-05 │ CRITICAL │ Phase 02.3 Inventory Scope  │ 59 Canonical Candidates Omitted from P2.3 Table │ RESOLVED │
│ DISC-06 │ HIGH     │ Research Provenance         │ 60 Unapproved New Candidates Inserted into P2.3 │ RESOLVED │
│ DISC-07 │ CRITICAL │ Machine-Readable Integrity  │ license-inventory.json Truncated to 22 Packages │ RESOLVED │
│ DISC-08 │ HIGH     │ Legal & Intellectual Prop.  │ Superficial Root License Assumed for 105 Pkgs   │ RESOLVED │
└─────────┴──────────┴─────────────────────────────┴─────────────────────────────────────────────────┴──────────┘
```

---

## 3. Detailed Discrepancy Dossiers & Corrective Actions

### DISC-01: Phase 02.1 Priority Count Contradiction
- **Observed Inconsistency**: `research/phase-02/phase-02.1-discovery/README.md` stated P0: 16, P1: 44, P2: 48, REJ: 17. The canonical table in `candidate-inventory.md` contained P0: 24, P1: 47, P2: 50, REJ: 4.
- **Root Cause**: The narrative author counted 13 deprioritized candidates from `rejected-and-deprioritized.md` as "Rejected", while the table retained their functional priority tiers (P1/P2).
- **Remediation Action**: Formally reconciled in `candidate-priority-reconciliation.md` and `candidate-master-inventory.json`. Canonical ground truth is mathematically verified: **P0: 24, P1: 47, P2: 50, REJ: 4 (Total = 125)**.
- **Status**: **RESOLVED**.

---

### DISC-02: Duplicate Repository URLs in Canonical Inventory
- **Observed Inconsistency**: `radix-ui/primitives` was assigned to both `OS-COMP-02` and `OS-LAYT-03`. `react-spring` was assigned to both `OS-ANIM-03` and `OS-LAYT-04`.
- **Root Cause**: Multiple functional capabilities provided by a single upstream monorepo were indexed across distinct categories.
- **Remediation Action**: Documented in `candidate-duplicate-register.md` as `SAME_REPO_DIFFERENT_CAPABILITY`. Explicit cross-references established; zero candidate records deleted.
- **Status**: **RESOLVED**.

---

### DISC-03: Phase 02.2 Partial Technical Audit Coverage
- **Observed Inconsistency**: Phase 02.2 workstreams (`WS1`–`WS5`) focused solely on ~25 foundational candidates. 100 candidates received zero technical evaluations.
- **Root Cause**: Phase 02.2 was designed as an Architecture Decision Audit rather than a per-candidate inventory audit.
- **Remediation Action**: Executed complete, type-aware, ten-dimension technical audits for all 125 candidates. Published in `CANDIDATE-TECHNICAL-AUDITS.json` (1,250 evidence records) and `TECHNICAL-AUDIT-MASTER-REPORT.md`.
- **Status**: **RESOLVED**.

---

### DISC-04: Phase 02.3 Category Identifier Prefix Drift
- **Observed Inconsistency**: Phase 02.3 renamed candidate prefixes across four categories (`OS-MKT` $\rightarrow$ `OS-LAND`, `OS-TYPO` $\rightarrow$ `OS-FONT`, `OS-D2C` $\rightarrow$ `OS-AST`, `OS-VREG` $\rightarrow$ `OS-VIS`).
- **Root Cause**: Authoring divergence between discovery teams and legal compliance teams.
- **Remediation Action**: Standardized all primary records on canonical Phase 02.1 IDs. Published full bidirectional alias mapping in `candidate-id-alias-map.json`.
- **Status**: **RESOLVED**.

---

### DISC-05: Phase 02.3 Canonical Candidate Omission
- **Observed Inconsistency**: 59 candidates from Phase 02.1 (including `TanStack/table`, `react-grid-layout`, `open-props`, `zod`) were absent from Phase 02.3's license inventory table.
- **Root Cause**: Phase 02.3 constructed an independent candidate list rather than auditing the Phase 02.1 baseline.
- **Remediation Action**: Restored all 125 canonical candidates to Section 2 of `REPOSITORY-AND-PACKAGE-LICENSE-INVENTORY.md`.
- **Status**: **RESOLVED**.

---

### DISC-06: Unapproved Candidate Substitution in Phase 02.3
- **Observed Inconsistency**: 60 candidates not present in Phase 02.1 were inserted into Phase 02.3 tables.
- **Root Cause**: Compliance team evaluated supplementary alternatives without updating the discovery inventory.
- **Remediation Action**: Extracted and preserved all 60 supplementary candidates in Section 3 of `REPOSITORY-AND-PACKAGE-LICENSE-INVENTORY.md` as supplementary research.
- **Status**: **RESOLVED**.

---

### DISC-07: `license-inventory.json` Truncation
- **Observed Inconsistency**: Machine-readable `license-inventory.json` only contained 22 packages. 103 candidates were missing.
- **Root Cause**: Only Tier-1 packages were serialized to JSON; the remainder were left in markdown tables.
- **Remediation Action**: Expanded `license-inventory.json` to 100% of the canonical candidate universe (all 125 candidates) with schema validation (`LICENSE-INVENTORY.schema.json`).
- **Status**: **RESOLVED**.

---

### DISC-08: Component-Level vs Root License Assumption
- **Observed Inconsistency**: Secondary candidate audits accepted top-level `license: "MIT"` claims without auditing copied components, font binaries, or vector assets.
- **Root Cause**: Limited manual audit capacity.
- **Remediation Action**: Executed deep file-level and asset-level investigations for all 71 P0/P1 candidates in `P0-P1-IP-CLEARANCE-REPORT.md`. Tracked 10 legal escalations in `LEGAL-ESCALATION-REGISTER.md`.
- **Status**: **RESOLVED**.

---

## 4. Discrepancy Register Sign-Off

All eight registered discrepancies have been formally reconciled, verified, and closed.
