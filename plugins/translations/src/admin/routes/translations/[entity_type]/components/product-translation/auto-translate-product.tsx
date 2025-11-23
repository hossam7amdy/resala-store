import React from 'react'
import { toast } from '@medusajs/ui'
import { UseFormReturn } from 'react-hook-form'
import { AdminProduct } from '@medusajs/framework/types'

import { useTranslationContext } from '../../contexts'
import { AutoTranslateButton } from '../common/auto-translate-button'
import { useAutoTranslateFields } from '../../../../../hooks/api'

const TO_TRANSLATE_NAMES = ['title', 'subtitle', 'description'] as const

interface AutoTranslateProductProps {
  form: UseFormReturn<any>
}

export const AutoTranslateProduct: React.FC<AutoTranslateProductProps> = ({
  form,
}) => {
  const { entity: product, storeLanguage } =
    useTranslationContext<AdminProduct>()
  const { mutateAsync, isPending } = useAutoTranslateFields()

  const handleTranslateProduct = async () => {
    if (!product || !storeLanguage) return
    try {
      const data = {
        toLocale: storeLanguage.code,
        fields: TO_TRANSLATE_NAMES.filter((name) => !!product[name]).map(
          (name) => ({
            name,
            value: product[name] as string,
          })
        ),
      }

      const { translations } = await mutateAsync(data)

      for (const field of translations) {
        form.setValue(field.name, field.value)
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to translate collection')
    }
  }

  return (
    <AutoTranslateButton
      isLoading={isPending}
      onClick={handleTranslateProduct}
    />
  )
}
