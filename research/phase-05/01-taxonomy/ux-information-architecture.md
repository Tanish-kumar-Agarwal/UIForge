# UIForge Phase 05 — UX Architecture & Information Architecture
## Navigation Taxonomies, Cognitive Chunking, Transactional Forms & Error Recovery Systems

**Document ID:** UIF-PH05-TAX-UX-IA  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Executive Summary & Ergonomic Mandate

Information Architecture (IA) is the structural design of shared information environments. A visually polished interface with a chaotic information architecture is completely unusable: users cannot locate features, abandon transactional funnels, and make catastrophic input errors.

UIForge establishes an evidence-backed IA system grounded in:
1. Cognitive chunking ($4 \pm 1$ items per group, `SRC-HCI-002`).
2. Error prevention and radical error recovery (`SRC-SYS-005`).
3. Predictable multi-tier navigation hierarchies.
4. Progressive disclosure that balances simplicity for novices with power for expert operators.

---

## 2. Navigation Architectures

UIForge defines three standardized navigation models based on product complexity:

### 1. Two-Tier Sidebar Navigation (Enterprise SaaS, Dashboards, Administration)
- **Primary Rail (Left, 56px collapsed / 240px expanded):** Core entity domains (Projects, Analytics, Billing, Settings).
- **Secondary Drawer / Sub-Nav (Nested, 200px):** Sub-pages within the active entity (e.g. Settings $\rightarrow$ Team, Security, API Keys, Audit Logs).
- **Landmark Accessibility:** Wrapped in `<nav aria-label="Main Navigation">`. Active link marked with `aria-current="page"`.

### 2. Top-Bar Utility Navigation (Consumer Apps, Editorial, Simple SaaS)
- **Horizontal Bar (Fixed height 56px or 64px):** Logo on left, maximum 5-7 primary category links in center, action buttons (Search, Cart, Profile) on right.
- **Mobile Transformation:** Hamburger menu button with explicit `aria-expanded` and `aria-controls` opening a full-screen or slide-over drawer. Never truncate horizontal links with arbitrary text cutting.

### 3. Breadcrumb Hierarchy Navigation (Deep Hierarchical Structures)
- **Structure:** `Home / Category / Sub-Category / Current Entity`.
- **Contract:** All intermediate links must be clickable. The current entity (terminal node) is plain text with `aria-current="page"`.

---

## 3. Form Architecture, Validation & Error Recovery

Forms are the primary engine of value exchange in software. Poor form design directly degrades business conversion and user trust.

### 3.1 Structural Form Invariants
1. **Single-Column Flow:** Multi-column forms cause zigzag eye paths and 30% higher error rates. Fields must stack in a single vertical column, with side-by-side inputs reserved strictly for tightly coupled pairs (First Name + Last Name, City + Postal Code).
2. **Explicit Labels Above Inputs:** Floating labels (labels inside the input that shrink on focus) are an anti-pattern: they disappear when the input is filled, impair scanning, and create contrast failures. Labels must sit permanently above inputs (`margin-bottom: 4px`).
3. **Chunking Long Forms:** Any form with $> 6$ fields must be split into logical steps (Wizards / Accordions) with a clear progress tracker (`SRC-HCI-002`).

### 3.2 Error Message Architecture (`EVID-SYS-004`)
* **Timing:** Validate on blur (`onBlur`), never on keydown during initial input (typing error warnings while the user is still typing causes severe user anxiety).
* **Placement & Association:** Error text must sit directly below the input, colored red, and explicitly linked via `aria-describedby="field-error-id"`. Input border turns red with `aria-invalid="true"`.
* **Form-Level Error Summary:** On submit failure, scroll to an Error Summary banner at the top of the form listing all errors as clickable anchor links jumping to the invalid fields (`GOV.UK Standard`).

---

## 4. Search, Filtering & Data Manipulation

1. **Persistent Search Affordance:** Search inputs must include a search icon, a clear placeholder describing scope (e.g. `"Search 12,450 transactions by ID or customer..."`), and a keyboard shortcut hint (`Cmd+K` or `/`).
2. **Filter Chips & Clear All:** Applied filters must be displayed as dismissible tags (chips) above the results. Always provide a single-click `"Clear all filters"` action.
3. **Empty Filter States:** When filters return zero results, explain clearly: `"No transactions match the selected filters."` with a prominent `"Reset Filters"` button. Never show a generic 404 or dead empty space (`EVID-SYS-005`).

---

## 5. Destructive Actions & Confirmation Workflows

1. **Two-Step Confirmation for Irreversible Actions:** Actions that permanently destroy data (e.g. deleting a database, terminating an account) must require explicit confirmation.
2. **Type-to-Confirm for Critical Deletions:** For catastrophic operations, require the user to manually type the exact entity name into an input before the destructive button enables.
3. **Color & Phrasing:** Destructive buttons must use semantic red styling (`bg-destructive`). Action verbs must be specific (`"Delete Project 'Production-DB'"` instead of vague `"OK"` or `"Yes"`).
