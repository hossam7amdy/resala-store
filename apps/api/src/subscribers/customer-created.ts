import { sendWelcomeEmailWorkflow } from '../workflows/customer'
import { SubscriberArgs, type SubscriberConfig } from '@medusajs/framework'
import { ContainerRegistrationKeys } from '@medusajs/framework/utils'

export default async function customerCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{
  id: string
}>) {
  const config = container.resolve(ContainerRegistrationKeys.CONFIG_MODULE)

  await sendWelcomeEmailWorkflow(container).run({
    input: {
      id: data.id,
      storeUrl: config.admin.storefrontUrl ?? '',
    },
  })
}

export const config: SubscriberConfig = {
  event: 'customer.created',
}
