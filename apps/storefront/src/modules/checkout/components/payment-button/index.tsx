'use client'

import { isManual, isPaymob } from '@lib/constants'
import { placeOrder } from '@lib/data/cart'
import { HttpTypes } from '@medusajs/types'
import { Button } from '@medusajs/ui'
import React, { useCallback, useState } from 'react'
import ErrorMessage from '../error-message'

type PaymentButtonProps = {
  cart: HttpTypes.StoreCart
  'data-testid': string
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  cart,
  'data-testid': dataTestId,
}) => {
  const notReady =
    !cart ||
    !cart.shipping_address ||
    !cart.billing_address ||
    !cart.email ||
    (cart.shipping_methods?.length ?? 0) < 1

  const paymentSession = cart.payment_collection?.payment_sessions?.[0]

  switch (true) {
    case isPaymob(paymentSession?.provider_id):
      return (
        <PaymobPaymentButton
          cart={cart}
          notReady={notReady}
          data-testid={dataTestId}
        />
      )
    case isManual(paymentSession?.provider_id):
      return (
        <ManualPaymentButton notReady={notReady} data-testid={dataTestId} />
      )
    default:
      return <Button disabled>Select a payment method</Button>
  }
}

const PaymobPaymentButton = ({
  cart,
  notReady,
  'data-testid': dataTestId,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  'data-testid'?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const session = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === 'pending'
  )

  const disabled = !session || !window.Pixel

  const handlePayment = useCallback(() => {
    setErrorMessage(null)
    const invoked = window.dispatchEvent(new Event('payFromOutside'))
    setSubmitting(invoked)
  }, [])

  return (
    <>
      <Button
        isLoading={submitting}
        disabled={disabled || notReady}
        onClick={handlePayment}
        size="large"
        data-testid={dataTestId}
        type="submit"
      >
        Place order
      </Button>
      <ErrorMessage error={errorMessage} data-testid="payment-error-message" />
    </>
  )
}

const ManualPaymentButton = ({ notReady }: { notReady: boolean }) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const handlePayment = () => {
    setSubmitting(true)

    onPaymentCompleted()
  }

  return (
    <>
      <Button
        disabled={notReady}
        isLoading={submitting}
        onClick={handlePayment}
        size="large"
        data-testid="submit-order-button"
      >
        Place order
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="manual-payment-error-message"
      />
    </>
  )
}

export default PaymentButton
