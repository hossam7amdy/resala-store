import { model } from '@medusajs/framework/utils'
import { ProductOptionTranslation } from './index'

const ProductOptionValueTranslation = model
  .define('ProductOptionValueTranslation', {
    id: model.id({ prefix: 'trans' }).primaryKey(),
    option_value_id: model.text().index('IDX_translation_option_value_id'),
    locale_id: model.text(),
    value: model.text(),
    metadata: model.json().nullable(),
    option: model
      .belongsTo(() => ProductOptionTranslation, {
        mappedBy: 'values',
      })
      .nullable(),
  })
  .indexes([
    {
      name: 'IDX_locale_product_option_value_unique',
      unique: true,
      on: ['locale_id', 'option_value_id'],
      where: 'deleted_at IS NULL',
    },
  ])

export default ProductOptionValueTranslation
