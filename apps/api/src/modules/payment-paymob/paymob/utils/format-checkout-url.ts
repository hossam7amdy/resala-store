import { DEFAULT_PAYMOB_UNIFIED_CHECKOUT_TEMPLATE } from '../defaults'

export const getFormattedUnifiedCheckoutUrl = (
  clientSecret: string,
  publicKey: string
) => {
  return DEFAULT_PAYMOB_UNIFIED_CHECKOUT_TEMPLATE.replace(
    'CLIENT_SECRET_PLACEHOLDER',
    clientSecret
  ).replace('PUBLIC_KEY_PLACEHOLDER', publicKey)
}
