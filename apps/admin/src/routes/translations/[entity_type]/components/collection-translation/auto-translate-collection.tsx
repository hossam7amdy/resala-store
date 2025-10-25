import React from 'react'
import { toast } from '@medusajs/ui'
import { UseFormReturn } from 'react-hook-form'
import { AdminCollection } from '@medusajs/framework/types'

import { AutoTranslateButton } from '../common'
import { useTranslationContext } from '../../contexts'
import { CollectionTranslationFormFields } from '../../hooks/form-props'
import { useAutoTranslateFields } from '../../../../../hooks/api'

interface AutoTranslateCollectionProps {
  form: UseFormReturn<CollectionTranslationFormFields>
}

export const AutoTranslateCollection: React.FC<
  AutoTranslateCollectionProps
> = ({ form }) => {
  const { mutateAsync, isPending } = useAutoTranslateFields()
  const { entity: collection, storeLocale } =
    useTranslationContext<AdminCollection>()

  const handleTranslateCollection = async () => {
    if (!collection || !storeLocale) return
    try {
      const data = {
        toLocale: storeLocale.code,
        fields: [
          {
            name: 'title',
            value: collection.title,
          },
        ],
      }

      const { translations } = await mutateAsync(data)
      for (const field of translations) {
        form.setValue(field.name as any, field.value)
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to translate collection')
    }
  }

  return (
    <AutoTranslateButton
      isLoading={isPending}
      onClick={handleTranslateCollection}
    />
  )
}
