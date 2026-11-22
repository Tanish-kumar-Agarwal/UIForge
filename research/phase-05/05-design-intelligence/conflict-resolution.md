# UIForge Phase 05 — Knowledge Conflict Resolution
## Rule Precedence Hierarchies, Epistemic Arbitration & Boundary Invariants

**Document ID:** UIF-PH05-ENGINE-CONFLICT-RESOLUTION  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. The Precedence Hierarchy (Arbitration Protocol)

In real-world frontend engineering, design requirements inevitably come into conflict (e.g. brand aesthetics vs high contrast, or extreme information density vs large touch targets).

When rules conflict, the Design Intelligence Engine arbitrates using an **Immutable Precedence Hierarchy**:

```
┌─────────────────────────────────────────────────────────────┐
│  LEVEL 1: NORMATIVE STANDARDS (MANDATORY GATE)              │
│  - WCAG 2.2 AA Contrast (4.5:1 / 3:1)                       │
│  - Target Size Minimums (24px / 44px mobile)                │
│  - Unbroken Keyboard Focus Rings                            │
│  - ARIA APG Interaction Contracts                           │
│  * Overrides all lower levels unconditionally *             │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│  LEVEL 2: PERCEPTUAL & COGNITIVE ERGONOMICS (HIGH)          │
│  - Bounded Line Measure (45-75ch)                           │
│  - Proximity & Common Region Grouping                       │
│  - Non-Color-Only Status Indicators                         │
│  - Sub-150ms Interaction Feedback                           │
│  * Overrides stylistic brand preferences *                  │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│  LEVEL 3: DOMAIN CONVENTIONS & TASK DENSITY (MEDIUM)        │
│  - Tabular numerals in financial tables                     │
│  - 32-40px row heights in enterprise data grids             │
│  - Single-column form flows in administrative portals       │
│  * Overrides generic aesthetic templates *                  │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│  LEVEL 4: BRAND EXPRESSION & AESTHETIC FLAIR (ADVISORY)     │
│  - Custom brand colors, display font pairings               │
│  - Corner radius personality (sharp vs rounded)             │
│  - Decorative background tints and brand motion             │
│  * Allowed strictly when Levels 1-3 are fully satisfied *   │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Common Conflict Scenarios & Formal Resolutions

### Conflict 1: Vibrant Brand Color vs. 4.5:1 Text Contrast
- **Scenario:** Brand palette specifies bright yellow (`#FACC15`) or bright cyan (`#06B6D4`) as the primary brand color. Using white text fails contrast ($1.2:1$); using black text clashes with brand guidelines.
- **Resolution:** Level 1 (WCAG AA) overrides Level 4. The engine automatically computes an accessible dark slate text color (`#0F172A`, contrast $12.4:1$) for the button label, or applies the vibrant color strictly as a background surface/border while using dark text.

### Conflict 2: High Data Density vs. 44px Mobile Touch Targets
- **Scenario:** A financial trading table requires 32px row heights to display 25 rows on a desktop screen, but mobile accessibility standards mandate 44px touch targets.
- **Resolution:** Contextual Viewport Splitting. The engine enforces 32px density on `@media (pointer: fine)` (desktop mouse devices), and automatically switches to 44px row heights or a touch-friendly card stack on `@media (pointer: coarse)` (mobile devices).

### Conflict 3: Creative Motion vs. Reduced Motion Preferences
- **Scenario:** Marketing team requests an immersive parallax scrolling hero with animated SVG line drawings.
- **Resolution:** Level 1 overrides Level 4. Parallax and animations are rendered for standard users, but clamped to instantaneous zero-duration opacity shifts when `prefers-reduced-motion: reduce` is active (`EVID-SYS-006`).
