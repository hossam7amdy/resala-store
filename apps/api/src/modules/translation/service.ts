import {
  MedusaService,
  InjectManager,
  MedusaContext,
  InjectTransactionManager,
} from '@medusajs/framework/utils'
import type { Context, DAL, InferTypeOf } from '@medusajs/types'
import type { EntityManager } from '@medusajs/framework/mikro-orm/core'

import type { TranslatableEntity, TranslationDTO } from '@repo/shared-types'

import {
  StoreLocale,
  ProductTranslation,
  ProductTagTranslation,
  ProductTypeTranslation,
  ProductCategoryTranslation,
  ProductCollectionTranslation,
  ProductOptionTranslation,
  ProductOptionValueTranslation,
} from './models'
import {
  ProductTranslationHandler,
  ProductCollectionTranslationHandler,
  ProductTypeTranslationHandler,
} from './handlers'
import { TranslationRegistry } from './translation-registry'
import { ProductTagTranslationHandler } from './handlers/product-tag.handler'

type ProductOptionTranslation = InferTypeOf<typeof ProductOptionTranslation>

type InjectedDependencies = {
  productOptionTranslationRepository: DAL.RepositoryService<ProductOptionTranslation>
}

class TranslationModuleService extends MedusaService({
  StoreLocale,
  ProductTranslation,
  ProductOptionTranslation,
  ProductOptionValueTranslation,
  ProductTagTranslation,
  ProductTypeTranslation,
  ProductCategoryTranslation,
  ProductCollectionTranslation,
}) {
  private translationRegistry: TranslationRegistry
  productOptionTranslationRepository: DAL.RepositoryService<ProductOptionTranslation>

  constructor({ productOptionTranslationRepository }: InjectedDependencies) {
    super(...arguments)
    this.productOptionTranslationRepository = productOptionTranslationRepository
    this.initializeRegistry()
  }

  private initializeRegistry() {
    this.translationRegistry = new TranslationRegistry()

    // Register handlers
    this.translationRegistry.register(
      'products',
      new ProductTranslationHandler(this)
    )
    this.translationRegistry.register(
      'product_tags',
      new ProductTagTranslationHandler(this)
    )
    this.translationRegistry.register(
      'product_types',
      new ProductTypeTranslationHandler(this)
    )
    this.translationRegistry.register(
      'product_collections',
      new ProductCollectionTranslationHandler(this)
    )
  }

  @InjectTransactionManager()
  async upsertTranslationsForEntity(
    input: TranslationDTO<unknown>,
    @MedusaContext() sharedContext?: Context<EntityManager>
  ) {
    const { entity_type } = input
    const handler = this.translationRegistry.get(entity_type)
    const entities = handler.transformToDatabaseEntities(input)
    return handler.upsert(entities, sharedContext)
  }

  @InjectManager()
  async deleteTranslationsForEntity(
    entityType: TranslatableEntity,
    translationIds: string[],
    @MedusaContext() sharedContext?: Context<EntityManager>
  ) {
    const handler = this.translationRegistry.get(entityType)
    return handler.delete(translationIds, sharedContext)
  }
}

export default TranslationModuleService
