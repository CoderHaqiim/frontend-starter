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
    <Frame width="stretch" direction="column" height="hug" gap="lg">
      <Frame justify="space-between" width="stretch" height="hug">
        <Frame width="stretch" gap="xs" height="hug" direction="column">
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
        <Frame gap="sm" align="center" className="mb-[var(--space-sm)]">
            <Heading type="h2" size="md"> Quick Access</Heading>
            <Badge color="accent" size="xs" text="5"/>
        </Frame>
        <Frame gap="md" scroll="hidden">
            {quickContactTableData.map((entry, index) => (
              <QuickAccessCard key={index} entry={entry} />
            ))}
        </Frame>
      </Section>

      <Section width="stretch">
        <Frame width="stretch" height="hug" justify="space-between" align="center" className="mb-[var(--space-sm)]">
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
        <Frame width="stretch" height="stretch" scroll="hidden">
          <Table width="stretch" cellWidth="180px" height="hug" size="sm" data={filteredTableData} />
        </Frame>
      </Section>
    </Frame>
  )
}
