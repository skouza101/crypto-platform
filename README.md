# Skorypto

A futuristic crypto trading simulator built with Next.js, Supabase Auth, persistent simulator balances, and live market data.

![Skorypto auth screen](public/readme-auth.png)

## Overview

Skorypto is a glassmorphic trading dashboard for experimenting with crypto portfolio flows. Users can create an account, sign in, view live market prices, manage a simulated portfolio, deposit funds, edit profile data, and keep their simulator state persisted in Supabase.

Live app: https://skoryto.vercel.app

## Features

- Supabase email/password authentication
- Persistent profile records with fiat and trading balances
- Persistent user asset holdings in Supabase
- Starter portfolio seeding for new users
- Live market prices for BTC, ETH, SOL, GBP/USD, and CAD/USD
- Server-side market data proxy through `/api/markets`
- Responsive glassmorphic dashboard UI
- Deposit simulator with synchronized balance updates
- Profile settings, notifications, API key mock tools, and market-hours widgets

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Supabase Auth and Postgres
- Vercel
- CoinGecko and Frankfurter market data

## Tester Account

Email: `skoryto.tester@gmail.com`

Password: `TestUser123!`

If sign-in fails with an email confirmation message, confirm the user in **Supabase Dashboard → Authentication → Users**.

## Local Setup

Install dependencies:

```bash
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://fnnwnvmqlednxsugzgoh.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Run the app:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Supabase Setup

Run the SQL in [supabase-schema.sql](supabase-schema.sql) inside your Supabase SQL Editor.

The schema creates:

- `profiles` for names, avatar URLs, and simulator balances
- `user_assets` for each user's crypto and fiat holdings
- Row Level Security policies so users can only access their own simulator data

## Vercel Deployment

Add these environment variables in **Vercel → Project → Settings → Environment Variables**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://fnnwnvmqlednxsugzgoh.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Redeploy after changing any `NEXT_PUBLIC_` variable because those values are baked into the client bundle at build time.

Deploy from the CLI:

```bash
npx vercel --prod --yes
```

## Useful Commands

```bash
npm run dev
npm run build
npm run start
```

## Notes

- Never expose Supabase `service_role` keys in this app.
- Use the publishable key for browser clients.
- The market widget calls `/api/markets` so production avoids browser CORS issues from third-party data APIs.
