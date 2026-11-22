# UIForge Phase 05 — Fintech Design Patterns
## Numeric Precision, Tabular Ledgers, Audit Integrity & Two-Step Transfers

**Domain:** Fintech, Banking & Investment  
**Document ID:** UIF-PH05-PATT-FINTECH  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Domain Profile & User Mentality
- **User Goals:** Managing financial capital; absolute numerical accuracy; zero tolerance for ambiguity or accidental transfers.
- **Cognitive State:** High vigilance, risk-sensitive, demanding immediate verifiable confirmation of transactions.

---

## 2. Canonical Positive Pattern: `PATT-FIN-001` (Tabular Numeric Ledger)

### 2.1 Information Architecture & Layout
- **Balance Card Summary:** Large net worth / cash balance display (36px tabular numbers), with 24-hour delta badge (`+2.45%`) accompanied by explicit plus/minus glyph.
- **Transaction Ledger:** Full-width dense table:
  - Date & Timestamp (tabular font, left-aligned).
  - Counterparty & Memo (left-aligned with brand icon).
  - Category Badge (neutral grey badge).
  - Status Indicator (multi-modal: green checkmark + `"Settled"`, yellow clock + `"Pending"`).
  - Amount Column: Right-aligned, tabular figures, positive amounts styled in neutral text, negative debits in dark neutral with explicit minus sign (never relying on red color alone).

### 2.2 Critical Safety Workflows (Transfer & Payment)
- **Two-Step Modal Confirmation:**
  - Step 1: Input amount, recipient account, and source wallet.
  - Step 2: Full-screen review modal detailing fees, exchange rate, and recipient verification. Primary button explicitly states: `"Authorize Transfer of $4,500.00 USD"`.
  - Zero Optimistic UI: Transfer state updates only after server transaction receipt is cryptographic verified (`EVID-DOM-002`).

### 2.3 Observable Evaluation Signals
- Mandatory `font-variant-numeric: tabular-nums` on all figures.
- Right-alignment of all monetary columns and header cells.
- Zero irreversible single-click actions.
