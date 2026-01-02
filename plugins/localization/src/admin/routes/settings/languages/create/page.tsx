import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { LanguageCreateForm } from './components/language-create-form'
import { RouteFocusModal } from '../../../../components'

const LanguageCreateSchema = zod.object({
  code: zod.string().min(1, 'Language is required'),
  name: zod.string().min(1, 'Display name is required'),
  native_name: zod.string().min(1, 'Native name is required'),
  is_rtl: zod.boolean(),
})

export type LanguageCreateFormData = zod.infer<typeof LanguageCreateSchema>

const LanguageCreatePage: React.FC = () => {
  const form = useForm<LanguageCreateFormData>({
    defaultValues: {
      code: '',
      name: '',
      native_name: '',
      is_rtl: false,
    },
    resolver: zodResolver(LanguageCreateSchema),
  })

  return (
    <RouteFocusModal>
      <RouteFocusModal.Form form={form}>
        <LanguageCreateForm form={form} />
      </RouteFocusModal.Form>
    </RouteFocusModal>
  )
}

export default LanguageCreatePage
