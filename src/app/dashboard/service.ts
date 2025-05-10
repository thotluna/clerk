'use server'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON

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

export async function saveContest(contentDetail: ContestDetails) {
  const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!)

  const { data, error } = await supabase.from('contests').insert([
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

  console.log({ data, error })

  return data
}
