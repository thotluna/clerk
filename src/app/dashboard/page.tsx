import { auth } from '@clerk/nextjs/server'
import { ContestFormModal } from './components/contest-form-modal'
import { getAllContest } from './services/contest.service'

async function getContests() {
  const { userId } = await auth()

  if (!userId) {
    return []
  }

  const { data, error } = await getAllContest({ userId })

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
        <ContestFormModal />
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
