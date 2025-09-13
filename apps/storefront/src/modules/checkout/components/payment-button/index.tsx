'use client'

import { isManual, isPaymob } from '@lib/constants'
import { placeOrder } from '@lib/data/cart'
import { HttpTypes } from '@medusajs/types'
import { Button } from '@medusajs/ui'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ErrorMessage from '../error-message'
import { useSearchParams } from 'next/navigation'

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
  const initialRenderRef = useRef(true)
  const searchParams = useSearchParams()
  const isPaymentSuccess = searchParams.get('success') === 'true'
  const [submitting, setSubmitting] = useState(() => isPaymentSuccess)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = useCallback(async () => {
    setSubmitting(true)
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }, [])

  const session = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === 'pending'
  )

  const disabled = !session || typeof session.data.checkout_url !== 'string'

  const handlePayment = async () => {
    if (typeof session?.data.checkout_url === 'string') {
      location.href = session?.data.checkout_url
    }
  }

  useEffect(() => {
    if (initialRenderRef.current) {
      initialRenderRef.current = false

      if (searchParams.get('success') === 'true') {
        onPaymentCompleted()
      }

      return () => {
        initialRenderRef.current = true
      }
    }
  }, [searchParams, onPaymentCompleted])

  return (
    <>
      <Button
        disabled={disabled || notReady}
        onClick={handlePayment}
        size="large"
        isLoading={submitting}
        data-testid={dataTestId}
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
