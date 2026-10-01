import { http } from "@/src/http/client"
import { BusinessTransactionKpis, Transaction, TransactionPeriod } from "@/src/types/types"
import { getBusinessTransactions, getRecentBusinessTransactions } from "./businessService"

export function businessTransactionsQueryKey(
  businessId: string,
  page: number,
  limit = 10,
  period: TransactionPeriod = "alltime"
) {
  return ["business-transactions", businessId, page, limit, period]
}

export function recentBusinessTransactionsQueryKey(businessId: string, limit = 5) {
  return ["recent-business-transactions", businessId, limit]
}

// The prefix shared by every cached page of a business, so a bulk change such as
// an import can refresh them all at once.
export function businessTransactionsPrefixQueryKey(businessId: string) {
  return ["business-transactions", businessId]
}

export function recentBusinessTransactionsPrefixQueryKey(businessId: string) {
  return ["recent-business-transactions", businessId]
}

// The KPI row above the list, read from every transaction the business holds
// rather than the page of records being viewed. It sits under the shared
// business-transactions prefix, so the bulk refresh an import runs picks it up
// along with every cached page.
export function businessTransactionKpisQueryKey(
  businessId: string,
  period: TransactionPeriod = "alltime"
) {
  return ["business-transactions", businessId, "kpis", period]
}

export function getBusinessTransactionKpis(
  businessId: string,
  period: TransactionPeriod = "alltime"
) {
  return http<BusinessTransactionKpis>(
    `/api/businesses/${businessId}/transactions/kpis?period=${period}`
  )
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
