import {
  validateAndTransformBody,
  validateAndTransformQuery,
  type MiddlewareRoute,
} from '@medusajs/framework'
import {
  AdminGetTranslationListParams,
  AdminGetTranslationProvidersParams,
  AdminRegisterTranslations,
  AdminRemoveTranslations,
} from './validators'
import * as QueryConfig from './query-config'

export const adminTranslationMiddlewares: MiddlewareRoute[] = [
  {
    matcher: '/admin/translations',
    method: ['GET'],
    middlewares: [
      validateAndTransformQuery(
        AdminGetTranslationListParams,
        QueryConfig.listTransformQueryConfig
      ),
    ],
  },
  {
    matcher: '/admin/translations',
    method: ['POST'],
    middlewares: [
      validateAndTransformBody(AdminRegisterTranslations),
      validateAndTransformQuery(
        AdminGetTranslationListParams,
        QueryConfig.listTransformQueryConfig
      ),
    ],
  },
  {
    matcher: '/admin/translations/remove',
    method: ['POST'],
    middlewares: [validateAndTransformBody(AdminRemoveTranslations)],
  },
  {
    matcher: '/admin/translations/translation-providers',
    method: ['GET'],
    middlewares: [
      validateAndTransformQuery(
        AdminGetTranslationProvidersParams,
        QueryConfig.listTranslationProviderTransformQueryConfig
      ),
    ],
  },
]
