import React from 'react'
import { useStore } from '../../../hooks/api'
import { LocaleCreateForm } from './components/locale-create-form'
import { RouteFocusModal } from '../../../components/modals'

export const LocaleCreate: React.FC = () => {
  const { store, isPending: isLoading, isError, error } = useStore()

  if (isError) {
    throw error
  }

  const isReady = !isLoading && store

  return isReady ? (
    <RouteFocusModal>
      <LocaleCreateForm />
    </RouteFocusModal>
  ) : (
    <></>
  )
}
