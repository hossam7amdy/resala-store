import { AdminDeleteReviewResponse } from '@repo/shared-types'
import {
  MedusaResponse,
  type AuthenticatedMedusaRequest,
} from '@medusajs/framework/http'
import { MedusaError } from '@medusajs/framework/utils'
import { deleteReviewsWorkflow } from '../../../../workflows/review'

export const DELETE = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse<AdminDeleteReviewResponse>
) => {
  const { id } = req.params

  const { result, errors } = await deleteReviewsWorkflow(req.scope).run({
    input: { ids: [id] },
  })

  // Check for workflow errors
  if (errors && errors.length > 0) {
    const errorMessage = errors[0].error?.message || 'Unknown error'

    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      `Failed to delete reviews: ${errorMessage}`
    )
  }

  res.status(200).json({
    id: result.ids[0],
    deleted: true,
  })
}
