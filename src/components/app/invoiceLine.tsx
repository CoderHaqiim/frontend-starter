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

export default function InvoiceLine({onDelete,onView, invoice}: InvoiceLineProps) {
    const { colors } = useTheme()
    const customer = invoice.customer

    return (
        <Popup gap={20} content={<InvoiceLinePopup onView={onView} onDelete={onDelete} invoice={invoice}/>}>
                <Frame className="relative w-full cursor-pointer items-center justify-between bg-[var(--color-white)] p-[var(--space-lg)]">
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
                </Frame>
        </Popup>
    )
}


function InvoiceLinePopup({onDelete, onView, invoice}:InvoiceLineProps) {
  return(
    <>
      <Button variant="ghost" size="sm" rounded="sm" iconName="icon-eye" iconColor="textColor1" justify="start"
        className="w-full px-[var(--space-sm)] py-[var(--space-xs)] text-[13px] hover:bg-[var(--color-background3)]"
        func={() =>  onView(invoice.id)}
      >
        View
      </Button>
      <Button variant="ghost" size="sm" rounded="sm" iconName="icon-delete" iconColor="error" justify="start" 
        className="w-full px-[var(--space-sm)] py-[var(--space-xs)] text-[13px]"
        specificStyles={{
          backgroundColor: "var(--color-error2)",
          color: "var(--color-error)",
        }}
        func={() => onDelete(invoice.id)}
      >
        Delete
      </Button>
    </>
  )
}