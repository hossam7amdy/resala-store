import {
  type MiddlewareRoute,
  validateAndTransformBody,
  validateAndTransformQuery,
} from '@medusajs/framework/http'
import * as QueryConfig from './query-config'
import { AdminGetReviews, AdminUpdateReviewsStatus } from './validators'

export const adminReviewRoutesMiddlewares: MiddlewareRoute[] = [
  {
    matcher: '/admin/reviews',
    method: ['GET'],
    middlewares: [
      validateAndTransformQuery(
        AdminGetReviews,
        QueryConfig.listTransformQueryConfig
      ),
    ],
  },
  {
    matcher: '/admin/reviews/status',
    method: ['POST'],
    middlewares: [validateAndTransformBody(AdminUpdateReviewsStatus)],
  },
]
