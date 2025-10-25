import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { FetchError } from '@medusajs/js-sdk'
import { AdminProductWishlistCountResponse } from '@repo/shared-types'
import { queryKeysFactory } from '../../lib/query-key-factory'
import { sdk } from '../../lib/client'

const PRODUCT_WISHLIST_QUERY_KEY = 'product-wishlist' as const
export const productWishlistQueryKeys = queryKeysFactory(
  PRODUCT_WISHLIST_QUERY_KEY
)

export const useProductWishlistCount = (
  productId: string,
  query?: Record<string, any>,
  options?: Omit<
    UseQueryOptions<
      AdminProductWishlistCountResponse,
      FetchError,
      AdminProductWishlistCountResponse,
      QueryKey
    >,
    'queryFn' | 'queryKey'
  >
) => {
  const { data, isLoading } = useQuery<
    AdminProductWishlistCountResponse,
    FetchError
  >({
    queryFn: () => sdk.client.fetch(`/admin/products/${productId}/wishlist`),
    queryKey: productWishlistQueryKeys.detail(productId, query),
    ...options,
  })
  return { ...data, isLoading }
}
