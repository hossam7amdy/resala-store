import { z } from 'zod'
import { emailValidation, integer } from './common'

export const AuthApiKeyRequestSchema = z.object({
  api_key: z.string(),
})
export type AuthApiKeyRequest = z.infer<typeof AuthApiKeyRequestSchema>

export const AuthUsernamePasswordRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
  expiration: integer(0).optional(), // Optional expiration time in seconds
})
export type AuthUsernamePasswordRequest = z.infer<
  typeof AuthUsernamePasswordRequestSchema
>

export const AuthProfileSchema = z.object({
  id: integer(),
  user: z.object({
    id: integer(),
    username: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    email: emailValidation(),
  }),
})
export type AuthProfile = z.infer<typeof AuthProfileSchema>

export const AuthResponseSchema = z.object({
  token: z.string(),
  profile: AuthProfileSchema,
})

export type AuthResponse = z.infer<typeof AuthResponseSchema>
