import {
  createWorkflow,
  WorkflowResponse,
} from '@medusajs/framework/workflows-sdk'
import { deleteReviewsStep } from './steps/delete-reviews'

export type DeleteReviewsWorkflowInput = {
  ids: string[]
}

export const deleteReviewsWorkflowId = 'delete-reviews'

export const deleteReviewsWorkflow = createWorkflow(
  deleteReviewsWorkflowId,
  (input: DeleteReviewsWorkflowInput) => {
    const ids = deleteReviewsStep(input)

    return new WorkflowResponse({
      ids,
    })
  }
)
