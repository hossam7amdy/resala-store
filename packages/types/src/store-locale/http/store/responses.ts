import type { PaginatedResponse } from '@medusajs/framework/types'
import type { StoreLocale } from './entities'

export type StoreLocaleResponse = {
  locale: StoreLocale
}

export type StoreLocaleListResponse = PaginatedResponse<{
  locales: StoreLocale[]
}>
