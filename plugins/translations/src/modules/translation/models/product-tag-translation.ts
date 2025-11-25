import { model } from '@medusajs/framework/utils'

import StoreLocale from './store-locale'

const ProductTagTranslation = model
  .define('ProductTagTranslation', {
    id: model.id({ prefix: 'trans' }).primaryKey(),
    tag_id: model.text().index('IDX_translation_tag_id'),
    value: model.text().searchable(),
    metadata: model.json().nullable(),
    locale: model.belongsTo(() => StoreLocale, {
      mappedBy: 'product_tags',
    }),
  })
  .indexes([
    {
      name: 'IDX_locale_product_tag_unique',
      unique: true,
      on: ['locale_id', 'tag_id'],
      where: 'deleted_at IS NULL',
    },
  ])

export default ProductTagTranslation
