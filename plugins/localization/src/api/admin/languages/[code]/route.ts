import { MedusaResponse, AuthenticatedMedusaRequest } from '@medusajs/framework'
import { deleteLanguageWorkflow } from '../../../../workflows'

export const DELETE = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const { code } = req.params

  const { result } = await deleteLanguageWorkflow(req.scope).run({
    input: {
      code,
    },
  })

  res.status(200).json(result)
}
