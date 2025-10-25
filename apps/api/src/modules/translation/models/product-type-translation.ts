import { model } from '@medusajs/framework/utils'

import StoreLocale from './store-locale'

const ProductTypeTranslation = model
  .define('ProductTypeTranslation', {
    id: model.id({ prefix: 'trans' }).primaryKey(),
    type_id: model.text().index('IDX_translation_type_id'),
    value: model.text().searchable(),
    metadata: model.json().nullable(),
    locale: model.belongsTo(() => StoreLocale, {
      mappedBy: 'product_types',
    }),
  })
  .indexes([
    {
      name: 'IDX_locale_product_type_unique',
      unique: true,
      on: ['locale_id', 'type_id'],
      where: 'deleted_at IS NULL',
    },
  ])

export default ProductTypeTranslation
