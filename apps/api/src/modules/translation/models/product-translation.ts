import { model } from '@medusajs/framework/utils'

import { StoreLocale } from './index'
import ProductOptionTranslation from './product-option-translation'

const ProductTranslation = model
  .define('ProductTranslation', {
    id: model.id({ prefix: 'trans' }).primaryKey(),
    product_id: model.text().index('IDX_translation_product_id'),
    title: model.text().searchable(),
    handle: model.text(),
    subtitle: model.text().searchable().nullable(),
    description: model.text().nullable(),
    metadata: model.json().nullable(),
    locale: model.belongsTo(() => StoreLocale, {
      mappedBy: 'products',
    }),
    options: model.hasMany(() => ProductOptionTranslation, {
      mappedBy: 'product',
    }),
  })
  .cascades({
    delete: ['options'],
  })
  .indexes([
    {
      name: 'IDX_locale_product_unique',
      unique: true,
      on: ['locale_id', 'product_id'],
      where: 'deleted_at IS NULL',
    },
    {
      name: 'IDX_product_translation_handle_unique',
      on: ['handle'],
      unique: true,
      where: 'deleted_at IS NULL',
    },
  ])

export default ProductTranslation
