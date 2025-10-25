import { TranslatableEntity } from '@repo/shared-types'
import { BaseTranslationQueryConfig } from './base-translation-query-config'

export class ProductTypeTranslationQueryConfig extends BaseTranslationQueryConfig {
  get entityType(): TranslatableEntity {
    return 'product_types'
  }

  get entityName(): string {
    return 'product_type_translations'
  }

  get entityIdName(): string {
    return 'type_id'
  }

  get queryDefaultFields(): string[] {
    return [
      'id',
      'locale_id',
      'type_id',
      'value',
      'created_at',
      'updated_at',
      'deleted_at',
      'metadata',
    ]
  }
}
