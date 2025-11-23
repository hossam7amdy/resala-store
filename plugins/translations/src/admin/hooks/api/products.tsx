import { FetchError } from '@medusajs/js-sdk'
import { HttpTypes } from '@medusajs/types'
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { sdk } from '../../lib/sdk'
import { queryKeysFactory } from '../../lib/query-key-factory'

const PRODUCTS_QUERY_KEY = 'products' as const
export const productsQueryKeys = queryKeysFactory(PRODUCTS_QUERY_KEY)

export const useProducts = (
  query?: HttpTypes.AdminProductListParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminProductListResponse,
      FetchError,
      HttpTypes.AdminProductListResponse,
      QueryKey
    >,
    'queryFn' | 'queryKey'
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: () => sdk.admin.product.list(query),
    queryKey: productsQueryKeys.list(query),
    ...options,
  })

  return { ...data, ...rest }
}
