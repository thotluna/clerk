'use client'
import React, { useState, useEffect } from 'react'
import { Code, Github } from 'lucide-react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#111111]/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Code className="h-6 w-6 text-purple-500 mr-2" />
            <span className="text-white font-bold text-xl">DevConcursos</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#contests"
              className="text-gray-300 hover:text-white transition duration-200"
            >
              Concursos
            </a>
            <a
              href="#prizes"
              className="text-gray-300 hover:text-white transition duration-200"
            >
              Premios
            </a>
            <a
              href="#how-it-works"
              className="text-gray-300 hover:text-white transition duration-200"
            >
              Cómo Funciona
            </a>
            <a
              href="#testimonials"
              className="text-gray-300 hover:text-white transition duration-200"
            >
              Testimonios
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#"
              className="text-gray-300 hover:text-white transition duration-200"
            >
              <Github className="h-5 w-5" />
            </a>

            <SignedOut>
              <SignInButton>Ingresa</SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden bg-[#0c0c0c] transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-screen py-4' : 'max-h-0'
        }`}
      >
        <div className="container mx-auto px-4">
          <nav className="flex flex-col space-y-4">
            <a
              href="#contests"
              className="text-gray-300 hover:text-white transition duration-200 py-2"
              onClick={() => setIsOpen(false)}
            >
              Concursos
            </a>
            <a
              href="#prizes"
              className="text-gray-300 hover:text-white transition duration-200 py-2"
              onClick={() => setIsOpen(false)}
            >
              Premios
            </a>
            <a
              href="#how-it-works"
              className="text-gray-300 hover:text-white transition duration-200 py-2"
              onClick={() => setIsOpen(false)}
            >
              Cómo Funciona
            </a>
            <a
              href="#testimonials"
              className="text-gray-300 hover:text-white transition duration-200 py-2"
              onClick={() => setIsOpen(false)}
            >
              Testimonios
            </a>
            <a
              href="#"
              className="bg-purple-600 hover:bg-purple-700 transition duration-200 text-white px-4 py-2 rounded-md text-center mt-2"
              onClick={() => setIsOpen(false)}
            >
              Registrarse
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
