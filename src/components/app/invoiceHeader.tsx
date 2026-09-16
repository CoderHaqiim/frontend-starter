"use client"

import Frame from "../base/ui/primitives/frame";
import Paragraph from "../base/ui/primitives/paragraph";

export default function InvoiceHeader() {

  return (
    <Frame className="w-full p-[var(--space-lg)] justify-between bg-[var(--color-background1)]">
      <Frame className="w-[100px]" >
        <Paragraph color="textColor1" weight="medium" size="sm">Created on</Paragraph>
      </Frame>
      <Frame className="w-[80px]">
        <Paragraph color="textColor1" weight="medium" size="sm">
          Invoice ID
        </Paragraph>
      </Frame>
      <Frame className="flex-col items-end w-[100px]">
        <Paragraph color="textColor1" weight="medium" size="sm">Amount</Paragraph>
      </Frame>
      <Frame className="w-[200px]">
        <Paragraph color="textColor1" weight="medium" size="sm">Customer</Paragraph>
      </Frame>
    </Frame>
  );
}