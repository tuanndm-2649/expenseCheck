# Quickstart: Personal Finance Web App (Next.js + Supabase)

## 1. Clone & Setup

```bash
git clone <repo-url>
cd expenseCheck
pnpm install # or yarn/npm install
```

## 2. Supabase Setup

- Create an account at https://supabase.com/
- Create a new project and copy `SUPABASE_URL` and `SUPABASE_ANON_KEY`
- Open SQL Editor and run the migration in `specs/001-personal-finance-spec/data-model.md`
- Configure `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## 3. Run locally

```bash
pnpm dev # or yarn dev/npm run dev
```

- Open http://localhost:3000

## 4. Main structure

- src/app/: Next.js app router, pages Home/Tracking/Funds
- src/lib/: Supabase client, utils
- src/db/: migration SQL
- src/styles/: Tailwind config

## 5. Build & Deploy

```bash
pnpm build && pnpm start
```

- You can deploy to Vercel, Netlify, or any Next.js hosting provider

## 6. Notes

- No login is required in this phase; data is personal and not shared publicly
- You can extend later with auth, extra tables, and additional features
