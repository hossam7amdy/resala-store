import {
  createWorkflow,
  WorkflowResponse,
} from '@medusajs/framework/workflows-sdk'
import { createReviewStep } from './steps/create-review'
import { validateUniqueReviewStep } from './steps/validate-unique-review'
import { useQueryGraphStep } from '@medusajs/medusa/core-flows'

export type CreateReviewWorkflowInput = {
  title?: string
  content: string
  rating: number
  product_id: string
  customer_id?: string
  first_name: string
  last_name: string
}

export const createReviewWorkflowId = 'create-review'

export const createReviewWorkflow = createWorkflow(
  createReviewWorkflowId,
  (input: CreateReviewWorkflowInput) => {
    // Check product exists
    useQueryGraphStep({
      entity: 'product',
      fields: ['id'],
      filters: {
        id: input.product_id,
      },
      options: {
        throwIfKeyNotFound: true,
      },
    })

    validateUniqueReviewStep({
      product_id: input.product_id,
      customer_id: input.customer_id,
    })

    const review = createReviewStep(input)

    return new WorkflowResponse({
      review,
    })
  }
)
