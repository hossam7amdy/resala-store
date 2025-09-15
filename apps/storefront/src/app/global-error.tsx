'use client'

import {
  Button,
  Heading,
  Text,
  Tooltip,
  TooltipProvider,
  Textarea,
} from '@medusajs/ui'
import { useEffect, useState } from 'react'

interface ErrorBoundaryProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Optionally log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary:', error)
  }, [error])

  const message = error.message
    ? `${error.message}`
    : 'Sorry, something went wrong.'

  const handleCopy = () => {
    navigator.clipboard.writeText(message)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 px-4 py-12">
      <div className="bg-white rounded-lg shadow-md p-8 w-full">
        <Heading level="h1" className="text-2xl text-red-600 mb-2">
          Oops, something went wrong
        </Heading>
        <Text className="text-ui-fg-subtle mb-6 block">
          More likely there are some issues with the application. Please try
          again later.
        </Text>
        <div className="mb-6">
          <Heading level="h2" className="text-lg mb-1">
            What has happened?
          </Heading>
          <Text className="block mb-2">A program error has just occurred.</Text>
          <details className="mb-2">
            <summary className="cursor-pointer text-ui-fg-muted font-medium mb-1">
              Error details
            </summary>
            <Textarea
              value={message}
              readOnly
              className="w-full mt-2 text-red-600 bg-gray-100"
              rows={3}
            />
          </details>
        </div>
        <div className="mb-6">
          <Heading level="h2" className="text-lg mb-1">
            What should I do?
          </Heading>
          <TooltipProvider>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Tooltip content={copied ? 'Copied!' : 'Copy to clipboard'}>
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={handleCopy}
                    type="button"
                  >
                    Copy
                  </Button>
                </Tooltip>
                <span>the error message to clipboard</span>
              </li>
              <li>
                Notify an administrator with the issue, and provide also:
                <ul className="list-disc pl-5 mt-1">
                  <li>Steps to reproduce the issue</li>
                  <li>Your operating system and browser version</li>
                </ul>
              </li>
              <li>
                <Button
                  variant="secondary"
                  size="small"
                  onClick={reset}
                  type="button"
                >
                  Reload
                </Button>
                <span className="ml-2">the page</span>
              </li>
            </ul>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}
