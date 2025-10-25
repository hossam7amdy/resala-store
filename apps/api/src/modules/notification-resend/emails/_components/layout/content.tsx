import { Container, ContainerProps } from '@react-email/components'
import { clx } from '@medusajs/ui'

interface EmailContentProps extends ContainerProps {
  brandName?: string
  supportEmail?: string
}

export const EmailContent = ({
  children,
  className,
  ...props
}: EmailContentProps) => (
  <main role="main-content">
    <Container className={clx('px-6', className)} {...props}>
      {children}
    </Container>
  </main>
)

export default EmailContent
