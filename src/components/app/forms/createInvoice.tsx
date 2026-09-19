"use client"

import { businessesQueryKey, getBusinesses } from "@/src/services/businessService"
import { useBackdropState } from "@/src/store/backdropState"
import { InvoiceDraft, useInvoiceDraft } from "@/src/store/invoiceDraftState"
import { useInvoiceFormState } from "@/src/store/invoiceFormState"
import { useSelectedBusiness } from "@/src/store/selectedBusinessState"
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
import TemplateList, { invoiceTemplates, type InvoiceTemplateId } from "../templateList"
import CreateInvoiceItemForm from "./createInvoiceItem"

const templates = Object.fromEntries(
  invoiceTemplates.map(({ id, component }) => [id, component]),
) as Record<InvoiceTemplateId, (typeof invoiceTemplates)[number]["component"]>

export default function CreateInvoiceForm() {
  const isOpen = useInvoiceFormState((state) => state.isOpen)
  const closeInvoice = useInvoiceFormState((state) => state.closeInvoice)
  const invoiceDraft = useInvoiceDraft()
  const { setInvoiceField } = invoiceDraft
  const { selectedBusiness, setSelectedBusiness } = useSelectedBusiness()
  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const [selectedTemplate, setSelectedTemplate] = useState<InvoiceTemplateId>("invoice-1")

  const {data:businesses = []} = useQuery({
    queryKey: businessesQueryKey,
    queryFn: getBusinesses
  })

  if (!isOpen) return null

  const closeCreateInvoiceForm = () => {
    closeInvoice()
  }

  const openItemForm = () => {
    setBackdropContent(<CreateInvoiceItemForm onClose={() => {
      setBackdropOpen(false)
      setBackdropContent(null)
    }} />)
    setBackdropOpen(true)
  }

  const handleBusinessChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const business = businesses.find((item) => item.id === event.target.value)

    if (business) {
      setSelectedBusiness(business)
    }
  }

  const handleInvoiceFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInvoiceField(event.target.name as keyof InvoiceDraft, event.target.value)
  }

  const ActiveTemplate = templates[selectedTemplate]

  return (
    <Card width="100%" padding="md" height="100vh" className="w-full" specificStyles={{
       position: "fixed",
       top:0,
       zIndex: 1000,
       left:0,
       borderRadius:"0px"
      }}>
      <Frame className="p-[var(--space-md)] border-b border-b-[var(--color-outline1)] items-center justify-between">
        <Heading size="lg" type="h2">
          Create Invoice
        </Heading>
        <Frame>
          <CloseButton func={closeCreateInvoiceForm} />
        </Frame>
      </Frame>

      <Frame className="w-full flex flex-1 min-h-0">
        <Frame className="w-[max-content] p-[var(--space-md)]">
          <TemplateList selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} />
        </Frame>

        <Frame
          scroll="hidden"
          direction="column"
          className="flex-col flex-1 h-full min-h-0 min-w-0 overflow-x-hidden bg-[var(--color-background3)]"
        >
          <Frame className="h-max w-full justify-center p-[var(--space-lg)]">
            <div className="origin-top scale-[0.89]">
              <ActiveTemplate/>
            </div>
          </Frame>
        </Frame>


        <Frame className="w-[300px] h-full p-[var(--space-lg)]">
          <Form url="/create-invoice" specificStyles={{
            minHeight: "100%",
            justifyContent: "flex-start"
          }}>
      
            <Frame className="w-full min-w-0 flex-col">
              <Label required text="Customer" size="xxs" />
              <Input required size="xxs" rounded="sm" placeholder="Customer name" outline border type="text" name="customer" variant="default" value={invoiceDraft.customer} formFunc={handleInvoiceFieldChange} />
            </Frame>

            <Frame className="w-full min-w-0 flex-col">
              <Label required text="Customer Email" size="xxs" />
              <Input required size="xxs" rounded="sm" placeholder="customer@email.com" outline border type="email" name="customerEmail" variant="default" value={invoiceDraft.customerEmail} formFunc={handleInvoiceFieldChange} />
            </Frame>

            <Frame className="w-full flex-col">
              <Label text="Customer's Address" size="xxs" />
              <Input required size="xxs" rounded="sm" placeholder="customer's address" outline border type="text" name="customerAddress" variant="default" value={invoiceDraft.customerAddress} formFunc={handleInvoiceFieldChange} />
            </Frame>
            
            <Frame className="w-full gap-[var(--space-xs)]">
              <Frame className="flex-1 min-w-0 flex-col">
                <Label text="Business" size="xxs" />
                <Dropdown name="businessId" size="xxs" width="100%"
                  value={selectedBusiness.id || undefined}
                  formFunc={handleBusinessChange}
                  options={businesses.map((business) => ({
                    label: business.businessName,
                    value: business.id,
                  }))}
                />
              </Frame>
              <Frame className="flex-1 min-w-0 flex-col">
                <Label required text="Amount" size="xxs" />
                <Input required size="xxs" rounded="sm" placeholder="0.00" outline border type="number" name="amount" variant="default" value={invoiceDraft.amount} formFunc={handleInvoiceFieldChange} />
              </Frame>
            </Frame>

            <Frame className="w-full relative flex-col gap-[var(--space-lg)]">
              <Frame className="gap-[var(--space-sm)]">
                <Frame className="flex-1 min-w-0 flex-col">
                  <Label required text="Issue Date" size="xxs" />
                  <input required type="date" name="issueDate" value={invoiceDraft.issueDate} onChange={handleInvoiceFieldChange}
                    className="w-full text-[length:var(--bodySize-xxs)] h-[var(--elementSize-xxs)] rounded-[var(--radius-sm)] border border-[var(--color-outline1)] bg-[var(--color-background1)] p-[var(--space-md)] outline-none"
                  />
                </Frame>
                <Frame className="flex-1 min-w-0 flex-col">
                  <Label required text="Due Date" size="xxs" />
                  <input required type="date" name="dueDate" value={invoiceDraft.dueDate} onChange={handleInvoiceFieldChange}
                    className="w-full text-[length:var(--bodySize-xxs)] h-[var(--elementSize-xxs)] rounded-[var(--radius-sm)] border border-[var(--color-outline1)] bg-[var(--color-background1)] p-[var(--space-md)] outline-none"
                  />
                </Frame>
              </Frame>
              {/* <Frame className="w-full flex-col">
                <Label text="Notes" size="xxs" />
                <textarea
                  className="w-full resize-none rounded-[var(--radius-sm)] border border-[var(--color-outline1)] text-[length:var(--bodySize-xxs)] p-[var(--space-sm)]"
                  placeholder="Add invoice notes..."
                  name="notes"
                  rows={2}
                />
              </Frame> */}
            </Frame>

            <Frame className="w-full gap-[var(--space-sm)]" >
              <Frame className="flex-1 min-w-0 flex-col">
                <Label required text="VAT" size="xxs" />
                <input required type="number" name="vat" value={invoiceDraft.vat} onChange={handleInvoiceFieldChange}
                  className="w-full text-[length:var(--bodySize-xxs)] h-[var(--elementSize-xxs)] rounded-[var(--radius-sm)] border border-[var(--color-outline1)] bg-[var(--color-background1)] p-[var(--space-md)] outline-none"
                />
              </Frame>
              <Frame className="flex-1 min-w-0 flex-col">
                <Label required text="Discount" size="xxs" />
                <input required type="number" name="discount" value={invoiceDraft.discount} onChange={handleInvoiceFieldChange}
                  className="w-full text-[length:var(--bodySize-xxs)] h-[var(--elementSize-xxs)] rounded-[var(--radius-sm)] border border-[var(--color-outline1)] bg-[var(--color-background1)] p-[var(--space-md)] outline-none"
                />
              </Frame>
            </Frame>



            <Frame
              className="justify-end gap-[var(--space-sm)] w-full"
              specificStyles={{
                position: "absolute",
                bottom: 0,
                left: 0
              }}
            >
                <Button
                  variant="outline"
                  size="sm"
                  width="50%"
                  func={openItemForm}
                  className="h-[var(--elementSize-sm)]"
                >
                  Add items
                </Button>
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
