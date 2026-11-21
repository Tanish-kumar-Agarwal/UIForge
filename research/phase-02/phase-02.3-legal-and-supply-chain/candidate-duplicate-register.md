# UIFORGE — CANONICAL CANDIDATE DUPLICATE & ALIAS REGISTER
# Resolution of Duplicate URLs and Multi-Capability Upstream Repositories

**Document ID:** `UIF-PH02-DUP-REGISTER`  
**Phase:** Phase 02.2 & 02.3 Master Remediation  
**Status:** Canonical & Audited  
**Date:** November 21, 2026  
**Master Data File:** [candidate-master-inventory.json](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.3-legal-and-supply-chain/data/candidate-master-inventory.json)

---

## 1. Executive Summary & Policy

During the independent verification of UIForge Phase 02.1 through 02.3, two exact repository URL duplications were identified in the canonical candidate inventory:
1. `https://github.com/radix-ui/primitives` (`OS-COMP-02` and `OS-LAYT-03`)
2. `https://github.com/pmndrs/react-spring` (`OS-ANIM-03` and `OS-LAYT-04`)

### Architectural Policy on Candidate Identity
In accordance with UIForge Governance Rule 2.1:
- **Repository URLs do not equate to candidate identities.**
- A single upstream monorepo or open-source repository may legitimately provide distinct architectural capabilities across multiple ecosystem categories.
- A candidate identity represents a **discrete functional capability** within the UIForge architecture, not merely a git remote.
- Neither candidate will be deleted, consolidated, or hidden. Both retain their canonical identifiers, with explicit bidirectional cross-referencing and relationship typing.

---

## 2. Reconciled Duplicate Pairs

### Pair 1: Radix UI Primitives (`OS-COMP-02` vs `OS-LAYT-03`)

```
┌─────────────────────────┬────────────────────────────────────────────────────────────────────────┐
│ Attribute               │ Technical Reconciliation                                               │
├─────────────────────────┼────────────────────────────────────────────────────────────────────────┤
│ Primary Candidate ID    │ `OS-COMP-02`                                                           │
│ Canonical Category      │ Category 01 — UI Component Ecosystems                                 │
│ Evaluated Capability    │ Interactive headless component primitives (Dialog, Popover, Dropdown,  │
│                         │ Tooltip, Select, Tabs, Accordion)                                      │
│ Primary Packages        │ `@radix-ui/react-dialog`, `@radix-ui/react-popover`, `@radix-ui/react-select`│
├─────────────────────────┼────────────────────────────────────────────────────────────────────────┤
│ Secondary Candidate ID  │ `OS-LAYT-03`                                                           │
│ Canonical Category      │ Category 09 — Layout & Responsive Design Patterns                      │
│ Evaluated Capability    │ Structural layout and viewport primitives (AspectRatio, ScrollArea,    │
│                         │ Separator)                                                             │
│ Primary Packages        │ `@radix-ui/react-aspect-ratio`, `@radix-ui/react-scroll-area`,         │
│                         │ `@radix-ui/react-separator`                                            │
├─────────────────────────┼────────────────────────────────────────────────────────────────────────┤
│ Upstream Repository URL │ `https://github.com/radix-ui/primitives`                              │
│ Relationship Type       │ `SAME_REPO_DIFFERENT_CAPABILITY`                                       │
│ Upstream Architecture   │ Lerna/Yarn multi-package monorepo containing 30+ independent npm pkgs  │
│ Audit Resolution        │ Retained as two distinct capability candidates mapped to the same      │
│                         │ upstream git monorepo.                                                 │
└─────────────────────────┴────────────────────────────────────────────────────────────────────────┘
```

---

### Pair 2: React Spring (`OS-ANIM-03` vs `OS-LAYT-04`)

```
┌─────────────────────────┬────────────────────────────────────────────────────────────────────────┐
│ Attribute               │ Technical Reconciliation                                               │
├─────────────────────────┼────────────────────────────────────────────────────────────────────────┤
│ Primary Candidate ID    │ `OS-ANIM-03`                                                           │
│ Canonical Category      │ Category 05 — Animation & Motion Ecosystems                            │
│ Evaluated Capability    │ Spring-physics animation hooks (`useSpring`, declarative micro-motion) │
│ Primary Package         │ `@react-spring/web`                                                    │
├─────────────────────────┼────────────────────────────────────────────────────────────────────────┤
│ Secondary Candidate ID  │ `OS-LAYT-04`                                                           │
│ Canonical Category      │ Category 09 — Layout & Responsive Design Patterns                      │
│ Evaluated Capability    │ Fluid layout transitions, masonry re-ordering, parallax scrolling      │
│                         │ (`useTransition`, `useTrail`, responsive layout reflow animations)     │
│ Primary Package         │ `@react-spring/web`                                                    │
├─────────────────────────┼────────────────────────────────────────────────────────────────────────┤
│ Upstream Repository URL │ `https://github.com/pmndrs/react-spring`                               │
│ Relationship Type       │ `SAME_REPO_DIFFERENT_CAPABILITY`                                       │
│ Upstream Architecture   │ Monorepo containing core physics engine and multi-platform targets     │
│ Audit Resolution        │ Retained as two distinct capability candidates evaluated independently │
│                         │ for animation fidelity (WS2/WS4) vs layout stability (WS4-C).          │
└─────────────────────────┴────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Alias & Prefix Drift Register

Phase 02.3's licensing table introduced prefix renaming across four categories. The following bidirectional map reconciles all historical references:

| Category Number | Canonical Category Name | Canonical Phase 02.1 Prefix | Drifted Phase 02.3 Prefix | Candidate Range | Status |
| :---: | :--- | :---: | :---: | :---: | :---: |
| **02** | Landing & Marketing Components | `OS-MKT-*` | `OS-LAND-*` | `01` – `08` | RECONCILED (Aliased) |
| **08** | Typography & Font Assets | `OS-TYPO-*` | `OS-FONT-*` | `01` – `06` | RECONCILED (Aliased) |
| **11** | Design-to-Code & AST Engines | `OS-D2C-*` | `OS-AST-*` | `01` – `08` | RECONCILED (Aliased) |
| **14** | Visual Regression & Canvas | `OS-VREG-*` | `OS-VIS-*` | `01` – `08` | RECONCILED (Aliased) |

Full JSON mapping is preserved in [candidate-id-alias-map.json](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.3-legal-and-supply-chain/data/candidate-id-alias-map.json).
