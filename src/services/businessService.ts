import { http } from "@/src/http/client"
import { Business, BusinessAccount, Businesses, BusinessHealth, BusinessKpiResponse, Duration, Transaction, TransactionPeriod } from "@/src/types/types"

export const businessesQueryKey = ["businesses"]

export function businessQueryKey(businessId: string) {
  return ["business", businessId]
}

export function businessHealthQueryKey(businessId: string, period: Duration) {
  return ["business-health", businessId, period]
}

// The prefixes every cached period of one health report sits under. The score is
// worked out from the records themselves rather than stored, so a change to a
// transaction or a task is reflected by refreshing the whole prefix, whichever
// period a screen happens to be showing.
export function businessHealthPrefixQueryKey(businessId: string) {
  return ["business-health", businessId]
}

export function businessesHealthQueryKey(period: Duration) {
  return ["businesses-health", period]
}

export function businessesHealthPrefixQueryKey() {
  return ["businesses-health"]
}

export function businessKpisQueryKey(businessId: string, period: Duration) {
  return ["business-kpis", businessId, period]
}

export function businessKpisPrefixQueryKey(businessId: string) {
  return ["business-kpis", businessId]
}

export function dashboardKpisQueryKey(period: Duration) {
  return ["dashboard-kpis", period]
}




//THe calls
export function getBusinesses() {
  return http<Businesses>("/api/businesses")
}

export function getBusiness(businessId: string) {
  return http<Business>(`/api/businesses/${businessId}`)
}

export function getBusinessHealth(businessId: string, period: Duration) {
  return http<BusinessHealth>(`/api/businesses/${businessId}/health?period=${period}`)
}

export function getBusinessesHealth(period: Duration) {
  return http<BusinessHealth[]>(`/api/businesses/health?period=${period}`)
}

export function getBusinessKpis(businessId: string, period: Duration) {
  return http<BusinessKpiResponse>(`/api/businesses/${businessId}/kpis?period=${period}`)
}

export function getDashboardKpis(period: Duration) {
  return http<BusinessKpiResponse>(`/api/kpis?period=${period}`)
}

export function getBusinessTransactions(
  businessId: string,
  page: number,
  limit = 10,
  period: TransactionPeriod = "alltime"
) {
  return http<Transaction[]>(
    `/api/businesses/${businessId}/transactions?page=${page}&limit=${limit}&period=${period}`
  )
}

export function getRecentBusinessTransactions(businessId: string, limit = 5) {
  return http<Transaction[]>(`/api/businesses/${businessId}/transactions?limit=${limit}`)
}

// The business routes answer with the saved record next to the message, the same
// shape the invoice create route uses.
export type BusinessMutationResponse = {
  message: string
  data: Business
}

// The routes validate and coerce the fields they know, so a form body is passed
// on unchanged alongside the numeric values the form derived.
type BusinessMutationBody = Record<string, unknown>

export function createBusiness(business: BusinessMutationBody) {
  return http<BusinessMutationResponse>("/api/businesses", business, { method: "POST" })
}

export function updateBusiness(businessId: string, updates: BusinessMutationBody) {
  return http<BusinessMutationResponse>(`/api/businesses/${businessId}`, updates, { method: "PATCH" })
}

export function deleteBusiness(businessId: string) {
  return http<BusinessMutationResponse>(`/api/businesses/${businessId}`, undefined, { method: "DELETE" })
}

// The edit bank details form saves the account as one set, so it travels under
// the key the business route reads.
export function updateBusinessAccount(businessId: string, account: BusinessAccount) {
  return http<BusinessMutationResponse>(`/api/businesses/${businessId}`, { account }, { method: "PATCH" })
}

export function updateBusinessLogo(businessId: string, logo: string) {
  return http<BusinessMutationResponse>(`/api/businesses/${businessId}`, { logo }, { method: "PATCH" })
}
