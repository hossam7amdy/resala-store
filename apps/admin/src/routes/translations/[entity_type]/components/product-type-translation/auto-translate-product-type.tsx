import React from 'react'
import { toast } from '@medusajs/ui'
import { UseFormReturn } from 'react-hook-form'
import { AdminProductType } from '@medusajs/framework/types'

import { AutoTranslateButton } from '../common'
import { useTranslationContext } from '../../contexts'
import { ProductTypeTranslationFormFields } from '../../hooks/form-props'
import { useAutoTranslateFields } from '../../../../../hooks/api'

interface AutoTranslateProductTypeProps {
  form: UseFormReturn<ProductTypeTranslationFormFields>
}

export const AutoTranslateProductType: React.FC<
  AutoTranslateProductTypeProps
> = ({ form }) => {
  const { mutateAsync, isPending } = useAutoTranslateFields()
  const { entity: productType, storeLocale } =
    useTranslationContext<AdminProductType>()

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
