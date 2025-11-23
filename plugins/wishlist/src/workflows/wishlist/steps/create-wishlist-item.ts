import { WISHLIST_MODULE } from '../../../modules/wishlist'
import WishlistModuleService from '../../../modules/wishlist/service'
import { createStep, StepResponse } from '@medusajs/framework/workflows-sdk'

type CreateWishlistItemStepInput = {
  wishlist_id: string
  product_id: string
}

export const createWishlistItemStep = createStep(
  'create-wishlist-item',
  async (input: CreateWishlistItemStepInput, { container }) => {
    const wishlistModuleService =
      container.resolve<WishlistModuleService>(WISHLIST_MODULE)

    const item = await wishlistModuleService.createWishlistItems(input)

    return new StepResponse(item, item.id)
  },
  async (id, { container }) => {
    if (!id) {
      return
    }
    const wishlistModuleService: WishlistModuleService =
      container.resolve(WISHLIST_MODULE)

    await wishlistModuleService.deleteWishlistItems(id)
  }
)
