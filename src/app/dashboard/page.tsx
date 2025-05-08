import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import { auth } from '@clerk/nextjs/server' // Import auth para obtener userId en Server Component

interface Contest {
  id: string // uuid
  created_at: string
  name: string | null
  github_repo_c: string | null
  github_repo_r: string | null
  label_name: string | null
  start_date: string | null
  end_date: string | null
  active: boolean | null
  creator_id: string | null // ID del usuario de Clerk
}

async function getContests(): Promise<Contest[]> {
  const { userId } = await auth()

  console.log({ userId })

  // Protect the route by checking if the user is signed in
  if (!userId) {
    return []
  }

  const { data, error } = await supabase
    .from('contests') // Asumiendo que la tabla se llama 'contests'
    .select('*')
    .eq('creator_id', userId) // Filtrar por el ID del creador

  if (error) {
    console.error('Error fetching contests:', error)
    return []
  }
  return data || []
}

export default async function DashboardPage() {
  const contests = await getContests()

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mis Concursos</h1>
        <Link href="/dashboard/concursos/nuevo" legacyBehavior>
          <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Crear Nuevo Concurso
          </a>
        </Link>
      </div>

      {contests.length === 0 ? (
        <p>No has creado ningún concurso aún. ¡Empieza creando uno!</p>
      ) : (
        <div className="space-y-4">
          {contests.map((contest) => (
            <div
              key={contest.id}
              className="border p-4 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">
                {contest.name || 'Concurso sin nombre'}
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                Etiqueta GitHub:{' '}
                <span className="font-medium">
                  {contest.label_name || 'N/A'}
                </span>
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Estado:{' '}
                {contest.active ? (
                  <span className="text-green-600 font-semibold">Activo</span>
                ) : (
                  <span className="text-red-600 font-semibold">
                    Inactivo/Cerrado
                  </span>
                )}
              </p>
              {/* Aquí podrías añadir más detalles o enlaces, como ver proyectos del concurso, editar, etc. */}
              {/* Ejemplo de enlace para ver detalles/proyectos (a implementar) */}
              {/* <Link href={`/dashboard/concursos/${contest.id}`} legacyBehavior>
                <a className="text-blue-500 hover:underline">Ver Detalles</a>
              </Link> */}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
