"use client"

import Frame from "../ui/primitives/frame"
import Paragraph from "../ui/primitives/paragraph"

export default function ReceiptHeader() {
  return (
    <Frame className="w-full p-[var(--space-lg)] justify-between bg-[var(--color-background1)]">
      <Frame className="w-[100px]">
        <Paragraph color="textColor1" weight="medium" size="sm">Created on</Paragraph>
      </Frame>
      <Frame className="w-[150px]">
        <Paragraph color="textColor1" weight="medium" size="sm">
          Receipt ID
        </Paragraph>
      </Frame>
      <Frame className="w-[250px]">
        <Paragraph color="textColor1" weight="medium" size="sm">Customer</Paragraph>
      </Frame>
      <Frame className="flex-col items-end w-[100px]">
        <Paragraph color="textColor1" weight="medium" size="sm">Amount</Paragraph>
      </Frame>
    </Frame>
  )
}
