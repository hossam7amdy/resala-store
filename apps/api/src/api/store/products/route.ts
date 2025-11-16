import { MedusaResponse } from '@medusajs/framework/http'
import { HttpTypes, QueryContextType } from '@medusajs/framework/types'
import {
  ContainerRegistrationKeys,
  FeatureFlag,
  isPresent,
  QueryContext,
  remoteQueryObjectFromString,
} from '@medusajs/framework/utils'
import IndexEngineFeatureFlag from '../../../feature-flags/index-engine'
import {
  localizeProducts,
  RequestWithContext,
  wrapProductsWithTaxPrices,
} from './helpers'
import { wrapVariantsWithInventoryQuantityForSalesChannel } from '@medusajs/medusa/api/utils/middlewares/index'
import { storeProductTranslationFields } from './query-config'

export const GET = async (
  req: RequestWithContext<HttpTypes.StoreProductListParams>,
  res: MedusaResponse<HttpTypes.StoreProductListResponse>
) => {
  if (FeatureFlag.isFeatureEnabled(IndexEngineFeatureFlag.key)) {
    // TODO: These filters are not supported by the index engine yet
    if (
      isPresent(req.filterableFields.tags) ||
      isPresent(req.filterableFields.categories) ||
      isPresent(req.filterableFields.q)
    ) {
      return await getProducts(req, res)
    }

    return await getProductsWithIndexEngine(req, res)
  }

  return await getProducts(req, res)
}

async function getProductsWithIndexEngine(
  req: RequestWithContext<HttpTypes.StoreProductListParams>,
  res: MedusaResponse<HttpTypes.StoreProductListResponse>
) {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const context: QueryContextType = {}
  const withInventoryQuantity = req.queryConfig.fields.some((field) =>
    field.includes('variants.inventory_quantity')
  )

  if (withInventoryQuantity) {
    req.queryConfig.fields = req.queryConfig.fields.filter(
      (field) => !field.includes('variants.inventory_quantity')
    )
  }

  if (isPresent(req.pricingContext)) {
    context['variants'] ??= {}
    context['variants']['calculated_price'] = QueryContext(req.pricingContext!)
  }

  const filters: Record<string, any> = req.filterableFields
  if (isPresent(filters.sales_channel_id)) {
    const salesChannelIds = filters.sales_channel_id

    filters['sales_channels'] ??= {}
    filters['sales_channels']['id'] = salesChannelIds

    delete filters.sales_channel_id
  }

  const { data = [], metadata } = await query.index({
    entity: 'product',
    fields: req.queryConfig.fields,
    filters,
    pagination: req.queryConfig.pagination,
    context,
  })

  const products = data as any

  if (withInventoryQuantity) {
    await wrapVariantsWithInventoryQuantityForSalesChannel(
      req,
      products.map((product) => product.variants).flat(1) as any
    )
  }

  await wrapProductsWithTaxPrices(req, products)
  res.json({
    products,
    count: metadata!.estimate_count,
    estimate_count: metadata!.estimate_count,
    offset: metadata!.skip,
    limit: metadata!.take,
  })
}

async function getProducts(
  req: RequestWithContext<HttpTypes.StoreProductListParams>,
  res: MedusaResponse<HttpTypes.StoreProductListResponse>
) {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const context: object = {}
  const withInventoryQuantity = req.queryConfig.fields.some((field) =>
    field.includes('variants.inventory_quantity')
  )

  if (withInventoryQuantity) {
    req.queryConfig.fields = req.queryConfig.fields.filter(
      (field) => !field.includes('variants.inventory_quantity')
    )
  }

  if (isPresent(req.pricingContext)) {
    context['variants.calculated_price'] = {
      context: req.pricingContext,
    }
  }

  // If search query exists, search in translations
  if (isPresent(req.filterableFields.q)) {
    const searchVariables = {
      filters: {
        q: req.filterableFields.q,
      },
      ...req.queryConfig.pagination,
      ...context,
    }
    delete req.filterableFields.q

    const productQueryObject = remoteQueryObjectFromString({
      entryPoint: 'products',
      variables: searchVariables,
      fields: ['id'],
    })
    const translationQueryObject = remoteQueryObjectFromString({
      entryPoint: 'product_translations',
      variables: searchVariables,
      fields: ['product_id'],
    })

    const [{ rows: products }, { rows: translations }] = await Promise.all([
      remoteQuery(productQueryObject),
      remoteQuery(translationQueryObject),
    ])

    // Extract unique product IDs matches
    const uniqueMatchingIds = new Set<string>(
      products
        .map((product) => product.id as string)
        .concat(translations.map((t) => t.product_id as string))
    )

    // If translations found, add to product ID filter
    if (uniqueMatchingIds.size > 0) {
      req.filterableFields.id = Array.from(uniqueMatchingIds)
    } else {
      return res.json({
        products: [],
        count: 0,
        offset: req.queryConfig.pagination.skip,
        limit: req.queryConfig.pagination.take || 10,
      })
    }
  }

  const queryObject = remoteQueryObjectFromString({
    entryPoint: 'products',
    variables: {
      filters: req.filterableFields,
      ...req.queryConfig.pagination,
      ...context,
    },
    fields: req.queryConfig.fields.concat(storeProductTranslationFields),
  })

  const { rows: products, metadata } = await remoteQuery(queryObject)

  if (withInventoryQuantity) {
    await wrapVariantsWithInventoryQuantityForSalesChannel(
      req,
      products.map((product) => product.variants).flat(1)
    )
  }

  await wrapProductsWithTaxPrices(req, products)

  res.json({
    products: localizeProducts(products, req.context?.locale),
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}
