"use client"

import type { Invoice } from "@/src/data/invoices"
import useFirstFieldFocus from "@/src/hooks/firstFieldFocus"
import { businessesQueryKey, getBusinesses } from "@/src/services/businessService"
import {
  createInvoice as createBusinessInvoice,
  invoiceKpisQueryKey,
  invoicesQueryKey,
} from "@/src/services/invoiceService"
import { useBackdropState } from "@/src/store/backdropState"
import { InvoiceDraft, useInvoiceDraft } from "@/src/store/invoiceDraftState"
import { useInvoiceFormState } from "@/src/store/invoiceFormState"
import { useSelectedBusiness } from "@/src/store/selectedBusinessState"
import { sumLineItems } from "@/src/utils/amount"
import { getBusinessIdFromPathname } from "@/src/utils/businessIdFromPathname"
import { getCurrencyOptions } from "@/src/utils/currencySymbol"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef } from "react"

import Card from "../../base/ui/composites/card"
import Dropdown from "../../base/ui/composites/dropdown"
import Button from "../../base/ui/primitives/button"
import CloseButton from "../../base/ui/primitives/closeButton"
import Frame from "../../base/ui/primitives/frame"
import Heading from "../../base/ui/primitives/heading"
import Input from "../../base/ui/primitives/input"
import Label from "../../base/ui/primitives/label"

import TemplateList, { invoiceTemplateComponents, type InvoiceTemplateId } from "../templateList"
import CreateInvoiceItemForm from "./createInvoiceItem"

export default function CreateInvoiceForm() {
  const router = useRouter()
  const pathname = usePathname()
  const isOpen = useInvoiceFormState((state) => state.isOpen)
  const closeInvoice = useInvoiceFormState((state) => state.closeInvoice)
  const invoiceDraft = useInvoiceDraft()
  const { setInvoiceField, resetDraft } = invoiceDraft
  const { selectedBusiness, setSelectedBusiness } = useSelectedBusiness()
  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const queryClient = useQueryClient()
  const selectedTemplate = invoiceDraft.template as InvoiceTemplateId
  // The first field of the form takes the focus as the form opens, so a new invoice
  // can be typed into straight away.
  const formRef = useRef<HTMLFormElement | null>(null)
  useFirstFieldFocus(formRef, isOpen)

  // A form opened from a business page always targets that business and the
  // business field is read only there. On the home dashboard there is no
  // business context, so the field stays changeable.
  const contextBusinessId = getBusinessIdFromPathname(pathname)
  const isBusinessContext = Boolean(contextBusinessId)

  const setSelectedTemplate = (template: InvoiceTemplateId) => {
    setInvoiceField("template", template)
  }

  const { data: businesses = [] } = useQuery({
    queryKey: businessesQueryKey,
    queryFn: getBusinesses,
  })

  // Every new invoice starts from a blank draft. The draft is left untouched
  // while a created invoice is being viewed on the view-invoice page.
  useEffect(() => {
    if (!isOpen) return

    resetDraft()
  }, [isOpen, resetDraft])

  useEffect(() => {
    if (businesses.length === 0) return

    // A business page locks the form to the business whose page is open.
    if (isBusinessContext && contextBusinessId) {
      const contextBusiness = businesses.find(
        (business) => business.id === contextBusinessId,
      )
      if (contextBusiness && contextBusiness.id !== selectedBusiness.id) {
        setSelectedBusiness(contextBusiness)
      }
      return
    }

    const isSelectedBusinessAvailable = businesses.some(
      (business) => business.id === selectedBusiness.id,
    )

    if (!isSelectedBusinessAvailable) {
      setSelectedBusiness(businesses[0])
    }
  }, [businesses, selectedBusiness.id, setSelectedBusiness, isBusinessContext, contextBusinessId])

  if (!isOpen) return null

  const closeCreateInvoiceForm = () => {
    resetDraft()
    closeInvoice()
  }

  const openItemForm = () => {
    setBackdropContent(
      <CreateInvoiceItemForm
        onClose={() => {
          setBackdropOpen(false)
          setBackdropContent(null)
        }}
      />,
    )

    setBackdropOpen(true)
  }

  const handleBusinessChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    // While a business page is open the field is read only, so the business
    // can only be changed from the home dashboard.
    if (isBusinessContext) return

    const business = businesses.find(
      (item) => item.id === event.target.value,
    )

    if (business) {
      setSelectedBusiness(business)
    }
  }

  const handleCurrencyChange = ( event: React.ChangeEvent<HTMLSelectElement>) => {
    setInvoiceField("currency", event.target.value)
  }

  const handleInvoiceFieldChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    setInvoiceField(
      event.target.name as keyof InvoiceDraft,
      event.target.value,
    )
  }


  const createInvoice = async ( event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (invoiceDraft.items.length === 0) {
      console.warn("Invoice requires at least one item before submission.")
      return
    }

    const itemsSubtotal = sumLineItems(invoiceDraft.items)
    const enteredAmount = Number(invoiceDraft.amount) || 0
    const subtotal = invoiceDraft.items.length > 0 ? itemsSubtotal : enteredAmount
    const discountRate = Number(invoiceDraft.discount) || 0
    const vatRate = Number(invoiceDraft.vat) || 0
    const discountAmount = subtotal * (discountRate / 100)
    const vatAmount = (subtotal - discountAmount) * (vatRate / 100)
    const total = subtotal - discountAmount + vatAmount

    // The invoice belongs to the business whose page the form was opened from,
    // falling back to the selected business on the home dashboard.
    const targetBusinessId = contextBusinessId ?? selectedBusiness.id

    const payload = {
      template: selectedTemplate,
      businessId: targetBusinessId,

      customer: {
        name: invoiceDraft.customer,
        email: invoiceDraft.customerEmail,
        address: invoiceDraft.customerAddress,
      },

      currency: invoiceDraft.currency,
      items: invoiceDraft.items,
      amount: invoiceDraft.amount,
      subtotal,
      discount: invoiceDraft.discount,
      vat: invoiceDraft.vat,
      total,
      issueDate: invoiceDraft.issueDate,
      dueDate: invoiceDraft.dueDate,
    }

    try {
      // The invoice is stored against its business, so the business invoice
      // route is what the invoice page reads from.
      const { data: createdInvoice } = await createBusinessInvoice(
        targetBusinessId,
        payload,
      )

      if (!createdInvoice?.id) return

      setInvoiceField("invoiceNo", createdInvoice.id)

      // The created invoice is put straight into the list, and the list and the
      // KPI cards both refetch so the invoices page is up to date.
      queryClient.setQueryData<Invoice[]>(
        invoicesQueryKey(targetBusinessId),
        (currentInvoices = []) => [
          createdInvoice,
          ...currentInvoices.filter((invoice) => invoice.id !== createdInvoice.id),
        ],
      )
      queryClient.invalidateQueries({ queryKey: invoicesQueryKey(targetBusinessId) })
      queryClient.invalidateQueries({ queryKey: invoiceKpisQueryKey(targetBusinessId) })

      // The draft is intentionally left intact: the view-invoice page renders
      // the invoice that was just created.
      closeInvoice()

      router.push("/dashboard/view-invoice")
    } catch (error) {
      console.error(
        "Failed to submit the create invoice payload:",
        error,
      )
    }
  }

  const ActiveTemplate = invoiceTemplateComponents[selectedTemplate]

  return (
    <Card
      width="100%"
      padding="md"
      height="100vh"
      className="w-full"
      specificStyles={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        borderRadius: "0px",
      }}
    >
      <Frame specificStyles={{
          position: "absolute",
          top:"15px",
          right:"15px"
        }}>
          <CloseButton size="sm" func={closeCreateInvoiceForm} />
      </Frame>

      {/* HEADER */}

      <Frame
        className="
          p-[var(--space-md)]
          border-b
          border-b-[var(--color-outline1)]
          items-center
          justify-between
        "
      >
        <Heading size="lg" type="h2">
          Create Invoice
        </Heading>
      </Frame>

      {/* BODY */}

      <Frame className="w-full flex flex-1 min-h-0">
        <Frame
          className="
            w-[max-content]
            p-[var(--space-md)]
          "
        >
          <TemplateList
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
          />
        </Frame>

        {/* INVOICE PREVIEW */}

        <Frame
          scroll="hidden"
          direction="column"
          className="flex-col flex-1 h-full min-h-0 min-w-0 overflow-x-hidden bg-[var(--color-background3)]"
        >
          <Frame
            className="
              relative
              h-max
              w-full
              justify-center
              p-[var(--space-lg)]
            "
          >
            {/* The scale is screen only, so the invoice keeps its A4 size. */}

            <div className="origin-top scale-[0.89]">
              <ActiveTemplate />
            </div>
          </Frame>
        </Frame>

        <Frame
          className="
            w-[300px]
            h-full
            p-[var(--space-lg)]
          "
        >
          <form
            ref={formRef}
            onSubmit={createInvoice}
            className="
              gap-[var(--space-lg)]
              w-full
              relative
              h-max
              flex
              flex-col
              items-center
              justify-center
            "
            style={{
              minHeight: "100%",
              justifyContent: "flex-start",
            }}
          >
            {/* CUSTOMER */}

            <Frame className="w-full min-w-0 flex-col">
              <Label
                required
                text="Customer"
                size="xxs"
              />

              <Input
                required
                size="xxs"
                rounded="sm"
                placeholder="Customer name"
                outline
                border
                type="text"
                name="customer"
                variant="default"
                value={invoiceDraft.customer}
                formFunc={handleInvoiceFieldChange}
              />
            </Frame>

            {/* CUSTOMER EMAIL */}

            <Frame className="w-full min-w-0 flex-col">
              <Label
                required
                text="Customer Email"
                size="xxs"
              />

              <Input
                required
                size="xxs"
                rounded="sm"
                placeholder="customer@email.com"
                outline
                border
                type="email"
                name="customerEmail"
                variant="default"
                value={invoiceDraft.customerEmail}
                formFunc={handleInvoiceFieldChange}
              />
            </Frame>

            {/* CUSTOMER ADDRESS */}

            <Frame className="w-full flex-col">
              <Label
                text="Customer's Address"
                size="xxs"
              />

              <Input
                size="xxs"
                rounded="sm"
                placeholder="customer's address"
                outline
                border
                type="text"
                name="customerAddress"
                variant="default"
                value={invoiceDraft.customerAddress}
                formFunc={handleInvoiceFieldChange}
              />
            </Frame>

            {/* BUSINESS + CURRENCY */}

            <Frame className="w-full gap-[var(--space-xs)]">
              <Frame className="flex-1 min-w-0 flex-col">
                <Label
                  text="Business"
                  size="xxs"
                />
                <Dropdown
                  name="businessId"
                  size="xxs"
                  width="100%"
                  disabled={isBusinessContext}
                  value={
                    isBusinessContext
                      ? contextBusinessId
                      : selectedBusiness.id || undefined
                  }
                  formFunc={handleBusinessChange}
                  options={businesses.map((business) => ({
                    label: business.businessName,
                    value: business.id,
                  }))}
                />
              </Frame>

              <Frame className="flex-1 min-w-0 flex-col">
                <Label
                  required
                  text="Currency"
                  size="xxs"
                />

                <Dropdown
                  name="currency"
                  size="xxs"
                  width="100%"
                  value={
                    invoiceDraft.currency
                  }
                  formFunc={
                    handleCurrencyChange
                  }
                  options={getCurrencyOptions()}
                />
              </Frame>
            </Frame>

            {/* DATES */}

            <Frame
              className="
                w-full
                relative
                flex-col
                gap-[var(--space-lg)]
              "
            >
              <Frame className="gap-[var(--space-sm)]">
                <Frame className="flex-1 min-w-0 flex-col">
                  <Label
                    required
                    text="Issue Date"
                    size="xxs"
                  />

                  <input
                    required
                    type="date"
                    name="issueDate"
                    value={
                      invoiceDraft.issueDate
                    }
                    onChange={
                      handleInvoiceFieldChange
                    }
                    className="
                      w-full
                      text-[length:var(--bodySize-xxs)]
                      h-[var(--elementSize-xxs)]
                      rounded-[var(--radius-sm)]
                      border
                      border-[var(--color-outline1)]
                      bg-[var(--color-background1)]
                      p-[var(--space-md)]
                      outline-none
                    "
                  />
                </Frame>

                <Frame className="flex-1 min-w-0 flex-col">
                  <Label
                    required
                    text="Due Date"
                    size="xxs"
                  />

                  <input
                    required
                    type="date"
                    name="dueDate"
                    value={
                      invoiceDraft.dueDate
                    }
                    onChange={
                      handleInvoiceFieldChange
                    }
                    className="
                      w-full
                      text-[length:var(--bodySize-xxs)]
                      h-[var(--elementSize-xxs)]
                      rounded-[var(--radius-sm)]
                      border
                      border-[var(--color-outline1)]
                      bg-[var(--color-background1)]
                      p-[var(--space-md)]
                      outline-none
                    "
                  />
                </Frame>
              </Frame>
            </Frame>

            {/* VAT + DISCOUNT */}

            <Frame className="w-full gap-[var(--space-sm)]">
              <Frame className="flex-1 min-w-0 flex-col">
                <Label
                  required
                  text="VAT"
                  size="xxs"
                />

                <input
                  required
                  type="number"
                  name="vat"
                  value={invoiceDraft.vat}
                  onChange={
                    handleInvoiceFieldChange
                  }
                  className="
                    w-full
                    text-[length:var(--bodySize-xxs)]
                    h-[var(--elementSize-xxs)]
                    rounded-[var(--radius-sm)]
                    border
                    border-[var(--color-outline1)]
                    bg-[var(--color-background1)]
                    p-[var(--space-md)]
                    outline-none
                  "
                />
              </Frame>

              <Frame className="flex-1 min-w-0 flex-col">
                <Label
                  required
                  text="Discount"
                  size="xxs"
                />

                <input
                  required
                  type="number"
                  name="discount"
                  value={
                    invoiceDraft.discount
                  }
                  onChange={
                    handleInvoiceFieldChange
                  }
                  className="
                    w-full
                    text-[length:var(--bodySize-xxs)]
                    h-[var(--elementSize-xxs)]
                    rounded-[var(--radius-sm)]
                    border
                    border-[var(--color-outline1)]
                    bg-[var(--color-background1)]
                    p-[var(--space-md)]
                    outline-none
                  "
                />
              </Frame>
            </Frame>

            {/* ACTIONS */}

            <Frame
              className="
                justify-end
                gap-[var(--space-sm)]
                w-full
              "
              specificStyles={{
                position: "absolute",
                bottom: 0,
                left: 0,
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

              <Button
                variant="fill"
                role="submit"
                size="sm"
                propagate
                disabled={
                  invoiceDraft.items.length === 0
                }
                specificStyles={{
                  width: "50%",
                }}
              >
                Create Invoice
              </Button>
            </Frame>
          </form>
        </Frame>
      </Frame>
    </Card>
  )
}