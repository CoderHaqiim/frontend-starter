import { http } from "@/src/http/client"
import type { Invoice } from "@/src/data/invoices"
import type { kpiObjectProps } from "@/src/types/types"

export function invoicesQueryKey(businessId: string) {
  return ["invoices", businessId]
}

export function invoiceKpisQueryKey(businessId: string) {
  return ["invoice-kpis", businessId]
}

type InvoiceKpiResponse = {
  kpis: kpiObjectProps[]
}

export function getInvoices(businessId: string) {
  return http<Invoice[]>(`/api/businesses/${businessId}/invoices`, undefined, { method: "GET" })
}

export function getInvoiceKpis(businessId: string) {
  return http<InvoiceKpiResponse>(`/api/businesses/${businessId}/invoices/kpis`, undefined, { method: "GET" })
}
