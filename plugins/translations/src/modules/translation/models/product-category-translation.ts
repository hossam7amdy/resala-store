import { model } from '@medusajs/framework/utils'

import StoreLocale from './store-locale'

const ProductCategoryTranslation = model
  .define('ProductCategoryTranslation', {
    id: model.id({ prefix: 'trans' }).primaryKey(),
    category_id: model.text().index('IDX_translation_category_id'),
    name: model.text().searchable(),
    description: model.text().searchable().default(''),
    handle: model.text().searchable(),
    metadata: model.json().nullable(),
    parent_category: model
      .belongsTo(() => ProductCategoryTranslation, {
        mappedBy: 'category_children',
      })
      .nullable(),
    category_children: model.hasMany(() => ProductCategoryTranslation, {
      mappedBy: 'parent_category',
    }),
    locale: model.belongsTo(() => StoreLocale, {
      mappedBy: 'product_categories',
    }),
  })
  .cascades({
    delete: ['category_children'],
  })
  .indexes([
    {
      name: 'IDX_locale_product_category_unique',
      unique: true,
      on: ['locale_id', 'category_id'],
      where: 'deleted_at IS NULL',
    },
    {
      name: 'IDX_category_handle_unique',
      on: ['handle'],
      unique: true,
      where: 'deleted_at IS NULL',
    },
  ])

export default ProductCategoryTranslation
