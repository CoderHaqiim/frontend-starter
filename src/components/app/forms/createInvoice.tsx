"use client"

import { http } from "@/src/http/client"
import { businessesQueryKey, getBusinesses } from "@/src/services/businessService"
import { useBackdropState } from "@/src/store/backdropState"
import { getItemsSubtotal, InvoiceDraft, useInvoiceDraft } from "@/src/store/invoiceDraftState"
import { useInvoiceFormState } from "@/src/store/invoiceFormState"
import { useSelectedBusiness } from "@/src/store/selectedBusinessState"
import { getCurrencyOptions } from "@/src/utils/currencySymbol"
import { useQuery } from "@tanstack/react-query"
import { toJpeg, toPng } from "html-to-image"
import jsPDF from "jspdf"
import { useEffect, useRef, useState } from "react"

import Card from "../../base/ui/composites/card"
import DownloadDialogue from "../../base/ui/composites/downloadDialogue"
import Dropdown from "../../base/ui/composites/dropdown"
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
) as Record<InvoiceTemplateId,  (typeof invoiceTemplates)[number]["component"]>

export default function CreateInvoiceForm() {
  const isOpen = useInvoiceFormState((state) => state.isOpen)
  const closeInvoice = useInvoiceFormState((state) => state.closeInvoice)
  const invoiceDraft = useInvoiceDraft()
  const { setInvoiceField } = invoiceDraft
  const { selectedBusiness, setSelectedBusiness } = useSelectedBusiness()
  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const [selectedTemplate, setSelectedTemplate] = useState<InvoiceTemplateId>("invoice-1")
  const [downloadOpen, setDownloadOpen] = useState(false)
  const downloadDialogRef = useRef<HTMLDivElement>(null)
  const downloadTriggerRef = useRef<HTMLDivElement>(null)

  const previewRef = useRef<HTMLDivElement>(null)

  const { data: businesses = [] } = useQuery({
    queryKey: businessesQueryKey,
    queryFn: getBusinesses,
  })

  useEffect(() => {
    if (businesses.length === 0) return

    const isSelectedBusinessAvailable = businesses.some(
      (business) => business.id === selectedBusiness.id,
    )

    if (!isSelectedBusinessAvailable) {
      setSelectedBusiness(businesses[0])
    }
  }, [businesses, selectedBusiness.id, setSelectedBusiness])

// close dowload menu
  useEffect(() => {
    if (!downloadOpen) return
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target
      if (
        target instanceof Node &&
        (downloadTriggerRef.current?.contains(target) ||
          downloadDialogRef.current?.contains(target))
      ) {
        return
      }
      setDownloadOpen(false)
    }

    document.addEventListener("mousedown", handlePointerDown)

    return () => { document.removeEventListener("mousedown", handlePointerDown)}
  }, [downloadOpen])

  if (!isOpen) return null

  const closeCreateInvoiceForm = () => {
    invoiceDraft.setInvoiceField("customer", "")
    invoiceDraft.setInvoiceField("customerEmail", "")
    invoiceDraft.setInvoiceField("customerAddress", "")
    invoiceDraft.setInvoiceField("amount", "")
    invoiceDraft.setInvoiceField("currency", "NGN")
    invoiceDraft.setInvoiceField("issueDate", "")
    invoiceDraft.setInvoiceField("dueDate", "")
    invoiceDraft.setInvoiceField("vat", "0")
    invoiceDraft.setInvoiceField("discount", "0")
    invoiceDraft.setInvoiceField("invoiceNo", "")

    useInvoiceDraft.setState({
      items: [],
    })

    setSelectedTemplate("invoice-1")
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

    const itemsSubtotal = getItemsSubtotal(invoiceDraft.items)
    const enteredAmount = Number(invoiceDraft.amount) || 0
    const subtotal = invoiceDraft.items.length > 0 ? itemsSubtotal : enteredAmount
    const discountRate = Number(invoiceDraft.discount) || 0
    const vatRate = Number(invoiceDraft.vat) || 0
    const discountAmount = subtotal * (discountRate / 100)
    const vatAmount = (subtotal - discountAmount) * (vatRate / 100)
    const total = subtotal - discountAmount + vatAmount

    const payload = {
      template: selectedTemplate,
      businessId: selectedBusiness.id,

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
      const response = await http<{ message: string, data: { invoiceNo: string}}>(
        "/api/invoices",
        payload,
        { method: "POST"},
      )

      console.log("Create invoice response:", response)

      if (response?.data?.invoiceNo) {
        setInvoiceField( "invoiceNo", response.data.invoiceNo )
      }
    } catch (error) {
      console.error(
        "Failed to submit the create invoice payload:",
        error,
      )
    }
  }

  const isInvoiceCreated = Boolean(invoiceDraft.invoiceNo)

  const openDownloadDialogue = () => {
    setDownloadOpen(true)
  }

  const closeDownloadDialogue = () => {
    setDownloadOpen(false)
  }

  /*
   * ---------------------------------------------------------
   * EXPORT HELPERS
   * ---------------------------------------------------------
   */

  /*
   * 3x rendering gives a much sharper image than pixelRatio: 1.
   *
   * The invoice itself is NOT scaled here.
   * The screen-only scale-[0.89] wrapper is outside previewRef.
   */
  const getInvoicePng = async () => {
    if (!previewRef.current) {
      throw new Error("Invoice preview element was not found.")
    }

    return await toPng(previewRef.current, {
      pixelRatio: 3,
      backgroundColor: "#ffffff",

      /*
       * These help html-to-image capture the actual
       * dimensions of the invoice.
       */
      width: previewRef.current.scrollWidth,
      height: previewRef.current.scrollHeight,
    })
  }

  /*
   * Download JPG
   */
  const downloadJPG = async () => {
    if (!previewRef.current) return

    try {
      const dataUrl = await toJpeg(previewRef.current, {
        pixelRatio: 3,
        backgroundColor: "#ffffff",
        quality: 1,

        width: previewRef.current.scrollWidth,
        height: previewRef.current.scrollHeight,
      })

      const link = document.createElement("a")

      link.download =
        `${invoiceDraft.invoiceNo || "invoice"}.jpg`

      link.href = dataUrl

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setDownloadOpen(false)
    } catch (error) {
      console.error(
        "Failed to download invoice JPG:",
        error,
      )
    }
  }

  /*
   * Download PDF
   *
   * The PDF itself is A4:
   *
   * Width  = 210mm
   * Height = 297mm
   */
  const downloadPDF = async () => {
    if (!previewRef.current) return

    try {
      const dataUrl = await getInvoicePng()

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      })

      /*
       * A4 dimensions in millimeters.
       */
      const pageWidth = 210
      const pageHeight = 297

      /*
       * Fill the entire A4 page.
       *
       * Because the invoice itself is A4,
       * there should be no intentional PDF margin.
       */
      pdf.addImage(
        dataUrl,
        "PNG",
        0,
        0,
        pageWidth,
        pageHeight,
        undefined,
        "FAST",
      )

      pdf.save(
        `${invoiceDraft.invoiceNo || "invoice"}.pdf`,
      )

      setDownloadOpen(false)
    } catch (error) {
      console.error(
        "Failed to download invoice PDF:",
        error,
      )
    }
  }

  const ActiveTemplate = templates[selectedTemplate]

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

        <Frame>
          <CloseButton
            func={closeCreateInvoiceForm}
          />
        </Frame>
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
          className={
            isInvoiceCreated
              ? "flex-col flex-1 h-full min-h-0 min-w-0 overflow-x-hidden bg-[var(--color-background3)]"
              : "flex-col flex-1 h-full min-h-0 min-w-0 overflow-x-hidden bg-[var(--color-background3)]"
          }
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
            {/* DOWNLOAD / SHARE BUTTONS */}

            {isInvoiceCreated && (
              <div
                ref={downloadTriggerRef}
                className="
                  absolute
                  top-[var(--space-md)]
                  right-[var(--space-md)]
                  z-10
                  flex
                  flex-row
                  gap-[var(--space-xs)]
                "
              >
                <Button
                  variant="outline"
                  isIcon
                  iconName="icon-download"
                  size="sm"
                  func={openDownloadDialogue}
                />

                <div
                  ref={downloadDialogRef}
                  className={`
                    ${
                      downloadOpen
                        ? "flex"
                        : "hidden"
                    }
                    absolute
                    top-[120%]
                    right-0
                    z-[20]
                  `}
                  onMouseLeave={
                    closeDownloadDialogue
                  }
                >
                  <DownloadDialogue
                    downloadPDF={downloadPDF}
                    downloadPNG={downloadJPG}
                    pngLabel="Download JPG"
                    pdfLabel="Download PDF"
                  />
                </div>

                <Button
                  variant="outline"
                  isIcon
                  iconName="icon-share"
                  size="sm"
                />
              </div>
            )}

            {/*
             * IMPORTANT:
             *
             * scale-[0.89] is ONLY for the screen.
             *
             * previewRef is INSIDE this wrapper.
             * Therefore the exported invoice is not scaled.
             */}

            <div className="origin-top scale-[0.89]">
              <div ref={previewRef}>
                <ActiveTemplate />
              </div>
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
                  value={
                    selectedBusiness.id ||
                    undefined
                  }
                  formFunc={
                    handleBusinessChange
                  }
                  options={businesses.map(
                    (business) => ({
                      label:
                        business.businessName,
                      value: business.id,
                    }),
                  )}
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