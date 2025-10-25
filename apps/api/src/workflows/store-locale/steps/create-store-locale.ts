import { TRANSLATION_MODULE } from '../../../modules/translation'
import TranslationModuleService from '../../../modules/translation/service'
import { createStep, StepResponse } from '@medusajs/framework/workflows-sdk'
import { CreateStoreLocaleWorkflowInput } from '../create-store-locale'

const createStoreLocaleStepId = 'create-store-locale-step'

type CreateStoreLocaleStepInput = CreateStoreLocaleWorkflowInput

export const createStoreLocaleStep = createStep(
  createStoreLocaleStepId,
  async (input: CreateStoreLocaleStepInput, { container }) => {
    const service =
      container.resolve<TranslationModuleService>(TRANSLATION_MODULE)

    const storeLocale = await service.createStoreLocales(input)

    return new StepResponse(storeLocale, storeLocale.id)
  },
  async (storeLocaleId: string, { container }) => {
    const service =
      container.resolve<TranslationModuleService>(TRANSLATION_MODULE)

    await service.deleteStoreLocales(storeLocaleId)
  }
)
