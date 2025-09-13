import { z } from 'zod'

export const PaymobConfigSchema = z.object({
  apiKey: z.string().min(1, 'API key is required'),
  publicKey: z.string().min(1, 'Public key is required'),
  secretKey: z.string().min(1, 'Secret key is required'),
  hmacSecret: z.string().min(1, 'HMAC secret is required'),
  integrationIds: z.array(z.coerce.number()),
  notificationUrl: z
    .string()
    .url({ message: 'notification URL is not a valid URL' }),
  redirectionUrl: z
    .string()
    .url({ message: 'redirection URL is not a valid URL' }),
})

export type PaymobConfig = z.output<typeof PaymobConfigSchema>
