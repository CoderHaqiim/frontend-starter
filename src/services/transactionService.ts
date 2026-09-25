import { http } from "@/src/http/client"
import { Transaction } from "@/src/types/types"
import { getBusinessTransactions, getRecentBusinessTransactions } from "./businessService"

export function businessTransactionsQueryKey(businessId: string, page: number, limit = 10) {
  return ["business-transactions", businessId, page, limit]
}

export function recentBusinessTransactionsQueryKey(businessId: string, limit = 5) {
  return ["recent-business-transactions", businessId, limit]
}

export { getBusinessTransactions, getRecentBusinessTransactions }

// The mutations all go through the business transactions route, which answers with
// the saved record next to the message.
export type TransactionMutationResponse = {
  message: string
  data: Transaction
}

// The route validates and coerces what it receives, so a form body is passed on
// unchanged alongside the values the form derived.
type TransactionMutationBody = Record<string, unknown>

export function createBusinessTransaction(businessId: string, transaction: TransactionMutationBody) {
  return http<TransactionMutationResponse>(
    `/api/businesses/${businessId}/transactions`,
    transaction,
    { method: "POST" },
  )
}

export function updateBusinessTransaction(
  businessId: string,
  transactionId: string,
  updates: TransactionMutationBody,
) {
  return http<TransactionMutationResponse>(
    `/api/businesses/${businessId}/transactions?transactionId=${encodeURIComponent(transactionId)}`,
    updates,
    { method: "PATCH" },
  )
}

export function deleteBusinessTransaction(businessId: string, transactionId: string) {
  return http<TransactionMutationResponse>(
    `/api/businesses/${businessId}/transactions?transactionId=${encodeURIComponent(transactionId)}`,
    undefined,
    { method: "DELETE" },
  )
}
