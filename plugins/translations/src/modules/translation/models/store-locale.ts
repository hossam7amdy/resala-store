import { model } from '@medusajs/framework/utils'

import ProductTranslation from './product-translation'
import ProductTagTranslation from './product-tag-translation'
import ProductTypeTranslation from './product-type-translation'
import ProductCollectionTranslation from './product-collection-translation'
import ProductCategoryTranslation from './product-category-translation'

const StoreLocale = model
  .define('StoreLocale', {
    id: model.id({ prefix: 'stoloc' }).primaryKey(),
    store_id: model.text(),
    code: model.text(),
    name: model.text(),
    native_name: model.text(),
    direction: model.enum(['ltr', 'rtl']),
    is_default: model.boolean(),
    is_published: model.boolean(),
    products: model.hasMany(() => ProductTranslation, {
      mappedBy: 'locale',
    }),
    product_collections: model.hasMany(() => ProductCollectionTranslation, {
      mappedBy: 'locale',
    }),
    product_tags: model.hasMany(() => ProductTagTranslation, {
      mappedBy: 'locale',
    }),
    product_types: model.hasMany(() => ProductTypeTranslation, {
      mappedBy: 'locale',
    }),
    product_categories: model.hasMany(() => ProductCategoryTranslation, {
      mappedBy: 'locale',
    }),
  })
  .cascades({
    delete: [
      'products',
      'product_tags',
      'product_tags',
      'product_categories',
      'product_collections',
    ],
  })
  .indexes([
    {
      name: 'IDX_store_locale_unique',
      on: ['store_id', 'code'],
      unique: true,
      where: 'deleted_at IS NULL',
    },
  ])

export default StoreLocale
