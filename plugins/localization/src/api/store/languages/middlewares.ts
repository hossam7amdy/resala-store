import { MiddlewareRoute } from '@medusajs/framework/http'
import { validateAndTransformQuery } from '@medusajs/framework'
import * as QueryConfig from './query-config'
import { StoreGetLanguagesParams } from './validators'

export const storeLanguageMiddlewares: MiddlewareRoute[] = [
  {
    method: ['GET'],
    matcher: '/store/languages',
    middlewares: [
      validateAndTransformQuery(
        StoreGetLanguagesParams,
        QueryConfig.listTransformQueryConfig
      ),
    ],
  },
]
