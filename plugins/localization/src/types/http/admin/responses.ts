import type { PaginatedResponse } from '@medusajs/framework/types'
import { AdminLanguage } from './entities'

export type AdminLanguageResponse = {
  language: AdminLanguage
}

export type AdminLanguageListResponse = PaginatedResponse<{
  languages: AdminLanguage[]
}>
