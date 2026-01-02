import type { BaseLanguage, TranslatableResourceType } from '../../common'

export interface AdminLanguage extends BaseLanguage {
  is_published: boolean
  deleted_at: string | null
  translations: AdminTranslation[]
}

export interface AdminTranslation {
  id: string
  resource_id: string
  resource_type: TranslatableResourceType
  field: string
  value: string
  is_outdated: boolean
  language: AdminLanguage
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface AdminTranslationProvider {
  id: string
  is_enabled: boolean
  is_default: boolean
  created_at: string
  updated_at: string
  deleted_at: string | null
}
