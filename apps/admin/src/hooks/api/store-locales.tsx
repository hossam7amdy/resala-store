import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FetchError } from '@medusajs/js-sdk'
import type {
  AdminStoreLocaleResponse,
  AdminStoreLocaleListResponse,
  AdminCreateStoreLocale,
  AdminUpdateStoreLocale,
  AdminStoreLocaleParams,
} from '@repo/shared-types'
import {
  queryKeysFactory,
  UseQueryOptionsWrapper,
} from '../../lib/query-key-factory'
import { sdk } from '../../lib/client'

const STORE_LOCALES_QUERY_KEY = 'store-locales'
export const storeLocaleQueryKeys = queryKeysFactory(STORE_LOCALES_QUERY_KEY)

export const useStoreLocale = (
  id: string,
  query?: Record<string, any>,
  options?: UseQueryOptionsWrapper<AdminStoreLocaleResponse, FetchError>
) => {
  const { data, ...rest } = useQuery<AdminStoreLocaleResponse, FetchError>({
    queryFn: () => sdk.client.fetch(`/admin/store-locales/${id}`),
    queryKey: storeLocaleQueryKeys.detail(id, query),
    ...options,
  })
  return { ...data, ...rest }
}

export const useStoreLocales = (
  query?: AdminStoreLocaleParams,
  options?: UseQueryOptionsWrapper<AdminStoreLocaleListResponse, FetchError>
) => {
  const { data, ...rest } = useQuery<AdminStoreLocaleListResponse, FetchError>({
    queryFn: () => sdk.client.fetch('/admin/store-locales', { query }),
    queryKey: storeLocaleQueryKeys.list(query),
    ...options,
  })
  return { ...data, ...rest }
}

export const useCreateStoreLocale = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: AdminCreateStoreLocale) =>
      sdk.client.fetch('/admin/store-locales', {
        method: 'POST',
        body: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [STORE_LOCALES_QUERY_KEY],
      })
    },
  })
}

export const useUpdateStoreLocale = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AdminUpdateStoreLocale }) =>
      sdk.client.fetch(`/admin/store-locales/${id}`, {
        method: 'PUT',
        body: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [STORE_LOCALES_QUERY_KEY],
      })
    },
  })
}

export const useDeleteStoreLocale = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) =>
      sdk.client.fetch(`/admin/store-locales/${id}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [STORE_LOCALES_QUERY_KEY],
      })
    },
  })
}
