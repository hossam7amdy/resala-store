import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
  refetchEntities,
} from '@medusajs/framework'
import {
  AdminRegisterTranslations,
  AdminTranslationListParams,
  AdminTranslationListResponse,
  AdminRegisterTranslationsResponse,
} from '../../../types'
import { registerTranslationsWorkflow } from '../../../workflows'

export const GET = async (
  req: AuthenticatedMedusaRequest<never, AdminTranslationListParams>,
  res: MedusaResponse<AdminTranslationListResponse>
) => {
  const { locale, ...filters } = req.filterableFields
  const translationFilters = {
    ...filters,
    language: { code: locale },
  }

  const { data: translations, metadata } = await refetchEntities({
    entity: 'translation',
    scope: req.scope,
    fields: req.queryConfig.fields,
    pagination: req.queryConfig.pagination,
    idOrFilter: translationFilters,
  })

  res.status(200).json({
    translations,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

export const POST = async (
  req: AuthenticatedMedusaRequest<AdminRegisterTranslations>,
  res: MedusaResponse<AdminRegisterTranslationsResponse>
) => {
  const { result } = await registerTranslationsWorkflow(req.scope).run({
    input: req.validatedBody,
  })

  const translationIds = result.translations.map((t) => t.id)

  const { data: translations } = await refetchEntities({
    entity: 'translation',
    scope: req.scope,
    fields: req.queryConfig.fields,
    idOrFilter: { id: translationIds },
  })

  res.status(201).json({
    translations,
  })
}
