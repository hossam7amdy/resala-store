import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FetchError } from '@medusajs/js-sdk'
import type {
  AdminDeleteReviewResponse,
  AdminReviewListParams,
  AdminReviewListResponse,
  AdminUpdateReviewsStatus,
  AdminUpdateReviewsStatusResponse,
} from '@repo/shared-types'
import {
  queryKeysFactory,
  UseQueryOptionsWrapper,
} from '../../lib/query-key-factory'
import { sdk } from '../../lib/client'

const REVIEWS_QUERY_KEY = 'reviews' as const
export const reviewsQueryKeys = queryKeysFactory(REVIEWS_QUERY_KEY)

export const useReviews = (
  query?: AdminReviewListParams,
  options?: UseQueryOptionsWrapper<AdminReviewListResponse, FetchError>
) => {
  const { data, ...rest } = useQuery({
    queryKey: reviewsQueryKeys.list(query),
    queryFn: () =>
      sdk.client.fetch<AdminReviewListResponse>('/admin/reviews', {
        query,
      }),
    ...options,
  })
  return { ...data, ...rest }
}

export const useUpdateReviewsStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: AdminUpdateReviewsStatus) =>
      sdk.client.fetch<AdminUpdateReviewsStatusResponse>(
        '/admin/reviews/status',
        {
          method: 'POST',
          body: data,
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: reviewsQueryKeys.lists(),
      })
    },
  })
}

export const useDeleteReview = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) =>
      sdk.client.fetch<AdminDeleteReviewResponse>(`/admin/reviews/${id}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: reviewsQueryKeys.lists(),
      })
    },
  })
}
