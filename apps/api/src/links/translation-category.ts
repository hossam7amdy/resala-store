import { defineLink } from '@medusajs/framework/utils'
import ProductModule from '@medusajs/medusa/product'
import TranslationModule from '../modules/translation'

export default defineLink(
  {
    linkable: ProductModule.linkable.productCategory,
    field: 'id',
    isList: true,
  },
  {
    ...TranslationModule.linkable.productCategoryTranslation,
    primaryKey: 'category_id',
    alias: 'translations',
  },
  {
    readOnly: true,
  }
)
