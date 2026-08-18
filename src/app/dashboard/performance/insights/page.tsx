"use client"

import Frame from "@/src/components/ui/primitives/frame"
import Heading from "@/src/components/ui/primitives/heading"
import Paragraph from "@/src/components/ui/primitives/paragraph"
import Button from "@/src/components/ui/primitives/button"
import Section from "@/src/components/layout/section"

export default function InsightsPage() {
  return (
    <Frame className="flex w-full flex-col gap-[var(--space-lg)]">
      <Frame className="flex h-max w-full justify-between">
        <Frame className="flex h-max w-full flex-col gap-[var(--space-xs)]">
          <Heading size="xl" type="h1">Insights</Heading>
          <Paragraph weight="light" size="sm">
            Explore actionable business intelligence and performance signals.
          </Paragraph>
        </Frame>

        <Frame>
          <Button
            variant="fill"
            size="sm"
            iconPosition="left"
            iconName="icon-plus"
          >
            New Insight
          </Button>
        </Frame>
      </Frame>

      <Section width="stretch">
        <Frame className="flex w-full flex-col gap-[var(--space-md)]">
          <Heading size="md" type="h2">Overview</Heading>
          <Paragraph weight="light" size="sm">
            Insights help you identify trends, opportunities, and risks across your businesses.
          </Paragraph>
        </Frame>
      </Section>
    </Frame>
  )
}