import { FetchError } from '@medusajs/js-sdk'
import { FindParams, HttpTypes, PaginatedResponse } from '@medusajs/types'
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { sdk } from '../../lib/sdk'
import { queryKeysFactory } from '../../lib/query-key-factory'

const COLLECTION_QUERY_KEY = 'collections' as const
export const collectionsQueryKeys = queryKeysFactory(COLLECTION_QUERY_KEY)

export const useCollections = (
  query?: FindParams & HttpTypes.AdminCollectionListParams,
  options?: Omit<
    UseQueryOptions<
      PaginatedResponse<{ collections: HttpTypes.AdminCollection[] }>,
      FetchError,
      PaginatedResponse<{ collections: HttpTypes.AdminCollection[] }>,
      QueryKey
    >,
    'queryFn' | 'queryKey'
  >
) => {
  const { data, ...rest } = useQuery({
    queryKey: collectionsQueryKeys.list(query),
    queryFn: async () => sdk.admin.productCollection.list(query),
    ...options,
  })

  return { ...data, ...rest }
}
