import { z } from 'zod'
import { createFindParams } from '@medusajs/medusa/api/utils/validators'

export type AdminGetReviewsType = z.infer<typeof AdminGetReviews>
export const AdminGetReviews = createFindParams()

export type AdminUpdateReviewsStatusType = z.infer<
  typeof AdminUpdateReviewsStatus
>
export const AdminUpdateReviewsStatus = z.object({
  ids: z.array(z.string()),
  status: z.enum(['pending', 'approved', 'rejected']),
})
