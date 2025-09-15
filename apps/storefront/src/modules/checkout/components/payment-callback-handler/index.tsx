'use client'

import { placeOrder } from '@lib/data/cart'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Spinner from '@modules/common/icons/spinner'
import { Button, Heading, Text } from '@medusajs/ui'

interface PaymentCallbackHandlerProps {
  searchParams: Record<string, string>
}
const PaymentCallbackHandler: React.FC<PaymentCallbackHandlerProps> = ({
  searchParams,
}) => {
  const router = useRouter()
  const initialRenderRef = useRef(true)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, _setErrorMessage] = useState<string | null>(null)
  const { countryCode } = useParams() as { countryCode: string }

  const handlePaymentCompletion = useCallback(() => {
    setSubmitting(true)
    placeOrder()
      .catch(console.error)
      .finally(() => setSubmitting(false))
  }, [])

  useEffect(() => {
    if (initialRenderRef.current) {
      initialRenderRef.current = false

      if (searchParams.success === 'true') {
        handlePaymentCompletion()
      }

      return () => {
        initialRenderRef.current = true
      }
    }
  }, [searchParams, handlePaymentCompletion])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-8 py-8">
      {submitting && (
        <>
          <div className="mb-4 text-ui-fg-base">
            <Spinner size={36} />
          </div>
          <Heading level="h2" className="text-lg mb-2">
            Finalizing your order...
          </Heading>
          <Text className="text-sm text-ui-fg-subtle text-center">
            Please wait while we confirm your payment and place the order.
          </Text>
        </>
      )}

      {!submitting && searchParams.success !== 'true' && (
        <div className="max-w-md text-center">
          <Heading level="h2" className="text-lg text-red-600 mb-2">
            Payment was not successful
          </Heading>
          <Text className="text-sm text-ui-fg-subtle mb-6 block">
            Your payment provider reported a failure. You can return to checkout
            and try again.
          </Text>
          <div className="flex items-center justify-center gap-3">
            <Button
              size="large"
              onClick={() =>
                router.replace(`/${countryCode}/checkout?step=review`)
              }
            >
              Back to Checkout
            </Button>
            <Button
              size="large"
              variant="secondary"
              onClick={() => router.replace(`/${countryCode}`)}
            >
              Go to Home
            </Button>
          </div>
        </div>
      )}

      {!submitting && searchParams.success === 'true' && errorMessage && (
        <div className="max-w-md text-center">
          <Heading level="h2" className="text-lg text-red-600 mb-2">
            We couldn’t complete your order
          </Heading>
          <Text className="text-sm text-ui-fg-subtle mb-4 block">
            {errorMessage}
          </Text>
          <div className="flex items-center justify-center gap-3">
            <Button size="large" onClick={handlePaymentCompletion}>
              Try Again
            </Button>
            <Button
              size="large"
              variant="secondary"
              onClick={() => router.replace(`/${countryCode}/checkout`)}
            >
              Back to Checkout
            </Button>
          </div>
        </div>
      )}

      {!submitting && searchParams.success === 'true' && !errorMessage && (
        <>
          <div className="mb-4 text-ui-fg-base">
            <Spinner size={36} />
          </div>
          <div className="max-w-md text-center">
            <Heading level="h2" className="text-lg mb-2">
              Redirecting to order confirmation...
            </Heading>
            <Text className="text-sm text-ui-fg-subtle block">
              If you are not redirected automatically, use the button below.
            </Text>
            <div className="mt-4">
              <Button
                size="large"
                onClick={handlePaymentCompletion}
                disabled={submitting}
              >
                Continue
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default PaymentCallbackHandler
