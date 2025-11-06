import type { ProductDTO } from '@medusajs/framework/types'

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
  product_id: string
  product: ProductDTO
  created_at: string
  updated_at: string
  deleted_at: string | null
}
