# UIForge Engineering Standards: Monorepo Orchestration & Toolchain

**Document ID:** `UIF-ENG-STD-005`  
**Classification:** Authoritative Engineering Standard  

---

## 1. Toolchain Pinning
- **Node.js:** Pinned to Node.js 24 LTS (`v24.15.0`), with an engine constraint of `>=22.12.0`.
- **Package Manager:** `pnpm@9.15.0` managed through Node.js Corepack.
- **Monorepo Build Engine:** Turborepo (`turbo@^2.3.4`) orchestrating dependency-aware tasks:
  - `build`: depends on upstream `^build`, emits to `dist/`.
  - `typecheck`: depends on upstream `^typecheck`, zero emit (`--noEmit`).
  - `lint`: static analysis across packages.
  - `test`: executes Vitest test suites.

---

## 2. Anti-Placeholder Policy
- Only packages actively being implemented exist in the monorepo workspace.
- Do not create empty placeholder packages, stub directories, or speculative `tsconfig` references for future capabilities.
- Additional packages are introduced strictly in their designated engineering phases.
