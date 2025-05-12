-- Enable Row Level Security on the 'contests' table
ALTER TABLE public.contests ENABLE ROW LEVEL SECURITY;

-- OPTIONAL: Default deny (si quieres ser extra explícito)
-- Si no hay otras políticas, RLS activado por defecto deniega todo.
-- podrías añadir una política que explícitamente deniegue a anon y authenticated
-- si quieres estar seguro de que solo service_role puede pasar.

-- Por ejemplo:
-- CREATE POLICY "Deny all access unless service_role"
-- ON public.contests
-- FOR ALL
-- USING (false);
-- Esto es redundante si no hay políticas permisivas para anon/authenticated.