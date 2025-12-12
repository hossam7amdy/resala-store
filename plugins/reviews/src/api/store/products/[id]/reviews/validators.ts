import { z } from 'zod'
import { createFindParams } from '@medusajs/medusa/api/utils/validators'

export type StoreGetProductReviewsType = z.infer<typeof StoreGetProductReviews>
export const StoreGetProductReviews = createFindParams()
