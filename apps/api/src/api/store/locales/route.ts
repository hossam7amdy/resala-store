import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from '@medusajs/framework/utils'
import {
  AdminStoreLocaleParams,
  StoreLocaleListResponse,
} from '@repo/shared-types'
import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http'

export const GET = async (
  req: MedusaRequest<AdminStoreLocaleParams>,
  res: MedusaResponse<StoreLocaleListResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const filters = {
    ...req.filterableFields,
    is_published: true,
  }
  const queryObject = remoteQueryObjectFromString({
    entryPoint: 'store_locale',
    variables: {
      filters,
      ...req.queryConfig.pagination,
    },
    fields: req.queryConfig.fields,
  })

  const { rows: locales, metadata } = await remoteQuery(queryObject)

  res.json({
    locales,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}
