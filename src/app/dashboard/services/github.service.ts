import { Octokit } from '@octokit/rest'

// Basic interface for Octokit errors to extract messages
interface OctokitError extends Error {
  status?: number
  response?: {
    data: {
      message: string
    }
  }
}

export class GithubService {
  private token: string
  constructor(token: string) {
    this.token = token
  }

  async getUserName(): Promise<{ owner: string | null; error: string | null }> {
    try {
      const octokit = new Octokit({ auth: this.token })
      const {
        data: { login: owner },
      } = await octokit.users.getAuthenticated()
      return { owner, error: null }
    } catch (err) {
      const error = err as OctokitError // Type assertion
      console.error('GithubService Error - getUserName:', error.message)
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Error al obtener el nombre de usuario de GitHub'
      return { owner: null, error: errorMessage }
    }
  }

  async getAllNameRepository(): Promise<{
    repositories: string[] | null
    error: string | null
  }> {
    try {
      const octokit = new Octokit({ auth: this.token })
      const { data: userRepositories } =
        await octokit.repos.listForAuthenticatedUser({
          type: 'owner', // Consider making this configurable or using a sensible default
          sort: 'updated',
          direction: 'desc',
          per_page: 100, // Adjust as needed
        })
      const repositoryNames = userRepositories.map((repo) => repo.name)
      return { repositories: repositoryNames, error: null }
    } catch (err) {
      const error = err as OctokitError
      console.error(
        'GithubService Error - getAllNameRepository:',
        error.message
      )
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Error al obtener los repositorios de GitHub'
      return { repositories: null, error: errorMessage }
    }
  }
}
