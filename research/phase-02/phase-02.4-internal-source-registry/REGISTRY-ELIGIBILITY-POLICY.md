# UIFORGE PHASE 02.4 — REGISTRY ELIGIBILITY POLICY
# Deterministic Decision Precedence, Mandatory Gates & Exception Protocols

**Document ID:** `UIF-PH02.4-ELIGIBILITY-POLICY`  
**Phase:** 02.4 — Internal Source Registry  
**Standard:** Software Supply-Chain Security Engineer & Principal Software Architect  
**Status:** Binding Decision Policy  

---

## 1. Core Principles of Eligibility Governance

1. **Non-Overridable Safety Boundaries:** A high technical architecture score (e.g. 98/100 code quality) can **NEVER** override an affirmative legal block, copyleft licensing hazard, or security vulnerability.
2. **Deterministic & Explainable:** Every eligibility determination must be reproducible from documented business rules without discretionary model improvisation.
3. **Pessimistic Default:** Unknown, missing, or conflicting evidence defaults to `PENDING_REVIEW` or `BLOCKED`. Absence of negative evidence is never treated as approval.

---

## 2. The Ten Mandatory Eligibility Gates

Before a candidate source can receive an operational eligibility determination (`APPROVED` or `ELIGIBLE_WITH_RESTRICTIONS`) for any consumption mode, it must satisfy all ten mandatory gates:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   THE TEN MANDATORY ELIGIBILITY GATES                  │
├──────┬────────────────────────────────┬────────────────────────────────┤
│ Gate │ Verification Requirement       │ Failure Consequence            │
├──────┼────────────────────────────────┼────────────────────────────────┤
│ G01  │ Source Identity Established    │ Rejected (Unidentified Source) │
│ G02  │ Source Provenance Established  │ Marked PENDING_REVIEW          │
│ G03  │ Relevant Version Identified    │ Pinned to latest-stable / SHA  │
│ G04  │ Upstream License File Inspected│ Marked PENDING_REVIEW          │
│ G05  │ Consumption Mode Identified    │ Evaluated per mode             │
│ G06  │ License Obligations Documented │ Marked ELIGIBLE_WITH_RESTRICT  │
│ G07  │ Security Threat Model Cleared  │ Marked BLOCKED                 │
│ G08  │ React 19 / Vite Compatibility  │ Marked FAILED / BLOCKED        │
│ G09  │ Empirical Evidence Dossier Bound│ Marked PENDING_REVIEW         │
│ G10  │ External Counsel Sign-off      │ Conditional pending review     │
└──────┴────────────────────────────────┴────────────────────────────────┘
```

---

## 3. Strict Six-Tier Decision Precedence

When evaluating a candidate against a specific consumption mode, UIForge applies the following strict evaluation hierarchy in order of precedence:

```
  Tier 1: BLOCKED (Highest Precedence)
  └── Triggered by: Commercial closed Terms of Service, paywalled runtime fees,
      abandoned unmaintained dependencies (GAP-06), or viral copyleft in direct code.
      OVERRULES ALL OTHER EVALUATIONS.

  Tier 2: PENDING_REVIEW
  └── Triggered by: Unresolved legal questions (LEG-01 to LEG-10), stale evidence,
      or missing upstream file manifests. Operational consumption paused.

  Tier 3: REFERENCE_ONLY
  └── Triggered by: Proprietary client tools, open specifications (W3C), or design
      systems suited for architectural study but not source distribution.

  Tier 4: ELIGIBLE_WITH_RESTRICTIONS
  └── Triggered by: Weak copyleft (MPL-2.0 Section 3 notices), font software (OFL-1.1
      Reserved Font Name compliance), or non-compete clauses (GSAP). Permitted
      strictly under documented conditions.

  Tier 5: APPROVED
  └── Triggered by: 100% permissive open-source licenses (MIT, Apache-2.0, ISC)
      satisfying all 10 mandatory gates with zero unresolved legal escalations.

  Tier 6: NOT_APPLICABLE (Lowest Precedence)
  └── Triggered by: Consumption mode that does not apply to the candidate type
      (e.g. font binary redistribution applied to a TypeScript compiler utility).
```

---

## 4. Operational Invariant: Licensing Precedence Over Scoring

In Phase 02.5, sources will be evaluated against a preliminary scoring model:
- Code Quality (20%)
- Compatibility (15%)
- Accessibility (15%)
- Responsiveness (15%)
- Maintainability (15%)
- Customization (10%)
- Documentation (10%)

**Rule:** This weighted scoring formula applies **ONLY** to candidates that have achieved an eligibility status of `APPROVED` or `ELIGIBLE_WITH_RESTRICTIONS`. If a candidate is `BLOCKED`, its operational score is automatically set to `0`, and it is disqualified from selection regardless of developer popularity or feature set.
