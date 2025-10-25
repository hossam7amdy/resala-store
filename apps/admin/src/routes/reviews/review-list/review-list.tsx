import {
  createDataTableColumnHelper,
  Container,
  DataTable,
  useDataTable,
  Heading,
  createDataTableCommandHelper,
  DataTableRowSelectionState,
  StatusBadge,
  Toaster,
  toast,
  DataTablePaginationState,
} from '@medusajs/ui'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import type { AdminReview } from '@repo/shared-types'
import { useReviews, useUpdateReviewsStatus } from '../../../hooks/api'

const columnHelper = createDataTableColumnHelper<AdminReview>()

const columns = [
  columnHelper.select(),
  columnHelper.accessor('title', {
    header: 'Title',
  }),
  columnHelper.accessor('rating', {
    header: 'Rating',
    cell: ({ row }) => {
      return <span>{row.original.rating} / 5</span>
    },
  }),
  columnHelper.accessor('content', {
    header: 'Content',
    cell: ({ row }) => {
      return (
        <div
          title={row.original.content}
          className="w-[300px] truncate overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {row.original.content}
        </div>
      )
    },
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: ({ row }) => {
      const color =
        row.original.status === 'approved'
          ? 'green'
          : row.original.status === 'rejected'
            ? 'red'
            : 'grey'
      return (
        <StatusBadge color={color}>
          {row.original.status.charAt(0).toUpperCase() +
            row.original.status.slice(1)}
        </StatusBadge>
      )
    },
  }),
  columnHelper.accessor('product', {
    header: 'Product',
    cell: ({ row }) => {
      return (
        <Link to={`/products/${row.original.product_id}`}>
          {row.original.product?.title}
        </Link>
      )
    },
  }),
]

const commandHelper = createDataTableCommandHelper()

const useCommands = () => {
  const updateReviewsStatus = useUpdateReviewsStatus()

  return [
    commandHelper.command({
      label: 'Approve',
      shortcut: 'A',
      action: async (selection) => {
        const reviewsToApproveIds = Object.keys(selection)

        try {
          await updateReviewsStatus.mutateAsync({
            ids: reviewsToApproveIds,
            status: 'approved',
          })
          toast.success('Reviews approved')
        } catch {
          toast.error('Failed to approve reviews')
        }
      },
    }),
    commandHelper.command({
      label: 'Reject',
      shortcut: 'R',
      action: async (selection) => {
        const reviewsToRejectIds = Object.keys(selection)

        try {
          await updateReviewsStatus.mutateAsync({
            ids: reviewsToRejectIds,
            status: 'rejected',
          })
          toast.success('Reviews rejected')
        } catch {
          toast.error('Failed to reject reviews')
        }
      },
    }),
  ]
}

const limit = 15

const ReviewList = () => {
  const { t } = useTranslation()
  const [pagination, setPagination] = useState<DataTablePaginationState>({
    pageSize: limit,
    pageIndex: 0,
  })
  const [rowSelection, setRowSelection] = useState<DataTableRowSelectionState>(
    {}
  )

  const offset = useMemo(() => {
    return pagination.pageIndex * limit
  }, [pagination])

  const { reviews, count, isLoading } = useReviews({
    offset,
    limit,
  })

  const commands = useCommands()

  const table = useDataTable({
    columns,
    data: reviews || [],
    rowCount: count,
    isLoading,
    pagination: {
      state: pagination,
      onPaginationChange: setPagination,
    },
    commands,
    rowSelection: {
      state: rowSelection,
      onRowSelectionChange: setRowSelection,
    },
    getRowId: (row) => row.id,
  })

  return (
    <Container className="p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading>Reviews</Heading>
      </div>
      <DataTable instance={table}>
        <DataTable.Table
          emptyState={{
            empty: {
              heading: t('general.noRecordsTitle'),
              description: t('general.noRecordsMessage'),
            },
          }}
        />
        <DataTable.Pagination />
        <DataTable.CommandBar selectedLabel={(count) => `${count} selected`} />
      </DataTable>
      <Toaster />
    </Container>
  )
}

export default ReviewList
