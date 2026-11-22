# UIForge Phase 05 — Enterprise SaaS Design Patterns
## App Shell Architecture, Productive Data Grids & Multi-Tasking Ergonomics

**Document ID:** UIF-PH05-PATT-ENTERPRISE-SAAS  
**Domain:** Enterprise SaaS & B2B Software  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Domain Profile & User Mentality
- **User Goals:** High-frequency operational throughput; rapid data entry, filtering, and bulk state management.
- **Cognitive State:** Focused, task-driven, intolerant of slow animations or decorative visual friction.

---

## 2. Canonical Positive Pattern: `PATT-ENT-001` (App Shell & Productive Data Grid)

### 2.1 Information Architecture & Layout
- **App Shell Structure:**
  - Global Top Header (48px height): Global search (`Cmd+K`), tenant switcher, alert center, user profile.
  - Collapsible Primary Sidebar (56px collapsed icon rail, 240px expanded): Grouped navigation landmarks.
  - Contextual Canvas: Main operational table or Kanban board filling remaining viewport area.
  - Slide-Over Inspection Drawer (400px width): Inspects selected row details without navigating away from the table.
- **Productive Data Grid Specs:**
  - Compact row height: $36\text{px} - 40\text{px}$.
  - Column controls: Reorderable, resizable, sticky primary key column on the left.
  - Batch Action Bar: Floating bottom pill appears when 1 or more rows are checked, offering bulk actions (Export, Reassign, Delete).

### 2.2 Typography & Color Ramps
- **Typography:** Inter / Geist Sans. Body: 14px (leading 1.4). Table headers: 12px uppercase medium with positive tracking (`0.05em`).
- **Color Palette:** Neutral slate canvas (`oklch(0.97 0.005 260)` / `#F1F5F9`), pure white card surfaces, subtle 1px border dividers (`#E2E8F0`). High-contrast primary action blue (`#2563EB`).

### 2.3 Observable Evaluation Signals
- Sub-150ms micro-interactions; zero slow transitions on table sorting.
- Keyboard navigation: Full Arrow-key table cell traversal; `Escape` closes drawers and modals.
