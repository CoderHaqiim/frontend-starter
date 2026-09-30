"use client"

import Button from "../primitives/button"
import Frame from "../primitives/frame"

type RowActionsMenuProps = {
  // Only the actions the table was given a handler for are shown, so a table that
  // deletes without editing does not offer an Edit action.
  onEdit?: () => void
  onDelete?: () => void
}

/*
 * The Edit and Delete actions a table row offers. It is what the popup on the
 * serial number column of a row shows, and it mirrors the row menus the invoice,
 * receipt and inventory tables already use, so a row reads the same wherever it
 * is listed.
 *
 * Each action is answered by the caller, which is what lets every table send its
 * own request through its own route.
 */
export default function RowActionsMenu({ onEdit, onDelete }: RowActionsMenuProps) {
  return (
    <Frame className="w-full flex-col">
      {onEdit && (
        <Button
          variant="ghost"
          size="xs"
          rounded="sm"
          iconName="icon-pencil"
          iconColor="textColor1"
          justify="start"
          width="stretch"
          className="hover:bg-[var(--color-background3)]"
          func={onEdit}
        >
          Edit
        </Button>
      )}

      {onDelete && (
        <Button
          variant="ghost"
          size="xs"
          rounded="sm"
          iconName="icon-delete"
          iconColor="error"
          justify="start"
          width="stretch"
          specificStyles={{
            backgroundColor: "var(--color-error2)",
            color: "var(--color-error)",
          }}
          func={onDelete}
        >
          Delete
        </Button>
      )}
    </Frame>
  )
}
