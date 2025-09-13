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
import { orderPlacedEmail } from './emails/order-placed'
import { userInvitedEmail } from './emails/user-invited'
import { passwordResetEmail } from './emails/password-reset'

enum Templates {
  ORDER_PLACED = 'order-placed',
  USER_INVITED = 'user-invited',
  PASSWORD_RESET = 'password-reset',
}

const templates: { [key in Templates]?: (props: unknown) => React.ReactNode } =
  {
    [Templates.ORDER_PLACED]: orderPlacedEmail,
    [Templates.USER_INVITED]: userInvitedEmail,
    [Templates.PASSWORD_RESET]: passwordResetEmail,
  }

type ResendOptions = {
  api_key: string
  from: string
  html_templates?: Record<
    string,
    {
      subject?: string
      content: string
    }
  >
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
    if (this._options.html_templates?.[template]) {
      return this._options.html_templates[template].content
    }
    const allowedTemplates = Object.keys(templates)

    if (!allowedTemplates.includes(template)) {
      return null
    }

    return templates[template]
  }

  getTemplateSubject(template: Templates) {
    if (this._options.html_templates?.[template]?.subject) {
      return this._options.html_templates[template].subject
    }
    switch (template) {
      case Templates.ORDER_PLACED:
        return 'Order Confirmation'
      case Templates.USER_INVITED:
        return "You're Invited!"
      case Templates.PASSWORD_RESET:
        return 'Reset Your Password'
      default:
        return 'New Email'
    }
  }

  async send(
    notification: ProviderSendNotificationDTO
  ): Promise<ProviderSendNotificationResultsDTO> {
    const template = this.getTemplate(notification.template as Templates)

    if (!template) {
      this._logger.error(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `Couldn't find an email template for ${notification.template}. The valid options are ${Object.values(Templates)}`
      )
      return {}
    }

    const commonOptions = {
      from: this._options.from,
      to: [notification.to],
      subject: this.getTemplateSubject(notification.template as Templates),
    }

    let emailOptions: CreateEmailOptions
    if (typeof template === 'string') {
      emailOptions = {
        ...commonOptions,
        html: template,
      }
    } else {
      emailOptions = {
        ...commonOptions,
        react: template(notification.data),
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
