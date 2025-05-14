import { SupabaseClient, createClient } from '@supabase/supabase-js'
import { chromium } from 'playwright'
import { Octokit } from '@octokit/rest'
import {
  ContestProjectService,
  ProjectRecord,
} from '../../src/services/contest_project.service'

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
  id: string // For use as contest_id
  name_repository: string // To derive owner and repoName
  label: string | null // To filter issues (can be null)
}

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY
const GITHUB_TOKEN = undefined

let supabase: SupabaseClient | null = null

if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
} else {
  console.error(
    'Supabase URL or Anon Key is missing. Supabase client not initialized.'
  )
  process.exit(1)
}

async function getActiveContestDetails(): Promise<ContestDetails[]> {
  try {
    if (!supabase) {
      console.error('Supabase client is not initialized.')
      process.exit(1)
    }
    const { data: contests, error: contentsError } = await supabase
      .from('contests')
      .select('id, name_repository, label') // Specific fields, state removed as unused
      .eq('state', 'ACTIVE') // New state filter

    if (contentsError) {
      // Simplified error check
      console.error('Error fetching active contests:', contentsError.message)
      process.exit(1)
    }

    if (!contests) {
      // If no contests or data is null
      console.warn('No active contests found.')
      return [] // Return empty array instead of exiting
    }

    return contests as ContestDetails[] // Casting is now safer
  } catch (error: unknown) {
    console.error(
      'Exception in getActiveContestDetails:',
      (error as Error).message
    )
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
  octokit: Octokit, // Octokit instance as first argument
  contestId: string, // New contestId parameter
  owner: string, // Existing parameter
  repoName: string, // Existing parameter
  label: string | null // Renamed from labelName, type might be more specific if always string from DB
) {
  console.log(
    `Processing issues for contest ${contestId} (${owner}/${repoName})` +
      (label ? ` with label '${label}'` : ' (no label filter)')
  )
  const contestProjectService = new ContestProjectService(supabase!) // Added service instantiation
  if (!supabase) {
    console.error('Supabase client is not available. Exiting.')
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

    if (label && label.trim() !== '') {
      listOptions.labels = label.trim()
    }

    const { data: githubIssues } = await octokit.issues.listForRepo(listOptions)

    // Former dbProjectMap population logic removed, using service instead.
    const dbProjectMap =
      await contestProjectService.getProjectsByContestId(contestId)

    for (const ghIssue of githubIssues as GitHubIssue[]) {
      let needsFullProcessing = true
      let existingSupabaseRecord: ProjectRecord | null = null // Type adjusted to full ProjectRecord

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
          // github_repo_owner: owner, // Removed as per new schema
          // github_repo_name: repoName, // Removed as per new schema
          contest_id: contestId, // Added contest_id
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
          // Use ContestProjectService for update
          const { error: updateError } = await contestProjectService
            .updateProject(
              existingSupabaseRecord.id!, // id is known to exist here
              projectRecordToSave
            )
            .then((data) => ({ data, error: null }))
            .catch((err) => ({ data: null, error: err }))

          if (updateError) {
            console.error(
              `    Error updating Supabase for issue #${ghIssue.number}: ${updateError.message}`
            )
          }
        } else {
          // Use ContestProjectService for insert
          const { error: insertError } = await contestProjectService
            .addProject(projectRecordToSave)
            .then((data) => ({ data, error: null }))
            .catch((err) => ({ data: null, error: err }))

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
  const activeContests = await getActiveContestDetails()
  // getActiveContestDetails now returns [] if no contests are found, so no need to check for !activeContests for process.exit
  if (activeContests.length === 0) {
    console.log('No active contests to process.')
    return // Exit peacefully if no contests
  }

  const octokitInstance = new Octokit({ auth: GITHUB_TOKEN })

  for (const contest of activeContests) {
    if (!contest.name_repository) {
      console.warn(
        `Contest ID ${contest.id} is missing name_repository. Skipping.`
      )
      continue
    }
    const [owner, repoName] = contest.name_repository.split('/')
    if (!owner || !repoName) {
      console.warn(
        `Invalid name_repository format: "${contest.name_repository}" for contest ID ${contest.id}. Skipping.`
      )
      continue
    }

    // Assuming processIssues will be updated to match this new signature:
    // processIssues(octokit: Octokit, contestId: string, owner: string, repoName: string, label: string | null)
    await processIssues(
      octokitInstance,
      contest.id, // contest_id
      owner,
      repoName,
      contest.label // label from the contest
    )
  }
}

main()
