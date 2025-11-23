import React, { useState } from 'react'
import { Text } from '@medusajs/ui'
import { AdminCollection } from '@medusajs/framework/types'

import { EntitySelector } from '../common'
import { useCollections } from '../../../../../hooks/api'

const PAGE_SIZE = 10

export const CollectionSelector: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const { collections, count, isLoading } = useCollections({
    order: '-created_at',
    limit: PAGE_SIZE,
    offset: (currentPage - 1) * PAGE_SIZE,
  })

  return (
    <EntitySelector<AdminCollection>
      entities={collections}
      entitiesCount={count}
      title="Collections"
      emptyMessage="No collections available"
      isLoading={isLoading}
      pagination={{
        currentPage,
        pageSize: PAGE_SIZE,
        onPageChange: setCurrentPage,
      }}
      renderEntity={(collection: AdminCollection) => (
        <div className="flex-1 min-w-0">
          <Text size="large" className="truncate">
            {collection.title}
          </Text>
          <Text size="xsmall" className="truncate">
            {collection.handle}
          </Text>
        </div>
      )}
    />
  )
}
