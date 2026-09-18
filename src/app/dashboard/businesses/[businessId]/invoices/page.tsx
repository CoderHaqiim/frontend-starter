"use client"

import InvoiceHeader from "@/src/components/app/invoiceHeader"
import InvoiceLine from "@/src/components/app/invoiceLine"
import Section from "@/src/components/base/layout/section"
import Dropdown from "@/src/components/base/ui/composites/dropdown"
import KpiRow from "@/src/components/base/ui/composites/kpiRow"
import List from "@/src/components/base/ui/composites/list"
import Button from "@/src/components/base/ui/primitives/button"
import Frame from "@/src/components/base/ui/primitives/frame"
import Heading from "@/src/components/base/ui/primitives/heading"
import Paragraph from "@/src/components/base/ui/primitives/paragraph"
import { getInvoiceKpis, getInvoices, invoiceKpisQueryKey, invoicesQueryKey } from "@/src/services/invoiceService"
import { useBackdropState } from "@/src/store/backdropState"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useMemo, useState } from "react"

export default function InvoicesPage() {
  const { businessId } = useParams<{ businessId: string }>()
  const { data: invoices = [] } = useQuery({
    queryKey: invoicesQueryKey(businessId),
    queryFn: () => getInvoices(businessId),
    enabled: Boolean(businessId),
  })
  const { data: invoiceKpis = [], isLoading: isInvoiceKpisLoading } = useQuery({
    queryKey: invoiceKpisQueryKey(businessId),
    queryFn: () => getInvoiceKpis(businessId),
    enabled: Boolean(businessId),
    select: (response) => response.kpis,
  })
  const [selectedInvoiceFilter, setSelectedInvoiceFilter] = useState("all")
  const { setBackdropContent, setBackdropOpen } = useBackdropState()

  const filteredInvoices = useMemo(() => {
    if (selectedInvoiceFilter === "all") {
      return invoices
    }

    return invoices.filter(
      (invoice) => invoice.customer.paymentStatus === selectedInvoiceFilter
    )
  }, [invoices, selectedInvoiceFilter])

  const handleInvoiceFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedInvoiceFilter(event.target.value)
  }

  const createInvoice = () => {
    setBackdropOpen(true)
    setBackdropContent("create-invoice-form")
  }

  return (
    <Frame className="w-full h-max flex flex-col gap-[var(--space-lg)]">
      <Frame className="w-full h-max flex justify-between">
        <Frame className="w-full h-max flex flex-col gap-[var(--space-xs)]">
          <Heading size="xl" type="h1">Invoices</Heading>
          <Paragraph size="sm" weight="light">
            Create, manage and track your invoices.
          </Paragraph>
        </Frame>

        <Frame>
          <Button
            variant="outline"
            size="sm"
            iconPosition="left"
            iconName="icon-plus"
            func={createInvoice}
          >
            New Invoice
          </Button>
        </Frame>
      </Frame>

      {/* Kpis */}
      <Section>
        <KpiRow kpis={invoiceKpis} isLoading={isInvoiceKpisLoading} itemsCount={4} />
      </Section>

      <Section width="stretch">
        <Frame className="w-full h-max flex flex-col gap-[var(--space-md)]">
          <Frame className="w-full h-max flex items-center justify-between">
            <Heading size="md" type="h2">Recent Invoices</Heading>

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
            <List width="stretch" height="stretch" scroll="hidden">
              <InvoiceHeader />
              {filteredInvoices.map((invoice) => (
                <InvoiceLine key={invoice.id} invoice={invoice} />
              ))}
            </List>
          </Frame>
        </Frame>
      </Section>
    </Frame>
  )
}
