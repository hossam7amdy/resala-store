import {
  ContainerRegistrationKeys,
  MedusaError,
} from '@medusajs/framework/utils'
import { createStep } from '@medusajs/framework/workflows-sdk'
import type { InferTypeOf } from '@medusajs/framework/types'
import { Language } from '../../modules/localization/models'

type ValidateLastPublishedLanguageStepInput = {
  language: InferTypeOf<typeof Language>
}

const validateNotLastPublishedLanguageId =
  'validate-not-last-published-language-step'

export const validateLastPublishedLanguageStep = createStep(
  validateNotLastPublishedLanguageId,
  async (
    { language }: ValidateLastPublishedLanguageStepInput,
    { container }
  ) => {
    const query = container.resolve(ContainerRegistrationKeys.QUERY)

    const { data: publishedLanguages } = await query.graph({
      entity: 'language',
      fields: ['code'],
      filters: {
        is_published: true,
      },
    })

    if (
      publishedLanguages.length === 1 &&
      publishedLanguages[0].code === language.code
    ) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        'Cannot unpublish the last published language. At least one language must remain published'
      )
    }
  }
)
