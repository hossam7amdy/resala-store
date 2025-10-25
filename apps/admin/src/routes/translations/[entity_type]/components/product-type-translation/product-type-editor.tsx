import React, { useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import type { AdminProductType } from '@medusajs/framework/types'

import { TranslationInput, EntityTranslationEditor } from '../common'
import { ProductTypeTranslationFormFields } from '../../hooks/form-props'
import { AutoTranslateProductType } from './auto-translate-product-type'
import { useTranslationContext } from '../../contexts'
import { Form } from '../../../../../components/common/form'

interface ProductTypeTranslationEditorProps {
  form: UseFormReturn<ProductTypeTranslationFormFields>
}

export const ProductTypeTranslationEditor: React.FC<
  ProductTypeTranslationEditorProps
> = ({ form }) => {
  const {
    entity: productType,
    translation,
    storeLocale,
    isLoading,
  } = useTranslationContext<AdminProductType>()

  useEffect(() => {
    form.reset({
      id: translation?.id,
      value: translation?.value || '',
      metadata: translation?.metadata || null,
    })
  }, [form, translation])

  const watchedId = form.watch('id')

  return (
    <EntityTranslationEditor<AdminProductType>
      entity={productType}
      isLoading={isLoading}
      title="Translation Editor"
      subtitle="Product Type Details"
      emptyMessage="Select product type and language to start translating"
      autoTranslateButton={<AutoTranslateProductType form={form} />}
      skeletonCount={3}
      isUpdating={!!watchedId}
    >
      <div className="space-y-4">
        <Form.Field
          name="value"
          render={({ field }) => (
            <TranslationInput
              autoFocus
              label="Type Value"
              originalValue={productType?.value || ''}
              placeholder={`Enter value in ${storeLocale?.name}`}
              {...field}
            />
          )}
        />
      </div>
    </EntityTranslationEditor>
  )
}
