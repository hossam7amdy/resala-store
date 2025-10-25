import { WishlistDTO } from '../../common'

export type StoreCreateWishlistResponse = {
  wishlist: WishlistDTO
}

export type StoreGetWishlistResponse = {
  wishlist: WishlistDTO
}

export type StoreCreateWishlistItemResponse = {
  wishlist: WishlistDTO
}

export type StoreDeleteWishlistItemResponse = {
  wishlist: WishlistDTO
}

export type StoreShareWishlistResponse = {
  token: string
}
