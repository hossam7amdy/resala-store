import { Section, SectionProps } from '@react-email/components'
import { clx } from '@medusajs/ui'
import { StoreLogo } from '../common'

interface EmailHeaderProps extends SectionProps {
  logoSrc?: string
}

export const EmailHeader = ({ logoSrc, className }: EmailHeaderProps) => (
  <header role="header">
    <Section className={clx('bg-primary w-full py-4', className)}>
      <StoreLogo logoSrc={logoSrc} />
    </Section>
  </header>
)

export default EmailHeader
