import React from 'react'
import { Code, Github, Twitter, Linkedin, Mail } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="bg-[#080808] pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Code className="h-6 w-6 text-purple-500 mr-2" />
              <span className="text-white font-bold text-xl">DevConcursos</span>
            </div>
            <p className="text-gray-400 max-w-md mb-6">
              La plataforma líder para competencias de desarrolladores.
              Demuestra tus habilidades, gana premios y acelera tu carrera a
              través de emocionantes desafíos de programación.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-[#111111] flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-300"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-[#111111] flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-300"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-[#111111] flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@devconcursos.com"
                className="h-10 w-10 rounded-full bg-[#111111] flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-300"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium text-lg mb-4">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#contests"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Concursos
                </a>
              </li>
              <li>
                <a
                  href="#prizes"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Premios
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Cómo Funciona
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Testimonios
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium text-lg mb-4">Recursos</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Documentación
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Comunidad
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Soporte
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 DevConcursos. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">
              Términos de Servicio
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">
              Política de Privacidad
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">
              Política de Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
