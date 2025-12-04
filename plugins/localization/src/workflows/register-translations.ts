import {
  createWorkflow,
  WorkflowData,
  WorkflowResponse,
  transform,
} from '@medusajs/framework/workflows-sdk'
import { useQueryGraphStep } from '@medusajs/medusa/core-flows'
import type { AdminRegisterTranslations } from '../types'
import { validateLanguagesExistStep } from './steps/validate-languages-exist'
import { queryExistingTranslationsStep } from './steps/query-existing-translations'
import { upsertTranslationsStep } from './steps/upsert-translations'

export type RegisterTranslationsWorkflowInput = AdminRegisterTranslations

export type RegisterTranslationsWorkflowOutput = {
  translations: Array<{ id: string }>
}

export const registerTranslationsWorkflowId = 'register-translations-workflow'

export const registerTranslationsWorkflow = createWorkflow(
  registerTranslationsWorkflowId,
  (
    input: WorkflowData<RegisterTranslationsWorkflowInput>
  ): WorkflowResponse<RegisterTranslationsWorkflowOutput> => {
    const locales = transform({ input }, ({ input }) => {
      return [...new Set(input.translations.map((t) => t.locale))]
    })

    const { data: languages } = useQueryGraphStep({
      entity: 'language',
      fields: ['id', 'code'],
      filters: {
        code: locales,
      },
    }).config({ name: 'query-languages-step' })

    validateLanguagesExistStep({
      locales,
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

    const fields = transform({ input }, ({ input }) => {
      return input.translations.map((t) => t.field)
    })

    const existingTranslations = queryExistingTranslationsStep({
      resource_id: input.resource_id,
      resource_type: input.resource_type,
      languageCodes: locales,
      fields,
    })

    const upsertedTranslations = upsertTranslationsStep({
      input,
      languages,
      existingTranslations,
    })

    return new WorkflowResponse({
      translations: upsertedTranslations,
    })
  }
)
