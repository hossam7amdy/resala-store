import { TranslatableEntity } from '../../../../../types'
import { BaseTranslationQueryConfig } from './base-translation-query-config'

export class ProductTagTranslationQueryConfig extends BaseTranslationQueryConfig {
  get entityType(): TranslatableEntity {
    return 'product_tags'
  }

  get entityName(): string {
    return 'product_tag_translations'
  }

  get entityIdName(): string {
    return 'tag_id'
  }

  get queryDefaultFields(): string[] {
    return [
      'id',
      'locale_id',
      'tag_id',
      'value',
      'created_at',
      'updated_at',
      'deleted_at',
      'metadata',
    ]
  }
}
