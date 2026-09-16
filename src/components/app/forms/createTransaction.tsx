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

type CreateTransactionFormProps = {
  businessId: string
}

export default function CreateTransactionForm({ businessId }: CreateTransactionFormProps) {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const { data: businesses = [] } = useQuery({
    queryKey: businessesQueryKey,
    queryFn: getBusinesses,
  })

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

      <Form url={`/api/post`}>
        <Frame className="w-full flex-col gap-[var(--space-lg)]">
          <Frame className="w-full flex-col">
            <Label required text="Description" size="xs" />
            <Input required size="sm" rounded="sm" placeholder="What was this transaction for?" outline border type="text" name="description" variant="default" />
          </Frame>

          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label text="Business" size="xs" />
              <Dropdown
                name="businessId"
                size="sm"
                width="100%"
                defaultValue={businessId}
                options={businesses.map((business) => ({
                  label: business.businessName,
                  value: business.id,
                }))}
              />
            </Frame>
            <Frame className="w-1/2 flex-col">
              <Label text="Customer" size="xs" />
              <Input size="sm" rounded="sm" placeholder="Customer name" outline border type="text" name="customer" variant="default" />
            </Frame>
          </Frame>

          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label text="Transaction Type" size="xs" />
              <Dropdown
                name="type"
                size="sm"
                width="100%"
                options={[
                  { label: "Income", value: "income" },
                  { label: "Expense", value: "expense" },
                ]}
              />
            </Frame>
            <Frame className="w-1/2 flex-col">
              <Label required text="Due Date" size="xs" />
              <input required type="date" name="date"
                className="w-full text-[length:var(--bodySize-sm)] h-[var(--elementSize-sm)] rounded-[var(--radius-sm)] border border-[var(--color-outline1)] bg-[var(--color-background1)] p-[var(--space-md)] outline-none"
              />
            </Frame>
          </Frame>

          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label required text="Amount" size="xs" />
              <Input required size="sm" rounded="sm" placeholder="0.00" outline border type="number" name="amount" variant="default" />
            </Frame>
            <Frame className="w-1/2 flex-col">
              <Label text="Status" size="xs" />
              <Dropdown
                name="status"
                size="sm"
                width="100%"
                options={[
                  { label: "Pending", value: "pending" },
                  { label: "Completed", value: "completed" },
                ]}
              />
            </Frame>
          </Frame>

          <Frame className="w-1/2 flex-col">
            <Label text="Category" size="xs" />
            <Input size="sm" rounded="sm" placeholder="e.g. Sales, Utilities" outline border type="text" name="category" variant="default" />
          </Frame>

          <Frame className="justify-end w-full">
            <Button variant="fill" role="submit" size="md" propagate>Create Transaction</Button>
          </Frame>
        </Frame>
      </Form>
    </Card>
  )
}