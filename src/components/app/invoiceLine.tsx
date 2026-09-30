"use client"

import type { Invoice } from "@/src/data/invoices"
import { statusColorMap } from "@/src/utils/statusColorMap"
import Badge from "../base/ui/composites/badge"
import Popup from "../base/ui/composites/popup"
import Button from "../base/ui/primitives/button"
import Frame from "../base/ui/primitives/frame"
import Paragraph from "../base/ui/primitives/paragraph"
import { useTheme } from "../providers/themeProvider"

type InvoiceLineProps = {
    invoice: Invoice
    onDelete: (invoiceId: string) => void
    onView: (invoiceId: string) => void
}

export default function InvoiceLine({ onDelete, onView, invoice }: InvoiceLineProps) {
    const { colors } = useTheme()
    const customer = invoice.customer

    return (
        <Frame className="relative w-full items-center justify-between bg-[var(--color-white)] py-[var(--space-md)] px-[var(--space-lg)]">
            <Frame className="w-[100px]">
                <Paragraph size="xs">
                    {invoice.issueDate}
                </Paragraph>
            </Frame>

            <Frame className="w-[80px]">
                <Paragraph size="xs">
                    {invoice.id}
                </Paragraph>
            </Frame>

            <Frame className="w-[100px] flex-col items-end">
                <Paragraph size="xs">
                    {invoice.amount}
                </Paragraph>
            </Frame>

            <Frame className="w-[120px] items-start justify-start">
                <Badge color={
                        statusColorMap(
                            customer.paymentStatus === "paid"
                                ? "completed"
                                : customer.paymentStatus === "pending"
                                  ? "pending"
                                  : "overdue"
                        ) as
                            | "error"
                            | "success"
                            | "warning"
                            | "muted"
                    }
                    size="xxs"
                    text={customer.paymentStatus}
                />
            </Frame>

            <Frame className="w-[200px] items-center gap-[var(--space-xs)]">
                <Frame
                    className="flex h-7 w-7 items-center justify-center rounded-full border-2 text-[length:var(--bodySize-xs)] font-[var(--fontWeight-medium)] text-[var(--color-textColor1)]"
                    specificStyles={{
                        backgroundColor: "#5B8DEF",
                        borderColor: colors.white,
                    }}
                >
                    {customer.name.charAt(0).toUpperCase()}
                </Frame>

                <Paragraph size="xs">
                    {customer.name}
                </Paragraph>
            </Frame>

            {/* The row menu sits at the end of the row, so the view and delete
                actions only appear once the button is clicked. */}
            <Frame className="w-[60px] items-center justify-end">
                <Popup gap={12} width="120px" content={<InvoiceLinePopup onView={onView} onDelete={onDelete} invoice={invoice}/>}>
                    <Button variant="ghost" size="xs" isIcon iconName="icon-vertival-dots" />
                </Popup>
            </Frame>
        </Frame>
    )
}


function InvoiceLinePopup({onDelete, onView, invoice}:InvoiceLineProps) {
  return(
    <Frame className="w-full flex-col">
      <Button variant="ghost" size="xs" rounded="sm" iconName="icon-eye" iconColor="textColor1"
        width="stretch"
        className="hover:bg-[var(--color-background3)]"
        func={() =>  onView(invoice.id)}
      >
        View
      </Button>
      <Button variant="ghost" size="xs" rounded="sm" iconName="icon-delete" iconColor="error" justify="start" 
        width="stretch"
        specificStyles={{
          backgroundColor: "var(--color-error2)",
          color: "var(--color-error)",
        }}
        func={() => onDelete(invoice.id)}
      >
        Delete
      </Button>
    </Frame>
  )
}