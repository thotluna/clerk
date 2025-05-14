import React from 'react'
import { ChevronRight } from 'lucide-react'
import { ContestCard } from './contest-card'
import { contests } from '../data/contests-data'

export const Contests = () => {
  return (
    <section id="contests" className="py-20 bg-[#0A0A0A]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Concursos Destacados
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Demuestra tus habilidades en nuestras competencias más populares.
            Desde frontend hasta backend, algoritmos y seguridad, hay un desafío
            para todos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contests.map((contest) => (
            <ContestCard key={contest.id} contest={contest} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-white font-medium hover:from-purple-600/30 hover:to-blue-600/30 transition-all duration-300 border border-purple-500/30"
          >
            Ver Todos los Concursos
            <ChevronRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  )
}
