import type { ReactNode } from 'react'
import { Heading, Skeleton, Text } from '@medusajs/ui'

import { useTranslationContext } from '../../contexts'

interface EntityTranslationEditorProps<Entity> {
  title?: string
  subtitle?: string
  entity?: Entity
  isLoading?: boolean
  emptyMessage?: string
  autoTranslateButton?: ReactNode
  children: ReactNode
  skeletonCount?: number
  isUpdating?: boolean
}

export function EntityTranslationEditor<Entity>({
  entity,
  isLoading,
  title = 'Translation Editor',
  subtitle = 'Entity details',
  emptyMessage = 'Select both entity and language to start translating',
  autoTranslateButton,
  children,
  skeletonCount = 5,
  isUpdating,
}: EntityTranslationEditorProps<Entity>) {
  const { storeLocale } = useTranslationContext()

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    )
  }

  if (!entity || !storeLocale) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="p-8 text-center text-gray-500 border-2 border-dashed rounded-lg">
          <Text>{emptyMessage}</Text>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-[10px] space-y-2">
        <div className="flex items-center justify-between flex-shrink-0">
          <Heading>{title}</Heading>
          {autoTranslateButton}
        </div>
        <div className="flex justify-between items-center">
          <Text size="small">{subtitle}</Text>
          {isUpdating && (
            <Text className="text-xs text-gray-500">
              Editing existing translation
            </Text>
          )}
        </div>
      </div>
      <div className="flex-1 p-1 overflow-y-auto">{children}</div>
    </div>
  )
}
