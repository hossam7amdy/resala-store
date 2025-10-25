import {
  AbstractNotificationProviderService,
  MedusaError,
} from '@medusajs/framework/utils'
import {
  ProviderSendNotificationDTO,
  ProviderSendNotificationResultsDTO,
  Logger,
} from '@medusajs/framework/types'
import { CreateEmailOptions, Resend } from 'resend'

import { OrderPlacedEmail } from './emails/order-placed'
import { OrderShippedEmail } from './emails/order-shipped'
import { UserInvitedEmail } from './emails/user-invited'
import { PasswordResetEmail } from './emails/password-reset'
import { WelcomeEmail } from './emails/welcome'

export enum Templates {
  WELCOME = 'welcome',
  ORDER_PLACED = 'order-placed',
  ORDER_SHIPPED = 'order-shipped',
  USER_INVITED = 'user-invited',
  PASSWORD_RESET = 'password-reset',
}

interface Template {
  subject: string
  content: (props: unknown) => React.ReactNode
}

const templates: {
  [key in Templates]?: Template
} = {
  [Templates.WELCOME]: {
    subject: 'Welcome!',
    content: WelcomeEmail,
  },
  [Templates.ORDER_PLACED]: {
    subject: 'Order Confirmation - Order #{{orderId}}',
    content: OrderPlacedEmail,
  },
  [Templates.ORDER_SHIPPED]: {
    subject: 'Order Shipment Confirmation - Order #{{orderId}}',
    content: OrderShippedEmail,
  },
  [Templates.USER_INVITED]: {
    subject: "You're Invited!",
    content: UserInvitedEmail,
  },
  [Templates.PASSWORD_RESET]: {
    subject: 'Reset Your Password',
    content: PasswordResetEmail,
  },
}

type ResendOptions = {
  api_key: string
  from: string
}

type InjectedDependencies = {
  logger: Logger
}

class ResendNotificationProviderService extends AbstractNotificationProviderService {
  static identifier = 'notification-resend'

  private _client: Resend
  private _options: ResendOptions
  private _logger: Logger

  constructor({ logger }: InjectedDependencies, options: ResendOptions) {
    super()
    this._client = new Resend(options.api_key)
    this._options = options
    this._logger = logger
  }

  static validateOptions(_options: Record<any, any>) {
    if (!_options.api_key) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Option `api_key` is required in the provider's _options."
      )
    }
    if (!_options.from) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Option `from` is required in the provider's _options."
      )
    }
  }

  getTemplate(template: Templates) {
    const allowedTemplates = Object.keys(templates)

    if (!allowedTemplates.includes(template)) {
      return null
    }

    return templates[template]
  }

  interpolateTemplateSubject(
    template: Template,
    data?: Record<string, any> | null
  ) {
    let subject = template.subject

    if (!data) {
      return subject
    }

    Object.keys(data).forEach((key) => {
      subject = subject.replace(
        new RegExp(`{{${key}}}`, 'g'),
        String(data[key])
      )
    })

    return subject
  }

  async send(
    notification: ProviderSendNotificationDTO
  ): Promise<ProviderSendNotificationResultsDTO> {
    const template = this.getTemplate(notification.template as Templates)

    if (!template) {
      this._logger.error(
        `Couldn't find an email template for ${notification.template}. The valid options are ${Object.values(Templates)}`
      )
      return {}
    }

    const commonOptions = {
      from: this._options.from,
      to: [notification.to],
      subject: this.interpolateTemplateSubject(template, notification.data),
    }

    let emailOptions: CreateEmailOptions
    if (typeof template.content === 'string') {
      emailOptions = {
        ...commonOptions,
        html: template.content,
      }
    } else {
      emailOptions = {
        ...commonOptions,
        react: template.content(notification.data),
      }
    }

    const { data, error } = await this._client.emails.send(emailOptions)

    if (error || !data) {
      if (error) {
        this._logger.error('Failed to send email', error)
      } else {
        this._logger.error('Failed to send email: unknown error')
      }
      return {}
    }

    return { id: data.id }
  }
}

export default ResendNotificationProviderService
