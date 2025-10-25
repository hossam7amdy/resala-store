import { useMemo, useState } from 'react'
import { GlobeEurope } from '@medusajs/icons'
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
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Trash, Eye, EyeSlash } from '@medusajs/icons'
import type { AdminStoreLocale } from '@repo/shared-types'

import {
  useStoreLocales,
  useUpdateStoreLocale,
  useDeleteStoreLocale,
  useStore,
} from '../../../hooks/api'
import { ActionMenu } from '../../../components/common/action-menu'

const columnHelper = createDataTableColumnHelper<AdminStoreLocale>()

const LanguageActions = ({ locale }: { locale: AdminStoreLocale }) => {
  const prompt = usePrompt()
  const { store } = useStore()
  const { t } = useTranslation()
  const updateStoreLocale = useUpdateStoreLocale()
  const deleteStoreLocale = useDeleteStoreLocale()

  const handlePublishToggle = async () => {
    try {
      await updateStoreLocale.mutateAsync({
        id: locale.id,
        data: {
          is_published: !locale.is_published,
          store_id: store?.id as string,
        },
      })
      toast.success(
        `Locale ${locale.is_published ? 'unpublished' : 'published'} successfully`
      )
    } catch {
      toast.error('Failed to update locale')
    }
  }

  const handleSetAsDefault = async () => {
    try {
      await updateStoreLocale.mutateAsync({
        id: locale.id,
        data: {
          is_default: true,
          store_id: store?.id as string,
        },
      })
      toast.success('Locale set as default successfully')
    } catch {
      toast.error('Failed to set locale as default')
    }
  }

  const handleDelete = async (locale: AdminStoreLocale) => {
    const confirmed = await prompt({
      title: t('general.areYouSure'),
      description: t('general.areYouSureDescription', {
        entity: 'locale',
        title: locale.name,
      }),
      confirmText: t('actions.delete'),
      cancelText: t('actions.cancel'),
    })

    if (!confirmed) return

    await deleteStoreLocale.mutateAsync(locale.id, {
      onSuccess: () => {
        toast.success('Locale deleted successfully')
      },
      onError: (error) => {
        toast.error(error?.message || 'Failed to delete locale')
      },
    })
  }

  return (
    <ActionMenu
      groups={[
        {
          actions: [
            {
              label: locale.is_published ? 'Unpublish' : 'Publish',
              onClick: handlePublishToggle,
              icon: locale.is_published ? <EyeSlash /> : <Eye />,
              disabled: locale.is_default,
            },
          ],
        },
        {
          actions: [
            {
              label: locale.is_default ? 'Default' : 'Set as default',
              onClick: handleSetAsDefault,
              icon: <GlobeEurope />,
              disabled: locale.is_default || !locale.is_published,
            },
          ],
        },
        {
          actions: [
            {
              label: t('actions.delete'),
              onClick: () => handleDelete(locale),
              icon: <Trash />,
              disabled: locale.is_default,
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
    cell: ({ row }) => <LanguageActions locale={row.original} />,
  }),
]

const limit = 15

export const LocaleList = () => {
  const { t } = useTranslation()
  const [pagination, setPagination] = useState<DataTablePaginationState>({
    pageSize: limit,
    pageIndex: 0,
  })

  const offset = useMemo(() => {
    return pagination.pageIndex * limit
  }, [pagination])

  const { storeLocales, count, isLoading } = useStoreLocales({
    order: '-is_default',
    offset,
    limit,
  })

  const table = useDataTable({
    columns,
    data: storeLocales || [],
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
