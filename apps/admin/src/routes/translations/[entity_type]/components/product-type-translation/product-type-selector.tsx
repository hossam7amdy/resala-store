import React, { useState } from 'react'
import { Text } from '@medusajs/ui'
import { AdminProductType } from '@medusajs/framework/types'

import { EntitySelector } from '../common'
import { useProductTypes } from '../../../../../hooks/api'

const PAGE_SIZE = 10

export const ProductTypeSelector: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const { product_types, count, isLoading } = useProductTypes({
    order: '-created_at',
    limit: PAGE_SIZE,
    offset: (currentPage - 1) * PAGE_SIZE,
  })

  return (
    <EntitySelector<AdminProductType>
      entities={product_types}
      entitiesCount={count}
      title="Product Types"
      emptyMessage="No product types available"
      isLoading={isLoading}
      pagination={{
        currentPage,
        pageSize: PAGE_SIZE,
        onPageChange: setCurrentPage,
      }}
      renderEntity={(type: AdminProductType) => (
        <Text size="large" className="truncate">
          {type.value}
        </Text>
      )}
    />
  )
}
