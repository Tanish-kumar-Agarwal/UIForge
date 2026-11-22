# UIForge Phase 02.5: Category-Wise Comparison Report

**Document ID:** `UIF-PH02.5-CATEGORY-WISE-COMPARISON-REPORT`  
**Classification:** Technology Domain Comparative Analysis  
**Status:** Certified / Complete  
**Date:** November 2026  

---

## 1. Category A — Project Intelligence & Code Analysis

- **Primary Challenge:** AI coding agents frequently hallucinate non-existent component props, fail to respect existing project conventions, and perform clumsy string-based code replacements that destroy comments and syntax trees.
- **Candidate Universe:** Native TypeScript Compiler API, `ast-grep` (`OS-D2C-06`), `babel` (`OS-D2C-07`), `eslint-plugin-react` (`OS-LAYT-07`), `eslint-plugin-jsx-a11y` (`OS-A11Y-03`).
- **Complete 6-Stage AST Manipulation Pipeline & Distinct Guarantees (Findings C15 & C22):**
  UIForge establishes an authoritative 6-stage AST manipulation pipeline combining high-performance pattern search with AST transformation and full semantic type checking:
  1. **Stage 1: Parsing (`@babel/parser`):** Module parsing configured with `sourceType: "module"`, plugins `["jsx", "typescript"]`, and `errorRecovery: true`.
     - *Recoverable Error Handling:* Babel recovers from specific parser anomalies (e.g. unclosed JSX elements, missing property separators, missing semicolons), recording them in `ast.errors` while returning a navigable partial AST.
     - *Fatal Unrecoverable Boundary:* `errorRecovery: true` is **not a guarantee** that every incomplete stream can be parsed. Unrecoverable tokens (unterminated template literals, mismatched parentheses in expression containers, unclosed block comments) throw fatal `SyntaxError` exceptions.
     - *Architectural Remedy:* UIForge implements a **token-stream write-ahead log (WAL) buffer**: mid-stream chunks that trigger unrecoverable syntax errors are held in an in-memory buffer until closing delimiters are streamed, rather than failing the transaction.
  2. **Stage 2: AST Traversal (`@babel/traverse`):** Structured visitor navigation identifying component declarations, hook invocations, prop distributions, and import declarations.
  3. **Stage 3: AST Transformation (`@babel/types`):** Deterministic node construction, replacement, and insertion using strongly-typed builder definitions.
  4. **Stage 4: Code Generation (`@babel/generator`):** AST serialization.
     - *Formatting Qualification:* `retainLines: true` only preserves line numbers; it does **not** guarantee original indentation, column alignment, or trivia preservation.
  5. **Stage 5: Comment & Formatting Preservation:**
     - *Attached Comments:* Comments are preserved on AST nodes (`leadingComments` / `trailingComments`).
     - *Formatting Preservation via Coordinate Slice Patching:* For localized edits, UIForge utilizes exact character start/end offsets to splice in modified token slices, preserving 100% of the surrounding untouched file. Full-file regenerations utilize Prettier with language plugins.
  6. **Stage 6: Semantic Verification (TypeScript Compiler API Baseline Comparator):**
     - Rather than merely checking that post-transform diagnostics are zero (which can mask existing errors or fail on brownfield projects with pre-existing warnings), UIForge evaluates:
       $$\text{newRegressions} = \text{postTransformDiagnostics} \setminus \text{baselineDiagnostics}$$
       guaranteeing that the AST mutation introduced zero *new* type regressions.
- **Decision:** Hybrid Architecture. Native TS Compiler API forms internal core semantic engine; ast-grep is integrated as high-performance CLI scanner; Babel 6-stage pipeline handles fault-tolerant JSX rewriting.

---

## 2. Category B — Component & Primitive Architecture

- **Primary Challenge:** Providing accessible, unstyled UI behavior without locking user projects into an inflexible visual design system or heavy runtime overhead.
- **Candidate Universe:** Radix UI (`OS-COMP-02`), React Aria (`OS-COMP-03`), Headless UI (`OS-COMP-04`), Ark UI (`OS-COMP-10`), Base UI (`OS-COMP-11`), Ariakit (`OS-COMP-13`).
- **Comparative Evaluation:**
  - *Radix UI Primitives (`OS-COMP-02`, Score: 95.9, Tier 0):* Industry standard for headless composable dialogs, popovers, dropdowns, and tooltips. Clean React 18/19 server component boundaries.
  - *React Aria (`OS-COMP-03`, Score: 96.0, Tier 0):* Gold standard for complex interaction hooks, mobile touch events, virtual focus, and keyboard navigation.
  - *Ark UI (`OS-COMP-10`, Score: 85.9, Tier 1):* Zag.js state machines; strong cross-framework architecture, recommended as core-adjacent alternative.
  - *Headless UI (`OS-COMP-04`, Score: 85.8, Tier 1):* Excellent for basic Tailwind applications, but narrower component breadth than Radix.
- **Decision:** Multi-primitive strategy. Radix UI primitives serve as the primary foundational building blocks; React Aria hooks are adopted for complex interactive states (comboboxes, date pickers, number fields).

---

## 3. Category C — Component Registries & Source Ecosystems

- **Primary Challenge:** Delivering component code that developers can freely modify, without imposing immutable `node_modules` abstraction layers.
- **Candidate Universe:** shadcn/ui (`OS-COMP-01`), Magic UI (`OS-MKT-01`), Origin UI (`OS-MKT-04`), Tremor Raw (`OS-DASH-02`), Park UI (`OS-COMP-12`), Cult UI (`OS-MKT-02`), React Bits (`OS-MKT-03`), HyperUI (`OS-MKT-07`).
- **Decision:** Adopt shadcn/ui registry schema as UIForge's canonical component emission format. Core-adjacent registries (Magic UI, Origin UI, Tremor Raw) are integrated via standardized schema adapters.

---

## 4. Category D — Design Systems & Complete UI Frameworks

- **Primary Challenge:** Full-system UI frameworks (Mantine, MUI, Chakra, Ant Design) impose heavy CSS-in-JS runtimes, rigid design opinions, and massive bundle footprints that break existing brownfield projects.
- **Candidate Universe:** Mantine (`OS-COMP-05`), Chakra UI (`OS-COMP-06`), MUI (`OS-COMP-07`), Ant Design (`OS-COMP-08`), NextUI (`OS-COMP-09`), Blueprint (`OS-COMP-14`), SaaS UI (`OS-COMP-15`).
- **Decision:** Build Internally. UIForge does not adopt any complete monolithic UI framework as a core dependency. All eligible candidates are classified as **Tier 3 (Reference and Research)**.

---

## 5. Category E — Design Tokens & Styling

- **Primary Challenge:** Bridging Figma/design-tool design tokens with production code without lossy conversion, visual drift, or manual CSS synchronizations.
- **Candidate Universe:** DTCG (`OS-TOKN-01`), Style Dictionary (`OS-TOKN-02`), Open Props (`OS-TOKN-03`), Tailwind CSS v4 (`OS-TOKN-04`), Radix Colors (`OS-TOKN-05`), Token Studio Transforms (`OS-TOKN-06`), Tailwind Container Queries (`OS-LAYT-02`), Every Layout (`OS-LAYT-08`).
- **Style Dictionary v5.8.0 Upgrade (Finding C14):**
  UIForge pins `style-dictionary@^5.8.0` as its core token compilation engine, aligning with the platform's Node.js 22 LTS runtime. Version 5.8.0 delivers native W3C Design Tokens Community Group (DTCG 2025.10) format parsing (`$value`, `$type`, `$description`, `$extensions`), eliminating brittle legacy pre-transform normalization layers.
- **Every Layout Clean-Room Boundary (Finding C01/C11):**
  Candidate `OS-LAYT-08` is evaluated strictly under `REFERENCE_ONLY` mode. Algorithmic CSS layout concepts (The Stack, The Cluster, The Reel) are studied for clean-room implementation. Direct copying of authored text, diagrams, and component code is strictly prohibited under `LIC-EVERY-LAYOUT-COMMERCIAL`.
- **Decision:** Adopt Tailwind CSS v4 as default styling runtime, DTCG 2025.10 as canonical token format, and Style Dictionary v5.8.0 as token build compiler.

---

## 6. Category F — Browser Verification & Accessibility

- **Primary Challenge:** Automated tests that rely solely on jsdom or simulated DOMs miss real layout reflow bugs, subpixel rendering glitches, and true visual accessibility contrast failures.
- **axe-core Conditional Adoption & Release Gate (Finding C17):**
  axe-core (`OS-A11Y-01`) recommendation is classified as:
  > **`CONDITIONALLY ADOPT — RELEASE BLOCKED PENDING COUNSEL CLEARANCE`**
  UIForge decouples axe-core by invoking user-installed `@axe-core/cli` out-of-process via standard subprocess streams, without bundling or redistributing MPL-2.0 binaries. However, formal IP counsel clearance remains an explicit release gate before shipping any bundled, hosted, or SaaS delivery model.
- **Decision:** Core verification pipeline couples Playwright + axe-core (out-of-process CLI) + Pixelmatch into an isolated browser verification harness.

---

## 7. Category G — Agent & MCP Integration (Findings C20 & C24)

- **Primary Challenge:** Standardizing how autonomous AI coding agents (Claude Code, OpenCode, Cursor, Antigravity) discover UIForge's design intelligence and invoke frontend mutations safely.
- **Declared Semver Ranges vs Exact Pins (Finding C24):**
  UIForge defines the following declared semver ranges for MCP packages:
  - `@modelcontextprotocol/server@^2.1.0` (Core Runtime Dependency; evaluated on release `v2.1.1` on Node.js 22 LTS; the caret `^` permits compatible 2.x releases).
  - `@modelcontextprotocol/client@^2.1.0` (Optional Integration Client).
  - *Reproducibility Invariant:* Deterministic builds lock exact resolved versions and SHA-512 SRI hashes in `pnpm-lock.yaml` during Phase 03.
- **Modern Protocol Era & Wire Negotiation Architecture (Finding C20):**
  - **Modern Protocol Revision (`2026-07-28`):** The modern era is stateless. It **does NOT** use the legacy stateful `initialize` handshake.
  - **Modern Discovery:** Modern clients probe server capabilities using the `server/discover` endpoint/method.
  - **Per-Request Metadata:** Every request carries the protocol version in `_meta` (e.g. `_meta: { protocolVersion: "2026-07-28" }`) and corresponding HTTP headers (`mcp-protocol-version: 2026-07-28`).
  - **Opt-In Auto-Negotiation:** The v2 SDK requires explicitly opting into negotiation via configuration:
    ```typescript
    const server = new McpServer({
      name: "uiforge-mcp",
      version: "1.0.0",
      versionNegotiation: { mode: "auto", preferred: "2026-07-28", fallback: ["2025-11-25", "2024-11-05"] }
    });
    ```
  - **Fallback Hierarchy:** If the connecting client or server does not support modern `server/discover`, automatic negotiation seamlessly falls back to the legacy stateful `initialize` handshake, first trying latest legacy revision **`2025-11-25`**, and then older legacy revision **`2024-11-05`** for backward compatibility.
- **Decision:** Adopt Model Context Protocol SDK (`@modelcontextprotocol/server` ^2.1.0) as UIForge's primary interoperability standard.

---

## 8. Category H — Supporting UI Libraries

- **Motion & Animation:** `motion` (`OS-ANIM-01`, Score: 94.8, Tier 0) adopted as standard. GSAP (`OS-ANIM-04`, Score: 78.4, Tier 2) supported as optional emission plugin under Webflow April 2025 license. Remotion (`OS-ANIM-08`, Tier 5) excluded due to architectural & mission scope misfit (programmatic video composition vs web UI design-to-code) and license headcount cap (<=3 employees for free commercial use).
- **Data Tables & Virtualization:** `TanStack/table` (`OS-DASH-03`, Score: 95.8, Tier 0) adopted as headless table foundation. `TanStack/virtual` (`OS-DASH-04`, Score: 85.8, Tier 1) adopted for large list virtualization.
- **Dashboard Grid Layout & Accessibility Qualification (Finding C19):**
  `react-grid-layout` (`OS-DASH-05`, Score: 74.7, Tier 2) is admitted as an optional integration adapter (active v2.3.0 with React 18/19 and Playwright harness). Its 5.5/10 accessibility score is formally qualified as a **preliminary estimate**, subject to a 6-test verification matrix:
  1. Keyboard drag-and-drop (Space/Enter grab, Arrow repositioning, Esc cancel).
  2. Focus management (retention of logical DOM focus order post-mutation).
  3. Accessible announcements (`aria-live="polite"` coordinate updates).
  4. Touch interactions (disambiguation of drag handles from viewport scroll).
  5. Screen-reader hierarchy (semantic grid/gridcell landmarks vs generic div soup).
  6. Reduced-motion behavior (`prefers-reduced-motion` transition bypass).
- **Charts & Data Visualization (Finding C16):**
  `recharts` (`OS-CHRT-01`, Score: 94.8, Tier 0) adopted as primary declarative SVG chart library. `visx` (`OS-CHRT-04`, Tier 1) provides low-level modular SVG visualization primitives (v4.0.0 with React 19 support). Bundle size figures (~15–20 KB vs ~50 KB) are formally qualified as **preliminary tree-shaken estimates**, pending reproducible Phase 03 benchmarks.
- **Typography & Font Subsetting Qualification (Findings C18 & C21):**
  `Inter` (`OS-TYPO-04`, `rsms/inter` v4.1) and `Geist` (`OS-TYPO-05`, `vercel/geist-font` v1.4.0) are adopted under SIL OFL 1.1 RFN preservation.
  - **Default Rule:** Custom glyph subsetting modifies font binaries. Under SIL OFL 1.1 Clause 3, renaming the font family (`UIForgeInter`, `UIForgeGeist`) is the default, legally safe practice.
  - **Documented Exceptions:** Renaming is required UNLESS:
    1. The transformation qualifies for SIL's documented "functional-equivalence exception" (SIL OFL FAQ Q5.3) for web-font character-set optimization preserving all OpenType layout tables, Unicode mappings, and metrics without design changes; OR
    2. The copyright holder grants explicit written permission; OR
    3. UIForge redistributes upstream unsubsetted static/variable `.woff2` binaries unchanged.
  - **Subsetting Engineering Specification:** Planned subsetter tooling is `pyftsubset` (`fonttools`) with parameters `--layout-features=*`, `--desubroutinize`, `--flavor=woff2`, and Name table updates to IDs 1, 4, 6 when renamed.
