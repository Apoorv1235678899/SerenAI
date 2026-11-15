# SerenAI Development Tasks

Roadmap based on the source audit dated 2026-11-12. Every item is open unless explicitly marked otherwise. Priorities reflect risk and prerequisite order, not a committed schedule. `[x]` is reserved for work verified complete.

## 1. Project Recovery and Setup

- [x] Record architecture, product baseline, rules, and this roadmap. **Priority: Medium. Status: Complete (docs created from source audit; build/lint run). Dependencies: none.**
- [ ] Align the installed dependency tree with `package.json` and `package-lock.json`; document a clean setup and supported Node version. **Priority: High. Status: Open; installed Next.js differs from both manifest and lockfile. Dependencies: none.**
- [ ] Verify local startup against disposable MongoDB, Gemini, and Inngest configuration without using production data. **Priority: High. Status: Open; local build does not verify external services. Dependencies: clean setup.**

## 2. Security and Dependency Updates

**Bugs / risks**

- [ ] Review and remediate production dependency advisories, starting with Next.js and Mongoose critical findings; update lockfile and rerun audit/build/tests. **Priority: Critical. Status: Open; audit reports 18 advisories (2 critical, 9 high, 7 moderate). Dependencies: clean setup.**
- [ ] Define and implement password policy, login/registration throttling, request-size limits, and consistent input validation. **Priority: High. Status: Open; no rate limiting or comprehensive schemas found. Dependencies: security requirements.**
- [ ] Store only a one-way digest of session tokens in the database, if compatible with the approved session design; add revocation/expiry tests. **Priority: High. Status: Open; raw JWT currently stored in Session. Dependencies: session design.**
- [ ] Review privacy copy and establish AI-provider disclosure, data retention/deletion, export, backup, and access-control policy. **Priority: Critical. Status: Open; current privacy claims are not evidenced. Dependencies: product/legal review.**

## 3. Architecture and Backend Improvements

**Bugs / reliability**

- [ ] Choose one chat response path; prevent the unused Inngest chat generation from duplicating Gemini calls. **Priority: High. Status: Open; synchronous and background paths both call Gemini. Dependencies: AI flow decision.**
- [ ] Make event delivery reliable and idempotent, including behavior when a record is saved but event send fails. **Priority: High. Status: Open; writes precede event sends. Dependencies: event-processing design.**
- [ ] Implement persistence for job outputs or remove placeholder handlers and their unsupported claims. **Priority: Medium. Status: Open; handlers return fixed/log-only results. Dependencies: define product side effects.**
- [ ] Add consistent request schemas, HTTP error contracts, bounded pagination/history, and API route tests. **Priority: High. Status: Open; validation and error behavior vary. Dependencies: API contracts.**
- [ ] Define observability, backups, restore testing, deployment topology, and operational ownership. **Priority: High. Status: Open; no deployment/operations configuration found. Dependencies: hosting decision.**

## 4. Authentication

**Bugs / risks**

- [ ] Add automated tests for registration, login, logout, expiration, malformed tokens, and cross-user resource access. **Priority: High. Status: Open; no test suite found. Dependencies: test setup.**
- [ ] Decide whether dashboard and therapy pages require server-side access protection; ensure unauthenticated users receive intentional redirects/states. **Priority: High. Status: Open; protection is API-side/client-state only. Dependencies: auth UX decision.**
- [ ] Implement password recovery and session management only after requirements are approved. **Priority: Medium. Status: Open; login link points to a missing page. Dependencies: product/security requirements.**

## 5. AI Conversation Functionality

**Bugs / safety**

- [ ] Validate Gemini analysis output against a typed schema and define safe fallback behavior for invalid/empty output. **Priority: Critical. Status: Open; unchecked JSON.parse result is used. Dependencies: AI response contract.**
- [ ] Create qualified mental-health safety requirements, risk-response policy, crisis-resource review, and disclaimers; test representative safe/unsafe prompts. **Priority: Critical. Status: Open; no verified escalation path. Dependencies: clinical/legal review.**
- [ ] Minimize and document conversation data sent to Gemini and Inngest; explicitly disclose third-party processing. **Priority: Critical. Status: Open; full message is sent and recent history included in direct Gemini request. Dependencies: privacy review.**
- [ ] Add chat route tests for ownership, persistence, retries, provider failures, and event failures. **Priority: High. Status: Open; no tests found. Dependencies: test setup and AI path decision.**

**New features**

- [ ] Define and implement session completion/archive lifecycle with accurate history behavior. **Priority: Medium. Status: Open; session status exists but no update route/workflow. Dependencies: session lifecycle requirements.**

## 6. Mood Tracking

**Bugs / correctness**

- [ ] Align the 0-100 score scale with all background thresholds and labels. **Priority: High. Status: Open; Inngest handler compares score with `< 3`. Dependencies: mood contract.**
- [ ] Validate optional context/activities input and define date/time-zone semantics for history and stats. **Priority: Medium. Status: Open; values are broadly accepted and period defaults silently. Dependencies: API contract.**
- [ ] Test mood creation, date filters, limits, stats, and persistence when event delivery fails. **Priority: High. Status: Open; no tests found. Dependencies: test setup.**

**New features**

- [ ] Decide whether mood trend/recommendation jobs are in scope; implement evidence-based, persisted outputs only if approved. **Priority: Low. Status: Open; current handler returns placeholder values. Dependencies: product and safety review.**

## 7. Therapy Sessions

**Bugs / incomplete workflow**

- [ ] Persist session completion/status and connect the UI completion action to the API. **Priority: High. Status: Open; no completion endpoint and completion handler is unused. Dependencies: session lifecycle requirements.**
- [ ] Fix stress-keyword flow so it either presents a real relaxation prompt or does not intercept/store the message locally. **Priority: Medium. Status: Open; detector returns early and its prompt state is not rendered. Dependencies: chat UX decision.**
- [ ] Handle invalid/missing session IDs with explicit user-facing recovery rather than silently showing empty history. **Priority: Medium. Status: Open; initial history failure is caught and cleared. Dependencies: UI error-state design.**
- [ ] Verify session ownership, history loading, and long-chat behavior with integration tests. **Priority: High. Status: Open. Dependencies: test setup.**

## 8. Activities and Relaxation

**Bugs / correctness**

- [ ] Align the activity type validator with the Mongoose enum and dashboard game logger (`game` currently rejected by API). **Priority: High. Status: Open. Dependencies: activity type contract.**
- [ ] Define whether game activities are logged at start or completion and capture a truthful duration. **Priority: Medium. Status: Open; games log at start with duration 0. Dependencies: activity semantics.**
- [ ] Add tests for manual activity types, game logging, invalid values, and per-user history. **Priority: Medium. Status: Open. Dependencies: test setup and type contract.**

**New features**

- [ ] Add additional activities only after product scope is confirmed; do not treat existing Inngest achievement placeholders as shipped features. **Priority: Low. Status: Open. Dependencies: product approval.**

## 9. Dashboard

**Bugs / correctness**

- [x] Remove the fixed 100% completion rate from the dashboard until a defined persisted metric exists. **Priority: High. Status: Complete; the fabricated tile was removed. Dependencies: metric definition for any future replacement.**
- [x] Label the session count as chat sessions rather than completed therapy sessions. **Priority: High. Status: Complete; the dashboard now describes the displayed count as saved conversations. Session completion lifecycle remains open.**
- [x] Handle a valid mood score of 0 as data, not "No data." **Priority: Medium. Status: Complete; the dashboard now checks for `null` explicitly.**
- [ ] Implement or remove the empty AI check-in drawer and ensure dashboard data failures are visible. **Priority: Medium. Status: Open. Dependencies: check-in scope.**

**New features**

- [ ] Define trustworthy insight rules and clearly distinguish computed statistics from suggestions. **Priority: Low. Status: Open. Dependencies: product/safety review.**

## 10. UI/UX Improvements

**Bugs / incomplete navigation**

- [x] Resolve or remove dead `/features`, `/about`, and `/forgot-password` links. **Priority: Medium. Status: Complete; About and Features routes are implemented, the unsupported recovery link was removed, and the production build includes both routes.**
- [ ] Review responsive, keyboard, screen-reader, loading, empty, and error states across auth, chat, mood, and activity flows. **Priority: Medium. Status: Open; no accessibility/E2E evidence. Dependencies: test setup.**
- [x] Remove or qualify unsupported privacy, encryption, clinical/evidence-based, and always-available claims. **Priority: Critical. Status: Complete for the inspected frontend copy; About now discloses Gemini/MongoDB handling and states the AI limitations. A broader privacy and product review remains open.**

**New features**

- [ ] Run user research/usability sessions to verify target audience, core journey, and dashboard terminology. **Priority: Low. Status: Open; no user research artifacts found. Dependencies: recruitment and research plan.**

## 11. About and Features Pages

**New features**

- [x] Add About and Features pages using factual copy based on shipped capabilities. **Priority: Low. Status: Complete; requested by product owner, source-backed copy added, and build verified.**

## 12. Testing and Deployment

**Bugs / release readiness**

- [ ] Add a test runner and focused unit/route tests for auth, ownership, mood/activity validation, AI parsing, and event failures. **Priority: High. Status: Open; no test script/files found. Dependencies: test strategy.**
- [ ] Add service-backed integration tests using isolated MongoDB and controlled Gemini/Inngest test doubles or documented sandbox services. **Priority: High. Status: Open; build only was verified. Dependencies: test strategy and clean setup.**
- [ ] Add CI for install, lint, type-check/build, tests, and dependency audit; establish warning thresholds. **Priority: High. Status: Open; no CI workflow found. Dependencies: test setup.**
- [ ] Select and document hosting, secret injection, MongoDB network access, Inngest endpoint setup, TLS, backups, monitoring, and rollback. **Priority: High. Status: Open; production deployment unknown. Dependencies: hosting decision.**
- [ ] Run a pre-release privacy/security/mental-health safety review before any real-user deployment. **Priority: Critical. Status: Open. Dependencies: privacy and safety requirements.**
