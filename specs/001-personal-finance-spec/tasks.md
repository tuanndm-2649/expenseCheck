# Tasks: Personal Finance Web App (Independent Tracking and Funds)

**Input**: Design documents from `/specs/001-personal-finance-spec/`
**Prerequisites**: `plan.md` (required), `spec.md` (required), `research.md`, `data-model.md`, `contracts/api.md`

**Tests**: Include targeted unit tests for each user story because this feature changes data model and calculation behavior.

**Organization**: Tasks are grouped by user story so each story can be delivered and validated independently.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare environment and baseline for refactor from fund-linked transactions to independent transactions.

- [ ] T001 Update environment setup notes for Supabase keys in `specs/001-personal-finance-spec/quickstart.md`
- [ ] T002 Confirm Next.js test/build scripts and dependency versions in `package.json`
- [ ] T003 [P] Add migration execution instructions for new schema in `specs/001-personal-finance-spec/data-model.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Apply core schema and data-access changes that all user stories depend on.

**CRITICAL**: Complete this phase before user story implementation.

- [x] T004 Update database schema to remove `fund_id` from transactions in `src/db/migrations/001_init.sql`
- [x] T005 [P] Update transaction domain type without `fund_id` in `src/lib/types.ts`
- [x] T006 [P] Refactor transaction data helpers to independent model in `src/lib/db.ts`
- [x] T007 [P] Refactor transaction API validation and payload contract in `src/app/api/transactions/route.ts`
- [x] T008 Keep summary aggregation logic aligned with independent funds and transactions in `src/lib/db.ts`
- [x] T009 Keep API documentation aligned with backend contract in `specs/001-personal-finance-spec/contracts/api.md`

**Checkpoint**: Data model and API foundation are ready for story work.

---

## Phase 3: User Story 1 - Financial Dashboard Overview (Priority: P1) 🎯 MVP

**Goal**: Show accurate monthly overview of income, expense, and fund balance with responsive 2-column UI.

**Independent Test**: Open Home, switch month/year, verify overview values and chart update correctly while left summary remains visible/responsive.

### Tests for User Story 1

- [ ] T010 [P] [US1] Add/adjust dashboard month-switch test in `tests/unit/home-page.test.tsx`
- [ ] T011 [P] [US1] Add summary calculation helper test coverage in `tests/unit/format.test.ts`

### Implementation for User Story 1

- [ ] T012 [US1] Update dashboard summary rendering for independent transactions/funds in `src/app/page.tsx`
- [ ] T013 [US1] Update sidebar monthly summary fetch and display in `src/app/components/SidebarSummary.tsx`
- [ ] T014 [US1] Keep chart rendering consistent with monthly summary data in `src/app/components/ExpenseChart.tsx`
- [ ] T015 [US1] Ensure responsive left/right panel behavior at 360px+ in `src/app/layout.tsx`

**Checkpoint**: Home dashboard works independently and is testable.

---

## Phase 4: User Story 2 - Independent Income/Expense Tracking (Priority: P2)

**Goal**: Manage income/expense records by month without requiring any fund selection.

**Independent Test**: On Tracking page, create and delete transactions with amount/date/note only; totals update immediately; no fund selector is required.

### Tests for User Story 2

- [x] T016 [P] [US2] Update tracking validation test to remove fund dependency in `tests/unit/tracking-page.test.tsx`
- [ ] T017 [P] [US2] Add transaction API payload test case in `tests/unit/tracking-page.test.tsx`

### Implementation for User Story 2

- [x] T018 [US2] Remove fund selector and payload coupling from tracking form in `src/app/tracking/page.tsx`
- [x] T019 [US2] Keep create/delete tracking flows and totals recalculation in `src/app/tracking/page.tsx`
- [x] T020 [US2] Enforce required fields (type/amount/date) without fund requirement in `src/app/api/transactions/route.ts`
- [x] T021 [US2] Ensure transaction list API works only by month filter in `src/app/api/transactions/route.ts`

**Checkpoint**: Tracking flow is fully independent from Funds and testable.

---

## Phase 5: User Story 3 - Independent Fund Management (Priority: P3)

**Goal**: Manage funds as separate balance buckets (create, rename, top-up, guarded delete).

**Independent Test**: On Funds page, create unique fund, rename, top-up, and verify delete is blocked when balance > 0 regardless of transactions.

### Tests for User Story 3

- [ ] T022 [P] [US3] Extend fund guard behavior test for delete-with-balance in `tests/unit/funds-page.test.tsx`
- [ ] T023 [P] [US3] Add unique-name conflict handling test in `tests/unit/funds-page.test.tsx`

### Implementation for User Story 3

- [ ] T024 [US3] Keep funds page behavior and messaging independent of tracking in `src/app/funds/page.tsx`
- [ ] T025 [US3] Enforce unique name and top-up validation in `src/app/api/funds/route.ts`
- [ ] T026 [US3] Enforce guarded delete and safe update rules in `src/app/api/funds/[id]/route.ts`

**Checkpoint**: Funds management works independently and is testable.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final consistency checks, documentation, and quality hardening.

- [x] T027 [P] Validate all unit tests pass after model decoupling in `tests/unit/home-page.test.tsx`
- [x] T028 [P] Run and address build/type issues for updated flows in `tsconfig.json`
- [ ] T029 [P] Confirm no sensitive data is logged in runtime error paths in `src/app/api/summary/route.ts`
- [ ] T030 [P] Update implementation notes to match final behavior in `specs/001-personal-finance-spec/quickstart.md`
- [ ] T031 Complete responsive audit evidence for Home/Tracking/Funds in `specs/001-personal-finance-spec/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup (Phase 1): No dependencies.
- Foundational (Phase 2): Depends on setup and blocks all user stories.
- User Stories (Phases 3-5): Depend on Foundational completion.
- Polish (Phase 6): Depends on selected user stories completion.

### User Story Dependencies

- US1 (P1): Can start after Phase 2.
- US2 (P2): Can start after Phase 2 and should not depend on US3.
- US3 (P3): Can start after Phase 2 and should not depend on US2.

### Within Each User Story

- Tests first (or in same phase early) to lock expected behavior.
- API/data-layer updates before UI integration where applicable.
- Story-level validation before moving to next story.

## Parallel Opportunities

- Phase 2: `T005`, `T006`, `T007`, `T009` can run in parallel after `T004`.
- US1: `T010` and `T011` can run in parallel; `T012` and `T013` can run in parallel.
- US2: `T016` and `T017` can run in parallel.
- US3: `T022` and `T023` can run in parallel.
- Polish: `T027`-`T030` can run in parallel, then close `T031`.

## Parallel Example: User Story 2

```bash
# Parallel test work
Task: "T016 Update tracking validation test to remove fund dependency in tests/unit/tracking-page.test.tsx"
Task: "T017 Add transaction API payload test case in tests/unit/tracking-page.test.tsx"

# Parallel implementation work after API baseline is stable
Task: "T020 Enforce required fields without fund requirement in src/app/api/transactions/route.ts"
Task: "T018 Remove fund selector and payload coupling from tracking form in src/app/tracking/page.tsx"
```

## Implementation Strategy

### MVP First (US1)

1. Complete Phase 1 and Phase 2.
2. Deliver Phase 3 (US1) and validate dashboard accuracy.
3. Demo MVP.

### Incremental Delivery

1. Foundation ready (Phase 2).
2. Add US1 (dashboard).
3. Add US2 (independent tracking).
4. Add US3 (independent funds).
5. Final polish and responsive audit.

### Parallel Team Strategy

1. Developer A: US1 tasks.
2. Developer B: US2 tasks.
3. Developer C: US3 tasks.
4. Merge in Polish phase with full test/build validation.
