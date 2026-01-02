import {
  WorkflowData,
  createWorkflow,
  WorkflowResponse,
} from '@medusajs/framework/workflows-sdk'
import { useQueryGraphStep } from '@medusajs/medusa/core-flows'
import { deleteLanguageStep } from './steps/delete-language'
import { validateNotDeletingDefaultLanguagesStep } from './steps/validate-not-default-language'
import { validateNotDeletingPublishedLanguagesStep } from './steps/validate-not-published-language'

export type DeleteLanguageWorkflowInput = {
  code: string
}

export type DeleteLanguageWorkflowOutput = {
  success: boolean
}

export const deleteLanguageWorkflowId = 'delete-language-workflow-id'

export const deleteLanguageWorkflow = createWorkflow(
  deleteLanguageWorkflowId,
  (
    input: WorkflowData<DeleteLanguageWorkflowInput>
  ): WorkflowResponse<DeleteLanguageWorkflowOutput> => {
    const { data: languages } = useQueryGraphStep({
      entity: 'language',
      fields: ['id', 'code', 'is_published', 'is_default'],
      filters: {
        code: input.code,
      },
    }).config({ name: 'validate-languages-exist-step' })

    validateNotDeletingDefaultLanguagesStep({ languages })

    validateNotDeletingPublishedLanguagesStep({ languages })

    deleteLanguageStep({
      code: input.code,
    })

    return new WorkflowResponse({
      success: true,
    })
  }
)
