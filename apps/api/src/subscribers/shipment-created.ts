import { sendShipmentConfirmationWorkflow } from '../workflows/order'
import { SubscriberArgs, type SubscriberConfig } from '@medusajs/framework'
import { ContainerRegistrationKeys } from '@medusajs/framework/utils'

export default async function shipmentCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{
  id: string
  no_notification: boolean
}>) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

  if (data.no_notification) {
    logger.warn('Skip sending shipping notification')
    return
  }

  await sendShipmentConfirmationWorkflow(container).run({
    input: {
      fulfillment_id: data.id,
    },
  })
}

export const config: SubscriberConfig = {
  event: 'shipment.created',
}
