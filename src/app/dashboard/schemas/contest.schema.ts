import { z } from 'zod'
import { ContestState } from '../constants/constants'

export const contestFormSchema = z.object({
  name: z.string().min(1, 'Nombre es requerido'),
  description: z.string().min(1, 'Descripcion es requerida'),
  nameRepository: z.string().min(1, 'Repository Nombre es requerido'), // Removed
  label: z.string().optional(),
  imageFileName: z.string().optional(),
  state: z.nativeEnum(ContestState),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
})

export type ContestFormData = z.infer<typeof contestFormSchema>
