import { Templates } from '../modules/notification-resend'
import { SubscriberArgs, type SubscriberConfig } from '@medusajs/framework'

export default async function inviteCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{
  id: string
}>) {
  const query = container.resolve('query')
  const notificationModuleService = container.resolve('notification')
  const config = container.resolve('configModule')

  const {
    data: [invite],
  } = await query.graph({
    entity: 'invite',
    fields: ['email', 'token'],
    filters: {
      id: data.id,
    },
  })

  const adminPath = config.admin.path
  const backendUrl = config.admin.backendUrl

  await notificationModuleService.createNotifications({
    to: invite.email,
    template: Templates.USER_INVITED,
    channel: 'email',
    data: {
      invite_url: `${backendUrl}${adminPath}/invite?token=${invite.token}`,
    },
  })
}

export const config: SubscriberConfig = {
  event: ['invite.created', 'invite.resent'],
}
