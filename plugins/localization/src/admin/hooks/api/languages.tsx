import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FetchError } from '@medusajs/js-sdk'
import type {
  AdminCreateLanguage,
  AdminUpdateLanguage,
  AdminLanguageResponse,
  AdminLanguageListParams,
  AdminLanguageListResponse,
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

export const useLanguages = (
  query?: AdminLanguageListParams,
  options?: UseQueryOptionsWrapper<AdminLanguageListResponse, FetchError>
) => {
  const { data, ...rest } = useQuery<AdminLanguageListResponse, FetchError>({
    queryFn: () => sdk.client.fetch('/admin/languages', { query }),
    queryKey: storeLanguageQueryKeys.list(query),
    ...options,
  })
  return {
    ...data,
    ...rest,
  }
}

export const useCreateLanguage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: AdminCreateLanguage) =>
      sdk.client.fetch<AdminLanguageResponse>('/admin/languages', {
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

export const useUpdateLanguage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AdminUpdateLanguage }) =>
      sdk.client.fetch<AdminLanguageResponse>(`/admin/languages/${id}`, {
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

export const useDeleteLanguage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (code: string) =>
      sdk.client.fetch(`/admin/languages/${code}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [STORE_LANGUAGES_QUERY_KEY],
      })
    },
  })
}
