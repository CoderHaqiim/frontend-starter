"use client"

import Frame from "../ui/primitives/frame";
import Paragraph from "../ui/primitives/paragraph";

export default function TransactionHeader() {

  return (
    <Frame className="w-full p-[var(--space-lg)] justify-between bg-[var(--color-background1)]">
      <Frame className="w-[80px]" >
        <Paragraph color="textColor1" weight="medium" size="sm">Date</Paragraph>
      </Frame>
      <Frame className="w-[220px]">
        <Paragraph color="textColor1" weight="medium" size="sm">
          Description
        </Paragraph>
      </Frame>
      <Frame className="w-[150px]">
        <Paragraph color="textColor1" weight="medium" size="sm">Customer</Paragraph>
      </Frame>
      <Frame className="flex-col w-[100px]">
        <Paragraph  color="textColor1" weight="medium" size="sm">Type</Paragraph>
      </Frame>
      <Frame className="flex-col w-[100px]">
        <Paragraph  color="textColor1" weight="medium" size="sm">Status</Paragraph>
      </Frame>
      <Frame className=" items-center w-[120px]">
        <Paragraph color="textColor1" weight="medium" size="sm">Category</Paragraph>
      </Frame>
      <Frame className="flex-col items-end w-[100px]">
        <Paragraph color="textColor1" weight="medium" size="sm">Amount</Paragraph>
      </Frame>
    </Frame>
  );
}