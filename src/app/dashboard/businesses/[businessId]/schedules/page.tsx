"use client"

import KpiRow from "@/src/components/base/ui/composites/kpiRow"
import Button from "@/src/components/base/ui/primitives/button"
import Frame from "@/src/components/base/ui/primitives/frame"
import Heading from "@/src/components/base/ui/primitives/heading"
import Paragraph from "@/src/components/base/ui/primitives/paragraph"

const schedules = [
  {
    title: "Send weekly customer report",
    date: "Today",
    time: "9:00 AM",
    repeat: "Every Monday",
    reminder: "15 min before",
    status: "Upcoming",
  },
  {
    title: "Review business finances",
    date: "Today",
    time: "2:00 PM",
    repeat: "Every Friday",
    reminder: "30 min before",
    status: "Upcoming",
  },
  {
    title: "Call Ahmed about outstanding payment",
    date: "Tomorrow",
    time: "11:30 AM",
    repeat: "One-time",
    reminder: "1 hour before",
    status: "Upcoming",
  },
  {
    title: "Monthly business review",
    date: "Aug 20",
    time: "10:00 AM",
    repeat: "Monthly",
    reminder: "1 day before",
    status: "Upcoming",
  },
]

const scheduleStat = [
  {
    title: "Today",
    value: "2",
  },
  {
    title: "Upcoming",
    value: "8",
  },
  {
    title: "Recuring",
    value: "2",
  },
  {
    title: "Overdue",
    value: "5",
  },
]

export default function Page() {
  return (
    <Frame className="w-full flex-col h-max gap-[var(--space-lg)]">
      {/* Header */}
      <Frame className="justify-between w-full h-max">
        <Frame className="w-full gap-[var(--space-xs)] h-max flex-col">
          <Heading size="xl" type="h1">
            Schedules
          </Heading>

          <Paragraph size="sm">
            Plan and manage your business activities.
          </Paragraph>
        </Frame>

        <Frame>
          <Button
            variant="outline"
            size="sm"
            iconPosition="left"
            iconName="icon-plus"
          >
            Create schedule
          </Button>
        </Frame>
      </Frame>

      {/* Summary */}
      <KpiRow kpis={scheduleStat} />

      {/* Navigation */}
      <Frame className="w-full gap-[var(--space-sm)]">
        <Button variant="fill" size="sm">
          Today
        </Button>
        <Button variant="outline" size="sm">
          Upcoming
        </Button>
        <Button variant="outline" size="sm">
          Recurring
        </Button>
      </Frame>

      {/* Schedule list */}
      <Frame className="w-full flex-col h-max gap-[var(--space-sm)]">
        {schedules.map((schedule, index) => (
          <ScheduleItem
            key={index}
            {...schedule}
          />
        ))}
      </Frame>
    </Frame>
  )
}

function ScheduleItem({
  title,
  date,
  time,
  repeat,
  reminder,
  status,
}: {
  title: string
  date: string
  time: string
  repeat: string
  reminder: string
  status: string
}) {
  return (
    <Frame className="w-full justify-between h-max gap-[var(--space-md)]">
      <Frame className="flex-col gap-[var(--space-xs)] h-max">
        <Heading size="md" type="h3">
          {title}
        </Heading>

        <Paragraph size="sm">
          {date} · {time}
        </Paragraph>
      </Frame>

      <Frame className="gap-[var(--space-md)] h-max">
        <Paragraph size="sm">{repeat}</Paragraph>
        <Paragraph size="sm">{reminder}</Paragraph>
        <Paragraph size="sm">{status}</Paragraph>

        <Button
          variant="outline"
          size="sm"
          iconName="icon-more-horizontal"
        />
      </Frame>
    </Frame>
  )
}