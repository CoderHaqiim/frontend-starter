"use client"

import Frame from "@/src/components/ui/primitives/frame"
import Heading from "@/src/components/ui/primitives/heading"
import Paragraph from "@/src/components/ui/primitives/paragraph"
import Button from "@/src/components/ui/primitives/button"
import Section from "@/src/components/layout/section"
import Table from "@/src/components/ui/composites/table"
import KpiRow from "@/src/components/ui/composites/kpiRow"
import Dropdown from "@/src/components/ui/composites/dropdown"
import { useMemo, useState } from "react"

const invoiceSummaryKpis = [
  { id: "total", title: "Total Invoices", value: "24", meaning: "All created invoices" },
  { id: "drafts", title: "Drafts", value: "4", meaning: "Invoices still being prepared" },
  { id: "outstanding", title: "Outstanding", value: "$8,450", meaning: "Amount awaiting payment" },
  { id: "paid", title: "Paid", value: "$15,200", meaning: "Paid invoices this period" },
  { id: "overdue", title: "Overdue", value: "$2,100", meaning: "Invoices past their due date" },
]

const recentInvoices = [
  {
    invoice: "INV-001",
    customer: "Acme Ltd",
    issueDate: "Aug 12, 2026",
    dueDate: "Sep 12, 2026",
    amount: "$2,500",
    status: "pending",
  },
  {
    invoice: "INV-002",
    customer: "John Smith",
    issueDate: "Aug 10, 2026",
    dueDate: "Aug 24, 2026",
    amount: "$850",
    status: "paid",
  },
  {
    invoice: "INV-003",
    customer: "Bright Foods",
    issueDate: "Aug 5, 2026",
    dueDate: "Aug 15, 2026",
    amount: "$1,200",
    status: "overdue",
  },
  {
    invoice: "INV-004",
    customer: "Lagos Traders",
    issueDate: "Jul 29, 2026",
    dueDate: "Aug 12, 2026",
    amount: "$3,100",
    status: "paid",
  },
  {
    invoice: "INV-005",
    customer: "Westfield Co",
    issueDate: "Aug 15, 2026",
    dueDate: "Sep 05, 2026",
    amount: "$2,100",
    status: "pending",
  },
]

export default function InvoicesPage() {
  const [selectedInvoiceFilter, setSelectedInvoiceFilter] = useState("all")

  const filteredInvoices = useMemo(() => {
    if (selectedInvoiceFilter === "all") {
      return recentInvoices
    }

    return recentInvoices.filter((invoice) => invoice.status === selectedInvoiceFilter)
  }, [selectedInvoiceFilter])

  const handleInvoiceFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedInvoiceFilter(event.target.value)
  }

  return (
    <Frame width="stretch" direction="column" height="hug" gap="lg">
      <Frame justify="space-between" width="stretch" height="hug">
        <Frame width="stretch" gap="xs" height="hug" direction="column">
          <Heading size="xl" type="h1">Invoices</Heading>
          <Paragraph size="sm" weight="light">
            Create, manage and track your invoices.
          </Paragraph>
        </Frame>

        <Frame>
          <Button variant="outline" size="sm" iconPosition="left" iconName="icon-plus">
            New Invoice
          </Button>
        </Frame>
      </Frame>

      {/* Kpis */}
      <KpiRow kpis={invoiceSummaryKpis} />

      <Section width="stretch">
        <Frame width="stretch" direction="column" gap="md" height="hug">
          <Frame width="stretch" justify="space-between" height="hug" align="center">
            <Heading size="lg" type="h2">Recent Invoices</Heading>
            <Dropdown
              name="invoiceFilter"
              defaultValue="all"
              value={selectedInvoiceFilter}
              options={["all", "paid", "pending", "overdue"]}
              size="sm"
              formFunc={handleInvoiceFilterChange}
            />
          </Frame>

          <Frame width="stretch" height="stretch" scroll="hidden">
            <Table
              width="stretch"
              cellWidth="180px"
              height="hug"
              size="sm"
              data={filteredInvoices}
            />
          </Frame>
        </Frame>
      </Section>
    </Frame>
  )
}