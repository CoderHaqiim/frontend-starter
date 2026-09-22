import { InvoiceDraft } from "@/src/store/invoiceDraftState"

/*
 * The message the invoice is shared with, independent of the app it is handed to.
 *
 * The invoice document itself travels as the shared PDF file, so the message only
 * points the customer at the attachment instead of repeating the figures.
 */
export type InvoiceEmail = {
  subject: string
  body: string
}

export const buildInvoiceEmail = (draft: InvoiceDraft): InvoiceEmail => ({
  subject: `Invoice ${draft.invoiceNo}`,
  body: [
    `Hello ${draft.customer || "there"},`,
    "",
    `Please find invoice ${draft.invoiceNo} attached as a PDF.`,
    "",
    "Thank you for your business.",
  ].join("\n"),
})


