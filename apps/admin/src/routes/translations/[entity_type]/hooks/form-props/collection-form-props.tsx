import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import type { UseFormProps } from 'react-hook-form'

const CollectionTranslationFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  handle: z.string().min(1, 'Handle is required'),
  metadata: z.record(z.unknown()).nullable().optional(),
})

const fromProps: UseFormProps = {
  resolver: zodResolver(CollectionTranslationFormSchema),
  defaultValues: {
    id: undefined,
    title: '',
    handle: '',
    metadata: null,
  },
}

export type CollectionTranslationFormFields = z.infer<
  typeof CollectionTranslationFormSchema
>

export default fromProps
