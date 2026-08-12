import { MouseEvent } from "react"
import { FrameSizeType, SizeType } from "@/src/types/types"
import Frame from "../primitives/frame"
import TableHeaderCell from "./tableHeaderCell"

type TableHeaderProps = {
    data: string[],
    widths: FrameSizeType[],
    size: SizeType,
    onResizeStart: (columnIndex: number, event: MouseEvent<HTMLDivElement>) => void
}

export default function TableHeaderRow({data, widths, size, onResizeStart}: TableHeaderProps) {
  return (
   <Frame width="hug" height="hug">
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
