# UIFORGE PHASE 02.4 — INTERNAL SOURCE REGISTRY
## Authoritative Architecture, Open-Source Intelligence, Provenance & Supply-Chain Governance

**Document ID:** `UIF-PH02.4-README`  
**Phase:** 02.4 — Internal Source Registry  
**Parent Phase:** Phase 02 — Open-Source Ecosystem, Technical Architecture & Supply-Chain Validation  
**Execution Standard:** Principal Software Architect, Registry Platform Architect, Open-Source Ecosystem Researcher, Software Supply-Chain Security Engineer, Data Governance Architect, and Independent Evidence Auditor  
**Status:** PHASE 1 CONTROLLED RESEARCH & ARCHITECTURAL BASELINE COMPLETE  
**Primary Dataset Directory:** [`data/`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/data/)  
**Primary Schemas Directory:** [`schemas/`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/schemas/)  
**Validation Suite:** [`validation/validate_registry.js`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/validation/validate_registry.js)  

---

## 1. Executive Summary & Purpose

The **UIForge Internal Source Registry** is the authoritative, provenance-aware, machine-readable intelligence system that underpins all downstream source selection, component adaptation, dependency installation, and code scaffolding in UIForge.

It is **NOT** a simple URL collection or public component marketplace. It is a strict trust boundary and provenance engine that models:
1. **Source Identity & Provenance:** What an external project is, who authored it, where its canonical source lives, and its SHA-256 content digest.
2. **Entity Decomposition:** Clear separation between **Repositories**, **Packages**, **Components**, and **Assets**.
3. **Multi-Mode Consumption Governance:** Independent permissions across six distinct consumption modes:
   - `REFERENCE_ONLY`
   - `DEPENDENCY`
   - `SOURCE_COPY`
   - `ASSET_REDISTRIBUTION`
   - `EXTERNAL_TOOL`
   - `TEMPLATE_ADAPTATION`
4. **License Obligations & Legal Escalations:** Granular mapping of copyright preservation, attribution, source availability (MPL-2.0 Section 3), subprocess boundaries (LGPL-3.0), and commercial non-compete covenants (Webflow GSAP Standard License).
5. **Deterministic Eligibility:** A six-tier decision precedence model (`BLOCKED` > `PENDING_REVIEW` > `REFERENCE_ONLY` > `ELIGIBLE_WITH_RESTRICTIONS` > `APPROVED` > `NOT_APPLICABLE`) where high technical scores can never override a legal or security block.

---

## 2. Deliverables Inventory

| Deliverable ID | Document Name | Purpose & Contents |
| :--- | :--- | :--- |
| **D01** | [`README.md`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/README.md) | Master overview, directory structure, and phase status. |
| **D02** | [`REGISTRY-ARCHITECTURE.md`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/REGISTRY-ARCHITECTURE.md) | Subsystem boundaries, data flows, and storage strategy. |
| **D03** | [`REGISTRY-DATA-MODEL.md`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/REGISTRY-DATA-MODEL.md) | Normalized entities, foreign key relationships, and lifecycle states. |
| **D04** | [`REGISTRY-SCHEMA.md`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/REGISTRY-SCHEMA.md) | JSON Schema Draft-07 contracts and validation specifications. |
| **D05** | [`INITIAL-REGISTRY-DATASET.md`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/INITIAL-REGISTRY-DATASET.md) | Narrative summary of the 125 canonical records in `data/`. |
| **D06** | [`CONSUMPTION-MODE-POLICY.md`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/CONSUMPTION-MODE-POLICY.md) | Rules, notices, and restrictions across the 6 consumption modes. |
| **D07** | [`REGISTRY-ELIGIBILITY-POLICY.md`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/REGISTRY-ELIGIBILITY-POLICY.md) | Mandatory evaluation gates and deterministic precedence logic. |
| **D08** | [`PROVENANCE-AND-EVIDENCE-POLICY.md`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/PROVENANCE-AND-EVIDENCE-POLICY.md) | Evidence classifications, SHA-256 digests, and review trails. |
| **D09** | [`SECURITY-AND-TRUST-MODEL.md`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/SECURITY-AND-TRUST-MODEL.md) | 30-threat supply-chain model, attack vectors, and controls. |
| **D10** | [`REGISTRY-FRESHNESS-POLICY.md`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/REGISTRY-FRESHNESS-POLICY.md) | Invalidation triggers, refresh tiers, and staleness handling. |
| **D11** | [`REGISTRY-OPERATING-MODEL.md`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/REGISTRY-OPERATING-MODEL.md) | Operating workflows A through G (registration, update, audit). |
| **D12** | [`ARCHITECTURE-INTEGRATION-MAP.md`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/ARCHITECTURE-INTEGRATION-MAP.md) | Core UIForge contracts and conceptual interface definitions. |
| **D13** | [`validation/validate_registry.js`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/validation/validate_registry.js) | Structural, schema, and referential integrity test harness. |
| **D14** | [`REGISTRY-VALIDATION-REPORT.md`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/REGISTRY-VALIDATION-REPORT.md) | Complete test execution transcript and verification report. |
| **D15** | [`REGISTRY-GAP-AND-LIMITATION-REGISTER.md`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/REGISTRY-GAP-AND-LIMITATION-REGISTER.md) | Technical gaps, legal escalations, and future implementation debt. |
| **D16** | [`REGISTRY-DECISION-REGISTER.md`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/REGISTRY-DECISION-REGISTER.md) | Architecture decisions RDEC-01 through RDEC-10 with trade-offs. |
| **D17** | [`PHASE-02.4-ACCEPTANCE-REPORT.md`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/PHASE-02.4-ACCEPTANCE-REPORT.md) | Formal evaluation against Acceptance Criteria AC01 through AC36. |
| **D18** | [`PHASE-02.5-HANDOFF.md`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/PHASE-02.5-HANDOFF.md) | Machine-readable handoff for source selection and scoring. |

---

## 3. Directory Structure

```text
research/phase-02/phase-02.4-internal-source-registry/
├── README.md                                 # Master Registry Overview (D01)
├── REGISTRY-ARCHITECTURE.md                  # Master System Architecture (D02)
├── REGISTRY-DATA-MODEL.md                    # Normalized Data Model (D03)
├── REGISTRY-SCHEMA.md                        # Schema Contracts (D04)
├── INITIAL-REGISTRY-DATASET.md               # Dataset Narrative Summary (D05)
├── CONSUMPTION-MODE-POLICY.md                # 6-Mode Consumption Governance (D06)
├── REGISTRY-ELIGIBILITY-POLICY.md            # Eligibility Decision Logic (D07)
├── PROVENANCE-AND-EVIDENCE-POLICY.md         # Provenance & Digest Strategy (D08)
├── SECURITY-AND-TRUST-MODEL.md               # 30-Vector Threat Model (D09)
├── REGISTRY-FRESHNESS-POLICY.md              # Invalidation & Monitoring (D10)
├── REGISTRY-OPERATING-MODEL.md               # Workflows A through G (D11)
├── ARCHITECTURE-INTEGRATION-MAP.md           # Core Integration Contracts (D12)
├── REGISTRY-VALIDATION-REPORT.md             # Automated Harness Output (D14)
├── REGISTRY-GAP-AND-LIMITATION-REGISTER.md   # Gaps & Open Escalations (D15)
├── REGISTRY-DECISION-REGISTER.md             # RDEC-01 to RDEC-10 (D16)
├── PHASE-02.4-ACCEPTANCE-REPORT.md           # AC01 to AC36 Scorecards (D17)
├── PHASE-02.5-HANDOFF.md                     # Source Scoring Inputs (D18)
├── data/                                     # Normalized Machine-Readable Data
│   ├── sources.json                          # 125 Canonical Sources
│   ├── repositories.json                     # 125 Upstream Repositories
│   ├── packages.json                         # 147 Installable Packages
│   ├── components.json                       # 31 Component Groups
│   ├── assets.json                           # 6 Standalone Assets
│   ├── licenses.json                         # 11 Normalized Licenses
│   ├── evaluations.json                      # 125 Technical Evaluations
│   ├── consumption-permissions.json          # 750 Mode Permissions (125 * 6)
│   ├── provenance.json                       # 125 Provenance Digest Records
│   └── evidence.json                         # 125 Linked Evidence Dossiers
├── schemas/                                  # Formal JSON Schema Draft-07
│   ├── source-registry.schema.json
│   ├── consumption-permissions.schema.json
│   └── provenance-and-evidence.schema.json
└── validation/                               # Verification Harness
    └── validate_registry.js                  # 35-Test Automated Suite
```

---

## 4. Phase 1 Governance Conformance

In strict compliance with `GEMINI.md`:
- All deliverables reside strictly within `research/phase-02/phase-02.4-internal-source-registry/`.
- Zero application source files were created, edited, or deleted.
- Zero dependencies were installed.
- Zero git staging (`git add`), commits, or pushes were performed.
- All modifications sit uncommitted in the working tree awaiting Phase 2 authorization.
