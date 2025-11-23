import { createStep, StepResponse } from '@medusajs/framework/workflows-sdk'
import { PRODUCT_REVIEW_MODULE } from '../../../modules/product-review'
import ProductReviewModuleService from '../../../modules/product-review/service'
import { CreateReviewWorkflowInput } from '../create-review'

export type CreateReviewStepInput = CreateReviewWorkflowInput

export const createReviewStep = createStep(
  'create-review',
  async (input: CreateReviewStepInput, { container }) => {
    const reviewModuleService = container.resolve<ProductReviewModuleService>(
      PRODUCT_REVIEW_MODULE
    )

    const review = await reviewModuleService.createReviews(input)

    return new StepResponse(review, review.id)
  },
  async (reviewId, { container }) => {
    if (!reviewId) {
      return
    }

    const reviewModuleService = container.resolve<ProductReviewModuleService>(
      PRODUCT_REVIEW_MODULE
    )

    await reviewModuleService.deleteReviews(reviewId)
  }
)
