"use client"

import Frame from "@/src/components/ui/primitives/frame"
import Heading from "@/src/components/ui/primitives/heading"
import Paragraph from "@/src/components/ui/primitives/paragraph"
import Button from "@/src/components/ui/primitives/button"
import Section from "@/src/components/layout/section"
import Table from "@/src/components/ui/composites/table"
import KpiRow from "@/src/components/ui/composites/kpiRow"
import QuickAccessCard from "@/src/components/app/cards/quickAccess"
import Badge from "@/src/components/ui/composites/badge"

export default function CustomerWatchlistPage() {

const watchlistQuickAccessData = [
  {
    title: "Overdue",
    value: "2",
    description: "Customers needing payment follow-up",
  },
  {
    title: "Follow Up",
    value: "3",
    description: "Customers to contact",
  },
  {
    title: "High Value",
    value: "₦210,000",
    description: "Outstanding from key customers",
  },
  {
    title: "Inactive",
    value: "2",
    description: "Customers with no recent activity",
  },
  {
    title: "At Risk",
    value: "1",
    description: "Customer requiring attention",
  },
]

const watchlistTableData = [
  {
    customer: "Dangote Stores",
    reason: "Overdue Payment",
    outstanding: "₦150,000",
    lastActivity: "Aug 08, 2026",
    priority: "High",
    nextAction: "Follow Up",
  },
  {
    customer: "Ade & Sons",
    reason: "No Recent Activity",
    outstanding: "₦45,000",
    lastActivity: "Jul 20, 2026",
    priority: "Medium",
    nextAction: "Contact",
  },
  {
    customer: "Ola Ventures",
    reason: "Payment Follow-up",
    outstanding: "₦75,000",
    lastActivity: "Aug 10, 2026",
    priority: "Medium",
    nextAction: "Follow Up",
  },
  {
    customer: "Ikeja Supplies",
    reason: "Overdue Payment",
    outstanding: "₦50,000",
    lastActivity: "Aug 04, 2026",
    priority: "High",
    nextAction: "Contact",
  },
  {
    customer: "Multilinks Ltd",
    reason: "High Value Customer",
    outstanding: "₦0",
    lastActivity: "Aug 13, 2026",
    priority: "Low",
    nextAction: "Review",
  },
]
  const kpis = [
    { id: 'onWatchlist', title: 'On Watchlist', value: '5', meaning: 'Customers needing attention' },
    { id: 'overdue', title: 'Overdue', value: '2', meaning: 'Customers with overdue balances' },
    { id: 'followUp', title: 'Follow Up', value: '3', meaning: 'Customers requiring follow-up' },
    { id: 'outstanding', title: 'Outstanding', value: '₦320,000', meaning: 'Amount owed by watchlist customers' }
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
            Watchlist
          </Heading>

          <Paragraph weight="light" size="sm">
            Keep track of customers that need your attention.
          </Paragraph>
        </Frame>

        <Button
          variant="outline"
          size="sm"
          iconPosition="left"
          iconName="icon-plus"
        >
          Add to Watchlist
        </Button>
      </Frame>


      {/* Summary as KPI cards */}
      <KpiRow kpis={kpis} />

      {/* Watchlist */}
      <Section width="stretch">
        <Frame
          width="stretch"
          height="stretch"
          scroll="hidden"
        >
          <Table
            width="stretch"
            cellWidth="180px"
            height="hug"
            size="sm"
            data={watchlistTableData}
          />
        </Frame>
      </Section>

    </Frame>
  )
}