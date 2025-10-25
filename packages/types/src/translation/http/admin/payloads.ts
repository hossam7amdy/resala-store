import type { MetadataType } from '@medusajs/framework/types'
import type { EntityTranslation } from '../../common'

export type AdminUpsertTranslationsPayload<T> = EntityTranslation<T>

export type AdminUpsertProductTranslations = EntityTranslation<{
  id?: string
  locale_id?: string
  title: string
  handle: string
  subtitle?: string
  description?: string
  metadata?: MetadataType
  options: Array<{
    id?: string
    title: string
    option_id: string
    locale_id?: string
    product_id?: string
    metadata?: MetadataType
    values: Array<{
      id?: string
      value: string
      option_value_id: string
      locale_id?: string
      option_id?: string
      metadata?: MetadataType
    }>
  }>
}>

export type AdminUpsertProductCollectionTranslations = EntityTranslation<{
  id?: string
  locale_id?: string
  collection_id?: string
  title: string
  handle: string
  metadata?: MetadataType
}>

export type AdminUpsertProductTypeTranslations = EntityTranslation<{
  id?: string
  type_id: string
  locale_id?: string
  value: string
  metadata?: MetadataType
}>

export type AdminUpsertProductTagTranslations = EntityTranslation<{
  id?: string
  tag_id: string
  locale_id?: string
  value: string
  metadata?: MetadataType
}>
