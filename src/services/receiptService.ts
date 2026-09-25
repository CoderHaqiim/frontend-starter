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

// The mutations go through the business receipts route, which answers with the
// saved receipt next to the message.
export type ReceiptMutationResponse = {
  message: string
  data: Receipt
}

// The route validates and coerces what it receives, so a form body is passed on
// unchanged alongside the values the form derived.
type ReceiptMutationBody = Record<string, unknown>

export function createReceipt(businessId: string, receipt: ReceiptMutationBody) {
  return http<ReceiptMutationResponse>(
    `/api/businesses/${businessId}/receipts`,
    receipt,
    { method: "POST" },
  )
}

export function updateReceipt(businessId: string, receiptId: string, updates: ReceiptMutationBody) {
  return http<ReceiptMutationResponse>(
    `/api/businesses/${businessId}/receipts?receiptId=${encodeURIComponent(receiptId)}`,
    updates,
    { method: "PATCH" },
  )
}

export function deleteReceipt(businessId: string, receiptId: string) {
  return http<ReceiptMutationResponse>(
    `/api/businesses/${businessId}/receipts?receiptId=${encodeURIComponent(receiptId)}`,
    undefined,
    { method: "DELETE" },
  )
}
