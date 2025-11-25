import React from 'react'
import { Button } from '@medusajs/ui'
import { useAutoTranslateService } from '../../../../../hooks/api'

export type AutoTranslateButtonProps =
  React.ComponentPropsWithoutRef<'button'> & {
    isLoading?: boolean
  }

export const AutoTranslateButton: React.FC<AutoTranslateButtonProps> = (
  props
) => {
  const { isSuccess } = useAutoTranslateService()

  if (!isSuccess) {
    return <></>
  }

  return (
    <Button variant="secondary" {...props}>
      Auto translate
    </Button>
  )
}
