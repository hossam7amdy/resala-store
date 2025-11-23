import type { FindParams } from '@medusajs/framework/types'

export interface AdminStoreLocaleParams extends FindParams {
  code?: string
  is_default?: boolean
}
