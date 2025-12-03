import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
  refetchEntities,
} from '@medusajs/framework'
import {
  AdminCreateLanguage,
  AdminLanguageResponse,
  AdminLanguageListResponse,
} from '../../../types'
import { createLanguageWorkflow } from '../../../workflows'

export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse<AdminLanguageListResponse>
) => {
  const { data: languages, metadata } = await refetchEntities({
    entity: 'language',
    scope: req.scope,
    fields: req.queryConfig.fields,
    pagination: req.queryConfig.pagination,
    idOrFilter: req.filterableFields,
  })

  res.status(200).json({
    languages,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

export const POST = async (
  req: AuthenticatedMedusaRequest<AdminCreateLanguage>,
  res: MedusaResponse<AdminLanguageResponse>
) => {
  const { result } = await createLanguageWorkflow(req.scope).run({
    input: req.validatedBody,
  })

  res.status(201).json({
    language: result.language,
  })
}
