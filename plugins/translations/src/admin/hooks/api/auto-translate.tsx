import {
  useMutation,
  useQuery,
  QueryKey,
  UseQueryOptions,
} from '@tanstack/react-query'
import { FetchError } from '@medusajs/js-sdk'
import type {
  AdminAutoTranslateFields,
  AdminAutoTranslateFieldResponse,
} from '../../../types'
import { queryKeysFactory } from '../../lib/query-key-factory'
import { sdk } from '../../lib/sdk'

const AUTO_TRANSLATE_QUERY_KEY = 'auto-translate'
export const storeAutoTranslateQueryKeys = queryKeysFactory(
  AUTO_TRANSLATE_QUERY_KEY
)

export const useAutoTranslateService = (
  options?: Omit<
    UseQueryOptions<never, FetchError, never, QueryKey>,
    'queryFn' | 'queryKey'
  >
) => {
  return useQuery<never, FetchError>({
    queryFn: () => sdk.client.fetch(`/admin/auto-translate`),
    queryKey: storeAutoTranslateQueryKeys.list(),
    ...options,
  })
}

export const useAutoTranslateFields = () => {
  return useMutation({
    mutationFn: (data: AdminAutoTranslateFields) =>
      sdk.client.fetch<AdminAutoTranslateFieldResponse>(
        '/admin/auto-translate',
        {
          method: 'POST',
          body: data,
        }
      ),
  })
}
