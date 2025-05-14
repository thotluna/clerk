import { auth } from '@clerk/nextjs/server'
import { ContestForm } from './contest.form'
import { toast } from 'sonner'

export async function ContestFormServer() {
  const { userId } = await auth()
  if (!userId) {
    toast.error('Error de Usuario, por favor debe authentificarce')
    return
  }
  return <ContestForm userId={userId} />
}
