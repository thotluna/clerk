'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import { GithubService } from '../services/github.service'
import { ContestForm } from './contest-form' // Changed import from ContestFormLoader to ContestForm

export async function ContestFormServer() {
  const { userId } = await auth()
  const client = await clerkClient()

  if (!userId) {
    return (
      <ContestForm
        owner={null}
        repositories={null}
        error="Usuario no autenticado. Por favor, inicie sesión."
      />
    )
  }

  const tokensResponse = await client.users.getUserOauthAccessToken(
    userId,
    'oauth_github'
  )

  if (
    !tokensResponse ||
    !tokensResponse.data ||
    tokensResponse.data.length === 0 ||
    !tokensResponse.data[0].token
  ) {
    return (
      <ContestForm
        owner={null}
        repositories={null}
        error="No se pudo obtener la autorización de GitHub. Verifique los permisos o reconecte su cuenta."
      />
    )
  }

  const githubToken = tokensResponse.data[0].token
  const gitHubService = new GithubService(githubToken)

  const { owner, error: ownerError } = await gitHubService.getUserName()

  if (ownerError || !owner) {
    return (
      <ContestForm
        owner={null}
        repositories={null}
        error={
          ownerError ||
          'Error inesperado: No se pudo determinar el propietario de GitHub.'
        }
      />
    )
  }

  // At this point, owner is guaranteed to be a string
  const { repositories, error: reposError } =
    await gitHubService.getAllNameRepository()

  if (reposError) {
    // Pass owner and empty repos, ContestForm will show toast for reposError
    return <ContestForm owner={owner} repositories={[]} error={reposError} />
  }

  // Success case: all data fetched
  return (
    <ContestForm owner={owner} repositories={repositories || []} error={null} />
  )
}
