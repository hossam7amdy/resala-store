import type { ReviewDTO } from '../../common'

export type StoreReview = Omit<ReviewDTO, 'deleted_at'>
