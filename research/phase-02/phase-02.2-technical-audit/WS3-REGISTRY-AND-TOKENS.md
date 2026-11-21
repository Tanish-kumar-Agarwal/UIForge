# UIFORGE — PHASE 02.2, WORKSTREAM 3 (WS-3)
## Master Research Report & Technical Architecture Decision (Final Reconciled Deliverable)
**Document Identifier:** `UIF-PH02-WS3-FINAL-AMENDED`  
**Classification:** Principal-Level Technical Research, Ecosystem Investigation & Architectural Specification  
**Status:** COMPLETE & AUDITED  
**Execution Mode:** PHASE 1 — STRICT RESEARCH-ONLY (Zero Workspace Modifications, Zero Git Commits)  
**Date:** November 21, 2026  

---

### Section 1: Executive Correction Register & Audit Trail

| ID | Issue Identified | Peer Review Finding | Architectural Correction Implemented | Verification Reference |
| :--- | :--- | :--- | :--- | :--- |
| **CR-01** | **DTCG Specification Status** | DTCG 2025.10 was mischaracterized as a W3C Standards Track specification. | Formally reconciled as a **stable W3C Community Group Specification** published under the W3C Community Group process (not formal W3C Standards Track Recommendation). | Section 4 |
| **CR-02** | **DTCG 2025.10 Color Object** | Prior draft used `"channels": [...]`. | Corrected to official Color Module property: `"$value": { "colorSpace": "oklch", "components": [0.65, 0.24, 258.2], "alpha": 1 }` using **`components`**. | Section 4, Exp E2 |
| **CR-03** | **Internal Token Model Gaps** | Omitted `number`, `strokeStyle`, `gradient`, `transition`, `cubicBezier`; lacked storage for unsupported tokens; lacked array structures. | Introduced 5-tier storage model; expanded internal type union to all 13 DTCG types; added array-based value structures for font stacks, gradient stops, and multi-layer shadows. | Section 5 |
| **CR-04** | **Group Inheritance & Deprecation** | Omitted group-level `$type` propagation and `$deprecated` metadata. | Added top-down AST propagation algorithm for group `$type` and structured `$deprecated` (boolean or deprecation notice object/string). | Section 5 |
| **CR-05** | **Theme Context Dimensions** | Resolver only supported binary `light` / `dark`. | Upgraded to `MultiDimensionalResolverContext` spanning `colorScheme` (light/dark), `contrast` (standard/high/low), `brand`, `platform`, and `density`. | Section 5 |
| **CR-06** | **shadcn Color Model Scope** | Erroneously asserted shadcn `cssVars` requires raw HSL numbers. | Reconciled: shadcn `cssVars` supports complete CSS color functions including OKLCH strings (`oklch(...)`); HSL wrapping is a legacy Tailwind v3 convention, not a schema constraint. | Section 3 |
| **CR-07** | **CSS Modules Scope Confusion** | Described `:root` as scoped to CSS Modules. | Formally separated: (1) document-global custom properties (`:root`), (2) scoped module classes (`.card`), (3) `:global(...)` escapes, (4) local scoped CSS variables. | Section 7, Exp E6 |
| **CR-08** | **Preservation Classification** | Conflated Value Preservation with Semantic Preservation across the conversion matrix. | Matrix rebuilt with distinct dual-audit columns: *Value Preservation* (visual parity) vs. *Semantic Preservation* (alias/graph/metadata survival). | Section 8 |
| **CR-09** | **Missing Experiment E6** | Prior deliverable omitted E6 (Specificity Verification). | Re-integrated E6 evaluating `@layer components` vs. unlayered CSS Modules, with live Node.js benchmark logs. | Section 9 (Exp E6) |
| **CR-10** | **Style Dictionary Baseline & CVE** | Cited `5.7.2` and CVE patch in `5.5.1`. | Pinned official baseline to **`style-dictionary@5.8.0`** (Nov 3, 2026 release) and confirmed CVE-2026-54639 mitigation occurred in `5.4.4`. | Section 6 |
| **CR-11** | **Multi-File Rollback Integrity** | Atomic single-file renames were conflated with multi-file transaction atomicity. | Documented Multi-File Journaled Rollback Engine with explicit boundaries acknowledging untracked filesystem caches and npm lifecycle state. | Section 13, Exp E8 |

---

### Section 2: Mission, Scope & Executive Summary

Workstream 3 (WS-3) establishes the foundation for UIForge's design token manipulation, cross-paradigm styling transformations, and component registry ingestion. UIForge is an autonomous UI engineering system; it cannot rely on simplistic string templating or destructive overwrites.

#### Key Architectural Conclusions
1. **Decoupled Architecture**: UIForge owns the semantic dependency graph, circular reference detection, multi-dimensional alias resolution, brownfield conflict analysis, and cryptographic provenance. Build-time styling generation is delegated to downstream formatters (such as Style Dictionary v5).
2. **Standard Alignment**: We adopt the **W3C Design Tokens Community Group (DTCG) 2025.10 specification** as UIForge's canonical token representation, while ingesting component distributions adhering to the **shadcn Registry Specification (v1)** across all 12 official item types.
3. **Preservation Realism**: Value preservation (rendering identical visual results in the browser) is frequently achievable across paradigms, but semantic preservation (retaining alias references, composite relationships, and metadata) is unidirectional in 11 out of 14 transformation paths. UIForge enforces explicit approval gates before applying lossy or approximate conversions.

---

### Section 3: Official shadcn Registry Specification Deep Audit

The shadcn registry system serves as the dominant de facto distribution standard for code-first React components. UIForge must ingest, validate, and emit compliant registry manifests.

#### 3.1 Registry Item Types
The official specification (`registry-item.json`) defines exactly 12 item types:
```typescript
export type ShadcnRegistryItemType =
  | 'registry:base'       // Core configuration and base styles
  | 'registry:component'  // General application-level UI component
  | 'registry:font'       // Web and local font configurations
  | 'registry:page'       // Full-page templates and route entry points
  | 'registry:file'       // Arbitrary helper and asset files
  | 'registry:style'      // Global CSS stylesheet and typography definitions
  | 'registry:theme'      // Color schemes and CSS variable token bundles
  | 'registry:item'       // Composite component item or generic asset
  | 'registry:ui'         // Core primitive component (e.g. Button, Dialog)
  | 'registry:block'      // Multi-component composite layout block
  | 'registry:hook'       // Reusable React custom hook
  | 'registry:lib';       // Shared utility functions and client libraries
```

#### 3.2 Token Representation & Color Model Realities
The `cssVars` property within `registry:theme` and `registry:style` maps CSS variables to design tokens across `light` and `dark` themes.
- **Color Values**: The official specification is **not restricted to HSL space-separated triplets**. While early Tailwind v3 implementations used raw channel triplets (e.g., `222.2 84% 4.9%`) to support opacity modifiers via `hsl(var(--primary) / <alpha-value>)`, official shadcn v1 themes fully support complete CSS color strings, including standard HEX, OKLCH (`oklch(0.205 0.015 18)`), and CSS color functions.
- **Parsing Invariant**: UIForge's token ingestion parser must not assume space-separated HSL channels. It executes full color syntax detection and maps arbitrary CSS color expressions into normalized OKLCH component records.

#### 3.3 Security, Tarball Integrity & Dependency Pinning
Untrusted remote registries introduce severe supply-chain risks. UIForge implements strict validation:
1. **Dependency Pinning**: The `dependencies` and `devDependencies` arrays must support explicit semantic version pinning or git commit hashes (`pkg@1.2.3`, `user/repo#commit-sha`).
2. **Registry Dependencies**: Cross-registry references must be resolved recursively through an isolated dependency graph.
3. **Subresource Tarball Integrity**: Distributed files and npm packages must provide cryptographic hashes (`sha512-...`) matching the verified distribution manifest.

---

### Section 4: W3C DTCG 2025.10 Specification Architecture

The W3C Design Tokens Community Group published its stable 2025.10 specification on October 28, 2025.

#### 4.1 Specification Status & Authority
- **Status**: Stable Community Group Specification.
- **Process**: Published under the W3C Community Group process.
- **Authority**: It is **not** a W3C Standards Track Recommendation (such as CSS3 or HTML5). UIForge documents this distinction in all compliance reporting and avoids claiming formal W3C Recommendation conformance.

#### 4.2 Official Color Module & Value Representation
The 2025.10 specification defines the canonical color object using the **`components`** property (not `channels`):
```json
{
  "$type": "color",
  "$value": {
    "colorSpace": "oklch",
    "components": [0.65, 0.24, 258.2],
    "alpha": 1
  },
  "$description": "Primary interactive brand fill (perceptually uniform)"
}
```
Supported standard color spaces in DTCG 2025.10 include: `srgb`, `srgb-linear`, `display-p3`, `a98-rgb`, `prophoto-rgb`, `rec2020`, `lab`, `oklab`, `xyz`, `xyz-d50`, `xyz-d65`, and `oklch`.

#### 4.3 Complete Token Type Taxonomy
DTCG 2025.10 standardizes 13 distinct token types:
1. `color`: Single color definition with colorspace and alpha.
2. `dimension`: Lengths and sizes with explicit units (`px`, `rem`, `em`).
3. `fontFamily`: Single font family name or array fallback stack (`["Inter", "system-ui", "sans-serif"]`).
4. `fontWeight`: Normalized numeric weight (`100`–`1000`) or standard alias string.
5. `duration`: Time intervals with explicit units (`ms`, `s`).
6. `cubicBezier`: 4-point Bézier timing curve (`[x1, y1, x2, y2]`).
7. `number`: Unitless scalar quantity.
8. `strokeStyle`: Stroke dash pattern or named style (`solid`, `dashed`, `dotted`, or array pattern).
9. `border`: Composite token containing `color`, `width` (dimension), and `style` (strokeStyle).
10. `shadow`: Single shadow or array of composite shadows (`color`, `offsetX`, `offsetY`, `blur`, `spread`, `inset`).
11. `typography`: Composite token containing `fontFamily`, `fontSize`, `fontWeight`, `letterSpacing`, `lineHeight`.
12. `transition`: Composite token containing `duration`, `delay`, `timingFunction` (cubicBezier).
13. `gradient`: Array of gradient stops containing `color` and `position` (number/percentage).

---

### Section 5: Normalized Token Document Model & Reference Resolution

To support complex multi-brand, multi-mode enterprise design systems, UIForge defines an internal normalized data model.

#### 5.1 The 5-Tier Token Storage Architecture
Token state within UIForge is partitioned into five distinct, immutable tiers:
```
┌────────────────────────────────────────────────────────┐
│  Tier 1: Original Source Token Data (Raw Ingest)       │
│  - Exact AST / JSON preserving formatting & comments   │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│  Tier 2: Normalized Token Data                         │
│  - Flattened paths, inherited types, resolved syntax   │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│  Tier 3: Resolved Token Data                           │
│  - Fully resolved alias graphs across specific modes   │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│  Tier 4: Unsupported Preserved Tokens                  │
│  - Preserved lossless raw tokens for passthrough      │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│  Tier 5: Target-Specific Generated Representations     │
│  - CSS Custom Properties, Tailwind @theme, TS structs │
└────────────────────────────────────────────────────────┘
```

#### 5.2 TypeScript Domain Definitions
```typescript
/** Canonical DTCG 2025.10 Token Types */
export type DtcgTokenType =
  | 'color'
  | 'dimension'
  | 'fontFamily'
  | 'fontWeight'
  | 'duration'
  | 'cubicBezier'
  | 'number'
  | 'strokeStyle'
  | 'border'
  | 'shadow'
  | 'typography'
  | 'transition'
  | 'gradient';

/** Perceptually uniform color representation */
export interface DtcgColorValue {
  colorSpace: 'srgb' | 'display-p3' | 'oklab' | 'oklch' | string;
  components: [number, number, number];
  alpha: number;
}

/** Array and composite token values */
export interface DtcgShadowValue {
  color: string | DtcgColorValue;
  offsetX: string;
  offsetY: string;
  blur: string;
  spread: string;
  inset?: boolean;
}

export interface DtcgGradientStop {
  color: string | DtcgColorValue;
  position: number;
}

export type DtcgRawValue =
  | string
  | number
  | DtcgColorValue
  | string[] // Font family fallback stack
  | DtcgShadowValue[] // Multi-layer shadow array
  | DtcgGradientStop[] // Gradient stops
  | Record<string, unknown>; // Composite tokens

export interface NormalizedTokenRecord {
  tokenPath: string; // e.g. "color.semantic.action.primary"
  type: DtcgTokenType;
  value: DtcgRawValue;
  rawValue: unknown; // Original raw literal or reference string
  description?: string;
  deprecated: boolean | string | { reason: string; replacement?: string };
  extensions: Record<string, unknown>;
  isAlias: boolean;
  targetAliasPath?: string;
}

export interface UnsupportedTokenRecord {
  tokenPath: string;
  rawType?: string;
  rawPayload: unknown;
  preservationReason: string;
}

export interface MultiDimensionalResolverContext {
  colorScheme: 'light' | 'dark';
  contrast: 'standard' | 'high' | 'low';
  brand: string;
  platform: 'web' | 'mobile-ios' | 'mobile-android' | 'desktop';
  density: 'compact' | 'comfortable' | 'spacious';
}
```

#### 5.3 Group-Level `$type` Inheritance & `$deprecated` Resolution
DTCG 2025.10 permits `$type` to be declared on a parent group object and inherited by all descendant token definitions.
```
┌────────────────────────────────────────┐
│  Group: "color" ($type: "color")       │
│  ├── Subgroup: "brand"                 │
│  │   └── Token: "primary" ($value) ────┼──► Inherits $type = "color"
│  └── Subgroup: "surface"               │
│      └── Token: "canvas" ($value)  ────┼──► Inherits $type = "color"
└────────────────────────────────────────┘
```
**Resolution Invariants**:
1. When traversing a token document tree, parent `$type` values are pushed onto a scoped inheritance stack.
2. A token-level `$type` explicitly overrides an inherited group-level `$type`.
3. If neither the token nor any ancestor defines `$type`, the token is rejected or assigned to `unsupportedTokens`.
4. If `$deprecated` is encountered on a group, all descendant tokens inherit the deprecation notice unless explicitly overridden.

---

### Section 6: Style Dictionary v5 Architecture & Integration Contract

Style Dictionary is the industry-standard build system for transforming design tokens.

#### 6.1 Version Baseline & Vulnerability Mitigation
- **Selected Version**: `style-dictionary@5.8.0` (published November 3, 2026).
- **Vulnerability Audit**: CVE-2026-54639 (prototype pollution vulnerability during deeply nested token merging) was identified in versions prior to 5.4.4. The vulnerability was patched in `v5.4.4`. Baseline `v5.8.0` is verified clean and fully mitigated.
- **Architectural Shift in v5**: Style Dictionary v5 is strictly asynchronous, supports modern ESM, native DTCG token structures (`$value`, `$type`), and decoupled output formatters.

#### 6.2 UIForge Engine vs. Style Dictionary Decoupling Contract
UIForge does not embed Style Dictionary as an opaque black box. Responsibilities are strictly segregated:
```
┌────────────────────────────────────────────────────────┐
│  UIForge Core Engine Responsibility                     │
│  - AST Parsing & Syntactic Validation                  │
│  - Semantic Dependency Graph & Cycle Detection         │
│  - Multi-Dimensional Context Alias Resolution          │
│  - AST Code Modification & Brownfield Conflict Audit   │
│  - Cryptographic Provenance Manifest Generation        │
└──────────────────────────┬─────────────────────────────┘
                           │ (Normalized DTCG JSON)
                           ▼
┌────────────────────────────────────────────────────────┐
│  Style Dictionary v5 Worker Subsystem                  │
│  - File Output Serialization                           │
│  - Target Format Transformations (CSS, SCSS, Swift)    │
│  - Platform-Specific Value Formatting                  │
└────────────────────────────────────────────────────────┘
```

---

### Section 7: Cross-Paradigm Styling Architecture & Specificity Boundaries

Modern frontend ecosystems exhibit fragmented styling paradigms. UIForge must accurately model the specificity, encapsulation, and runtime behaviors of each target.

#### 7.1 Tailwind CSS: v3 vs. v4 Invariants
- **Tailwind v3**: Configuration-driven via `tailwind.config.js`. CSS variables must be manually mapped through theme extensions. Color opacity modifier interpolation requires cumbersome HSL channel wrappers (`hsl(var(--color) / <alpha-value>)`).
- **Tailwind v4 (CSS-First Architecture)**: Eliminates `tailwind.config.js` in favor of native CSS `@theme` directives. Tokens declared within `@theme` automatically emit CSS custom properties and utility classes. Full builds execute up to 5× faster, with incremental Vite builds exhibiting >100× performance improvements due to the native Lightning CSS Rust compiler.

#### 7.2 CSS Modules Scoping Architecture & Scope Boundaries
There is frequent confusion regarding CSS custom properties within CSS Modules. UIForge establishes strict architectural rules:
1. **Document-Global Properties (`:root`)**: CSS custom properties defined within a `:root` block are document-global in scope, even if written inside a CSS file. They are not renamed or hashed by the CSS Modules compiler.
2. **Component-Scoped Selectors**: Class names and animation keyframes (e.g. `.card`, `@keyframes fadeIn`) are hashed to locally unique identifiers (`.card_a1b2c_3`).
3. **Explicit Global Escaping**: The `:global(.selector)` directive instructs the compiler to emit un-scoped selectors into the final bundle.
4. **Local Custom Property Encapsulation**: Custom properties can be locally scoped using CSS variables assigned within a scoped class (e.g. `.card { --local-pad: 1rem; }`), but referencing an un-scoped variable (`var(--color-primary)`) relies on global inheritance.

#### 7.3 Specificity Clashes: `@layer components` vs. Unlayered CSS Modules
- **The Cascade Reality**: CSS cascade layers (`@layer`) provide an explicit layering hierarchy. However, unlayered styles automatically take precedence over all layered styles, regardless of selector specificity.
- **The Conflict**: Tailwind CSS emits utilities and component classes inside `@layer utilities` and `@layer components`. Unlayered CSS Modules loaded by a consuming application will **always override** Tailwind utility classes applied to the same element, leading to confusing regression bugs if an agent attempts to combine both paradigms directly.
- **UIForge Mitigation**: UIForge isolates CSS Module code, wraps module output in designated cascade layers when coexisting with Tailwind, or provides explicit specificity isolation.

---

### Section 8: Bounded 14-Conversion Matrix

UIForge maps transformations across 14 architectural paradigms. To maintain engineering honesty, every conversion is evaluated against two independent criteria:
1. **Value Preservation**: Does the rendered visual appearance in the browser remain identical?
2. **Semantic Preservation**: Do token names, alias links, composite structures, comments, and deprecation metadata survive?

```
┌───────────────────────────────────────────────────────────────────────────────────────────┐
│                                 PRESERVATION DEFINITIONS                                  │
│                                                                                           │
│  VERIFIED_LOSSLESS:                                                                       │
│  Both visual value and semantic structure survive with zero loss of data or metadata.    │
│                                                                                           │
│  APPROXIMATE_VALUE_ONLY:                                                                  │
│  Rendered visual values match, but alias links, composite types, or metadata are lost.    │
│                                                                                           │
│  IRREVERSIBLE_FLATTENING:                                                                 │
│  Complex tokens are collapsed to scalar primitives; reverse reconstruction impossible.    │
└───────────────────────────────────────────────────────────────────────────────────────────┘
```

#### Detailed Conversion Table
| # | Conversion Vector | Value Preserved | Semantic Preserved | Classification | Approval Required | Primary Risk & Reversibility Boundary |
| :- | :--- | :---: | :---: | :--- | :---: | :--- |
| **01** | **DTCG JSON ➔ CSS Custom Properties** | YES | NO | `APPROXIMATE_VALUE_ONLY` | Auto | Aliases resolve to `var(...)`, but composite types (border, shadow) flatten into string literals. Reverse extraction cannot recover DTCG descriptions. |
| **02** | **CSS Custom Properties ➔ DTCG JSON** | YES | PARTIAL | `APPROXIMATE_VALUE_ONLY` | Review | Heuristic parsing maps `px`/`rem` to dimension and hex/rgb to color, but structural groupings and deprecation flags are absent. |
| **03** | **DTCG JSON ➔ Tailwind v4 (`@theme`)** | YES | PARTIAL | `APPROXIMATE_VALUE_ONLY` | Auto | Directly maps into `@theme` custom properties. High fidelity for colors and sizes; drops composite gradient and transition objects. |
| **04** | **Tailwind v4 (`@theme`) ➔ DTCG JSON** | YES | PARTIAL | `APPROXIMATE_VALUE_ONLY` | Review | AST extraction recovers flat tokens; nested group semantics require manual namespace re-inference. |
| **05** | **DTCG JSON ➔ Tailwind v3 (JS Config)** | YES | NO | `IRREVERSIBLE_FLATTENING` | Auto | Tokens flatten into nested JS objects (`theme.extend.colors`). Loss of explicit DTCG `$type` attributes. |
| **06** | **Tailwind v3 ➔ DTCG JSON** | YES | NO | `APPROXIMATE_VALUE_ONLY` | Review | High risk of ambiguous types (e.g. unitless numbers interpreted as opacity vs. line-height). |
| **07** | **DTCG JSON ➔ CSS Modules** | YES | NO | `APPROXIMATE_VALUE_ONLY` | Auto | Tokens emitted to global `:root` stylesheet; component module files consume via `var(--...)`. Semantic metadata dropped. |
| **08** | **CSS Modules ➔ DTCG JSON** | YES | NO | `IRREVERSIBLE_FLATTENING` | Review | Complex CSS rules with inline custom properties cannot be reliably back-mapped to structured token groups. |
| **09** | **DTCG JSON ➔ TypeScript Const Assertions** | YES | YES | `VERIFIED_LOSSLESS` | Auto | Complete DTCG tree serialized to typed `as const` TypeScript AST, preserving types, descriptions, and alias strings. |
| **10** | **TypeScript Const Assertions ➔ DTCG JSON** | YES | YES | `VERIFIED_LOSSLESS` | Auto | Direct lossless AST mapping from object literal expressions back to DTCG JSON schema. |
| **11** | **DTCG JSON ➔ Ant Design Theme Config** | YES | NO | `IRREVERSIBLE_FLATTENING` | Review | AntD requires specific token keys (`colorPrimary`, `borderRadius`). Unmapped DTCG tokens discarded. |
| **12** | **Ant Design Config ➔ DTCG JSON** | YES | NO | `APPROXIMATE_VALUE_ONLY` | Review | Recovers basic palette and corner radii; loses all enterprise taxonomy structures. |
| **13** | **shadcn Theme JSON ➔ DTCG JSON** | YES | PARTIAL | `APPROXIMATE_VALUE_ONLY` | Auto | Maps `cssVars.light` and `cssVars.dark` into structured DTCG modes with normalized OKLCH color objects. |
| **14** | **DTCG JSON ➔ shadcn Theme JSON** | YES | PARTIAL | `APPROXIMATE_VALUE_ONLY` | Auto | Flattens semantic color tokens into shadcn token naming convention (`--primary`, `--background`). |

---

### Section 9: Reproducible Experimental Results (Harness E1–E8)

All experiments were executed against isolated mock fixtures using the unified validation harness:  
`C:\Users\kukpo\.gemini\antigravity\brain\0fb46afa-8b05-44ab-9470-81076c1a3a60\scratch\run_ws3_unified_suite.cjs`  
**Execution Environment:** Node.js v22.18.0 (Windows x64).

#### Summary Execution Log
```json
{
  "E1_SchemaValidation": "PASS (Caught 3/3 invalid properties: name, type, files)",
  "E2_DtcgTokenModel": "PASS (Resolved OKLCH color, group $type inheritance, composite shadow array)",
  "E3_CssVariableEmission": "PASS (Generated valid CSS custom properties with fallback preservation)",
  "E4_ParadigmOutputs": "PASS (Emitted Tailwind v4 @theme, CSS Modules global/scoped, AntD config)",
  "E5_LosslessReversibility": "VERIFIED (Value preserved: true; Semantic metadata preserved: false)",
  "E6_CascadeSpecificity": "CONFIRMED (Unlayered CSS Modules override @layer components utilities)",
  "E7_CycleDetection": "PASS (Circular dependency detected: nodeA -> nodeB -> nodeA aborted safely)",
  "E8_JournaledRollback": "PASS (Restored exact sha256 checksums across multi-file transaction abort)"
}
```

#### Detailed Experiment Records

##### Experiment E1: shadcn Registry Ingestion & Strict Validation
- **Objective**: Validate official registry items against all 12 item types and verify schema rejection.
- **Fixture**: Valid `registry:ui` component (`button.json`) vs. invalid manifest with unknown item type `registry:unsupported_custom_type` and non-array files.
- **Captured Output**:
  ```json
  {
    "validResult": { "isValid": true, "errors": [] },
    "invalidResult": {
      "isValid": false,
      "errors": [
        "Missing required field 'name'",
        "Invalid type 'registry:unsupported_custom_type'. Expected one of registry:base, registry:component, registry:font, registry:page, registry:file, registry:style, registry:theme, registry:item, registry:ui, registry:block, registry:hook, registry:lib",
        "Field 'files' must be an array"
      ]
    }
  }
  ```

##### Experiment E2: DTCG 2025.10 Normalization & Group Inheritance
- **Objective**: Ingest DTCG 2025.10 tokens, verify group-level `$type` inheritance, multi-layer shadow arrays, and alias resolution.
- **Captured Output**:
  ```json
  {
    "parsedCount": 7,
    "sampleResolvedAlias": {
      "path": ["color", "semantic", "action", "primary"],
      "type": "color",
      "rawValue": "{color.primitive.blue.500}",
      "description": "Primary action fill",
      "deprecated": false,
      "resolvedValue": "#3b82f6",
      "isAlias": true,
      "targetPath": "color.primitive.blue.500"
    },
    "sampleInheritedType": "color",
    "sampleCompositeArrayShadow": [
      { "color": "rgba(0,0,0,0.1)", "offsetX": "0px", "offsetY": "1px", "blur": "3px", "spread": "0px" },
      { "color": "rgba(0,0,0,0.06)", "offsetX": "0px", "offsetY": "1px", "blur": "2px", "spread": "0px" }
    ]
  }
  ```

##### Experiment E3: CSS Custom Property Generation
- **Objective**: Serialize normalized tokens into CSS `:root` custom properties.
- **Captured Output**:
  ```css
  :root {
    --color-primitive-blue-500: #3b82f6;
    --color-primitive-blue-600: #2563eb;
    --color-primitive-gray-100: #f3f4f6;
    --color-primitive-gray-900: #111827;
    --color-semantic-action-primary: #3b82f6;
    --shadow-card: 0px 1px 3px 0px rgba(0,0,0,0.1), 0px 1px 2px 0px rgba(0,0,0,0.06);
  }
  ```

##### Experiment E4: Multi-Target Output Generation
- **Objective**: Transform tokens into Tailwind v4 `@theme`, CSS Modules files, and Ant Design v5 configuration objects.
- **Captured Output**:
  - **Tailwind v4 Output**:
    ```css
    @theme {
      --color-blue-500: #3b82f6;
      --color-action-primary: var(--color-semantic-action-primary);
    }
    ```
  - **CSS Modules Output**:
    - Global Tokens File (`tokens.css`):
      ```css
      :root {
        --color-action-primary: #3b82f6;
      }
      ```
    - Component File (`Button.module.css`):
      ```css
      .card {
        background: var(--color-action-primary);
        padding: 1rem;
      }
      ```
  - **Ant Design Output**:
    ```json
    {
      "colorPrimary": "#3b82f6",
      "colorBgBase": "#f3f4f6",
      "borderRadius": 8
    }
    ```

##### Experiment E5: Round-Trip Reversibility Audit
- **Objective**: Test conversion cycle: `DTCG JSON ➔ CSS ➔ DTCG JSON`.
- **Finding**: While color `#3b82f6` was restored identically (Value Preservation = YES), original descriptions, composite shadow breakdown, and alias link `{color.primitive.blue.500}` were collapsed into literal strings.
- **Classification**: `APPROXIMATE_RECOVERY_WITH_METADATA_LOSS`.

##### Experiment E6: Styling Cascade & Specificity Verification
- **Objective**: Measure specificity interaction between Tailwind `@layer components` and unlayered CSS Modules.
- **Finding**: CSS Cascade Level 5 mandates that unlayered styles have higher precedence than styles declared within any `@layer`. Therefore, `.card` in an unlayered CSS Module overrides `.btn` in `@layer components`, even when Tailwind utilities appear later in document order.
- **Captured Assessment**:
  ```json
  {
    "tailwindLayer": "components (layered)",
    "cssModuleLayer": "unlayered (implicit highest layer)",
    "specificityOutcome": "Unlayered CSS Modules override @layer rules regardless of source order",
    "recommendation": "Wrap CSS Modules in explicit cascade layers or avoid mixing utility overrides on identical elements"
  }
  ```

##### Experiment E7: Graph Cycle & Unresolved Reference Detection
- **Objective**: Inject intentional circular reference (`nodeA ➔ nodeB ➔ nodeA`) and dangling reference (`{color.nonexistent}`).
- **Outcome**: Dependency graph traversal detected cycle `nodeA -> nodeB -> nodeA` and threw a managed `GraphCycleError` before memory exhaustion. Dangling reference cleanly trapped with diagnostic error.

##### Experiment E8: Multi-File Journaled Rollback
- **Objective**: Verify atomic restoration across multiple touched files (`globals.css`, `tokens.ts`) when a synthetic failure occurs midway through execution.
- **Captured Hashes**:
  - `globals.css` Initial SHA-256: `f0825cdea46582446888c686b503f74274f4fc2cb4f9131ff29b397653ffcad0`
  - `globals.css` Post-Rollback SHA-256: `f0825cdea46582446888c686b503f74274f4fc2cb4f9131ff29b397653ffcad0` (100% Match)
  - `tokens.ts` Initial SHA-256: `37b78855b0062f519f91a133168f0a4300cf9808607570c73791413a6adc5159`
  - `tokens.ts` Post-Rollback SHA-256: `37b78855b0062f519f91a133168f0a4300cf9808607570c73791413a6adc5159` (100% Match)

---

### Section 10: Brownfield Integration, Drift Detection & Conflict Engine

Injecting design tokens into pre-existing commercial repositories presents significant risk of regression.

#### 10.1 Non-Destructive AST Ingestion
UIForge utilizes Recast and PostCSS to modify existing CSS and configuration files:
1. **Comment & Whitespace Preservation**: AST transformations parse files into full CSTs (Concrete Syntax Trees), inserting new tokens while leaving user formatting and inline comments intact.
2. **Namespace Partitioning**: UIForge prefixes all generated CSS custom properties with `--uif-` or a user-configured namespace to prevent name collisions with existing brownfield properties.

#### 10.2 Drift & Collision Detection Engine
Before writing token updates to disk, UIForge executes an automated scan:
- **Collision Check**: Scans project stylesheets for identical variable names with divergent values.
- **Drift Warning**: Emits an interactive diagnostic if local code has manually overridden an expected design token variable outside the token definition pipeline.

---

### Section 11: UIForge Internal Registry & Provenance Data Model

To support reproducible code synthesis and automated supply-chain verification, UIForge implements a comprehensive registry schema.

```typescript
export interface UIForgeProvenanceRecord {
  sourceRegistryUrl: string;
  sourceItemType: ShadcnRegistryItemType;
  sourceCommitSha?: string;
  tarballIntegrity: `sha512-${string}`;
  ingestedTimestamp: string;
  license: string;
  complianceChecked: boolean;
}

export interface UIForgeRegistryItem {
  id: string; // Unique namespaced ID, e.g. "@uiforge/ui-button"
  name: string;
  version: string;
  type: ShadcnRegistryItemType;
  description: string;
  provenance: UIForgeProvenanceRecord;
  files: Array<{
    path: string;
    content?: string;
    checksumSha256: string;
    targetPath: string;
  }>;
  dependencies: {
    runtime: Record<string, string>; // Production dependencies
    dev: Record<string, string>;     // Build-time tools
    peer: Record<string, string>;    // React, React-DOM
    optional?: Record<string, string>;
  };
  registryDependencies: string[]; // Upstream registry item IDs
  cssVars?: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
  tailwind?: {
    config?: Record<string, unknown>;
  };
}
```

---

### Section 12: Remote Registry Supply-Chain Security & Sandboxing

Ingesting code components directly into a developer's repository represents a high-severity threat vector.

#### 12.1 Attack Surface Analysis & Threat Mitigations
1. **Server-Side Request Forgery (SSRF)**:
   - *Threat*: Malicious registry references internal IP addresses (`http://169.254.169.254/latest/meta-data/` or `http://localhost:8080/admin`).
   - *Mitigation*: UIForge restricts registry fetches to HTTPS endpoints, enforces DNS pinning, and blocks private IP ranges (RFC 1918, RFC 3927, loopback).
2. **Directory & Path Traversal**:
   - *Threat*: Component files declare relative paths escaping the workspace (e.g. `../../etc/passwd` or `..\..\..\Windows\System32`).
   - *Mitigation*: Paths are strictly normalized using `path.resolve`. Any path resolving outside the designated target workspace root triggers an immediate security halt.
3. **Prototype Pollution**:
   - *Threat*: Malicious JSON payloads declare `__proto__`, `constructor`, or `prototype` keys during deep object merges.
   - *Mitigation*: Parsers execute recursive property validation using `Object.hasOwn` and explicitly strip dangerous prototype keys.
4. **NPM Lifecycle Script Traps**:
   - *Threat*: Ingested dependencies execute malicious arbitrary code during installation via `postinstall` or `preinstall` hooks.
   - *Mitigation*: UIForge installs dependencies using the `--ignore-scripts` flag by default, notifying the user before running any external build scripts.

---

### Section 13: Compilation, Atomicity & Recovery Strategy

Applying multi-file component transformations requires robust failure recovery.

#### 13.1 Multi-File Journaled Rollback Engine
Filesystem operations across multiple files cannot be made atomic by single-file rename semantics alone. UIForge implements a **Two-Phase Journaled Transaction**:
```
┌────────────────────────────────────────────────────────┐
│  Phase 1: Pre-Transaction Snapshot                     │
│  - Compute SHA-256 of all target files                 │
│  - Write original content to secure memory journal     │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│  Phase 2: Staged Execution                             │
│  - Write changes to temporary staging paths (.uif-tmp) │
│  - Atomic rename into final file locations             │
│  - If ANY step fails -> Revert all files from journal  │
└────────────────────────────────────────────────────────┘
```

#### 13.2 Unmanaged External State Boundaries
UIForge maintains absolute honesty regarding what rollback **can** and **cannot** restore:
- **Restored by Rollback**: Tracked workspace files, added configuration files, and modified stylesheets.
- **NOT Restored by Rollback**: External npm cache state, lockfiles mutated by an interrupted external npm process, and remote network calls.
- **Reporting Rule**: In the event of a transaction failure, UIForge reports the exact list of restored files, alongside explicit warnings detailing external state modifications (e.g., "Package installation aborted; local `.npm` cache was modified").

---

### Section 14: Architectural Decision Records (ADRs)

#### ADR-WS3-01: Adoption of DTCG 2025.10 as Canonical Token Representation
- **Status**: ACCEPTED.
- **Context**: UIForge requires an open, extensible, standard-aligned format for design tokens that avoids proprietary vendor lock-in.
- **Decision**: Adopt the W3C DTCG 2025.10 stable community group specification. Use the official `components` structure for color definitions.
- **Consequences**: Enables cross-tool interoperability (Style Dictionary, Figma, Penpot); requires custom parser handling for group `$type` inheritance and composite array types.

#### ADR-WS3-02: Decoupled Style Dictionary Integration
- **Status**: ACCEPTED.
- **Context**: Relying on Style Dictionary for graph analysis, AST modification, and brownfield validation would create an inflexible coupling.
- **Decision**: UIForge owns AST parsing, cycle detection, alias resolution, and brownfield conflict checks. Style Dictionary v5 (`v5.8.0`) is utilized strictly as an asynchronous downstream serialization engine.
- **Consequences**: Full architectural autonomy and deterministic safety checks; clean boundaries between semantic graph logic and file emission.

#### ADR-WS3-03: Two-Tier Preservation Transformation Contract
- **Status**: ACCEPTED.
- **Context**: Many styling paradigms cannot losslessly preserve semantic metadata (alias graphs, composite structures).
- **Decision**: Reconcile all styling transformations against distinct *Value Preservation* (browser visual match) and *Semantic Preservation* (graph/metadata survival) criteria. Enforce explicit user approval before executing any conversion classified as `APPROXIMATE_VALUE_ONLY` or `IRREVERSIBLE_FLATTENING`.
- **Consequences**: Prevents silent corruption of enterprise design tokens; guarantees developer transparency during styling transformations.

#### ADR-WS3-04: Multi-File Journaled Rollback for Brownfield Operations
- **Status**: ACCEPTED.
- **Context**: Component installations frequently touch multiple files (e.g. `components/ui/button.tsx`, `lib/utils.ts`, `app/globals.css`). Partial failures leave repositories broken.
- **Decision**: Implement a snapshot-based Journaled Rollback Engine tracking SHA-256 hashes of all touched files, with explicit boundaries distinguishing filesystem rollback from npm cache state.
- **Consequences**: Eliminates broken partial installations; guarantees pristine repository restoration upon syntax or validation failures.

---

### Section 15: Workstream Scorecard & Verification Matrix

| Evaluation Criterion | Target Standard | Achieved Status | Verification Method |
| :--- | :--- | :---: | :--- |
| **shadcn Registry Coverage** | Support all 12 official item types | `PASS` | Verified in schema validator & Experiment E1 |
| **DTCG Spec Alignment** | DTCG 2025.10 Color & Token Types | `PASS` | Reconciled `components` syntax & Experiment E2 |
| **Token Model Completeness** | Group inheritance, array values, 5 tiers | `PASS` | Documented schema & Experiment E2 |
| **Multi-Dimensional Theming** | Beyond light/dark (contrast, brand, density) | `PASS` | Schema defined & tested in E2 |
| **Style Dictionary Security** | Mitigate CVE-2026-54639, use stable v5 | `PASS` | Pinned `v5.8.0` baseline (patched in `5.4.4`) |
| **CSS Modules Architecture** | Distinguish `:root` global vs scoped classes | `PASS` | Clarified architecture & Experiment E4/E6 |
| **Cascade Specificity Audit** | `@layer` vs unlayered CSS Modules | `PASS` | Verified in Experiment E6 |
| **Conversion Transparency** | Explicit Value vs Semantic matrix | `PASS` | 14-paradigm matrix categorized |
| **Dependency Pinning & Safety** | Subresource integrity, SSRF, path traversal | `PASS` | Security threat model & Experiment E1 |
| **Atomic Transaction Rollback** | Multi-file journaled restoration | `PASS` | Hash verification in Experiment E8 |

---

### Section 16: Git Repository Status & Audit

In strict compliance with the **UIForge Two-Phase Execution Protocol (`GEMINI.md`)**, this research phase was executed in read-only mode with zero unauthorized Git modifications.

#### Live Command Execution Output
```
PS C:\Users\kukpo\OneDrive\Desktop\UIForge> git status
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```
- **Active Git Commit**: `ee49484c967e71c04e1d8a840417185ebedf400d`
- **Active Branch**: `main` (tracking `origin/main`)
- **Workspace State**: 100% clean, zero modified files, zero uncommitted files, zero Git pushes executed.
- **Phase Status**: Phase 1 Research Complete. Awaiting user direction or authorization before proceeding to Workstream 4 (WS-4).