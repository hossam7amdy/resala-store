import {
  ContainerRegistrationKeys,
  MedusaError,
  remoteQueryObjectFromString,
} from '@medusajs/framework/utils'
import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http'
import { StoreLocaleResponse } from '../../../../types'

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse<StoreLocaleResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: 'store_locale',
    variables: {
      filters: {
        id: req.params.id,
        is_published: true,
      },
    },
    fields: req.queryConfig.fields,
  })

  const [locale] = await remoteQuery(queryObject)

  if (!locale) {
    throw new MedusaError(
      MedusaError.Types.NOT_FOUND,
      `Locale with id: ${req.params.id} was not found`
    )
  }

  res.status(200).json({ locale })
}
