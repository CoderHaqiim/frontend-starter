"use client"

import Frame from "../base/ui/primitives/frame"
import Paragraph from "../base/ui/primitives/paragraph"

// The stock and actions columns are right aligned so they line up with the rows
// underneath them, which keeps the figures and the row menu in a straight column.
export default function InventoryHeader() {
  return (
    <Frame className="w-full p-[var(--space-lg)] justify-between bg-[var(--color-background3)]">
      <Frame className="w-[200px]">
        <Paragraph color="textColor1" weight="medium" size="sm">Item</Paragraph>
      </Frame>
      <Frame className="w-[120px]">
        <Paragraph color="textColor1" weight="medium" size="sm">SKU</Paragraph>
      </Frame>
      <Frame className="w-[150px]">
        <Paragraph color="textColor1" weight="medium" size="sm">Category</Paragraph>
      </Frame>
      <Frame className="w-[80px] flex-col items-end">
        <Paragraph color="textColor1" weight="medium" size="sm">Stock</Paragraph>
      </Frame>
      <Frame className="w-[100px]">
        <Paragraph color="textColor1" weight="medium" size="sm">Status</Paragraph>
      </Frame>
      <Frame className="w-[60px] flex-col items-end">
        <Paragraph color="textColor1" weight="medium" size="sm">Actions</Paragraph>
      </Frame>
    </Frame>
  )
}
