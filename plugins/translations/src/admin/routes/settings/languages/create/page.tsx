import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { LanguageCreateForm } from './components/language-create-form'
import { useStore } from '../../../../hooks/api'
import { RouteFocusModal } from '../../../../components'

const LanguageCreateSchema = zod.object({
  code: zod.string().min(1, 'Language is required'),
  name: zod.string().min(1, 'Display name is required'),
  native_name: zod.string().min(1, 'Native name is required'),
  direction: zod.enum(['ltr', 'rtl']),
  is_default: zod.boolean(),
  is_published: zod.boolean(),
})

export type LanguageCreateFormData = zod.infer<typeof LanguageCreateSchema>

const LanguageCreatePage: React.FC = () => {
  const { store, isPending: isLoading, isError, error } = useStore()

  const form = useForm<LanguageCreateFormData>({
    defaultValues: {
      code: '',
      name: '',
      native_name: '',
      direction: 'ltr',
      is_default: false,
      is_published: false,
    },
    resolver: zodResolver(LanguageCreateSchema),
  })

  if (isError) {
    throw error
  }

  const isReady = !isLoading && store

  return isReady ? (
    <RouteFocusModal>
      <RouteFocusModal.Form form={form}>
        <LanguageCreateForm form={form} />
      </RouteFocusModal.Form>
    </RouteFocusModal>
  ) : (
    <></>
  )
}

export default LanguageCreatePage
