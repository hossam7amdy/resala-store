import { SubscriberArgs, type SubscriberConfig } from '@medusajs/medusa'
import { ContainerRegistrationKeys, Modules } from '@medusajs/framework/utils'
import { Templates } from '../modules/notification-resend'

export default async function resetPasswordTokenHandler({
  event: {
    data: { entity_id: email, token, actor_type },
  },
  container,
}: SubscriberArgs<{ entity_id: string; token: string; actor_type: string }>) {
  const notificationModuleService = container.resolve(Modules.NOTIFICATION)
  const config = container.resolve(ContainerRegistrationKeys.CONFIG_MODULE)

  let urlPrefix = ''

  if (actor_type === 'customer') {
    urlPrefix = config.admin.storefrontUrl!
  } else {
    const adminPath = config.admin.path
    const backendUrl = config.admin.backendUrl
    urlPrefix = `${backendUrl}${adminPath}`
  }

  await notificationModuleService.createNotifications({
    to: email,
    channel: 'email',
    template: Templates.PASSWORD_RESET,
    data: {
      reset_url: `${urlPrefix}/reset-password?token=${token}&email=${email}`,
    },
  })
}

export const config: SubscriberConfig = {
  event: 'auth.password_reset',
}
