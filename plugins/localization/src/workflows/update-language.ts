import type { InferTypeOf } from '@medusajs/framework/types'
import type { MetadataType } from '@medusajs/types'
import {
  when,
  transform,
  WorkflowData,
  createWorkflow,
  WorkflowResponse,
} from '@medusajs/framework/workflows-sdk'
import { useQueryGraphStep } from '@medusajs/medusa/core-flows'
import { validateUpdateHasFieldsStep } from './steps/validate-update-has-fields'
import { updateLanguageStep } from './steps/update-language'
import { Language } from '../modules/localization/models'
import { validateLastPublishedLanguageStep } from './steps/validate-last-published-language'
import { toggleOtherDefaultsStep } from './steps/toggle-default'

export type UpdateLanguageWorkflowInput = {
  id: string
  is_default?: boolean
  is_published?: boolean
  metadata?: MetadataType
}

export type UpdateLanguageWorkflowOutput = {
  language: InferTypeOf<typeof Language>
}

export const updateLanguageWorkflowId = 'update-language-workflow-id'

export const updateLanguageWorkflow = createWorkflow(
  updateLanguageWorkflowId,
  (
    input: WorkflowData<UpdateLanguageWorkflowInput>
  ): WorkflowResponse<UpdateLanguageWorkflowOutput> => {
    validateUpdateHasFieldsStep({
      is_default: input.is_default,
      is_published: input.is_published,
      metadata: input.metadata,
    })

    const { data: languages } = useQueryGraphStep({
      entity: 'language',
      fields: ['id', 'code', 'is_published', 'is_default'],
      filters: {
        id: input.id,
      },
      options: {
        throwIfKeyNotFound: true,
      },
    }).config({ name: 'validate-language-exist-step' })

    const language = transform(languages, (languages) => languages[0])

    validateLastPublishedLanguageStep({
      language,
    })

    when(input, (input) => {
      return !!input.is_default
    }).then(() => {
      return toggleOtherDefaultsStep(language)
    })

    const updatedLanguage = updateLanguageStep(input)

    return new WorkflowResponse({
      language: updatedLanguage,
    })
  }
)
