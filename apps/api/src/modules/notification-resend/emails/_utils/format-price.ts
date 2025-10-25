import type { BigNumberValue } from '@medusajs/types'

export const formatPrice = (price: BigNumberValue, currencyCode = 'EGP') => {
  const formatter = new Intl.NumberFormat([], {
    style: 'currency',
    currencyDisplay: 'narrowSymbol',
    currency: currencyCode,
  })

  if (typeof price === 'number') {
    return formatter.format(price)
  }

  if (typeof price === 'string') {
    return formatter.format(parseFloat(price))
  }

  return price?.toString() || ''
}
