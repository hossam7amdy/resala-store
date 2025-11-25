import {
  createWorkflow,
  WorkflowData,
  WorkflowResponse,
} from '@medusajs/framework/workflows-sdk'
import { useQueryGraphStep } from '@medusajs/medusa/core-flows'
import { autoTranslateFieldsStep } from './steps/auto-translate-fields'
import { AutoTranslateFieldDTO } from '../../types'

const autoTranslateFieldsWorkflowId = 'auto-translate-fields-workflow'

export type AutoTranslateFieldsWorkflowInput = {
  toLocale: string
  fields: AutoTranslateFieldDTO[]
}
type AutoTranslateFieldWorkflowOutput =
  AutoTranslateFieldsWorkflowInput['fields']

export const autoTranslateFieldsWorkflow = createWorkflow(
  autoTranslateFieldsWorkflowId,
  (
    input: WorkflowData<AutoTranslateFieldsWorkflowInput>
  ): WorkflowResponse<AutoTranslateFieldWorkflowOutput> => {
    useQueryGraphStep({
      entity: 'store_locale',
      fields: ['id', 'code'],
      filters: {
        code: input.toLocale,
      },
      options: {
        throwIfRelationNotFound: true,
      },
    })

    const translatedFields = autoTranslateFieldsStep(input)

    return new WorkflowResponse(translatedFields)
  }
)
