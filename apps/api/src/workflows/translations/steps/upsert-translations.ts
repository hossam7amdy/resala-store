import { createStep, StepResponse } from '@medusajs/framework/workflows-sdk'
import { TRANSLATION_MODULE } from '../../../modules/translation'
import TranslationModuleService from '../../../modules/translation/service'
import { UpsertTranslationsWorkflowInput } from '../upsert-translations'
import type { TranslatableEntity } from '@repo/shared-types'

type UpsertTranslationsStepInput = UpsertTranslationsWorkflowInput

export const upsertTranslationsStepId = 'upsert-translations-step'

export const upsertTranslationsStep = createStep(
  upsertTranslationsStepId,
  async (input: UpsertTranslationsStepInput, { container }) => {
    const service =
      container.resolve<TranslationModuleService>(TRANSLATION_MODULE)

    const results = await service.upsertTranslationsForEntity(input)

    return new StepResponse(results, {
      entity_type: input.entity_type,
      translationIds: results?.map((t) => t.id) || [],
    })
  },
  async (
    input: {
      entity_type: TranslatableEntity
      translationIds: string[]
    },
    { container }
  ) => {
    // Compensation function - rollback created/updated translations
    if (!input.translationIds?.length) return

    const service =
      container.resolve<TranslationModuleService>(TRANSLATION_MODULE)

    await service.deleteTranslationsForEntity(
      input.entity_type,
      input.translationIds
    )
  }
)
