import { MedusaError } from '@medusajs/framework/utils'
import { createStep } from '@medusajs/framework/workflows-sdk'
import type { InferTypeOf } from '@medusajs/framework/types'
import { Language } from '../../modules/localization/models'

type ValidateLanguagesExistStepInput = {
  code: string
  languages: InferTypeOf<typeof Language>[]
}

const validateLanguageExistStepId = 'validate-language-exist-step'

export const validateLanguageExistStep = createStep(
  validateLanguageExistStepId,
  async ({ code, languages }: ValidateLanguagesExistStepInput) => {
    const exist = languages.some((lang) => lang.code === code)

    if (exist) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Language already exist (${code})`
      )
    }
  }
)
