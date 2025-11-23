import {
  authenticate,
  type MiddlewareRoute,
  validateAndTransformBody,
} from '@medusajs/framework/http'
import { StoreCreateReview } from './validators'

export const storeReviewRoutesMiddlewares: MiddlewareRoute[] = [
  {
    method: ['POST'],
    matcher: '/store/reviews',
    middlewares: [
      authenticate('customer', ['session', 'bearer']),
      validateAndTransformBody(StoreCreateReview),
    ],
  },
]
