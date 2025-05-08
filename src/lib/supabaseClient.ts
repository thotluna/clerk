import { createClient } from '@supabase/supabase-js'

// Obtén la URL de Supabase y la clave anónima de las variables de entorno
const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON

// Verifica que las variables de entorno estén configuradas
if (!supabaseUrl) {
  throw new Error('Supabase URL is not defined in environment variables.')
}
if (!supabaseAnonKey) {
  throw new Error('Supabase Anon Key is not defined in environment variables.')
}

// Crea y exporta el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
