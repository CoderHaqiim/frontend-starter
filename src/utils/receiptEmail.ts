import { ReceiptDraft } from "@/src/store/receiptDraftState"

/*
 * The message the receipt is shared with, independent of the app it is handed to.
 *
 * The receipt document itself travels as the shared PDF file, so the message only
 * points the customer at the attachment instead of repeating the figures.
 */
export type ReceiptEmail = {
  subject: string
  body: string
}

export const buildReceiptEmail = (draft: ReceiptDraft): ReceiptEmail => ({
  subject: `Receipt ${draft.receiptNo}`,
  body: [
    `Hello ${draft.customer || "there"},`,
    "",
    `Please find receipt ${draft.receiptNo} attached as a PDF.`,
    "",
    "Thank you for your business.",
  ].join("\n"),
})
