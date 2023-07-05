export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      applicant_statuses: {
        Row: {
          code: string
          created_at: string | null
          id: string
          name: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          id?: string
          name?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      applicants: {
        Row: {
          applicant_status_id: string | null
          comment: string | null
          created_at: string | null
          id: string
          is_selected: boolean
          job_offer_id: string | null
          rate: number | null
          user_id: string | null
        }
        Insert: {
          applicant_status_id?: string | null
          comment?: string | null
          created_at?: string | null
          id?: string
          is_selected: boolean
          job_offer_id?: string | null
          rate?: number | null
          user_id?: string | null
        }
        Update: {
          applicant_status_id?: string | null
          comment?: string | null
          created_at?: string | null
          id?: string
          is_selected?: boolean
          job_offer_id?: string | null
          rate?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applicants_applicant_status_id_fkey"
            columns: ["applicant_status_id"]
            referencedRelation: "applicant_statuses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applicants_job_offer_id_fkey"
            columns: ["job_offer_id"]
            referencedRelation: "job_offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applicants_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      company_profiles: {
        Row: {
          address: string | null
          created_at: string | null
          email: string
          id: string
          ifu: string | null
          latitude: number | null
          logo: string | null
          longitude: number | null
          phone_number: string
          rccm: string | null
          social_reason: string | null
          user_id: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email: string
          id?: string
          ifu?: string | null
          latitude?: number | null
          logo?: string | null
          longitude?: number | null
          phone_number: string
          rccm?: string | null
          social_reason?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string
          id?: string
          ifu?: string | null
          latitude?: number | null
          logo?: string | null
          longitude?: number | null
          phone_number?: string
          rccm?: string | null
          social_reason?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_profiles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      job_offer_statuses: {
        Row: {
          code: string
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          code: string
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      job_offers: {
        Row: {
          company_id: string
          created_at: string | null
          created_by: string | null
          description: string
          id: string
          name: string
          status_id: string
        }
        Insert: {
          company_id: string
          created_at?: string | null
          created_by?: string | null
          description: string
          id?: string
          name: string
          status_id: string
        }
        Update: {
          company_id?: string
          created_at?: string | null
          created_by?: string | null
          description?: string
          id?: string
          name?: string
          status_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_offers_company_id_fkey"
            columns: ["company_id"]
            referencedRelation: "company_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_offers_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_offers_status_id_fkey"
            columns: ["status_id"]
            referencedRelation: "job_offer_statuses"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          birth_date: string | null
          first_name: string
          gender: string | null
          id: string
          last_name: string
        }
        Insert: {
          avatar_url?: string | null
          birth_date?: string | null
          first_name: string
          gender?: string | null
          id: string
          last_name: string
        }
        Update: {
          avatar_url?: string | null
          birth_date?: string | null
          first_name?: string
          gender?: string | null
          id?: string
          last_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      roles: {
        Row: {
          code: string
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          code: string
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      skill_categories: {
        Row: {
          code: string
          created_at: string | null
          id: string
          name: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          id?: string
          name?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      user_has_roles: {
        Row: {
          created_at: string | null
          id: number
          role_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          role_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          role_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_has_roles_role_id_fkey"
            columns: ["role_id"]
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_has_roles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "roles"
            referencedColumns: ["id"]
          }
        ]
      }
      user_has_skills: {
        Row: {
          created_at: string | null
          description: string
          id: string
          is_talented: boolean
          level: number
          skill_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          is_talented: boolean
          level: number
          skill_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          is_talented?: boolean
          level?: number
          skill_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_has_skills_skill_id_fkey"
            columns: ["skill_id"]
            referencedRelation: "skill_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_has_skills_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
