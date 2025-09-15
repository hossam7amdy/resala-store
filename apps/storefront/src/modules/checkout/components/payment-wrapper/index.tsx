'use client'

import { HttpTypes } from '@medusajs/types'
import { createContext } from 'react'

type PaymentWrapperProps = {
  children: React.ReactNode
  cart: HttpTypes.StoreCart
}

export const PaymentContext = createContext(true)

const PaymentWrapper: React.FC<PaymentWrapperProps> = ({ children }) => {
  return (
    <PaymentContext.Provider value={true}>{children}</PaymentContext.Provider>
  )
}

export default PaymentWrapper
