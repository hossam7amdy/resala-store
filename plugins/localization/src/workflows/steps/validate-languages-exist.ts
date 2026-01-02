import { createStep } from '@medusajs/framework/workflows-sdk'
import { MedusaError } from '@medusajs/framework/utils'
import type { InferTypeOf } from '@medusajs/framework/types'
import { Language } from '../../modules/localization/models'

type ValidateLanguagesExistStepInput = {
  locales: string[]
  languages: InferTypeOf<typeof Language>[]
}

const validateLanguagesExistStepId = 'validate-languages-exist-step'

export const validateLanguagesExistStep = createStep(
  validateLanguagesExistStepId,
  async ({ locales, languages }: ValidateLanguagesExistStepInput) => {
    const foundCodes = new Set(languages.map((lang) => lang.code))
    const missingLocales = locales.filter((locale) => !foundCodes.has(locale))

    if (missingLocales.length > 0) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Languages not found for locales: ${missingLocales.join(', ')}`
      )
    }
  }
)
