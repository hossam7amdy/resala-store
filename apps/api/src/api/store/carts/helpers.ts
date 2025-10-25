import { HttpTypes, MedusaContainer } from '@medusajs/framework/types'
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from '@medusajs/framework/utils'
import { findPublishedTranslation } from '../utils'

export const localizeCart = (
  cart: HttpTypes.StoreCart & {},
  locale?: string
) => {
  cart.items?.forEach((item) => {
    if (item.variant?.product?.['translations']) {
      const productTranslation = findPublishedTranslation<any>(
        item.variant.product['translations'],
        locale
      )

      if (productTranslation) {
        item.title = productTranslation.title || item.title
        item.product_title = productTranslation.title || item.product_title
        item.product_subtitle =
          productTranslation.subtitle || item.product_subtitle
        item.product_description =
          productTranslation.description || item.product_description
      }

      delete item.variant.product['translations']
    }
  })

  return cart
}

export const refetchCart = async (
  id: string,
  scope: MedusaContainer,
  fields: string[],
  locale?: string
) => {
  const remoteQuery = scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: 'cart',
    variables: { filters: { id } },
    fields: fields.concat(
      'items.variant.product.translations.*',
      'items.variant.product.translations.locale.*'
    ),
  })

  const [cart] = await remoteQuery(queryObject)

  return localizeCart(cart, locale)
}
