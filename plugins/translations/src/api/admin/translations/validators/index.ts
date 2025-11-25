import { z } from 'zod'
import { AdminUpsertProductTranslation } from './product-translation'
import { AdminUpsertProductCollectionTranslation } from './collection-translation'
import { AdminUpsertProductTypeTranslation } from './product-type-translation'
import { AdminUpsertProductTagTranslation } from './product-tag-translation'

export const AdminTranslationEntityName = z.enum([
  'products',
  'product_tags',
  'product_types',
  'product_collections',
])

export type AdminUpsertTranslationsType = z.infer<
  typeof AdminUpsertTranslations
>
export const AdminUpsertTranslations = z.discriminatedUnion('entity_type', [
  z.object({
    entity_type: z.literal('products'),
    entity_id: z.string(),
    translations: z.record(z.string(), AdminUpsertProductTranslation),
  }),
  z.object({
    entity_type: z.literal('product_collections'),
    entity_id: z.string(),
    translations: z.record(z.string(), AdminUpsertProductCollectionTranslation),
  }),
  z.object({
    entity_type: z.literal('product_types'),
    entity_id: z.string(),
    translations: z.record(z.string(), AdminUpsertProductTypeTranslation),
  }),
  z.object({
    entity_type: z.literal('product_tags'),
    entity_id: z.string(),
    translations: z.record(z.string(), AdminUpsertProductTagTranslation),
  }),
])
