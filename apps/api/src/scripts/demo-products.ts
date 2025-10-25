// @ts-ignore
import { faker } from '@faker-js/faker'
import { ExecArgs } from '@medusajs/framework/types'
import {
  ContainerRegistrationKeys,
  MedusaError,
  Modules,
  ProductStatus,
} from '@medusajs/framework/utils'
import {
  createCollectionsWorkflow,
  createInventoryLevelsWorkflow,
  createProductsWorkflow,
} from '@medusajs/medusa/core-flows'

const medusaImages = [
  {
    url: 'https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-front.png',
  },
  {
    url: 'https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-back.png',
  },
  {
    url: 'https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-white-front.png',
  },
  {
    url: 'https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-white-back.png',
  },
  {
    url: 'https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatshirt-vintage-front.png',
  },
  {
    url: 'https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatshirt-vintage-back.png',
  },
  {
    url: 'https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png',
  },
  {
    url: 'https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-back.png',
  },
  {
    url: 'https://medusa-public-images.s3.eu-west-1.amazonaws.com/shorts-vintage-front.png',
  },
  {
    url: 'https://medusa-public-images.s3.eu-west-1.amazonaws.com/shorts-vintage-back.png',
  },
]

const randomMedusaImage = () => {
  const randomIndex = Math.floor(Math.random() * medusaImages.length)
  return medusaImages[randomIndex].url
}

const generateHandle = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

const generateSKU = (title: string, size: string, color: string): string => {
  const cleanTitle = title
    .replace(/[^a-z0-9\s]/gi, '')
    .replace(/\s+/g, '-')
    .toUpperCase()
  return `${cleanTitle}-${size}-${color}`
}

const generateRandomProducts = async (
  n: number,
  timeout = 10000
): Promise<string[]> => {
  const endTime = Date.now() + timeout

  const products = new Set(
    Array.from({ length: n }, () => faker.commerce.product())
  )

  while (products.size < n) {
    products.add(faker.commerce.department())

    if (Date.now() > endTime) {
      throw new MedusaError('TIMEOUT', 'Timeout generating random products')
    }

    // small async pause to avoid blocking event loop
    await new Promise((r) => setTimeout(r, 0))
  }

  return Array.from(products)
}

const generateRandomCollections = async (
  n: number,
  timeout = 5000
): Promise<string[]> => {
  const collections = new Set<string>()
  const endTime = Date.now() + timeout

  while (collections.size < n) {
    collections.add(faker.commerce.department())

    if (Date.now() > endTime) {
      throw new MedusaError('TIMEOUT', 'Timeout generating random collections')
    }

    // small async pause to avoid blocking event loop
    await new Promise((r) => setTimeout(r, 0))
  }

  return Array.from(collections)
}

export default async function seedDummyProducts({ container }: ExecArgs) {
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL)
  const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT)
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  const defaultSalesChannel = await salesChannelModuleService.listSalesChannels(
    {
      name: 'Default Sales Channel',
    }
  )

  if (!defaultSalesChannel.length) {
    throw new MedusaError(
      'NOT_FOUND',
      'Default Sales Channel not found. Please run seed script first.'
    )
  }

  const shippingProfiles = await fulfillmentModuleService.listShippingProfiles({
    type: 'default',
  })

  if (!shippingProfiles.length) {
    throw new MedusaError(
      'NOT_FOUND',
      'Default Shipping Profile not found. Please run seed script first.'
    )
  }

  const { data: stockLocations } = await query.graph({
    entity: 'stock_location',
    fields: ['id'],
  })

  if (!stockLocations.length) {
    throw new MedusaError(
      'NOT_FOUND',
      'No stock locations found. Please run seed script first.'
    )
  }

  const sizeOptions = ['S', 'M', 'L', 'XL']
  const colorOptions = ['Black', 'White']
  const currency_code = 'egp'
  const [randomProducts, randomCollections] = await Promise.all([
    generateRandomProducts(25),
    generateRandomCollections(10),
  ])

  const productsData = randomProducts.map((title) => {
    const handle = generateHandle(title)

    return {
      title,
      handle,
      is_giftcard: false,
      description: faker.commerce.productDescription(),
      status: ProductStatus.PUBLISHED,
      weight: 400,
      options: [
        {
          title: 'Size',
          values: sizeOptions,
        },
        {
          title: 'Color',
          values: colorOptions,
        },
      ],
      images: [
        {
          url: faker.image.avatarGitHub(),
        },
        {
          url: randomMedusaImage(),
        },
      ],
      variants: sizeOptions.flatMap((size) =>
        colorOptions.map((color) => ({
          title: `${size} / ${color}`,
          sku: generateSKU(title, size, color),
          prices: [
            {
              currency_code,
              amount: Math.floor(Math.random() * 5000) + 500, // Random price between 500-5500
            },
          ],
          options: {
            Size: size,
            Color: color,
          },
        }))
      ),
      shipping_profile_id: shippingProfiles[0].id,
      sales_channels: [
        {
          id: defaultSalesChannel[0].id,
        },
      ],
    }
  })

  const { result: products } = await createProductsWorkflow(container).run({
    input: {
      products: productsData,
    },
  })

  await createCollectionsWorkflow(container).run({
    input: {
      collections: randomCollections.map((title) => {
        const randomProductCount =
          Math.floor(Math.random() * products.length) + 1
        const randomProducts = [...products]
          .sort(() => 0.5 - Math.random())
          .slice(0, randomProductCount)

        return {
          title,
          handle: generateHandle(title),
          product_ids: randomProducts.map((product) => product.id),
          metadata: {
            description: faker.commerce.productDescription(),
          },
        }
      }),
    },
  })

  logger.info(`Seeded ${products.length} products.`)

  logger.info('Seeding inventory levels.')

  // Get inventory items for newly created product variants
  const variantIds = products.flatMap((product) =>
    product.variants.map((variant) => variant.id)
  )

  const { data: variantInventoryItems } = await query.graph({
    entity: 'product_variant_inventory_item',
    fields: ['inventory_item_id', 'variant_id'],
  })

  // Filter to only get inventory items for our new variants
  const newInventoryItemIds = variantInventoryItems
    .filter((item) => variantIds.includes(item.variant_id))
    .map((item) => item.inventory_item_id)

  const inventoryLevels = newInventoryItemIds.map((inventoryItemId) => ({
    location_id: stockLocations[0].id,
    stocked_quantity: 100,
    inventory_item_id: inventoryItemId,
  }))

  await createInventoryLevelsWorkflow(container).run({
    input: {
      inventory_levels: inventoryLevels,
    },
  })

  logger.info('Finished seeding inventory levels data.')
}
