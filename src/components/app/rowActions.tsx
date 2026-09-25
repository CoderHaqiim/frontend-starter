"use client"

import Popup from "../base/ui/composites/popup"
import Button from "../base/ui/primitives/button"

type RowActionsProps = {
  onDelete: () => void
  label?: string
}

// The trailing menu a list row exposes. It matches the delete menu the invoice and
// receipt rows use, so a destructive action always takes a second click.
export default function RowActions({ onDelete, label = "Delete" }: RowActionsProps) {
  return (
    <Popup
      gap={12}
      content={
        <Button
          variant="ghost"
          size="sm"
          rounded="sm"
          iconName="icon-delete"
          iconColor="error"
          justify="start"
          className="w-full px-[var(--space-sm)] py-[var(--space-xs)] text-[13px]"
          specificStyles={{
            backgroundColor: "var(--color-error2)",
            color: "var(--color-error)",
          }}
          func={onDelete}
        >
          {label}
        </Button>
      }
    >
      <Button variant="ghost" size="xs" isIcon iconName="icon-vertival-dots" />
    </Popup>
  )
}
