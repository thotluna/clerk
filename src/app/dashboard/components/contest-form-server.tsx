'use server'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { ContestForm } from './contest-form'
import { toast } from 'sonner'
import { GithubService } from '../services/github.service'

export async function ContestFormServer() {
  const { userId } = await auth()
  const { users } = await clerkClient()
  let nameRepositories: string[] = []
  let owner: string = ''

  if (!userId) {
    toast.error('Se requiere usuario authenticado')
    return
  }

  const tokens = await users.getUserOauthAccessToken(userId, 'oauth_github')

  if (!tokens || tokens.data.length === 0) {
    toast.error('Problemas al obtener la autorizacion de Github')
  }

  const gitHubService = new GithubService(tokens.data[0].token)

  owner = await gitHubService.getUserName()

  nameRepositories = await gitHubService.getAllNameRepository()
  return (
    <ContestForm
      userId={userId!}
      repositories={nameRepositories}
      owner={owner}
    />
  )
}
