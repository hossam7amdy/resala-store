import type { EntityManager } from '@mikro-orm/core'
import type { Context, InferTypeOf } from '@medusajs/types'

import { BaseTranslationHandler } from './base.handler'
import { ProductTypeTranslation } from '../models'
import type {
  AdminUpsertProductTypeTranslations,
  TranslationDTO,
} from '@repo/shared-types'

type ProductTypeTranslationOutput = InferTypeOf<typeof ProductTypeTranslation>
type ProductTypeTranslationInput =
  AdminUpsertProductTypeTranslations[keyof AdminUpsertProductTypeTranslations]

export class ProductTypeTranslationHandler extends BaseTranslationHandler<
  ProductTypeTranslationInput,
  ProductTypeTranslationOutput,
  AdminUpsertProductTypeTranslations
> {
  async create(
    data: ProductTypeTranslationInput[],
    context?: Context<EntityManager>
  ) {
    return this.service.createProductTypeTranslations(data, context)
  }

  async update(
    data: ProductTypeTranslationInput[],
    context?: Context<EntityManager>
  ) {
    return this.service.updateProductTypeTranslations(data, context)
  }

  async delete(ids: string[], context?: Context<EntityManager>) {
    return this.service.deleteProductTypeTranslations(ids, context)
  }

  transformToDatabaseEntities(
    input: TranslationDTO<AdminUpsertProductTypeTranslations>
  ): ProductTypeTranslationInput[] {
    const { entity_id, translations } = input

    return Object.entries(translations).map(([locale_id, translation]) => ({
      ...translation,
      locale_id,
      type_id: entity_id,
    }))
  }
}
