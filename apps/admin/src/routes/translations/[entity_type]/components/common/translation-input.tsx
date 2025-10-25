import React, { forwardRef } from 'react'
import { Input } from '@medusajs/ui'

import { Form } from '../../../../../components/common/form'

interface TranslationInputProps
  extends React.TextareaHTMLAttributes<HTMLInputElement> {
  label?: string
  optional?: boolean
  originalValue: string
  size?: 'small' | 'base'
}

export const TranslationInput = forwardRef<
  HTMLInputElement,
  TranslationInputProps
>((props, ref) => {
  const { label, originalValue, optional, size, ...field } = props

  return (
    <div className="space-y-2">
      <Form.Label optional={optional}>{label}</Form.Label>
      <div className="grid grid-cols-2">
        <Input
          readOnly
          size={size}
          value={originalValue}
          className="cursor-not-allowed rounded-r-none rounded-l-md"
        />
        <Form.Control>
          <Input
            ref={ref}
            size={size}
            className="rounded-l-none rounded-r-md"
            {...field}
          />
        </Form.Control>
      </div>
    </div>
  )
})
TranslationInput.displayName = 'TranslationInput'
