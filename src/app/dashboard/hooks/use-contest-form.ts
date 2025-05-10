import { useState } from 'react'
import { ContestFormData, contestFormSchema } from '../schemas/contest.schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { saveContest } from '../services/contest.service'

export function useContentForm(
  init: ContestFormData,
  owner: string,
  userId: string
) {
  const [openRepositories, setOpenRepositories] = useState(false)
  const form = useForm({
    resolver: zodResolver(contestFormSchema),
    defaultValues: init,
  })

  const onSubmit = async (data: ContestFormData) => {
    await saveContest({
      name: data.name,
      description: data.description,
      github_repo_name: data.nameRepository,
      github_repo_owner: owner,
      label_name: data.label,
      start_date: data.startDate?.toISOString(),
      end_date: data.endDate?.toISOString(),
      active: data.active,
      userId,
    })
  }

  return { openRepositories, setOpenRepositories, form, onSubmit }
}
