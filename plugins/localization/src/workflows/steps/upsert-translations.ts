import { createStep, StepResponse } from '@medusajs/framework/workflows-sdk'
import { LOCALIZATION_MODULE } from '../../modules/localization'
import type { LocalizationModuleService } from '../../modules/localization/services'
import type { InferTypeOf } from '@medusajs/framework/types'
import { Translation, Language } from '../../modules/localization/models'
import type { AdminRegisterTranslations } from '../../types'

type UpsertTranslationsStepInput = {
  input: AdminRegisterTranslations
  languages: InferTypeOf<typeof Language>[]
  existingTranslations: InferTypeOf<typeof Translation>[]
}

type CompensationData = {
  createdIds: string[]
  updatedTranslations: Array<{
    id: string
    value: string
    is_outdated: boolean
  }>
}

const upsertTranslationsStepId = 'upsert-translations-step'

export const upsertTranslationsStep = createStep(
  upsertTranslationsStepId,
  async (
    { input, languages, existingTranslations }: UpsertTranslationsStepInput,
    { container }
  ) => {
    const localizationService: LocalizationModuleService =
      container.resolve(LOCALIZATION_MODULE)

    const languageMap = new Map(languages.map((lang) => [lang.code, lang.id]))

    const existingMap = new Map(
      existingTranslations.map((t) => [`${t.language_id}:${t.field}`, t])
    )

    const toCreate: Array<{
      resource_id: string
      resource_type: string
      language_id: string
      field: string
      value: string
      is_outdated: boolean
    }> = []

    const toUpdate: Array<{
      id: string
      value: string
      is_outdated: boolean
    }> = []

    for (const translation of input.translations) {
      const languageId = languageMap.get(translation.locale)!
      const lookupKey = `${languageId}:${translation.field}`
      const existing = existingMap.get(lookupKey)

      if (existing) {
        toUpdate.push({
          id: existing.id,
          value: translation.value,
          is_outdated: translation.is_outdated ?? false,
        })
      } else {
        toCreate.push({
          resource_id: input.resource_id,
          resource_type: input.resource_type,
          language_id: languageId,
          field: translation.field,
          value: translation.value,
          is_outdated: translation.is_outdated ?? false,
        })
      }
    }

    const created =
      toCreate.length > 0
        ? await localizationService.createTranslations(toCreate)
        : []

    const updated =
      toUpdate.length > 0
        ? await localizationService.updateTranslations(toUpdate)
        : []

    const allTranslations = [
      ...created.map((t) => ({ id: t.id })),
      ...updated.map((t) => ({ id: t.id })),
    ]

    const compensationData: CompensationData = {
      createdIds: created.map((t) => t.id),
      updatedTranslations: existingTranslations
        .filter((t) => toUpdate.some((u) => u.id === t.id))
        .map((t) => ({
          id: t.id,
          value: t.value,
          is_outdated: t.is_outdated,
        })),
    }

    return new StepResponse(allTranslations, compensationData)
  },
  async (compensationData: CompensationData | undefined, { container }) => {
    if (!compensationData) return

    const localizationService: LocalizationModuleService =
      container.resolve(LOCALIZATION_MODULE)

    if (compensationData.createdIds.length > 0) {
      await localizationService.softDeleteTranslations(
        compensationData.createdIds
      )
    }

    if (compensationData.updatedTranslations.length > 0) {
      await localizationService.updateTranslations(
        compensationData.updatedTranslations
      )
    }
  }
)
