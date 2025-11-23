import React, { useEffect, useRef } from 'react'
import { RadioGroup, Text, Button, Skeleton, Heading } from '@medusajs/ui'
import { useSearchParams } from 'react-router-dom'
import { ChevronLeftMini, ChevronRightMini } from '@medusajs/icons'

import { useTranslationContext } from '../../contexts'

export interface PaginationConfig {
  currentPage: number
  pageSize: number
  onPageChange: (page: number) => void
}

interface EntitySelectorProps<Entity> {
  entities?: Entity[]
  entitiesCount?: number
  title: string
  emptyMessage?: string
  renderEntity: (entity: Entity) => React.ReactNode
  pagination?: PaginationConfig
  isLoading?: boolean
}

export function EntitySelector<Entity extends { id: string }>({
  entities = [],
  entitiesCount = 0,
  title,
  emptyMessage,
  renderEntity,
  pagination,
  isLoading,
}: EntitySelectorProps<Entity>) {
  const initialRef = useRef(true)
  const { setEntity } = useTranslationContext()
  const [searchParams, setSearchParams] = useSearchParams()

  const handleEntityChange = (entity: Entity) => {
    setEntity(entity)
    setSearchParams((prev) => {
      prev.set('id', entity.id)
      return prev
    })
  }

  useEffect(() => {
    if (initialRef.current && entities.length > 0) {
      initialRef.current = false
      const entityId = searchParams.get('id')
      const activeEntity = entities.find((entity) => entity.id === entityId)
      handleEntityChange(activeEntity || entities[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entities])

  const totalPages = pagination
    ? Math.ceil(entitiesCount / pagination.pageSize)
    : 1
  const hasNextPage = pagination && pagination.currentPage < totalPages
  const hasPreviousPage = pagination && pagination.currentPage > 1

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 px-2 py-4 border-b">
        <Heading>{title}</Heading>
        <Text size="small">
          {entitiesCount || 0} {entitiesCount === 1 ? 'item' : 'items'}{' '}
          available
        </Text>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto py-2">
          {isLoading ? (
            <div className="space-y-1">
              {Array.from({ length: pagination?.pageSize || 5 }).map((_, i) => (
                <div key={i} className="p-4 border-b">
                  <Skeleton className="h-12 w-full" />
                </div>
              ))}
            </div>
          ) : entities.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-gray-500">
              {emptyMessage || 'No items available'}
            </div>
          ) : (
            <RadioGroup
              className="p-2"
              value={searchParams.get('id') || undefined}
            >
              {entities.map((entity) => (
                <RadioGroup.ChoiceBox
                  key={entity.id}
                  value={entity.id}
                  label={renderEntity(entity) as any}
                  description=""
                  onClick={() => handleEntityChange(entity)}
                />
              ))}
            </RadioGroup>
          )}
        </div>

        {pagination && (
          <div className="flex items-center justify-between border-t p-2">
            <Button
              size="small"
              variant="secondary"
              onClick={() =>
                pagination.onPageChange(pagination.currentPage - 1)
              }
              disabled={!hasPreviousPage}
            >
              <ChevronLeftMini />
            </Button>
            <Text size="xsmall">
              Page {pagination.currentPage} of {totalPages}
            </Text>
            <Button
              size="small"
              variant="secondary"
              onClick={() =>
                pagination.onPageChange(pagination.currentPage + 1)
              }
              disabled={!hasNextPage}
            >
              <ChevronRightMini />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
