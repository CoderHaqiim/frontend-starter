import { ColorTypes } from "@/src/app/design/colors"
import { FrameSizeType, ObjectRecordType, SizeType } from "@/src/types/types"
import { ReactNode } from "react"
import Badge from "./badge"
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
  rowActions
}: TableRowProps) {

  const valuesArray = headerData.map(key => data[key] ?? "")
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
      >
        {String(rowIndex + 1)}
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
