import { FrameSizeType, SizeType } from "@/src/types/types";
import { MouseEvent, ReactNode } from "react";
import TableCell from "./tableCell";

type TableHeaderCellProp = {
    children: ReactNode,
    size: SizeType,
    width: FrameSizeType,
    onResizeStart: (event: MouseEvent<HTMLDivElement>) => void,
    isSelected?: boolean,
    onSelect?: () => void
}

  export default function TableHeaderCell({children, size, width, onResizeStart, isSelected = false, onSelect}: TableHeaderCellProp) {
  return (
    <TableCell
      isHeader
      width={width}
      size={size}
      className="bg-[var(--color-background3)]"
      onClick={onSelect}
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
