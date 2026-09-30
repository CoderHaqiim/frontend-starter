import { ColorTypes } from "@/src/app/design/colors"
import { FrameSizeType, ObjectRecordType, SizeType } from "@/src/types/types"
import { ReactNode } from "react"
import Badge from "./badge"
import Paragraph from "../primitives/paragraph"
import Icon from "../primitives/icon"
import Popup from "./popup"
import RowActionsMenu from "./rowActionsMenu"
import TableCell from "./tableCell"


// The header the actions column renders under when a row exposes actions.
export const ACTIONS_COLUMN = "Actions"

type TableRowProps = {
    data: ObjectRecordType
    widths: FrameSizeType[],
    size: SizeType,
    headerData: string[]
    rowIndex: number
    isSelected?: boolean
    selectedColumnIndex?: number | null
    onSelect?: () => void
    isCustomerData?: boolean
    rowActions?: (row: ObjectRecordType) => ReactNode
    // The row menu the serial number column opens. Edit and Delete are offered for
    // whichever of the two the table was given, and each is answered by the table
    // so a row action travels through the route that owns the record.
    onEditRow?: (row: ObjectRecordType) => void
    onDeleteRow?: (row: ObjectRecordType) => void
}

export default function TableRow({
  data,
  headerData,
  widths,
  size,
  rowIndex,
  isSelected = false,
  selectedColumnIndex = null,
  onSelect,
  isCustomerData = false,
  rowActions,
  onEditRow,
  onDeleteRow
}: TableRowProps) {

  const valuesArray = headerData.map(key => data[key] ?? "")
  const rowNumber = String(rowIndex + 1)
  const hasRowMenu = Boolean(onEditRow || onDeleteRow)
  const statusColorMap: Record<string, ColorTypes> = {
    "active": "success",
    "inactive": "muted",
    "watchlist": "error",
    "in stock": "success",
    "low stock": "warning",
    "out of stock": "error",
  }

  return (
    <div
      className={`bg-[var(--color-white)] w-full h-max flex ${isSelected ? "bg-[var(--color-background1)]" : ""}`}
      role="row"
      aria-selected={isSelected}
      onClick={onSelect}
    >
      <TableCell
        width="50px"
        size={size}
        showCopyButton={false}
        className={`sticky left-0 z-10 ${isSelected ? "bg-[var(--color-background1)]" : "bg-[var(--color-white)]"}`}
        actionSlot={
          hasRowMenu ? (
            // The cell's own affordance: the arrow appears while the pointer is over
            // the cell and says the whole cell opens the row's menu. It never takes
            // the press — the Popup trigger underneath it does.
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-[var(--space-xs)] top-0 z-10 flex h-full items-center opacity-0 transition-all duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
            >
              <Icon name="icon-arrow-big-right" size="xs" color="textColor2" />
            </div>
          ) : undefined
        }
      >
        {hasRowMenu ? (
          // The whole cell is the handle for the row's actions, not just the digits:
          // the trigger is laid over the cell and carries the cell's padding back, so
          // a press anywhere in it opens the menu beside the number.
          <Popup
            gap={12}
            width="120px"
            position="right"
            closeOnContentClick
            triggerStyle={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              padding: "var(--space-sm)",
              cursor: "pointer",
            }}
            content={
              <RowActionsMenu
                onEdit={onEditRow ? () => onEditRow(data) : undefined}
                onDelete={onDeleteRow ? () => onDeleteRow(data) : undefined}
              />
            }
          >
            <Paragraph color="textColor2" weight="light" size={size}>
              {rowNumber}
            </Paragraph>
          </Popup>
        ) : (
          rowNumber
        )}
      </TableCell>
      {valuesArray.map((item, index) => {
        const columnKey = headerData[index]
        const isStatusColumn = columnKey === "Status" || columnKey === "status"
        const statusColor = isStatusColumn ? (statusColorMap[String(item)] ?? "muted") : "muted"

        if (columnKey === ACTIONS_COLUMN && rowActions) {
          return (
            <TableCell key={index} width={widths[index]} size={size} showCopyButton={false}>
              {rowActions(data)}
            </TableCell>
          )
        }

        return (
          <TableCell
            key={index}
            width={widths[index]}
            size={size}
            className={isSelected || selectedColumnIndex === index ? "bg-[var(--color-background1)]" : ""}
          >
            {isStatusColumn ? (
              <Badge text={String(item)} color={statusColor} size="xxs" />
            ) : (
              item
            )}
          </TableCell>
        )
      })}
    </div>
  )
}
