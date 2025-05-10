'use server'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { ContestForm } from './contest-form'
import { Octokit } from '@octokit/rest'

export async function ContestFormServer() {
  const { userId } = await auth()
  const { users } = await clerkClient()
  let nameRepositories: string[] = []
  let owner: string = ''

  if (userId) {
    const tokens = await users.getUserOauthAccessToken(userId, 'oauth_github')

    if (!tokens || tokens.data.length === 0)
      return <ContestForm userId={userId} />

    const { token: gitHubToken } = tokens.data[0]
    const octokit = new Octokit({ auth: gitHubToken })

    const {
      data: { login },
    } = await octokit.users.getAuthenticated()

    owner = login

    const { data: repositories } = await octokit.repos.listForAuthenticatedUser(
      {
        type: 'all',
        sort: 'full_name',
      }
    )
    nameRepositories = repositories.map((repository) => repository.name)
  }
  return (
    <ContestForm
      userId={userId!}
      repositories={nameRepositories}
      owner={owner}
    />
  )
}
