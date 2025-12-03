import { MedusaError } from '@medusajs/framework/utils'
import { createStep } from '@medusajs/framework/workflows-sdk'
import type { InferTypeOf } from '@medusajs/framework/types'
import { Language } from '../../modules/localization/models'

type ValidateNotDefaultLanguageStepInput = {
  languages: InferTypeOf<typeof Language>[]
}

const validateNotDeletingDefaultLanguagesId =
  'validate-not-deleting-default-languages-step'

export const validateNotDeletingDefaultLanguagesStep = createStep(
  validateNotDeletingDefaultLanguagesId,
  async ({ languages }: ValidateNotDefaultLanguageStepInput) => {
    const defaultLanguages = languages.filter((lang) => lang.is_default)

    if (defaultLanguages.length > 0) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Cannot delete default languages: (${defaultLanguages.map((lang) => lang.code).join(', ')})`
      )
    }
  }
)
