# UIForge Phase 05 — E-Commerce Design Patterns
## Product Discovery, Faceted Filtering, Sticky Buy Boxes & Frictionless Checkout

**Document ID:** UIF-PH05-PATT-ECOMMERCE  
**Domain:** E-Commerce & Merchant Platforms  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Domain Profile & User Mentality
- **User Goals:** Browsing catalogs, evaluating product specifications, comparing alternatives, completing frictionless purchase.
- **Cognitive State:** Exploratory, visual-oriented, sensitive to checkout friction or hidden fees.

---

## 2. Canonical Positive Pattern: `PATT-ECM-001` (Faceted Index & Sticky Buy Box)

### 2.1 Catalog Discovery & Faceted Navigation
- **Left Filter Rail (260px desktop):** Multi-criteria facets (Category, Size, Price Range Slider, Brand, Rating).
- **Active Filter Chips:** Dismissible chips above product grid; prominent single-click `"Clear all"` button.
- **Responsive Product Grid:**
  - Desktop: 4 columns with subgrid alignment (`grid-template-rows: subgrid`) ensuring titles, price rows, and ratings align horizontally across adjacent cards.
  - Mobile: 2 columns with touch-optimized 44px tap targets.

### 2.2 Product Detail Page (PDP) Sticky Buy Box
- **Desktop Layout:** 50/50 split: Left column contains high-resolution media gallery with thumbnail selector; Right column contains title, price, variant selector pills, and primary purchase buttons.
- **Sticky Buy Box:** On mobile scroll, when the main "Add to Cart" button scrolls out of view, a compact bottom bar docks to the bottom edge containing product thumbnail, price, and instant `"Add to Cart"` CTA (`EVID-HCI-005`).

### 2.3 Observable Evaluation Signals
- Subgrid alignment on catalog card decks.
- Sticky mobile buy bar with minimum 44px height and 3:1 contrast.
- Single-page checkout with visible trust badges, itemized pricing, and explicit tax/shipping calculation.
