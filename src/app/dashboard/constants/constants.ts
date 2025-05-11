import { ContestFormData } from '../schemas/contest.schema'

export const constestFormDefaultValues: ContestFormData = {
  name: '',
  description: '',
  nameRepository: '',
  label: '',
  active: false,
  startDate: undefined,
  endDate: undefined,
}
