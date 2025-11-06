import { z } from 'zod'
import { createSelectParams } from '@medusajs/medusa/api/utils/validators'

export type StoreGetWishlistType = z.infer<typeof StoreGetWishlist>
export const StoreGetWishlist = createSelectParams()

export type StoreCreateWishlistItemType = z.infer<
  typeof StoreCreateWishlistItem
>
export const StoreCreateWishlistItem = z.object({
  product_id: z.string(),
})
