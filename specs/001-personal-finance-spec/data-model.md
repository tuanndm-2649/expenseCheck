# Data Model: Personal Finance Web App

## Entity: Fund

- id: uuid (PK)
- name: text (unique, required)
- balance: numeric (default 0, required)
- created_at: timestamptz (default now())
- updated_at: timestamptz (auto update)

## Entity: Transaction

- id: uuid (PK)
- type: text (enum: 'income', 'expense', required)
- amount: numeric (required)
- date: date (required)
- note: text (optional)
- created_at: timestamptz (default now())
- updated_at: timestamptz (auto update)

## Relationships

- Fund and Transaction are two independent data groups
- Transactions are not required to link to a fund
- Fund name must be unique, and funds with balance cannot be deleted

## Supabase Table SQL (migrate)

```sql
create table if not exists funds (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  balance numeric not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists transactions (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('income', 'expense')),
  amount numeric not null,
  date date not null,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

## Notes

- No user table in this phase; no authentication
- Can be extended later with log and category tables if needed
