import { defineLink } from '@medusajs/framework/utils'
import ProductModule from '@medusajs/medusa/product'
import TranslationModule from '../modules/translation'

export default defineLink(
  {
    linkable: ProductModule.linkable.productType,
    field: 'id',
    isList: true,
  },
  {
    ...TranslationModule.linkable.productTagTranslation,
    primaryKey: 'type_id',
    alias: 'translations',
  },
  {
    readOnly: true,
  }
)
