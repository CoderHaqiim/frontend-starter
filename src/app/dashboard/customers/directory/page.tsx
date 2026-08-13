"use client"

import Frame from "@/src/components/ui/primitives/frame"
import Heading from "@/src/components/ui/primitives/heading"
import Paragraph from "@/src/components/ui/primitives/paragraph"
import Button from "@/src/components/ui/primitives/button"
import Section from "@/src/components/layout/section"
import Table from "@/src/components/ui/composites/table"
import { customerDirectoryTableData, quickContactTableData } from "@/src/components/app/customers/customerData"
import QuickAccessCard from "@/src/components/app/cards/quickAccess"
import Badge from "@/src/components/ui/composites/badge"

export default function CustomerDirectoryPage() {
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
        <Frame width="stretch" height="stretch" scroll="hidden">
          <Table width="stretch" cellWidth="180px" height="hug" size="sm" data={customerDirectoryTableData} />
        </Frame>
      </Section>
    </Frame>
  )
}
