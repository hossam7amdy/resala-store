import {
  authenticate,
  type MiddlewareRoute,
  validateAndTransformBody,
  validateAndTransformQuery,
} from '@medusajs/framework/http'
import { StoreCreateReview, StoreGetProductReviews } from './validators'
import * as queryConfig from './query-config'

export const storeReviewRoutesMiddlewares: MiddlewareRoute[] = [
  {
    method: ['POST'],
    matcher: '/store/reviews',
    middlewares: [
      authenticate('customer', ['session', 'bearer']),
      validateAndTransformBody(StoreCreateReview),
    ],
  },
  {
    methods: ['GET'],
    matcher: '/store/products/:id/reviews/',
    middlewares: [
      validateAndTransformQuery(
        StoreGetProductReviews,
        queryConfig.listTransformQueryConfig
      ),
    ],
  },
]
