import { Section, Text, Link, SectionProps } from '@react-email/components'
import { clx } from '@medusajs/ui'

interface EmailFooter extends SectionProps {
  brandName?: string
  supportEmail?: string
}

export const EmailFooter = ({
  brandName = 'Resala Store',
  supportEmail = 'support@resala.co',
  className,
  ...props
}: EmailFooter) => (
  <footer role="footer">
    <Section className={clx('bg-gray-50 p-6 mt-10', className)} {...props}>
      <Text className="text-center text-gray-500 text-sm">
        If you have any questions, reply to this email or contact us at{' '}
        <Link className="text-primary" href={`mailto:${supportEmail}`}>
          {supportEmail}
        </Link>
      </Text>
      <Text className="text-center text-gray-400 text-xs mt-4">
        © {new Date().getFullYear()} {brandName}, Inc. All rights reserved.
      </Text>
    </Section>
    <Section className="w-full h-2 bg-primary" />
  </footer>
)

export default EmailFooter
