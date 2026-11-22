# UIForge Phase 05 — Color Intelligence
## Perceptual Color Spaces (OKLCH), Semantic Hierarchy, Accessible Contrast & Theme Engineering

**Document ID:** UIF-PH05-TAX-COLOR-INTELLIGENCE  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Executive Summary: Moving Beyond HSL Flaws to OKLCH

Legacy color modeling using sRGB or HSL is fundamentally broken for algorithmic design systems. In HSL, a pure blue (`hsl(240, 100%, 50%)`) has a perceptual relative luminance of only $0.072$, whereas a pure yellow (`hsl(60, 100%, 50%)`) has a luminance of $0.928$—yet both claim `50% lightness`. Generating accessible color ramps in HSL inevitably produces illegible buttons and broken contrast.

UIForge adopts **OKLCH (CSS Color Module Level 4, `SRC-STD-004`)** as the mathematical engine for color intelligence:
- **Lightness ($L$):** $0.0 - 1.0$ (Strictly uniform perceived lightness).
- **Chroma ($C$):** $0.0 - 0.4$ (Purity/saturation, naturally mapped to monitor gamuts).
- **Hue ($H$):** $0^\circ - 360^\circ$ (Perceptually equidistant color wheel).

---

## 2. The Six Functional Color Tiers

To prevent arbitrary color usage and guarantee theme consistency, UIForge partitions colors into six mutually exclusive functional tiers:

```
┌─────────────────────────────────────────────────────────────────┐
│                    THE SIX FUNCTIONAL TIERS                     │
│                                                                 │
│  1. Surface & Canvas Colors (Backgrounds, Cards, Overlays)      │
│  2. Neutral Text & Border Colors (Content, Dividers, Rules)     │
│  3. Brand & Accent Colors (Identity, Primary Actions, Highlighting)│
│  4. Semantic Feedback Colors (Success, Warning, Critical, Info) │
│  5. Interactive State Layers (Hover, Focus, Pressed, Disabled)  │
│  6. Data Visualization Palettes (Categorical, Sequential, Diverging)│
└─────────────────────────────────────────────────────────────────┘
```

### Tier 1: Surface & Canvas Colors
- **Canvas / Base:** The ground layer (`surface-base`).
- **Surface Level 1:** Raised panels, cards, sidebars (`surface-elevated`).
- **Surface Level 2:** Modals, dropdown popovers, slide-over drawers (`surface-overlay`).
- **Surface Muted:** Subtle container fills, table alternating zebra rows (`surface-subtle`).

### Tier 2: Neutral Text & Border Colors
- **Text Primary:** Minimum 7:1 contrast (WCAG AAA) for long-form reading.
- **Text Secondary:** Minimum 4.5:1 contrast (WCAG AA) for supporting captions and labels.
- **Text Tertiary / Placeholder:** Minimum 3:1 contrast for non-essential hints (never essential information).
- **Border Default:** 3:1 contrast against adjacent surface for input boundaries (`EVID-A11Y-002`).
- **Border Subtle:** 1.5:1 contrast for passive card dividers.

### Tier 3: Brand & Accent Colors
- **Brand Primary:** Main identifier; used sparingly for primary conversion action, active navigation item indicator, and brand accents.
- **Brand Secondary:** Supporting accent; must never clash with semantic feedback hues.

### Tier 4: Semantic Feedback Colors (Universal Invariants)
- **Critical / Destructive (Red):** $H \approx 25^\circ - 30^\circ$ (Errors, account deletion, loss of data).
- **Warning (Amber / Orange):** $H \approx 70^\circ - 85^\circ$ (Degraded performance, unsaved changes, caution).
- **Success (Green):** $H \approx 140^\circ - 150^\circ$ (Transaction confirmed, system healthy).
- **Info (Blue / Cyan):** $H \approx 230^\circ - 250^\circ$ (System updates, neutral advisories).

### Tier 5: Interactive State Layers (Opacity Overlay Model)
Interactive states must not be arbitrary hex swaps. They must apply deterministic state overlays (`EVID-SYS-002`):
- **Hover:** `color-mix(in oklch, currentColor 8%, transparent)` (or `8%` alpha tint).
- **Focus:** 2px high-contrast perimeter ring (`3:1` contrast against surface).
- **Pressed / Active:** `color-mix(in oklch, currentColor 12%, transparent)`.
- **Disabled:** `opacity: 0.38` or explicit desaturated grey with `cursor: not-allowed`.

### Tier 6: Data Visualization Color Palettes
- **Categorical (10 distinct hues):** Must maintain minimum $\Delta E \ge 10$ perceptual distance between adjacent categories.
- **Sequential (Single hue ramp):** Monotonic progression of OKLCH Lightness ($L = 0.90 \rightarrow 0.25$) for density/heatmaps.
- **Diverging (Two hues with neutral center):** Balance positive (blue/green) and negative (red/orange) around neutral grey center ($L = 0.90$).

---

## 3. Light and Dark Theme Engineering

A professional dark theme is **not** an inversion of light colors, nor is it pure `#000000` pitch black:
1. **Never Use Pitch Black (`#000000`) for Main Surfaces:** Pure black causes extreme optical glare against pure white text, creates pixel smearing on OLED displays, and destroys surface elevation cues. Base dark surface should be deep neutral slate (`oklch(0.18 0.01 260)` or `#121417`).
2. **Elevation via Surface Lightening:** In dark mode, shadows are invisible. Surface elevation is achieved by progressively lightening the background surface:
   * Level 0 (Canvas): `oklch(0.18 0.01 260)`
   * Level 1 (Card): `oklch(0.22 0.01 260)`
   * Level 2 (Modal): `oklch(0.26 0.01 260)`
3. **Desaturate Saturated Brand Accents:** Highly saturated vibrant colors that look clean on white paper produce harsh vibrating after-images on dark backgrounds. In dark mode, reduce Chroma ($C$) by $15\% - 25\%$ and slightly increase Lightness ($L$).

---

## 4. Color Blindness & Multi-Modal Redundancy Invariant

**The Non-Color-Only Communication Rule (WCAG 2.2 SC 1.4.1):**
* Color must **never** be the sole indicator of status, priority, or error.
* Every semantic status badge, validation alert, or graph series must combine:
  1. Semantic color tint.
  2. Distinct text label (e.g. `"Failed"`, `"Pending"`, `"Active"`).
  3. Unique icon glyph (e.g. checkmark circle vs exclamation triangle vs clock).
* Protects users with protanopia, deuteranopia (red-green blindness, ~8% of males), tritanopia, and achromatopsia.
