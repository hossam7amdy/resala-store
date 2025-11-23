import React, { useState } from 'react'
import { Text } from '@medusajs/ui'
import { AdminProductTag } from '@medusajs/framework/types'

import { useProductTags } from '../../../../../hooks/api'
import { EntitySelector } from '../common'

const PAGE_SIZE = 10

export const ProductTagSelector: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const { product_tags, count, isLoading } = useProductTags({
    order: '-created_at',
    limit: PAGE_SIZE,
    offset: (currentPage - 1) * PAGE_SIZE,
  })

  return (
    <EntitySelector<AdminProductTag>
      entities={product_tags}
      entitiesCount={count}
      title="Product Tags"
      emptyMessage="No product tags available"
      isLoading={isLoading}
      pagination={{
        currentPage,
        pageSize: PAGE_SIZE,
        onPageChange: setCurrentPage,
      }}
      renderEntity={(type: AdminProductTag) => (
        <Text size="large" className="truncate">
          {type.value}
        </Text>
      )}
    />
  )
}
