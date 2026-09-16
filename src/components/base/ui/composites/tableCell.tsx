"use client"

import { elementSizes } from "@/src/app/design/sizes"
import { FrameSizeType, SizeType } from "@/src/types/types"
import { ReactNode } from "react"
import Button from "../primitives/button"
import Frame from "../primitives/frame"
import Paragraph from "../primitives/paragraph"

type TableCellProps = {
    size: SizeType,
    width: FrameSizeType,
    children: ReactNode,
    isHeader?: boolean,
    className?: string,
    actionSlot?: ReactNode,
    showCopyButton?: boolean,
    onClick?: () => void
}

export default function TableCell({
    size, 
    isHeader=false , 
    width, 
    children,
    className,
    actionSlot,
    showCopyButton = true,
    onClick
}: TableCellProps) {
    const cellText = String(children ?? "")

    const copyCellText = async () => {
        await navigator.clipboard.writeText(cellText)
    }

  return (
        <Frame className={`${className} group relative border-[0.5px] border-[var(--color-background1)] items-center justify-start p-[var(--space-sm)] hover:border-[1px] hover:border-[var(--color-accent)] overflow-hidden`}
        specificStyles={{
            width: width,
            height: elementSizes[size]
        }}
        onClick={onClick}
        >
        <Paragraph color={isHeader? "textColor1" : "textColor2"} weight={isHeader? "medium" : "light"} size={size}>
            {children}
        </Paragraph>
        {!isHeader && showCopyButton && (
            <Frame specificStyles={{
                position:"absolute",
                top:"10%",
                right:"0px"
            }}>
                <Button
                    variant="ghost"
                    size="xxs"
                    isIcon
                    iconName="icon-coppy"
                    aria-label="Copy cell text"
                    func={copyCellText}
                    className=" opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                    specificStyles={{
                        backgroundColor: "var(--color-white)",
                    }}
                />
            </Frame>
        )}
        {actionSlot}
    </Frame>
  )
}
