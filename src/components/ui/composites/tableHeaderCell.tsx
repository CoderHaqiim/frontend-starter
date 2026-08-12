import { MouseEvent, ReactNode } from "react";
import TableCell from "./tableCell";
import { FrameSizeType, SizeType } from "@/src/types/types";

type TableHeaderCellProp = {
    children: ReactNode,
    size: SizeType,
    width: FrameSizeType,
    onResizeStart: (event: MouseEvent<HTMLDivElement>) => void
}

export default function TableHeaderCell({children, size, width, onResizeStart}: TableHeaderCellProp) {
  return (
    <TableCell
      isHeader
      width={width}
      size={size}
      className="bg-[var(--color-background3)]"
      actionSlot={
        <div
          aria-hidden="true"
          className="absolute right-[-3px] top-0 z-10 h-full w-[6px] cursor-col-resize hover:bg-[var(--color-accent)]"
          onMouseDown={onResizeStart}
        />
      }
    >
        {children}
    </TableCell>
  )
}
