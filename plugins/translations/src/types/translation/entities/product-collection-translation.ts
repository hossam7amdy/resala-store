import type { MetadataType } from '@medusajs/framework/types'
import type { LocaleDTO } from '../../store-locale'

export interface ProductCollectionTranslationDTO {
  id: string
  collection_id: string
  locale_id: string
  locale: LocaleDTO
  title: string
  handle: string
  metadata?: MetadataType | null
  created_at: Date | string
  updated_at: Date | string
  deleted_at: Date | string | null
}
