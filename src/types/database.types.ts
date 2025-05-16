export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      contest_projects: {
        Row: {
          contest_id: string
          created_at: string
          github_issue_created_at: string | null
          github_issue_updated_at: string | null
          id: string
          issue_number: number
          issue_title: string
          issue_url: string | null
          last_processed_at: string
          project_body: string | null
          project_url: string | null
          screenshot_path: string | null
          updated_at: string
        }
        Insert: {
          contest_id: string
          created_at?: string
          github_issue_created_at?: string | null
          github_issue_updated_at?: string | null
          id?: string
          issue_number: number
          issue_title: string
          issue_url?: string | null
          last_processed_at?: string
          project_body?: string | null
          project_url?: string | null
          screenshot_path?: string | null
          updated_at?: string
        }
        Update: {
          contest_id?: string
          created_at?: string
          github_issue_created_at?: string | null
          github_issue_updated_at?: string | null
          id?: string
          issue_number?: number
          issue_title?: string
          issue_url?: string | null
          last_processed_at?: string
          project_body?: string | null
          project_url?: string | null
          screenshot_path?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'contest_projects_contest_id_fkey'
            columns: ['contest_id']
            isOneToOne: false
            referencedRelation: 'contests'
            referencedColumns: ['id']
          },
        ]
      }
      contests: {
        Row: {
          created_at: string
          description: string | null
          ended: string | null
          id: string
          image_url: string | null
          label: string | null
          name: string
          name_repository: string | null
          owner: string
          participants: number | null
          start: string | null
          state: Database['public']['Enums']['contest_state_enum']
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          ended?: string | null
          id?: string
          image_url?: string | null
          label?: string | null
          name: string
          name_repository?: string | null
          owner: string
          participants?: number | null
          start?: string | null
          state?: Database['public']['Enums']['contest_state_enum']
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          ended?: string | null
          id?: string
          image_url?: string | null
          label?: string | null
          name?: string
          name_repository?: string | null
          owner?: string
          participants?: number | null
          start?: string | null
          state?: Database['public']['Enums']['contest_state_enum']
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      contest_state_enum: 'DRAFT' | 'UPCOMING' | 'ACTIVE' | 'ENDED' | 'CANCELED'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      contest_state_enum: ['DRAFT', 'UPCOMING', 'ACTIVE', 'ENDED', 'CANCELED'],
    },
  },
} as const
