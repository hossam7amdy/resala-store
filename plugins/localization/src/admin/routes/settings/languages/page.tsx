import { useMemo, useState } from 'react'
import {
  createDataTableColumnHelper,
  Container,
  DataTable,
  useDataTable,
  Heading,
  StatusBadge,
  Toaster,
  Button,
  DataTablePaginationState,
} from '@medusajs/ui'
import { Link } from 'react-router-dom'
import { defineRouteConfig } from '@medusajs/admin-sdk'
import { useTranslation } from 'react-i18next'
import type { AdminLanguage } from '../../../../types'
import { useLanguages } from '../../../hooks/api'
import { LanguageActions } from './components'

const columnHelper = createDataTableColumnHelper<AdminLanguage>()

const useColumns = () => {
  const { t } = useTranslation()

  return [
    columnHelper.accessor('name', {
      header: t('languages.table.name'),
      cell: ({ row }) => {
        let name = row.original.name
        if (row.original.is_default) {
          name += ` ${t('languages.table.default')}`
        }
        return name
      },
    }),
    columnHelper.accessor('code', {
      header: t('languages.table.code'),
      cell: ({ row }) => row.original.code.toUpperCase(),
    }),
    columnHelper.accessor('is_published', {
      header: t('languages.table.status'),
      cell: ({ row }) => {
        return (
          <StatusBadge color={row.original.is_published ? 'green' : 'grey'}>
            {row.original.is_published
              ? t('languages.table.published')
              : t('languages.table.notPublished')}
          </StatusBadge>
        )
      },
    }),
    columnHelper.display({
      id: 'actions',
      cell: ({ row }) =>
        row.original.is_default ? null : (
          <LanguageActions language={row.original} />
        ),
    }),
  ]
}

const limit = 20

const LanguageListPage = () => {
  const { t } = useTranslation()
  const columns = useColumns()
  const [pagination, setPagination] = useState<DataTablePaginationState>({
    pageSize: limit,
    pageIndex: 0,
  })

  const offset = useMemo(() => {
    return pagination.pageIndex * limit
  }, [pagination])

  const { languages, count, isLoading } = useLanguages({
    order: '-is_default',
    offset,
    limit,
  })

  const paginationTranslations = useMemo(
    () => ({
      of: t('general.of'),
      results: t('general.results'),
      pages: t('general.pages'),
      prev: t('general.prev'),
      next: t('general.next'),
    }),
    [t]
  )

  const table = useDataTable({
    columns,
    data: languages || [],
    rowCount: count || 0,
    isLoading,
    pagination: {
      state: pagination,
      onPaginationChange: setPagination,
    },
    getRowId: (row) => row.id,
  })

  return (
    <Container>
      <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
        <Heading>{t('languages.title')}</Heading>
        <Link to="create">
          <Button variant="secondary" size="small">
            {t('actions.create')}
          </Button>
        </Link>
      </div>
      <DataTable instance={table} className="mt-4">
        <DataTable.Table
          emptyState={{
            empty: {
              heading: t('general.noRecordsTitle'),
              description: t('general.noRecordsMessage'),
            },
          }}
        />
        <DataTable.Pagination translations={paginationTranslations} />
      </DataTable>
      <Toaster />
    </Container>
  )
}

export const config = defineRouteConfig({
  label: 'Languages',
})

export default LanguageListPage
