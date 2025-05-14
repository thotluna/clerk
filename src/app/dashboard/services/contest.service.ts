'use server'
import { supabase } from '@/lib/supabaseClient'
import { ContestState } from '../constants/constants'
import { v4 as uuidv4 } from 'uuid'

export interface Contest {
  id: string
  name: string
  description?: string | null
  owner: string
  name_repository?: string | null
  label?: string | null
  state: ContestState
  start?: string | null
  ended?: string | null
  imageFileName?: string | null
  created_at: string
  updated_at: string
  userId: string
}

export interface ContestSavePayload {
  id?: string
  name: string
  description?: string
  owner: string
  name_repository?: string
  label?: string
  state: ContestState
  start?: string | null
  ended?: string | null
  imageFileName?: string
  userId: string
}

// Function to upload image to Supabase Storage
export async function uploadImage(
  file: File
): Promise<{ data: { path: string } | null; error: Error | null }> {
  const fileName = `${uuidv4()}-${file.name}`
  const { error } = await supabase.storage
    .from('contest-images') // Ensure this bucket exists and has correct policies
    .upload(fileName, file)

  if (error) {
    console.error('Error uploading image:', error)
    return { data: null, error }
  }
  return { data: { path: fileName }, error: null } // Return only the fileName (path)
}

interface GetAllContestProps {
  userId: string
}

export async function getAllContestByOwner({
  userId,
}: GetAllContestProps): Promise<{
  data: Contest[] | null
  error: Error | null
}> {
  const { data, error } = await supabase
    .from('contests')
    .select('*')
    .eq('user_id', userId) // Assuming 'owner' column stores the userId
    .order('created_at', { ascending: false })

  return { data: data as Contest[] | null, error }
}

export async function saveContest(
  payload: ContestSavePayload
): Promise<{ data: Contest[] | null; error: Error | null }> {
  const { id, ...contestDataToSave } = payload

  const { data, error } = await supabase
    .from('contests')
    .update({
      name: contestDataToSave.name,
      description: contestDataToSave.description,
      owner: contestDataToSave.owner,
      name_repository: contestDataToSave.name_repository,
      label: contestDataToSave.label,
      state: contestDataToSave.state,
      start: contestDataToSave.start,
      ended: contestDataToSave.ended,
      image_url: contestDataToSave.imageFileName,
      user_id: contestDataToSave.userId,
    })
    .eq('id', id)
    .select()
  return { data: data as Contest[] | null, error }
}
