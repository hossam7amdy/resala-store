import { AuthenticatedMedusaRequest, MedusaResponse } from '@medusajs/framework'
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from '@medusajs/framework/utils'
import {
  AdminStoreLocaleListResponse,
  AdminStoreLocaleResponse,
} from '@repo/shared-types'

import { refetchStoreLocale } from './helpers'
import { AdminCreateStoreLocaleType } from './validators'
import { createStoreLocaleWorkflow } from '../../../workflows/store-locale'

export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse<AdminStoreLocaleListResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const queryObject = remoteQueryObjectFromString({
    entryPoint: 'store_locales',
    variables: {
      filters: req.filterableFields,
      ...req.queryConfig.pagination,
    },
    fields: req.queryConfig.fields,
  })

  const { rows: storeLocales, metadata } = await remoteQuery(queryObject)

  res.status(200).json({
    storeLocales,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

export const POST = async (
  req: AuthenticatedMedusaRequest<AdminCreateStoreLocaleType>,
  res: MedusaResponse<AdminStoreLocaleResponse>
) => {
  const body = req.validatedBody

  const { result } = await createStoreLocaleWorkflow(req.scope).run({
    input: body,
  })

  const storeLocale = await refetchStoreLocale(result.id, req.scope)

  res.status(201).json({ storeLocale })
}
