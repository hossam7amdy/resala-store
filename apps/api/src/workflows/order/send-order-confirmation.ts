import {
  createWorkflow,
  WorkflowResponse,
} from '@medusajs/framework/workflows-sdk'
import {
  sendNotificationsStep,
  useQueryGraphStep,
} from '@medusajs/medusa/core-flows'
import { Templates } from '../../modules/notification-resend'

const sendOrderConfirmationWorkflowId = 'send-order-confirmation'

type SendOrderConfirmationWorkflowInput = {
  id: string
}

export const sendOrderConfirmationWorkflow = createWorkflow(
  sendOrderConfirmationWorkflowId,
  ({ id }: SendOrderConfirmationWorkflowInput) => {
    const { data: orders } = useQueryGraphStep({
      entity: 'order',
      fields: [
        'id',
        'display_id',
        'email',
        'currency_code',
        'total',
        'subtotal',
        'discount_total',
        'shipping_total',
        'tax_total',
        'item_subtotal',
        'item_total',
        'item_tax_total',
        'items.*',
        'shipping_address.*',
        'billing_address.*',
        'shipping_methods.*',
        'customer.*',
      ],
      filters: {
        id,
      },
    })

    const notification = sendNotificationsStep([
      {
        to: orders[0].email!,
        channel: 'email',
        template: Templates.ORDER_PLACED,
        data: {
          orderId: orders[0]?.['display_id'],
          order: orders[0],
        },
      },
    ])

    return new WorkflowResponse(notification)
  }
)
