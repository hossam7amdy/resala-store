import { MedusaContainer } from '@medusajs/framework'
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from '@medusajs/framework/utils'
import { AdminStoreLocale } from '../../../types'
import { defaultAdminStoreLocaleFields } from './query-config'

export const refetchStoreLocale = async (
  localeId: string,
  scope: MedusaContainer,
  fields = defaultAdminStoreLocaleFields
): Promise<AdminStoreLocale> => {
  const remoteQuery = scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const queryObject = remoteQueryObjectFromString({
    entryPoint: 'store_locale',
    variables: {
      filters: { id: localeId },
    },
    options: {
      throwIfKeyNotFound: true,
    },
    fields,
  })

  const storeLocales = await remoteQuery(queryObject)
  return storeLocales[0]
}
