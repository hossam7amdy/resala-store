import type { EntityManager } from '@medusajs/framework/mikro-orm/core'
import type { Context, InferTypeOf } from '@medusajs/types'

import { BaseTranslationHandler } from './base.handler'
import { ProductCollectionTranslation } from '../models'
import type {
  AdminUpsertProductCollectionTranslations,
  TranslationDTO,
} from '../../../types'

type CollectionTranslationOutput = InferTypeOf<
  typeof ProductCollectionTranslation
>
type CollectionTranslationInput =
  AdminUpsertProductCollectionTranslations[keyof AdminUpsertProductCollectionTranslations]

export class ProductCollectionTranslationHandler extends BaseTranslationHandler<
  CollectionTranslationInput,
  CollectionTranslationOutput,
  AdminUpsertProductCollectionTranslations
> {
  async create(
    data: CollectionTranslationInput[],
    context?: Context<EntityManager>
  ) {
    return this.service.createProductCollectionTranslations(data, context)
  }

  async update(
    data: CollectionTranslationInput[],
    context?: Context<EntityManager>
  ) {
    return this.service.updateProductCollectionTranslations(data, context)
  }

  async delete(ids: string[], context?: Context<EntityManager>) {
    return this.service.deleteProductCollectionTranslations(ids, context)
  }

  transformToDatabaseEntities(
    input: TranslationDTO<AdminUpsertProductCollectionTranslations>
  ): CollectionTranslationInput[] {
    const { entity_id, translations } = input

    return Object.entries(translations).map(([locale_id, translation]) => ({
      ...translation,
      locale_id,
      collection_id: entity_id,
    }))
  }
}
