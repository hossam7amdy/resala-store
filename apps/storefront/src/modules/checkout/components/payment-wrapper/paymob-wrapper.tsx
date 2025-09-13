'use client'

import { HttpTypes } from '@medusajs/types'
import { createContext } from 'react'

type PaymobElementsOptions = {
  clientSecret: string | undefined
}

type StripeWrapperProps = {
  paymentSession: HttpTypes.StorePaymentSession
  paymobKey?: string
  paymobPromise: Promise<unknown> | null
  children: React.ReactNode
}

export const PaymobContext = createContext(false)

const PaymobWrapper: React.FC<StripeWrapperProps> = ({
  paymentSession,
  paymobKey,
  paymobPromise,
  children,
}) => {
  const options: PaymobElementsOptions = {
    clientSecret: paymentSession!.data?.client_secret as string | undefined,
  }

  if (!paymobKey) {
    throw new Error(
      'Paymob key is missing. Set NEXT_PUBLIC_PAYMOB_KEY environment variable.'
    )
  }

  if (!paymobPromise) {
    throw new Error(
      'Paymob promise is missing. Make sure you have provided a valid Paymob key.'
    )
  }

  if (!paymentSession?.data?.client_secret) {
    throw new Error(
      'Paymob client secret is missing. Cannot initialize Paymob.'
    )
  }

  return (
    <PaymobContext.Provider value={true}>{children}</PaymobContext.Provider>
  )
}

export default PaymobWrapper
