import type { AdminCustomer, AdminProduct } from '@medusajs/framework/types'
import type { ReviewDTO } from '../../common'

export interface AdminReview extends ReviewDTO {
  /** Product associated with the review */
  product?: AdminProduct
  /** Customer associated with the review */
  customer?: AdminCustomer
}
