import { defineMiddlewares } from '@medusajs/framework'
import { adminReviewRoutesMiddlewares } from './admin/reviews/middlewares'
import { storeReviewRoutesMiddlewares } from './store/reviews/middlewares'
import { storeProductReviewsRoutesMiddlewares } from './store/products/[id]/reviews/middlewares'

export default defineMiddlewares({
  routes: [
    ...adminReviewRoutesMiddlewares,
    ...storeReviewRoutesMiddlewares,
    ...storeProductReviewsRoutesMiddlewares,
  ],
})
