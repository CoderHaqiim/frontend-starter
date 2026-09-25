"use client"

import { useInvoiceDraft } from "@/src/store/invoiceDraftState"
import { useToastState } from "@/src/store/toastState"
import { ToastType } from "@/src/types/types"
import { buildInvoiceEmail } from "@/src/utils/invoiceEmail"
import { toJpeg, toPng } from "html-to-image"
import jsPDF from "jspdf"
import { useEffect, useRef, useState } from "react"

import Section from "../base/layout/section"
import DownloadDialogue from "../base/ui/composites/downloadDialogue"
import ShareDialogue from "../base/ui/composites/shareDialogue"
import Button from "../base/ui/primitives/button"
import Frame from "../base/ui/primitives/frame"
import Heading from "../base/ui/primitives/heading"
import Paragraph from "../base/ui/primitives/paragraph"
import { invoiceTemplateComponents, type InvoiceTemplateId } from "./templateList"

export default function ViewInvoice() {
  const invoiceDraft = useInvoiceDraft()
  const { toastState, setToastState } = useToastState()
  const [downloadOpen, setDownloadOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const [isEmailing, setIsEmailing] = useState(false)
  const downloadDialogRef = useRef<HTMLDivElement>(null)
  const downloadTriggerRef = useRef<HTMLDivElement>(null)
  const shareDialogRef = useRef<HTMLDivElement>(null)
  const shareTriggerRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  const invoiceNo = invoiceDraft.invoiceNo
  const ActiveTemplate = invoiceTemplateComponents[invoiceDraft.template as InvoiceTemplateId]

  // close the download and share menus on an outside click
  useEffect(() => {
    if (!downloadOpen && !shareOpen) return

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target

      if (!(target instanceof Node)) return

      const isInsideDownloadMenu =
        Boolean(downloadTriggerRef.current?.contains(target)) ||
        Boolean(downloadDialogRef.current?.contains(target))

      const isInsideShareMenu =
        Boolean(shareTriggerRef.current?.contains(target)) ||
        Boolean(shareDialogRef.current?.contains(target))

      if (isInsideDownloadMenu || isInsideShareMenu) {
        return
      }

      setDownloadOpen(false)
      setShareOpen(false)
    }

    document.addEventListener("mousedown", handlePointerDown)

    return () => { document.removeEventListener("mousedown", handlePointerDown) }
  }, [downloadOpen, shareOpen])

  const openDownloadDialogue = () => {
    setShareOpen(false)
    setDownloadOpen(true)
  }

  const closeDownloadDialogue = () => {
    setDownloadOpen(false)
  }

  const openShareDialogue = () => {
    setDownloadOpen(false)
    setShareOpen(true)
  }

  const closeShareDialogue = () => {
    setShareOpen(false)
  }

  /*
   * ---------------------------------------------------------
   * EXPORT HELPERS
   * ---------------------------------------------------------
   */

  /*
   * 3x rendering gives a much sharper image than pixelRatio: 1.
   * The invoice is captured at its real A4 size, so nothing is scaled.
   */
  const getInvoicePng = async () => {
    if (!previewRef.current) {
      throw new Error("Invoice preview element was not found.")
    }

    return await toPng(previewRef.current, {
      pixelRatio: 3,
      backgroundColor: "#ffffff",

      width: previewRef.current.scrollWidth,
      height: previewRef.current.scrollHeight,
    })
  }

  /*
   * The invoice PDF is rendered from the same 3x capture the downloads use, so
   * the document that is downloaded and the document that is shared are the same
   * file.
   */
  const buildInvoicePdf = async () => { 
    const dataUrl = await getInvoicePng()

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    })

    pdf.addImage(dataUrl, "PNG", 0, 0, 210, 297, undefined, "FAST")

    return pdf
  }

  const buildInvoicePdfFile = async () => {
    const pdf = await buildInvoicePdf()

    return new File([pdf.output("blob")], `${invoiceNo || "invoice"}.pdf`, {
      type: "application/pdf",
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

      link.download = `${invoiceNo || "invoice"}.jpg`
      link.href = dataUrl

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setDownloadOpen(false)
    } catch (error) {
      console.error("Failed to download invoice JPG:", error)
    }
  }


  const downloadPDF = async () => {
    if (!previewRef.current) return

    try {
      const pdf = await buildInvoicePdf()

      pdf.save(`${invoiceNo || "invoice"}.pdf`)

      setDownloadOpen(false)
    } catch (error) {
      console.error("Failed to download invoice PDF:", error)
    }
  }

  const showToast = (toast: ToastType) => {
    setToastState([...toastState, toast])
  }

  /*
   * Share the invoice through the Web Share API.
   *
   * The invoice travels as the same PDF the download produces, so the share sheet
   * can hand the document to any installed app, mail clients included. File
   * sharing is the one capability this needs, because the customer receives the
   * PDF rather than a summary or a link.
   */
  const shareInvoice = async () => {
    if (!previewRef.current || isSharing) return

    setIsSharing(true)

    try {
      const pdfFile = await buildInvoicePdfFile()

      if (typeof navigator.canShare !== "function" || !navigator.canShare({ files: [pdfFile] })) {
        showToast({
          variant: "error",
          title: "Sharing unavailable",
          message: "This device cannot share files, so the invoice PDF could not be shared.",
        })

        return
      }

      const { subject, body } = buildInvoiceEmail(invoiceDraft)

      await navigator.share({ title: subject, text: body, files: [pdfFile] })

      setShareOpen(false)
    } catch (error) {
      // Dismissing the share sheet is not a failure.
      if (error instanceof DOMException && error.name === "AbortError") return

      console.error("Failed to share the invoice:", error)

      showToast({
        variant: "error",
        title: "Share failed",
        message: "The invoice could not be shared. Please try again.",
      })
    } finally {
      setIsSharing(false)
    }
  }

  /*
   * Email the invoice through the backend, which is where the mail is sent from.
   *
   * The invoice PDF travels as a multipart upload together with the customer it is
   * addressed to, so the route receives the document itself instead of a link to
   * it. The shared http helper always posts JSON, so the request is made directly.
   */
  const emailInvoice = async () => {
    if (!previewRef.current || isEmailing) return

    setIsEmailing(true)

    try {
      const formData = new FormData()

      formData.append("file", await buildInvoicePdfFile())
      formData.append("name", invoiceDraft.customer)
      formData.append("email", invoiceDraft.customerEmail)

      const response = await fetch("/api/invoices/email", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Invoice email request failed with status ${response.status}`)
      }

      showToast({
        variant: "success",
        title: "Invoice emailed",
        message: `The invoice PDF was sent to ${invoiceDraft.customerEmail || "the customer"}.`,
      })

      setShareOpen(false)
    } catch (error) {
      console.error("Failed to email the invoice:", error)

      showToast({
        variant: "error",
        title: "Email failed",
        message: "The invoice could not be emailed. Please try again.",
      })
    } finally {
      setIsEmailing(false)
    }
  }

  if (!invoiceNo || !ActiveTemplate) {
    return (
      <Frame className="w-full flex-col h-max">
        <Section emptyState>
          <Frame className="w-full h-full items-center justify-center">
            <Paragraph size="md" weight="light" className="text-center w-full h-[100px] flex">
              When you create an invoice, it appears here.
            </Paragraph>
          </Frame>
        </Section>
      </Frame>
    )
  }

  return (
    <Frame className="w-full flex-col h-max">
      {/* HEADER + ACTIONS */}
      <Frame
        className="w-full bg-[var(--color-background1)] top-0 z-[20] p-[var(--space-lg)]"
        specificStyles={{ 
          position: "sticky",
      }}>
        <Frame className="w-full justify-between">

          <Frame className="gap-[var(--space-xs)] z-[50] bg-[var(--color-background1)] h-max flex-col">
            <Heading size="md" type="h1">
              Invoice {invoiceNo}
            </Heading>
            <Paragraph weight="light" size="sm">
              Review the invoice, then download or share it.
            </Paragraph>
          </Frame>

          <Frame className="gap-[var(--space-xs)] h-max w-max shrink-0">
            <div ref={downloadTriggerRef}>
              <Button
                variant="outline"
                isIcon
                iconName="icon-download"
                size="sm"
                func={openDownloadDialogue}
              />
            </div>

            <div
              ref={downloadDialogRef}
              className={`
                ${downloadOpen ? "flex" : "hidden"}
                absolute
                top-[120%]
                right-0
                z-[20]
              `}
              onMouseLeave={closeDownloadDialogue}
            >
              <DownloadDialogue
                downloadPDF={downloadPDF}
                downloadPNG={downloadJPG}
                pngLabel="Download JPG"
                pdfLabel="Download PDF"
              />
            </div>

            <div ref={shareTriggerRef}>
              <Button
                variant="outline"
                isIcon
                iconName="icon-share"
                size="sm"
                func={openShareDialogue}
              />
            </div>

            <div
              ref={shareDialogRef}
              className={`
                ${shareOpen ? "flex" : "hidden"}
                absolute
                top-[120%]
                right-0
                z-[20]
              `}
              onMouseLeave={closeShareDialogue}
            >
              <ShareDialogue
                shareToApps={shareInvoice}
                shareByEmail={emailInvoice}
                appsLabel="Other apps"
                emailLabel="Email"
              />
            </div>
          </Frame>
        </Frame>
      </Frame>

      {/* INVOICE */}
      <Section className="z-0">
        <Frame className="w-full justify-center">
          <div ref={previewRef}>
            <ActiveTemplate />
          </div>
        </Frame>
      </Section>
    </Frame>
  )
}
