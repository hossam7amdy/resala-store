import { DEFAULT_API_BASE_URL } from '../defaults'
import axios from 'redaxios'

export const PaymobClient = (secretKey: string) => {
  const instance = axios.create({
    baseURL: DEFAULT_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${secretKey}`,
    },
  })
  return instance
}

export type PaymobClient = ReturnType<typeof PaymobClient>
