# ExpenseCheck

Personal finance web app built with Next.js + Supabase.

## Features

- Dashboard overview (income, expense, monthly difference)
- Income/expense tracking (independent from funds)
- Fund management (create, rename, top up, guarded delete)
- Mobile-responsive layout
- No authentication in current phase

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (PostgreSQL)
- Jest + Testing Library

## Project Structure

```text
src/
  app/
    api/
    components/
    funds/
    tracking/
  db/
    migrations/
  lib/
  styles/
tests/
  unit/
```

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Setup database schema

Run SQL migration in Supabase SQL Editor:

- `src/db/migrations/001_init.sql`

### 4. Run development server

```bash
pnpm dev
```

Open `http://localhost:3000`.

## Scripts

```bash
pnpm dev      # start development server
pnpm build    # build for production
pnpm start    # run production server
pnpm lint     # run lint checks
pnpm test     # run unit tests
```

## API Overview

- `GET /api/summary?month=YYYY-MM`
- `GET /api/transactions?month=YYYY-MM`
- `POST /api/transactions`
- `DELETE /api/transactions/:id`
- `GET /api/funds`
- `POST /api/funds`
- `PATCH /api/funds/:id`
- `DELETE /api/funds/:id`

Detailed contract: `specs/001-personal-finance-spec/contracts/api.md`

## Notes

- Transactions are independent from funds.
- Fund deletion is blocked when balance is greater than `0`.
- This project currently uses no user auth or row-level ownership model.
