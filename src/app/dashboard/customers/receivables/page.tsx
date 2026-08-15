"use client"

import Frame from "@/src/components/ui/primitives/frame"
import Heading from "@/src/components/ui/primitives/heading"
import Paragraph from "@/src/components/ui/primitives/paragraph"
import Button from "@/src/components/ui/primitives/button"
import Section from "@/src/components/layout/section"
import Table from "@/src/components/ui/composites/table"
import { customers } from "@/src/components/app/customers/customerData"
import KpiRow from "@/src/components/ui/composites/kpiRow"

export default function ReceivablesPage() {
  const kpis = [
    { id: 'outstanding', title: 'Outstanding', value: '₦650,000', meaning: 'Total money owed' },
    { id: 'overdue', title: 'Overdue', value: '₦185,000', meaning: 'Past the due date' },
    { id: 'dueSoon', title: 'Due Soon', value: '₦240,000', meaning: 'Due within 7 days' },
    { id: 'customersOwing', title: 'Customers Owing', value: '12', meaning: 'With outstanding balances' }
  ]

    const receivablesTableData = [
  {
    customer: "Dangote Stores",
    reference: "INV-0024",
    amount: "₦150,000",
    dueDate: "Aug 12, 2026",
    status: "Overdue",
    daysOutstanding: "3 days",
  },
  {
    customer: "Ade & Sons",
    reference: "INV-0028",
    amount: "₦85,000",
    dueDate: "Aug 17, 2026",
    status: "Due Soon",
    daysOutstanding: "—",
  },
  {
    customer: "Multilinks Ltd",
    reference: "INV-0031",
    amount: "₦120,000",
    dueDate: "Aug 20, 2026",
    status: "Pending",
    daysOutstanding: "—",
  },
  {
    customer: "Ikeja Supplies",
    reference: "INV-0019",
    amount: "₦45,000",
    dueDate: "Aug 05, 2026",
    status: "Overdue",
    daysOutstanding: "10 days",
  },
  {
    customer: "Ola Ventures",
    reference: "INV-0034",
    amount: "₦75,000",
    dueDate: "Aug 22, 2026",
    status: "Pending",
    daysOutstanding: "—",
  },
]

  const receivablesKpi = [
  {
    title: "Overdue",
    value: "₦185,000",
    description: "4 receivables overdue",
  },
  {
    title: "Due Soon",
    value: "₦240,000",
    description: "Due within 7 days",
  },
  {
    title: "Largest Balance",
    value: "₦150,000",
    description: "Dangote Stores",
  },
  {
    title: "Recently Due",
    value: "₦75,000",
    description: "Due this week",
  },
  {
    title: "Long Outstanding",
    value: "₦90,000",
    description: "Outstanding for 30+ days",
  },
]

  return (
    <Frame width="stretch" direction="column" height="hug" gap="lg">

      {/* Header */}
      <Frame justify="space-between" width="stretch" height="hug">
        <Frame
          width="stretch"
          gap="xs"
          height="hug"
          direction="column"
        >
          <Heading size="xl" type="h1">
            Receivables
          </Heading>

          <Paragraph weight="light" size="sm">
            Track money owed to your business and manage outstanding payments.
          </Paragraph>
        </Frame>

        <Button
          variant="outline"
          size="sm"
          iconPosition="left"
          iconName="icon-plus"
        >
          Record Payment
        </Button>
      </Frame>


      {/* Summary as KPI cards */}
     <KpiRow kpis={receivablesKpi} />

      {/* Receivables table */}
      <Section width="stretch">
        <Frame width="stretch" height="stretch" scroll="hidden">
          <Table width="stretch" cellWidth="180px" height="hug" size="sm" data={receivablesTableData}/>
        </Frame>
      </Section>

    </Frame>
  )
}