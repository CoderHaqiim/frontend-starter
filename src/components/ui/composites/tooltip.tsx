"use client"

import { colorVariables } from "@/src/app/design/colors"
import { CSSProperties, ReactNode, useId } from "react"

type TooltipPosition = "top" | "right" | "bottom" | "left"

type TooltipProps = {
  children: ReactNode,
  content: ReactNode,
  position?: TooltipPosition,
  disabled?: boolean,
  specificStyle?: CSSProperties,
}

export default function Tooltip({
  children,
  content,
  position = "top",
  specificStyle,
}: TooltipProps) {
  const tooltipId = useId()

  const positionStyles: Record<TooltipPosition, string> = {
    top: "bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2",
    right: "left-[calc(100%+8px)] top-1/2 -translate-y-1/2",
    bottom: "left-1/2 top-[calc(100%+8px)] -translate-x-1/2",
    left: "right-[calc(100%+8px)] top-1/2 -translate-y-1/2",
  }

  const arrowStyles: Record<TooltipPosition, string> = {
    top: "left-1/2 top-full -translate-x-1/2 border-x-[6px] border-t-[6px] border-x-transparent border-t-[var(--color-textColor1)]",
    right: "right-full top-1/2 -translate-y-1/2 border-y-[6px] border-r-[6px] border-y-transparent border-r-[var(--color-textColor1)]",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-x-[6px] border-b-[6px] border-x-transparent border-b-[var(--color-textColor1)]",
    left: "left-full top-1/2 -translate-y-1/2 border-y-[6px] border-l-[6px] border-y-transparent border-l-[var(--color-textColor1)]",
  }

  return (
    <div className="group relative inline-flex w-max" aria-describedby={tooltipId}>
      {children}
      <span
        id={tooltipId}
        role="tooltip"
        className={`pointer-events-none absolute z-50 w-max max-w-[220px] rounded-[var(--radius-md)] bg-[var(--color-textColor1)] px-2 py-1 text-center text-[12px] leading-[1.4] text-[var(--color-background1)] opacity-0 shadow-[0px_4px_12px_rgba(0,0,0,0.15)] transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 ${positionStyles[position]}`}
        style={{
          ...specificStyle,
          ...colorVariables
        }}
      >
        {content}
        <span className={`absolute h-0 w-0 ${arrowStyles[position]}`} />
      </span>
    </div>
  )
}
