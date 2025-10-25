import type { MetadataType } from '@medusajs/framework/types'
import type { LocaleDTO } from '../../store-locale'

export interface ProductTranslationDTO {
  id: string
  product_id: string
  locale_id: string
  locale: LocaleDTO
  title: string
  handle: string
  subtitle: string | null
  description: string | null
  options: ProductOptionTranslationDTO[]
  metadata?: MetadataType | null
  created_at: Date | string
  updated_at: Date | string
  deleted_at: Date | string | null
}

export interface ProductOptionTranslationDTO {
  id: string
  option_id: string
  locale_id: string
  product_id?: string | null
  title: string
  values: ProductOptionValueTranslationDTO[]
  metadata?: MetadataType | null
  created_at: Date | string
  updated_at: Date | string
  deleted_at: Date | string | null
}

export interface ProductOptionValueTranslationDTO {
  id: string
  option_value_id: string
  locale_id: string
  option_id?: string | null
  value: string
  metadata?: MetadataType | null
  created_at: Date | string
  updated_at: Date | string
  deleted_at: Date | string | null
}
