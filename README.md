# UIForge

> AI-assisted frontend engineering intelligence and orchestration platform.

UIForge helps AI coding agents and human developers understand existing frontend codebases, interpret product requirements, evaluate accessibility, responsiveness, and visual quality, and apply safe, verified modifications with zero regressions.

---

## Architecture & Monorepo Topology

UIForge is organized as a pnpm-managed TypeScript monorepo governed by strict architectural layers (Levels 0 through 6) and 28 Canonical Versioned Contracts:

```
packages/
├── contracts/          # Level 0: Pure Zod schemas, TypeScript types & error taxonomy
├── config/             # Tooling: Shared compiler, linting, and tooling presets
├── project-analyzer/   # Level 2: Non-destructive AST project and route scanner
├── core/               # Level 4: Engine coordinator & Task State Machine
└── mcp-server/         # Level 6: Model Context Protocol 2026-07-28 stdio server
```

---

## Quick Start

### Prerequisites
- Node.js `v24.x LTS` (or $\ge$ `22.12.0 LTS`)
- `pnpm@9.15.0` (enabled via `corepack enable pnpm`)

### Installation & Build
```bash
# Install workspace dependencies
pnpm install

# Run type checking across all packages
pnpm typecheck

# Run unit, contract, and MCP protocol tests
pnpm test

# Verify architectural boundaries and zero circular dependencies
pnpm test:boundaries

# Verify open-core license compliance
pnpm test:licenses

# Build all packages with Turborepo
pnpm build
```

---

## Developer Standards & Documentation

Comprehensive engineering documentation is available under `docs/engineering/`:
- [Architecture Standards](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/docs/engineering/architecture-standards.md)
- [Coding Standards](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/docs/engineering/coding-standards.md)
- [Testing Standards](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/docs/engineering/testing-standards.md)
- [Security Standards](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/docs/engineering/security-standards.md)
- [Monorepo Standards](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/docs/engineering/monorepo-standards.md)
- [Package Publishing Standards](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/docs/engineering/package-publishing-standards.md)
- [Git and PR Standards](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/docs/engineering/git-and-pr-standards.md)
- [Error Handling Standards](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/docs/engineering/error-handling-standards.md)
- [Agent Integration Standards](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/docs/engineering/agent-integration-standards.md)

---

## License

UIForge is open-source software licensed under the [Apache-2.0 License](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/LICENSE).  
Third-party notices and attribution are documented in the [NOTICE](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/NOTICE) file.
