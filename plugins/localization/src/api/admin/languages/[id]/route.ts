import {
  MedusaResponse,
  AuthenticatedMedusaRequest,
  refetchEntity,
} from '@medusajs/framework'
import { updateLanguageWorkflow } from '../../../../workflows'
import type {
  AdminUpdateLanguage,
  AdminLanguageResponse,
} from '../../../../types'

export const PUT = async (
  req: AuthenticatedMedusaRequest<AdminUpdateLanguage>,
  res: MedusaResponse<AdminLanguageResponse>
) => {
  const id = req.params.id!

  await updateLanguageWorkflow(req.scope).run({
    input: {
      id,
      ...req.validatedBody,
    },
  })

  const language = await refetchEntity({
    entity: 'language',
    idOrFilter: id,
    scope: req.scope,
    fields: req.queryConfig.fields,
  })

  res.status(200).json({
    language,
  })
}

export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse<AdminLanguageResponse>
) => {
  const id = req.params.id!

  const language = await refetchEntity({
    entity: 'language',
    idOrFilter: id,
    scope: req.scope,
    fields: req.queryConfig.fields,
    options: {
      throwIfKeyNotFound: true,
    },
  })

  res.status(200).json({
    language,
  })
}
