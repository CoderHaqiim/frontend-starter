"use client"

import type { ColorTypes } from "@/src/app/design/colors"
import type { ObjectRecordType } from "@/src/types/types"
import Badge from "../base/ui/composites/badge"
import Popup from "../base/ui/composites/popup"
import Button from "../base/ui/primitives/button"
import Frame from "../base/ui/primitives/frame"
import Paragraph from "../base/ui/primitives/paragraph"

// The API derives the status from the stock rather than storing it, so the badge
// colours are mapped from the derived value.
const statusColorMap: Record<string, ColorTypes> = {
  "in stock": "success",
  "low stock": "warning",
  "out of stock": "error",
}

type InventoryLineProps = {
  item: ObjectRecordType
  onDelete: (sku: string) => void
}

export default function InventoryLine({ item, onDelete }: InventoryLineProps) {
  const statusColor = statusColorMap[item.Status] ?? "muted"

  return (
    <Frame className="relative w-full items-center justify-between bg-[var(--color-white)] py-[var(--space-md)] px-[var(--space-lg)]">
      <Frame className="w-[200px] items-center">
        <Paragraph weight="normal" color="textColor1" size="xs">
          {item.Item}
        </Paragraph>
      </Frame>

      <Frame className="w-[120px] items-center">
        <Paragraph size="xs">
          {item.SKU}
        </Paragraph>
      </Frame>

      <Frame className="w-[150px] items-center">
        <Paragraph size="xs">
          {item.Category}
        </Paragraph>
      </Frame>

      <Frame className="w-[80px] flex-col items-end">
        <Paragraph size="xs">
          {item.Stock}
        </Paragraph>
      </Frame>

      <Frame className="w-[100px] items-center">
        <Badge text={item.Status} color={statusColor} size="xs" className="w-max" />
      </Frame>

      {/* The row menu sits at the end of the row, so the delete action only
          appears once the button is clicked. */}
      <Frame className="w-[60px] items-center justify-end">
        <Popup gap={12} width="120px" content={<InventoryLinePopup onDelete={() => onDelete(String(item.SKU))} />}>
          <Button variant="ghost" size="xs" isIcon iconName="icon-vertival-dots" />
        </Popup>
      </Frame>
    </Frame>
  )
}


function InventoryLinePopup({ onDelete }: { onDelete: () => void }) {
  return (
    <Button variant="ghost" size="sm" rounded="sm" iconName="icon-delete" iconColor="error"
      specificStyles={{
        backgroundColor: "var(--color-error2)",
        color: "var(--color-error)",
        width: "100%",
      }}
      func={onDelete}
    >
      Delete
    </Button>
  )
}
