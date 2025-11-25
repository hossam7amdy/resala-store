import { TRANSLATION_MODULE } from '../../../modules/translation'
import TranslationModuleService from '../../../modules/translation/service'
import { LocaleDTO } from '../../../types'
import { createStep, StepResponse } from '@medusajs/framework/workflows-sdk'

const deleteStoreLocaleStepId = 'delete-store-locale-step'

export type DeleteStoreLocaleStepInput = Pick<LocaleDTO, 'id' | 'store_id'>

export const deleteStoreLocaleStep = createStep(
  deleteStoreLocaleStepId,
  async (input: DeleteStoreLocaleStepInput, { container }) => {
    const service =
      container.resolve<TranslationModuleService>(TRANSLATION_MODULE)

    await service.deleteStoreLocales(input)

    return new StepResponse({ id: input.id })
  }
)
