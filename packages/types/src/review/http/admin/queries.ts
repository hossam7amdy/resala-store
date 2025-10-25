import type { FindParams } from '@medusajs/framework/types'

export interface AdminReviewListParams extends FindParams {
  status?: 'pending' | 'approved' | 'rejected'
}
