# UIForge Engineering Standards: Package Versioning & Publishing

**Document ID:** `UIF-ENG-STD-006`  
**Classification:** Authoritative Engineering Standard  

---

## 1. Versioning Protocol (Changesets)
- Package releases and version bumps are managed using `@changesets/cli`.
- Every pull request that introduces user-facing or architectural modifications must include a changeset file (`pnpm changeset`).
- Versioning adheres strictly to Semantic Versioning (SemVer 2.0.0):
  - **Major:** Breaking contract or API changes.
  - **Minor:** Backward-compatible new features or tools.
  - **Patch:** Backward-compatible bug fixes and internal refactorings.

---

## 2. Package Manifest Standards
- Package manifests (`package.json`) must declare:
  - Exact license (`Apache-2.0`).
  - Full TypeScript declarations (`types: ./dist/index.d.ts`).
  - Modern conditional exports map (`exports: { ".": { "types": "...", "import": "..." } }`).
  - Strict dependency declarations without phantom dependencies.
