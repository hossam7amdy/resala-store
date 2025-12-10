import type { PaginatedResponse } from '@medusajs/framework/types'
import {
  AdminLanguage,
  AdminTranslation,
  AdminTranslationProvider,
} from './entities'

export type AdminLanguageResponse = {
  language: AdminLanguage
}

export type AdminDeleteLanguageResponse = {
  code: string
  object: 'language'
  deleted: boolean
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

export type AdminTranslationProviderListResponse = PaginatedResponse<{
  translation_providers: AdminTranslationProvider[]
}>
