"use client"

import { useBackdropState } from "@/src/store/backdropState"
import { useBusinessesState } from "@/src/store/businessesState"
import Card from "../../ui/composites/card"
import Dropdown from "../../ui/composites/dropdown"
import Form from "../../ui/composites/form"
import Button from "../../ui/primitives/button"
import CloseButton from "../../ui/primitives/closeButton"
import Frame from "../../ui/primitives/frame"
import Heading from "../../ui/primitives/heading"
import Input from "../../ui/primitives/input"
import Label from "../../ui/primitives/label"

export default function CreateTaskForm() {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const { businessesState } = useBusinessesState()

  const closeCreateTaskForm = () => {
    setBackdropContent(null)
    setBackdropOpen(false)
  }

  return (
    <Card width="500px" padding="xl" height="max-content">
      <Frame className="mb-[var(--space-xl)] justify-between">
        <Heading size="md" type="h2">
          Create Task
        </Heading>

        <Frame>
          <CloseButton func={closeCreateTaskForm} />
        </Frame>
      </Frame>

      <Form url="/create-task">
        <Frame className="w-full flex-col gap-[var(--space-lg)]">

          {/* Task Title */}
          <Frame className="w-full flex-col">
            <Label text="Task Title" size="xs" />
            <Input size="sm" rounded="sm" placeholder="What needs to be done?" outline border type="text" name="title" variant="default"/>
          </Frame>

          {/* Due Date + Priority */}
          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label text="Due Date" size="xs" />
              <input
                required
                type="date"
                name="dueDate"
                className="w-full rounded-[var(--radius-sm)] border border-[var(--color-outline1)] bg-[var(--color-background1)] p-[var(--space-sm)] outline-none"
              />
            </Frame>

            <Frame className="w-1/2 flex-col">
              <Label text="Priority" size="xs" />

              <Dropdown
                name="priority"
                size="sm"
                width="100%"
                options={[
                  { label: "Low", value: "low" },
                  { label: "Medium", value: "medium" },
                  { label: "High", value: "high" },
                  { label: "Urgent", value: "urgent" },
                ]}
              />
            </Frame>
          </Frame>

          {/* Status + Assignee */}
          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label text="Status" size="xs" />

              <Dropdown name="status" size="sm" width="100%"
                options={[
                  { label: "Pending", value: "pending" },
                  { label: "Overdue", value: "overdue" },
                  { label: "In Progress", value: "in-progress" },
                  { label: "Completed", value: "completed" },
                ]}
              />
            </Frame>

            <Frame className="w-1/2 flex-col">
              <Label text="Business" size="xs" />

              <Dropdown
                name="business"
                size="sm"
                width="100%"
                options={businessesState.map((business) => ({
                  label: business.name,
                  value: business.id,
                }))}
              />
            </Frame>
          </Frame>

          {/* Description */}
          <Frame className="w-full flex-col">
            <Label text="Description" size="xs" />

            <textarea
              className="w-full resize-none rounded-[var(--radius-sm)] border border-[var(--color-outline1)] p-[var(--space-sm)]"
              placeholder="Add details about this task..."
              name="description"
              rows={4}
            />
          </Frame>

          {/* Submit */}
          <Frame className="justify-end w-full">
            <Button
              variant="fill"
              role="submit"
              size="sm"
              propagate
            >
              Create Task
            </Button>
          </Frame>

        </Frame>
      </Form>
    </Card>
  )
}