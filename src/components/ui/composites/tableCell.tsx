import { FrameSizeType, SizeType } from "@/src/types/types"
import Frame from "../primitives/frame"
import Paragraph from "../primitives/paragraph"
import { ReactNode } from "react"
import { elementSizes } from "@/src/app/design/sizes"

type TableCellProps = {
    size: SizeType,
    width: FrameSizeType,
    children: ReactNode,
    isHeader?: boolean,
    className?: string,
    actionSlot?: ReactNode
}

export default function TableCell({
    size, 
    isHeader=false , 
    width, 
    children,
    className,
    actionSlot
}: TableCellProps) {

    const height = elementSizes[size]
  return (
    <Frame border width={width} padding="sm" justify="flex-end" align="center" height={height} className={`${className} hover:border-[1px] hover:border-[var(--color-accent)] overflow-hidden`}>
        <Paragraph color={isHeader? "textColor1" : "textColor2"} weight={isHeader? "medium" : "light"} size={size}>
            {children}
        </Paragraph>
        {actionSlot}
    </Frame>
  )
}
