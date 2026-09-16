"use client"

import Frame from "../base/ui/primitives/frame"
import Paragraph from "../base/ui/primitives/paragraph"

type ReceiptLineType = {
  date: string
  id: string
  amount: string
  sentTo: {
    id: string
    name: string
    paymentStatus: string
  }[]
}

type ReceiptLineProps = {
  receipt: ReceiptLineType
}

export default function ReceiptLine({ receipt }: ReceiptLineProps) {
  const customer = receipt.sentTo[0]

  return (
    <Frame className="w-full items-center p-[var(--space-lg)] justify-between bg-[var(--color-white)]">
      <Frame className="w-[100px]">
        <Paragraph size="xs">{receipt.date}</Paragraph>
      </Frame>
      <Frame className="w-[150px]">
        <Paragraph size="xs">{receipt.id}</Paragraph>
      </Frame>
      <Frame className="w-[250px] items-center justify-start">
        <Paragraph size="xs" color="textColor1">
          {customer?.name ?? "—"}
        </Paragraph>
      </Frame>
      <Frame className="flex-col items-end w-[100px]">
        <Paragraph size="xs">{receipt.amount}</Paragraph>
      </Frame>
    </Frame>
  )
}
