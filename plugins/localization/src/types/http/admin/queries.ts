import type { BaseFilterable, FindParams } from '@medusajs/framework/types'
import type {
  BaseLanguageListParams,
  TranslatableResourceIdentifier,
} from '../../common'

export interface AdminLanguageListParams extends BaseLanguageListParams {
  is_published?: boolean
}
export interface AdminTranslationListParams
  extends
    FindParams,
    Partial<TranslatableResourceIdentifier>,
    BaseFilterable<AdminTranslationListParams> {
  q?: string
  locale?: string
  is_outdated?: boolean
}
