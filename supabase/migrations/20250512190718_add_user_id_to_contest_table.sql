-- Añadir la columna user_id con valor predeterminado del JWT de Clerk
ALTER TABLE public.contests
ADD COLUMN user_id TEXT NOT NULL DEFAULT (current_setting('request.jwt.claims', true)::json->>'sub');

-- Crear un índice para mejorar el rendimiento de las búsquedas por user_id
CREATE INDEX IF NOT EXISTS idx_contests_user_id ON public.contests(user_id);

-- Habilitar RLS
ALTER TABLE public.contests ENABLE ROW LEVEL SECURITY;