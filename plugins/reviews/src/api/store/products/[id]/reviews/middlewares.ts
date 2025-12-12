import {
  type MiddlewareRoute,
  validateAndTransformQuery,
} from '@medusajs/framework/http'
import { StoreGetProductReviews } from './validators'
import * as QueryConfig from './query-config'

export const storeProductReviewsRoutesMiddlewares: MiddlewareRoute[] = [
  {
    method: ['GET'],
    matcher: '/store/products/:id/reviews',
    middlewares: [
      validateAndTransformQuery(
        StoreGetProductReviews,
        QueryConfig.listTransformQueryConfig
      ),
    ],
  },
]
