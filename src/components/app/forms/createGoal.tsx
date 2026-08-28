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

export default function CreateGoalForm() {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()

  const closeCreateGoalForm = () => {
    setBackdropContent(null)
    setBackdropOpen(false)
  }

  return (
    <Card width="500px" padding="xl" height="max-content">
      <Frame className="mb-[var(--space-xl)] justify-between">
        <Heading size="md" type="h2">
          Set New Goal
        </Heading>
        <Frame>
          <Button size="sm" variant="outline" func={closeCreateGoalForm} isIcon iconName="icon-x"/>
        </Frame>
      </Frame>

      <Form url="/create-goal">
        <Frame className="w-full flex-col gap-[var(--space-lg)]">
          <Frame className="w-full flex-col">
            <Label text="Goal" size="sm" />
            <Input rounded="sm" placeholder="What do you want to achieve?" outline border type="text" name="goal" variant="default" />
          </Frame>

          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label text="Category" size="sm" />
              <Dropdown
                name="category"
                size="sm"
                width="100%"
                options={[
                  { label: "Revenue", value: "revenue" },
                  { label: "Profit", value: "profit" },
                  { label: "Customer", value: "customer" },
                  { label: "Cash Flow", value: "cash-flow" },
                  { label: "Operations", value: "operations" },
                  { label: "Team", value: "team" },
                ]}
              />
            </Frame>
            <Frame className="w-1/2 flex-col">
              <Label text="Target Date" size="sm" />
              <Input rounded="sm" outline border type="date" name="targetDate" variant="default" />
            </Frame>
          </Frame>

          <Frame className="w-full flex-col">
            <Label text="Description" size="sm" />
            <textarea
              className="w-full resize-none rounded-[var(--radius-sm)] border border-[var(--color-outline1)] p-[var(--space-sm)]"
              placeholder="Add goal details..."
              name="description"
              rows={4}
            />
          </Frame>

          <Frame className="justify-end w-full">
            <Button variant="fill" role="submit" size="sm" propagate>
              Set Goal
            </Button>
          </Frame>
        </Frame>
      </Form>
    </Card>
  )
}
