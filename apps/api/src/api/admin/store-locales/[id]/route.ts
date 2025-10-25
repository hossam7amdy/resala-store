import { AuthenticatedMedusaRequest, MedusaResponse } from '@medusajs/framework'
import { refetchStoreLocale } from '../helpers'
import { AdminUpdateStoreLocaleType } from '../validators'
import { AdminStoreLocaleResponse } from '@repo/shared-types'
import { MedusaError } from '@medusajs/framework/utils'
import {
  deleteStoreLocaleWorkflow,
  updateStoreLocaleWorkflow,
} from '../../../../workflows/store-locale'

export const PUT = async (
  req: AuthenticatedMedusaRequest<AdminUpdateStoreLocaleType>,
  res: MedusaResponse<AdminStoreLocaleResponse>
) => {
  const { id } = req.params
  const body = req.validatedBody

  await updateStoreLocaleWorkflow(req.scope).run({
    input: {
      id,
      ...body,
    },
  })

  const storeLocale = await refetchStoreLocale(id, req.scope)

  res.status(200).json({ storeLocale })
}

export const DELETE = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse<AdminStoreLocaleResponse>
) => {
  const { id } = req.params

  const storeLocale = await refetchStoreLocale(id, req.scope)

  await deleteStoreLocaleWorkflow(req.scope).run({
    input: {
      id,
      store_id: storeLocale.store_id,
    },
  })

  res.status(200).json({ storeLocale })
}

export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse<AdminStoreLocaleResponse>
) => {
  const { id } = req.params

  const storeLocale = await refetchStoreLocale(id, req.scope)

  if (!storeLocale) {
    throw new MedusaError(
      MedusaError.Types.NOT_FOUND,
      `Store locale with id "${id}" not found`
    )
  }

  res.status(200).json({ storeLocale })
}
