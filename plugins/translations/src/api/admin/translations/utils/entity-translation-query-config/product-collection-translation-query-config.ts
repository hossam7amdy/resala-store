import { TranslatableEntity } from '../../../../../types'
import { BaseTranslationQueryConfig } from './base-translation-query-config'

export class ProductCollectionTranslationQueryConfig extends BaseTranslationQueryConfig {
  get entityType(): TranslatableEntity {
    return 'product_collections'
  }

  get entityName(): string {
    return 'product_collection_translations'
  }

  get entityIdName(): string {
    return 'collection_id'
  }

  get queryDefaultFields(): string[] {
    return [
      'id',
      'locale_id',
      'collection_id',
      'title',
      'handle',
      'created_at',
      'updated_at',
      'deleted_at',
      'metadata',
    ]
  }
}
