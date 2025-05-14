import { ContestFormData } from '../schemas/contest.schema'

export enum ContestState {
  DRAFT = 'DRAFT',
  UPCOMING = 'UPCOMING',
  ACTIVE = 'ACTIVE',
  ENDED = 'ENDED',
  CANCELED = 'CANCELED',
}

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
