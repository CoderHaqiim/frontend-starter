import { FrameSizeType, ObjectRecordType, SizeType } from "@/src/types/types"
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
      {valuesArray.map((item, index) => (
        <TableCell
          key={index}
          width={widths[index]}
          size={size}
          className={isSelected || selectedColumnIndex === index ? "bg-[var(--color-background1)]" : ""}
        >
          {item}
        </TableCell>
      ))}
    </div>
  )
}
