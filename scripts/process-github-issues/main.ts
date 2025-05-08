import { SupabaseClient, createClient } from '@supabase/supabase-js'
import { chromium } from 'playwright'
import { Octokit } from '@octokit/rest'

interface ProjectRecord {
  id?: number
  issue_number: number
  github_repo_owner: string
  github_repo_name: string
  issue_title: string
  issue_url: string
  project_url: string | null
  screenshot_path: string | null
  project_body: string | null
  github_issue_created_at: string
  github_issue_updated_at: string
  last_processed_at: string
}

interface GitHubIssue {
  number: number
  title: string
  body: string | null
  html_url: string
  created_at: string
  updated_at: string
  user: { login: string } | null
}

interface ContestDetails {
  id: string
  name: string
  github_repo_owner: string
  github_repo_name: string
  label_name: string
  start_date: string
  end_date: string
  active: boolean
}

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY
const GITHUB_TOKEN = process.env.GH_TOKEN_PROCESS_ISSUES

let supabase: SupabaseClient | null = null

if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
} else {
  console.error(
    'Supabase URL or Anon Key is missing. Supabase client not initialized.'
  )
  process.exit(1)
}

async function getActiveContestDetails() {
  try {
    if (!supabase) {
      console.error('no hay supabase')
      process.exit(1)
    }
    const { data: contests, error: contentsError } = await supabase
      .from('contests')
      .select()
      .eq('active', true)

    if (contentsError || !contests) {
      console.error('Error al extraer el contents')
      process.exit(1)
    }

    return contests as ContestDetails[]
  } catch (error: unknown) {
    console.error(
      'Error fetching active contest details:',
      (error as Error).message
    )
    // console.error('Stack trace:', (error as Error).stack); // Opcional para más detalle
    process.exit(1)
  }
}

function extractProjectUrl(issueBody: string | null): string | null {
  if (!issueBody) {
    return null
  }
  const urlRegex = /(https?:\/\/[^\s)]+)/gi
  const matches = issueBody.match(urlRegex)

  if (matches) {
    for (const match of matches) {
      if (match.includes('github.com')) continue
      const cleanedUrl = match.endsWith(')') ? match.slice(0, -1) : match
      return cleanedUrl
    }
  }
  return null
}

async function processIssues(
  owner: string,
  repoName: string,
  octokit: Octokit,
  labelName?: string | null // Añadido labelName como parámetro opcional
) {
  console.log(
    `Processing issues for ${owner}/${repoName}` +
      (labelName ? ` with label '${labelName}'` : ' (no label filter)')
  )
  if (!supabase) {
    console.error('Supabase client is not available. Exiting.')
    process.exit(1)
  }
  if (!GITHUB_TOKEN) {
    console.error('GitHub token (GH_TOKEN_PROCESS_ISSUES) is not set. Exiting.')
    process.exit(1)
  }

  try {
    const listOptions: {
      owner: string
      repo: string
      state: 'open' | 'all' | 'closed'
      per_page: number
      labels?: string
    } = {
      owner: owner,
      repo: repoName,
      state: 'open',
      per_page: 100,
    }

    if (labelName && labelName.trim() !== '') {
      listOptions.labels = labelName.trim()
    }

    const { data: githubIssues } = await octokit.issues.listForRepo(listOptions)

    const dbProjectMap = new Map<
      number,
      { id: number; issue_number: number; github_issue_updated_at: string }
    >()
    const { data: allDbProjects, error: allDbError } = await supabase
      .from('contest_projects')
      .select('id, issue_number, github_issue_updated_at')
      .eq('github_repo_owner', owner)
      .eq('github_repo_name', repoName)

    if (allDbError) {
      console.error(
        'Error fetching existing project data from Supabase:',
        allDbError.message
      )
    } else if (allDbProjects) {
      for (const p of allDbProjects) {
        dbProjectMap.set(p.issue_number, {
          id: p.id,
          issue_number: p.issue_number,
          github_issue_updated_at: p.github_issue_updated_at,
        })
      }
    }

    for (const ghIssue of githubIssues as GitHubIssue[]) {
      let needsFullProcessing = true
      let existingSupabaseRecord: {
        id: number
        issue_number: number
        github_issue_updated_at: string
      } | null = null

      const recordFromMap = dbProjectMap.get(ghIssue.number)
      if (recordFromMap) {
        existingSupabaseRecord = recordFromMap
      }

      if (existingSupabaseRecord) {
        const githubIssueUpdatedAt = new Date(ghIssue.updated_at)
        const supabaseIssueUpdatedAt = new Date(
          existingSupabaseRecord.github_issue_updated_at
        )

        if (githubIssueUpdatedAt <= supabaseIssueUpdatedAt) {
          needsFullProcessing = false
        } else {
          console.log(
            `  Issue #${ghIssue.number} has been modified on GitHub. Re-processing...`
          )
        }
      } else {
        console.log(`  Issue #${ghIssue.number} is new. Processing...`)
      }

      if (needsFullProcessing) {
        const extractedUrl = extractProjectUrl(ghIssue.body)
        let screenshotPath: string | null = null

        if (extractedUrl) {
          try {
            const browser = await chromium.launch()
            const page = await browser.newPage()
            await page.goto(extractedUrl, {
              waitUntil: 'networkidle',
              timeout: 60000,
            })

            const imageBuffer = await page.screenshot()
            await browser.close()

            const slug = ghIssue.title
              .toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^a-z0-9-]/g, '')
            const filePathInBucket = `issue-${ghIssue.number}-${slug.substring(0, 50)}.png`

            const { error: uploadError } = await supabase.storage
              .from('project-screenshots')
              .upload(filePathInBucket, imageBuffer, {
                contentType: 'image/png',
                upsert: true,
              })

            if (uploadError) {
              console.error(
                `      Error uploading image to Supabase Storage for ${extractedUrl}: ${uploadError.message}`
              )
            } else {
              const publicUrlResult = supabase.storage
                .from('project-screenshots')
                .getPublicUrl(filePathInBucket)

              if (publicUrlResult.data && publicUrlResult.data.publicUrl) {
                screenshotPath = publicUrlResult.data.publicUrl
                console.log(
                  `      Screenshot uploaded to Supabase Storage: ${screenshotPath}`
                )
              } else {
                console.error(
                  `      Error getting public URL from Supabase Storage for ${filePathInBucket}`
                )
              }
            }
          } catch (e) {
            console.error(
              `      Error during screenshot/upload for ${extractedUrl}: ${(e as Error).message}`
            )
          }
        } else {
          console.log(`    No project URL found for '${ghIssue.title}'.`)
        }

        const nowISO = new Date().toISOString()
        const projectRecordToSave: Omit<ProjectRecord, 'id'> = {
          issue_number: ghIssue.number,
          github_repo_owner: owner,
          github_repo_name: repoName,
          issue_title: ghIssue.title,
          issue_url: ghIssue.html_url,
          project_url: extractedUrl,
          screenshot_path: screenshotPath,
          project_body: ghIssue.body,
          github_issue_created_at: new Date(ghIssue.created_at).toISOString(),
          github_issue_updated_at: new Date(ghIssue.updated_at).toISOString(),
          last_processed_at: nowISO,
        }

        if (existingSupabaseRecord) {
          const { error: updateError } = await supabase
            .from('contest_projects')
            .update(projectRecordToSave)
            .eq('id', existingSupabaseRecord.id)
            .select()

          if (updateError) {
            console.error(
              `    Error updating Supabase for issue #${ghIssue.number}: ${updateError.message}`
            )
          }
        } else {
          const { error: insertError } = await supabase
            .from('contest_projects')
            .insert(projectRecordToSave)
            .select()

          if (insertError) {
            console.error(
              `    Error inserting into Supabase for issue #${ghIssue.number}: ${insertError.message}`
            )
          }
        }
      }
    }
  } catch (error: unknown) {
    console.error('Error in processIssues function:', (error as Error).message)
    if ((error as Error).stack) {
      console.error((error as Error).stack)
    }
    process.exit(1)
  }
}

async function main() {
  const contents = await getActiveContestDetails()
  if (!contents) {
    console.error('problemas con contents')
    process.exit(1)
  }
  const octokit = new Octokit({ auth: GITHUB_TOKEN })

  contents.forEach((content) => {
    processIssues(
      content.github_repo_owner,
      content.github_repo_name,
      octokit,
      content.label_name // Pasar label_name
    )
  })
}

main()
