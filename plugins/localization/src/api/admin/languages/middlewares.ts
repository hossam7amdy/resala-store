import {
  type MiddlewareRoute,
  validateAndTransformBody,
  validateAndTransformQuery,
} from '@medusajs/framework'
import {
  AdminCreateLanguage,
  AdminGetLanguage,
  AdminGetLanguageListParams,
  AdminUpdateLanguage,
} from './validators'
import * as QueryConfig from './query-config'

export const adminLanguageMiddlewares: MiddlewareRoute[] = [
  {
    method: ['GET'],
    matcher: '/admin/languages',
    middlewares: [
      validateAndTransformQuery(
        AdminGetLanguageListParams,
        QueryConfig.listLanguageQueryConfig
      ),
    ],
  },
  {
    method: ['POST'],
    matcher: '/admin/languages',
    middlewares: [
      validateAndTransformBody(AdminCreateLanguage),
      validateAndTransformQuery(
        AdminGetLanguage,
        QueryConfig.retrieveLanguageQueryConfig
      ),
    ],
  },
  {
    method: ['PUT'],
    matcher: '/admin/languages/:id',
    middlewares: [
      validateAndTransformBody(AdminUpdateLanguage),
      validateAndTransformQuery(
        AdminGetLanguage,
        QueryConfig.retrieveLanguageQueryConfig
      ),
    ],
  },
  {
    method: ['DELETE'],
    matcher: '/admin/languages/:code',
  },
]
