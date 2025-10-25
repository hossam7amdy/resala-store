import {
  Text,
  Column,
  Container,
  Heading,
  Img,
  Row,
  Section,
} from '@react-email/components'
import { CustomerDTO, OrderDTO } from '@medusajs/framework/types'
import {
  EmailTemplate,
  EmailHeader,
  EmailContent,
  EmailFooter,
} from './_components/layout'
import { formatPrice } from './_utils'

type OrderPlacedEmailProps = {
  order: OrderDTO & {
    customer: CustomerDTO
  }
}

export function OrderPlacedEmail({ order }: OrderPlacedEmailProps) {
  return (
    <EmailTemplate
      title={`Order #${order?.display_id} confirmed`}
      preview={`Thank you for your purchase`}
    >
      <EmailHeader />

      <EmailContent>
        {/* Thank You Message */}
        <Container className="px-6">
          <Heading className="text-gray-800 text-2xl text-center font-semibold">
            Thank you for your purchase!
          </Heading>
          <Text className="text-center text-gray-600">
            We've received your order and are getting it ready for shipment. We
            will notify you when it has been sent.
          </Text>
        </Container>

        {/* Order Items */}
        <Container className="px-6">
          <Section>
            <Row>
              <Column>
                <Heading
                  as="h2"
                  className="text-xl font-semibold text-gray-800"
                >
                  Your Items
                </Heading>
              </Column>
              <Column>
                <Text className="uppercase text-end text-gray-500">
                  Order: #{order?.display_id}
                </Text>
              </Column>
            </Row>
          </Section>
          {order?.items?.map((item) => (
            <Section key={item.id} className="border-b border-gray-200 py-4">
              <Row>
                <Column className="w-1/3">
                  <Img
                    src={item.thumbnail ?? ''}
                    alt={item.product_title ?? ''}
                    className="rounded-lg"
                    width="100%"
                  />
                </Column>
                <Column className="w-2/3 pl-4">
                  <Text className="text-xl font-semibold text-gray-800">
                    {item.product_title}
                  </Text>
                  <Text className="text-gray-600">{item.variant_title}</Text>
                  <Text className="text-gray-800 mt-2 font-bold">
                    {formatPrice(item.total, order.currency_code)}
                  </Text>
                </Column>
              </Row>
            </Section>
          ))}

          {/* Order Summary */}
          <Section className="mt-8">
            <Heading as="h2" className="text-xl font-semibold text-gray-800">
              Order Summary
            </Heading>
            <Row className="text-gray-600">
              <Column className="w-1/2">
                <Text className="m-0">Subtotal</Text>
              </Column>
              <Column className="w-1/2 text-right">
                <Text className="m-0">
                  {formatPrice(order?.item_total, order?.currency_code)}
                </Text>
              </Column>
            </Row>
            {order?.shipping_methods?.map((method) => (
              <Row className="text-gray-600" key={method.id}>
                <Column className="w-1/2">
                  <Text className="m-0">{method.name}</Text>
                </Column>
                <Column className="w-1/2 text-right">
                  <Text className="m-0">
                    {formatPrice(method.total, order?.currency_code)}
                  </Text>
                </Column>
              </Row>
            ))}
            <Row className="text-gray-600">
              <Column className="w-1/2">
                <Text className="m-0">Tax</Text>
              </Column>
              <Column className="w-1/2 text-right">
                <Text className="m-0">
                  {formatPrice(order?.tax_total || 0, order?.currency_code)}
                </Text>
              </Column>
            </Row>
            <Row className="border-t border-gray-200 mt-4 text-gray-800 font-bold">
              <Column className="w-1/2">
                <Text>Total</Text>
              </Column>
              <Column className="w-1/2 text-right">
                <Text>{formatPrice(order?.total, order?.currency_code)}</Text>
              </Column>
            </Row>
          </Section>

          {/* Customer Information */}
          <Section className="mt-8">
            <Heading
              as="h2"
              className="text-xl font-semibold text-gray-800 mb-4"
            >
              Customer Information
            </Heading>
            <Row>
              {/* Shipping Address */}
              <Column className="w-1/2 pr-2">
                <Text className="font-semibold text-gray-800 mb-2">
                  Shipping Address
                </Text>
                {order?.shipping_address ? (
                  <div className="text-gray-600">
                    <Text className="m-0">
                      {order.shipping_address.first_name}{' '}
                      {order.shipping_address.last_name}
                    </Text>
                    {order.shipping_address.address_1 && (
                      <Text className="m-0">
                        {order.shipping_address.address_1}
                      </Text>
                    )}
                    {order.shipping_address.address_2 && (
                      <Text className="m-0">
                        {order.shipping_address.address_2}
                      </Text>
                    )}
                    <Text className="m-0">
                      {order.shipping_address.city},{' '}
                      {order.shipping_address.province}{' '}
                      {order.shipping_address.postal_code}
                    </Text>
                    <Text className="m-0">
                      {order.shipping_address.country_code?.toUpperCase()}
                    </Text>
                  </div>
                ) : (
                  <Text className="text-gray-500 italic">
                    No shipping address provided
                  </Text>
                )}
              </Column>

              {/* Billing Address */}
              <Column className="w-1/2 pl-2">
                <Text className="font-semibold text-gray-800 mb-2">
                  Billing Address
                </Text>
                {order?.billing_address ? (
                  <div className="text-gray-600">
                    <Text className="m-0">
                      {order.billing_address.first_name}{' '}
                      {order.billing_address.last_name}
                    </Text>
                    {order.billing_address.address_1 && (
                      <Text className="m-0">
                        {order.billing_address.address_1}
                      </Text>
                    )}
                    {order.billing_address.address_2 && (
                      <Text className="m-0">
                        {order.billing_address.address_2}
                      </Text>
                    )}
                    <Text className="m-0">
                      {order.billing_address.city},{' '}
                      {order.billing_address.province}{' '}
                      {order.billing_address.postal_code}
                    </Text>
                    <Text className="m-0">
                      {order.billing_address.country_code?.toUpperCase()}
                    </Text>
                  </div>
                ) : (
                  <Text className="text-gray-500 italic">
                    No billing address provided
                  </Text>
                )}
              </Column>
            </Row>

            {/* Shipping Method */}
            <Row className="mt-4">
              <Column>
                <Text className="font-semibold text-gray-800 mb-2">
                  Shipping Method
                </Text>
                {order?.shipping_methods &&
                order.shipping_methods.length > 0 ? (
                  <div className="text-gray-600">
                    {order.shipping_methods.map((method) => (
                      <Text key={method.id} className="m-0">
                        {method.name} -{' '}
                        {formatPrice(method.total, order?.currency_code)}
                      </Text>
                    ))}
                  </div>
                ) : (
                  <Text className="text-gray-500 italic">
                    No shipping method selected
                  </Text>
                )}
              </Column>
            </Row>
          </Section>
        </Container>
      </EmailContent>

      <EmailFooter />
    </EmailTemplate>
  )
}

export default OrderPlacedEmail
