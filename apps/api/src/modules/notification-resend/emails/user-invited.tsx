import { Text, Heading, Section, Link } from '@react-email/components'
import {
  EmailTemplate,
  EmailFooter,
  EmailHeader,
  EmailContent,
} from './_components/layout'
import { PrimaryButton } from './_components'

type UserInvitedEmailProps = {
  invite_url: string
  email?: string
}
export function UserInvitedEmail({ invite_url, email }: UserInvitedEmailProps) {
  return (
    <EmailTemplate
      title="User invited!"
      preview="You've been invited to join our team"
    >
      <EmailHeader />

      <EmailContent>
        <Section className="mt-[32px]">
          <Heading className="text-2xl text-center font-semibold">
            You're Invited!
          </Heading>
        </Section>

        <Section className="my-[32px]">
          <Text className="text-black text-[14px] leading-[24px]">
            Hello{email ? ` ${email}` : ''},
          </Text>
          <Text className="text-black text-[14px] leading-[24px]">
            You've been invited to join our platform. Click the button below to
            accept your invitation and set up your account.
          </Text>
        </Section>

        <Section className="text-center mt-[32px] mb-[32px]">
          <PrimaryButton href={invite_url}>Accept Invitation</PrimaryButton>
        </Section>

        <Section className="my-[32px]">
          <Text className="text-black text-[14px] leading-[24px]">
            or copy and paste this URL into your browser:
          </Text>
          <Link
            href={invite_url}
            className="text-primary text-[14px] leading-[24px] break-all"
          >
            {invite_url}
          </Link>
        </Section>

        <Section className="mt-[32px]">
          <Text className="text-[#666666] text-[12px] leading-[24px]">
            If you weren't expecting this invitation, you can ignore this email.
          </Text>
        </Section>
      </EmailContent>

      <EmailFooter />
    </EmailTemplate>
  )
}

export default UserInvitedEmail
