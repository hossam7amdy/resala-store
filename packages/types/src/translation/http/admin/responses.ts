import type { PaginatedResponse } from '@medusajs/framework/types'

export type AdminUpsertTranslationsResponse<Entity> = {
  translations: Entity[]
}

export type AdminTranslationListResponse<Entity> = PaginatedResponse<{
  translations: Entity[]
}>
