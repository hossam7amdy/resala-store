import { LocaleDTO } from '@repo/shared-types'
import {
  WorkflowData,
  createWorkflow,
  WorkflowResponse,
  transform,
} from '@medusajs/framework/workflows-sdk'
import { useQueryGraphStep } from '@medusajs/medusa/core-flows'
import { updateStoreLocaleStep } from './steps/update-store-locale'

const updateStoreLocaleWorkflowId = 'update-store-locale-workflow'

export type UpdateStoreLocaleWorkflowInput = Pick<
  LocaleDTO,
  'id' | 'store_id'
> & {
  is_default?: boolean
  is_published?: boolean
}
export type UpdateStoreLocaleWorkflowOutput = LocaleDTO

export const updateStoreLocaleWorkflow = createWorkflow(
  updateStoreLocaleWorkflowId,
  (
    input: WorkflowData<UpdateStoreLocaleWorkflowInput>
  ): WorkflowResponse<UpdateStoreLocaleWorkflowOutput> => {
    const { data } = useQueryGraphStep({
      entity: 'store_locales',
      fields: ['id', 'is_default'],
      filters: {
        store_id: input.store_id,
        is_default: true,
      },
    })

    const transformedInput = transform(
      { input, defaultStoreLocales: data },
      ({ input, defaultStoreLocales }) => {
        if (input.is_default) {
          const toRemoveDefault = defaultStoreLocales
            .filter((storeLocale) => storeLocale.id !== input.id)
            .map((storeLocale) => ({ ...storeLocale, is_default: false }))
          return [input, ...toRemoveDefault]
        }
        return [input]
      }
    )

    const storeLocale = updateStoreLocaleStep(transformedInput)

    return new WorkflowResponse(storeLocale[0])
  }
)
