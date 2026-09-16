import { http } from "@/src/http/client"
import type { Invoice } from "@/src/data/invoices"
import type { kpiObjectProps } from "@/src/types/types"

export const invoicesQueryKey = ["invoices"]
export const invoiceKpisQueryKey = ["invoice-kpis"]

type InvoiceKpiResponse = {
  kpis: kpiObjectProps[]
}

export function getInvoices() {
  return http<Invoice[]>("/api/invoices", undefined, { method: "GET" })
}

export function getInvoiceKpis() {
  return http<InvoiceKpiResponse>("/api/invoices/kpis", undefined, { method: "GET" })
}
