import type { PaginatedResponse } from '@medusajs/framework/types'
import type { AdminReview } from './entities'

export type AdminUpdateReviewsStatusResponse = {
  reviews: AdminReview[]
}

export type AdminReviewListResponse = PaginatedResponse<{
  reviews: AdminReview[]
}>
