import { toast, usePrompt } from '@medusajs/ui'
import { Trash, Eye, EyeSlash, GlobeEurope } from '@medusajs/icons'
import { useTranslation } from 'react-i18next'
import { useUpdateLanguage, useDeleteLanguage } from '../../../../hooks/api'
import { ActionMenu } from '../../../../components/common/action-menu'
import { AdminLanguage } from '../../../../../types'

export const LanguageActions = ({ language }: { language: AdminLanguage }) => {
  const prompt = usePrompt()
  const { t } = useTranslation()
  const { mutateAsync: updateLanguage } = useUpdateLanguage()
  const { mutateAsync: deleteLanguage } = useDeleteLanguage()

  const handlePublishToggle = async () => {
    try {
      await updateLanguage({
        id: language.id,
        data: {
          is_published: !language.is_published,
        },
      })
      toast.success(
        language.is_published
          ? t('languages.update.unpublishSuccess')
          : t('languages.update.publishSuccess')
      )
    } catch {
      toast.error(t('languages.update.error'))
    }
  }

  const handleSetAsDefault = async () => {
    try {
      await updateLanguage({
        id: language.id,
        data: {
          is_default: true,
        },
      })
      toast.success(t('languages.update.setDefaultSuccess'))
    } catch {
      toast.error(t('languages.update.error'))
    }
  }

  const handleDelete = async (language: AdminLanguage) => {
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

    await deleteLanguage(language.code, {
      onSuccess: () => {
        toast.success(t('languages.delete.successToast'))
      },
      onError: (error) => {
        toast.error(error?.message || t('languages.delete.errorToast'))
      },
    })
  }

  return (
    <ActionMenu
      groups={[
        {
          actions: [
            {
              label: language.is_published
                ? t('languages.actions.unpublish')
                : t('languages.actions.publish'),
              onClick: handlePublishToggle,
              icon: language.is_published ? <EyeSlash /> : <Eye />,
              disabled: language.is_default,
            },
          ],
        },
        {
          actions: [
            {
              label: language.is_default
                ? t('languages.actions.default')
                : t('languages.actions.setAsDefault'),
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
