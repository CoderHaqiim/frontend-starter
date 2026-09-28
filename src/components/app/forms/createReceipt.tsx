"use client"

import type { Receipt } from "@/src/data/receipts"
import { businessesQueryKey, getBusinesses } from "@/src/services/businessService"
import {
  createReceipt as createBusinessReceipt,
  receiptKpisQueryKey,
  receiptsQueryKey,
} from "@/src/services/receiptService"
import { useBackdropState } from "@/src/store/backdropState"
import {
  getReceiptItemsSubtotal,
  ReceiptDraft,
  useReceiptDraft,
} from "@/src/store/receiptDraftState"
import { useReceiptFormState } from "@/src/store/receiptFormState"
import { useSelectedBusiness } from "@/src/store/selectedBusinessState"
import { getBusinessIdFromPathname } from "@/src/utils/businessIdFromPathname"
import { getCurrencyOptions } from "@/src/utils/currencySymbol"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

import Card from "../../base/ui/composites/card"
import Dropdown from "../../base/ui/composites/dropdown"
import Button from "../../base/ui/primitives/button"
import CloseButton from "../../base/ui/primitives/closeButton"
import Frame from "../../base/ui/primitives/frame"
import Heading from "../../base/ui/primitives/heading"
import Input from "../../base/ui/primitives/input"
import Label from "../../base/ui/primitives/label"

import ReceiptTemplateList, {
  receiptTemplateComponents,
  type ReceiptTemplateId,
} from "../receiptTemplateList"
import CreateReceiptItemForm from "./createReceiptItem"

export default function CreateReceiptForm() {
  const router = useRouter()
  const pathname = usePathname()
  const isOpen = useReceiptFormState((state) => state.isOpen)
  const closeReceipt = useReceiptFormState((state) => state.closeReceipt)
  const receiptDraft = useReceiptDraft()
  const { setReceiptField, resetDraft } = receiptDraft
  const { selectedBusiness, setSelectedBusiness } = useSelectedBusiness()
  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const queryClient = useQueryClient()
  const selectedTemplate = receiptDraft.template as ReceiptTemplateId
  // A form opened from a business page always targets that business and the
  // business field is read only there. On the home dashboard there is no
  // business context, so the field stays changeable.
  const contextBusinessId = getBusinessIdFromPathname(pathname)
  const isBusinessContext = Boolean(contextBusinessId)

  const setSelectedTemplate = (template: ReceiptTemplateId) => {
    setReceiptField("template", template)
  }

  const { data: businesses = [] } = useQuery({
    queryKey: businessesQueryKey,
    queryFn: getBusinesses,
  })

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
    if (!isSelectedBusinessAvailable) setSelectedBusiness(businesses[0])
  }, [businesses, selectedBusiness.id, setSelectedBusiness, isBusinessContext, contextBusinessId])

  if (!isOpen) return null

  const closeCreateReceiptForm = () => {
    resetDraft()
    closeReceipt()
  }

  const openItemForm = () => {
    setBackdropContent(
      <CreateReceiptItemForm
        onClose={() => {
          setBackdropOpen(false)
          setBackdropContent(null)
        }}
      />,
    )
    setBackdropOpen(true)
  }

  const handleBusinessChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // While a business page is open the field is read only, so the business
    // can only be changed from the home dashboard.
    if (isBusinessContext) return
    const business = businesses.find((item) => item.id === event.target.value)
    if (business) setSelectedBusiness(business)
  }

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setReceiptField("currency", event.target.value)
  }

  const handleReceiptFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReceiptField(event.target.name as keyof ReceiptDraft, event.target.value)
  }

  const createReceipt = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (receiptDraft.items.length === 0) {
      console.warn("Receipt requires at least one item before submission.")
      return
    }

    // The amount is derived from the item lines, so it is also the subtotal.
    const itemsSubtotal = getReceiptItemsSubtotal(receiptDraft.items)

    // The receipt belongs to the business whose page the form was opened from,
    // falling back to the selected business on the home dashboard.
    const targetBusinessId = contextBusinessId ?? selectedBusiness.id

    const payload = {
      template: selectedTemplate,
      businessId: targetBusinessId,
      customer: {
        name: receiptDraft.customer,
        email: receiptDraft.customerEmail,
      },
      currency: receiptDraft.currency,
      items: receiptDraft.items,
      amount: receiptDraft.amount,
      subtotal: itemsSubtotal,
      paymentDate: receiptDraft.paymentDate,
    }

    try {
      // The receipt is stored against its business, so the business receipt
      // route is what the receipt page reads from.
      const { data: createdReceipt } = await createBusinessReceipt(
        targetBusinessId,
        payload,
      )

      if (!createdReceipt?.id) return
      setReceiptField("receiptNo", createdReceipt.id)

      // The created receipt is put straight into the list, and the list and the
      // KPI cards both refetch so the receipts page is up to date.
      queryClient.setQueryData<Receipt[]>(
        receiptsQueryKey(targetBusinessId),
        (currentReceipts = []) => [
          createdReceipt,
          ...currentReceipts.filter((receipt) => receipt.id !== createdReceipt.id),
        ],
      )
      queryClient.invalidateQueries({ queryKey: receiptsQueryKey(targetBusinessId) })
      queryClient.invalidateQueries({ queryKey: receiptKpisQueryKey(targetBusinessId) })

      // The draft is intentionally left intact: the view-receipt page renders
      // the receipt that was just created.
      closeReceipt()

      router.push("/dashboard/view-receipt")
    } catch (error) {
      console.error("Failed to submit the create receipt payload:", error)
    }
  }

  const ActiveTemplate = receiptTemplateComponents[selectedTemplate]

  return (
    <Card
      width="100%"
      padding="md"
      height="100vh"
      className="w-full"
      specificStyles={{ position: "fixed", top: 0, left: 0, zIndex: 1000, borderRadius: "0px" }}
    >
      <Frame specificStyles={{
          position: "absolute",
          top:"15px",
          right:"15px"
        }}>
          <CloseButton size="sm" func={closeCreateReceiptForm} />
      </Frame>

      {/* HEADER */}
      <Frame className="p-[var(--space-md)] border-b border-b-[var(--color-outline1)] items-center justify-between">
        <Heading size="lg" type="h2">Create Receipt</Heading>
      </Frame>

      {/* BODY */}
      <Frame className="w-full flex flex-1 min-h-0">
        <Frame className="w-[max-content] p-[var(--space-md)]">
          <ReceiptTemplateList
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
          />
        </Frame>

        {/* RECEIPT PREVIEW */}
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
            {/* The scale is screen only, so the receipt keeps its A5 size. */}

            <div className="origin-top scale-[0.89]">
              <ActiveTemplate />
            </div>
          </Frame>
        </Frame>

        {/* FORM */}
        <Frame
          className="
            w-[300px]
            h-full
            p-[var(--space-lg)]
          "
        >
          <form
            onSubmit={createReceipt}
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
              <Label required text="Customer" size="xxs" />
              <Input
                required size="xxs" rounded="sm" placeholder="Customer name"
                outline border type="text" name="customer" variant="default"
                value={receiptDraft.customer} formFunc={handleReceiptFieldChange}
              />
            </Frame>

            {/* CUSTOMER EMAIL */}

            <Frame className="w-full min-w-0 flex-col">
              <Label required text="Customer Email" size="xxs" />
              <Input
                required size="xxs" rounded="sm" placeholder="customer@email.com"
                outline border type="email" name="customerEmail" variant="default"
                value={receiptDraft.customerEmail} formFunc={handleReceiptFieldChange}
              />
            </Frame>

            {/* BUSINESS + CURRENCY */}

            <Frame className="w-full gap-[var(--space-xs)]">
              <Frame className="flex-1 min-w-0 flex-col">
                <Label text="Business" size="xxs" />
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
                <Label required text="Currency" size="xxs" />
                <Dropdown
                  name="currency"
                  size="xxs"
                  width="100%"
                  value={receiptDraft.currency}
                  formFunc={handleCurrencyChange}
                  options={getCurrencyOptions()}
                />
              </Frame>
            </Frame>

            {/* DATE */}

            <Frame className="w-full gap-[var(--space-xs)]">
              <Frame className="w-1/2 flex-col">
                <Label required text="Date" size="xxs" />

                <input
                  required
                  type="date"
                  name="paymentDate"
                  value={receiptDraft.paymentDate}
                  onChange={handleReceiptFieldChange}
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
            <Frame className="justify-end gap-[var(--space-sm)] w-full"
              specificStyles={{ position: "absolute", bottom: 0, left: 0 }}
            >
              <Button variant="outline" size="sm" width="50%" func={openItemForm}
                className="h-[var(--elementSize-sm)]">
                Add items
              </Button>
              <Button variant="fill" role="submit" size="sm" propagate
                disabled={receiptDraft.items.length === 0}
                specificStyles={{ width: "50%" }}>
                Create Receipt
              </Button>
            </Frame>
          </form>
        </Frame>
      </Frame>
    </Card>
  )
}

