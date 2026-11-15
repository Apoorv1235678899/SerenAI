# SerenAI Product Requirements

**Document status:** recovery baseline inferred from repository source as of 2026-11-12. This is not evidence of user research, clinical validation, or an approved product strategy. A source-backed feature is not necessarily verified against live MongoDB, Gemini, or Inngest services.

## Product Overview

SerenAI is presented in its UI as an AI companion for emotional well-being. The implemented application offers registration/login, chat sessions with Gemini-generated responses, mood entries, wellness activity logging, relaxation games, and a dashboard. Marketing statements in the UI (including "completely private," "encrypted," "evidence-based," and "24/7 support") are not substantiated by repository evidence and must not be treated as verified product guarantees.

## Problem Statement

**Inferred, not user-validated:** people seeking everyday emotional-wellness support may value a private-feeling space to reflect, track moods, and access simple relaxation exercises. The codebase does not document validated user needs, target markets, or clinical outcomes.

## Product Vision

**Proposed wording, not an approved commitment:** provide a clear, privacy-conscious well-being companion for reflection, mood tracking, and guided relaxation, with explicit limitations and safe boundaries around AI-generated support.

## Target Users

- **Unknown / requiring verification:** personas, age limits, geography, accessibility needs, clinical status, and whether the product is intended for adults only are not documented.
- **Inferred from current UI:** an individual user seeking emotional-wellness reflection and simple relaxation activities.
- The application must not represent itself as a clinician, diagnosis service, emergency service, or replacement for professional care.

## Status Definitions

- **Implemented and verified:** the path exists in source and was confirmed by local build/source inspection; live external-service behavior is not implied.
- **Partially implemented:** some code exists, but important workflow, persistence, safety, validation, or UI behavior is missing or inconsistent.
- **Planned:** a candidate for this recovery roadmap only; no existing approved roadmap was found.
- **Unknown / requiring verification:** source evidence is insufficient to make a product claim.

## Core User Journeys

| Journey | Status | Evidence / gap |
| --- | --- | --- |
| Register, then log in and reach dashboard | Partially implemented | Register and login APIs/forms exist; registration redirects to login. No email verification, password recovery, rate limiting, or protected dashboard route was found. |
| Start a chat, exchange messages, return to history | Partially implemented | Chat sessions and history persist in MongoDB; route invokes Gemini. No live service-backed verification; duplicate AI processing and safety limitations remain. |
| Record mood and view history/statistics | Partially implemented | Mood form, API, and stats exist. No tests; recommendation job is placeholder; dashboard uses limited/hardcoded metrics. |
| Log an activity and view it on dashboard | Partially implemented | Manual activity logging and retrieval exist. Game activity submission uses `game`, rejected by API validation. |
| Open a relaxation game | Implemented and verified | Four interactive components are rendered in dashboard dialogs; only local build/source is verified. Tracking the game start is broken by the activity type mismatch. |
| Complete a therapy session and see it marked complete | Unknown / requiring verification | UI contains completion-related state/handler, but it does not persist status and no completion endpoint exists. |
| Use About, Features, or Forgot Password pages | Planned | Header/login links exist, but these routes are absent. This is a roadmap candidate, not an existing approved feature. |

## Functional Requirements

| ID | Requirement | Status |
| --- | --- | --- |
| FR-01 | A person can create an account with name, email, and password; email is normalized and password is hashed before persistence. | Implemented and verified (source/build) |
| FR-02 | A person can log in, receive an HTTP-only session cookie, check session state, and log out. | Partially implemented; no rate limiting/recovery and no live integration test |
| FR-03 | Authenticated users can create, list, and retrieve their own chat sessions and message history. | Implemented and verified (source/build); session completion lifecycle absent |
| FR-04 | An authenticated user can send a nonempty message and persist a Gemini-generated assistant response with analysis metadata. | Partially implemented; model output is unvalidated and background response is discarded |
| FR-05 | Chat should communicate limitations and handle crisis/risk messages safely without claiming clinical care. | Partially implemented; prompt language and risk score exist, but verified escalation/safety path does not |
| FR-06 | An authenticated user can record a mood score from 0 to 100 and retrieve history/statistics. | Implemented and verified (source/build); service-backed behavior and full input validation unknown |
| FR-07 | An authenticated user can record an activity with a supported type and see persisted activity history. | Partially implemented; game type mismatch breaks game activity logging |
| FR-08 | The dashboard presents accurately derived mood/activity/session summaries and insights. | Partially implemented; completion rate is fixed, session count is not completed-only, and AI check-in is empty |
| FR-09 | Users can launch breathing, garden, forest, and ocean-wave experiences. | Implemented and verified (source/build); no evidence of clinical validation |
| FR-10 | Users can review privacy, data retention, AI-provider use, limitations, and how to get support. | Planned; no substantive privacy/mental-health safety information page was found |
| FR-11 | About and Features pages linked from navigation resolve to product information. | Planned; current links resolve to missing routes |
| FR-12 | A user can recover account access and manage/revoke active sessions. | Planned; no recovery flow or session-management UI/API was found |

## Non-Functional Requirements

| Requirement | Status |
| --- | --- |
| Security: server-only secrets, HTTP-only cookie, per-user access checks, validated input, rate limits, secure session storage | Partially implemented; several controls are absent and must be designed/tested |
| Privacy: disclose Gemini processing, minimize retention, support deletion/export, define backups and access policies | Unknown / requiring verification; no lifecycle or privacy policy evidence found |
| Reliability: AI/event failures do not silently lose data or create ambiguous duplicate submissions | Partially implemented; DB writes precede event sends and response flow can fail after persistence |
| Accessibility: keyboard/screen-reader/mobile behavior for all workflows | Unknown / requiring verification; no accessibility test evidence found |
| Performance: bounded request sizes, history retrieval, AI latency, DB query behavior | Partially implemented; chat history growth and request/body limits are not bounded in the inspected route |
| Maintainability: typed API contracts, consistent errors, automated tests, repeatable setup | Partially implemented; TypeScript build passes but contracts/errors vary and no tests are configured |
| Observability/recovery: actionable logs, production monitoring, backups, restore procedures | Unknown / requiring verification |

## Feature Requirements

### Authentication

- Preserve email normalization and password hashing.
- Require appropriately strong passwords and validated email/input limits; add throttling for registration/login.
- Keep secrets server-side; never return password hashes or JWTs in JSON.
- Implement and test recovery/session lifecycle only after product and security decisions.
- Status: **Partially implemented**.

### AI Conversations and Therapy Sessions

- Provide owned sessions, message history, and assistant responses; persist only required data.
- Validate AI response structure before using analysis/risk metadata.
- Set transparent non-clinical boundaries, define safe responses and reviewed escalation guidance, and disclose third-party processing.
- Have one authoritative response-generation path and explicit fallback behavior.
- Define session completion/archive semantics and persistence.
- Status: basic chat **Partially implemented**; clinical safety, human escalation, and full therapy lifecycle **Unknown / requiring verification**.

### Mood Tracking

- Allow a user to record a 0-100 score and optionally include note/context/activities only after defining their data contract.
- Retrieve date-filtered history and defined period statistics.
- Make units and thresholds consistent between user score, dashboard labels, and background processing.
- Status: entry/history/stat endpoint **Implemented and verified (source/build)**; useful recommendations and full dashboard accuracy **Partially implemented**.

### Activities and Relaxation

- Allow supported activity logging and retrieval; align allowed types between UI, route validation, and schema.
- Launch breathing patterns, Zen Garden, Mindful Forest, and Ocean Waves from dashboard.
- Record a game only on a defined event (start versus completion) and persist accurate duration/status.
- Status: local game interactions **Implemented and verified (source/build)**; game tracking and progress **Partially implemented**.

### Dashboard

- Show persisted and clearly defined daily mood/activity/session values.
- Avoid placeholder completion rates and fabricated/generated insights presented as personal facts.
- Provide a functional check-in workflow or remove the empty drawer.
- Status: **Partially implemented**.

## Privacy and Security Requirements

- Treat chat, mood, and activity data as sensitive personal information.
- Document data sent to Google Gemini, data stored in MongoDB, retention/deletion, backups, and operational access.
- Do not claim encryption, confidentiality, regulatory compliance, or clinical validation without evidence.
- Limit data sent to AI to what the feature requires; protect credentials and tokens; validate all request bodies and model outputs.
- Define account deletion, data export, and incident-response requirements before production use.
- Status: **Partially implemented / Unknown**, not a verified privacy program.

## Mental Health Safety Limitations

The current application is not verified as a medical device or clinical service. No crisis intervention, emergency routing, clinician review, or evidence of clinically validated recommendations was found. AI output and model-generated risk scores can be incorrect. The product must not diagnose, promise treatment outcomes, imply continuous human monitoring, or be presented as a substitute for professional or emergency support. Any crisis guidance and jurisdiction-specific resources require qualified review before release.

## MVP Scope

**Existing source-backed baseline:** account registration/login; authenticated chat session create/list/history; direct Gemini message response; mood score entry/history/statistics; activity logging/history; dashboard; four local relaxation experiences.

**MVP completion gaps:** dependency security remediation, correct session/activity metrics, game activity logging, one reliable AI path, request/model validation, safety/privacy decisions, authentication hardening, tests, and deployment evidence. These gaps mean the source-backed baseline is not a verified production-ready MVP.

## Future Improvements

These are proposals, not existing commitments: implement About/Features and privacy/safety pages; account recovery and session management; reliable Inngest side effects and recommendations; accurate activity/session analytics; data export/deletion; accessibility and mobile workflow tests; observability/backups; and user research to validate target users and product vision.
