# Category 13 — Browser Testing & Execution Infrastructure

**Document ID:** `UIF-CAT-011`  
**Phase:** 02.1 — Open-Source Ecosystem Discovery & Intelligence  
**Category Focus:** Headless Browser Runtimes, Context Isolation & Sandboxed Execution  
**Date:** November 2026  

---

## 1. Category Overview

Automated evaluation requires a fast, robust, and isolated browser runtime capable of rendering client-side JavaScript, executing synthetic user interactions, and capturing exact layout metrics.

This category evaluates the headless browser runners and execution container infrastructure for UIForge.

---

## 2. In-Depth Comparative Analysis

| Candidate ID | Project & URL | License | Process Startup | Multi-Engine | Multi-Viewport | UIForge Role |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `OS-BROW-01` | **Playwright** (`microsoft/playwright`) | Apache-2.0 | <150ms (ephemeral context) | Chromium, Firefox, WebKit | Native device descriptors | **`[DEP]` / `[INF]` Foundational Core (P0)** |
| `OS-BROW-02` | **Puppeteer** (`puppeteer/puppeteer`) | Apache-2.0 | ~200ms | Chromium (experimental Firefox) | Manual CDP viewport resize | `[INF]` / `[REF]` Secondary Alternative (P1) |
| `OS-BROW-03` | **WebdriverIO** (`webdriverio/webdriverio`) | MIT | ~400ms | All engines (WebDriver BiDi) | Emulation plugins | `[INF]` / `[REF]` Cross-Browser Runner (P2) |
| `OS-BROW-04` | **Testcontainers Node** (`testcontainers/testcontainers-node`) | MIT | 2–5s (Docker container init) | Dockerized Chromium | Containerized isolation | **`[INF]` Sandbox Container Manager (P1)** |
| `OS-BROW-05` | **Browserless Chrome** (`browserless/chrome`) | Apache-2.0 | Daemon (persistent WebSocket) | Dockerized Chromium | CDP remote connections | `[INF]` / `[REF]` Remote Execution Pool (P2) |
| `OS-BROW-06` | **Browser-Use** (`browser-use/browser-use`) | MIT | ~300ms | Chromium | Agent visual DOM | `[RES]` / `[REF]` Synthetic Interaction (P2) |
| `OS-BROW-07` | **Selenium** (`SeleniumHQ/selenium`) | Apache-2.0 | >1,500ms (WebDriver process) | All | Grid orchestration | **`[REJ]` Rejected (Excessive Latency)** |
| `OS-BROW-08` | **Cypress** (`cypress-io/cypress`) | MIT Core | In-browser electron runner | Chromium, Firefox | Desktop test runner | `[REF]` Deprioritized (Desktop Focus) (P2) |

---

## 3. Sandboxing & Security of Untrusted Projects

When evaluating user code in Workflow B, UIForge must guard against untrusted scripts executing malicious host commands:

1. **Local Host Mode**: Playwright launches Chromium with `--disable-gpu`, `--no-sandbox` (in CI containers), and strictly bound to loopback addresses (`127.0.0.1`).
2. **Containerized Sandbox Mode (Enterprise)**: Uses `testcontainers-node` to spin up an isolated, unprivileged Docker container running Node.js and headless Chromium. External network egress is blocked, preventing data exfiltration during browser testing.
