'use client'

import React from 'react'
import PaymobWrapper from './paymob-wrapper'
import { HttpTypes } from '@medusajs/types'
import { isPaymob } from '@lib/constants'

type PaymentWrapperProps = {
  cart: HttpTypes.StoreCart
  children: React.ReactNode
}

const paymobKey = process.env.NEXT_PUBLIC_paymob_KEY
const paymobPromise = null

const PaymentWrapper: React.FC<PaymentWrapperProps> = ({ cart, children }) => {
  const paymentSession = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === 'pending'
  )

  if (
    isPaymob(paymentSession?.provider_id) &&
    paymentSession &&
    paymobPromise
  ) {
    return (
      <PaymobWrapper
        paymentSession={paymentSession}
        paymobKey={paymobKey}
        paymobPromise={paymobPromise}
      >
        {children}
      </PaymobWrapper>
    )
  }

  return <div>{children}</div>
}

export default PaymentWrapper
