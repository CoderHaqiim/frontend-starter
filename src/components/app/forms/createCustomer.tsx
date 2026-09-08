"use client"

import { useBackdropState } from "@/src/store/backdropState"
import Card from "../../ui/composites/card"
import Dropdown from "../../ui/composites/dropdown"
import Form from "../../ui/composites/form"
import Button from "../../ui/primitives/button"
import CloseButton from "../../ui/primitives/closeButton"
import Frame from "../../ui/primitives/frame"
import Heading from "../../ui/primitives/heading"
import Input from "../../ui/primitives/input"
import Label from "../../ui/primitives/label"

export default function CreateCustomerForm() {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()

  const closeCreateCustomerForm = () => {
    setBackdropContent(null)
    setBackdropOpen(false)
  }

  return (
    <Card width="600px" padding="xl" height="max-content">
      <Frame className="mb-[var(--space-xl)] justify-between">
        <Heading size="md" type="h2">
          Add Customer
        </Heading>
        <Frame>
          <CloseButton func={closeCreateCustomerForm} />
        </Frame>
      </Frame>

      <Form url="/add-customer">
        <Frame className="w-full flex-col gap-[var(--space-lg)]">
          <Frame className="w-full flex-col">
            <Label text="Customer Name" size="xs" />
            <Input size="sm" rounded="sm" placeholder="Customer name" outline border type="text" name="name" variant="default" />
          </Frame>

          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label text="Email" size="xs" />
              <Input size="sm" rounded="sm" placeholder="Email address" outline border type="email" name="email" variant="default" />
            </Frame>
            <Frame className="w-1/2 flex-col">
              <Label text="Phone" size="xs" />
              <Input size="sm" rounded="sm" placeholder="Phone number" outline border type="tel" name="phone" variant="default" />
            </Frame>
          </Frame>

          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label text="Type" size="xs" />
              <Dropdown name="type" size="sm" width="100%"
                options={[
                  { label: "Individual", value: "individual"},
                  { label: "Company", value: "company" }
                ]}
              />
            </Frame>
            <Frame className="w-1/2 flex-col">
              <Label text="Company Name" size="xs" />
              <Input size="sm" rounded="sm" outline border type="text" name="city" variant="default" />
            </Frame>
          </Frame>
          
          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label text="State" size="xs" />
              <Dropdown name="state" size="sm" width="100%"
                options={[
                  { label: "Active", value: "active" },
                  { label: "Watchlist", value: "watchlist" },
                  { label: "Inactive", value: "inactive" },
                ]}
              />
            </Frame>
            <Frame className="w-1/2 flex-col">
              <Label text="Receivables" size="xs" />
              <Input size="sm" rounded="sm" placeholder="0.00" outline border type="number" name="receivables" variant="default" />
            </Frame>
          </Frame>

          <Frame className="w-full flex-col">
            <Label text="Address" size="xs" />
            <textarea
              className="w-full resize-none rounded-[var(--radius-sm)] border border-[var(--color-outline1)] p-[var(--space-sm)]"
              placeholder="Customer address"
              name="address"
              rows={2}
            />
          </Frame>

          <Frame className="justify-end w-full">
            <Button variant="fill" role="submit" size="sm" propagate>
              Add Customer
            </Button>
          </Frame>
        </Frame>
      </Form>
    </Card>
  )
}
