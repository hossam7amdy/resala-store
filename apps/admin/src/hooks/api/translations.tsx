import { FetchError } from '@medusajs/js-sdk'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type {
  TranslatableEntity,
  AdminTranslationListParams,
  AdminTranslationListResponse,
  AdminUpsertTranslationsPayload,
} from '@repo/shared-types'
import {
  queryKeysFactory,
  UseQueryOptionsWrapper,
} from '../../lib/query-key-factory'
import { sdk } from '../../lib/client'

const TRANSLATIONS_QUERY_KEY = 'translations' as const
export const translationsQueryKeys = queryKeysFactory(TRANSLATIONS_QUERY_KEY)

export type TranslationEntity = {
  name: string
  path: TranslatableEntity
}

export function useEntityTranslations<Entity>(
  entityId: string,
  entityType: string,
  query?: AdminTranslationListParams,
  options?: UseQueryOptionsWrapper<
    AdminTranslationListResponse<Entity>,
    FetchError
  >
) {
  const { data, ...rest } = useQuery({
    queryKey: translationsQueryKeys.list({ ...query, entityId }),
    queryFn: () =>
      sdk.client.fetch<AdminTranslationListResponse<Entity>>(
        `/admin/translations/${entityType}/${entityId}`,
        { query }
      ),
    ...options,
  })
  return { ...data, ...rest }
}

export function useUpsertEntityTranslations<Entity>(
  entityId: string,
  entityType: string
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: AdminUpsertTranslationsPayload<Entity>) =>
      sdk.client.fetch(`/admin/translations/${entityType}/${entityId}`, {
        method: 'POST',
        body: data,
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: translationsQueryKeys.lists(),
      })
      queryClient.invalidateQueries({
        queryKey: translationsQueryKeys.list({
          entityId: variables.entity_id,
        }),
      })
    },
  })
}

export function useTranslatableEntities() {
  const { data, ...rest } = useQuery({
    queryKey: translationsQueryKeys.list('translatable-entities'),
    queryFn: async () => {
      const entities: TranslationEntity[] = [
        {
          name: 'Products',
          path: 'products',
        },
        {
          name: 'Collections',
          path: 'product_collections',
        },
        {
          name: 'Categories',
          path: 'product_categories',
        },
        {
          name: 'Product Types',
          path: 'product_types',
        },
        {
          name: 'Product Tags',
          path: 'product_tags',
        },
      ]
      return { entities }
    },
    staleTime: Infinity,
  })
  return { ...data, ...rest }
}
