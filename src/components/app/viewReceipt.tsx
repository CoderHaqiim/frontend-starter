"use client"

import usePointerDownOutside from "@/src/hooks/pointerDownOutside"
import { useReceiptDraft } from "@/src/store/receiptDraftState"
import { useShowToast } from "@/src/store/toastState"
import { buildReceiptEmail } from "@/src/utils/receiptEmail"
import { toJpeg, toPng } from "html-to-image"
import jsPDF from "jspdf"
import { useRef, useState } from "react"

import Section from "../base/layout/section"
import DownloadDialogue from "../base/ui/composites/downloadDialogue"
import EmptyState from "../base/ui/composites/emptyState"
import ShareDialogue from "../base/ui/composites/shareDialogue"
import Button from "../base/ui/primitives/button"
import Frame from "../base/ui/primitives/frame"
import Heading from "../base/ui/primitives/heading"
import Paragraph from "../base/ui/primitives/paragraph"
import {
  receiptTemplateComponents,
  type ReceiptTemplateId,
} from "./receiptTemplateList"

// A5, the paper size both receipt templates are laid out for.
const A5 = { width: 148, height: 210 }

export default function ViewReceipt() {
  const receiptDraft = useReceiptDraft()
  const showToast = useShowToast()
  const [downloadOpen, setDownloadOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const [isEmailing, setIsEmailing] = useState(false)
  const downloadDialogRef = useRef<HTMLDivElement>(null)
  const downloadTriggerRef = useRef<HTMLDivElement>(null)
  const shareDialogRef = useRef<HTMLDivElement>(null)
  const shareTriggerRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  const receiptNo = receiptDraft.receiptNo
  const ActiveTemplate =
    receiptTemplateComponents[receiptDraft.template as ReceiptTemplateId]

  // close the download and share menus on an outside click
  usePointerDownOutside(
    [downloadTriggerRef, downloadDialogRef, shareTriggerRef, shareDialogRef],
    () => {
      setDownloadOpen(false)
      setShareOpen(false)
    },
    downloadOpen || shareOpen,
  )

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
   * The receipt is captured at its real A5 size, so nothing is scaled.
   */
  const getReceiptPng = async () => {
    if (!previewRef.current) {
      throw new Error("Receipt preview element was not found.")
    }

    return await toPng(previewRef.current, {
      pixelRatio: 3,
      backgroundColor: "#ffffff",
      width: previewRef.current.scrollWidth,
      height: previewRef.current.scrollHeight,
    })
  }

  /*
   * The receipt PDF is rendered from the same 3x capture the downloads use, so
   * the document that is downloaded and the document that is shared are the same
   * file.
   */
  const buildReceiptPdf = async () => {
    const dataUrl = await getReceiptPng()

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [A5.width, A5.height],
      compress: true,
    })

    pdf.addImage(
      dataUrl,
      "PNG",
      0,
      0,
      A5.width,
      A5.height,
      undefined,
      "FAST",
    )

    return pdf
  }

  const buildReceiptPdfFile = async () => {
    const pdf = await buildReceiptPdf()

    return new File([pdf.output("blob")], `${receiptNo || "receipt"}.pdf`, {
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

      link.download = `${receiptNo || "receipt"}.jpg`
      link.href = dataUrl

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setDownloadOpen(false)
    } catch (error) {
      console.error("Failed to download receipt JPG:", error)
    }
  }

  const downloadPDF = async () => {
    if (!previewRef.current) return

    try {
      const pdf = await buildReceiptPdf()

      pdf.save(`${receiptNo || "receipt"}.pdf`)

      setDownloadOpen(false)
    } catch (error) {
      console.error("Failed to download receipt PDF:", error)
    }
  }

  /*
   * Share the receipt through the Web Share API.
   *
   * The receipt travels as the same PDF the download produces, so the share sheet
   * can hand the document to any installed app, mail clients included. File
   * sharing is the one capability this needs, because the customer receives the
   * PDF rather than a summary or a link.
   */
  const shareReceipt = async () => {
    if (!previewRef.current || isSharing) return

    setIsSharing(true)

    try {
      const pdfFile = await buildReceiptPdfFile()

      if (typeof navigator.canShare !== "function" || !navigator.canShare({ files: [pdfFile] })) {
        showToast({
          variant: "error",
          title: "Sharing unavailable",
          message: "This device cannot share files, so the receipt PDF could not be shared.",
        })

        return
      }

      const { subject, body } = buildReceiptEmail(receiptDraft)

      await navigator.share({ title: subject, text: body, files: [pdfFile] })

      setShareOpen(false)
    } catch (error) {
      // Dismissing the share sheet is not a failure.
      if (error instanceof DOMException && error.name === "AbortError") return

      console.error("Failed to share the receipt:", error)

      showToast({
        variant: "error",
        title: "Share failed",
        message: "The receipt could not be shared. Please try again.",
      })
    } finally {
      setIsSharing(false)
    }
  }

  /*
   * Email the receipt through the backend, which is where the mail is sent from.
   *
   * The receipt PDF travels as a multipart upload together with the customer it is
   * addressed to, so the route receives the document itself instead of a link to
   * it. The shared http helper always posts JSON, so the request is made directly.
   */
  const emailReceipt = async () => {
    if (!previewRef.current || isEmailing) return

    setIsEmailing(true)

    try {
      const formData = new FormData()

      formData.append("file", await buildReceiptPdfFile())
      formData.append("name", receiptDraft.customer)
      formData.append("email", receiptDraft.customerEmail)

      const response = await fetch("/api/receipts/email", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Receipt email request failed with status ${response.status}`)
      }

      showToast({
        variant: "success",
        title: "Receipt emailed",
        message: `The receipt PDF was sent to ${receiptDraft.customerEmail || "the customer"}.`,
      })

      setShareOpen(false)
    } catch (error) {
      console.error("Failed to email the receipt:", error)

      showToast({
        variant: "error",
        title: "Email failed",
        message: "The receipt could not be emailed. Please try again.",
      })
    } finally {
      setIsEmailing(false)
    }
  }

  if (!receiptNo || !ActiveTemplate) {
    return (
      <Frame className="w-full flex-col h-max">
        <Section emptyState>
          <EmptyState message="When you create a receipt, it appears here." surface="" />
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
              Receipt {receiptNo}
            </Heading>
            <Paragraph weight="light" size="sm">
              Review the receipt, then download or share it.
            </Paragraph>
          </Frame>

          <Frame className="gap-[var(--space-xs)] h-max w-max shrink-0">
            <div ref={downloadTriggerRef}>
              <Button variant="outline" isIcon iconName="icon-download" size="md" func={openDownloadDialogue}/>
            </div>

            <div ref={downloadDialogRef}
              className={` ${downloadOpen ? "flex" : "hidden"} absolute top-[120%] right-0 z-[20]`}
              onMouseLeave={closeDownloadDialogue}
            >
              <DownloadDialogue downloadPDF={downloadPDF} downloadPNG={downloadJPG} pngLabel="Download JPG" pdfLabel="Download PDF"/>
            </div>

            <div ref={shareTriggerRef}>
              <Button variant="outline" isIcon iconName="icon-share" size="md" func={openShareDialogue}/>
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
                shareToApps={shareReceipt}
                shareByEmail={emailReceipt}
                appsLabel="Other apps"
                emailLabel="Email"
              />
            </div>
          </Frame>
        </Frame>
      </Frame>

      {/* RECEIPT */}
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

