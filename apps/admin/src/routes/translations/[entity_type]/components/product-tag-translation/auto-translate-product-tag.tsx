import React from 'react'
import { toast } from '@medusajs/ui'
import { UseFormReturn } from 'react-hook-form'
import { AdminProductTag } from '@medusajs/framework/types'

import { AutoTranslateButton } from '../common'
import { useTranslationContext } from '../../contexts'
import { ProductTagTranslationFormFields } from '../../hooks/form-props'
import { useAutoTranslateFields } from '../../../../../hooks/api'

interface AutoTranslateProductTagProps {
  form: UseFormReturn<ProductTagTranslationFormFields>
}

export const AutoTranslateProductTag: React.FC<
  AutoTranslateProductTagProps
> = ({ form }) => {
  const { mutateAsync, isPending } = useAutoTranslateFields()
  const { entity: productType, storeLocale } =
    useTranslationContext<AdminProductTag>()

  const handleTranslateProductType = async () => {
    if (!productType || !storeLocale) return
    try {
      const data = {
        toLocale: storeLocale.code,
        fields: [
          {
            name: 'value',
            value: productType.value,
          },
        ],
      }

      const { translations } = await mutateAsync(data)
      for (const field of translations) {
        form.setValue(field.name as any, field.value)
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to translate productType')
    }
  }

  return (
    <AutoTranslateButton
      isLoading={isPending}
      onClick={handleTranslateProductType}
    />
  )
}
