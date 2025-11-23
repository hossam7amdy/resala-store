import { FetchError } from '@medusajs/js-sdk'
import { HttpTypes } from '@medusajs/types'
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { sdk } from '../../lib/sdk'
import { queryKeysFactory } from '../../lib/query-key-factory'

const PRODUCT_TYPES_QUERY_KEY = 'product_types' as const
export const productTypesQueryKeys = queryKeysFactory(PRODUCT_TYPES_QUERY_KEY)

export const useProductTypes = (
  query?: HttpTypes.AdminProductTypeListParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminProductTypeListResponse,
      FetchError,
      HttpTypes.AdminProductTypeListResponse,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: () => sdk.admin.productType.list(query),
    queryKey: productTypesQueryKeys.list(query),
    ...options,
  })

  return { ...data, ...rest }
}
