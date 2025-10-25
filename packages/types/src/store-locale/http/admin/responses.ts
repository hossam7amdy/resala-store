import type { PaginatedResponse } from '@medusajs/framework/types'

import { AdminStoreLocale } from './entities'

export type AdminStoreLocaleResponse = {
  storeLocale: AdminStoreLocale
}

export type AdminStoreLocaleListResponse = PaginatedResponse<{
  storeLocales: AdminStoreLocale[]
}>
