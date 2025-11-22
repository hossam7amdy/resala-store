import { ProductTranslationDTO } from '@repo/shared-types'
import { MedusaStoreRequest, refetchEntity } from '@medusajs/framework/http'
import {
  HttpTypes,
  ItemTaxLineDTO,
  MedusaContainer,
  TaxableItemDTO,
  TaxCalculationContext,
} from '@medusajs/framework/types'
import { calculateAmountsWithTax, Modules } from '@medusajs/framework/utils'
import { findPublishedTranslation } from '../utils'

export type RequestWithContext<
  Body,
  QueryFields = Record<string, unknown>,
> = MedusaStoreRequest<Body, QueryFields> & {
  taxContext: {
    taxLineContext?: TaxCalculationContext
    taxInclusivityContext?: {
      automaticTaxes: boolean
    }
  }
}

export const refetchProduct = async (
  idOrFilter: string | object,
  scope: MedusaContainer,
  fields: string[]
) => {
  const product = await refetchEntity({
    entity: 'product',
    idOrFilter,
    scope,
    fields,
  })
  return product as unknown as HttpTypes.StoreProduct
}

export const filterOutInternalProductCategories = (
  products: HttpTypes.StoreProduct[]
) => {
  return products.forEach((product: HttpTypes.StoreProduct) => {
    if (!product.categories) {
      return
    }

    product.categories = product.categories.filter(
      (category) =>
        !(category as HttpTypes.StoreProductCategory & { is_internal: boolean })
          .is_internal
    )
  })
}

export const wrapProductsWithTaxPrices = async <T>(
  req: RequestWithContext<T>,
  products: HttpTypes.StoreProduct[]
) => {
  // If we are missing the necessary context, we can't calculate the tax, so only `calculated_amount` will be available
  if (
    !req.taxContext?.taxInclusivityContext ||
    !req.taxContext?.taxLineContext
  ) {
    return
  }

  // If automatic taxes are not enabled, we should skip calculating any tax
  if (!req.taxContext.taxInclusivityContext.automaticTaxes) {
    return
  }

  const taxService = req.scope.resolve(Modules.TAX)

  const taxRates = (await taxService.getTaxLines(
    products.map(asTaxItem).flat(),
    req.taxContext.taxLineContext
  )) as unknown as ItemTaxLineDTO[]

  const taxRatesMap = new Map<string, ItemTaxLineDTO[]>()
  taxRates.forEach((taxRate) => {
    if (!taxRatesMap.has(taxRate.line_item_id)) {
      taxRatesMap.set(taxRate.line_item_id, [])
    }

    taxRatesMap.get(taxRate.line_item_id)?.push(taxRate)
  })

  products.forEach((product) => {
    product.variants?.forEach((variant) => {
      if (!variant.calculated_price) {
        return
      }

      const taxRatesForVariant = taxRatesMap.get(variant.id) || []
      const { priceWithTax, priceWithoutTax } = calculateAmountsWithTax({
        taxLines: taxRatesForVariant,
        amount: variant.calculated_price!.calculated_amount!,
        includesTax:
          variant.calculated_price!.is_calculated_price_tax_inclusive!,
      })

      variant.calculated_price.calculated_amount_with_tax = priceWithTax
      variant.calculated_price.calculated_amount_without_tax = priceWithoutTax

      const {
        priceWithTax: originalPriceWithTax,
        priceWithoutTax: originalPriceWithoutTax,
      } = calculateAmountsWithTax({
        taxLines: taxRatesForVariant,
        amount: variant.calculated_price!.original_amount!,
        includesTax: variant.calculated_price!.is_original_price_tax_inclusive!,
      })

      variant.calculated_price.original_amount_with_tax = originalPriceWithTax
      variant.calculated_price.original_amount_without_tax =
        originalPriceWithoutTax
    })
  })
}

const asTaxItem = (product: HttpTypes.StoreProduct): TaxableItemDTO[] => {
  return product.variants
    ?.map((variant) => {
      if (!variant.calculated_price) {
        return
      }

      return {
        id: variant.id,
        product_id: product.id,
        product_type_id: product.type_id,
        quantity: 1,
        unit_price: variant.calculated_price.calculated_amount,
        currency_code: variant.calculated_price.currency_code,
      }
    })
    .filter((v) => !!v) as unknown as TaxableItemDTO[]
}

export const localizeProduct = (
  product: HttpTypes.StoreProduct & {
    translations?: ProductTranslationDTO[]
  },
  locale?: string
): HttpTypes.StoreProduct => {
  const translation = findPublishedTranslation(product?.translations, locale)

  if (!translation) {
    return product
  }

  const localizedProduct = {
    ...product,
    title: translation.title || product.title,
    subtitle: translation.subtitle || product.subtitle,
    description: translation.description || product.description,
    // handle: translation.handle || product.handle,
    translations: undefined,
  }

  // Localize product options if they exist
  if (product.options?.length && translation.options?.length) {
    localizedProduct.options = product.options.map((option) => {
      const translatedOption = translation.options.find(
        (t) =>
          t.option_id === option.id && translation.locale_id === t.locale_id
      )
      if (translatedOption) {
        return {
          ...option,
          title: translatedOption.title || option.title,
          values: (option.values || []).map((value) => {
            const translatedValue = translatedOption.values.find(
              (t) =>
                t.option_value_id === value.id &&
                translation.locale_id === t.locale_id
            )
            return {
              ...value,
              value: translatedValue?.value || value.value,
            }
          }),
        }
      }
      return option
    })
  }

  return localizedProduct as HttpTypes.StoreProduct
}

export const localizeProducts = (
  products: any[],
  locale: string
): HttpTypes.StoreProduct[] => {
  return products.map((product) => localizeProduct(product, locale))
}
