"use client"

import InvoiceHeader from "@/src/components/app/invoiceHeader"
import InvoiceLine from "@/src/components/app/invoiceLine"
import Section from "@/src/components/base/layout/section"
import Dropdown from "@/src/components/base/ui/composites/dropdown"
import EmptyState from "@/src/components/base/ui/composites/emptyState"
import List from "@/src/components/base/ui/composites/list"
import Button from "@/src/components/base/ui/primitives/button"
import Frame from "@/src/components/base/ui/primitives/frame"
import Heading from "@/src/components/base/ui/primitives/heading"
import Paragraph from "@/src/components/base/ui/primitives/paragraph"
import type { Invoice } from "@/src/data/invoices"
import { deleteInvoice, getInvoiceKpis, getInvoices, invoiceKpisQueryKey, invoicesQueryKey } from "@/src/services/invoiceService"
import { useInvoiceDraft } from "@/src/store/invoiceDraftState"
import { useInvoiceFormState } from "@/src/store/invoiceFormState"
import { useToastState } from "@/src/store/toastState"
import type { ToastType } from "@/src/types/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { useMemo, useState } from "react"

// Stable empty fallback. A fresh `[]` literal on every render would change the
// query data reference each time and retrigger consumers.
const EMPTY_INVOICES: Invoice[] = []

export default function InvoicesPage() {
  const { businessId } = useParams<{ businessId: string }>()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: invoicesQueryKey(businessId),
    queryFn: () => getInvoices(businessId),
    enabled: Boolean(businessId),
  })
  const invoices = data ?? EMPTY_INVOICES
  const { data: invoiceKpis = [], isLoading: isInvoiceKpisLoading } = useQuery({
    queryKey: invoiceKpisQueryKey(businessId),
    queryFn: () => getInvoiceKpis(businessId),
    enabled: Boolean(businessId),
    select: (response) => response.kpis,
  })
  const [selectedInvoiceFilter, setSelectedInvoiceFilter] = useState("all")
  const openInvoice = useInvoiceFormState((state) => state.openInvoice)
  const setDraftState = useInvoiceDraft.setState
  const { toastState, setToastState } = useToastState()

  const showToast = (toast: ToastType) => {
    setToastState([...toastState, toast])
  }

  const filteredInvoices = useMemo(() => {
    if (selectedInvoiceFilter === "all") {
      return invoices
    }

    return invoices.filter(
      (invoice) => invoice.customer.paymentStatus === selectedInvoiceFilter,
    )
  }, [invoices, selectedInvoiceFilter])

  const handleInvoiceFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedInvoiceFilter(event.target.value)
  }

  const createInvoice = () => {
    openInvoice()
  }

  const handleViewInvoice = (invoiceId: string) => {
    const invoice = invoices.find((item) => item.id === invoiceId)

    if (!invoice) return

    setDraftState({
      customer: invoice.customer.name,
      customerEmail: invoice.customer.email,
      customerAddress: invoice.customer.address,
      amount: String(invoice.total),
      currency: invoice.currency,
      issueDate: invoice.issueDate,
      dueDate: invoice.dueDate,
      vat: String(invoice.vat),
      discount: String(invoice.discount),
      invoiceNo: invoice.id,
      template: invoice.template,
      items: invoice.items.map((item) => ({ ...item })),
    })

    router.push("/dashboard/view-invoice")
  }

  const handleDeleteInvoice = async (invoiceId: string) => {
    try {
      await deleteInvoice(businessId, invoiceId)
      queryClient.setQueryData<Invoice[]>(
        invoicesQueryKey(businessId),
        (currentInvoices) =>
        (currentInvoices ?? []).filter((invoice) => invoice.id !== invoiceId),
      )
      queryClient.invalidateQueries({ queryKey: invoiceKpisQueryKey(businessId) })

      showToast({
        variant: "success",
        title: "Invoice deleted",
        message: `Invoice ${invoiceId} was deleted successfully.`,
      })
    } catch (error) {
      console.error("Failed to delete the invoice:", error)

      showToast({
        variant: "error",
        title: "Delete failed",
        message: "The invoice could not be deleted. Please try again.",
      })
    }
  }

  return (
    <Frame className="w-full h-max flex flex-col">
      <Section>
        <Frame className="justify-between">
          <Frame className="gap-[var(--space-xs)] h-max flex-col">
            <Heading size="xl" type="h1">Invoices</Heading>
            <Paragraph size="sm" weight="light">
              Create, manage and track your invoices.
            </Paragraph>
          </Frame>

          <Frame>
            <Button variant="fill" size="sm" iconPosition="left" iconName="icon-plus" func={createInvoice}>
              New Invoice
            </Button>
          </Frame>
        </Frame>
      </Section>

      {/* Kpis
      <Section>
        <KpiRow kpis={invoiceKpis} isLoading={isInvoiceKpisLoading} itemsCount={4} />
      </Section> */}

      <Section>
        <Frame className="w-full h-max flex flex-col gap-[var(--space-md)]">
          <Frame className="w-full h-max flex items-center justify-between">
            <Heading size="md" type="h2">Invoices</Heading>

            <Dropdown
              name="invoiceFilter"
              width="max-content"
              defaultValue="all"
              value={selectedInvoiceFilter}
              options={["all", "paid", "pending", "overdue", "cancelled"]}
              size="sm"
              formFunc={handleInvoiceFilterChange}
            />
          </Frame>

          <Frame className="w-full h-full">
            {filteredInvoices.length > 0 ? (
              <List width="stretch" height="stretch" scroll="hidden">
                <InvoiceHeader />
                {
                  filteredInvoices.map((invoice) => (
                    <InvoiceLine key={invoice.id} invoice={invoice} onView={handleViewInvoice} onDelete={handleDeleteInvoice}/>
                  ))
                }
              </List>
            ) : (
              <EmptyState message="When you create invoices, they appear here." />
            )}
          </Frame>
        </Frame>
      </Section>
    </Frame>
  )
}
