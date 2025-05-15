import { ContestState } from '@/constants/constants'
import { ContestFormData } from '../schemas/contest.schema'

export const constestFormDefaultValues: ContestFormData = {
  name: '',
  description: '',
  state: ContestState.DRAFT,
  nameRepository: '',
  label: '',
  imageFileName: '',
  startDate: undefined,
  endDate: undefined,
}
