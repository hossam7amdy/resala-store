import { MiddlewareRoute } from '@medusajs/framework/http'
import { validateAndTransformQuery } from '@medusajs/framework'
import * as QueryConfig from './query-config'
import { StoreGetLocaleParams, StoreGetLocalesParams } from './validators'

export const storeLocaleRoutesMiddlewares: MiddlewareRoute[] = [
  {
    method: ['GET'],
    matcher: '/store/locales',
    middlewares: [
      validateAndTransformQuery(
        StoreGetLocalesParams,
        QueryConfig.listTransformQueryConfig
      ),
    ],
  },
  {
    method: ['GET'],
    matcher: '/store/locales/:id',
    middlewares: [
      validateAndTransformQuery(
        StoreGetLocaleParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
]
