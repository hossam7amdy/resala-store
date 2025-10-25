import { Img, ImgProps } from '@react-email/components'
import { clx } from '@medusajs/ui'

const baseURL = 'https://emails.resala.co'

interface StoreLogoProps extends Omit<ImgProps, 'src'> {
  logoSrc?: string
}

export const StoreLogo = ({
  className,
  logoSrc = `${baseURL}/static/logo.png`,
  ...props
}: StoreLogoProps) => (
  <Img
    src={logoSrc}
    alt="Store logo"
    height={60}
    className={clx('block mx-auto my-0', className)}
    {...props}
  />
)

export default StoreLogo
