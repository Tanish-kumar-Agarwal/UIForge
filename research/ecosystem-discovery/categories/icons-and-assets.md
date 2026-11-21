# Category 06 — Icons, Illustrations & Visual Asset Ecosystems

**Document ID:** `UIF-CAT-005`  
**Phase:** 02.1 — Open-Source Ecosystem Discovery & Intelligence  
**Category Focus:** Vector Icon Systems, Brand Assets & SVG Tooling  
**Date:** November 2026  

---

## 1. Category Overview

Icons provide critical visual wayfinding across web interfaces. AI coding agents frequently struggle with icons:
- Hallucinating non-existent icon component names (e.g., importing `ChevronDoubleRight` when the library only has `ChevronsRight`).
- Mixing mismatched icon stroke widths and visual weights across adjacent buttons.
- Forgetting accessible labels (`aria-hidden="true"` or accompanying visually-hidden screen reader text).

This category audits the open-source vector icon libraries and asset compilers available to UIForge.

---

## 2. In-Depth Comparative Analysis

| Candidate ID | Project & URL | License | Icon Count | Grid Geometry | Tree-Shaking | UIForge Role |
| :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| `OS-ICON-01` | **Lucide Icons** (`lucide-icons/lucide`) | ISC | 1,400+ | Uniform 24x24, 2px stroke | **100% Tree-Shakable** | **`[DEP]` / `[REG]` Primary Standard (P0)** |
| `OS-ICON-02` | **Heroicons** (`tailwindlabs/heroicons`) | MIT | ~300 | 24x24 (outline/solid), 16x16 (micro) | **100% Tree-Shakable** | **`[REG]` Secondary Standard (P1)** |
| `OS-ICON-03` | **Tabler Icons** (`tabler/tabler-icons`) | MIT | 5,200+ | Uniform 24x24, configurable stroke | **100% Tree-Shakable** | `[REG]` High-Volume Alternative (P1) |
| `OS-ICON-04` | **Phosphor Icons** (`phosphor-icons/core`) | MIT | 1,200+ | 6 weights (thin, light, regular, bold, fill, duotone) | **100% Tree-Shakable** | `[REG]` Weight-Adaptive Alternative (P1) |
| `OS-ICON-05` | **Iconify** (`iconify/iconify`) | MIT | 200,000+ | Variable across 150+ sets | On-demand SVG API | `[DEP]` / `[REG]` Universal Fallback (P1) |
| `OS-ICON-06` | **Material Symbols** (`google/material-design-icons`) | Apache-2.0 | 3,000+ | Variable Font axes & SVG | Font / SVG | `[REG]` Material Reference (P2) |
| `OS-ICON-07` | **SVGR** (`gregberge/svgr`) | MIT | N/A | Node.js SVG to React TSX compiler | CLI / Node API | **`[DEP]` Core Toolchain Asset (P1)** |
| `OS-ICON-08` | **Simple Icons** (`simple-icons/simple-icons`) | CC0 1.0 | 3,000+ | Brand & tech vector logos | **100% Tree-Shakable** | **`[REG]` Brand Logo Standard (P1)** |

---

## 3. Provenance & Trademark Governance (Simple Icons)

While `simple-icons` is distributed under the public domain **CC0 1.0** license, the visual marks themselves are **registered trademarks** of their respective corporations (GitHub, Google, Vercel, Stripe).

UIForge enforces two rules:
1. *Brand Fair Use:* Brand icons may only be used to represent the actual product, service, or integration.
2. *Non-Endorsement:* UIForge generated templates will not display third-party corporate logos in a manner that implies official endorsement.

---

## 4. The Canonical Icon Manifest in UIForge

To prevent agent hallucination, UIForge maintains an automated JSON index of all 1,400+ Lucide icon names and their standard categories (arrows, actions, media, commerce, navigation). Coding agents query this index via MCP (`uiforge://icons/search?q=cart`) to retrieve the exact verified component export string (`ShoppingCart`).
