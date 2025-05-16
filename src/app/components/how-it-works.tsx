import React from 'react'
import { steps } from '../data/step'

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-[#0F0F0F]">
      <div className="relative container mx-auto px-4 md:px-6">
        <div className="absolute inset-0 bg-[#0F0F0F] -z-10">
          <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-purple-700/20 to-indigo-700/20 blur-3xl"></div>
          <div className="absolute -right-20 bottom-0 h-[400px] w-[400px] rounded-full bg-gradient-to-l from-blue-700/20 to-cyan-700/20 blur-3xl"></div>
        </div>
        <hgroup className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Cómo Funciona
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Participar en nuestros concursos es simple. Sigue estos pasos para
            demostrar tus habilidades y ganar premios increíbles.
          </p>
        </hgroup>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-center"
            >
              <div
                className={`w-16 h-16 rounded-full ${step.bgColor} ${step.borderColor} border flex items-center justify-center mb-6`}
              >
                <step.icon className={`h-8 w-8 ${step.color}`} />
              </div>
              <div className="relative mb-6 h-1 w-24 md:hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-400 text-pretty text-left">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* <div className="hidden lg:block relative -mt-40 h-0">
          <div className="absolute top-0 left-0 right-0 h-0.5 mt-24 mx-32">
            <div className="h-full bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-green-500/40"></div>
          </div>
        </div> */}
      </div>
    </section>
  )
}
