import { defineMiddlewares } from '@medusajs/framework'

import { adminTranslationsMiddlewares } from './admin/translations/middlewares'
import { adminStoreLocaleMiddlewares } from './admin/store-locales/middlewares'
import { adminAutoTranslateRoutesMiddlewares } from './admin/auto-translate/middlewares'
import { storeLocaleRoutesMiddlewares } from './store/locales/middlewares'
import { storeCartRoutesMiddlewares } from './store/carts/middlewares'
import { storeProductRoutesMiddlewares } from './store/products/middlewares'
import { storeCollectionRoutesMiddlewares } from './store/collections/middlewares'
import { storeGlobalRoutesMiddlewares } from './store/utils/middlewares'

export default defineMiddlewares({
  routes: [
    ...adminTranslationsMiddlewares,
    ...adminStoreLocaleMiddlewares,
    ...adminAutoTranslateRoutesMiddlewares,
    ...storeLocaleRoutesMiddlewares,
    ...storeGlobalRoutesMiddlewares,
    ...storeProductRoutesMiddlewares,
    ...storeCollectionRoutesMiddlewares,
    ...storeCartRoutesMiddlewares,
  ],
})
