import React, { useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import type { AdminProductTag } from '@medusajs/framework/types'

import { TranslationInput, EntityTranslationEditor } from '../common'
import { ProductTagTranslationFormFields } from '../../hooks/form-props'
import { AutoTranslateProductTag } from './auto-translate-product-tag'
import { useTranslationContext } from '../../contexts'
import { Form } from '../../../../../components/common/form'

interface ProductTagTranslationEditorProps {
  form: UseFormReturn<ProductTagTranslationFormFields>
}

export const ProductTagTranslationEditor: React.FC<
  ProductTagTranslationEditorProps
> = ({ form }) => {
  const {
    entity: productTag,
    translation,
    storeLanguage,
    isLoading,
  } = useTranslationContext<AdminProductTag>()

  useEffect(() => {
    form.reset({
      id: translation?.id,
      value: translation?.value || '',
      metadata: translation?.metadata || null,
    })
  }, [form, translation])

  const watchedId = form.watch('id')

  return (
    <EntityTranslationEditor<AdminProductTag>
      entity={productTag}
      isLoading={isLoading}
      title="Translation Editor"
      subtitle="Product Tag Details"
      emptyMessage="Select product tag and language to start translating"
      autoTranslateButton={<AutoTranslateProductTag form={form} />}
      skeletonCount={3}
      isUpdating={!!watchedId}
    >
      <div className="space-y-4">
        <Form.Field
          name="value"
          render={({ field }) => (
            <TranslationInput
              autoFocus
              label="Tag Value"
              originalValue={productTag?.value || ''}
              placeholder={`Enter value in ${storeLanguage?.name}`}
              {...field}
            />
          )}
        />
      </div>
    </EntityTranslationEditor>
  )
}
