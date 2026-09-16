import { FrameSizeType, SizeType } from "@/src/types/types"
import { MouseEvent } from "react"
import Frame from "../primitives/frame"
import TableCell from "./tableCell"
import TableHeaderCell from "./tableHeaderCell"

type TableHeaderProps = {
    data: string[],
    widths: FrameSizeType[],
    size: SizeType,
    onResizeStart: (columnIndex: number, event: MouseEvent<HTMLDivElement>) => void,
    selectedColumnIndex: number | null,
    onSelectColumn: (columnIndex: number) => void
}

  export default function TableHeaderRow({data, widths, size, onResizeStart, selectedColumnIndex, onSelectColumn}: TableHeaderProps) {
  return (
   <Frame className="w-max h-max sticky top-0 z-50">
        <TableCell
          isHeader
          width="50px"
          size={size}
          className="sticky left-0 z-30 bg-[var(--color-background3)]"
          onClick={() => onSelectColumn(-1)}
        >
          <></>
        </TableCell>
        {
            data.map((item, index) => 
            <TableHeaderCell
              key={index}
              width={widths[index]}
              size={size}
              onResizeStart={(event) => onResizeStart(index, event)}
              isSelected={selectedColumnIndex === index}
              onSelect={() => onSelectColumn(index)}
            >
              {item}
            </TableHeaderCell>)
        }
   </Frame>
  )
}
