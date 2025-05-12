ALTER TABLE public.contests
DROP CONSTRAINT IF EXISTS contests_owner_fkey;

ALTER TABLE public.contests
ALTER COLUMN owner TYPE TEXT;