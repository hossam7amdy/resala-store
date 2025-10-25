import { Templates } from '../../modules/notification-resend'
import {
  createWorkflow,
  WorkflowResponse,
} from '@medusajs/framework/workflows-sdk'
import {
  sendNotificationsStep,
  useQueryGraphStep,
} from '@medusajs/medusa/core-flows'

const sendShipmentConfirmationWorkflowId = 'send-shipment-confirmation'

type ShipmentConfirmationWorkflowInput = {
  fulfillment_id: string
}

export const sendShipmentConfirmationWorkflow = createWorkflow(
  sendShipmentConfirmationWorkflowId,
  ({ fulfillment_id }: ShipmentConfirmationWorkflowInput) => {
    const { data: fulfillments } = useQueryGraphStep({
      entity: 'fulfillment',
      fields: [
        'id',
        'labels.*',
        'order.id',
        'order.display_id',
        'order.email',
        'order.currency_code',
        'order.total',
        'order.subtotal',
        'order.discount_total',
        'order.shipping_total',
        'order.tax_total',
        'order.item_subtotal',
        'order.item_total',
        'order.item_tax_total',
        'order.items.*',
        'order.shipping_address.*',
        'order.billing_address.*',
        'order.shipping_methods.*',
        'order.customer.*',
      ],
      filters: {
        id: fulfillment_id,
      },
    })

    const notification = sendNotificationsStep([
      {
        to: fulfillments[0].order?.email ?? '',
        channel: 'email',
        template: Templates.ORDER_SHIPPED,
        data: {
          orderId: fulfillments[0].order?.['display_id'],
          fulfillment: fulfillments[0],
        },
      },
    ])

    return new WorkflowResponse(notification)
  }
)
