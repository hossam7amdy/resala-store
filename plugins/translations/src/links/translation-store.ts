import { defineLink } from '@medusajs/framework/utils'
import StoreModule from '@medusajs/medusa/store'
import { TRANSLATION_MODULE } from '../modules/translation'

export default defineLink(
  {
    linkable: {
      serviceName: TRANSLATION_MODULE,
      alias: 'locales',
      primaryKey: 'store_id',
    },
    field: 'store_id',
    isList: true,
  },
  StoreModule.linkable.store,
  {
    readOnly: true,
  }
)
