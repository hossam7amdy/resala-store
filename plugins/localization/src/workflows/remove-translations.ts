import {
  createWorkflow,
  WorkflowData,
  WorkflowResponse,
  transform,
} from '@medusajs/framework/workflows-sdk'
import { useQueryGraphStep } from '@medusajs/medusa/core-flows'
import type { AdminRemoveTranslations } from '../types'
import { queryTranslationsToRemoveStep } from './steps/query-translations-to-remove'
import { deleteTranslationsStep } from './steps/delete-translations'
import { validateLanguagesExistStep } from './steps/validate-languages-exist'

export type RemoveTranslationsWorkflowInput = AdminRemoveTranslations

export type RemoveTranslationsWorkflowOutput = {
  deleted_ids: string[]
  deleted_count: number
}

export const removeTranslationsWorkflowId = 'remove-translations-workflow'

export const removeTranslationsWorkflow = createWorkflow(
  removeTranslationsWorkflowId,
  (
    input: WorkflowData<RemoveTranslationsWorkflowInput>
  ): WorkflowResponse<RemoveTranslationsWorkflowOutput> => {
    const { data: languages } = useQueryGraphStep({
      entity: 'language',
      fields: ['id', 'code'],
      filters: {
        code: input.locale,
      },
    }).config({ name: 'query-languages-step' })

    validateLanguagesExistStep({
      locales: [input.locale],
      languages,
    })

    useQueryGraphStep({
      entity: input.resource_type,
      fields: ['id'],
      filters: {
        id: input.resource_id,
      },
      options: {
        throwIfKeyNotFound: true,
      },
    }).config({ name: 'validate-resource-exists-step' })

    const languageId = transform({ languages }, ({ languages }) => {
      return languages[0].id
    })

    const translationsToRemove = queryTranslationsToRemoveStep({
      resource_id: input.resource_id,
      resource_type: input.resource_type,
      language_id: languageId,
    })

    const result = deleteTranslationsStep({
      translations: translationsToRemove,
    })

    return new WorkflowResponse(result)
  }
)
