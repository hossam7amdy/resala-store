import {
  MedusaRequest,
  MedusaResponse,
  refetchEntities,
} from '@medusajs/framework/http'
import {
  StoreLanguageListResponse,
  StoreLanguageListParams,
} from '../../../types'

export const GET = async (
  req: MedusaRequest<StoreLanguageListParams>,
  res: MedusaResponse<StoreLanguageListResponse>
) => {
  const { data: languages, metadata } = await refetchEntities({
    entity: 'language',
    scope: req.scope,
    fields: req.queryConfig.fields,
    pagination: req.queryConfig.pagination,
    idOrFilter: {
      ...req.filterableFields,
      is_published: true,
      region_id: '*',
    },
  })

  res.json({
    languages,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}
