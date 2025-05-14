-- 1. Create the ENUM type for contest states
CREATE TYPE public.contest_state_enum AS ENUM (
  'DRAFT',
  'UPCOMING',
  'ACTIVE',
  'ENDED',
  'CANCELED'
);

-- 2. Create the 'contests' table
CREATE TABLE public.contests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  owner UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name_repository TEXT,
  label TEXT,
  state public.contest_state_enum DEFAULT 'DRAFT'::public.contest_state_enum NOT NULL,
  start TIMESTAMPTZ,
  ended TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Optional: Create a trigger to update 'updatedAt' timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contests_updated_at
  BEFORE UPDATE ON public.contests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();