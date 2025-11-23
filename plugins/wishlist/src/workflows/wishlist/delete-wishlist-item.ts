import {
  createWorkflow,
  WorkflowResponse,
} from '@medusajs/framework/workflows-sdk'
import { deleteWishlistItemStep } from './steps/delete-wishlist-item'
import { useQueryGraphStep } from '@medusajs/medusa/core-flows'
import { validateItemInWishlistStep } from './steps/validate-item-in-wishlist'
import { validateWishlistExistsStep } from './steps/validate-wishlist-exists'
import { Wishlist } from '../../modules/wishlist/models'
import type { InferTypeOf } from '@medusajs/framework/types'

type WishlistEntity = InferTypeOf<typeof Wishlist>

type DeleteWishlistItemWorkflowInput = {
  wishlist_item_id: string
  customer_id: string
}

export const deleteWishlistItemWorkflow = createWorkflow(
  'delete-wishlist-item',
  (input: DeleteWishlistItemWorkflowInput) => {
    const { data } = useQueryGraphStep({
      entity: 'wishlist',
      fields: ['*', 'items.*'],
      filters: {
        customer_id: input.customer_id,
      },
    })

    const wishlists = data as unknown as WishlistEntity[]

    validateWishlistExistsStep({
      wishlists,
    })

    validateItemInWishlistStep({
      wishlist: wishlists[0],
      wishlist_item_id: input.wishlist_item_id,
    })

    deleteWishlistItemStep(input)

    return new WorkflowResponse({
      wishlist: wishlists[0],
    })
  }
)
