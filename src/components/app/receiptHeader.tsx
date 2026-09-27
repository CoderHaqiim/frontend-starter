"use client"

import Frame from "../base/ui/primitives/frame"
import Paragraph from "../base/ui/primitives/paragraph"

export default function ReceiptHeader() {
  return (
    <Frame className="w-full p-[var(--space-lg)] justify-between bg-[var(--color-background3)]">
      <Frame className="w-[100px]">
        <Paragraph color="textColor1" weight="medium" size="sm">Date</Paragraph>
      </Frame>
      <Frame className="w-[80px]">
        <Paragraph color="textColor1" weight="medium" size="sm">
          Receipt ID
        </Paragraph>
      </Frame>
      <Frame className="flex-col items-end w-[100px]">
        <Paragraph color="textColor1" weight="medium" size="sm">Amount</Paragraph>
      </Frame>
      <Frame className="w-[200px]">
        <Paragraph color="textColor1" weight="medium" size="sm">Customer</Paragraph>
      </Frame>
      <Frame className="w-[60px] flex-col items-end">
        <Paragraph color="textColor1" weight="medium" size="sm">Actions</Paragraph>
      </Frame>
    </Frame>
  )
}
