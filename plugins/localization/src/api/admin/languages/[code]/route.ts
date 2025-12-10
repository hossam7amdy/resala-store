import { MedusaResponse, AuthenticatedMedusaRequest } from '@medusajs/framework'
import { deleteLanguageWorkflow } from '../../../../workflows'
import { AdminDeleteLanguageResponse } from '../../../../types'

export const DELETE = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse<AdminDeleteLanguageResponse>
) => {
  const code = req.params.code!

  await deleteLanguageWorkflow(req.scope).run({
    input: { code },
  })

  res.status(200).json({
    code,
    object: 'language',
    deleted: true,
  })
}
