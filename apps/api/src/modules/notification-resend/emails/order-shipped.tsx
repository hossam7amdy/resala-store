import {
  Text,
  Column,
  Container,
  Heading,
  Img,
  Row,
  Section,
  Link,
} from '@react-email/components'
import {
  CustomerDTO,
  OrderDTO,
  FulfillmentDTO,
} from '@medusajs/framework/types'
import {
  EmailTemplate,
  EmailHeader,
  EmailContent,
  EmailFooter,
} from './_components'
import { formatPrice } from './_utils'

type OrderShippedEmailProps = {
  fulfillment?: FulfillmentDTO & {
    order?: OrderDTO & {
      customer?: CustomerDTO
    }
  }
}

export function OrderShippedEmail({ fulfillment }: OrderShippedEmailProps) {
  const order = fulfillment?.order

  return (
    <EmailTemplate
      title={`Order #${order?.display_id} shipped`}
      preview={`Your order #${order?.display_id} has been shipped and is on its way`}
    >
      <EmailHeader />

      <EmailContent>
        {/* Shipment Message */}
        <Container className="px-6">
          <Heading className="text-gray-800 text-2xl text-center font-semibold">
            Your order is on the way
          </Heading>
          <Text className="text-center text-gray-600">
            Your order is on its way and should arrive within 3-5 business days.
            You can track your shipment to see the delivery status.
          </Text>
        </Container>

        {/* Tracking Information */}
        {fulfillment?.labels && fulfillment.labels.length > 0 && (
          <Container className="">
            <Section className="mt-6 px-6 bg-gray-50 rounded-lg">
              <Heading as="h2" className="text-xl font-semibold text-gray-800">
                Tracking Information
              </Heading>
              {fulfillment.labels.map((label, index) => (
                <Section key={index} className="mb-4">
                  <Row>
                    <Column className="w-1/2">
                      <Text className="text-gray-600">
                        Tracking number:{' '}
                        <Link
                          href={label.tracking_url}
                          className="text-primary underline"
                        >
                          {label.tracking_number}
                        </Link>
                      </Text>
                    </Column>
                  </Row>
                </Section>
              ))}
            </Section>
          </Container>
        )}

        {/* Order Items */}
        <Container className="px-6">
          <Section>
            <Row>
              <Column>
                <Heading
                  as="h2"
                  className="text-xl font-semibold text-gray-800"
                >
                  Shipped Items
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
                  {formatPrice(order?.item_total || 0, order?.currency_code)}
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
                <Text>
                  {formatPrice(order?.total || 0, order?.currency_code)}
                </Text>
              </Column>
            </Row>
          </Section>
        </Container>
      </EmailContent>

      <EmailFooter />
    </EmailTemplate>
  )
}

export default OrderShippedEmail
