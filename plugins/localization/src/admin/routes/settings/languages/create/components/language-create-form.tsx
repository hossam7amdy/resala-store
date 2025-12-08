import { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  Button,
  Input,
  Select,
  Switch,
  Heading,
  Text,
  toast,
} from '@medusajs/ui'
import type { StaticLanguage } from '../../../../../../utils'
import { languages, getLanguageByCode } from '../../../../../../utils'
import { useCreateLanguage, useLanguages } from '../../../../../hooks/api'
import { Form } from '../../../../../components/common/form'
import {
  RouteFocusModal,
  useRouteModal,
} from '../../../../../components/modals'
import { KeyboundForm } from '../../../../../components/utilities/keybound-form'

export const LanguageCreateForm: React.FC<{ form: UseFormReturn<any> }> = ({
  form,
}) => {
  const { t } = useTranslation()
  const { handleSuccess } = useRouteModal()
  const createLanguage = useCreateLanguage()
  const { languages: activeLanguages = [] } = useLanguages({
    order: '-is_default',
  })

  const availableLanguages = languages.filter(
    (lang: StaticLanguage) => !activeLanguages.some((l) => l.code === lang.code)
  )

  const handleLanguageSelect = (langCode: string) => {
    const language = getLanguageByCode(langCode)

    if (language) {
      form.setValue('code', language.code)
      form.setValue('name', language.name)
      form.setValue('is_rtl', language.is_rtl)
      form.setValue('native_name', language.native_name)
    }
  }

  const handleSubmit = form.handleSubmit(async (values) => {
    const { native_name, ...rest } = values
    const payload = {
      ...rest,
      metadata: { native_name },
    }

    await createLanguage.mutateAsync(payload, {
      onSuccess: () => {
        toast.success(t('languages.create.successToast'))
        handleSuccess()
      },
      onError: (err) => {
        toast.error(err.message || t('languages.create.errorToast'))
      },
    })
  })

  return (
    <RouteFocusModal.Form form={form}>
      <KeyboundForm
        className="flex h-full flex-col overflow-hidden"
        onSubmit={handleSubmit}
      >
        <RouteFocusModal.Header />
        <RouteFocusModal.Body className="flex flex-1 flex-col overflow-hidden">
          <div className="flex flex-1 flex-col items-center overflow-y-auto">
            <div className="flex w-full max-w-[520px] flex-col gap-y-8 px-2 py-16">
              <div>
                <RouteFocusModal.Title asChild>
                  <Heading>{t('languages.create.title')}</Heading>
                </RouteFocusModal.Title>
                <RouteFocusModal.Description asChild>
                  <Text size="small" className="text-ui-fg-subtle">
                    {t('languages.create.description')}
                  </Text>
                </RouteFocusModal.Description>
              </div>

              <div className="flex flex-col gap-y-4">
                <Form.Field
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <Form.Item>
                      <Form.Label>{t('languages.fields.language')}</Form.Label>
                      <Form.Control>
                        <Select
                          value={field.value}
                          onValueChange={handleLanguageSelect}
                        >
                          <Select.Trigger>
                            <Select.Value
                              placeholder={t('languages.fields.selectLanguage')}
                            />
                          </Select.Trigger>
                          <Select.Content>
                            {availableLanguages.map(
                              (language: StaticLanguage) => (
                                <Select.Item
                                  key={language.code}
                                  value={language.code}
                                >
                                  {language.name} ({language.native_name})
                                </Select.Item>
                              )
                            )}
                          </Select.Content>
                        </Select>
                      </Form.Control>
                      <Form.ErrorMessage />
                    </Form.Item>
                  )}
                />

                <Form.Field
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <Form.Item>
                      <Form.Label>
                        {t('languages.fields.displayName')}
                      </Form.Label>
                      <Form.Control>
                        <Input {...field} />
                      </Form.Control>
                      <Form.ErrorMessage />
                    </Form.Item>
                  )}
                />

                <Form.Field
                  control={form.control}
                  name="native_name"
                  render={({ field }) => (
                    <Form.Item>
                      <Form.Label>
                        {t('languages.fields.nativeName')}
                      </Form.Label>
                      <Form.Control>
                        <Input {...field} />
                      </Form.Control>
                      <Form.ErrorMessage />
                    </Form.Item>
                  )}
                />

                <Form.Field
                  control={form.control}
                  name="is_rtl"
                  render={({ field }) => (
                    <Form.Item>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <Form.Label>{t('languages.fields.isRTL')}</Form.Label>
                      </div>
                      <Form.ErrorMessage />
                    </Form.Item>
                  )}
                />
              </div>
            </div>
          </div>
        </RouteFocusModal.Body>
        <RouteFocusModal.Footer>
          <div className="flex items-center justify-end gap-x-2">
            <RouteFocusModal.Close asChild>
              <Button size="small" variant="secondary">
                {t('actions.cancel')}
              </Button>
            </RouteFocusModal.Close>
            <Button
              size="small"
              type="submit"
              isLoading={createLanguage.isPending}
            >
              {t('actions.save')}
            </Button>
          </div>
        </RouteFocusModal.Footer>
      </KeyboundForm>
    </RouteFocusModal.Form>
  )
}
