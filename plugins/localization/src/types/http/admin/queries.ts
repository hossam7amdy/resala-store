import type { BaseFilterable, FindParams } from '@medusajs/framework/types'
import type {
  BaseLanguageListParams,
  BaseLanguageParams,
  TranslatableResourceIdentifier,
} from '../../common'

export type AdminLanguageParams = BaseLanguageParams

export interface AdminLanguageListParams extends BaseLanguageListParams {
  is_published?: boolean
}

export interface AdminTranslationListParams
  extends FindParams,
    Partial<TranslatableResourceIdentifier>,
    BaseFilterable<AdminTranslationListParams> {
  q?: string
  locale?: string
  is_outdated?: boolean
}

export interface AdminTranslationProviderFilters
  extends FindParams,
    BaseFilterable<AdminTranslationProviderFilters> {
  id?: string | string[]
  is_enabled?: boolean
  is_default?: boolean
}
