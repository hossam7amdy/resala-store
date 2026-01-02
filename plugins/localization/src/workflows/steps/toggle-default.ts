import { createStep, StepResponse } from '@medusajs/framework/workflows-sdk'
import type { InferTypeOf } from '@medusajs/framework/types'
import { Language } from '../../modules/localization/models'
import { LocalizationModuleService } from '../../modules/localization/services'
import { LOCALIZATION_MODULE } from '../../modules/localization'

type ToggleOtherDefaultsStepInput = {
  language: InferTypeOf<typeof Language>
}

const toggleOtherDefaultsStepId = 'toggle-other-defaults-step'

export const toggleOtherDefaultsStep = createStep(
  toggleOtherDefaultsStepId,
  async (input: ToggleOtherDefaultsStepInput, { container }) => {
    const service =
      container.resolve<LocalizationModuleService>(LOCALIZATION_MODULE)

    const defaultLanguages = await service.listLanguages(
      {
        is_default: true,
      },
      {
        select: ['id', 'is_default'],
      }
    )

    const updatedLanguages = await service.updateLanguages(
      defaultLanguages.map((lang) => ({
        id: lang.id,
        is_default: false,
      }))
    )

    return new StepResponse(updatedLanguages, defaultLanguages)
  },
  async (defaultLanguages, { container }) => {
    const service =
      container.resolve<LocalizationModuleService>(LOCALIZATION_MODULE)

    await service.updateLanguages(
      (defaultLanguages ?? []).map((lang) => ({
        id: lang.id,
        is_default: true,
      }))
    )
  }
)
