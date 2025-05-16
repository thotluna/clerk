import { Vote, Search, Heart } from 'lucide-react'

export default function Participation() {
  return (
    <section className="relative w-full py-16 text-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            ¡Tu Voz Cuenta! Participa y Elige a los Ganadores
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Todos pueden apreciar la innovación, la creatividad y el esfuerzo
            detrás de un gran proyecto. Por ello, te invitamos a ser parte
            activa de nuestro concurso de una manera muy especial:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {/* Explora los Proyectos */}
          <div className="bg-black border border-green-800 rounded-lg p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/10  border-green-800 border flex items-center justify-center mb-6">
              <Search className="size-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Explora los Proyectos</h3>
            <p className="text-gray-400 text-left text-pretty">
              Una vez que los participantes hayan subido sus creaciones, tendrás
              la oportunidad de navegar por una galería de proyectos
              innovadores. Descubre soluciones ingeniosas, diseños sorprendentes
              y funcionalidades que podrían cambiar el futuro.
            </p>
          </div>

          {/* Vota por tus Favoritos */}
          <div className="bg-black  border border-blue-800 rounded-lg p-6 flex flex-col items-center text-center ">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 border-blue-800 border flex items-center justify-center mb-6 ">
              <Vote className="size-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Vota por tus Favoritos</h3>
            <p className="text-gray-400 text-left text-pretty">
              ¿Te impresionó un proyecto en particular? ¿Crees que una idea
              merece ser reconocida? ¡Haz oír tu voz! Podrás votar por los
              proyectos que consideres más destacados, ayudando así a
              seleccionar a los ganadores. Tu perspectiva como usuario y
              entusiasta de la tecnología es invaluable.
            </p>
          </div>

          {/* Apoya el Talento */}
          <div className="bg-black  border border-red-800 rounded-lg p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/10 border-red-800 border flex items-center justify-center mb-6">
              <Heart className="size-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Apoya el Talento</h3>
            <p className="text-gray-400 text-left text-pretty">
              Al participar con tu voto, no solo influyes en el resultado final,
              sino que también motivas e impulsas a los desarrolladores a seguir
              creando y superándose.
            </p>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <button className="bg-purple-700 hover:bg-purple-600 text-white font-medium py-3 px-8 rounded-md transition-colors">
            Explorar Concursos
          </button>
        </div>
      </div>
      <div className="absolute inset-0">
        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-purple-700/20 to-indigo-700/20 blur-3xl"></div>
        <div className="absolute -right-20 bottom-0 h-[400px] w-[400px] rounded-full bg-gradient-to-l from-blue-700/20 to-cyan-700/20 blur-3xl"></div>
      </div>
    </section>
  )
}
