import { MedusaError } from '@medusajs/framework/utils'
import { createStep } from '@medusajs/framework/workflows-sdk'
import type { MetadataType } from '@medusajs/types'

type ValidateUpdateHasFieldsStepInput = {
  is_default?: boolean
  is_published?: boolean
  metadata?: MetadataType
}

const validateUpdateHasFieldsStepId = 'validate-update-has-fields-step'

export const validateUpdateHasFieldsStep = createStep(
  validateUpdateHasFieldsStepId,
  async ({
    is_default,
    is_published,
    metadata,
  }: ValidateUpdateHasFieldsStepInput) => {
    const hasFields =
      is_default !== undefined ||
      is_published !== undefined ||
      metadata !== undefined

    if (!hasFields) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        'At least one field (is_default, is_published, or metadata) must be provided for update'
      )
    }
  }
)
