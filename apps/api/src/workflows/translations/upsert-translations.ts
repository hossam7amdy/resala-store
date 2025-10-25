import {
  createWorkflow,
  WorkflowResponse,
} from '@medusajs/framework/workflows-sdk'
import { upsertTranslationsStep } from './steps/upsert-translations'
import { useQueryGraphStep } from '@medusajs/medusa/core-flows'
import type { TranslationDTO } from '@repo/shared-types'

export type UpsertTranslationsWorkflowInput = TranslationDTO<any>

export type UpsertTranslationsWorkflowOutput = Array<{
  id: string
}>

export const upsertTranslationsWorkflowId = 'upsert-translations-workflow'

export const upsertTranslationsWorkflow = createWorkflow(
  upsertTranslationsWorkflowId,
  (
    input: UpsertTranslationsWorkflowInput
  ): WorkflowResponse<UpsertTranslationsWorkflowOutput> => {
    useQueryGraphStep({
      entity: input.entity_type,
      fields: ['id'],
      filters: {
        id: input.entity_id,
      },
      options: {
        throwIfKeyNotFound: true,
      },
    })

    const translations = upsertTranslationsStep(input)

    return new WorkflowResponse(translations)
  }
)
