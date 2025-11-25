import type { FindParams } from '@medusajs/framework/types'

export interface AdminTranslationListParams extends FindParams {
  locale_id?: string
}
