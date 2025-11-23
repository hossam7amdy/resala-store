import { model } from '@medusajs/framework/utils'

import { ProductTranslation, ProductOptionValueTranslation } from './index'

const ProductOptionTranslation = model
  .define('ProductOptionTranslation', {
    id: model.id({ prefix: 'trans' }).primaryKey(),
    option_id: model.text().index('IDX_translation_option_id'),
    locale_id: model.text(),
    title: model.text().searchable(),
    metadata: model.json().nullable(),
    product: model.belongsTo(() => ProductTranslation, {
      mappedBy: 'options',
    }),
    values: model.hasMany(() => ProductOptionValueTranslation, {
      mappedBy: 'option',
    }),
  })
  .cascades({
    delete: ['values'],
  })
  .indexes([
    {
      name: 'IDX_locale_product_option_unique',
      unique: true,
      on: ['locale_id', 'option_id'],
      where: 'deleted_at IS NULL',
    },
  ])

export default ProductOptionTranslation
