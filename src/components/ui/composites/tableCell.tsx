"use client"

import { FrameSizeType, SizeType } from "@/src/types/types"
import Frame from "../primitives/frame"
import Paragraph from "../primitives/paragraph"
import { ReactNode } from "react"
import { elementSizes } from "@/src/app/design/sizes"
import Button from "../primitives/button"

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
    const cellText = String(children ?? "")

    const copyCellText = async () => {
        await navigator.clipboard.writeText(cellText)
    }

  return (
        <Frame className={`${className} group relative border-[0.5px] border-[var(--color-outline1)] items-center justify-start p-[var(--space-sm)] hover:border-[1px] hover:border-[var(--color-accent)] overflow-hidden`}
        specificStyles={{
            width: width,
            height: elementSizes[size]
        }}>
        <Paragraph color={isHeader? "textColor1" : "textColor2"} weight={isHeader? "medium" : "light"} size={size}>
            {children}
        </Paragraph>
        {!isHeader && (
            <Button
                variant="ghost"
                size="xxs"
                isIcon
                iconName="icon-coppy"
                aria-label="Copy cell text"
                func={copyCellText}
                className="absolute right-[var(--space-xxs)] opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                specificStyles={{
                    zIndex: 20,
                    backgroundColor: "var(--color-white)",
                }}
            />
        )}
        {actionSlot}
    </Frame>
  )
}
