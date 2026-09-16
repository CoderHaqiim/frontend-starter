import { http } from "@/src/http/client"
import type { ObjectRecordType } from "@/src/types/types"

export function inventoryQueryKey(businessId: string) {
  return ["inventory", businessId]
}

export function getInventory(businessId: string) {
  return http<ObjectRecordType[]>(`/api/businesses/${businessId}/inventory`, undefined, { method: "GET" })
}
