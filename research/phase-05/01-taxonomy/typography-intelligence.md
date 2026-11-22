# UIForge Phase 05 — Typography Intelligence
## Harmonic Type Scales, Optical Ergonomics, Line Measure & Font Performance Architecture

**Document ID:** UIF-PH05-TAX-TYPOGRAPHY-INTELLIGENCE  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Executive Summary & Foundational Invariants

Typography is the foundational scaffolding of software interfaces: more than 90% of information on the web is conveyed through written text. 

UIForge establishes a mathematically coherent, optically balanced, and accessible typographic system. Under this architecture:
- No font family is universally superior; selection is strictly governed by domain context, character set coverage, optical rendering performance, and legal licensing (`SRC-HCI-004`).
- Font sizes must derive from harmonic musical ratios, not arbitrary step intervals.
- Optical line length (measure) is strictly bounded to prevent eye fatigue.
- Numeric data in dashboards and finance must enforce tabular figure alignment.

---

## 2. Harmonic Type Scales & Mathematical Ratios

Typographic size hierarchies must follow established geometric scales:

| Scale Ratio | Factor | Name | Recommended Product Context |
| :--- | :--- | :--- | :--- |
| **Minor Second** | 1.067 | Compact Technical | High-density dashboards, Bloomberg-style financial grids |
| **Major Second** | 1.125 | Productive SaaS | Standard enterprise software, administrative portals |
| **Minor Third** | 1.200 | Harmonic Web | Content management, general SaaS, e-commerce |
| **Major Third** | 1.250 | Expressive Content | Editorial publications, blogs, marketing homepages |
| **Perfect Fourth** | 1.333 | Bold Display | Consumer landing pages, creative portfolios |

### The Standard UIForge Type Ramp (Major Second / Minor Third Hybrid):
- `text-xs`: 12px (0.75rem) — Badges, table micro-metadata, captions.
- `text-sm`: 14px (0.875rem) — Compact UI, form labels, dense table rows, secondary text.
- `text-base`: 16px (1.000rem) — Default body text, form inputs, navigation links.
- `text-lg`: 18px (1.125rem) — Subheadings, card titles, featured lead paragraphs.
- `text-xl`: 20px (1.250rem) — Section titles, modal headers.
- `text-2xl`: 24px (1.500rem) — Page titles (h2), card deck headers.
- `text-3xl`: 30px (1.875rem) — Major view headers (h1), KPI summary numbers.
- `text-4xl`: 36px (2.250rem) — Hero display titles (desktop).
- `text-5xl`: 48px (3.000rem) — Marketing banner headlines.

---

## 3. Optical Ergonomics: Measure, Leading & Tracking

### 3.1 Line Measure (Optical Length)
* **Body Text Invariant:** The line length of continuous prose must be bounded between **45 and 75 characters** (including spaces), with **66 characters** representing the harmonic optimum (`EVID-TYP-001`).
* **Implementation:** Enforce `max-width: 65ch` on all article containers, documentation bodies, and narrative descriptions.
* **Failure Mode:** Unbounded full-width text spanning a 1920px display (>180 characters per line) forces unnatural neck movements, causes reader line-skipping, and increases comprehension error rates by over 40%.

### 3.2 Dynamic Leading (Line Height)
Line height must scale inversely with font size:
* **Display / Headings (24px - 48px):** Tight leading (`1.15` to `1.25`) to prevent optical line disintegration.
* **Body Text (16px):** Generous leading (`1.5` to `1.6`) to provide clear whitespace channels between saccades.
* **Dense UI / Captions (12px - 14px):** Moderate leading (`1.3` to `1.4`) to maintain compact vertical component heights.

### 3.3 Letter Spacing (Tracking)
* **Large Headings:** Apply negative tracking (`letter-spacing: -0.02em` to `-0.01em`) to tighten optical gaps between large glyphs.
* **All-Caps & Small Metadata (11px - 13px):** Apply positive tracking (`letter-spacing: 0.05em` to `0.08em`) to counteract ink spread and optical crowding.
* **Body Text:** Neutral tracking (`letter-spacing: 0` or `normal`).

---

## 4. Typographic Pairings by Product Domain

UIForge formalizes 5 context-specific pairing archetypes utilizing open, high-performance, permissively licensed typefaces:

### 1. Enterprise SaaS & Cloud Dashboards
- **Display / Headings:** Inter / Geist Sans (Clean, geometric-neutral neo-grotesque)
- **Body / Interface:** Inter (High x-height, wide open counters, superb legibility at 13px/14px)
- **Code / Monospace:** JetBrains Mono / IBM Plex Mono (Tabular numerals, clear character disambiguation: 0 vs O, 1 vs l vs I)

### 2. Modern Fintech & Banking
- **Display / Headings:** Plus Jakarta Sans / General Sans (Precise, authoritative geometric sans)
- **Body / Interface:** Inter / Roboto
- **Numeric Figures:** Mandatory `font-variant-numeric: tabular-nums lining-nums` (`EVID-DOM-001`).

### 3. Long-Form Editorial & Academic Platforms
- **Display / Headings:** Fraunces / Newsreader / Playfair Display (High-contrast transitional serif)
- **Body / Reading:** Source Serif 4 / Merriweather / Georgia (Sturdy bracketed serifs, comfortable long-form cadence)
- **Metadata / UI:** Source Sans 3 (Neutral companion sans-serif)

### 4. Developer Tools & Terminal Interfaces
- **Primary Interface:** Geist Sans / Fira Code
- **Editor / Logs / Diffs:** Fira Code / Berkeley Mono / JetBrains Mono (Ligatures optional, zero-ambiguity punctuation)

### 5. Healthcare & Critical Clinical Systems
- **Universal Primary:** IBM Plex Sans / Atkinson Hyperlegible
- **Rationale:** Designed specifically for low-vision and clinical environments; distinct glyph shapes eliminate medical dosage misreading (e.g. 5 vs 6, 8 vs B).

---

## 5. Numeric & Tabular Typography Invariants

In data-dense tables, balance sheets, and metrics widgets:
1. **Tabular Numerals:** Always declare `font-variant-numeric: tabular-nums` (or OpenType `tnum`). Proportional numerals cause ragged, misaligned decimals across stacked rows.
2. **Alignment:** Numbers representing financial amounts, percentages, or measurements must be **right-aligned**. Column headers over numeric columns must also be right-aligned.
3. **Decimals:** Decimals must align vertically on the period separator.

---

## 6. Performance, Loading & Fallback Architecture

### 1. Variable Fonts Optimization
- Prefer modern Variable Fonts (`woff2`) with single-file weight axes (`wght 100 900`). Reduces network requests from 6-8 individual font files down to a single optimized asset.

### 2. Font Display Strategy
- Apply `font-display: swap` to prevent Flash of Invisible Text (FOIT) while avoiding severe layout shifts.
- Preload the primary regular and bold weights in HTML `<head>`.

### 3. Robust Font Fallbacks
Define metrics-overridden system fallbacks to eliminate Cumulative Layout Shift (CLS):
```css
body {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Helvetica,
    Arial,
    sans-serif;
}
```
