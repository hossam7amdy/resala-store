import type { InferTypeOf } from '@medusajs/framework/types'
import {
  WorkflowData,
  createWorkflow,
  WorkflowResponse,
} from '@medusajs/framework/workflows-sdk'
import { Language } from '../modules/localization/models'
import { AdminCreateLanguage } from '../types'
import { createLanguagesStep } from './steps/create-language'
import { useQueryGraphStep } from '@medusajs/medusa/core-flows'
import { validateLanguageExistStep } from './steps/validate-language-exist'

export type CreateLanguageWorkflowInput = AdminCreateLanguage

export type CreateLanguageWorkflowOutput = {
  language: InferTypeOf<typeof Language>
}

export const createLanguageWorkflowId = 'create-language-workflow-id'

export const createLanguageWorkflow = createWorkflow(
  createLanguageWorkflowId,
  (
    input: WorkflowData<CreateLanguageWorkflowInput>
  ): WorkflowResponse<CreateLanguageWorkflowOutput> => {
    const { data: languages } = useQueryGraphStep({
      entity: 'language',
      fields: ['id', 'code'],
      filters: {
        code: input.code,
      },
    })

    validateLanguageExistStep({
      languages,
      code: input.code,
    })

    const newLanguage = createLanguagesStep(input)

    return new WorkflowResponse({
      language: newLanguage,
    })
  }
)
