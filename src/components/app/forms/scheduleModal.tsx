"use client"

import { useBackdropState } from "@/src/store/backdropState"
import { format } from "date-fns"
import Card from "../../base/ui/composites/card"
import Dropdown from "../../base/ui/composites/dropdown"
import Form from "../../base/ui/composites/form"
import Button from "../../base/ui/primitives/button"
import CloseButton from "../../base/ui/primitives/closeButton"
import Frame from "../../base/ui/primitives/frame"
import Heading from "../../base/ui/primitives/heading"
import Input from "../../base/ui/primitives/input"
import Label from "../../base/ui/primitives/label"

type ScheduleModalProps = {
  date?: Date | null
}

export default function ScheduleModal({ date }: ScheduleModalProps = {}) {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()

  const closeScheduleModal = () => {
    setBackdropContent(null)
    setBackdropOpen(false)
  }

  const dateValue = date
    ? format(date, "yyyy-MM-dd")
    : ""

  const timeValue = date
    ? format(date, "yyyy-MM-dd'T'HH:mm")
    : ""

  return (
    <Card
      width="500px"
      padding="xl"
      height="max-content"
      specificStyles={{
        maxHeight: "calc(100vh - 48px)",
      }}
    >
      <Frame className="mb-[var(--space-lg)] justify-between">
        <Heading size="md" type="h2">
          Add Schedule
        </Heading>

        <Frame>
          <CloseButton func={closeScheduleModal} />
        </Frame>
      </Frame>

      <Form url="/create-schedule">
        <Frame className="w-full flex-col gap-[var(--space-lg)]">
          <Frame className="w-full flex-col">
            <Label text="Title" size="xs" />
            <Input
              size="sm"
              rounded="sm"
              placeholder="Meet with John"
              outline
              border
              type="text"
              name="title"
              variant="default"
            />
          </Frame>

          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label text="Type" size="xs" />
              <Dropdown
                name="type"
                size="sm"
                width="100%"
                defaultValue="meeting"
                options={[
                  { label: "Meeting", value: "meeting" },
                  { label: "Reminder", value: "reminder" },
                  { label: "Event", value: "event" },
                ]}
              />
            </Frame>

            <Frame className="w-1/2 flex-col">
              <Label text="Recurrence" size="xs" />
              <Dropdown
                name="recurrenceFrequency"
                size="sm"
                width="100%"
                defaultValue="none"
                options={[
                  { label: "None", value: "none" },
                  { label: "Daily", value: "daily" },
                  { label: "Weekly", value: "weekly" },
                  { label: "Monthly", value: "monthly" },
                  { label: "Yearly", value: "yearly" },
                ]}
              />
            </Frame>
          </Frame>

          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label text="Date" size="xs" />
              <input
                required
                type="date"
                name="startAt"
                defaultValue={dateValue}
                className="w-full rounded-[var(--radius-sm)] border border-[var(--color-outline1)] bg-[var(--color-background1)] p-[var(--space-sm)] outline-none"
              />
            </Frame>

            <Frame className="w-1/2 flex-col">
              <Label text="Time" size="xs" />
              <input
                required
                type="datetime-local"
                name="endAt"
                defaultValue={timeValue}
                className="w-full rounded-[var(--radius-sm)] border border-[var(--color-outline1)] bg-[var(--color-background1)] p-[var(--space-sm)] outline-none"
              />
            </Frame>
          </Frame>

          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label text="Location" size="xs" />
              <Input
                size="sm"
                rounded="sm"
                placeholder="Office"
                outline
                border
                type="text"
                name="location"
                variant="default"
              />
            </Frame>

            <Frame className="w-1/2 flex-col">
              <Label text="Guest/ Host" size="xs" />
              <Input
                size="sm"
                rounded="sm"
                placeholder="cus_001"
                outline
                border
                type="text"
                name="customerId"
                variant="default"
              />
            </Frame>
          </Frame>

          <Frame className="w-full flex-col">
            <Label text="Description" size="xs" />
            <textarea
              className="w-full placeholder-[var(--color-outline1)] resize-none rounded-[var(--radius-sm)] border border-[var(--color-outline1)] p-[var(--space-sm)]"
              placeholder="What does this schedule involve?"
              name="description"
              rows={2}
            />
          </Frame>

          <Frame className="justify-end w-full">
            <Button variant="fill" role="submit" size="sm" propagate>
              Save Schedule
            </Button>
          </Frame>
        </Frame>
      </Form>
    </Card>
  )
}