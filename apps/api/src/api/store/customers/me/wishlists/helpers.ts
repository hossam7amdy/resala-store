import type { MedusaContainer } from '@medusajs/framework/types'
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from '@medusajs/framework/utils'
import { WishlistDTO } from '@repo/shared-types'
import { findPublishedTranslation } from '../../../utils'

export const localizeWishlist = async (
  wishlist: WishlistDTO,
  locale?: string
) => {
  wishlist?.items?.forEach((item) => {
    if (item?.product_variant?.product?.['translations']) {
      const productTranslation = findPublishedTranslation<any>(
        item.product_variant.product['translations'],
        locale
      )

      if (productTranslation) {
        item.product_variant.product.title =
          productTranslation.title || item.product_variant.product.title
        item.product_variant.product.subtitle =
          productTranslation.subtitle || item.product_variant.product.subtitle
        item.product_variant.product.description =
          productTranslation.description ||
          item.product_variant.product.description
      }

      delete item.product_variant.product['translations']
    }
  })

  return wishlist
}

export const refetchWishlist = async (
  customer_id: string,
  scope: MedusaContainer,
  fields: string[],
  locale?: string
) => {
  const remoteQuery = scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: 'wishlist',
    variables: {
      filters: { customer_id },
    },
    fields,
  })

  const wishlists = await remoteQuery(queryObject)
  return localizeWishlist(wishlists[0], locale)
}
