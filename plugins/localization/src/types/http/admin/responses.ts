import type { PaginatedResponse } from '@medusajs/framework/types'
import { AdminLanguage, AdminTranslation } from './entities'

export type AdminLanguageResponse = {
  language: AdminLanguage
}

export type AdminLanguageListResponse = PaginatedResponse<{
  languages: AdminLanguage[]
}>

export type AdminRegisterTranslationsResponse = {
  translations: AdminTranslation[]
}

export type AdminRemoveTranslationsResponse = {
  deleted_ids: string[]
  deleted_count: number
}

export type AdminTranslationListResponse = PaginatedResponse<{
  translations: AdminTranslation[]
}>
