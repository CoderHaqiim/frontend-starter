"use client"

import { colorVariables } from "@/src/app/design/colors"
import {
  CSSProperties,
  ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react"
import { createPortal } from "react-dom"

type TooltipPosition = "top" | "right" | "bottom" | "left"

type TooltipProps = {
  children: ReactNode
  content: ReactNode
  position?: TooltipPosition
  disabled?: boolean
  specificStyle?: CSSProperties
}

type Coordinates = {
  top: number
  left: number
}

export default function Tooltip({
  children,
  content,
  position = "top",
  disabled = false,
  specificStyle,
}: TooltipProps) {
  const tooltipId = useId()
  const triggerRef = useRef<HTMLDivElement>(null)

  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [coordinates, setCoordinates] = useState<Coordinates>({
    top: 0,
    left: 0,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  function updatePosition() {
    if (!triggerRef.current) return

    const rect = triggerRef.current.getBoundingClientRect()
    const gap = 12

    switch (position) {
      case "top":
        setCoordinates({
          top: rect.top - gap,
          left: rect.left + rect.width / 2,
        })
        break

      case "right":
        setCoordinates({
          top: rect.top + rect.height / 2,
          left: rect.right + gap,
        })
        break

      case "bottom":
        setCoordinates({
          top: rect.bottom + gap,
          left: rect.left + rect.width / 2,
        })
        break

      case "left":
        setCoordinates({
          top: rect.top + rect.height / 2,
          left: rect.left - gap,
        })
        break
    }
  }

  function showTooltip() {
    if (disabled) return

    updatePosition()
    setIsVisible(true)
  }

  function hideTooltip() {
    setIsVisible(false)
  }

  useEffect(() => {
    if (!isVisible) return

    const handleScroll = () => {
      updatePosition()
    }

    const handleResize = () => {
      updatePosition()
    }

    // Capture scroll events from nested scrollable containers
    window.addEventListener("scroll", handleScroll, true)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", handleScroll, true)
      window.removeEventListener("resize", handleResize)
    }
  }, [isVisible, position])

  const transformStyles: Record<TooltipPosition, string> = {
    top: "translate(-50%, -100%)",
    right: "translate(0, -50%)",
    bottom: "translate(-50%, 0)",
    left: "translate(-100%, -50%)",
  }

  const arrowStyles: Record<TooltipPosition, string> = {
    top: "left-1/2 top-full -translate-x-1/2 -translate-y-[1px] border-x-[6px] border-t-[6px] border-x-transparent border-t-[var(--color-textColor1)]",
    right: "right-full top-1/2 -translate-y-1/2 border-y-[6px] border-r-[6px] border-y-transparent border-r-[var(--color-textColor1)]",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-x-[6px] border-b-[6px] border-x-transparent border-b-[var(--color-textColor1)]",
    left: "left-full top-1/2 -translate-y-1/2 border-y-[6px] border-l-[6px] border-y-transparent border-l-[var(--color-textColor1)]",
  }

  return (
    <>
      <div
        ref={triggerRef}
        className="inline-flex w-max"
        aria-describedby={!disabled ? tooltipId : undefined}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        {children}
      </div>

      {mounted &&
        createPortal(
          <span
            id={tooltipId}
            role="tooltip"
            className={`pointer-events-none fixed z-[9999] w-max max-w-[220px] rounded-[var(--radius-md)] bg-[var(--color-textColor1)] px-2 py-1 text-center text-[12px] leading-[1.4] text-[var(--color-background1)] shadow-[0px_4px_12px_rgba(0,0,0,0.15)] transition-opacity duration-150 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{
              top: coordinates.top,
              left: coordinates.left,
              transform: transformStyles[position],
              ...colorVariables,
              ...specificStyle,
            }}
          >
            {content}

            <span
              className={`absolute h-0 w-0 ${arrowStyles[position]}`}
            />
          </span>,
          document.body
        )}
    </>
  )
}