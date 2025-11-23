import React from 'react'
import { Button } from '@medusajs/ui'
import { toast } from '@medusajs/ui'
import { useTranslation } from 'react-i18next'
import { UseFormReturn } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useTranslationContext } from '../../contexts'
import { useUpsertEntityTranslations } from '../../../../../hooks/api'

interface FormActionsProps {
  form: UseFormReturn<any>
}

export const FormActions: React.FC<FormActionsProps> = ({ form }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { entityId, entityType, storeLanguage } = useTranslationContext()

  const { mutateAsync, isPending } = useUpsertEntityTranslations(
    entityId!,
    entityType!
  )

  const handleSave = form.handleSubmit(async (data) => {
    if (!storeLanguage) {
      toast.error('Missing language information')
      return
    }
    try {
      await mutateAsync({
        [storeLanguage.id]: data,
      })

      toast.success('Translation saved successfully')
    } catch (error: any) {
      toast.error(error?.message || 'Failed to save translation')
    }
  })

  const handleCancel = () => {
    navigate({
      pathname: '/translations',
      search: `?language=${searchParams.get('language') ?? ''}`,
    })
  }

  const { formState } = form
  const isDisabled = isPending || formState.isSubmitting

  return (
    <div className="flex gap-2">
      <Button variant="secondary" onClick={handleCancel} type="button">
        {t('actions.cancel')}
      </Button>
      <Button onClick={handleSave} disabled={isDisabled} type="submit">
        {t('actions.save')}
      </Button>
    </div>
  )
}
