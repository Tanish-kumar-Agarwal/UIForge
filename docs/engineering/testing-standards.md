# UIForge Engineering Standards: Testing & Verification

**Document ID:** `UIF-ENG-STD-003`  
**Classification:** Authoritative Engineering Standard  

---

## 1. Testing Framework & Philosophy
- **Test Runner:** All unit and contract tests run through Vitest (`vitest run`).
- **Evidence Over Assumptions:** Never fabricate test results, mock out core contract validations, or substitute simulated assertions for real test execution.
- **Contract Round-Trip Validation:** Every contract in `@uiforge/contracts` must be accompanied by unit tests validating positive fixtures and negative malformed payloads.

---

## 2. Test Suite Hierarchy
1. **Unit & Contract Tests:** Fast, in-memory execution covering pure schemas, state machines, and analysis engines (`pnpm test`).
2. **Architectural Boundary Tests:** `pnpm test:boundaries` executing Madge circularity checks and explicit import allowlists.
3. **License Governance Tests:** `pnpm test:licenses` validating production dependencies against copyleft prohibitions.
4. **Integration & E2E Protocol Tests:** End-to-end MCP protocol tests connecting real clients to servers via standard transports.
