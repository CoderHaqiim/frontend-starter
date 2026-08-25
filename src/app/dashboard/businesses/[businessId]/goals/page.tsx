"use client"

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
    <div className="flex w-full h-max flex-col gap-[var(--space-lg)]">
      <div className="flex w-full h-max justify-between">
        <div className="flex w-full h-max flex-col gap-[var(--space-xs)]">
          <Heading size="xl" type="h1">Goals</Heading>
          <Paragraph weight="light" size="sm">
            Set and manage your business goals.
          </Paragraph>
        </div>

        <div className="flex gap-[var(--space-sm)]">
          <Button
            variant="outline"
            size="sm"
            iconPosition="left"
            iconName="icon-plus"
          >
            Set New Goal
          </Button>
        </div>
      </div>

      <Section width="stretch">
        <div className="flex w-full flex-col gap-[var(--space-md)]">
          <div className="mb-[var(--space-sm)]">
            <Heading size="md" type="h2">Goals categories</Heading>
          </div>

          <div className="flex items-center gap-[var(--space-sm)]">
            {goalsCategories.map((item, index) => (
              <Badge
                key={index}
                size="xs"
                text={item}
                color="textColor2"
                bg="muted2"
                className="grow-0 p-[var(--space-sm)]"
              />
            ))}

            <Tooltip content="Add New Category">
              <Button
                isIcon
                size="sm"
                variant="outline"
                iconName="icon-plus"
              />
            </Tooltip>
          </div>
        </div>
      </Section>

      <Section width="stretch" emptyState>
        <div className="flex w-full flex-col gap-[var(--space-md)]">
          <div className="mb-[var(--space-sm)]">
            <Heading size="md" type="h2">Current goals</Heading>
          </div>

          <div className="flex items-center justify-center">
            {!goals || goals.length <= 0 ? (
              <Paragraph size="md">
                Your goals will appear here once you create your first goal.
              </Paragraph>
            ) : (
              <List scroll="hidden">
                {goals.map(item => (
                  <GoalsLine key={item.id} goal={item} />
                ))}
              </List>
            )}
          </div>
        </div>
      </Section>
    </div>
  )
}