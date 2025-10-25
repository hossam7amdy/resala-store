import { Templates } from '../../modules/notification-resend'
import {
  createWorkflow,
  WorkflowResponse,
} from '@medusajs/framework/workflows-sdk'
import {
  sendNotificationsStep,
  useQueryGraphStep,
} from '@medusajs/medusa/core-flows'

const sendWelcomeEmailId = 'send-welcome-email'

type SendWelcomeEmailWorkflowInput = {
  id: string
  storeUrl: string
}

export const sendWelcomeEmailWorkflow = createWorkflow(
  sendWelcomeEmailId,
  ({ id, storeUrl }: SendWelcomeEmailWorkflowInput) => {
    const { data: customers } = useQueryGraphStep({
      entity: 'customer',
      fields: ['id', 'email', 'first_name'],
      filters: { id },
    })

    const notification = sendNotificationsStep([
      {
        to: customers[0].email!,
        channel: 'email',
        template: Templates.WELCOME,
        data: {
          store_url: storeUrl,
          customer: customers[0],
        },
      },
    ])

    return new WorkflowResponse(notification)
  }
)
