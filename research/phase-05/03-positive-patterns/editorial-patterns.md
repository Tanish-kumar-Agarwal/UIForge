# UIForge Phase 05 — Editorial Design Patterns
## Typography Cadence, Optical Line Measure & Long-Form Reading Ergonomics

**Document ID:** UIF-PH05-PATT-EDITORIAL  
**Domain:** Editorial & Publishing  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Domain Profile & User Mentality
- **User Goals:** Deep, sustained reading comprehension; effortless scanning of chapter milestones; zero visual distraction.
- **Cognitive State:** Reflective, immersed, susceptible to optical saccadic fatigue if line measure or leading is misconfigured.

---

## 2. Canonical Positive Pattern: `PATT-EDT-001` (Optical Reading Column)

### 2.1 Information Architecture & Layout
- **Macro Layout:** 3-column asymmetric layout:
  - Left Rail (200px): Publication branding, author bio, social sharing.
  - Center Column ($650\text{px} - 720\text{px}$): Narrative body text (`max-width: 65ch`).
  - Right Rail (240px): Sticky table of contents highlighting the active section via IntersectionObserver.
- **Mobile Reflow:** Left and right rails collapse into a top floating pill bar; the narrative column occupies 100% of mobile width with 16px lateral padding.

### 2.2 Typography & Color Ramps
- **Heading Typeface:** High-contrast transitional or modern serif (e.g. Fraunces, Newsreader, Playfair Display).
- **Body Typeface:** Sturdy, readable reading serif or warm neo-grotesque (e.g. Source Serif 4, Georgia, Charter).
- **Typographic Scale:** H1: 36px (leading 1.2), H2: 26px (leading 1.3), Body: 18px (leading 1.65).
- **Color Palette:** Warm off-white surface (`oklch(0.98 0.005 80)` / `#FBF9F5`) to prevent eye glare; deep charcoal text (`oklch(0.20 0.01 60)` / `#2A2723`) achieving 11:1 contrast ratio.

### 2.3 Observable Evaluation Signals
- Text measure strictly $\le 75\text{ch}$.
- Paragraph separation using vertical rhythm (`margin-bottom: 1.5rem`).
- Drop-caps or pull-quotes styled with explicit semantic landmarks (`<blockquote>`).
