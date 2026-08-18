"use client"

import { useMemo, useState } from "react"
import Frame from "@/src/components/ui/primitives/frame"
import Heading from "@/src/components/ui/primitives/heading"
import Paragraph from "@/src/components/ui/primitives/paragraph"
import Button from "@/src/components/ui/primitives/button"
import Section from "@/src/components/layout/section"
import Table from "@/src/components/ui/composites/table"
import Dropdown from "@/src/components/ui/composites/dropdown"
import { customerDirectoryTableData, quickContactTableData, watchlistTableData } from "@/src/components/app/customers/customerData"
import QuickAccessCard from "@/src/components/app/cards/quickAccess"
import Badge from "@/src/components/ui/composites/badge"

export default function CustomerDirectoryPage() {
  const [selectedTable, setSelectedTable] = useState("all")

  const filteredTableData = useMemo(() => {
    if (selectedTable === "watchlist") {
      return watchlistTableData
    }

    return customerDirectoryTableData
  }, [selectedTable])

  const handleTableChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTable(event.target.value)
  }

  return (
    <Frame className="w-full flex-col h-max gap-[var(--space-lg)]">
      <Frame className="justify-between w-full h-max">
        <Frame className="w-full gap-[var(--space-xs)] h-max flex-col">
          <Heading size="xl" type="h1">Customer Directory</Heading>
          <Paragraph weight="light" size="sm">
            Browse and manage your customer contacts.
          </Paragraph>
        </Frame>
        <Button variant="outline" size="sm" iconPosition="left" iconName="icon-plus">
          Add Customer
        </Button>
      </Frame>

      <Section>
        <Frame className="gap-[var(--space-sm)] items-center mb-[var(--space-sm)]">
            <Heading type="h2" size="md"> Quick Access</Heading>
            <Badge color="accent" size="xs" text="5"/>
        </Frame>
        <Frame className="gap-[var(--space-md)]" scroll="hidden">
            {quickContactTableData.map((entry, index) => (
              <QuickAccessCard key={index} entry={entry} />
            ))}
        </Frame>
      </Section>

      <Section width="stretch">
        <Frame className="w-full h-max justify-between items-center mb-[var(--space-sm)]">
          <Heading type="h2" size="md">Customer List</Heading>
          <Dropdown
            name="customerTable"
            defaultValue="all"
            value={selectedTable}
            options={["all", "watchlist"]}
            size="sm"
            formFunc={handleTableChange}
          />
        </Frame>
        <Frame className="w-full h-full" scroll="hidden">
          <Table width="stretch" cellWidth="180px" height="hug" size="sm" data={filteredTableData} />
        </Frame>
      </Section>
    </Frame>
  )
}