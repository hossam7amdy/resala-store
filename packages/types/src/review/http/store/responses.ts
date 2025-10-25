import type { PaginatedResponse } from '@medusajs/framework/types'
import type { StoreReview } from './entities'

export type StoreCreateReviewResponse = {
  review: StoreReview
}

export type StoreProductReviewsListResponse = PaginatedResponse<{
  review: StoreReview[]
  average_rating: number
}>
