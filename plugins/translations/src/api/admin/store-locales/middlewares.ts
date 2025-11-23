import {
  type MiddlewareRoute,
  validateAndTransformBody,
  validateAndTransformQuery,
} from '@medusajs/framework'
import {
  AdminCreateStoreLocale,
  AdminGetStoreLocaleParams,
  AdminGetStoreLocalesParams,
  AdminUpdateStoreLocale,
} from './validators'
import * as QueryConfig from './query-config'

export const adminStoreLocaleMiddlewares: MiddlewareRoute[] = [
  {
    method: ['GET'],
    matcher: '/admin/store-locales',
    middlewares: [
      validateAndTransformQuery(
        AdminGetStoreLocalesParams,
        QueryConfig.listStoreLocalesQueryConfig
      ),
    ],
  },
  {
    method: ['GET'],
    matcher: '/admin/store-locales/:id',
    middlewares: [
      validateAndTransformQuery(
        AdminGetStoreLocaleParams,
        QueryConfig.retrieveStoreLocaleQueryConfig
      ),
    ],
  },
  {
    method: ['POST'],
    matcher: '/admin/store-locales',
    middlewares: [
      validateAndTransformBody(AdminCreateStoreLocale),
      validateAndTransformQuery(
        AdminGetStoreLocaleParams,
        QueryConfig.retrieveStoreLocaleQueryConfig
      ),
    ],
  },
  {
    method: ['PUT'],
    matcher: '/admin/store-locales/:id',
    middlewares: [
      validateAndTransformBody(AdminUpdateStoreLocale),
      validateAndTransformQuery(
        AdminGetStoreLocaleParams,
        QueryConfig.retrieveStoreLocaleQueryConfig
      ),
    ],
  },
  {
    method: ['DELETE'],
    matcher: '/admin/store-locales/:id',
  },
]
