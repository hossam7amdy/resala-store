import type { ProductVariantDTO } from '@medusajs/framework/types'

export type WishlistDTO = {
  id: string
  customer_id: string
  sales_channel_id: string
  items: WishlistItemDTO[]
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export type WishlistItemDTO = {
  id: string
  wishlist_id: string
  variant_id: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  product_variant: ProductVariantDTO
}
