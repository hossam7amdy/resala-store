import { useForm } from 'react-hook-form'
import type { TranslatableEntity } from '../../../../../types'
import { FORM_CONFIG } from './form-config'

export const useTranslationForm = (entityType: TranslatableEntity) => {
  const formProps = FORM_CONFIG[entityType] || {}
  return useForm(formProps)
}
