import { useParams, Navigate } from 'react-router-dom'
import { FormActions, LocaleSelector } from './components/common'
import { useTranslationForm } from './hooks'
import { TranslationProvider } from './contexts'
import { ENTITY_CONFIG, isValidEntityType } from './config'
import { RouteFocusModal } from '../../../components/modals'

export const TranslationPage = () => {
  const { entity_type } = useParams()
  const form = useTranslationForm(entity_type!)

  if (!isValidEntityType(entity_type)) {
    return <Navigate to="/translations" replace />
  }

  const { Selector, Editor } = ENTITY_CONFIG[entity_type as string]

  return (
    <TranslationProvider>
      <RouteFocusModal>
        <RouteFocusModal.Form form={form}>
          <RouteFocusModal.Header>
            <RouteFocusModal.Title>
              <LocaleSelector />
            </RouteFocusModal.Title>
            <RouteFocusModal.Close />
          </RouteFocusModal.Header>
          <RouteFocusModal.Body className="flex-1 overflow-hidden">
            <div className="h-full grid grid-cols-[300px_1fr]">
              <div className="border-r overflow-hidden">
                <Selector />
              </div>
              <div className="overflow-hidden">
                <Editor form={form} />
              </div>
            </div>
          </RouteFocusModal.Body>
          <RouteFocusModal.Footer>
            <FormActions form={form} />
          </RouteFocusModal.Footer>
        </RouteFocusModal.Form>
      </RouteFocusModal>
    </TranslationProvider>
  )
}
