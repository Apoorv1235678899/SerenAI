# SerenAI Development Rules

These rules apply to application, infrastructure, and documentation changes. Prefer the smallest reliable change: follow YAGNI and KISS, preserve current behavior, and avoid new patterns unless a concrete requirement justifies them.

1. Inspect the existing code, callers, tests, configuration, and relevant documentation before modifying behavior.
2. Prefer the smallest reliable implementation that fully satisfies the requirement.
3. Avoid unnecessary abstractions, dependencies, configuration, and speculative flexibility.
4. Preserve existing application functionality; describe unavoidable behavior changes before making them.
5. Reuse existing utilities and components instead of duplicating them.
6. Maintain TypeScript type safety; do not hide uncertainty with `any` or unchecked casts where validation is needed.
7. Validate and bound all API inputs at trust boundaries, including types, sizes, ranges, and allowed values.
8. Never hardcode API keys, passwords, signing keys, or other secrets.
9. Keep local and production environment files out of Git; use `.env.example` for names and empty/sample-safe values only.
10. Use consistent HTTP status codes and error response shapes; do not return internal secrets or sensitive details.
11. Respect existing MongoDB schemas and data. Schema/data migrations require explicit planning, compatibility checks, and backups.
12. Avoid modifying unrelated files; keep each change focused on its requested behavior.
13. Do not introduce a new architectural pattern or service boundary without a documented reason and migration plan.
14. Run appropriate tests, lint, type checks, and build checks before considering a code change complete; record checks that could not be run.
15. Explain important technical decisions, behavior changes, operational consequences, and known limitations.

## Sensitive Well-Being Data

Treat chat, mood, and activity records as sensitive. Minimize data sent to third-party services, document retention and deletion behavior, and never describe the app as private, encrypted, clinically validated, or continuously monitored unless those claims are technically and independently verified. AI output is not professional care; safety behavior requires explicit review and tests.

## Incremental Workflow

- Read `docs/architecture.md` before architectural changes and `docs/prd.md` before feature changes.
- Keep changes small enough to review; validate the touched slice before expanding scope.
- Update `docs/tasks.md` when work is completed or a newly discovered bug/task changes the roadmap.
- Do not mark a task complete without implementation evidence and appropriate verification.
