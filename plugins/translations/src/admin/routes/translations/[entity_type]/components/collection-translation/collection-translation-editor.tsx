import React, { useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import type { AdminCollection } from '@medusajs/framework/types'

import { AutoTranslateCollection } from './auto-translate-collection'
import { TranslationInput, EntityTranslationEditor } from '../common'
import { CollectionTranslationFormFields } from '../../hooks/form-props'
import { useTranslationContext } from '../../contexts'
import { toHandle } from '../../../../../utils/to-handle'
import { Form } from '../../../../../components/common/form'

interface CollectionTranslationEditorProps {
  form: UseFormReturn<CollectionTranslationFormFields>
}

export const CollectionTranslationEditor: React.FC<
  CollectionTranslationEditorProps
> = ({ form }) => {
  const {
    entity: collection,
    translation,
    storeLanguage,
    isLoading,
  } = useTranslationContext<AdminCollection>()

  useEffect(() => {
    form.reset({
      id: translation?.id,
      title: translation?.title || '',
      handle: translation?.handle || '',
      metadata: translation?.metadata || null,
    })
  }, [form, translation])

  const watchedId = form.watch('id')
  const watchedTitle = form.watch('title')

  useEffect(() => {
    form.setValue('handle', toHandle(watchedTitle, storeLanguage?.code))
  }, [watchedTitle, storeLanguage?.code, form])

  return (
    <EntityTranslationEditor<AdminCollection>
      entity={collection}
      isLoading={isLoading}
      title="Translation Editor"
      subtitle="Collection Details"
      emptyMessage="Select collection and language to start translating"
      autoTranslateButton={<AutoTranslateCollection form={form} />}
      skeletonCount={3}
      isUpdating={!!watchedId}
    >
      <div className="space-y-4">
        <Form.Field
          name="title"
          render={({ field }) => (
            <TranslationInput
              autoFocus
              label="Title"
              originalValue={collection?.title || ''}
              placeholder={`Enter title in ${storeLanguage?.name}`}
              {...field}
            />
          )}
        />

        <Form.Field
          name="handle"
          render={({ field }) => (
            <TranslationInput
              label="Handle"
              originalValue={collection?.handle || ''}
              placeholder={`Enter handle in ${storeLanguage?.name}`}
              {...field}
            />
          )}
        />
      </div>
    </EntityTranslationEditor>
  )
}
