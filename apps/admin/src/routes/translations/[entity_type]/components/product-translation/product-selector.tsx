import React, { useState } from 'react'
import { Badge, Text } from '@medusajs/ui'
import { AdminProduct } from '@medusajs/framework/types'

import { EntitySelector } from '../common'
import { useProducts } from '../../../../../hooks/api'

const PAGE_SIZE = 10

export const ProductSelector: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const { products, count, isLoading } = useProducts({
    order: '-created_at',
    limit: PAGE_SIZE,
    offset: (currentPage - 1) * PAGE_SIZE,
  })

  return (
    <EntitySelector<AdminProduct>
      entities={products}
      entitiesCount={count}
      title="Products"
      emptyMessage="No products available"
      isLoading={isLoading}
      pagination={{
        currentPage,
        pageSize: PAGE_SIZE,
        onPageChange: setCurrentPage,
      }}
      renderEntity={(product: AdminProduct) => (
        <div>
          <div className="flex items-center gap-3">
            {product.thumbnail && (
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-8 h-8 rounded object-cover"
              />
            )}
            <div className="flex-1 min-w-0">
              <Text size="large" className="truncate">
                {product.title}
              </Text>
              <Text size="xsmall" className="truncate">
                {product.handle}
              </Text>
            </div>
          </div>
          {product.options && product.options.length > 0 && (
            <div className="flex items-center gap-1">
              <Badge size="small">
                {product.options.length} option
                {product.options.length !== 1 ? 's' : ''}
              </Badge>
            </div>
          )}
        </div>
      )}
    />
  )
}
