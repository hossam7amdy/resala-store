import { createStep, StepResponse } from '@medusajs/framework/workflows-sdk'
import { LOCALIZATION_MODULE } from '../../modules/localization'
import type { LocalizationModuleService } from '../../modules/localization/services'

type QueryExistingTranslationsStepInput = {
  resource_id: string
  resource_type: string
  languageCodes: string[]
  fields: string[]
}

const queryExistingTranslationsStepId = 'query-existing-translations-step'

export const queryExistingTranslationsStep = createStep(
  queryExistingTranslationsStepId,
  async (input: QueryExistingTranslationsStepInput, { container }) => {
    const localizationService: LocalizationModuleService =
      container.resolve(LOCALIZATION_MODULE)

    const existingTranslations = await localizationService.listTranslations(
      {
        resource_id: input.resource_id,
        resource_type: input.resource_type,
        language: {
          code: input.languageCodes,
        },
        field: input.fields,
      },
      {
        select: [
          'id',
          'language_id',
          'resource_id',
          'resource_type',
          'field',
          'value',
          'is_outdated',
        ],
        relations: ['language'],
      }
    )

    return new StepResponse(existingTranslations)
  }
)
