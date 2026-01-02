import { refetchEntities } from '@medusajs/framework/http'
import type {
  MedusaResponse,
  AuthenticatedMedusaRequest,
} from '@medusajs/framework/http'
import {
  AdminTranslationProviderFilters,
  AdminTranslationProviderListResponse,
} from '../../../../types'

export const GET = async (
  req: AuthenticatedMedusaRequest<AdminTranslationProviderFilters>,
  res: MedusaResponse<AdminTranslationProviderListResponse>
) => {
  const { data: translation_providers, metadata } = await refetchEntities({
    entity: 'translation_provider',
    scope: req.scope,
    fields: req.queryConfig.fields,
    pagination: req.queryConfig.pagination,
    idOrFilter: req.filterableFields,
  })

  res.json({
    translation_providers,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}
