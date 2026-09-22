"use client"

import { businessesQueryKey, getBusinesses } from "@/src/services/businessService"
import { useBackdropState } from "@/src/store/backdropState"
import { useQuery } from "@tanstack/react-query"
import Card from "../../base/ui/composites/card"
import Dropdown from "../../base/ui/composites/dropdown"
import Form from "../../base/ui/composites/form"
import Button from "../../base/ui/primitives/button"
import CloseButton from "../../base/ui/primitives/closeButton"
import Frame from "../../base/ui/primitives/frame"
import Heading from "../../base/ui/primitives/heading"
import Input from "../../base/ui/primitives/input"
import Label from "../../base/ui/primitives/label"

export default function CreateTaskForm() {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()

  const closeCreateTaskForm = () => {
    setBackdropContent(null)
    setBackdropOpen(false)
  }

  const {data:businesses = []} = useQuery({
    queryKey: businessesQueryKey,
    queryFn: getBusinesses
  })

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

      <Form url="/api/post">
        <Frame className="w-full flex-col gap-[var(--space-lg)]">

          {/* Task Title */}
          <Frame className="w-full flex-col">
            <Label required text="Task Title" size="xs" />
            <Input size="sm" required rounded="sm" placeholder="What needs to be done?" outline border type="text" name="title" variant="default"/>
          </Frame>

           {/* Description */}
          <Frame className="w-full flex-col">
            <Label required text="Description" size="xs" />
            <textarea
              required
              className="w-full text-[length:var(--bodySize-xs)] resize-none rounded-[var(--radius-sm)] border border-[var(--color-outline1)] p-[var(--space-sm)]"
              placeholder="Add details about this task..."
              name="description"
              rows={3}
            />
          </Frame>

          {/* Due Date */}
          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label required text="Due Date" size="xs" />
              <input required type="date" name="dueDate"
                className="w-full text-[length:var(--bodySize-sm)] h-[var(--elementSize-sm)] rounded-[var(--radius-sm)] border border-[var(--color-outline1)] bg-[var(--color-background1)] p-[var(--space-md)] outline-none"
              />
            </Frame>

            <Frame className="w-1/2 flex-col">
              <Label text="Priority" size="xs" />

              <Dropdown name="priority" size="sm" width="100%"
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
              <Dropdown name="businessId" size="sm" width="100%"
                options={businesses.map((business) => ({
                  label: business.businessName,
                  value: business.id,
                }))}
              />
            </Frame>
          </Frame>

          {/* Submit */}
          <Frame className="justify-end w-full">
            <Button variant="fill" role="submit" size="md" propagate>
              Create Task
            </Button>
          </Frame>
        </Frame>
      </Form>
    </Card>
  )
}