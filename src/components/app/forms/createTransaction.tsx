"use client"

import Form from "../../ui/composites/form"
import Label from "../../ui/primitives/label"
import Card from "../../ui/composites/card"
import Input from "../../ui/primitives/input"
import Frame from "../../ui/primitives/frame"
import Heading from "../../ui/primitives/heading"
import Button from "../../ui/primitives/button"
import CloseButton from "../../ui/primitives/closeButton"
import { useBackdropState } from "@/src/store/backdropState"

type CreateTransactionFormProps = {
  businessId: string
}

export default function CreateTransactionForm({ businessId }: CreateTransactionFormProps) {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()

  const closeForm = () => {
    setBackdropContent(null)
    setBackdropOpen(false)
  }

  return (
    <Card width="500px" padding="xl" height="max-content">
      <Frame className="mb-[var(--space-xl)] justify-between">
        <Heading size="md" type="h2">New Transaction</Heading>
        <Frame>
            <CloseButton func={closeForm} />
        </Frame>
      </Frame>

      <Form url={`/api/businesses/${businessId}/transactions`}>
        <input type="hidden" name="businessId" value={businessId} />
        <Frame className="w-full flex-col gap-[var(--space-lg)]">
          <Frame className="w-full flex-col">
            <Label text="Description" size="xs" />
            <Input size="sm" rounded="sm" placeholder="What was this transaction for?" outline border type="text" name="description" variant="default" />
          </Frame>

          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label text="Amount" size="xs" />
              <Input size="sm" rounded="sm" placeholder="0.00" outline border type="number" name="amount" variant="default" />
            </Frame>
            <Frame className="w-1/2 flex-col">
              <Label text="Date" size="xs" />
              <Input size="sm" rounded="sm" outline border type="date" name="date" variant="default" />
            </Frame>
          </Frame>

          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label text="Category" size="xs" />
              <Input size="sm" rounded="sm" placeholder="e.g. Sales, Utilities" outline border type="text" name="category" variant="default" />
            </Frame>
            <Frame className="w-1/2 flex-col">
              <Label text="Transaction Type" size="xs" />
              <Frame className="gap-[var(--space-xs)]">
                <label className="flex flex-1 cursor-pointer items-center gap-1 rounded-[var(--radius-sm)] border border-[var(--color-outline1)] px-2 py-2 text-[length:var(--bodySize-xs)]">
                  <input type="radio" name="type" value="income" defaultChecked />
                  Income
                </label>
                <label className="flex flex-1 cursor-pointer items-center gap-1 rounded-[var(--radius-sm)] border border-[var(--color-outline1)] px-2 py-2 text-[length:var(--bodySize-xs)]">
                  <input type="radio" name="type" value="expense" />
                  Expense
                </label>
              </Frame>
            </Frame>
          </Frame>

          <Frame className="justify-end w-full">
            <Button variant="fill" role="submit" size="sm" propagate>Create Transaction</Button>
          </Frame>
        </Frame>
      </Form>
    </Card>
  )
}