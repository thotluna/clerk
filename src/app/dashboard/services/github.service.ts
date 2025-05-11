import { Octokit } from '@octokit/rest'

export class GithubService {
  private token: string
  constructor(token: string) {
    this.token = token
  }

  async getUserName() {
    const octokit = new Octokit({ auth: this.token })
    const {
      data: { login },
    } = await octokit.users.getAuthenticated()

    return login
  }

  async getAllNameRepository() {
    const octokit = new Octokit({ auth: this.token })
    const { data: repositories } = await octokit.repos.listForAuthenticatedUser(
      {
        type: 'all',
        sort: 'full_name',
      }
    )

    return repositories.map((repository) => repository.name)
  }
}
