import { FetchError } from '@medusajs/js-sdk'
import { HttpTypes } from '@medusajs/types'
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { sdk } from '../../lib/sdk'
import { queryKeysFactory } from '../../lib/query-key-factory'

const TAGS_QUERY_KEY = 'tags' as const
export const productTagsQueryKeys = queryKeysFactory(TAGS_QUERY_KEY)

export const useProductTags = (
  query?: HttpTypes.AdminProductTagListParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminProductTagListResponse,
      FetchError,
      HttpTypes.AdminProductTagListResponse,
      QueryKey
    >,
    'queryFn' | 'queryKey'
  >
) => {
  const { data, ...rest } = useQuery({
    queryKey: productTagsQueryKeys.list(query),
    queryFn: async () => sdk.admin.productTag.list(query),
    ...options,
  })

  return { ...data, ...rest }
}
