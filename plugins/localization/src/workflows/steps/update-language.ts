import { createStep, StepResponse } from '@medusajs/framework/workflows-sdk'
import { LOCALIZATION_MODULE } from '../../modules/localization'
import type { LocalizationModuleService } from '../../modules/localization/services'
import type { MetadataType } from '@medusajs/types'

type UpdateLanguageStepInput = {
  id: string
  is_default?: boolean
  is_published?: boolean
  metadata?: MetadataType
}

const updateLanguageStepId = 'update-language-step'

export const updateLanguageStep = createStep(
  updateLanguageStepId,
  async (input: UpdateLanguageStepInput, { container }) => {
    const localizationService: LocalizationModuleService =
      container.resolve(LOCALIZATION_MODULE)

    const updatedLanguage = await localizationService.updateLanguages(input)

    return new StepResponse(updatedLanguage, input)
  },
  async (originalLanguage, { container }) => {
    if (!originalLanguage) {
      return
    }

    const localizationService: LocalizationModuleService =
      container.resolve(LOCALIZATION_MODULE)

    await localizationService.updateLanguages(originalLanguage)
  }
)
