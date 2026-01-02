import { createStep, StepResponse } from '@medusajs/framework/workflows-sdk'
import { LOCALIZATION_MODULE } from '../../modules/localization'
import type { LocalizationModuleService } from '../../modules/localization/services'

type DeleteLanguageStepInput = {
  code: string
}

const deleteLanguageStepId = 'delete-language-step'

export const deleteLanguageStep = createStep(
  deleteLanguageStepId,
  async (input: DeleteLanguageStepInput, { container }) => {
    const localizationService =
      container.resolve<LocalizationModuleService>(LOCALIZATION_MODULE)

    const originalLanguages = await localizationService.listLanguages({
      code: input.code,
    })

    const deletedLanguages = await localizationService.deleteLanguages(
      originalLanguages.map((lang) => lang.id)
    )

    return new StepResponse(deletedLanguages, originalLanguages)
  },
  async (originalLanguages, { container }) => {
    if (!originalLanguages || originalLanguages.length === 0) {
      return
    }

    const localizationService =
      container.resolve<LocalizationModuleService>(LOCALIZATION_MODULE)

    const restoreUpdates = originalLanguages.map((lang) => ({
      code: lang.code,
      is_default: lang.is_default,
      is_published: lang.is_published,
      metadata: lang.metadata,
    }))

    await localizationService.updateLanguages(restoreUpdates)
  }
)
