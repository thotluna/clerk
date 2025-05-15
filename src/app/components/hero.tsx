import React from 'react'
import { ChevronRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative pt-20 pb-24">
      <div className="absolute inset-0 bg-[#0F0F0F]">
        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-purple-700/20 to-indigo-700/20 blur-3xl"></div>
        <div className="absolute -right-50 bottom-0 h-[400px] w-[400px] rounded-full bg-gradient-to-l from-blue-700/20 to-cyan-700/20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="md:pr-8 order-2 md:order-1">
            <div className="inline-block px-4 py-1.5 mb-5 text-xs md:text-sm font-medium rounded-full bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/20 text-purple-400">
              Lanzamiento 2025 - Únete a la lista de espera
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              <span className="block">Tu Audiencia, Tus Desafíos:</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                Organiza Concursos de Programación Memorables.
              </span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-lg">
              Diseñada para creadores de contenido como tú. Ofrece a tus
              seguidores desafíos únicos, gestiona participantes fácilmente y
              haz crecer tu comunidad. Nosotros ponemos la plataforma, tú la
              inspiración.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#pricingn"
                className="flex items-center justify-center px-6 py-3 rounded-md bg-purple-600 hover:bg-purple-700 transition text-white font-medium"
              >
                Planes para Creadores
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex items-center justify-center px-6 py-3 rounded-md bg-[#1D1D1D] hover:bg-[#2A2A2A] transition text-white border border-gray-700"
              >
                Ver Concursos
              </a>
            </div>
          </div>
          <div className="md:pl-8 order-1 md:order-2">
            <div className="bg-[#0D0D0D] border border-gray-800 rounded-lg p-5 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <div className="ml-2 text-sm text-gray-400">terminal</div>
              </div>
              <div className="font-mono text-sm text-gray-300">
                <p className="mb-2">
                  <span className="text-green-500">$</span>
                  {'// node contests.js'}
                </p>
                <p className="mb-2 text-gray-500">Calculating score...</p>
                <p className="mb-2">
                  <span className="text-blue-400">const</span>{' '}
                  <span className="text-yellow-300">punctuation</span> ={' '}
                  <span className="text-purple-400">calculatePerformance</span>
                  (code);
                </p>
                <p className="mb-2">
                  <span className="text-blue-400">function</span>{' '}
                  <span className="text-purple-400">calculatePerformance</span>
                  (code) {'{'}
                </p>
                <p className="mb-2 pl-4">
                  <span className="text-blue-400">return</span> code.
                  <span className="text-purple-400">quality</span> * code.
                  <span className="text-purple-400">efficiency</span>;
                </p>
                <p className="mb-2">{'}'}</p>
                <p className="mb-2 text-green-400">
                  {'// ¡Felicitaciones! Tu solución obtuvo 95/100'}
                </p>
                <p className="mb-2 text-green-400">
                  {'// ¡Has clasificado para la ronda final!'}
                </p>
                <div className="h-5 w-1 bg-white inline-block animate-blink ml-1"></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">120+</p>
              <p className="text-gray-400 mt-1">Concursos Realizados</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">$250K</p>
              <p className="text-gray-400 mt-1">En Premios</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">15K+</p>
              <p className="text-gray-400 mt-1">Participantes</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">98%</p>
              <p className="text-gray-400 mt-1">Satisfacción</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
