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
    const isTextContent = typeof children === "string" || typeof children === "number"

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
        {isTextContent ? (
            <Paragraph color={isHeader? "textColor1" : "textColor2"} weight={isHeader? "medium" : "light"} size={size}>
                {children}
            </Paragraph>
        ) : (
            <div className="flex items-center justify-start w-full h-full">
                {children}
            </div>
        )}
        {!isHeader && showCopyButton && (
            <Frame
                className="pointer-events-none absolute right-[var(--space-xs)] top-0 bottom-0 flex items-center opacity-0 transition-all duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100"
                specificStyles={{
                    position: "absolute",
                    right: "var(--space-xs)",
                }}
            >
                <Button
                    variant="ghost"
                    size="xxs"
                    isIcon
                    iconName="icon-coppy"
                    aria-label="Copy cell text"
                    func={copyCellText}
                    iconColor="textColor2"
                    specificStyles={{
                        backgroundColor: "var(--color-background1)",
                        border: "1px solid var(--color-outline1)",
                        borderRadius: "var(--radius-sm)",
                        color: "var(--color-textColor2)",
                    }}
                />
            </Frame>
        )}
        {actionSlot}
    </Frame>
  )
}
