import TableCell from "./tableCell"
import TableHeaderCell from "./tableHeaderCell"
import Frame from "../primitives/frame"
import { FrameSizeType, SizeType } from "@/src/types/types"
import { ObjectRecordType } from "@/src/types/types"


type TableRowProps = {
    data: ObjectRecordType
    widths: FrameSizeType[],
    size: SizeType,
    headerData: string[]
    rowIndex: number
}

export default function TableRow({
  data,
  headerData,
  widths,
  size,
  rowIndex
}: TableRowProps) {

  const valuesArray = headerData.map(key => data[key] ?? "")
  const rowClass = rowIndex % 2 === 0 ? "bg-white" : "bg-[var(--color-background1)]"

  return (
    <Frame width="hug" height="hug" className={rowClass}>
      {valuesArray.map((item, index) => (
        <TableCell
          key={index}
          width={widths[index]}
          size={size}
        >
          {item}
        </TableCell>
      ))}
    </Frame>
  )
}
