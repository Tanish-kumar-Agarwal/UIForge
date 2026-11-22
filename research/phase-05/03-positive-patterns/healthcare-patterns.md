# UIForge Phase 05 — Healthcare Interface Design Patterns
## Clinical Acuity, Zero-Error Dosage Displays, Triage Indicators & High-Legibility Typography

**Document ID:** UIF-PH05-PATT-HEALTHCARE  
**Domain:** Healthcare, Electronic Health Records (EHR) & Clinical Triage  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Domain Profile & User Mentality
- **User Goals:** Reviewing patient vitals, verifying medication orders, monitoring acute cardiac alarms, executing triage protocols.
- **Cognitive State:** High stress, cognitive fatigue, emergency time pressure; single visual misinterpretation can result in severe medical injury or fatality.

---

## 2. Canonical Positive Pattern: `PATT-HLT-001` (Clinical Alert & Triage Board)

### 2.1 Multi-Modal Critical Alert System
- **Strict Multi-Modal Encoding (`WCAG 2.2 SC 1.4.1`):**
  - Critical Vitals Alert: Pulsating red outline + Audio chime + Explicit text (`"CRITICAL: SpO2 < 85%"`) + Urgent triangle alert icon.
  - Warning / Advisory: Amber outline + `"WARNING: Check BP"` + Clock icon.
  - Normal / Stable: Soft neutral surface + `"STABLE"` + Small checkmark icon.
- **Dosage Typography Invariant:**
  - Mandatory Atkinson Hyperlegible or IBM Plex Sans typography.
  - Distinct numeral shapes prevent catastrophic misreadings between `10mg` and `1.0mg` (the decimal point is rendered with extra prominent spacing).

### 2.2 Patient Timeline & Medication Reconciliation
- **Chronological Medication Flow:** Clear vertical timeline showing exact administration timestamps, administering clinician identity, and verified counter-signatures.
- **Confirmation Guardrails:** Administering high-potency drugs requires mandatory two-factor credential re-authentication and explicit multi-step verification.

### 2.3 Observable Evaluation Signals
- Zero reliance on color alone for patient status.
- Atkinson or Plex typography deployed across all numeric and clinical readings.
- High-contrast mode exceeding WCAG AAA (7:1 contrast) across all text.
