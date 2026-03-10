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
  amount numeric not null check (amount > 0),
  date date not null,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function update_timestamp()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger funds_updated_at
before update on funds
for each row execute function update_timestamp();

create trigger transactions_updated_at
before update on transactions
for each row execute function update_timestamp();
