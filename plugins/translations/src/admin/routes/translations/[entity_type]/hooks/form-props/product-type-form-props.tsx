import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import type { UseFormProps } from 'react-hook-form'

const ProductTypeTranslationFormSchema = z.object({
  id: z.string().optional(),
  value: z.string().min(1, 'Value is required'),
  metadata: z.record(z.unknown()).nullable().optional(),
})

const fromProps: UseFormProps = {
  resolver: zodResolver(ProductTypeTranslationFormSchema),
  defaultValues: {
    id: undefined,
    value: '',
    metadata: null,
  },
}

export type ProductTypeTranslationFormFields = z.infer<
  typeof ProductTypeTranslationFormSchema
>

export default fromProps
