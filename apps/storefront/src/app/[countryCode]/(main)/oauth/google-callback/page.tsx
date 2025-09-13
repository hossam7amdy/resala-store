'use client'

import { Button } from '@medusajs/ui'
import { useEffect, useState } from 'react'
import { handleGoogleCallback } from '@lib/data/customer'
import { useRouter, useSearchParams } from 'next/navigation'

const GoogleCallbackPage = () => {
  const { push } = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const processCallback = async () => {
      try {
        const queryParams = Object.fromEntries(searchParams.entries())
        await handleGoogleCallback(queryParams)
        push('/account')
      } catch (error: any) {
        setError(error?.message || error)
        console.error('Callback processing error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    processCallback()
  }, [searchParams, push])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] px-8 py-8">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mb-4" />
        <h2 className="text-lg font-medium text-gray-900 mb-2">
          Completing sign in...
        </h2>
        <p className="text-sm text-gray-600">
          Please wait while we finish setting up your account.
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] px-8 py-8">
        <div className="max-w-md text-center">
          <h2 className="text-lg font-medium text-red-900 mb-2">
            Authentication Failed
          </h2>
          <p className="text-sm text-red-600 mb-4">{error}</p>
          <Button onClick={() => push('/account')} size="large">
            Back to Login
          </Button>
        </div>
      </div>
    )
  }

  return null
}

export default GoogleCallbackPage
