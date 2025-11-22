'use server'

import { sdk } from '@lib/config'
import { getAuthHeaders, getCacheOptions } from './cookies'
import { StoreProductReview } from 'types/global'

export const getProductReviews = async ({
  productId,
  limit = 10,
  offset = 0,
}: {
  productId: string
  limit?: number
  offset?: number
}) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions(`product-reviews-${productId}`)),
  }

  return sdk.client.fetch<{
    reviews: StoreProductReview[]
    average_rating: number
    limit: number
    offset: number
    count: number
  }>(`/store/products/${productId}/reviews`, {
    headers,
    query: {
      limit,
      offset,
      order: '-rating',
    },
    next,
    cache: 'force-cache',
  })
}

export const addProductReview = async (input: {
  title?: string
  content: string
  first_name: string
  last_name: string
  rating: number
  product_id: string
}) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.client.fetch(`/store/reviews`, {
    method: 'POST',
    headers,
    body: input,
    next: {
      ...(await getCacheOptions(`product-reviews-${input.product_id}`)),
    },
    cache: 'no-store',
  })
}
