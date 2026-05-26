-- Littlebee Crypto Future auth persistence schema.
-- Run this in the Supabase SQL Editor for your project.

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  fiat_balance DOUBLE PRECISION DEFAULT 2000.00,
  trading_balance DOUBLE PRECISION DEFAULT 2999.95,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.user_assets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  symbol TEXT NOT NULL,
  name TEXT NOT NULL,
  balance DOUBLE PRECISION DEFAULT 0.0,
  value_usd DOUBLE PRECISION DEFAULT 0.0,
  price_usd DOUBLE PRECISION DEFAULT 0.0,
  change_24h DOUBLE PRECISION DEFAULT 0.0,
  type TEXT NOT NULL,
  UNIQUE(user_id, symbol)
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_assets ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own assets" ON public.user_assets;
DROP POLICY IF EXISTS "Users can modify own assets" ON public.user_assets;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own assets" ON public.user_assets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can modify own assets" ON public.user_assets FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
