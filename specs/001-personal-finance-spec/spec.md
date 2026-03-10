# Feature Specification: Personal Finance Web App (Supabase, Responsive, No Auth)

**Feature Branch**: `001-personal-finance-spec`  
**Created**: 2026-03-10  
**Status**: Draft  
**Input**: User description: "Personal finance app, mobile responsive, render data from Supabase, Home/Tracking/Funds, 2-column dashboard, no login required"

## User Scenarios & Testing _(mandatory)_

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.

  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - View Financial Dashboard (Priority: P1)

Users open the Home page to see total income, total expense, total fund balance, and a monthly chart in the left column, while the right column shows summarized monthly/yearly dashboard data. Users can switch month/year to view corresponding data.

**Why this priority**: This is the core value, giving users an immediate personal finance overview.

**Independent Test**: Open Home, select any month/year, and verify totals, balance, chart, and summary panel are correct.

**Acceptance Scenarios**:

1. **Given** existing Supabase data, **When** users open Home, **Then** income, expense, balance, and current month chart are correct.
2. **Given** users select another month/year, **When** the selection changes, **Then** the dashboard updates to the correct data.

---

### User Story 2 - Manage and Track Income/Expense (Priority: P2)

Users open Tracking to view monthly income/expense items, create new items, and delete existing items. Each transaction contains amount, date, and optional note, and does NOT require fund linkage.

**Why this priority**: Detailed transaction tracking is essential for personal finance control.

**Independent Test**: Create/delete transactions, verify list updates correctly, and confirm persistence in Supabase.

**Acceptance Scenarios**:

1. **Given** users are on Tracking, **When** they submit a valid transaction, **Then** it appears in the list and totals update.
2. **Given** an existing transaction, **When** users delete it, **Then** it disappears and totals update.
3. **Given** missing amount/date, **When** users save, **Then** an error is shown and no data is saved.

---

### User Story 3 - Manage Personal Funds (Priority: P3)

Users open Funds to view fund list and balances, create new funds, top up balances, and rename funds. Funds are managed independently from transactions. Funds with remaining balance cannot be deleted, and fund names must be unique.

**Why this priority**: Fund management helps users separate assets, savings, and investment buckets.

**Independent Test**: Create fund, top up, rename, verify updates, ensure deletion is blocked for non-zero balance, and prevent duplicate names.

**Acceptance Scenarios**:

1. **Given** users are on Funds, **When** they add a new unique fund name, **Then** the fund appears with zero balance.
2. **Given** a fund has remaining balance, **When** users attempt to delete, **Then** deletion is blocked with an error.
3. **Given** a duplicate fund name, **When** users save, **Then** a uniqueness error is shown.
4. **Given** a selected fund, **When** users top up, **Then** the balance updates correctly.
5. **Given** a selected fund, **When** users rename with a valid unique name, **Then** the new name is saved.

---

### Edge Cases

- If Supabase connection fails or returns errors, UI must show clear errors without crashing.
- If no data exists for selected month/year, Home/Tracking/Funds must show friendly empty states.
- Missing required fields for transactions or funds must produce clear validation errors.
- Transaction creation must never require selecting a fund.
- Fund rename with duplicate name must fail with clear feedback.
- Deleting transactions or funds must require user confirmation.

## Requirements _(mandatory)_

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: The app MUST render a 2-column UI: left column (income, expense, fund balance, monthly chart), right column (page-specific content).
- **FR-002**: Header MUST provide tabs: Home, Tracking, Funds. Switching tabs updates right-column content.
- **FR-003**: Transaction and fund data MUST be read/written directly to Supabase (PostgreSQL).
- **FR-004**: Home MUST support month/year selection and refresh dashboard data accordingly.
- **FR-005**: Tracking MUST allow create/delete transactions with fields: amount (required), date (required), note (optional), and no fund selection.
- **FR-006**: Funds MUST support create (unique name), top-up, rename, and guarded delete when balance > 0; funds stay independent from transactions.
- **FR-007**: No login/signup required in this phase; data is personal and stored per configured Supabase setup.
- **FR-008**: Create/update/delete interactions MUST update UI immediately and stay synchronized with Supabase.
- **FR-009**: Transactions with missing required fields or duplicate fund names MUST be rejected.
- **FR-010**: Funds with balance > 0 MUST NOT be deletable.

### Non-Functional Requirements _(mandatory)_

- **NFR-001**: UI MUST be responsive at 360px (mobile), tablet, and desktop without horizontal overflow.
- **NFR-002**: All Supabase CRUD operations MUST include error handling and clear failure feedback.
- **NFR-003**: Chart and financial figures MUST use consistent rounding/formatting across pages.
- **NFR-004**: Sensitive finance data (balances, transaction details) MUST NOT be logged to console or backend logs.

### Key Entities

- **Transaction**: Represents one income or expense entry. Attributes: id, type (income/expense), amount, date, note, created_at, updated_at.
- **Fund**: Represents one personal fund. Attributes: id, name (unique), balance, created_at, updated_at.

## Success Criteria _(mandatory)_

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: Users can load dashboard overview in <2s on 4G/mobile network.
- **SC-002**: Creating/deleting transactions or funds updates Supabase and UI in <1s.
- **SC-003**: 100% create/update/delete actions show clear success/failure feedback.
- **SC-004**: No duplicate fund name creation and no deletion of funds with remaining balance.
- **SC-005**: UI works correctly on mobile (360px), tablet, and desktop with no horizontal overflow or layout break.
