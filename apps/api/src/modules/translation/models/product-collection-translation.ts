import { model } from '@medusajs/framework/utils'
import { StoreLocale } from './index'

const ProductCollectionTranslation = model
  .define('ProductCollectionTranslation', {
    id: model.id({ prefix: 'trans' }).primaryKey(),
    collection_id: model.text().index('IDX_translation_collection_id'),
    title: model.text().searchable(),
    handle: model.text(),
    metadata: model.json().nullable(),
    locale: model.belongsTo(() => StoreLocale, {
      mappedBy: 'product_collections',
    }),
  })
  .indexes([
    {
      name: 'IDX_locale_collection_unique',
      unique: true,
      on: ['locale_id', 'collection_id'],
      where: 'deleted_at IS NULL',
    },
    {
      name: 'IDX_product_collection_translation_handle_unique',
      on: ['handle'],
      unique: true,
      where: 'deleted_at IS NULL',
    },
  ])

export default ProductCollectionTranslation
