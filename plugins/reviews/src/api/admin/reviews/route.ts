import { AdminReviewListResponse } from '../../../types'
import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http'
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from '@medusajs/framework/utils'

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse<AdminReviewListResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const queryConfig = remoteQueryObjectFromString({
    entryPoint: 'review',
    variables: {
      filters: req.filterableFields,
      ...req.queryConfig.pagination,
    },
    fields: req.queryConfig.fields,
  })

  const { rows: reviews, metadata } = await remoteQuery(queryConfig)

  res.json({
    reviews,
    ...metadata,
  })
}
