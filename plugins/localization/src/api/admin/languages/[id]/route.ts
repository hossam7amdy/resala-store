import { MedusaResponse, AuthenticatedMedusaRequest } from '@medusajs/framework'
import { updateLanguageWorkflow } from '../../../../workflows'
import type {
  AdminUpdateLanguage,
  AdminLanguageResponse,
} from '../../../../types'

export const PUT = async (
  req: AuthenticatedMedusaRequest<AdminUpdateLanguage>,
  res: MedusaResponse<AdminLanguageResponse>
) => {
  const { result } = await updateLanguageWorkflow(req.scope).run({
    input: {
      id: req.params.id!,
      ...req.validatedBody,
    },
  })

  res.status(200).json({
    language: result.language,
  })
}
