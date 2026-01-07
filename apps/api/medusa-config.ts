import {
  loadEnv,
  Modules,
  isDefined,
  defineConfig,
  ContainerRegistrationKeys,
} from '@medusajs/framework/utils'
import type { InputConfig } from '@medusajs/types'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

const appConfig: InputConfig = {
  admin: {
    backendUrl: process.env.BACKEND_URL,
    storefrontUrl: process.env.STOREFRONT_URL,
    disable: process.env.ADMIN_DISABLED === 'true',
  },
  projectConfig: {
    redisUrl: process.env.REDIS_URL,
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
    },
  },
  featureFlags: {
    translation: true,
  },
  modules: [
    {
      resolve: '@medusajs/medusa/file',
      options: {
        providers: [
          {
            resolve: '@medusajs/medusa/file-s3',
            id: 's3',
            options: {
              region: process.env.S3_REGION,
              access_key_id: process.env.S3_ACCESS_KEY_ID,
              secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
              bucket: process.env.S3_BUCKET,
              file_url: process.env.S3_FILE_URL,
              endpoint: process.env.S3_ENDPOINT,
              additional_client_config: {
                forcePathStyle: process.env.NODE_ENV !== 'production',
              },
            },
          },
        ],
      },
    },
    {
      resolve: '@medusajs/medusa/auth',
      dependencies: [Modules.CACHE, ContainerRegistrationKeys.LOGGER],
      options: {
        providers: [
          {
            resolve: '@medusajs/medusa/auth-emailpass',
            id: 'emailpass',
          },
          {
            resolve: '@medusajs/medusa/auth-google',
            id: 'google',
            options: {
              clientId: process.env.GOOGLE_CLIENT_ID,
              clientSecret: process.env.GOOGLE_CLIENT_SECRET,
              callbackUrl: process.env.GOOGLE_CALLBACK_URL,
            },
          },
        ],
      },
    },
    {
      resolve: '@medusajs/medusa/payment',
      options: {
        providers: [
          {
            resolve: './src/modules/payment-paymob',
            id: 'paymob',
            options: {
              apiKey: process.env.PAYMOB_API_KEY,
              secretKey: process.env.PAYMOB_SECRET_KEY,
              publicKey: process.env.PAYMOB_PUBLIC_KEY,
              hmacSecret: process.env.PAYMOB_HMAC_SECRET,
              redirectionUrl: process.env.PAYMOB_REDIRECTION_URL,
              notificationUrl: process.env.PAYMOB_NOTIFICATION_URL,
              integrationIds: [process.env.PAYMOB_CARD_INTEGRATION_ID],
            },
          },
        ],
      },
    },
    {
      resolve: '@medusajs/medusa/notification',
      options: {
        providers: [
          {
            resolve: './src/modules/notification-resend',
            id: 'resend',
            options: {
              channels: ['email'],
              api_key: process.env.RESEND_API_KEY,
              from: process.env.RESEND_FROM_EMAIL,
            },
          },
        ],
      },
    },
    {
      resolve: '@medusajs/index',
      options: {},
    },
    {
      resolve: '@medusajs/medusa/translation',
      options: {},
    },
  ],
  plugins: [
    {
      resolve: '@plugins/wishlist',
      options: {},
    },
    {
      resolve: '@plugins/reviews',
      options: {},
    },
  ],
}

if (isDefined(process.env.REDIS_URL)) {
  if (!Array.isArray(appConfig.modules)) {
    appConfig.modules = []
  }
  appConfig.modules.push(
    {
      resolve: '@medusajs/medusa/event-bus-redis',
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: '@medusajs/medusa/workflow-engine-redis',
      options: {
        redis: {
          url: process.env.REDIS_URL,
        },
      },
    },
    {
      resolve: '@medusajs/medusa/locking',
      options: {
        providers: [
          {
            resolve: '@medusajs/medusa/locking-redis',
            id: 'locking-redis',
            is_default: true,
            options: {
              redisUrl: process.env.REDIS_URL,
            },
          },
        ],
      },
    },
    {
      resolve: '@medusajs/medusa/caching',
      options: {
        providers: [
          {
            id: 'caching-redis',
            resolve: '@medusajs/caching-redis',
            options: {
              redisUrl: process.env.REDIS_URL,
            },
          },
        ],
      },
    }
  )
  if (!isDefined(appConfig.featureFlags)) {
    appConfig.featureFlags = {}
  }
  appConfig.featureFlags.caching = true
}

module.exports = defineConfig(appConfig)
