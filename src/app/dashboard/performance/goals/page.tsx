"use client"

import Frame from "@/src/components/ui/primitives/frame"
import Heading from "@/src/components/ui/primitives/heading"
import Paragraph from "@/src/components/ui/primitives/paragraph"
import Button from "@/src/components/ui/primitives/button"
import Section from "@/src/components/layout/section"
import Badge from "@/src/components/ui/composites/badge"
import Tooltip from "@/src/components/ui/composites/tooltip"
import List from "@/src/components/ui/composites/list"
import GoalsLine from "@/src/components/app/goalsLine"
import { GoalsType } from "@/src/types/types"

const goalsCategories = [
  "Revenue", "Profit", "Customer", "Cash Flow", "Operations", "Team"
]

export const goals: GoalsType[] = [
  {
    id: "0",
    description: "Make $6000",
    category: "profit",
    setDate: "3/3/2023",
    duration: "7 days",
    remaining: "3 days"
  },
  {
    id: "1",
    description: "Hire an accountant jkbbhbhbhb njjbkbbjnjn nnjn jnnjnnzjcns  snsjvjs snvjsnajv aijiavanvjnjdvnjanvjjjjjjjjjjjjjjjj dsanvjdnv svasnvnajvnsa vsnvanjvnndj vaonvanvnanvjf vavnsnvnfnvd",
    category: "staff",
    setDate: "3/3/2023",
    duration: "2 weeks",
    remaining: "3 days"
  },
  {
    id: "2",
    description: "Get 50 more customers",
    category: "customer",
    setDate: "3/3/2023",
    duration: "7 days",
    remaining: "3 days"
  },
  {
    id: "3",
    description: "Get 50 more customers",
    category: "customer",
    setDate: "3/3/2023",
    duration: "7 days",
    remaining: "3 days"
  }
]

export default function GoalsPage() {
  return (
    <Frame width="stretch" direction="column" height="hug" gap="lg">
      <Frame justify="space-between" width="stretch" height="hug">
        <Frame width="stretch" gap="xs" height="hug" direction="column">
          <Heading size="xl" type="h1">Goals</Heading>
          <Paragraph weight="light" size="sm">
            Set and manage your business goals.
          </Paragraph>
        </Frame>
        <Frame gap="sm">
          <Button variant="outline" size="sm" iconPosition="left" iconName="icon-plus">
           Set New Goal
          </Button>
        </Frame>
      </Frame>

      <Section width="stretch">
        <Frame width="stretch" direction="column" gap="md">
          <Frame className="mb-[var(--space-sm)]">
            <Heading size="md" type="h2">Goals categories</Heading>
          </Frame>
          <Frame gap="sm" align="center">
            {
              goalsCategories.map((item, index) => <Badge key={index} size="xs" text={item} color="textColor2" bg="muted2" className="grow-0 p-[var(--space-sm)]"/>)
            }
            <Tooltip content="Add New Category">
              <Button isIcon size="sm" variant="outline" iconName="icon-plus"/>
            </Tooltip>
          </Frame>
        </Frame>
      </Section>
      
      <Section width="stretch" emptyState>
        <Frame width="stretch" direction="column" gap="md">
          <Frame width="stretch" className="mb-[var(--space-sm)]">
            <Heading size="md" type="h2">Current goals</Heading>
          </Frame>
          <Frame justify="center" align="center">
            {
              !goals || goals.length <= 0? 
              <Paragraph size="md">Your goals will appear here once you create your first goal.</Paragraph>:
              <List scroll="hidden">
                {
                  goals.map(item =><GoalsLine goal={item}/>)
                }
              </List>
            }
          </Frame>
        </Frame>
      </Section>
    </Frame>
  )
}
