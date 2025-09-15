import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PaymentCallbackHandler from '@modules/checkout/components/payment-callback-handler'

export const metadata: Metadata = {
  title: 'Checkout',
}

interface CheckoutCallbackProps {
  searchParams: Promise<{ [key: string]: string }>
}

export default async function CheckoutCallback({
  searchParams: searchParamsPromise,
}: CheckoutCallbackProps) {
  const searchParams = await searchParamsPromise

  if (
    !searchParams.id ||
    !searchParams.merchant_order_id ||
    !searchParams.success
  ) {
    return notFound()
  }

  return <PaymentCallbackHandler searchParams={searchParams} />
}
