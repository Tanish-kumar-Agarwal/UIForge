# Category 11 — Design-to-Code & Design Intelligence

**Document ID:** `UIF-CAT-009`  
**Phase:** 02.1 — Open-Source Ecosystem Discovery & Intelligence  
**Category Focus:** AST Cross-Compilers, Visual Reverse-Engineering & Figma Interoperability  
**Date:** November 2026  

---

## 1. Category Overview

Design-to-code systems attempt to bridge visual design intent (Figma mockups, screenshots, rough wireframes) and production code. While commercial tools (Builder.io, Locofy, v0) operate as hosted SaaS compilers, UIForge explores open-source tools for AST cross-compilation, static code analysis, and multimodal reverse-engineering.

---

## 2. In-Depth Comparative Analysis

| Candidate ID | Project & URL | License | Type | Strengths & Capabilities | UIForge Role |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `OS-D2C-01` | **Mitosis** (`BuilderIO/mitosis`) | MIT | AST Compiler | Write components once in a JSX subset, compile to React, Vue, Svelte, Angular, Qwik. | **`[REF]` / `[DEP]` Cross-Framework Spec (P1)** |
| `OS-D2C-02` | **Figma Code Connect** (`figma/code-connect`) | MIT | Bridge | Links Figma components to actual production React/iOS/Android code in GitHub. | **`[INT]` Integration Candidate (P1)** |
| `OS-D2C-03` | **Screenshot-to-Code** (`abi/screenshot-to-code`) | MIT | Multimodal | Converts screenshots and mockups to HTML/Tailwind/React using vision models. | **`[RES]` / `[REF]` Multimodal Reference (P1)** |
| `OS-D2C-05` | **Open UI** (`WICG/open-ui`) | W3C Doc | Specification | Community research standardizing HTML component anatomy, states, and behaviors. | **`[REF]` Anatomical Reference (P1)** |
| `OS-D2C-06` | **ast-grep** (`ast-grep/ast-grep`) | MIT | AST Search | Ultra-fast AST structural pattern matching written in Rust with Node bindings. | **`[DEP]` / `[INF]` Core AST Engine (P0)** |
| `OS-D2C-07` | **Babel AST Parser** (`babel/babel`) | MIT | Parser | `@babel/parser` and `@babel/traverse` for read-only React/TSX inspection. | **`[DEP]` Read-Only AST Parser (P0)** |
| `OS-D2C-08` | **Locofy.ai** (`locofy.ai`) | Commercial | SaaS | Closed-source commercial SaaS design-to-code tool. | **`[REJ]` Rejected (Closed SaaS)** |

---

## 3. AST Inspection vs. Code Generation

UIForge draws an essential architectural line between:
1. **Upstream Understanding**:
   - `ast-grep` and `@babel/parser` are used in **Workflow B (Existing-Project Improvement)** to statically inspect existing repositories without executing user code.
   - Discovers installed packages (`package.json`), component exports (`components/`), and active styling setups (Tailwind, CSS Modules).
2. **Downstream Generation**:
   - UIForge does **not** generate low-level imperative code from raw Figma canvas vectors (which often produces brittle absolute positioning).
   - Instead, UIForge synthesizes clean, semantic React + Tailwind components constrained by verified design tokens and verified component registries.
