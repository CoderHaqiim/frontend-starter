"use client"

import { businessesQueryKey, getBusinesses } from "@/src/services/businessService"
import { useBackdropState } from "@/src/store/backdropState"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import Card from "../../base/ui/composites/card"
import Dropdown from "../../base/ui/composites/dropdown"
import Form from "../../base/ui/composites/form"
import Button from "../../base/ui/primitives/button"
import CloseButton from "../../base/ui/primitives/closeButton"
import Frame from "../../base/ui/primitives/frame"
import Heading from "../../base/ui/primitives/heading"
import Input from "../../base/ui/primitives/input"
import Label from "../../base/ui/primitives/label"
import SmallBusinessCardList from "../smallBusinessCardList"
import Invoice1 from "../templates/invoice/invoice1"
import Invoice2 from "../templates/invoice/invoice2"

const templates = {
  "invoice-1": Invoice1,
  "invoice-2": Invoice2,
} as const

type TemplateId = keyof typeof templates

export default function CreateInvoiceForm() {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("invoice-1")

  const {data:businesses = []} = useQuery({
    queryKey: businessesQueryKey,
    queryFn: getBusinesses
  })

  const closeCreateInvoiceForm = () => {
    setBackdropContent(null)
    setBackdropOpen(false)
  }

  const ActiveTemplate = templates[selectedTemplate]

  return (
    <Card width="100%" padding="md" height="100%" specificStyles={{ borderRadius:"0px"}}>
      <Frame className="p-[var(--space-md)] border-b border-b-[var(--color-outline1)] items-center justify-between">
        <Heading size="lg" type="h2">
          Create Invoice
        </Heading>
        <Frame>
          <CloseButton func={closeCreateInvoiceForm} />
        </Frame>
      </Frame>

      <Frame className="w-full flex flex-1">
        <Frame className="w-[max-content] p-[var(--space-md)]">
          <SmallBusinessCardList selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} />
        </Frame>

        <Frame
          direction="column"
          className="flex-1 h-[100vh] min-h-0 overflow-auto bg-[var(--color-background3)]"
        >
          <div className="flex h-full w-full justify-center p-[var(--space-lg)]">
            <div className="origin-center scale-[0.89]">
              <ActiveTemplate />
            </div>
          </div>
        </Frame>


        <Frame className="w-[300px] h-full p-[var(--space-lg)]">
          <Form url="/create-invoice">
            <Frame className="w-full gap-[var(--space-sm)]">
              <Frame className="flex-1 min-w-0 flex-col">
                <Label required text="Customer" size="xxs" />
                <Input required size="xxs" rounded="sm" placeholder="Customer name" outline border type="text" name="customer" variant="default" />
              </Frame>
              <Frame className="flex-1 min-w-0 flex-col">
                <Label required text="Customer Email" size="xxs" />
                <Input required size="xxs" rounded="sm" placeholder="customer@email.com" outline border type="email" name="customerEmail" variant="default" />
              </Frame>
            </Frame>

            <Frame className="w-full flex-col">
              <Label text="Customer's Address" size="xxs" />
              <Input required size="xxs" rounded="sm" placeholder="customer's address" outline border type="text" name="customerAddress" variant="default" />
            </Frame>
            
            <Frame className="w-full gap-[var(--space-xs)]">
              <Frame className="flex-1 min-w-0 flex-col">
                <Label text="Business" size="xxs" />
                <Dropdown name="businessId" size="xxs" width="100%"
                  options={businesses.map((business) => ({
                    label: business.businessName,
                    value: business.id,
                  }))}
                />
              </Frame>
              <Frame className="flex-1 min-w-0 flex-col">
                <Label required text="Amount" size="xxs" />
                <Input required size="xxs" rounded="sm" placeholder="0.00" outline border type="number" name="amount" variant="default" />
              </Frame>
            </Frame>

            <Frame className="w-full relative flex-col gap-[var(--space-lg)]">
              <Frame className="gap-[var(--space-md)]">
                <Frame className="flex-1 min-w-0 flex-col">
                  <Label required text="Issue Date" size="xxs" />
                  <input required type="date" name="dueDate"
                    className="w-full text-[length:var(--bodySize-xxs)] h-[var(--elementSize-xxs)] rounded-[var(--radius-sm)] border border-[var(--color-outline1)] bg-[var(--color-background1)] p-[var(--space-md)] outline-none"
                  />
                </Frame>
                <Frame className="flex-1 min-w-0 flex-col">
                  <Label required text="Due Date" size="xxs" />
                  <input required type="date" name="dueDate"
                    className="w-full text-[length:var(--bodySize-xxs)] h-[var(--elementSize-xxs)] rounded-[var(--radius-sm)] border border-[var(--color-outline1)] bg-[var(--color-background1)] p-[var(--space-md)] outline-none"
                  />
                </Frame>
              </Frame>
              <Frame className="w-full flex-col">
                <Label text="Notes" size="xxs" />
                <textarea
                  className="w-full resize-none rounded-[var(--radius-sm)] border border-[var(--color-outline1)] text-[length:var(--bodySize-xxs)] p-[var(--space-sm)]"
                  placeholder="Add invoice notes..."
                  name="notes"
                  rows={2}
                />
              </Frame>
            </Frame>

            <Frame className="justify-end  gap-[var(--space-sm)] w-full" specificStyles={{
                position: "absolute",
                bottom:"0px",
                left:"0"
              }}>
                <Button variant="outline" size="sm" specificStyles={{
                  width:"50%"
                }}>Add items</Button>
                <Button variant="fill" role="submit" size="sm" propagate specificStyles={{
                  width: "50%"
                }}>
                  Create Invoice
                </Button>
            </Frame>
          </Form>
        </Frame>
      </Frame>
    </Card>
  )
}
