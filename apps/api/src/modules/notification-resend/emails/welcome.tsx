import { Text, Heading, Section } from '@react-email/components'
import { HttpTypes } from '@medusajs/framework/types'
import {
  EmailContent,
  EmailHeader,
  EmailTemplate,
  EmailFooter,
  PrimaryButton,
} from './_components'

type WelcomeEmailProps = {
  store_url: string
  customer: Pick<HttpTypes.StoreCustomer, 'first_name' | 'email'>
}

export function WelcomeEmail({ store_url, customer }: WelcomeEmailProps) {
  return (
    <EmailTemplate title="Store Welcome" preview="Welcome to our store">
      <EmailHeader />

      <EmailContent>
        <Section className="mt-[32px]">
          <Heading className="text-[24px] font-semibold text-center">
            Welcome, {customer?.first_name ?? customer?.email ?? ''}!
          </Heading>
        </Section>

        <Section className="my-[32px]">
          <Text className="text-[14px] leading-[24px]">
            Hello {customer?.first_name ?? customer?.email ?? ''},
          </Text>
          <Text className="text-[14px] leading-[24px]">
            Thank you for joining us! We're excited to have you as part of our
            community. Start exploring our products and discover amazing deals.
          </Text>
        </Section>

        <Section className="text-center mt-[32px] mb-[32px]">
          <PrimaryButton href={store_url}>Start Shopping</PrimaryButton>
        </Section>
      </EmailContent>

      <EmailFooter />
    </EmailTemplate>
  )
}

export default WelcomeEmail
