import { createContext, useContext, ReactNode, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import type { AdminStoreLocale } from '@repo/shared-types'
import { useStoreLocales, useEntityTranslations } from '../../../../hooks/api'

interface TranslationContextValue<Entity = any, EntityTranslation = any> {
  entityId: string | undefined
  entityType: string | undefined
  entity: Entity | undefined
  setEntity: (entity: Entity) => void
  isLoading: boolean
  storeLocale: AdminStoreLocale | undefined
  translation: EntityTranslation | undefined
}

const TranslationContext = createContext<TranslationContextValue>(
  {} as TranslationContextValue
)

interface TranslationProviderProps {
  children: ReactNode
}

export function TranslationProvider<Entity>({
  children,
}: TranslationProviderProps) {
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const [entity, setEntity] = useState<Entity>()

  const entityType = pathname.split('/').at(-1)
  const entityId = searchParams.get('id') || undefined
  const locale = searchParams.get('locale') || undefined

  const { storeLocales, isLoading: loadingLocale } = useStoreLocales(
    { code: locale },
    { enabled: !!locale }
  )

  const { translations, isLoading: loadingTranslations } =
    useEntityTranslations(
      entityId!,
      entityType!,
      { locale_id: storeLocales?.[0].id },
      { enabled: !!(storeLocales?.[0].id && entityId && entityType) }
    )

  const translation = translations?.[0]
  const isLoading = loadingLocale || loadingTranslations

  const value: TranslationContextValue<Entity> = {
    entity,
    entityId,
    entityType,
    setEntity,
    isLoading,
    translation,
    storeLocale: storeLocales?.[0],
  }

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslationContext<
  Entity,
  EntityTranslation = any,
>(): TranslationContextValue<Entity, EntityTranslation> {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error(
      'useTranslationContext must be used within a TranslationProvider'
    )
  }
  return context as TranslationContextValue<Entity, EntityTranslation>
}
