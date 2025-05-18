import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

// Obtén la URL de Supabase y la clave anónima de las variables de entorno
const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE

// Verifica que las variables de entorno estén configuradas
if (!supabaseUrl) {
  throw new Error('Supabase URL is not defined in environment variables.')
}
if (!supabaseServiceRole) {
  throw new Error(
    'Supabase Service Role is not defined in environment variables.'
  )
}

const token = async () => {
  const authClerk = await auth()
  return authClerk.getToken({ template: 'supabase' })
}

// Crea y exporta el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseServiceRole, {
  global: {
    headers: {
      Authorization: `Bearer ${await token()}`,
    },
  },
})
