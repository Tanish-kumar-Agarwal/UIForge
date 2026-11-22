# UIForge Engineering Standards: Git Workflow & Pull Request Protocols

**Document ID:** `UIF-ENG-STD-007`  
**Classification:** Authoritative Engineering Standard  

---

## 1. Strict Two-Phase Execution Model
All engineering tasks strictly separate implementation from Git commit operations:
1. **Phase 1 (Development):** All code changes, refactorings, tests, builds, and type checks are completed locally with ZERO commits or pushes.
2. **Phase 2 (Commit & Push):** Executed ONLY upon explicit user trigger. Changes are decomposed into fine-grained, atomic Conventional Commits.

---

## 2. Conventional Commits Standards
Every commit message must strictly adhere to the Conventional Commits specification:
- `feat(<scope>): <short imperative summary>`
- `fix(<scope>): <short imperative summary>`
- `test(<scope>): <short imperative summary>`
- `refactor(<scope>): <short imperative summary>`
- `docs(<scope>): <short imperative summary>`
- `chore(<scope>): <short imperative summary>`
- `build(<scope>): <short imperative summary>`
- `ci(<scope>): <short imperative summary>`

---

## 3. Branch Protection Requirements
- Direct pushes to `main` are restricted.
- Pull requests require passing CI checks:
  - Formatting (`pnpm format:check`)
  - Type checking (`pnpm typecheck`)
  - Linting (`pnpm lint`)
  - Unit & contract tests (`pnpm test`)
  - Architectural boundaries (`pnpm test:boundaries`)
  - License compliance (`pnpm test:licenses`)
  - CodeQL security analysis
