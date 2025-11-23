import { MedusaError } from '@medusajs/framework/utils'

import { TranslatableEntity } from '../../../../../types'

import { BaseTranslationQueryConfig } from './base-translation-query-config'
import { ProductTranslationQueryConfig } from './product-translation-query-config'
import { ProductCollectionTranslationQueryConfig } from './product-collection-translation-query-config'
import { ProductTypeTranslationQueryConfig } from './product-type-translation-query-config'
import { ProductTagTranslationQueryConfig } from './product-tag-translation-query-config'

const ENTITY_CONFIG_MAP: Record<
  TranslatableEntity,
  () => BaseTranslationQueryConfig
> = {
  products: () => new ProductTranslationQueryConfig(),
  product_tags: () => new ProductTagTranslationQueryConfig(),
  product_types: () => new ProductTypeTranslationQueryConfig(),
  product_collections: () => new ProductCollectionTranslationQueryConfig(),
}

/**
 * Creates entity configuration for the given translatable entity type
 * @param entity - The translatable entity type
 * @returns Configuration object for the entity
 * @throws {MedusaError} When entity type is not supported
 */
export const createTranslationQueryConfigForEntity = (
  entity: TranslatableEntity | (string & Record<never, never>)
): BaseTranslationQueryConfig => {
  const configFactory =
    ENTITY_CONFIG_MAP[entity as keyof typeof ENTITY_CONFIG_MAP]

  if (!configFactory) {
    throw new MedusaError(
      MedusaError.Types.INVALID_ARGUMENT,
      `Invalid translatable entity "${entity}"`
    )
  }

  return configFactory()
}
