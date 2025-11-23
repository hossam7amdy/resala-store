import { TRANSLATION_MODULE } from '../../../modules/translation'
import TranslationModuleService from '../../../modules/translation/service'
import { createStep, StepResponse } from '@medusajs/framework/workflows-sdk'
import { UpdateStoreLocaleWorkflowInput } from '../update-store-locale'

const updateStoreLocaleStepId = 'update-store-locale-step'

type UpdateStoreLocaleStepInput = UpdateStoreLocaleWorkflowInput[]

export const updateStoreLocaleStep = createStep(
  updateStoreLocaleStepId,
  async (input: UpdateStoreLocaleStepInput, { container }) => {
    const service =
      container.resolve<TranslationModuleService>(TRANSLATION_MODULE)

    const storeLocale = await service.updateStoreLocales(input)

    return new StepResponse(storeLocale, input)
  }
)
