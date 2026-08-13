import { MouseEvent } from "react"
import { FrameSizeType, SizeType } from "@/src/types/types"
import Frame from "../primitives/frame"
import TableCell from "./tableCell"
import TableHeaderCell from "./tableHeaderCell"

type TableHeaderProps = {
    data: string[],
    widths: FrameSizeType[],
    size: SizeType,
    onResizeStart: (columnIndex: number, event: MouseEvent<HTMLDivElement>) => void
}

export default function TableHeaderRow({data, widths, size, onResizeStart}: TableHeaderProps) {
  return (
   <Frame width="hug" height="hug" className="sticky top-0 z-20">
        <TableCell
          isHeader
          width="56px"
          size={size}
          className="sticky left-0 z-30 bg-[var(--color-background3)]"
        >
          #
        </TableCell>
        {
            data.map((item, index) => 
            <TableHeaderCell
              key={index}
              width={widths[index]}
              size={size}
              onResizeStart={(event) => onResizeStart(index, event)}
            >
              {item}
            </TableHeaderCell>)
        }
   </Frame>
  )
}
