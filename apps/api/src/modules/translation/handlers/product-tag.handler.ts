import type { EntityManager } from '@medusajs/framework/mikro-orm/core'
import type { Context, InferTypeOf } from '@medusajs/types'

import { BaseTranslationHandler } from './base.handler'
import { ProductTagTranslation } from '../models'
import type {
  TranslationDTO,
  AdminUpsertProductTagTranslations,
} from '@repo/shared-types'

type ProductTagTranslationOutput = InferTypeOf<typeof ProductTagTranslation>
type ProductTagTranslationInput =
  AdminUpsertProductTagTranslations[keyof AdminUpsertProductTagTranslations]

export class ProductTagTranslationHandler extends BaseTranslationHandler<
  ProductTagTranslationInput,
  ProductTagTranslationOutput,
  AdminUpsertProductTagTranslations
> {
  async create(
    data: ProductTagTranslationInput[],
    context?: Context<EntityManager>
  ) {
    return this.service.createProductTagTranslations(data, context)
  }

  async update(
    data: ProductTagTranslationInput[],
    context?: Context<EntityManager>
  ) {
    return this.service.updateProductTagTranslations(data, context)
  }

  async delete(ids: string[], context?: Context<EntityManager>) {
    return this.service.deleteProductTagTranslations(ids, context)
  }

  transformToDatabaseEntities(
    input: TranslationDTO<AdminUpsertProductTagTranslations>
  ): ProductTagTranslationInput[] {
    const { entity_id, translations } = input

    return Object.entries(translations).map(([locale_id, translation]) => ({
      ...translation,
      locale_id,
      tag_id: entity_id,
    }))
  }
}
