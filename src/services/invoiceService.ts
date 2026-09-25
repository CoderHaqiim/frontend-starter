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

// The mutations go through the business invoices route, which answers with the
// saved invoice next to the message.
export type InvoiceMutationResponse = {
  message: string
  data: Invoice
}

// The route validates and coerces what it receives, so a form body is passed on
// unchanged alongside the values the form derived.
type InvoiceMutationBody = Record<string, unknown>

export function createInvoice(businessId: string, invoice: InvoiceMutationBody) {
  return http<InvoiceMutationResponse>(
    `/api/businesses/${businessId}/invoices`,
    invoice,
    { method: "POST" },
  )
}

export function updateInvoice(businessId: string, invoiceId: string, updates: InvoiceMutationBody) {
  return http<InvoiceMutationResponse>(
    `/api/businesses/${businessId}/invoices?invoiceId=${encodeURIComponent(invoiceId)}`,
    updates,
    { method: "PATCH" },
  )
}

export function deleteInvoice(businessId: string, invoiceId: string) {
  return http<InvoiceMutationResponse>(
    `/api/businesses/${businessId}/invoices?invoiceId=${encodeURIComponent(invoiceId)}`,
    undefined,
    { method: "DELETE" },
  )
}
