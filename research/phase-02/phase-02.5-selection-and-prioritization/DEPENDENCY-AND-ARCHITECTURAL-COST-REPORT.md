# UIForge Phase 02.5: Dependency & Architectural Cost Report

**Document ID:** `UIF-PH02.5-DEPENDENCY-AND-ARCHITECTURAL-COST-REPORT`  
**Classification:** Dependency Budget, Supply-Chain Overhead & Bloat Analysis  
**Status:** Certified / Complete  
**Date:** November 2026  

---

## 1. UIForge Proposed Core Dependency Budget

To maintain rapid installation, deterministic cold starts, and zero dependency bloat, UIForge proposes a **<95 MB target node_modules footprint** for the core production platform.

> [!NOTE]
> The **<95 MB figure represents a proposed target budget**, pending empirical verification via a reproducible benchmark installation in Phase 03.
> 
> **Benchmark Specifications for Phase 03 Measurement:**
> - **Runtime & Package Manager:** Node.js 22 LTS, pnpm 9.x (clean cache, `--frozen-lockfile`).
> - **Environments:** Linux x64 (Ubuntu 24.04) and Windows x64.
> - **Dependency Separation:** Production dependencies (`dependencies`) measured independently from dev/test tools (`devDependencies`).
> - **Browser Binary Isolation:** Playwright browser binaries (Chromium, Firefox, WebKit, ~150–300 MB) are explicitly excluded from the package tarball and cached in user directories on demand.

---

## 2. Layered Execution Architecture & Dependency Allocation

UIForge establishes a strictly decoupled, layered execution architecture to ensure that heavyweight analysis and verification engines do not become mandatory production runtime burdens:

| Execution Layer | Adopted Packages / Tools | Dependency Policy | Target Footprint | Architectural Role & Justification |
| :--- | :--- | :---: | :---: | :--- |
| **Layer 1: Core Analysis Engine** | `typescript` (Compiler API) | Peer / Required for Full Type Checking | ~40 MB | Semantic type checking, cross-file symbol resolution, interface diagnostics, and type assertion. Invoked only when full semantic checking is requested. |
| **Layer 2: Structural Analysis & Transformation** | `@babel/parser`, `@babel/traverse`, `@babel/types`, `@babel/generator`, `ast-grep` | Production Dependency + Native Tool | ~25 MB | Complete 6-stage AST manipulation pipeline (C15). `@babel/parser` with `errorRecovery: true` parses partial LLM JSX snippets. `@babel/generator` serializes AST. `ast-grep` provides native NAPI/CLI pattern matching. |
| **Layer 3: Token Build Pipeline** | `style-dictionary` v5.8.0 | Build-Time Tool | ~15 MB | Design token transformation engine natively compiling W3C DTCG 2025.10 tokens into Tailwind v4 native CSS variables on Node.js 22 LTS (C14). |
| **Layer 4: Browser Verification Engine** | `playwright` | Optional / Dev Dependency | User Cache (~250 MB) | Multi-browser headless automation, DOM layout evaluation, visual screenshot capture, and trace replay. Installed on demand. |
| **Layer 5: Accessibility Verification** | `axe-core` (`@axe-core/cli`), `@axe-core/playwright`, `eslint-plugin-jsx-a11y` | External Tool / Dev Dependency | ~10 MB | WCAG 2.2 AA rule evaluation invoked out-of-process via user CLI (`CONDITIONALLY ADOPT — RELEASE BLOCKED PENDING COUNSEL CLEARANCE`) (C17). Static AST linting via eslint-plugin-jsx-a11y. |
| **Layer 6: Image Comparison Adapter** | `pixelmatch`, `pngjs` | Optional Testing Adapter | < 3 MB | Deterministic, zero-native-dependency pixel diffing engine operating in-memory on PNG buffers. |
| **Layer 7: Agent Interoperability** | `@modelcontextprotocol/server` (^2.1.0) | Core Runtime Dependency | < 10 MB | Implements the 2026-07-28 Model Context Protocol specification with 2024-11-05 fallback negotiation (C13). `@modelcontextprotocol/client` (^2.1.0) is an optional client adapter. |

### 2.1 Visx Bundle Size Qualification (Finding C16)
Figures of ~15–20 KB (modular Visx primitives) vs ~50 KB (monolithic chart bundles) represent **preliminary tree-shaken estimates**. Reproducible benchmark conditions in Phase 03:
- Bundler: Vite 6.x / Rollup with production Terser/esbuild minification and tree-shaking enabled.
- Measurement: Brotli and Gzip wire size.
- Fixture packages: `@visx/shape`, `@visx/scale`, `@visx/axis` vs Chart.js core + linear scale + line controller vs Recharts line chart package.

### 2.2 Bloat Mitigation & Cost Governance
1. **Source-Copy Component Architecture:** Source-copy integration avoids a mandatory UIForge runtime dependency. The copied implementation and its dependencies retain their own consumer-runtime cost.
2. **Dynamic Lazy-Loading for Heavy Visual Engines:** Recharts and Pixelmatch are dynamically imported only when executing dashboard analytics or visual regression diffing.
3. **Subprocess Isolation for Testing Engines:** Playwright browser binaries (Chromium, WebKit) are installed on demand via `playwright install` rather than bundled into the default UIForge CLI tarball.
