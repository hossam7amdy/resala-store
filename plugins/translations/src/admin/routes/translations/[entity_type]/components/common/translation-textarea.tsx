import React, { forwardRef } from 'react'
import { Textarea } from '@medusajs/ui'

import { Form } from '../../../../../components/common/form'

interface TranslationTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  optional?: boolean
  originalValue: string
  translatedValue?: string | null
}

export const TranslationTextarea = forwardRef<
  HTMLTextAreaElement,
  TranslationTextareaProps
>((props, ref) => {
  const { label, originalValue, optional, rows, ...field } = props
  return (
    <div className="space-y-2">
      <Form.Label optional={optional}>{label}</Form.Label>
      <div className="grid grid-cols-2">
        <Textarea
          readOnly
          rows={rows}
          value={originalValue}
          className="cursor-not-allowed rounded-r-none rounded-l-md"
        />
        <Form.Control>
          <Textarea
            ref={ref}
            rows={rows}
            className="rounded-l-none rounded-r-md"
            {...field}
          />
        </Form.Control>
      </div>
    </div>
  )
})
TranslationTextarea.displayName = 'TranslationTextarea'
