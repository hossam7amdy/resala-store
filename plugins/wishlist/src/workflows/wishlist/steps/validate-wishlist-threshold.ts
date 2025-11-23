import { InferTypeOf } from '@medusajs/framework/types'
import { createStep } from '@medusajs/framework/workflows-sdk'
import { MedusaError } from '@medusajs/framework/utils'
import { Wishlist } from '../../../modules/wishlist/models/wishlist'

const MAX_WISHLIST_ITEMS_THRESHOLD = 10

type ValidateWishlistThresholdStepInput = {
  wishlist: InferTypeOf<typeof Wishlist>
}

export const validateWishlistThresholdStep = createStep(
  'validate-wishlist-threshold',
  async (input: ValidateWishlistThresholdStepInput, { container: _ }) => {
    if (input.wishlist.items.length >= MAX_WISHLIST_ITEMS_THRESHOLD) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        'Wishlist threshold reached'
      )
    }
  }
)
