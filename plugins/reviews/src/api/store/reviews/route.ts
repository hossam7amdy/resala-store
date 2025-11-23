import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from '@medusajs/framework/http'
import type { StoreCreateReviewResponse } from '../../../types'

import { StoreCreateReviewType } from './validators'
import { createReviewWorkflow } from '../../../workflows/review'

export const POST = async (
  req: AuthenticatedMedusaRequest<StoreCreateReviewType>,
  res: MedusaResponse<StoreCreateReviewResponse>
) => {
  const input = req.validatedBody

  const { result } = await createReviewWorkflow(req.scope).run({
    input: {
      ...input,
      customer_id: req.auth_context?.actor_id,
    },
  })

  res.json({
    review: result.review,
  })
}
