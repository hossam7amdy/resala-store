import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FetchError } from '@medusajs/js-sdk'
import type {
  AdminStoreLocaleResponse,
  AdminStoreLocaleListResponse,
  AdminCreateStoreLocale,
  AdminUpdateStoreLocale,
  AdminStoreLocaleParams,
} from '../../../types'
import {
  queryKeysFactory,
  UseQueryOptionsWrapper,
} from '../../lib/query-key-factory'
import { sdk } from '../../lib/sdk'

const STORE_LANGUAGES_QUERY_KEY = 'store-languages'
export const storeLanguageQueryKeys = queryKeysFactory(
  STORE_LANGUAGES_QUERY_KEY
)

export const useStoreLanguage = (
  id: string,
  query?: Record<string, any>,
  options?: UseQueryOptionsWrapper<AdminStoreLocaleResponse, FetchError>
) => {
  const { data, ...rest } = useQuery<AdminStoreLocaleResponse, FetchError>({
    queryFn: () => sdk.client.fetch(`/admin/store-locales/${id}`),
    queryKey: storeLanguageQueryKeys.detail(id, query),
    ...options,
  })
  return { ...data, ...rest }
}

export const useStoreLanguages = (
  query?: AdminStoreLocaleParams,
  options?: UseQueryOptionsWrapper<AdminStoreLocaleListResponse, FetchError>
) => {
  const { data, ...rest } = useQuery<AdminStoreLocaleListResponse, FetchError>({
    queryFn: () => sdk.client.fetch('/admin/store-locales', { query }),
    queryKey: storeLanguageQueryKeys.list(query),
    ...options,
  })
  return { storeLanguages: data?.storeLocales, ...data, ...rest }
}

export const useCreateStoreLanguage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: AdminCreateStoreLocale) =>
      sdk.client.fetch('/admin/store-locales', {
        method: 'POST',
        body: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [STORE_LANGUAGES_QUERY_KEY],
      })
    },
  })
}

export const useUpdateStoreLanguage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AdminUpdateStoreLocale }) =>
      sdk.client.fetch(`/admin/store-locales/${id}`, {
        method: 'PUT',
        body: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [STORE_LANGUAGES_QUERY_KEY],
      })
    },
  })
}

export const useDeleteStoreLanguage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) =>
      sdk.client.fetch(`/admin/store-locales/${id}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [STORE_LANGUAGES_QUERY_KEY],
      })
    },
  })
}
