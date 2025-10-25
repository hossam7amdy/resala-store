import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import type { UseFormProps } from 'react-hook-form'

const TranslationOptionValueSchema = z.object({
  id: z.string().optional(),
  option_value_id: z.string(),
  value: z.string().default(''),
  metadata: z.record(z.unknown()).nullish(),
})

const TranslationOptionSchema = z.object({
  id: z.string().optional(),
  option_id: z.string(),
  title: z.string().min(1, 'Option title is required'),
  metadata: z.record(z.unknown()).nullish(),
  values: z.array(TranslationOptionValueSchema).default([]),
})

const TranslationProductFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  handle: z.string().min(1, 'Handle is required'),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  options: z.array(TranslationOptionSchema).default([]),
})

const formProps: UseFormProps = {
  resolver: zodResolver(TranslationProductFormSchema),
  defaultValues: {
    id: undefined,
    title: '',
    handle: '',
    subtitle: '',
    description: '',
    options: [],
  },
}

export type ProductTranslationFormFields = z.infer<
  typeof TranslationProductFormSchema
>

export default formProps
