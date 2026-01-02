import type {
  FindParams,
  BaseFilterable,
  MetadataType,
  SelectParams,
} from '@medusajs/types'
import { TranslatableResource } from '../utils/translation-config'

export type TranslatableResourceType = `${TranslatableResource}` | (string & {})

export interface BaseLanguage {
  id: string
  code: string
  name: string
  is_rtl: boolean
  is_default: boolean
  metadata: MetadataType
  created_at: string
  updated_at: string
}

export type BaseLanguageParams = SelectParams

export interface BaseLanguageListParams
  extends FindParams,
    BaseFilterable<BaseLanguageListParams> {
  q?: string
  id?: string | string[]
  code?: string | string[]
  is_default?: boolean
}

export interface TranslatableResourceIdentifier {
  resource_id: string
  resource_type: TranslatableResourceType
}
