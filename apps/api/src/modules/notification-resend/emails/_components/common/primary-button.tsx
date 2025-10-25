import { Button, ButtonProps } from '@react-email/components'
import { clx } from '@medusajs/ui'

export const PrimaryButton = ({
  children,
  className,
  ...props
}: ButtonProps) => (
  <Button
    className={clx(
      'bg-primary text-white rounded font-semibold px-6 py-4',
      className
    )}
    {...props}
  >
    {children}
  </Button>
)

export default PrimaryButton
