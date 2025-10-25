import { useForm } from 'react-hook-form'
import { TranslatableEntity } from '@/types/translation'
import { FORM_CONFIG } from './form-config'

export const useTranslationForm = (entityType: TranslatableEntity) => {
  const formProps = FORM_CONFIG[entityType] || {}
  return useForm(formProps)
}
