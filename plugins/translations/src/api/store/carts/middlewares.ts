import { validateAndTransformQuery } from '@medusajs/framework'
import { MiddlewareRoute } from '@medusajs/framework/http'
import * as QueryConfig from './query-config'
import { StoreGetCartsCart } from './validators'

export const storeCartRoutesMiddlewares: MiddlewareRoute[] = [
  {
    method: ['GET'],
    matcher: '/store/carts/:id',
    middlewares: [
      validateAndTransformQuery(
        StoreGetCartsCart,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
]
