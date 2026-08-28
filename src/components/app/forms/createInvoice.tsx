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

export default function CreateInvoiceForm() {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()

  const closeCreateInvoiceForm = () => {
    setBackdropContent(null)
    setBackdropOpen(false)
  }

  return (
    <Card width="500px" padding="xl" height="max-content">
      <Frame className="mb-[var(--space-xl)] justify-between">
        <Heading size="md" type="h2">
          New Invoice
        </Heading>
        <Frame>
          <Button size="sm" variant="outline" func={closeCreateInvoiceForm} isIcon iconName="icon-x"/>
        </Frame>
      </Frame>

      <Form url="/create-invoice">
        <Frame className="w-full flex-col gap-[var(--space-lg)]">
          <Frame className="w-full flex-col">
            <Label text="Customer" size="sm" />
            <Input rounded="sm" placeholder="Customer name" outline border type="text" name="customer" variant="default" />
          </Frame>

          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label text="Issue Date" size="sm" />
              <Input rounded="sm" outline border type="date" name="issueDate" variant="default" />
            </Frame>
            <Frame className="w-1/2 flex-col">
              <Label text="Due Date" size="sm" />
              <Input rounded="sm" outline border type="date" name="dueDate" variant="default" />
            </Frame>
          </Frame>

          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label text="Amount" size="sm" />
              <Input rounded="sm" placeholder="0.00" outline border type="number" name="amount" variant="default" />
            </Frame>
            <Frame className="w-1/2 flex-col">
              <Label text="Status" size="sm" />
              <Dropdown
                name="status"
                size="sm"
                width="100%"
                options={[
                  { label: "Draft", value: "draft" },
                  { label: "Pending", value: "pending" },
                  { label: "Paid", value: "paid" },
                  { label: "Overdue", value: "overdue" },
                ]}
              />
            </Frame>
          </Frame>

          <Frame className="w-full flex-col">
            <Label text="Notes" size="sm" />
            <textarea
              className="w-full resize-none rounded-[var(--radius-sm)] border border-[var(--color-outline1)] p-[var(--space-sm)]"
              placeholder="Add invoice notes..."
              name="notes"
              rows={4}
            />
          </Frame>

          <Frame className="justify-end w-full">
            <Button variant="fill" role="submit" size="sm" propagate>
              Create Invoice
            </Button>
          </Frame>
        </Frame>
      </Form>
    </Card>
  )
}
