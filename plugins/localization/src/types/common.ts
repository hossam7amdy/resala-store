import type { FindParams, BaseFilterable, MetadataType } from '@medusajs/types'

export interface BaseLanguage {
  id: string
  code: string
  name: string
  is_default: boolean
  metadata: MetadataType
  created_at: Date | string
  updated_at: Date | string
}

export interface BaseLanguageListParams
  extends FindParams, BaseFilterable<BaseLanguageListParams> {
  q?: string
  is_default?: boolean
}
