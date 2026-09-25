import { http } from "@/src/http/client"
import type { ObjectRecordType } from "@/src/types/types"

export function inventoryQueryKey(businessId: string) {
  return ["inventory", businessId]
}

export function getInventory(businessId: string) {
  return http<ObjectRecordType[]>(`/api/businesses/${businessId}/inventory`, undefined, { method: "GET" })
}

// The mutations go through the business inventory route, which answers with the
// saved item next to the message. An item is identified by its SKU.
export type InventoryMutationResponse = {
  message: string
  data: ObjectRecordType
}

// The route validates and coerces what it receives, so a form body is passed on
// unchanged.
type InventoryMutationBody = Record<string, unknown>

export function createInventoryItem(businessId: string, item: InventoryMutationBody) {
  return http<InventoryMutationResponse>(
    `/api/businesses/${businessId}/inventory`,
    item,
    { method: "POST" },
  )
}

export function updateInventoryItem(businessId: string, sku: string, updates: InventoryMutationBody) {
  return http<InventoryMutationResponse>(
    `/api/businesses/${businessId}/inventory?sku=${encodeURIComponent(sku)}`,
    updates,
    { method: "PATCH" },
  )
}

export function deleteInventoryItem(businessId: string, sku: string) {
  return http<InventoryMutationResponse>(
    `/api/businesses/${businessId}/inventory?sku=${encodeURIComponent(sku)}`,
    undefined,
    { method: "DELETE" },
  )
}
