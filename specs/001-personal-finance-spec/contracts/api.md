# API Contract: Personal Finance Web App

## Fund APIs

### GET /api/funds

- Description: Get all funds
- Response: [{ id, name, balance, created_at, updated_at }]

### POST /api/funds

- Description: Create a new fund
- Body: { name }
- Response: { id, name, balance, created_at, updated_at }
- Error: 409 if fund name already exists

### PATCH /api/funds/:id

- Description: Rename fund or top up balance
- Body: { name?, add_amount? }
- Response: { id, name, balance, ... }
- Error: 409 for duplicate name, 400 if add_amount < 0

### DELETE /api/funds/:id

- Description: Delete a fund (only when balance = 0)
- Response: 204 No Content
- Error: 400 if balance > 0

## Transaction APIs

### GET /api/transactions?month=YYYY-MM

- Description: Get monthly income/expense transactions
- Response: [{ id, type, amount, date, note, ... }]

### POST /api/transactions

- Description: Create an income/expense transaction
- Body: { type, amount, date, note? }
- Response: { id, ... }
- Error: 400 if required fields are missing

### DELETE /api/transactions/:id

- Description: Delete an income/expense transaction
- Response: 204 No Content

## Summary APIs

### GET /api/summary?month=YYYY-MM

- Description: Get total income, total expense, total fund balance, and monthly chart data
- Response: { total_income, total_expense, funds: [{ name, balance }], chart: [...] }

## Notes

- All APIs interact directly with Supabase via server-side Next.js route handlers
- No authentication for now; no sensitive data should be returned beyond personal finance records
