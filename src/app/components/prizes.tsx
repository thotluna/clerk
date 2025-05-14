import React from 'react'
import { Award, Trophy, Gift } from 'lucide-react'

export function Prizes() {
  return (
    <section
      id="prizes"
      className="py-20 bg-[#070707] relative overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-purple-600/5 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-blue-600/5 blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Premios Increíbles
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Nuestros concursos ofrecen algunas de las recompensas más valiosas
            de la industria. Compite por dinero en efectivo, oportunidades
            laborales y beneficios exclusivos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-[#111111] to-[#0D0D0D] rounded-xl p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300 group">
            <div className="h-16 w-16 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Trophy className="h-8 w-8 text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold text-white text-center mb-4">
              Premios en Efectivo
            </h3>
            <p className="text-gray-400 text-center mb-6">
              Gana importantes recompensas monetarias, con premios principales
              que superan los $10,000 en competencias mayores.
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Premio Principal</span>
                <span className="text-white font-bold">$10,000</span>
              </div>
              <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-300 w-full"></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400">Segundo Lugar</span>
                <span className="text-white font-bold">$5,000</span>
              </div>
              <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-300 w-3/4"></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400">Tercer Lugar</span>
                <span className="text-white font-bold">$2,500</span>
              </div>
              <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-300 w-1/2"></div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#111111] to-[#0D0D0D] rounded-xl p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300 group">
            <div className="h-16 w-16 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Award className="h-8 w-8 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold text-white text-center mb-4">
              Oportunidades Laborales
            </h3>
            <p className="text-gray-400 text-center mb-6">
              Los mejores participantes obtienen entrevistas directas con
              empresas tecnológicas líderes. Muchos concursantes han conseguido
              trabajos de ensueño.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 p-3 bg-purple-900/10 rounded-lg border border-purple-500/10">
                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                <span className="text-gray-300">Entrevistas rápidas</span>
              </li>
              <li className="flex items-center space-x-3 p-3 bg-purple-900/10 rounded-lg border border-purple-500/10">
                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                <span className="text-gray-300">Credenciales para tu CV</span>
              </li>
              <li className="flex items-center space-x-3 p-3 bg-purple-900/10 rounded-lg border border-purple-500/10">
                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                <span className="text-gray-300">Contacto con reclutadores</span>
              </li>
              <li className="flex items-center space-x-3 p-3 bg-purple-900/10 rounded-lg border border-purple-500/10">
                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                <span className="text-gray-300">Oportunidades de mentoría</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-[#111111] to-[#0D0D0D] rounded-xl p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300 group">
            <div className="h-16 w-16 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Gift className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-white text-center mb-4">
              Beneficios Exclusivos
            </h3>
            <p className="text-gray-400 text-center mb-6">
              Más allá del dinero y empleos, gana hardware, licencias de
              software, entradas a conferencias y recursos de aprendizaje.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                <span className="text-gray-300 text-sm">MacBook Pro</span>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                <span className="text-gray-300 text-sm">IDEs Premium</span>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                <span className="text-gray-300 text-sm">Créditos Cloud</span>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                <span className="text-gray-300 text-sm">Conferencias Tech</span>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3 text-center col-span-2">
                <span className="text-gray-300 text-sm">
                  Suscripciones Premium de Aprendizaje
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
