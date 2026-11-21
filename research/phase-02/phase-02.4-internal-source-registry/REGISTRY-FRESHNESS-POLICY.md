# UIForge Phase 02.4: Registry Freshness Policy

**Document ID:** UIF-PH02.4-REGISTRY-FRESHNESS-POLICY  
**Classification:** Open-Source Maintenance, Lifecycle Governance, Registry Staleness  
**Status:** Canonical / Approved  
**Authoritative Location:** `research/phase-02/phase-02.4-internal-source-registry/REGISTRY-FRESHNESS-POLICY.md`  

---

## 1. Executive Summary & Purpose

Software in the open-source ecosystem is dynamic: dependencies publish security patches, maintainers change licensing models, repositories transfer ownership, and projects experience abandonment or upstream stagnation. A source registry that fails to track temporal validity quickly becomes hazardous technical debt.

This policy establishes:
1. **Freshness Tiers & Staleness Windows** calibrated by source discovery priority.
2. **Event-Driven and Time-Driven Invalidation Triggers**.
3. **Automated Re-Evaluation Workflows** and deprecation protocols.

---

## 2. Priority-Calibrated Freshness Tiers

The frequency of registry re-verification is directly proportional to the architectural importance of the source within UIForge:

| Freshness Tier | Priority Scope | Maximum Staleness Window | Invalidation Grace Period | Re-Audit Depth Required |
| :--- | :--- | :--- | :--- | :--- |
| **Tier A (Critical)** | **P0 (Critical Path)** | **30 Calendar Days** | 7 Calendar Days | Full 10-Dimension Audit + Deep IP Clearance + Digest Re-verification |
| **Tier B (High)** | **P1 (High Priority)** | **60 Calendar Days** | 14 Calendar Days | Technical Gate Audit + Package Manifest Audit + License Check |
| **Tier C (Standard)**| **P2 (Standard)** | **90 Calendar Days** | 21 Calendar Days | Automated Integrity Check + CVE Scan + SemVer Drift Check |
| **Tier D (Low)** | **P3 (Exploratory / Deprecated)** | **180 Calendar Days** | 30 Calendar Days | Automated Vulnerability & Activity Ping |

---

## 3. Freshness State Machine

Every source evaluation and entity in the registry tracks its lifecycle through four deterministic freshness states:

```
                  ┌──────────────────────┐
                  │        FRESH         │ (Evaluated within Staleness Window)
                  └──────────┬───────────┘
                             │ Staleness Threshold Exceeded
                             ▼
                  ┌──────────────────────┐
                  │        STALE         │ (In Grace Period; Re-evaluation Queued)
                  └──────────┬───────────┘
                             │ Grace Period Expired
                             ▼
                  ┌──────────────────────┐
                  │       EXPIRED        │ (Eligibility Demoted to PENDING_REVIEW)
                  └──────────┬───────────┘
                             │ Critical Event Trigger (e.g. License/CVE)
                             ▼
                  ┌──────────────────────┐
                  │ PENDING_REEVALUATION │ (Immediate Invalidation; Quarantine)
                  └──────────────────────┘
```

### 3.1 Operational Definitions
- **`FRESH`:** The source was evaluated within its defined staleness window. All recorded permissions and eligibility statuses are fully active and authoritative.
- **`STALE`:** The source has crossed its staleness threshold but remains within its grace period. It remains usable, but an automated notification or background re-evaluation job is triggered.
- **`EXPIRED`:** The grace period has lapsed without re-evaluation. The source’s eligibility status is automatically degraded to `PENDING_REVIEW`, blocking new usage in UIForge templates until re-audited.
- **`PENDING_REEVALUATION`:** A critical external event (e.g., license modification or critical CVE) has immediately invalidated all previous clearances. All permissions are temporarily suspended.

---

## 4. Invalidation Triggers

UIForge enforces two distinct categories of invalidation triggers:

### 4.1 Event-Driven Invalidation Triggers (Immediate)
When any of the following events occur, the source’s freshness status transitions immediately to `PENDING_REEVALUATION`:
1. **Upstream License Modification:** Any commit modifying `LICENSE`, `COPYING`, or license metadata in `package.json`.
2. **Critical Security Advisory:** Publication of a CVE with CVSS $\ge 7.0$ affecting the evaluated version.
3. **Repository Transfer or Renaming:** The upstream repository transfers to a new organization or user handle.
4. **Tarball Digest Drift:** Upstream registry tarball does not match the pinned SHA-256 in `provenance.json`.
5. **Major SemVer Release:** Upstream publishes a new major version (e.g., `v2.0.0` breaking changes).

### 4.2 Time-Driven Invalidation Triggers (Periodic)
- Evaluated sources automatically transition from `FRESH` to `STALE` when `CurrentDate - lastEvaluatedAt > StalenessWindow`.
- If no audit is recorded within `StalenessWindow + GracePeriod`, the source transitions to `EXPIRED`.

---

## 5. Re-Evaluation and Refresh Workflow

When a source requires refreshing:

1. **Automated Metadata Pull:** Fetch the latest release tag, npm packument, and repository commit.
2. **Diff Inspection:** Perform an automated Git diff between the pinned commit and the target commit:
   - Check if `LICENSE` or copyright headers changed.
   - Check if `package.json` dependencies expanded (subdependency sprawl).
   - Check if breaking API changes occurred.
3. **Automated Test Execution:** Run the project's unit tests and validation harness against the new version in an isolated sandbox.
4. **Audit Dossier Update:** Update `evaluations.json`, `provenance.json`, and `evidence.json` with new commit hashes, version numbers, and SHA-256 digests.
5. **Freshness Restoration:** Update `lastEvaluatedAt` to the current timestamp and reset status to `FRESH`.

---

## 6. Deprecation and Retirement Protocol

When an upstream source becomes obsolete, abandoned, or superseded by a superior alternative:

1. **Mark as Deprecated:** Set `discoveryPriority: P3` and flag `deprecated: true` in `sources.json`.
2. **Phase-Out Window:** Allow existing UIForge generation templates a 60-day migration window to transition to an approved successor.
3. **Terminal Invalidation:** Demote `registryEligibility` to `RETIRED` or `BLOCKED`. Set all consumption permissions to `allowed: false`.
4. **Archival:** Retain the historical evaluation and provenance records in the registry for auditability and backwards-compatibility resolution.
