import type { MedusaContainer } from '@medusajs/framework/types'
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from '@medusajs/framework/utils'
import { WishlistDTO } from '../../../../../types'
import { findPublishedTranslation } from '../../../utils/find-published-translation'

export const localizeWishlist = async (
  wishlist: WishlistDTO,
  locale?: string
) => {
  wishlist?.items?.forEach((item) => {
    if (item?.product?.['translations']) {
      const productTranslation = findPublishedTranslation<any>(
        item.product['translations'],
        locale
      )

      if (productTranslation) {
        item.product.title = productTranslation.title || item.product.title
        item.product.subtitle =
          productTranslation.subtitle || item.product.subtitle
        item.product.description =
          productTranslation.description || item.product.description
      }

      delete item.product['translations']
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
