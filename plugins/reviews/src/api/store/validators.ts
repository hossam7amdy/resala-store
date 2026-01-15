import { createFindParams } from '@medusajs/medusa/api/utils/validators'
import { z } from 'zod'

export type StoreCreateReviewType = z.infer<typeof StoreCreateReview>
export const StoreCreateReview = z.object({
  title: z.string().optional(),
  content: z.string(),
  rating: z.coerce.number().min(1).max(5),
  product_id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
})

export type StoreGetProductReviewsType = z.infer<typeof StoreGetProductReviews>
export const StoreGetProductReviews = createFindParams()
