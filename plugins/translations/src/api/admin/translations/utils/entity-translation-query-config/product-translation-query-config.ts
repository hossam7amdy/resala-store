import { TranslatableEntity } from '../../../../../types'
import { BaseTranslationQueryConfig } from './base-translation-query-config'

export class ProductTranslationQueryConfig extends BaseTranslationQueryConfig {
  get entityType(): TranslatableEntity {
    return 'products'
  }

  get entityName(): string {
    return 'product_translations'
  }

  get entityIdName(): string {
    return 'product_id'
  }

  get queryDefaultFields(): string[] {
    return [
      'id',
      'locale_id',
      'product_id',
      'title',
      'subtitle',
      'description',
      'handle',
      'created_at',
      'updated_at',
      'deleted_at',
      'metadata',
      'options.*',
      'options.values.*',
    ]
  }
}
