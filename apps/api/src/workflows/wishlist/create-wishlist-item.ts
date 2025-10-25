import {
  createWorkflow,
  WorkflowResponse,
} from '@medusajs/framework/workflows-sdk'
import { useQueryGraphStep } from '@medusajs/medusa/core-flows'
import { validateWishlistSalesChannelStep } from './steps/validate-wishlist-sales-channel'
import { createWishlistItemStep } from './steps/create-wishlist-item'
import { validateVariantWishlistStep } from './steps/validate-variant-wishlist'
import { validateWishlistExistsStep } from './steps/validate-wishlist-exists'
import { Wishlist } from '../../modules/wishlist/models'
import type { InferTypeOf } from '@medusajs/framework/types'
import { validateWishlistThresholdStep } from './steps/validate-wishlist-threshold'

type WishlistEntity = InferTypeOf<typeof Wishlist>

type CreateWishlistItemWorkflowInput = {
  variant_id: string
  customer_id: string
  sales_channel_id: string
}

export const createWishlistItemWorkflow = createWorkflow(
  'create-wishlist-item',
  (input: CreateWishlistItemWorkflowInput) => {
    const { data } = useQueryGraphStep({
      entity: 'wishlist',
      fields: ['*', 'items.*'],
      filters: {
        customer_id: input.customer_id,
      },
    })

    const wishlists = data as WishlistEntity[]

    validateWishlistExistsStep({
      wishlists,
    })

    validateWishlistSalesChannelStep({
      wishlist: wishlists[0]!,
      sales_channel_id: input.sales_channel_id,
    })

    validateVariantWishlistStep({
      variant_id: input.variant_id,
      sales_channel_id: input.sales_channel_id,
      wishlist: wishlists[0],
    })

    validateWishlistThresholdStep({
      wishlist: wishlists[0],
    })

    createWishlistItemStep({
      variant_id: input.variant_id,
      wishlist_id: wishlists[0].id,
    })

    return new WorkflowResponse({
      wishlist: wishlists[0],
    })
  }
)
