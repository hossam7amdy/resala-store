import {
  MiddlewareRoute,
  validateAndTransformBody,
  validateAndTransformQuery,
} from '@medusajs/framework/http'
import * as QueryConfig from './query-config'
import { StoreCreateWishlistItem, StoreGetWishlist } from './validators'

export const storeCustomerWishlistRoutesMiddlewares: MiddlewareRoute[] = [
  {
    matcher: '/store/customers/me/wishlists/items',
    method: 'POST',
    middlewares: [
      validateAndTransformBody(StoreCreateWishlistItem),
      validateAndTransformQuery(
        StoreGetWishlist,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    matcher: '/store/customers/me/wishlists',
    method: 'GET',
    middlewares: [
      validateAndTransformQuery(
        StoreGetWishlist,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    matcher: '/store/customers/me/wishlists/share',
    method: 'POST',
    middlewares: [
      validateAndTransformQuery(
        StoreGetWishlist,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    matcher: '/store/customers/me/wishlists/items/:id',
    method: 'DELETE',
    middlewares: [
      validateAndTransformQuery(
        StoreGetWishlist,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
]
