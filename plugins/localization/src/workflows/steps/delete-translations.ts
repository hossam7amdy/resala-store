import { createStep, StepResponse } from '@medusajs/framework/workflows-sdk'
import { LOCALIZATION_MODULE } from '../../modules/localization'
import type { LocalizationModuleService } from '../../modules/localization/services'
import type { InferTypeOf } from '@medusajs/framework/types'
import { Translation } from '../../modules/localization/models'

type DeleteTranslationsStepInput = {
  translations: InferTypeOf<typeof Translation>[]
}

type DeleteTranslationsStepOutput = {
  deleted_ids: string[]
  deleted_count: number
}

type CompensationData = {
  translations: Array<{
    resource_id: string
    resource_type: string
    language_id: string
    field: string
    value: string
    is_outdated: boolean
  }>
}

const deleteTranslationsStepId = 'delete-translations-step'

export const deleteTranslationsStep = createStep(
  deleteTranslationsStepId,
  async (
    { translations }: DeleteTranslationsStepInput,
    { container }
  ): Promise<StepResponse<DeleteTranslationsStepOutput, CompensationData>> => {
    const localizationService: LocalizationModuleService =
      container.resolve(LOCALIZATION_MODULE)

    if (translations.length === 0) {
      return new StepResponse(
        {
          deleted_ids: [],
          deleted_count: 0,
        },
        { translations: [] }
      )
    }

    const translationIds = translations.map((t) => t.id)

    const compensationData: CompensationData = {
      translations: translations.map((t) => ({
        resource_id: t.resource_id,
        resource_type: t.resource_type,
        language_id: t.language_id,
        field: t.field,
        value: t.value,
        is_outdated: t.is_outdated,
      })),
    }

    await localizationService.deleteTranslations(translationIds)

    const output: DeleteTranslationsStepOutput = {
      deleted_ids: translationIds,
      deleted_count: translationIds.length,
    }

    return new StepResponse(output, compensationData)
  },
  async (compensationData: CompensationData | undefined, { container }) => {
    if (!compensationData || compensationData.translations.length === 0) {
      return
    }

    const localizationService: LocalizationModuleService =
      container.resolve(LOCALIZATION_MODULE)

    await localizationService.createTranslations(compensationData.translations)
  }
)
