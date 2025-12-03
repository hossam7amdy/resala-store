import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button, Prompt, Select, toast, useToggleState } from '@medusajs/ui'
import { Form } from '../../../../components'
import { useCreateLanguage, useLanguages } from '../../../../hooks/api'
import {
  languages,
  getLanguageByCode,
} from '../../../../../utils/defaults/languages'
import { useMemo } from 'react'

export function AddLanguagePrompt() {
  const { t } = useTranslation()
  const { languages: existingLanguages } = useLanguages()
  const { mutateAsync, isPending } = useCreateLanguage()
  const [open, setOpen, setClose] = useToggleState(false)
  const form = useForm<{ code: string }>({
    defaultValues: { code: '' },
  })

  const handleConfirm = form.handleSubmit(async (values) => {
    const language = getLanguageByCode(values.code)

    if (!language) return

    const payload = {
      code: language.code,
      name: language.name,
      metadata: {
        native_name: language.native_name,
      },
    }

    await mutateAsync(payload, {
      onSuccess: () => {
        toast.success(t('languages.create.successToast'))
        handleClose()
      },
      onError: (err) => {
        toast.error(err.message || t('languages.create.errorToast'))
      },
    })
  })

  const handleClose = () => {
    form.reset()
    setClose()
  }

  const availableLanguages = useMemo(
    () =>
      languages.filter(
        (lang) =>
          !existingLanguages?.some(
            (existingLang) => lang.code === existingLang.code
          )
      ),
    [existingLanguages]
  )

  return (
    <Prompt open={open} variant="confirmation">
      <Prompt.Trigger asChild onClick={setOpen}>
        <Button variant="secondary">{t('languages.actions.add')}</Button>
      </Prompt.Trigger>
      <Prompt.Content>
        <Form {...form}>
          <Prompt.Header>
            <Prompt.Title>{t('languages.create.title')}</Prompt.Title>
            <Prompt.Description>
              {t('languages.create.description')}
            </Prompt.Description>

            <div className="pt-2">
              <Form.Field
                name="code"
                control={form.control}
                render={({ field }) => (
                  <Form.Item>
                    <Form.Label htmlFor="language">
                      {t('languages.create.languageLabel')}
                    </Form.Label>
                    <Form.Control>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <Select.Trigger id="language">
                          <Select.Value
                            placeholder={t(
                              'languages.create.selectPlaceholder'
                            )}
                          />
                        </Select.Trigger>
                        <Select.Content {...field}>
                          {availableLanguages.map((language) => (
                            <Select.Item
                              key={language.code}
                              value={language.code}
                            >
                              {language.name}
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select>
                    </Form.Control>
                    <Form.ErrorMessage />
                  </Form.Item>
                )}
              />
            </div>
          </Prompt.Header>

          <Prompt.Footer>
            <Button
              type="reset"
              variant="secondary"
              disabled={isPending}
              onClick={handleClose}
            >
              {t('actions.cancel')}
            </Button>
            <Button
              type="submit"
              isLoading={isPending}
              onClick={handleConfirm}
              disabled={!form.watch('code')}
            >
              {t('actions.confirm')}
            </Button>
          </Prompt.Footer>
        </Form>
      </Prompt.Content>
    </Prompt>
  )
}
