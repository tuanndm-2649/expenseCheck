# Research: Independent Tracking and Funds

## Decision 1: Transactions do not require fund linkage

- Decision: Remove `fund_id` from `transactions` model and API payload.
- Rationale: Updated business rule states income/expense tracking is independent from fund management.
- Alternatives considered:
  - Keep optional `fund_id`: rejected because it adds ambiguity and unnecessary coupling in UI/API.
  - Keep required `fund_id`: rejected because it conflicts directly with updated spec.

## Decision 2: Funds remain independently managed balance buckets

- Decision: Keep `funds` as standalone table with `name` unique and `balance` numeric.
- Rationale: Supports dedicated fund workflows (create, rename, top-up, guarded delete) without transaction dependencies.
- Alternatives considered:
  - Derive fund balance from transactions only: rejected because spec requires direct top-up and independent management.

## Decision 3: API contracts split by domain

- Decision: Keep separate route groups for `/api/transactions` and `/api/funds` with independent validation rules.
- Rationale: Clear boundaries reduce accidental cross-domain coupling and simplify testing.
- Alternatives considered:
  - Single mixed finance endpoint: rejected due to complexity and weaker separation of concerns.

## Decision 4: Preserve mobile-first 2-column behavior

- Decision: Keep left summary column + right tab content, with responsive collapse for smaller viewports.
- Rationale: Aligns with core product UX and constitution requirement for mobile usability at 360px.
- Alternatives considered:
  - Fully separate pages without shared sidebar: rejected because it reduces persistent financial context.
