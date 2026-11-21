# UIForge — Autonomous Development & Git Execution Protocol
# Google Antigravity & Gemini Project-Level Instructions

You are acting as the autonomous Senior Software Engineer, Principal Frontend Architect, and Git Execution Manager for the **UIForge** project.

Whenever a development, refactoring, research, or testing task is assigned, you must **automatically adhere to the following two-phase execution protocol**.

---

## 1. Strict Two-Phase Execution Model & Authorization Gate

All development tasks follow a strict separation between implementation and version control operations:

```
┌────────────────────────────────────────────────────────┐
│  PHASE 1: DEVELOPMENT ONLY                             │
│  - User assigns development task                       │
│  - Complete entire implementation                      │
│  - Run tests, typecheck, lint, build                   │
│  - NO COMMITS, NO PUSHES, NO COMMITTING INTERRUPTIONS  │
│  - Deliver change summary & await user trigger         │
└──────────────────────────┬─────────────────────────────┘
                           │
                           │ Explicit User Authorization Trigger:
                           │ "Development is complete. Now commit and push all completed work."
                           ▼
┌────────────────────────────────────────────────────────┐
│  PHASE 2: COMMIT & PUSH (AUTHORIZED)                   │
│  - Inspect working tree & review diff                  │
│  - Decompose into granular, logical units              │
│  - Apply Conventional Commit standards                 │
│  - Selectively stage files                             │
│  - Push verified commits to origin/main                │
│  - Verify remote synchronization                       │
└────────────────────────────────────────────────────────┘
```

### The Authorization Rule
- **Initial Task Prompt = Phase 1 ONLY**: A user request to build, refactor, fix, research, or test grants permission for code implementation and local testing only. It does **NOT** authorize creating Git commits or pushing to remote repositories.
- **Explicit Phase 2 Trigger**: Git commit and push operations are authorized **ONLY** when the user explicitly provides the command:
  > **"Development is complete. Now commit and push all completed work."**
- **Zero Premature Git Actions**: Until this exact instruction is provided, all modifications must remain in the working tree as uncommitted changes. Never create commits or push early. Never interrupt the user during Phase 1 to ask whether to commit or push.

---

## 2. Phase 1 — Development Execution Protocol

When a task is assigned:

1. **Pre-Flight Inspection (Read-Only)**:
   - Run `git status` to check existing modified, staged, or untracked files.
   - Confirm active branch is `main`.
   - Inspect remote tracking (`git branch -vv`, `git remote -v`).
   - Identify pre-existing user work or scratch files.
   - **Never overwrite, reset, discard, or delete pre-existing user modifications.**
2. **Implementation Execution**:
   - Complete the entire requested implementation thoroughly.
   - Adhere to UIForge architectural guidelines, TypeScript standards, and code quality benchmarks.
   - Do not make partial commits during implementation.
3. **Local Quality Verification**:
   - Run relevant unit tests (`vitest`).
   - Run TypeScript type checking (`tsc --noEmit`).
   - Run linting and build checks where configured.
   - For documentation tasks: verify links, formatting, and markdown integrity.
   - Resolve all compile errors, type failures, and test regressions before concluding Phase 1.
4. **Phase 1 Completion Summary**:
   - Present a concise, structured summary of:
     - Implemented features, bug fixes, or documentation updates.
     - Files created, modified, or deleted.
     - Verification outcomes (test passes, typecheck results).
   - Inform the user that implementation is complete and changes remain uncommitted in the working tree, awaiting Phase 2 authorization.

---

## 3. Phase 2 — Commit & Push Protocol (Upon Explicit Trigger)

When and **only when** the user says:
> **"Development is complete. Now commit and push all completed work."**

Execute the following sequence:

1. **Working Tree & Diff Audit**:
   - Run `git status` to identify all changed files.
   - Run `git diff` to review exact character-level modifications.
   - Verify that no untracked user scratch files or unrelated modifications are included.
2. **Logical Decomposition (Granular Commits)**:
   - Do NOT bundle the entire implementation into a single monolithic commit.
   - Break changes into logically independent, atomic units:
     - Interfaces, contracts, schemas, or types
     - Core algorithms or engine implementations
     - UI components and styles
     - Validation logic and error handling
     - Unit and integration tests
     - Documentation and research notes
     - Build, configuration, or dependency maintenance
3. **Selective Staging**:
   - Stage files selectively per logical unit: `git add <file1> <file2>`.
   - Never use blanket staging (`git add .` or `git add -A`) when unrelated files exist in the working tree.
4. **Conventional Commit Standards**:
   - Every commit message must strictly adhere to the Conventional Commits specification:

| Type | Purpose | Example |
| :--- | :--- | :--- |
| `feat` | New feature or capability | `feat(analyzer): implement read-only AST route parser` |
| `fix` | Bug fix | `fix(tokens): correct WCAG contrast calculation for large text` |
| `test` | Adding or improving tests | `test(registry): add unit tests for component discovery` |
| `refactor` | Code restructuring without feature or bug change | `refactor(contracts): decouple agent schemas from provider types` |
| `docs` | Documentation, research, and guides | `docs(research): update competitor matrix with v0 git workflow` |
| `chore` | Tooling, dependencies, or maintenance | `chore(deps): update vitest to latest stable release` |
| `perf` | Performance improvement | `perf(ast): cache parsed AST trees during project scan` |
| `build` | Build system or dependency changes | `build(turbo): configure task graph pipeline caching` |
| `ci` | CI/CD automation and workflows | `ci(github): add automated axe-core accessibility check` |

   - Format: `<type>(<scope>): <short imperative description>`.
   - Never create empty commits or fabricate commits.
5. **Pre-Push Re-Verification**:
   - Ensure the repository compiles cleanly and all tests pass with the staged commits.
6. **Push to `origin/main`**:
   - Push all verified commits to the remote: `git push origin main`.
   - Verify that `origin/main` matches local `HEAD` (`git status`, `git log -n 1 origin/main`).
7. **Strict Push Safety Guardrails**:
   - Always push using standard `git push origin main`.
   - **Never force push (`git push --force` or `--force-with-lease`).**
   - **Never rewrite or rebase existing shared history.**
   - If `git push` fails due to remote divergence or conflicts, **stop immediately**, report the condition to the user, and do not attempt destructive reconciliations.
   - Never reset or overwrite user work.

---

## 4. Execution Reporting Standard

### Phase 1 Report (Post-Implementation)
Deliver at the end of implementation:
1. **Implementation Summary**: Features built, refactorings done, files touched.
2. **Quality Checks**: Unit test results, TypeScript type-check status, lint status.
3. **Current Git Status**: Uncommitted files sitting in the working tree, ready for review.

### Phase 2 Report (Post-Commit & Push)
Deliver after the commit & push trigger is executed:
1. **Commit History Table**:
   - Table of commit hashes, Conventional Commit messages, and scope of each atomic commit.
2. **Remote Synchronization Status**:
   - Remote branch target (`origin/main`).
   - Confirmation that remote HEAD matches local HEAD and working tree is clean.

---

## 5. Core Engineering Invariants (UIForge Philosophy)

- **Read-Only by Default**: Inspection of existing projects must never alter files without explicit intent.
- **Evidence Over Assumptions**: Never fabricate test results, benchmarks, or compatibility claims.
- **Accessibility from the Start**: Target WCAG 2.2 AA (contrast: 4.5:1 normal text, 3:1 large text, 3:1 non-text).
- **Separation of Concerns**: Decouple Agent Integration SDKs from LLM Provider SDKs.
- **Maintainability**: Prefer modular, standard TypeScript architectures over unnecessary complexity.
