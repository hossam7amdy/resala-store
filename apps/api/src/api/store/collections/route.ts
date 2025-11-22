import { HttpTypes } from '@medusajs/framework/types'
import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from '@medusajs/framework/http'

import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from '@medusajs/framework/utils'
import { localizeCollections } from './helpers'
import { storeCollectionTranslationFields } from './query-config'

export const GET = async (
  req: AuthenticatedMedusaRequest<HttpTypes.StoreCollectionListParams>,
  res: MedusaResponse<HttpTypes.StoreCollectionListResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const query = remoteQueryObjectFromString({
    entryPoint: 'product_collection',
    variables: {
      filters: req.filterableFields,
      ...req.queryConfig.pagination,
    },
    fields: req.queryConfig.fields.concat(storeCollectionTranslationFields),
  })

  const { rows: collections, metadata } = await remoteQuery(query)

  const localizedCollections = localizeCollections(
    collections,
    req.context?.locale
  )

  res.json({
    collections: localizedCollections,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}
