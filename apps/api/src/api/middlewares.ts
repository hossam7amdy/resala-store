import { defineMiddlewares } from '@medusajs/framework/http'

import { adminReviewRoutesMiddlewares } from './admin/reviews/middlewares'
import { adminTranslationsMiddlewares } from './admin/translations/middlewares'
import { adminStoreLocaleMiddlewares } from './admin/store-locales/middlewares'
import { adminAutoTranslateRoutesMiddlewares } from './admin/auto-translate/middlewares'

import { storeCartRoutesMiddlewares } from './store/carts/middlewares'
import { storeLocaleRoutesMiddlewares } from './store/locales/middlewares'
import { storeReviewRoutesMiddlewares } from './store/reviews/middlewares'
import { storeProductRoutesMiddlewares } from './store/products/middlewares'
import { storeCollectionRoutesMiddlewares } from './store/collections/middlewares'
import { storeCustomerWishlistRoutesMiddlewares } from './store/customers/me/wishlists/middlewares'
import { storeGlobalRoutesMiddlewares } from './store/utils/middlewares'

export default defineMiddlewares({
  routes: [
    ...adminReviewRoutesMiddlewares,
    ...adminTranslationsMiddlewares,
    ...adminAutoTranslateRoutesMiddlewares,
    ...adminStoreLocaleMiddlewares,
    ...storeGlobalRoutesMiddlewares,
    ...storeReviewRoutesMiddlewares,
    ...storeProductRoutesMiddlewares,
    ...storeCollectionRoutesMiddlewares,
    ...storeCartRoutesMiddlewares,
    ...storeLocaleRoutesMiddlewares,
    ...storeCustomerWishlistRoutesMiddlewares,
  ],
})
