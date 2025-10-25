import { createStep, StepResponse } from '@medusajs/framework/workflows-sdk'
import { AUTO_TRANSLATE_MODULE } from '../../../modules/auto-translation'
import AutoTranslateModuleService from '../../../modules/auto-translation/service'
import { AutoTranslateFieldsWorkflowInput } from '../auto-translate-fields'

const autoTranslateFieldsStepId = 'auto-translate-fields-step'

type AutoTranslateFieldsStepInput = AutoTranslateFieldsWorkflowInput

export const autoTranslateFieldsStep = createStep(
  autoTranslateFieldsStepId,
  async (input: AutoTranslateFieldsStepInput, { container }) => {
    const service = container.resolve<AutoTranslateModuleService>(
      AUTO_TRANSLATE_MODULE
    )

    const translatedFields = await service.translate(
      input.fields,
      input.toLocale
    )

    return new StepResponse(translatedFields)
  }
)
