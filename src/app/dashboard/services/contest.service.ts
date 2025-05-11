'use server'
import { supabase } from '@/lib/supabaseClient'

export interface ContestDetails {
  id?: string
  name: string
  description?: string
  github_repo_owner: string
  github_repo_name: string
  label_name?: string
  start_date?: string
  end_date?: string
  active: boolean
  userId: string
}

interface Props {
  userId: string
}

export async function getAllContest({ userId }: Props) {
  const { data, error } = await supabase
    .from('contests')
    .select('*')
    .eq('creator_id', userId)

  return { data, error }
}

export async function saveContest(contentDetail: ContestDetails) {
  const { data } = await supabase.from('contests').insert([
    {
      name: contentDetail.name,
      description: contentDetail.description,
      github_repo_owner: contentDetail.github_repo_owner,
      github_repo_name: contentDetail.github_repo_name,
      label_name: contentDetail.label_name,
      start_date: contentDetail.start_date,
      end_date: contentDetail.end_date,
      active: contentDetail.active,
      creator_id: contentDetail.userId,
    },
  ])

  return data
}
