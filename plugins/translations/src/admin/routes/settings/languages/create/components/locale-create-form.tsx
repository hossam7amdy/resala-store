import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as zod from 'zod'
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

const LocaleCreateSchema = zod.object({
  code: zod.string().min(1, 'Language is required'),
  name: zod.string().min(1, 'Display name is required'),
  native_name: zod.string().min(1, 'Native name is required'),
  direction: zod.enum(['ltr', 'rtl']),
  is_default: zod.boolean(),
  is_published: zod.boolean(),
})

type LocaleCreateFormData = zod.infer<typeof LocaleCreateSchema>

export const LocaleCreateForm = () => {
  const { t } = useTranslation()
  const { handleSuccess } = useRouteModal()
  const { store } = useStore()
  const createStoreLanguage = useCreateStoreLanguage()

  const form = useForm<LocaleCreateFormData>({
    defaultValues: {
      code: '',
      name: '',
      native_name: '',
      direction: 'ltr',
      is_default: false,
      is_published: false,
    },
    resolver: zodResolver(LocaleCreateSchema),
  })

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
              'locales.create.successToast',
              'Store locale created successfully'
            )
          )
          handleSuccess()
        },
        onError: (err) => {
          toast.error(
            err.message ||
              t('locales.create.errorToast', 'Failed to create store locale')
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
                    {t('locales.create.title', 'Create Language')}
                  </Heading>
                </RouteFocusModal.Title>
                <RouteFocusModal.Description asChild>
                  <Text size="small" className="text-ui-fg-subtle">
                    {t(
                      'locales.create.description',
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
                        {t('locales.fields.language', 'Language')}
                      </Form.Label>
                      <Form.Control>
                        <Select
                          value={field.value}
                          onValueChange={handleLanguageSelect}
                        >
                          <Select.Trigger>
                            <Select.Value
                              placeholder={t(
                                'locales.fields.selectLanguage',
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
                        {t('locales.fields.displayName', 'Display Name')}
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
                        {t('locales.fields.nativeName', 'Native Name')}
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
                        {t('locales.fields.textDirection', 'Text Direction')}
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
                                'locales.directions.ltr',
                                'Left to Right (LTR)'
                              )}
                            </Select.Item>
                            <Select.Item value="rtl">
                              {t(
                                'locales.directions.rtl',
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
                            'locales.fields.setAsDefault',
                            'Set as default locale'
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
                            'locales.fields.publishImmediately',
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
