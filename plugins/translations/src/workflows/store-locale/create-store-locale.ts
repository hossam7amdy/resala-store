import { AdminStoreLocale } from '../../types'
import {
  WorkflowData,
  createWorkflow,
  WorkflowResponse,
  transform,
} from '@medusajs/framework/workflows-sdk'
import { useQueryGraphStep } from '@medusajs/medusa/core-flows'
import { createStoreLocaleStep } from './steps/create-store-locale'

const createStoreLocaleWorkflowId = 'create-store-locale-workflow'

const checkStoreExistStep = (store_id: string) => {
  return useQueryGraphStep({
    entity: 'store',
    fields: ['id'],
    filters: {
      id: store_id,
    },
    options: {
      throwIfKeyNotFound: true,
    },
  }).config({ name: 'fetch-store-id' })
}

export type CreateStoreLocaleWorkflowInput = Omit<
  AdminStoreLocale,
  'id' | 'created_at' | 'updated_at' | 'deleted_at'
>
export type CreateStoreLocaleWorkflowOutput = AdminStoreLocale

export const createStoreLocaleWorkflow = createWorkflow(
  createStoreLocaleWorkflowId,
  (
    input: WorkflowData<CreateStoreLocaleWorkflowInput>
  ): WorkflowResponse<CreateStoreLocaleWorkflowOutput> => {
    checkStoreExistStep(input.store_id)

    // Query for existing store locales
    const { data: storeLocales } = useQueryGraphStep({
      entity: 'store_locales',
      fields: ['id', 'is_default'],
      filters: {
        store_id: input.store_id,
        is_default: true,
      },
    })

    // Use transform to set is_default if no locales exist
    const storeLocaleInput = transform(
      { input, storeLocales },
      ({ input, storeLocales }) => ({
        ...input,
        is_default: storeLocales.length === 0,
        is_published: input.is_published || storeLocales.length === 0,
      })
    )

    const storeLocale = createStoreLocaleStep(storeLocaleInput)

    return new WorkflowResponse(storeLocale)
  }
)
