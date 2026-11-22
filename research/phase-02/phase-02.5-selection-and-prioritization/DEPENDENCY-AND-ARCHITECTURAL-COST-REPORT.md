# UIForge Phase 02.5: Dependency & Architectural Cost Report

**Document ID:** `UIF-PH02.5-DEPENDENCY-AND-ARCHITECTURAL-COST-REPORT`  
**Classification:** Dependency Budget, Supply-Chain Overhead & Bloat Analysis  
**Status:** Certified / Complete  
**Date:** November 2026  

---

## 1. UIForge Proposed Core Dependency Budget (C09)

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

## 2. Layered Execution Architecture & Dependency Allocation (C08)

UIForge establishes a strictly decoupled, layered execution architecture to ensure that heavyweight analysis and verification engines do not become mandatory production runtime burdens:

| Execution Layer | Adopted Packages / Tools | Dependency Policy | Target Footprint | Architectural Role & Justification |
| :--- | :--- | :---: | :---: | :--- |
| **Layer 1: Core Analysis Engine** | `typescript` (Compiler API) | Peer / Required for Full Type Checking | ~40 MB | Semantic type checking, cross-file symbol resolution, interface diagnostics, and type assertion. Invoked only when full semantic checking is requested. |
| **Layer 2: Structural Analysis & Transformation** | `@babel/parser`, `@babel/traverse`, `ast-grep` | Production Dependency + Native Tool | ~25 MB | High-speed fault-tolerant AST parsing and syntax manipulation for LLM-emitted JSX/TSX snippets without the overhead of spinning up a full TypeScript program. `ast-grep` provides native NAPI/CLI pattern matching. |
| **Layer 3: Token Build Pipeline** | `style-dictionary` v4 | Build-Time Tool | ~15 MB | Design token transformation engine compiling W3C DTCG tokens into Tailwind v4 variables, CSS custom properties, and TypeScript theme objects. |
| **Layer 4: Browser Verification Engine** | `playwright` | Optional / Dev Dependency | User Cache (~250 MB) | Multi-browser headless automation, DOM layout evaluation, visual screenshot capture, and trace replay. Installed on demand. |
| **Layer 5: Accessibility Verification** | `axe-core` (`@axe-core/cli`), `@axe-core/playwright`, `eslint-plugin-jsx-a11y` | External Tool / Dev Dependency | ~10 MB | WCAG 2.2 AA rule evaluation invoked out-of-process via user CLI (`counselReviewRequired: true`). Static AST linting via eslint-plugin-jsx-a11y. |
| **Layer 6: Image Comparison Adapter** | `pixelmatch`, `pngjs` | Optional Testing Adapter | < 3 MB | Deterministic, zero-native-dependency pixel diffing engine operating in-memory on PNG buffers. |
| **Layer 7: Agent Interoperability** | `@modelcontextprotocol/server` (v2.x) | Core Runtime Dependency | < 10 MB | Implements the 2026-07-28 Model Context Protocol specification for exposing UIForge tools, tokens, and AST mutation engines to AI coding agents. `@modelcontextprotocol/client` is an optional client adapter. |

### 2.1 Justification for Coexisting Analysis Engines (TypeScript vs Babel vs ast-grep)
- **TypeScript Compiler API:** Essential for complete type diagnostics, generic type parameter evaluation, and cross-module interface reconciliation.
- **Babel Parser & Traverse:** Optimized for high-throughput, fault-tolerant syntax manipulation and AST code generation. It can parse incomplete or malformed JSX/TSX snippets emitted by LLMs that would cause the TypeScript typechecker to halt.
- **ast-grep:** Utilizes native Tree-sitter parsers to execute structural pattern searches and multi-file refactoring queries at C/Rust speeds without building a JavaScript AST object graph.

---

## 3. Bloat Mitigation & Cost Governance (C10)

1. **Source-Copy Component Architecture:** Source-copy integration avoids a mandatory UIForge runtime dependency. The copied implementation and its dependencies retain their own consumer-runtime cost.
2. **Dynamic Lazy-Loading for Heavy Visual Engines:** Recharts and Pixelmatch are dynamically imported only when executing dashboard analytics or visual regression diffing.
3. **Subprocess Isolation for Testing Engines:** Playwright browser binaries (Chromium, WebKit) are installed on demand via `playwright install` rather than bundled into the default UIForge CLI tarball.
