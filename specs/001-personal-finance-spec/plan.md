# Implementation Plan: Personal Finance Web App (Independent Tracking and Funds)

**Branch**: `001-personal-finance-spec` | **Date**: 2026-03-10 | **Spec**: `specs/001-personal-finance-spec/spec.md`
**Input**: Feature specification from `/specs/001-personal-finance-spec/spec.md`

## Summary

Build a personal finance web app using Next.js + TailwindCSS + Supabase,
with a mobile-responsive 2-column layout. Core business flows are independent:
`Tracking` manages monthly income/expense records and `Funds` manages separate
fund balances (top-up, rename, guarded delete), without linking transactions to funds.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 20+, Next.js 14 App Router  
**Primary Dependencies**: `next`, `react`, `@supabase/supabase-js`, `tailwindcss`, `chart.js`, `react-chartjs-2`  
**Storage**: Supabase PostgreSQL (2 main tables: `transactions`, `funds`)  
**Testing**: Jest + Testing Library (unit), build validation via `next build`  
**Target Platform**: Web browser (mobile-first + tablet + desktop)  
**Project Type**: Single Next.js web application (FE + API routes)  
**Performance Goals**: Dashboard loads under 2s; create/update/delete interactions respond under 1s in normal network conditions  
**Constraints**: No auth in current phase; no sensitive data logging; tracking must stay independent of funds; support 360px viewport  
**Scale/Scope**: 1 personal user, 3 main screens, moderate data volume (<10k records)

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- [x] Scope maps directly to at least one personal-finance workflow (income, expense, fund, or summary).
- [x] Data design uses Supabase with ownership rules, validation, and migration strategy.
- [x] Mobile responsiveness is specified, including 360px baseline and key breakpoints.
- [x] Privacy and access control constraints are documented (auth + RLS + no sensitive logging).
- [x] Test plan covers financial calculations, Supabase integration, and responsive UI acceptance checks.

Post-design re-check: Pass. No constitution violations detected.

## Project Structure

### Documentation (this feature)

```text
specs/001-personal-finance-spec/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── api.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── api/
│   │   ├── funds/
│   │   ├── transactions/
│   │   └── summary/
│   ├── components/
│   ├── tracking/
│   ├── funds/
│   ├── layout.tsx
│   └── page.tsx
├── db/
│   └── migrations/
├── lib/
└── styles/

tests/
└── unit/
```

**Structure Decision**: Single-project Next.js App Router to reduce implementation complexity and keep API/FE in one codebase.

## Phase 0: Research

- Standardized a decoupled data model where `transactions` and `funds` are independent.
- Confirmed API contract: all tracking endpoints do not require `fund_id`.
- Chose consistent error handling across API routes and UI messages.
- Confirmed responsive baseline at 360px with collapsible 2-column layout.

## Phase 1: Design and Contracts

- Data design: - `transactions`: `id`, `type`, `amount`, `date`, `note`, timestamps. - `funds`: `id`, `name(unique)`, `balance`, timestamps.
- Contract definition: - `POST /api/transactions` accepts `{ type, amount, date, note? }`. - `funds` has independent CRUD with guard rule for `balance > 0` on delete.
- UI design: - Header tabs `Home`, `Tracking`, `Funds`. - Left sidebar: total income/expense/funds + monthly chart. - Right panel: tab-specific content.

## Phase 2: Implementation Strategy

1. Update SQL schema and DB helpers to remove transaction `fund_id` dependency.
2. Update transaction/funds API routes to the new contract.
3. Update Tracking form to remove fund selector.
4. Keep Funds flow independent: create, rename, top up, block delete when balance remains.
5. Update unit tests for the independent tracking and funds flows.
6. Run validation: `npm test`, `npm run build`.

## Complexity Tracking

No architectural exceptions require justification in this change round.
