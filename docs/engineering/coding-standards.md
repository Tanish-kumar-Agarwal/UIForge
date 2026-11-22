# UIForge Engineering Standards: TypeScript & Coding Standards

**Document ID:** `UIF-ENG-STD-002`  
**Classification:** Authoritative Engineering Standard  

---

## 1. Strict TypeScript Standards
- **Strict Mode Enabled:** Every package compiles under `"strict": true`, `"noUncheckedIndexedAccess": true`, and `"isolatedModules": true`.
- **Target & Module System:** Pinned to `target: ES2024` and `moduleResolution: NodeNext`.
- **Explicit Type Imports:** Enforce `import type { ... } from '...'` for type-only references.
- **Zero `any` in Public Surfaces:** Public package APIs must have fully typed inputs, outputs, and return types. The use of `any` is restricted to internal dynamic boundary deserialization and must be explicitly narrowed using Zod schemas.

---

## 2. Formatting & Linting Conventions
- Formatting is standardized via Prettier (2 spaces, single quotes, trailing commas: all, print width: 100).
- Linting is enforced via ESLint 9 Flat Config (`eslint.config.mjs`) paired with `typescript-eslint`.
- All source code must pass `pnpm format:check` and `pnpm lint` before submission.
