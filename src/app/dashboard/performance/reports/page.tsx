"use client"

import Frame from "@/src/components/ui/primitives/frame"
import Heading from "@/src/components/ui/primitives/heading"
import Paragraph from "@/src/components/ui/primitives/paragraph"
import Button from "@/src/components/ui/primitives/button"
import Section from "@/src/components/layout/section"

export default function ReportsPage() {
  return (
    <Frame className="flex w-full flex-col gap-[var(--space-lg)]">
      <Frame className="flex h-max w-full justify-between">
        <Frame className="flex h-max w-full flex-col gap-[var(--space-xs)]">
          <Heading size="xl" type="h1">Reports</Heading>
          <Paragraph weight="light" size="sm">
            Review business performance metrics and export summaries for your team.
          </Paragraph>
        </Frame>

        <Frame>
          <Button
            variant="fill"
            size="sm"
            iconPosition="left"
            iconName="icon-plus"
          >
            New Report
          </Button>
        </Frame>
      </Frame>

      <Section width="stretch">
        <Frame className="flex w-full flex-col gap-[var(--space-md)]">
          <Heading size="md" type="h2">Recent reports</Heading>
          <Paragraph weight="light" size="sm">
            Create a report to capture recent transactions, score trends, and business health insights.
          </Paragraph>
        </Frame>
      </Section>
    </Frame>
  )
}