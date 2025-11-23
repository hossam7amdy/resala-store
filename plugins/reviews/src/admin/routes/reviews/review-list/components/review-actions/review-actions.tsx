import { toast, usePrompt, DropdownMenu, IconButton } from '@medusajs/ui'
import { AdminReview } from '../../../../../../types'

import { useDeleteReview } from '../../../../../hooks/api'
import { EllipsisHorizontal, Trash } from '@medusajs/icons'
import { useTranslation } from 'react-i18next'

export const ReviewActions = ({ review }: { review: AdminReview }) => {
  const prompt = usePrompt()
  const { t } = useTranslation()
  const deleteReview = useDeleteReview()

  const handleDelete = async () => {
    const confirmed = await prompt({
      title: 'Are you sure?',
      description:
        'Are you sure you want to delete this review? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
    })

    if (!confirmed) return

    try {
      await deleteReview.mutateAsync(review.id)
      toast.success('Review deleted successfully')
    } catch {
      toast.error('Failed to delete review')
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <IconButton variant="transparent">
          <EllipsisHorizontal />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onClick={handleDelete}>
          <Trash className="mr-2" />
          {t('actions.delete')}
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}
