# UIFORGE PHASE 02.4 — CONSUMPTION-MODE GOVERNANCE POLICY
# Multi-Mode Operational Boundaries, Notice Requirements & Redistribution Matrix

**Document ID:** `UIF-PH02.4-CONSUMPTION-POLICY`  
**Phase:** 02.4 — Internal Source Registry  
**Standard:** Software Licensing Analyst & Principal Software Architect  
**Status:** Mandatory Governance Protocol  

---

## 1. The Six Consumption Modes Framework

UIForge rejects the assumption of a single universal "approved" flag. A technology may be safe for architectural study but prohibited from source redistribution. A package may be eligible as an external npm dependency but illegal to re-host in a component registry.

UIForge establishes **six independently governed consumption modes**:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   THE SIX CONSUMPTION MODES OF UIFORGE                 │
├───────────────────────┬────────────────────────────────────────────────┤
│ Consumption Mode      │ Core Action & Execution Scope                  │
├───────────────────────┼────────────────────────────────────────────────┤
│ 1. REFERENCE_ONLY     │ Architectural analysis, API study, W3C spec    │
│ 2. DEPENDENCY         │ `npm install` addition to user's package.json  │
│ 3. SOURCE_COPY        │ Copying component source into user project     │
│ 4. ASSET_REDISTRIB    │ Bundling font binaries, vector SVGs, engines   │
│ 5. EXTERNAL_TOOL      │ Spawning out-of-process CLI runners / browsers │
│ 6. TEMPLATE_ADAPT     │ Structural adaptation of dashboard/page layouts│
└───────────────────────┴────────────────────────────────────────────────┘
```

---

## 2. Granular Consumption Mode Rules

### 2.1 Mode 1: `REFERENCE_ONLY`
- **Definition:** Studying component architecture, state machines, accessibility patterns, fluid layout mathematics, and token hierarchy without copying code or assets.
- **Governing Rule:** Permitted universally across open-source and commercial candidates (unless gated by a signed proprietary Non-Disclosure Agreement).
- **Restrictions:** Authorizes zero source copying, zero asset distribution, and zero automated dependency additions.

### 2.2 Mode 2: `DEPENDENCY`
- **Definition:** Emitting package specifiers into customer `package.json` manifests for installation via `npm`, `pnpm`, or `bun`.
- **Governing Rule:** Permitted only for packages with verified permissive (MIT, Apache-2.0, ISC) or qualified weak copyleft / custom commercial terms.
- **Mandatory Requirements:**
  1. Exact version range pinned.
  2. License compatibility verified.
  3. No viral GPL/AGPL dependencies in the transitive dependency tree.
- **Special Dispositions:**
  - `greensock/gsap`: Permitted as an emitted user dependency (`import gsap from 'gsap'`) under Webflow Standard License. Prohibited from being bundled into UIForge core binaries.
  - `dequelabs/axe-core`: Permitted under MPL-2.0 Section 3.3 Larger Work provisions. Bundled distributions must include MPL-2.0 license notice and source availability instructions.

### 2.3 Mode 3: `SOURCE_COPY`
- **Definition:** Copying raw TypeScript/JSX source files into customer application directories (e.g. `components/ui/button.tsx`) or into the UIForge internal registry template library.
- **Governing Rule:** Requires affirmative **file-level intellectual property clearance**. A root repository license is never assumed to cover copied files.
- **Mandatory Requirements:**
  1. Source files must be audited for embedded third-party licenses.
  2. Copyright headers and original author notices must be preserved at the top of copied source files.
  3. Any file modifications must be tracked with clear comment annotations.
- **Strict Prohibitions:**
  - Copying source from LGPL-3.0 (`pa11y`), commercial SaaS (`aceternity`, `locofy`), or proprietary clients (`claude-code`, `cursor`) is strictly **BLOCKED**.

### 2.4 Mode 4: `ASSET_REDISTRIBUTION`
- **Definition:** Distributing standalone binary or media assets (font `.woff2` binaries, SVG icon collections, bundled JavaScript engines).
- **Governing Rule:** Every asset must be evaluated independently under its specific asset license.
- **Asset-Specific Mandates:**
  - **Fonts (`Inter.var.woff2`, `Geist-Variable.woff2` - OFL-1.1):** Font software cannot be sold standalone. Original OFL copyright headers must be retained. Reserved Font Names require explicit copyright declaration; verbatim redistribution retains the original name.
  - **Icons (`Lucide SVG` - ISC):** Permitted with license notice retention in icon bundle metadata.
  - **Bundled Engines (`axe.min.js` - MPL-2.0):** Executable form distribution requires informing recipients how to obtain the Source Code under MPL Section 3.1.

### 2.5 Mode 5: `EXTERNAL_TOOL`
- **Definition:** Spawning external executables or browser automation drivers via `child_process.fork()` or `node:spawn`.
- **Governing Rule:** Process boundary isolation. The external tool must execute in a separate operating system process with pinned standard I/O streams.
- **Special Dispositions:**
  - `pa11y/pa11y` (LGPL-3.0): Must execute strictly as an out-of-process subprocess. Direct library linking or bundler inclusion into `@uiforge/cli` is strictly prohibited. Legal counsel review remains open under `LEG-02`.
  - `microsoft/playwright` (Apache-2.0): Approved for headless browser orchestration. Chromium binaries installed into isolated user cache directories.

### 2.6 Mode 6: `TEMPLATE_ADAPTATION`
- **Definition:** Adapting full-page structural compositions, dashboard shells, or marketing layouts into UIForge generative templates.
- **Governing Rule:** Permitted only for structurally unencumbered layouts under permissive licenses. Third-party branding, logos, and proprietary marketing copy must be purged during adaptation.

---

## 3. Master Consumption Mode Matrix across 125 Sources

The complete permissions matrix is codified in [`data/consumption-permissions.json`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.4-internal-source-registry/data/consumption-permissions.json) ($125 \times 6 = 750\text{ records}$):

```
┌─────────────────────────┬──────────────┬──────────────┬──────────────┬──────────────┬──────────────┬──────────────┐
│ Candidate Category      │ Reference    │ Dependency   │ Source Copy  │ Asset Red    │ External Tool│ Template Adapt│
├─────────────────────────┼──────────────┼──────────────┼──────────────┼──────────────┼──────────────┼──────────────┤
│ Permissive Component    │ APPROVED     │ APPROVED     │ APPROVED     │ N/A          │ N/A          │ APPROVED     │
│ Permissive Utility/Hook │ APPROVED     │ APPROVED     │ APPROVED     │ N/A          │ N/A          │ N/A          │
│ OFL-1.1 Font Software   │ APPROVED     │ APPROVED     │ N/A          │ ELIG_RESTRICT│ N/A          │ N/A          │
│ MPL-2.0 axe-core        │ APPROVED     │ ELIG_RESTRICT│ ELIG_RESTRICT│ ELIG_RESTRICT│ APPROVED     │ N/A          │
│ LGPL-3.0 pa11y          │ APPROVED     │ PENDING_REV  │ BLOCKED      │ N/A          │ ELIG_RESTRICT│ N/A          │
│ GSAP Animation Engine   │ APPROVED     │ ELIG_RESTRICT│ BLOCKED      │ BLOCKED      │ N/A          │ N/A          │
│ Closed SaaS / Commercial│ APPROVED     │ BLOCKED      │ BLOCKED      │ BLOCKED      │ N/A          │ BLOCKED      │
│ Proprietary IDE/Client  │ APPROVED     │ REFERENCE    │ BLOCKED      │ BLOCKED      │ N/A          │ N/A          │
└─────────────────────────┴──────────────┴──────────────┴──────────────┴──────────────┴──────────────┴──────────────┘
```
