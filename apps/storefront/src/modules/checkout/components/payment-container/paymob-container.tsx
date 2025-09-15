'use client'

import React, { useEffect } from 'react'
import Script from 'next/script'
import { HttpTypes } from '@medusajs/types'
import PaymentContainer, { PaymentContainerProps } from '.'
import { placeOrder } from '@lib/data/cart'

declare global {
  interface Window {
    Pixel: any
  }
}

const ELEMENT_ID = 'payment-collector-container'

interface PaymobContainerProps extends Omit<PaymentContainerProps, 'children'> {
  cart: HttpTypes.StoreCart
  setError: (error: string | null) => void
  setCardComplete: (complete: boolean) => void
}

const PaymobCardContainer: React.FC<PaymobContainerProps> = ({
  cart,
  setCardComplete,
  paymentProviderId,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled,
}) => {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (activeSession) => activeSession.status === 'pending'
  )

  const publicKey = activeSession?.data?.public_key as string
  const clientSecret = activeSession?.data?.client_secret as string

  useEffect(() => {
    // Make sure window exists and scripts are loaded
    const initializePixel = (publicKey: string, clientSecret: string) => {
      if (typeof window !== 'undefined' && window.Pixel) {
        new window.Pixel({
          publicKey,
          clientSecret,
          paymentMethods: ['card'],
          elementId: ELEMENT_ID,
          showSaveCard: false,
          forceSaveCard: false,
          disablePay: true,
          cardValidationChanged: setCardComplete,
          beforePaymentComplete: async (paymentMethod: unknown) => {
            console.log('beforePaymentComplete', { paymentMethod })
          },
          afterPaymentComplete: async (response: unknown) => {
            console.log('After payment', { response })
            await placeOrder().catch(console.error)
          },
          onPaymentCancel: async (response: unknown) => {
            console.log('onPaymentCancel', { response })
          },
          customStyle: {
            HideCardLabel: true,
            Font_Family: 'Inter',
            Color_Primary: 'rgb(39 39 42)',
          },
        })
      }
    }

    let time: any = null
    if (publicKey && clientSecret) {
      // Try to initialize when component mounts
      initializePixel(publicKey, clientSecret)

      time = setTimeout(() => {
        initializePixel(publicKey, clientSecret)
      }, 1000)
    }

    // Clean up
    return () => {
      clearTimeout(time)
    }
  }, [publicKey, clientSecret, setCardComplete])

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/paymob-pixel@latest/main.js"
        type="module"
        strategy="lazyOnload"
      />
      <PaymentContainer
        paymentProviderId={paymentProviderId}
        selectedPaymentOptionId={selectedPaymentOptionId}
        paymentInfoMap={paymentInfoMap}
        disabled={disabled}
      >
        {selectedPaymentOptionId === paymentProviderId && (
          <div id={ELEMENT_ID}></div>
        )}
      </PaymentContainer>
      <Script
        src="https://pay.google.com/gp/p/js/pay.js"
        strategy="lazyOnload"
      />
    </>
  )
}

export default React.memo(PaymobCardContainer)
