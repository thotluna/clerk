import { Award, Code, Search, Sparkles } from 'lucide-react'

export const steps = [
  {
    id: 1,
    title: 'Encuentra un Desafío Inspirador',

    description:
      'Explora la variedad de desafíos propuestos por los creadores. Busca aquellos que enciendan tu creatividad y se ajusten a tus habilidades e intereses. ¡Siempre hay algo emocionante esperando!',
    icon: Search,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
  {
    id: 2,
    title: 'Desarrolla tu Proyecto Único',
    description:
      'Trabaja en tu idea utilizando las herramientas y técnicas que prefieras. Interpreta el desafío a tu manera y crea algo original que destaque. ¡Este es tu momento de brillar!',
    icon: Code,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
  },
  {
    id: 3,
    title: 'Presenta tu Creación',
    description:
      ' Sube tu proyecto terminado antes de la fecha límite. Asegúrate de cumplir con todos los requisitos para que tu trabajo sea considerado. ¡Muestra al mundo de lo que eres capaz!',
    icon: Sparkles,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
  },
  {
    id: 4,
    title: 'Gana Reconocimiento y Premios',
    description:
      'Recibirás el reconocimiento del creador y de la comunidad. ¡Y podrías ganar premios increíbles por tu esfuerzo y talento! Además, podrás ver y aprender de las creaciones de otros participantes.',
    icon: Award,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
  },
]
