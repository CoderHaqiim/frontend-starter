import { http } from "@/src/http/client"
import { Business, Businesses, BusinessHealth, BusinessKpiResponse, Duration, Transaction } from "@/src/types/types"

export const businessesQueryKey = ["businesses"]

export function businessQueryKey(businessId: string) {
  return ["business", businessId]
}

export function businessHealthQueryKey(businessId: string, period: Duration) {
  return ["business-health", businessId, period]
}

export function businessesHealthQueryKey(period: Duration) {
  return ["businesses-health", period]
}

export function businessKpisQueryKey(businessId: string, period: Duration) {
  return ["business-kpis", businessId, period]
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

export function getBusinessTransactions(businessId: string, page: number, limit = 10) {
  return http<Transaction[]>(`/api/businesses/${businessId}/transactions?page=${page}&limit=${limit}`)
}

export function getRecentBusinessTransactions(businessId: string, limit = 5) {
  return http<Transaction[]>(`/api/businesses/${businessId}/transactions?limit=${limit}`)
}

export function updateBusinessLogo(businessId: string, logo: string) {
  return http<Business>(`/api/businesses/${businessId}`, { logo }, { method: "POST" })
}
