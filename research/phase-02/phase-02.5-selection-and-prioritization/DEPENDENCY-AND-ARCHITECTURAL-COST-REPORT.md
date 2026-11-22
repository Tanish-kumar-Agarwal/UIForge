# UIForge Phase 02.5: Dependency & Architectural Cost Report

**Document ID:** `UIF-PH02.5-DEPENDENCY-AND-ARCHITECTURAL-COST-REPORT`  
**Classification:** Dependency Budget, Supply-Chain Overhead & Bloat Analysis  
**Status:** Certified / Complete  
**Date:** November 2026  

---

## 1. UIForge Core Dependency Budget

To maintain rapid installation, deterministic cold starts, and zero dependency bloat, UIForge Core enforces strict architectural constraints:
- **Zero Heavy Native Addons:** UIForge Core CLI must not require native C++ build toolchains (node-gyp) during standard installation.
- **Tree-Shakeable Package Architecture:** All UI packages must export pure ES modules with explicit side-effect disclosures (`sideEffects: false`).
- **Decoupled Engine Strategy:** Heavy automation engines (Playwright browsers, Docker testcontainers) are treated as out-of-process external tooling or lazy-loaded optional adapters.

---

## 2. Dependency Allocation by Package Role

| Package Category | Adopted Packages / Tools | Target Install Footprint | Runtime Environment | Justification |
| :--- | :--- | :---: | :---: | :--- |
| **Core Runtime (CLI & Studio Engine)** | `@modelcontextprotocol/sdk`, `zod` | < 15 MB | Node.js >= 20.0 | Minimal agent communication transport and runtime schema validation |
| **Core Studio UI (Frontend)** | `@radix-ui/react-*`, `lucide-react`, `motion`, `@tanstack/react-table`, `recharts`, `react-resizable-panels` | < 35 MB | Browser / Next.js | Modern, responsive Studio interface built using UIForge's own recommended primitives |
| **Core Build & Compilation Tools** | `style-dictionary`, `tailwindcss` v4, `@babel/parser`, `@babel/traverse` | < 45 MB | Development Only | Design token transformation and AST code mutation tooling |
| **Testing & Evaluation Infrastructure** | `playwright`, `@axe-core/playwright`, `pixelmatch`, `eslint-plugin-jsx-a11y` | Deferred / User-Managed | Isolated CI/Sandbox | Executed out-of-process for browser rendering, a11y audits, and visual regression |
| **External CLI Binaries** | `ast-grep` (native binary) | Standalone Binary (~20 MB) | System PATH / N-API | High-speed structural code searching without polluting node_modules |

---

## 3. Bloat Mitigation Strategies

1. **Source-Copy Component Pattern:** Emitting shadcn/ui components directly into user projects eliminates 50+ redundant micro-packages from node_modules.
2. **Dynamic Lazy-Loading for Heavy Visual Engines:** Recharts and Pixelmatch are dynamically imported only when executing dashboard analytics or visual regression diffing.
3. **Subprocess Isolation for Testing Engines:** Playwright browser binaries (Chromium, WebKit) are installed on demand via `playwright install` rather than bundled into the default UIForge CLI tarball.
