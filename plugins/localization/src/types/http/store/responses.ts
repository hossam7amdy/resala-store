import type { PaginatedResponse } from '@medusajs/framework/types'
import { StoreLanguage } from './entities'

export type StoreLanguageListResponse = PaginatedResponse<{
  languages: StoreLanguage[]
}>
