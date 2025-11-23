import { defineMiddlewares } from '@medusajs/framework/http'

import { adminTranslationsMiddlewares } from './admin/translations/middlewares'
import { adminStoreLocaleMiddlewares } from './admin/store-locales/middlewares'
import { adminAutoTranslateRoutesMiddlewares } from './admin/auto-translate/middlewares'

import { storeCartRoutesMiddlewares } from './store/carts/middlewares'
import { storeLocaleRoutesMiddlewares } from './store/locales/middlewares'
import { storeProductRoutesMiddlewares } from './store/products/middlewares'
import { storeCollectionRoutesMiddlewares } from './store/collections/middlewares'
import { storeGlobalRoutesMiddlewares } from './store/utils/middlewares'

export default defineMiddlewares({
  routes: [
    ...adminTranslationsMiddlewares,
    ...adminAutoTranslateRoutesMiddlewares,
    ...adminStoreLocaleMiddlewares,
    ...storeGlobalRoutesMiddlewares,
    ...storeProductRoutesMiddlewares,
    ...storeCollectionRoutesMiddlewares,
    ...storeCartRoutesMiddlewares,
    ...storeLocaleRoutesMiddlewares,
  ],
})
