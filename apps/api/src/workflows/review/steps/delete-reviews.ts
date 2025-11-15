import { createStep, StepResponse } from '@medusajs/framework/workflows-sdk'
import { ContainerRegistrationKeys } from '@medusajs/framework/utils'
import { PRODUCT_REVIEW_MODULE } from '../../../modules/product-review'
import ProductReviewModuleService from '../../../modules/product-review/service'

export type DeleteReviewsStepInput = {
  ids: string[]
}

export const deleteReviewsStep = createStep(
  'delete-reviews-step',
  async (input: DeleteReviewsStepInput, { container }) => {
    const reviewModuleService = container.resolve<ProductReviewModuleService>(
      PRODUCT_REVIEW_MODULE
    )
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

    logger.info(`Delete reviews step: Fetching ${input.ids.length} reviews`)

    // Fetch reviews before deletion for rollback (capture full data for hard delete rollback)
    const reviewsToDelete = await reviewModuleService.listReviews({
      id: input.ids,
    })

    // Validate all reviews exist before attempting deletion
    if (reviewsToDelete.length !== input.ids.length) {
      const foundIds = reviewsToDelete.map((r) => r.id)
      const missingIds = input.ids.filter((id) => !foundIds.includes(id))
      logger.error(
        `Cannot delete reviews: ${missingIds.length} review(s) not found: ${missingIds.join(', ')}`
      )
      throw new Error(
        `Cannot delete reviews: The following review IDs do not exist: ${missingIds.join(', ')}`
      )
    }

    logger.info(`Deleting ${reviewsToDelete.length} reviews`)

    // Delete the reviews (hard delete)
    await reviewModuleService.deleteReviews(input.ids)

    logger.info(`Successfully deleted ${input.ids.length} reviews in step`)

    return new StepResponse(input.ids, reviewsToDelete)
  },
  async (reviewsToRestore, { container }) => {
    if (!reviewsToRestore || reviewsToRestore.length === 0) {
      return
    }

    const reviewModuleService = container.resolve<ProductReviewModuleService>(
      PRODUCT_REVIEW_MODULE
    )
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

    logger.info(
      `Rolling back deletion: Restoring ${reviewsToRestore.length} reviews`
    )

    // Restore deleted reviews with full data
    // Note: This creates new records with original data but may generate new IDs
    // For true hard delete rollback, consider using soft delete instead
    await reviewModuleService.createReviews(reviewsToRestore)

    logger.info(`Successfully restored ${reviewsToRestore.length} reviews`)
  }
)
