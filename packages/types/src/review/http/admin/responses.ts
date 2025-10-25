import { PaginatedResponse } from '@medusajs/framework/types'
import { AdminReview } from './entities'

export type AdminUpdateReviewsStatusResponse = {
  reviews: AdminReview[]
}

export type AdminReviewListResponse = PaginatedResponse<{
  reviews: AdminReview[]
}>
