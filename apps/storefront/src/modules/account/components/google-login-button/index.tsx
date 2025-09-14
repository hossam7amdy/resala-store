'use client'

import { useCallback, useState } from 'react'
import { Google, Spinner } from '@medusajs/icons'
import { loginWithGoogle } from '@lib/data/customer'
import { Button } from '@medusajs/ui'

const GoogleLoginButton = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleLogin = useCallback(async () => {
    setIsLoading(true)
    try {
      await loginWithGoogle(window.location.origin + '/oauth/google-callback')
    } catch (error) {
      console.error('Google login failed:', error)
      setIsLoading(false)
    }
  }, [])

  return (
    <Button
      type="button"
      disabled={isLoading}
      onClick={handleGoogleLogin}
      className="w-full border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      data-testid="google-login-button"
    >
      {isLoading ? <Spinner className="animate-spin" /> : <Google />}
      {isLoading ? 'Signing in...' : 'Continue with Google'}
    </Button>
  )
}

export default GoogleLoginButton
