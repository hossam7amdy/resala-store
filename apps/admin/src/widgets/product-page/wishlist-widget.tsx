import { Container, Heading, Text } from '@medusajs/ui'
import { useTranslation } from 'react-i18next'
import { DetailWidgetProps, AdminProduct } from '@medusajs/framework/types'
import { useProductWishlistCount } from '../../hooks/api/product-wishlist'

export const ProductWidget = ({
  data: product,
}: DetailWidgetProps<AdminProduct>) => {
  const { t } = useTranslation()
  const { count = 0, isLoading } = useProductWishlistCount(product.id)

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Wishlist</Heading>
      </div>
      <Text className="px-6 py-4">
        {isLoading
          ? t('labels.loading')
          : `This product is in ${count} wishlist(s).`}
      </Text>
    </Container>
  )
}

export default ProductWidget
