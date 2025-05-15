import { ContestState } from '@/constants/constants'
import { ContentCardType } from '../components/contest-card'

export const contests: ContentCardType[] = [
  {
    id: '1',
    name: 'Desafío API GraphQL',
    description:
      'Construye una API GraphQL eficiente para una plataforma de redes sociales. Optimiza consultas e implementa autenticación.',
    owner: 'midudev',
    participants: 245,
    start: '4 de Mayo, 2025',
    ended: '15 de Mayo, 2025',
    image_url: 'https://picsum.photos/seed/picsum/350/200',
    state: ContestState.ACTIVE,
  },
  {
    id: '2',
    name: 'Hackathon de Rendimiento React',
    description:
      'Optimiza una aplicación React lenta. Reduce el tamaño del bundle, implementa code splitting y corrige cuellos de botella en el renderizado.',
    owner: 'el_pollo_volador',
    participants: 192,
    start: '1 semana',
    ended: '28 de Abril, 2025',
    image_url: 'https://picsum.photos/seed/picsum/350/200',
    state: ContestState.UPCOMING,
  },
  {
    id: '3',
    name: 'Desafío de Visualización de Datos',
    description:
      'Crea visualizaciones de datos interactivas usando D3.js o cualquier biblioteca moderna de visualización.',
    owner: 'thorth',
    participants: 168,
    start: '10 días',
    ended: '5 de Junio, 2025',
    image_url: 'https://picsum.photos/seed/picsum/350/200',
    state: ContestState.ENDED,
  },
  {
    id: '4',
    name: 'Optimización de Algoritmos',
    description:
      'Resuelve problemas algorítmicos complejos con las soluciones más eficientes posibles.',
    owner: 'towers',
    participants: 378,
    start: '3 días',
    ended: '10 de Mayo, 2025',
    image_url: 'https://picsum.photos/seed/picsum/350/200',
    state: ContestState.DRAFT,
  },
]
