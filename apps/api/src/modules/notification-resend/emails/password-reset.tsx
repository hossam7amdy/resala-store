import { Text, Heading, Section, Link } from '@react-email/components'
import {
  EmailTemplate,
  EmailHeader,
  EmailContent,
  EmailFooter,
} from './_components/layout'
import { PrimaryButton } from './_components/common'

type PasswordResetEmailProps = {
  reset_url: string
  email?: string
}

export function PasswordResetEmail({
  reset_url,
  email,
}: PasswordResetEmailProps) {
  return (
    <EmailTemplate title="Password Reset" preview="Reset your password">
      <EmailHeader />

      <EmailContent>
        <Section className="mt-[32px]">
          <Heading className="text-2xl text-center font-semibold">
            Reset Your Password
          </Heading>
        </Section>

        <Section className="my-[32px]">
          <Text className="text-[14px] leading-[24px]">
            Hello{email ? ` ${email}` : ''},
          </Text>
          <Text className="text-[14px] leading-[24px]">
            We received a request to reset your password. Click the button below
            to create a new password for your account.
          </Text>
        </Section>

        <Section className="text-center mt-[32px] mb-[32px]">
          <PrimaryButton href={reset_url}>Reset Password</PrimaryButton>
        </Section>

        <Section className="my-[32px]">
          <Text className="text-[14px] leading-[24px]">
            or copy and paste this URL into your browser:
          </Text>
          <Link
            href={reset_url}
            className="text-primary text-[14px] leading-[24px] break-all"
          >
            {reset_url}
          </Link>
        </Section>

        <Section className="my-[32px]">
          <Text className="text-gray-500 text-[12px] leading-[24px]">
            This password reset link will expire soon for security reasons.
          </Text>
          <Text className="text-gray-500 text-[12px] leading-[24px] mt-2">
            If you didn't request a password reset, you can safely ignore this
            email. Your password will remain unchanged.
          </Text>
        </Section>

        <Section className="mt-[32px] pt-[20px] border-t border-solid border-[#eaeaea]">
          <Text className="text-gray-500 text-[12px] leading-[24px]">
            For security reasons, never share this reset link with anyone. If
            you're having trouble with the button above, copy and paste the URL
            into your web browser.
          </Text>
        </Section>
      </EmailContent>

      <EmailFooter />
    </EmailTemplate>
  )
}

export default PasswordResetEmail
