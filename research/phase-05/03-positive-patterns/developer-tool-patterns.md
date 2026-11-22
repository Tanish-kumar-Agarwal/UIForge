# UIForge Phase 05 — Developer Tools Design Patterns
## Dense Monospace Ergonomics, AST Diff Splitters, Terminal Emulation & Keyboard Palettes

**Document ID:** UIF-PH05-PATT-DEVTOOLS  
**Domain:** Developer Tools, Cloud Consoles & IDEs  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Domain Profile & User Mentality
- **User Goals:** Writing code, debugging logs, reviewing AST diffs, executing CLI workflows, monitoring build graphs.
- **Cognitive State:** Analytical, keyboard-centric, intolerant of wasteful padding or decorative distractions.

---

## 2. Canonical Positive Pattern: `PATT-DEV-001` (Dense Monospace Code & Diff Split)

### 2.1 Workspace Architecture & Diff Splitter
- **Three-Panel Split:**
  - File Tree (200px): Compact tree view with expand/collapse arrows and status badges (`M` modified, `A` added).
  - Code / Diff Canvas (Flex 1): Side-by-side or unified diff viewer. Line numbers anchored in a left gutter. Added lines highlighted in soft green (`rgba(34, 197, 94, 0.15)`), deleted lines in soft red (`rgba(239, 68, 68, 0.15)`).
  - Terminal / Output Drawer (Bottom, resizable height): Monospace stdout/stderr log stream with ANSI color rendering.
- **Command Palette (`Cmd+K` / `Ctrl+P`):**
  - Centered modal popover with instant fuzzy search across all files, actions, and settings. Arrow-key navigable with Enter activation.

### 2.2 Typography & Monospace Invariants
- **Monospace Family:** JetBrains Mono, Fira Code, or Berkeley Mono with ligature support and distinct punctuation glyphs.
- **Font Sizing:** 13px editor size, 1.5 line-height, zero character spacing distortion.
- **Dark Mode Optimization:** Low-saturation syntax highlighting (dracula or github-dark themes) on deep neutral background (`#0D1117`), preventing eye strain during 8+ hour coding sessions.

### 2.3 Observable Evaluation Signals
- Full keyboard shortcut coverage for every UI action.
- Resizable panels using standard draggable splitter handles with ARIA `role="separator"`.
