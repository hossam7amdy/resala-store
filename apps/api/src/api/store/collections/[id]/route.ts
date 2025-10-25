import { HttpTypes } from '@medusajs/framework/types'
import {
  MedusaResponse,
  AuthenticatedMedusaRequest,
} from '@medusajs/framework/http'
import { localizeCollection } from '../helpers'
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from '@medusajs/framework/utils'
import { storeCollectionTranslationFields } from '../query-config'

export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse<HttpTypes.StoreCollectionResponse>
) => {
  const { id } = req.params

  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: 'product_collection',
    variables: {
      filters: { id },
    },
    fields: req.queryConfig.fields.concat(storeCollectionTranslationFields),
  })

  const collections = await remoteQuery(queryObject)
  const localizedCollection = localizeCollection(
    collections[0],
    req.context?.locale
  )

  res.status(200).json({
    collection: localizedCollection,
  })
}
