import { getBusinessTransactions, getRecentBusinessTransactions } from "./businessService"

export function businessTransactionsQueryKey(businessId: string, page: number, limit = 10) {
  return ["business-transactions", businessId, page, limit]
}

export function recentBusinessTransactionsQueryKey(businessId: string, limit = 5) {
  return ["recent-business-transactions", businessId, limit]
}

export { getBusinessTransactions, getRecentBusinessTransactions }
