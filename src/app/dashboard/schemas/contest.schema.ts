import { z } from 'zod'

export const contestFormSchema = z.object({
  name: z.string().min(1, 'Nombre es requerido'),
  description: z.string().min(1, 'Descripcion es requerida'),
  nameRepository: z.string().min(1, 'Repository Nombre es requerido'),
  label: z.string().optional(),
  active: z.boolean(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
})

export type ContestFormData = z.infer<typeof contestFormSchema>
