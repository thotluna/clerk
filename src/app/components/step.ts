import { Award, Code, Search, Sparkles } from 'lucide-react'

export const steps = [
  {
    id: 1,
    title: 'Encuentra un Concurso',
    description:
      'Explora nuestra amplia gama de concursos filtrados por tus habilidades, intereses y nivel de experiencia. Tenemos competencias para principiantes y expertos.',
    icon: Search,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
  {
    id: 2,
    title: 'Programa tu Solución',
    description:
      'Trabaja en tu proyecto usando nuestro IDE integrado o tu entorno local. Prueba tu solución contra nuestros casos de ejemplo para asegurar que cumple todos los requisitos.',
    icon: Code,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
  },
  {
    id: 3,
    title: 'Envía y Gana',
    description:
      'Envía tu código final antes de la fecha límite. Nuestro sistema de evaluación calificará tu solución basándose en corrección, eficiencia y calidad del código.',
    icon: Award,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
  },
  {
    id: 4,
    title: 'Mejora tus Habilidades',
    description:
      'Recibe feedback detallado sobre tu envío, compara tu enfoque con otros y aprende de las mejores soluciones. Cada concurso te ayuda a ser mejor desarrollador.',
    icon: Sparkles,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
  },
]
