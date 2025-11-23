/** Supported entity types that can have translations. */
export type TranslatableEntity =
  | 'products'
  | 'product_types'
  | 'product_tags'
  | 'product_collections'
  | (string & {})

/** Entity translation type */
export type EntityTranslation<Entity> = {
  [locale: string]: Entity
}

/** Translation DTO type */
export type TranslationDTO<T = unknown> = {
  entity_id: string
  entity_type: TranslatableEntity
  translations: T
}
