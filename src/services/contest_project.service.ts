// src/services/contest_project.service.ts
import { SupabaseClient } from '@supabase/supabase-js'

export interface ProjectRecord {
  id?: number
  issue_number: number
  issue_title: string
  issue_url: string
  project_url: string | null
  screenshot_path: string | null
  project_body: string | null
  github_issue_created_at: string
  github_issue_updated_at: string
  last_processed_at: string
  contest_id: string
}

export type ProjectRecordInsert = Omit<ProjectRecord, 'id'>

const CONTEST_PROJECTS_TABLE = 'contest_projects'

// Type for updatable fields, excluding contest_id and issue_number
type UpdatableProjectFields = Omit<
  ProjectRecordInsert,
  'contest_id' | 'issue_number'
>

export class ContestProjectService {
  private supabase: SupabaseClient

  constructor(supabaseClient: SupabaseClient) {
    this.supabase = supabaseClient
  }

  async getProjectsByContestId(
    contestId: string
  ): Promise<Map<number, ProjectRecord>> {
    const { data, error } = await this.supabase
      .from(CONTEST_PROJECTS_TABLE)
      .select('*')
      .eq('contest_id', contestId)

    if (error) {
      console.error(
        'Error fetching contest projects by contestId:',
        error.message
      )
      throw error
    }

    const projectMap = new Map<number, ProjectRecord>()
    if (data) {
      for (const project of data as ProjectRecord[]) {
        projectMap.set(project.issue_number, project)
      }
    }
    return projectMap
  }

  async addProject(
    projectData: ProjectRecordInsert
  ): Promise<ProjectRecord | null> {
    const { data, error } = await this.supabase
      .from(CONTEST_PROJECTS_TABLE)
      .insert(projectData)
      .select()
      .single()

    if (error) {
      console.error('Error adding project:', error.message)
      throw error
    }
    return data as ProjectRecord | null
  }

  async updateProject(
    projectId: number,
    projectData: Partial<UpdatableProjectFields>
  ): Promise<ProjectRecord | null> {
    const { data, error } = await this.supabase
      .from(CONTEST_PROJECTS_TABLE)
      .update(projectData)
      .eq('id', projectId)
      .select()
      .single()

    if (error) {
      console.error('Error updating project:', error.message)
      throw error
    }
    return data as ProjectRecord | null
  }
}
