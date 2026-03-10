<!--
Sync Impact Report
Version change: template-unversioned -> 1.0.0
Modified principles:
- Template Principle 1 -> I. Personal Finance Clarity First
- Template Principle 2 -> II. Supabase Simplicity and Data Integrity
- Template Principle 3 -> III. Mobile-Responsive by Default
- Template Principle 4 -> IV. Privacy and Access Control Baseline
- Template Principle 5 -> V. Testable Quality Gates
Added sections:
- Technical Standards
- Development Workflow and Quality Review
Removed sections:
- None
Templates requiring updates:
- .specify/templates/plan-template.md: ✅ updated
- .specify/templates/spec-template.md: ✅ updated
- .specify/templates/tasks-template.md: ✅ updated
- .specify/templates/commands/*.md: ⚠ pending (directory not present)
Follow-up TODOs:
- None
-->

# ExpenseCheck Constitution

## Core Principles

### I. Personal Finance Clarity First

Every feature MUST improve a core personal-finance workflow: tracking income,
tracking expenses, managing fund balances, or viewing cash-flow summaries.
Screens, labels, and reports MUST use clear financial terms and avoid ambiguous
business jargon.
Rationale: This product exists to help individuals control money decisions,
so every release must preserve domain clarity and user trust.

### II. Supabase Simplicity and Data Integrity

Persistent data MUST be implemented in Supabase (PostgreSQL + Auth + Storage
when needed) with minimal operational complexity. Every write path MUST enforce
input validation, ownership checks, and transactional consistency for balances.
Schema changes MUST include migration scripts and rollback notes.
Rationale: Supabase is the chosen simple backend, but financial data still
requires strict consistency and safe evolution.

### III. Mobile-Responsive by Default

All user-facing pages MUST support mobile first and remain usable at 360px
viewport width without horizontal scrolling. Layouts MUST adapt to common
mobile and desktop breakpoints with readable typography and touch-friendly
controls.
Rationale: Personal finance usage is frequent on phones; mobile usability is
not optional.

### IV. Privacy and Access Control Baseline

The system MUST isolate each user's financial data by default. Row-level
security, authenticated access, and least-privilege policies MUST be enforced
for all protected tables and APIs. Sensitive values MUST never be logged in
plain text.
Rationale: Financial records are private and require robust baseline controls,
even in early-stage builds.

### V. Testable Quality Gates

Each feature MUST define acceptance criteria and include test coverage for
critical financial calculations, Supabase integration paths, and responsive UI
states. No change may be merged if it breaks existing income, expense, or fund
balance workflows.
Rationale: Financial mistakes quickly erode confidence; quality gates prevent
silent regressions.

## Technical Standards

- Frontend and backend MUST treat currency with deterministic precision rules
  and consistent rounding strategy documented per feature.
- Supabase environment variables and service keys MUST be managed via secure
  configuration and MUST NOT be hardcoded in source files.
- API and UI error handling MUST provide actionable messages without exposing
  implementation details or private data.
- Baseline performance target: common dashboard and transaction-list views
  SHOULD render meaningful content in under 2 seconds on standard mobile
  network conditions.

## Development Workflow and Quality Review

- Plans created from `.specify/templates/plan-template.md` MUST pass explicit
  Constitution Check gates before implementation begins.
- Specifications MUST include independent user scenarios, edge cases,
  functional requirements, and measurable success criteria.
- Task breakdowns MUST include security, data integrity, and responsive checks,
  not only feature happy paths.
- Every pull request MUST document impacted financial flows and list executed
  tests.

## Governance

This constitution is the highest-priority process document for this repository.
If any plan, spec, or task conflicts with it, the constitution takes precedence.

Amendment process:

1. Propose a change with rationale and impacted principles/sections.
2. Update dependent templates and guidance files in the same change.
3. Record a Sync Impact Report at the top of this document.
4. Obtain maintainer approval before merging.

Versioning policy:

- MAJOR: incompatible governance or principle removal/redefinition.
- MINOR: new principle/section or materially expanded requirements.
- PATCH: clarifications, wording improvements, typo/non-semantic edits.

Compliance review expectations:

- Every PR review MUST check compliance with all five core principles.
- Violations MUST be fixed before merge or explicitly waived with documented
  risk acceptance by maintainers.

**Version**: 1.0.0 | **Ratified**: 2026-03-10 | **Last Amended**: 2026-03-10
