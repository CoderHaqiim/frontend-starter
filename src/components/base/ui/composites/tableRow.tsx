import { ColorTypes } from "@/src/app/design/colors"
import { FrameSizeType, ObjectRecordType, SizeType } from "@/src/types/types"
import Badge from "./badge"
import TableCell from "./tableCell"


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
  isCustomerData = false
}: TableRowProps) {

  const valuesArray = headerData.map(key => data[key] ?? "")
  const statusColorMap: Record<string, ColorTypes> = {
    "Active": "success",
    "Inactive": "muted",
    "Watchlist": "error",
    "In stock": "success",
    "Low stock": "warning",
    "Out of stock": "error",
  }

  return (
    <div
      className={`bg-[var(--color-white)] w-full h-max flex ${isSelected ? "bg-[var(--color-background1)]" : ""} ${isCustomerData && data.Status === "Watchlist" ? "border-2 border-[var(--color-error2)]" : ""}`}
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
