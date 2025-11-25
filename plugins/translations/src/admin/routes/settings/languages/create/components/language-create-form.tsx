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
import {
  languages,
  type StaticLanguage,
} from '../../../../../lib/data/languages'
import { useCreateStoreLanguage, useStore } from '../../../../../hooks/api'
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
  const { store } = useStore()
  const createStoreLanguage = useCreateStoreLanguage()

  const handleLanguageSelect = (locale: string) => {
    const language = languages.find(
      (lang: StaticLanguage) => lang.locale === locale
    )
    if (language) {
      form.setValue('code', language.locale)
      form.setValue('name', language.name)
      form.setValue('native_name', language.native_name)
      form.setValue('direction', language.direction)
    }
  }

  const handleSubmit = form.handleSubmit(async (values) => {
    await createStoreLanguage.mutateAsync(
      {
        ...values,
        store_id: store?.id as string,
      },
      {
        onSuccess: () => {
          toast.success(
            t(
              'languages.create.successToast',
              'Store language created successfully'
            )
          )
          handleSuccess()
        },
        onError: (err) => {
          toast.error(
            err.message ||
              t(
                'languages.create.errorToast',
                'Failed to create store language'
              )
          )
        },
      }
    )
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
                  <Heading>
                    {t('languages.create.title', 'Create Language')}
                  </Heading>
                </RouteFocusModal.Title>
                <RouteFocusModal.Description asChild>
                  <Text size="small" className="text-ui-fg-subtle">
                    {t(
                      'languages.create.description',
                      'Create a new language for your store.'
                    )}
                  </Text>
                </RouteFocusModal.Description>
              </div>

              <div className="flex flex-col gap-y-4">
                <Form.Field
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <Form.Item>
                      <Form.Label>
                        {t('languages.fields.language', 'Language')}
                      </Form.Label>
                      <Form.Control>
                        <Select
                          value={field.value}
                          onValueChange={handleLanguageSelect}
                        >
                          <Select.Trigger>
                            <Select.Value
                              placeholder={t(
                                'languages.fields.selectLanguage',
                                'Select a language'
                              )}
                            />
                          </Select.Trigger>
                          <Select.Content>
                            {languages.map((language: StaticLanguage) => (
                              <Select.Item
                                key={language.locale}
                                value={language.locale}
                              >
                                {language.name} ({language.native_name})
                              </Select.Item>
                            ))}
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
                        {t('languages.fields.displayName', 'Display Name')}
                      </Form.Label>
                      <Form.Control>
                        <Input {...field} readOnly />
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
                        {t('languages.fields.nativeName', 'Native Name')}
                      </Form.Label>
                      <Form.Control>
                        <Input {...field} readOnly />
                      </Form.Control>
                      <Form.ErrorMessage />
                    </Form.Item>
                  )}
                />

                <Form.Field
                  control={form.control}
                  name="direction"
                  render={({ field }) => (
                    <Form.Item>
                      <Form.Label>
                        {t('languages.fields.textDirection', 'Text Direction')}
                      </Form.Label>
                      <Form.Control>
                        <Select
                          disabled
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <Select.Trigger>
                            <Select.Value />
                          </Select.Trigger>
                          <Select.Content>
                            <Select.Item value="ltr">
                              {t(
                                'languages.directions.ltr',
                                'Left to Right (LTR)'
                              )}
                            </Select.Item>
                            <Select.Item value="rtl">
                              {t(
                                'languages.directions.rtl',
                                'Right to Left (RTL)'
                              )}
                            </Select.Item>
                          </Select.Content>
                        </Select>
                      </Form.Control>
                      <Form.ErrorMessage />
                    </Form.Item>
                  )}
                />

                <Form.Field
                  control={form.control}
                  name="is_default"
                  render={({ field }) => (
                    <Form.Item>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <Form.Label>
                          {t(
                            'languages.fields.setAsDefault',
                            'Set as default language'
                          )}
                        </Form.Label>
                      </div>
                      <Form.ErrorMessage />
                    </Form.Item>
                  )}
                />

                <Form.Field
                  control={form.control}
                  name="is_published"
                  render={({ field }) => (
                    <Form.Item>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <Form.Label>
                          {t(
                            'languages.fields.publishImmediately',
                            'Publish immediately'
                          )}
                        </Form.Label>
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
                {t('actions.cancel', 'Cancel')}
              </Button>
            </RouteFocusModal.Close>
            <Button
              size="small"
              type="submit"
              isLoading={createStoreLanguage.isPending}
            >
              {t('actions.save', 'Save')}
            </Button>
          </div>
        </RouteFocusModal.Footer>
      </KeyboundForm>
    </RouteFocusModal.Form>
  )
}
