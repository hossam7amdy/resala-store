import { createStep, StepResponse } from '@medusajs/framework/workflows-sdk'
import { MedusaError } from '@medusajs/framework/utils'
import { PRODUCT_REVIEW_MODULE } from '../../../modules/product-review'
import ProductReviewModuleService from '../../../modules/product-review/service'

export type ValidateUniqueReviewStepInput = {
  product_id: string
  customer_id?: string
}

export const validateUniqueReviewStep = createStep(
  'validate-unique-review',
  async (input: ValidateUniqueReviewStepInput, { container }) => {
    const { product_id, customer_id } = input

    // Skip validation if customer_id is not provided (guest reviews)
    if (!customer_id) {
      return new StepResponse(null)
    }

    const reviewModuleService = container.resolve<ProductReviewModuleService>(
      PRODUCT_REVIEW_MODULE
    )

    // Check if customer has already reviewed this product
    const existingReviews = await reviewModuleService.listReviews({
      product_id,
      customer_id,
    })

    if (existingReviews.length > 0) {
      throw new MedusaError(
        MedusaError.Types.DUPLICATE_ERROR,
        'You have already submitted a review for this product'
      )
    }

    return new StepResponse(null)
  }
)
