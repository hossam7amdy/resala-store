import type { Context, InferTypeOf } from '@medusajs/types'
import type { EntityManager } from '@medusajs/framework/mikro-orm/core'

import { ProductTranslation } from '../models'
import { BaseTranslationHandler } from './base.handler'
import type {
  AdminUpsertProductTranslations,
  TranslationDTO,
} from '../../../types'
import {
  MedusaContext,
  InjectTransactionManager,
} from '@medusajs/framework/utils'

type ProductTranslationOutput = InferTypeOf<typeof ProductTranslation>
type ProductTranslationInput =
  AdminUpsertProductTranslations[keyof AdminUpsertProductTranslations]

export class ProductTranslationHandler extends BaseTranslationHandler<
  ProductTranslationInput,
  ProductTranslationOutput,
  AdminUpsertProductTranslations
> {
  async create(
    data: ProductTranslationInput[],
    context?: Context<EntityManager>
  ) {
    // @ts-ignore
    return this.service.createProductTranslations(data, context)
  }

  @InjectTransactionManager()
  async update(
    data: ProductTranslationInput[],
    @MedusaContext() context?: Context<EntityManager>
  ) {
    const updateProducts: any[] = []
    const upsertProductOptions: any[] = []

    for (const { options = [], ...product } of data) {
      updateProducts.push(product)
      upsertProductOptions.push(...options)
    }

    const [updatedProductTranslations] = await Promise.all([
      this.service.updateProductTranslations(updateProducts, context),
      this.service.productOptionTranslationRepository.upsertWithReplace(
        upsertProductOptions,
        { relations: ['values'] },
        context
      ),
    ])

    return updatedProductTranslations
  }

  async delete(ids: string[], context?: Context<EntityManager>) {
    return this.service.deleteProductTranslations(ids, context)
  }

  transformToDatabaseEntities(
    input: TranslationDTO<AdminUpsertProductTranslations>
  ): ProductTranslationInput[] {
    const { entity_id, translations } = input

    return Object.entries(translations).map(([locale_id, product]) => ({
      ...product,
      locale_id,
      product_id: entity_id,
      options: product?.options?.map((option) => ({
        ...option,
        locale_id,
        product_id: product?.id as string,
        values: option?.values?.map((value) => ({
          ...value,
          locale_id,
          option_id: option?.id,
        })),
      })),
    })) as ProductTranslationInput[]
  }
}
