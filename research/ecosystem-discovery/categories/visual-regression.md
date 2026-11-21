# Category 14 — Visual Regression & Quality Verification

**Document ID:** `UIF-CAT-012`  
**Phase:** 02.1 — Open-Source Ecosystem Discovery & Intelligence  
**Category Focus:** Pixel Diffing, Perceptual Color Comparison & Baseline Management  
**Date:** November 2026  

---

## 1. Category Overview

In Workflow B (Existing-Project Improvement), developers need unambiguous proof that an AI agent's modifications did not inadvertently break unrelated UI components. While unit tests verify logical invariants, visual regression tools compute pixel-level diff maps demonstrating exact before-and-after visual changes.

This category audits the open-source image comparison libraries and visual regression test harnesses available to UIForge.

---

## 2. In-Depth Comparative Analysis

| Candidate ID | Project & URL | License | Comparison Algorithm | Execution Environment | Speed (1080p Image) | UIForge Role |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `OS-VREG-01` | **Mapbox pixelmatch** (`mapbox/pixelmatch`) | ISC | Perceptual pixel diff with anti-aliasing detection | Pure JavaScript (zero native C++ build dependencies) | **<50ms** | **`[DEP]` Foundational Diff Engine (P0)** |
| `OS-VREG-02` | **looks-same** (`gemini-testing/looks-same`) | MIT | **CIEDE2000** perceptual color difference calculation | Pure JavaScript / Node.js | ~80ms | **`[DEP]` / `[REF]` Perceptual Color Engine (P1)** |
| `OS-VREG-03` | **Argos CI** (`argos-ci/argos`) | MIT Core | Git-based visual testing runner | Open-source core with hosted cloud platform | CLI / GitHub Actions | `[INF]` / `[REF]` Baseline Manager (P1) |
| `OS-VREG-04` | **Loki** (`oblador/loki`) | MIT | Headless Chrome pixel diffing for Storybook | Node.js CLI | ~150ms per story | `[REF]` Component Story Diffing (P2) |
| `OS-VREG-05` | **BackstopJS** (`garris/BackstopJS`) | MIT | DOM screenshot comparison | CLI / Puppeteer / Playwright | ~250ms per test | `[REF]` Classic Webpage Regression (P2) |
| `OS-VREG-06` | **Lost Pixel** (`lost-pixel/lost-pixel`) | MIT | Open-source visual regression engine for Next.js and Ladle | CLI / CI runner | ~120ms per screen | `[REF]` Modern Visual Engine (P2) |
| `OS-VREG-07` | **Resemble.js** (`rsmbl/Resemble.js`) | MIT | Image analysis and RGB difference matrix | Node.js / Browser | ~100ms | `[REF]` Legacy Reference (P2) |
| `OS-VREG-08` | **Storybook Test Runner** (`storybookjs/test-runner`) | MIT | Playwright-powered component interaction & visual test runner | Node.js CLI | ~90ms per component | `[INF]` Component Verification (P1) |

---

## 3. Pixel Diffing vs. Visual Design Quality

A critical engineering principle established in Phase 02.1:
> **Screenshot similarity does NOT equal good visual design quality.**
- Visual regression tools (`pixelmatch`) answer only one question: *"Did this specific screen change visually relative to its prior commit?"*
- They cannot judge whether:
  - The design is visually appealing.
  - Typographic rhythm is balanced.
  - Touch targets meet accessibility minimums ($24\text{px} \times 24\text{px}$).
  - Layout reflows smoothly across varying viewports.
- **UIForge Application**: Visual diffing is reserved specifically for **Workflow B safety reporting** (demonstrating that a bugfix in `/settings` did not inadvertently change the visual appearance of `/billing`), while visual quality is evaluated using design token constraints, layout contracts, and blinded human review.
