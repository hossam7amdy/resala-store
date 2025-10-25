import React, { useEffect } from 'react'
import { Text, Button, Label, Container } from '@medusajs/ui'
import { UseFormReturn } from 'react-hook-form'
import { AdminProduct } from '@medusajs/framework/types'

import { useTranslationContext } from '../../contexts'
import type { ProductTranslationFormFields } from '../../hooks/form-props'
import { AutoTranslateProduct } from './auto-translate-product'
import {
  TranslationInput,
  TranslationTextarea,
  EntityTranslationEditor,
} from '../common'
import { toHandle } from '../../../../../utils/to-handle'
import { Form } from '../../../../../components/common/form'

interface ProductTranslationEditorProps {
  form: UseFormReturn<ProductTranslationFormFields>
}

export const ProductTranslationEditor: React.FC<
  ProductTranslationEditorProps
> = ({ form }) => {
  const {
    entity: product,
    storeLocale,
    translation,
    isLoading,
  } = useTranslationContext<AdminProduct>()
  const watchedTitle = form.watch('title')

  useEffect(() => {
    form.setValue('handle', toHandle(watchedTitle, storeLocale?.code))
  }, [watchedTitle, storeLocale?.code, form])

  useEffect(() => {
    form.reset({
      id: translation?.id,
      title: translation?.title || '',
      handle: translation?.handle || '',
      subtitle: translation?.subtitle || '',
      description: translation?.description || '',
      options:
        translation?.options?.map((option: any) => ({
          id: option?.id,
          option_id: option.option_id,
          title: option.title || '',
          metadata: option.metadata || null,
          values:
            option.values?.map((value: any) => ({
              id: value?.id,
              option_value_id: value.option_value_id,
              value: value.value || '',
              metadata: value.metadata,
            })) || [],
        })) || [],
    })
  }, [form, translation])

  const initializeOptionsFromProduct = () => {
    if (!product?.options) return

    const newOptions = product.options.map(
      (option: { id: string; values?: Array<{ id: string }> }) => ({
        option_id: option.id,
        title: '',
        metadata: null,
        values:
          option.values?.map((value) => ({
            option_value_id: value.id,
            value: '',
            metadata: null,
          })) || [],
      })
    )

    form.setValue('options', newOptions, { shouldDirty: true })
  }

  const formData = form.watch()

  return (
    <EntityTranslationEditor<AdminProduct>
      entity={product}
      isLoading={isLoading}
      title="Translation Editor"
      subtitle="Product details"
      emptyMessage="Select product and language to start translating"
      autoTranslateButton={<AutoTranslateProduct form={form} />}
      skeletonCount={7}
      isUpdating={!!formData?.id}
    >
      <div className="space-y-8">
        {/* Product Details Section */}
        <div className="space-y-6">
          <Form.Field
            name="title"
            render={({ field }) => (
              <Form.Item>
                <TranslationInput
                  autoFocus
                  label="Title"
                  originalValue={product?.title || ''}
                  placeholder="Enter translated title"
                  {...field}
                />
                <Form.ErrorMessage />
              </Form.Item>
            )}
          />

          <Form.Field
            name="handle"
            render={({ field }) => (
              <Form.Item>
                <TranslationInput
                  label="Handle"
                  originalValue={product?.handle || ''}
                  placeholder="enter-translated-handle"
                  {...field}
                />
                <Form.ErrorMessage />
              </Form.Item>
            )}
          />

          <Form.Field
            name="subtitle"
            render={({ field }) => (
              <Form.Item>
                <TranslationInput
                  label="Subtitle"
                  originalValue={product?.subtitle || ''}
                  placeholder="Enter translated subtitle"
                  {...field}
                />
                <Form.ErrorMessage />
              </Form.Item>
            )}
          />

          <Form.Field
            name="description"
            render={({ field }) => (
              <Form.Item>
                <TranslationTextarea
                  rows={4}
                  label="Description"
                  originalValue={product?.description || ''}
                  placeholder="Enter translated description"
                  {...field}
                />
                <Form.ErrorMessage />
              </Form.Item>
            )}
          />
        </div>

        {/* Product Options Section */}
        {product?.options && product.options.length > 0 && (
          <div className="space-y-6">
            <div className="border-b pb-2 flex items-center justify-between">
              <Text size="small">Product Options</Text>
              {formData.options.length === 0 && (
                <Button
                  size="small"
                  variant="secondary"
                  onClick={initializeOptionsFromProduct}
                  type="button"
                >
                  Initialize Options
                </Button>
              )}
            </div>

            {formData.options.length > 0 ? (
              <div className="space-y-6">
                {formData.options.map((option, optionIndex) => {
                  const originalOption = product.options?.find(
                    (opt: {
                      id: string
                      title?: string
                      values?: Array<{ id: string; value?: string }>
                    }) => opt.id === option.option_id
                  )

                  return (
                    <Container key={option.option_id} className="p-4">
                      <div className="space-y-4">
                        <Form.Field
                          name={`options.${optionIndex}.title` as const}
                          render={({ field }) => (
                            <Form.Item>
                              <TranslationInput
                                originalValue={originalOption?.title || ''}
                                label={`Option: ${originalOption?.title || 'Unknown'}`}
                                placeholder={`Translated ${originalOption?.title || 'option'}`}
                                {...field}
                              />
                              <Form.ErrorMessage />
                            </Form.Item>
                          )}
                        />

                        {/* Option Values */}
                        {option.values && option.values.length > 0 && (
                          <div>
                            <div className="flex items-center justify-between">
                              <Label>Option Values</Label>
                            </div>
                            <div className="space-y-1">
                              {option.values.map((value, valueIndex) => {
                                const originalValue =
                                  originalOption?.values?.find(
                                    (val: { id: string; value?: string }) =>
                                      val.id === value.option_value_id
                                  )

                                return (
                                  <Form.Field
                                    key={value.option_value_id}
                                    name={
                                      `options.${optionIndex}.values.${valueIndex}.value` as const
                                    }
                                    render={({ field }) => (
                                      <Form.Item>
                                        <TranslationInput
                                          size="small"
                                          originalValue={
                                            originalValue?.value || ''
                                          }
                                          placeholder={`Translated ${originalValue?.value || 'value'}`}
                                          {...field}
                                        />
                                        <Form.ErrorMessage />
                                      </Form.Item>
                                    )}
                                  />
                                )
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </Container>
                  )
                })}
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500 border-2 border-dashed rounded-lg">
                <Text className="text-sm mb-2">
                  This product has {product.options.length} option(s)
                </Text>
                <Text className="text-xs text-gray-400">
                  Click &quot;Initialize Options&quot; to start translating them
                </Text>
              </div>
            )}
          </div>
        )}
      </div>
    </EntityTranslationEditor>
  )
}
