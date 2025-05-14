import React from 'react'
import { Quote } from 'lucide-react'
import { testimonials } from '../data/testimonial-data'

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-[#0C0C0C]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Historias de Éxito
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Conoce a los desarrolladores que han transformado sus carreras a
            través de nuestros concursos. Personas reales, éxito real.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[#111111] rounded-xl p-6 border border-gray-800 relative group hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="absolute -top-5 left-6">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                  <Quote className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="pt-6">
                <p className="text-gray-300 mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="h-12 w-12 rounded-full object-cover mr-4 border-2 border-purple-500"
                  />
                  <div>
                    <h4 className="text-white font-medium">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
