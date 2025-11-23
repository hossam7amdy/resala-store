import {
  createWorkflow,
  WorkflowResponse,
} from '@medusajs/framework/workflows-sdk'
import { updateReviewsStep } from './steps/update-review'

export type UpdateReviewWorkflowInput = {
  id: string
  status: 'pending' | 'approved' | 'rejected'
}[]

export const updateReviewWorkflowId = 'update-review'

export const updateReviewWorkflow = createWorkflow(
  updateReviewWorkflowId,
  (input: UpdateReviewWorkflowInput) => {
    const reviews = updateReviewsStep(input)

    return new WorkflowResponse({
      reviews,
    })
  }
)
