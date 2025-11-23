import { useState } from 'react'
import {
  createDataTableColumnHelper,
  useDataTable,
  DataTable,
  Heading,
  Container,
  DataTablePaginationState,
} from '@medusajs/ui'
import { defineRouteConfig } from '@medusajs/admin-sdk'
import { ChevronRight, GlobeEurope } from '@medusajs/icons'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { LanguageSelector } from './[entity_type]/components/common'
import { isValidEntityType } from './[entity_type]/config'
import { ActiveLanguageSummary } from './components'
import { TranslationEntity, useTranslatableEntities } from '../../hooks/api'

const columnHelper = createDataTableColumnHelper<TranslationEntity>()

const columns = [
  columnHelper.accessor('name', {
    header: 'Resource',
  }),
  columnHelper.display({
    id: 'actions',
    cell: () => (
      <div className="w-full flex justify-end">
        <ChevronRight />
      </div>
    ),
  }),
]

const limit = 10

const TranslationsPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { entities = [], isLoading } = useTranslatableEntities()
  const [pagination, setPagination] = useState<DataTablePaginationState>({
    pageSize: limit,
    pageIndex: 0,
  })

  const table = useDataTable({
    columns,
    isLoading,
    data: entities,
    getRowId: (entity) => entity.path,
    rowCount: entities.length,
    pagination: {
      state: pagination,
      onPaginationChange: setPagination,
    },
    onRowClick: (_, row: any) => {
      const pathname = row.original.path
      if (isValidEntityType(pathname))
        navigate({
          pathname: row.original.path,
          search: searchParams.toString(),
        })
    },
  })

  return (
    <div className="flex gap-5">
      <Container className="p-0 flex-1">
        <div className="flex items-center justify-between px-6 py-4">
          <Heading>Translations</Heading>
          <LanguageSelector />
        </div>
        <DataTable instance={table}>
          <DataTable.Table />
          <DataTable.Pagination />
        </DataTable>
      </Container>
      <ActiveLanguageSummary />
    </div>
  )
}

export const config = defineRouteConfig({
  label: 'Translations',
  icon: GlobeEurope,
})

export default TranslationsPage
