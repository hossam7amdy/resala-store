import { AuthenticatedMedusaRequest, MedusaResponse } from '@medusajs/framework'
import type {
  AdminRemoveTranslations,
  AdminRemoveTranslationsResponse,
} from '../../../../types'
import { removeTranslationsWorkflow } from '../../../../workflows'

export const POST = async (
  req: AuthenticatedMedusaRequest<AdminRemoveTranslations>,
  res: MedusaResponse<AdminRemoveTranslationsResponse>
) => {
  const { result } = await removeTranslationsWorkflow(req.scope).run({
    input: req.validatedBody,
  })

  res.status(200).json(result)
}
