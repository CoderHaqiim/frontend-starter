import { http } from "@/src/http/client"
import { kpiObjectProps, ObjectRecordType } from "@/src/types/types"

export function customersQueryKey(businessId: string) {
  return ["customers", businessId]
}

export function customerKpisQueryKey(businessId: string) {
  return ["customer-kpis", businessId]
}

export function quickAccessCustomersQueryKey(businessId: string) {
  return ["quick-access-customers", businessId]
}

export type CustomerKpiResponse = {
  kpis: kpiObjectProps[]
}

export function getCustomers(businessId: string) {
  return http<ObjectRecordType[]>(`/api/businesses/${businessId}/customers`)
}

export function getCustomerKpis(businessId: string) {
  return http<CustomerKpiResponse>(`/api/businesses/${businessId}/customers/kpis`)
}

export function getQuickAccessCustomers(businessId: string) {
  return http<ObjectRecordType[]>(`/api/businesses/${businessId}/customers/quickAccessCard`)
}
