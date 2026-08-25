"use client"

import Form from "../../ui/composites/form"
import Label from "../../ui/primitives/label"
import Card from "../../ui/composites/card"
import Input from "../../ui/primitives/input"
import Frame from "../../ui/primitives/frame"
import Heading from "../../ui/primitives/heading"
import Button from "../../ui/primitives/button"
import Dropdown from "../../ui/composites/dropdown"
import { useBackdropState } from "@/src/store/backdropState"

export default function CreateTaskForm() {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()

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
          <Button
            size="sm"
            variant="outline"
            func={closeCreateTaskForm}
            isIcon
            iconName="icon-x"
          />
        </Frame>
      </Frame>

      <Form url="/create-task">
        <Frame className="w-full flex-col gap-[var(--space-lg)]">

          {/* Task Title */}
          <Frame className="w-full flex-col">
            <Label text="Task Title" size="sm" />

            <Input
              rounded="sm"
              placeholder="What needs to be done?"
              outline
              border
              type="text"
              name="title"
              variant="default"
            />
          </Frame>

          {/* Due Date + Priority */}
          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label text="Due Date" size="sm" />

              <Input
                rounded="sm"
                outline
                border
                type="date"
                name="dueDate"
                variant="default"
              />
            </Frame>

            <Frame className="w-1/2 flex-col">
              <Label text="Priority" size="sm" />

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
              <Label text="Status" size="sm" />

              <Dropdown
                name="status"
                size="sm"
                width="100%"
                options={[
                  { label: "To Do", value: "todo" },
                  { label: "In Progress", value: "in-progress" },
                  { label: "Completed", value: "completed" },
                ]}
              />
            </Frame>

            <Frame className="w-1/2 flex-col">
              <Label text="Assignee" size="sm" />

              <Dropdown
                name="assignee"
                size="sm"
                width="100%"
                options={[
                  { label: "Me", value: "me" },
                  { label: "Unassigned", value: "unassigned" },
                ]}
              />
            </Frame>
          </Frame>

          {/* Description */}
          <Frame className="w-full flex-col">
            <Label text="Description" size="sm" />

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