"use client"

import type { Receipt } from "@/src/data/receipts"
import Popup from "../base/ui/composites/popup"
import Button from "../base/ui/primitives/button"
import Frame from "../base/ui/primitives/frame"
import Paragraph from "../base/ui/primitives/paragraph"
import { useTheme } from "../providers/themeProvider"

type receiptLineProps = {
  receipt: Receipt
  onDelete: (receiptId: string) => void
  onView: (receiptId: string) => void
}

export default function ReceiptLine({ onDelete, onView, receipt }: receiptLineProps) {
  const { colors } = useTheme()
  const customer = receipt.customer

  return (
    <Frame className="relative w-full items-center justify-between bg-[var(--color-white)] py-[var(--space-md)] px-[var(--space-lg)]">
      <Frame className="w-[100px]">
        <Paragraph size="xs">
          {receipt.paymentDate}
        </Paragraph>
      </Frame>

      <Frame className="w-[80px]">
        <Paragraph size="xs">
          {receipt.id}
        </Paragraph>
      </Frame>

      <Frame className="w-[100px] flex-col items-end">
        <Paragraph size="xs">
          {receipt.amount}
        </Paragraph>
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

      {/* The row menu sits at the end of the row, so the view and delete actions
          only appear once the button is clicked. */}
      <Frame className="w-[60px] items-center justify-end">
        <Popup gap={12} width="120px" content={<ReceiptLinePopup onView={onView} onDelete={onDelete} receipt={receipt} />}>
          <Button variant="ghost" size="xs" isIcon iconName="icon-vertival-dots" />
        </Popup>
      </Frame>
    </Frame>
  )
}


function ReceiptLinePopup({ onDelete, onView, receipt }: receiptLineProps) {
  return (
    <>
      <Button variant="ghost" size="sm" rounded="sm" iconName="icon-eye" iconColor="textColor1"
        className="hover:bg-[var(--color-background3)]"
        func={() => onView(receipt.id)}
        specificStyles={{
          width: "100%"
        }}
      >
        View
      </Button>
      <Button variant="ghost" size="sm" rounded="sm" iconName="icon-delete" iconColor="error"
        specificStyles={{
          backgroundColor: "var(--color-error2)",
          color: "var(--color-error)",
          width:"100%"
        }}
        func={() => onDelete(receipt.id)}
      >
        Delete
      </Button>
    </>
  )
}
