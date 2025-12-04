import type { BaseLanguage, TranslatableResourceType } from '../../common'

export interface AdminLanguage extends BaseLanguage {
  is_published: boolean
  translations: AdminTranslation[]
  deleted_at: string | Date | null
}

export interface AdminTranslation {
  id: string
  resource_id: string
  resource_type: TranslatableResourceType
  field: string
  value: string
  is_outdated: boolean
  language: AdminLanguage
  created_at: Date | string
  updated_at: Date | string
  deleted_at: Date | string | null
}
