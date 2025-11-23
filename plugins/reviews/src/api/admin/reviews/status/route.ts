import type { MedusaRequest, MedusaResponse } from '@medusajs/framework/http'
import { AdminUpdateReviewsStatusResponse } from '../../../../types'

import { AdminUpdateReviewsStatusType } from '../validators'
import { updateReviewWorkflow } from '../../../../workflows/review'

export async function POST(
  req: MedusaRequest<AdminUpdateReviewsStatusType>,
  res: MedusaResponse<AdminUpdateReviewsStatusResponse>
) {
  const { ids, status } = req.validatedBody

  const { result } = await updateReviewWorkflow(req.scope).run({
    input: ids.map((id) => ({
      id,
      status,
    })),
  })

  res.json({
    reviews: result.reviews,
  })
}
