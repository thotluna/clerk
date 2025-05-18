-- Función para obtener el user_id del JWT
CREATE OR REPLACE FUNCTION public.get_user_id()
RETURNS text AS $$
BEGIN
  RETURN nullif(current_setting('request.jwt.claims', true)::json->>'sub', '');
EXCEPTION WHEN others THEN
  RETURN null;
END;
$$ LANGUAGE plpgsql STABLE;

-- 1. Política de lectura para todos los usuarios
CREATE POLICY "Enable read access for all users"
ON public.contests
FOR SELECT
USING (true);

-- 2. Política de inserción para usuarios autenticados
CREATE POLICY "Enable insert for authenticated users"
ON public.contests
FOR INSERT
TO authenticated
WITH CHECK (
  CASE 
    WHEN (SELECT current_setting('role') = 'anon') THEN false
    ELSE (user_id = current_setting('request.jwt.claims', true)::json->>'sub')
  END
);

-- 3. Política de actualización para dueños del concurso
CREATE POLICY "Enable update for contest owners"
ON public.contests
FOR UPDATE
USING (
  CASE 
    WHEN (SELECT current_setting('role') = 'anon') THEN false
    ELSE (user_id = current_setting('request.jwt.claims', true)::json->>'sub')
  END
)
WITH CHECK (
  CASE 
    WHEN (SELECT current_setting('role') = 'anon') THEN false
    ELSE (user_id = current_setting('request.jwt.claims', true)::json->>'sub')
  END
);

-- 4. Política de eliminación para dueños del concurso
CREATE POLICY "Enable delete for contest owners"
ON public.contests
FOR DELETE
USING (
  CASE 
    WHEN (SELECT current_setting('role') = 'anon') THEN false
    ELSE (user_id = current_setting('request.jwt.claims', true)::json->>'sub')
  END
);
