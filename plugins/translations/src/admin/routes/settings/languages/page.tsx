import { useMemo, useState } from 'react'
import {
  createDataTableColumnHelper,
  Container,
  DataTable,
  useDataTable,
  Heading,
  StatusBadge,
  Toaster,
  toast,
  DataTablePaginationState,
  Badge,
  usePrompt,
  Button,
} from '@medusajs/ui'
import { defineRouteConfig } from '@medusajs/admin-sdk'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Trash, Eye, EyeSlash, GlobeEurope } from '@medusajs/icons'
import type { AdminStoreLocale } from '../../../../types'
import {
  useStoreLanguages,
  useUpdateStoreLanguage,
  useDeleteStoreLanguage,
  useStore,
} from '../../../hooks/api'
import { ActionMenu } from '../../../components/common/action-menu'

const columnHelper = createDataTableColumnHelper<AdminStoreLocale>()

const LanguageActions = ({ language }: { language: AdminStoreLocale }) => {
  const prompt = usePrompt()
  const { store } = useStore()
  const { t } = useTranslation()
  const updateStoreLanguage = useUpdateStoreLanguage()
  const deleteStoreLanguage = useDeleteStoreLanguage()

  const handlePublishToggle = async () => {
    try {
      await updateStoreLanguage.mutateAsync({
        id: language.id,
        data: {
          is_published: !language.is_published,
          store_id: store?.id as string,
        },
      })
      toast.success(
        `Language ${language.is_published ? 'unpublished' : 'published'} successfully`
      )
    } catch {
      toast.error('Failed to update language')
    }
  }

  const handleSetAsDefault = async () => {
    try {
      await updateStoreLanguage.mutateAsync({
        id: language.id,
        data: {
          is_default: true,
          store_id: store?.id as string,
        },
      })
      toast.success('Language set as default successfully')
    } catch {
      toast.error('Failed to set language as default')
    }
  }

  const handleDelete = async (language: AdminStoreLocale) => {
    const confirmed = await prompt({
      title: t('general.areYouSure'),
      description: t('general.areYouSureDescription', {
        entity: 'language',
        title: language.name,
      }),
      confirmText: t('actions.delete'),
      cancelText: t('actions.cancel'),
    })

    if (!confirmed) return

    await deleteStoreLanguage.mutateAsync(language.id, {
      onSuccess: () => {
        toast.success('Language deleted successfully')
      },
      onError: (error) => {
        toast.error(error?.message || 'Failed to delete language')
      },
    })
  }

  return (
    <ActionMenu
      groups={[
        {
          actions: [
            {
              label: language.is_published ? 'Unpublish' : 'Publish',
              onClick: handlePublishToggle,
              icon: language.is_published ? <EyeSlash /> : <Eye />,
              disabled: language.is_default,
            },
          ],
        },
        {
          actions: [
            {
              label: language.is_default ? 'Default' : 'Set as default',
              onClick: handleSetAsDefault,
              icon: <GlobeEurope />,
              disabled: language.is_default || !language.is_published,
            },
          ],
        },
        {
          actions: [
            {
              label: t('actions.delete'),
              onClick: () => handleDelete(language),
              icon: <Trash />,
              disabled: language.is_default,
            },
          ],
        },
      ]}
    />
  )
}

const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: ({ row }) => {
      let name = row.original.name
      if (row.original.is_default) {
        name += ' (default)'
      }
      return name
    },
  }),
  columnHelper.accessor('native_name', {
    header: 'Native Name',
  }),
  columnHelper.accessor('direction', {
    header: 'Direction',
    cell: ({ row }) => {
      return (
        <Badge
          color={row.original.direction === 'rtl' ? 'purple' : 'grey'}
          size="2xsmall"
        >
          {row.original.direction.toUpperCase()}
        </Badge>
      )
    },
  }),
  columnHelper.accessor('is_published', {
    header: 'Status',
    cell: ({ row }) => {
      return (
        <StatusBadge color={row.original.is_published ? 'green' : 'grey'}>
          {row.original.is_published ? 'Published' : 'Not published'}
        </StatusBadge>
      )
    },
  }),
  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => <LanguageActions language={row.original} />,
  }),
]

const limit = 15

const LanguageListPage = () => {
  const { t } = useTranslation()
  const [pagination, setPagination] = useState<DataTablePaginationState>({
    pageSize: limit,
    pageIndex: 0,
  })

  const offset = useMemo(() => {
    return pagination.pageIndex * limit
  }, [pagination])

  const { storeLanguages, count, isLoading } = useStoreLanguages({
    order: '-is_default',
    offset,
    limit,
  })

  const table = useDataTable({
    columns,
    data: storeLanguages || [],
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
        <Heading>Store Languages</Heading>
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
        <DataTable.Pagination />
      </DataTable>
      <Toaster />
    </Container>
  )
}

export const config = defineRouteConfig({
  label: 'Languages',
})

export default LanguageListPage
