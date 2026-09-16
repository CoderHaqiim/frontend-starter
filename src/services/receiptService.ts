import { http } from "@/src/http/client"
import type { Receipt } from "@/src/data/receipts"
import type { kpiObjectProps } from "@/src/types/types"

export function receiptsQueryKey(businessId: string) {
  return ["receipts", businessId]
}

export function receiptKpisQueryKey(businessId: string) {
  return ["receipt-kpis", businessId]
}

type ReceiptKpiResponse = {
  kpis: kpiObjectProps[]
}

export function getReceipts(businessId: string) {
  return http<Receipt[]>(`/api/businesses/${businessId}/receipts`, undefined, { method: "GET" })
}

export function getReceiptKpis(businessId: string) {
  return http<ReceiptKpiResponse>(`/api/businesses/${businessId}/receipts/kpis`, undefined, { method: "GET" })
}
