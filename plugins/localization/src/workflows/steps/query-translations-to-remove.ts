import { createStep, StepResponse } from '@medusajs/framework/workflows-sdk'
import { LOCALIZATION_MODULE } from '../../modules/localization'
import type { LocalizationModuleService } from '../../modules/localization/services'
import type { InferTypeOf } from '@medusajs/framework/types'
import { Translation } from '../../modules/localization/models'

type QueryTranslationsToRemoveStepInput = {
  resource_id: string
  resource_type: string
  language_id: string
}

const queryTranslationsToRemoveStepId = 'query-translations-to-remove-step'

export const queryTranslationsToRemoveStep = createStep(
  queryTranslationsToRemoveStepId,
  async (
    input: QueryTranslationsToRemoveStepInput,
    { container }
  ): Promise<StepResponse<InferTypeOf<typeof Translation>[]>> => {
    const localizationService: LocalizationModuleService =
      container.resolve(LOCALIZATION_MODULE)

    const translations = await localizationService.listTranslations(
      {
        resource_id: input.resource_id,
        resource_type: input.resource_type,
        language_id: input.language_id,
      },
      {
        select: [
          'id',
          'resource_id',
          'resource_type',
          'language_id',
          'field',
          'value',
          'is_outdated',
        ],
      }
    )

    return new StepResponse(translations)
  }
)
