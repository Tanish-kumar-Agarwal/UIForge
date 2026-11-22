# Contributing to UIForge

Thank you for contributing to UIForge. We welcome contributions adhering to our engineering standards and quality gates.

---

## Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Tanish-kumar-Agarwal/UIForge.git
   cd UIForge
   ```

2. **Verify Node.js & enable pnpm:**
   ```bash
   node -v  # Must be >= 22.12.0 LTS (Node 24 LTS recommended)
   corepack enable
   corepack prepare pnpm@9.15.0 --activate
   ```

3. **Install dependencies:**
   ```bash
   pnpm install
   ```

---

## Two-Phase Git & Conventional Commits Protocol

UIForge strictly separates development execution from Git commit operations:
- All implementation and local testing must be completed and passing before creating commits.
- Commits must adhere strictly to the **Conventional Commits** specification:
  - `feat(<scope>): <description>`
  - `fix(<scope>): <description>`
  - `test(<scope>): <description>`
  - `refactor(<scope>): <description>`
  - `docs(<scope>): <description>`
  - `chore(<scope>): <description>`
- Never use blanket staging (`git add .`). Stage atomic, logical units independently.

---

## Quality Gates & Verification

Before submitting a Pull Request, verify that all automated gates pass:
```bash
pnpm format:check    # Prettier formatting
pnpm lint            # ESLint static analysis
pnpm typecheck       # TypeScript compilation check
pnpm test            # Vitest unit & contract suites
pnpm test:boundaries # Madge circularity & import allowlist checks
pnpm test:licenses   # License compliance check
pnpm build           # Turborepo monorepo build
```
