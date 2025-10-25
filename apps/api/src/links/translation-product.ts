import { defineLink } from '@medusajs/framework/utils'
import ProductModule from '@medusajs/medusa/product'
import TranslationModule from '../modules/translation'

export default defineLink(
  {
    linkable: ProductModule.linkable.product,
    field: 'id',
    isList: true,
  },
  {
    ...TranslationModule.linkable.productTranslation.id,
    primaryKey: 'product_id',
    alias: 'translations',
  },
  {
    readOnly: true,
  }
)
