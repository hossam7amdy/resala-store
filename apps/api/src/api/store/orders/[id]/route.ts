import { getOrderDetailWorkflow } from '@medusajs/core-flows'
import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http'
import { HttpTypes } from '@medusajs/framework/types'
import { localizeOrder, withTranslationFields } from '../helpers'

// TODO: Do we want to apply some sort of authentication here? My suggestion is that we do
export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse<HttpTypes.StoreOrderResponse>
) => {
  const workflow = getOrderDetailWorkflow(req.scope)
  const { result } = await workflow.run({
    input: {
      fields: withTranslationFields(req.queryConfig.fields),
      order_id: req.params.id,
      filters: {
        is_draft_order: false,
      },
    },
  })

  const localizedOrder = localizeOrder(
    result as HttpTypes.StoreOrder,
    req.context?.locale
  )

  res.status(200).json({ order: localizedOrder as HttpTypes.StoreOrder })
}
