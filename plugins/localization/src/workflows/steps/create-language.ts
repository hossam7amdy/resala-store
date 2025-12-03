import { createStep, StepResponse } from '@medusajs/framework/workflows-sdk'
import { LOCALIZATION_MODULE } from '../../modules/localization'
import type { LocalizationModuleService } from '../../modules/localization/services'
import { AdminCreateLanguage } from '../../types'

type CreateLanguagesStepInput = AdminCreateLanguage

const createLanguageStepId = 'create-language-step'

export const createLanguagesStep = createStep(
  createLanguageStepId,
  async (input: CreateLanguagesStepInput, { container }) => {
    const localizationService: LocalizationModuleService =
      container.resolve(LOCALIZATION_MODULE)

    const newLanguage = await localizationService.createLanguages(input)

    return new StepResponse(newLanguage)
  }
)
