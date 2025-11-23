import { StoreLocale } from '../../types'
import {
  WorkflowData,
  createWorkflow,
  WorkflowResponse,
  transform,
} from '@medusajs/framework/workflows-sdk'
import { useQueryGraphStep } from '@medusajs/medusa/core-flows'
import { deleteStoreLocaleStep } from './steps/delete-store-locale'
import { MedusaError } from '@medusajs/framework/utils'

const deleteStoreLocaleWorkflowId = 'delete-store-locale-workflow'

export type DeleteStoreLocaleWorkflowInput = Pick<
  StoreLocale,
  'id' | 'store_id'
>
export type DeleteStoreLocaleWorkflowOutput = {
  id: string
}

export const deleteStoreLocaleWorkflow = createWorkflow(
  deleteStoreLocaleWorkflowId,
  (
    input: WorkflowData<DeleteStoreLocaleWorkflowInput>
  ): WorkflowResponse<DeleteStoreLocaleWorkflowOutput> => {
    const { data } = useQueryGraphStep({
      entity: 'store_locales',
      fields: ['id', 'is_default'],
      filters: {
        id: input.id,
        store_id: input.store_id,
      },
      options: {
        throwIfKeyNotFound: true,
      },
    })

    const updatedInput = transform(
      { input, storeLocale: data[0] },
      ({ input, storeLocale }) => {
        if (storeLocale.is_default) {
          throw new MedusaError(
            MedusaError.Types.CONFLICT,
            `Default store locale cannot be deleted.`
          )
        }
        return { ...storeLocale, ...input }
      }
    )

    const deletedId = deleteStoreLocaleStep(updatedInput)

    return new WorkflowResponse(deletedId)
  }
)
