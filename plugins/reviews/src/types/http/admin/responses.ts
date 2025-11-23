import type { PaginatedResponse } from '@medusajs/framework/types'
import type { AdminReview } from './entities'

export type AdminUpdateReviewsStatusResponse = {
  reviews: AdminReview[]
}

export type AdminDeleteReviewResponse = {
  id: string
  deleted: boolean
}

export type AdminReviewListResponse = PaginatedResponse<{
  reviews: AdminReview[]
}>
