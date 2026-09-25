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

// The mutations go through the business customers route, which answers with the
// saved customer next to the message.
export type CustomerMutationResponse = {
  message: string
  data: ObjectRecordType
}

// The route validates and coerces what it receives, so a form body is passed on
// unchanged.
type CustomerMutationBody = Record<string, unknown>

export function createCustomer(businessId: string, customer: CustomerMutationBody) {
  return http<CustomerMutationResponse>(
    `/api/businesses/${businessId}/customers`,
    customer,
    { method: "POST" },
  )
}

export function updateCustomer(
  businessId: string,
  customerId: string,
  updates: CustomerMutationBody,
) {
  return http<CustomerMutationResponse>(
    `/api/businesses/${businessId}/customers?customerId=${encodeURIComponent(customerId)}`,
    updates,
    { method: "PATCH" },
  )
}

export function deleteCustomer(businessId: string, customerId: string) {
  return http<CustomerMutationResponse>(
    `/api/businesses/${businessId}/customers?customerId=${encodeURIComponent(customerId)}`,
    undefined,
    { method: "DELETE" },
  )
}
