import { MedusaError } from '@medusajs/framework/utils'
import { createStep } from '@medusajs/framework/workflows-sdk'
import type { InferTypeOf } from '@medusajs/framework/types'
import { Language } from '../../modules/localization/models'

type ValidateNotPublishedLanguageStepInput = {
  languages: InferTypeOf<typeof Language>[]
}

const validateNotDeletingPublishedLanguagesId =
  'validate-not-deleting-published-languages-step'

export const validateNotDeletingPublishedLanguagesStep = createStep(
  validateNotDeletingPublishedLanguagesId,
  async ({ languages }: ValidateNotPublishedLanguageStepInput) => {
    const publishedLanguages = languages.filter((lang) => lang.is_published)

    if (publishedLanguages.length > 0) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Cannot delete published languages: (${publishedLanguages.map((lang) => lang.code).join(', ')})`
      )
    }
  }
)
