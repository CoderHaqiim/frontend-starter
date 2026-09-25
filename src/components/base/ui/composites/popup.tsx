"use client"

import { shadow2 } from "@/src/app/design/shadows"
import {
    CSSProperties,
    ReactNode,
    useEffect,
    useId,
    useRef,
    useState,
} from "react"
import { createPortal } from "react-dom"
import Frame from "../primitives/frame"

type PopupPosition = "top" | "right" | "bottom" | "left"

type PopupProps = {
  children: ReactNode
  content: ReactNode
  position?: PopupPosition
  disabled?: boolean
  specificStyle?: CSSProperties
  width?: "hug" | "stretch"
  gap: number
}

type Coordinates = {
  top: number
  left: number
}

export default function Popup({
  children,
  content,
  gap,
  width = "hug",
  disabled = false,
  specificStyle,
}: PopupProps) {
  const popupId = useId()
  const triggerRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const [coordinates, setCoordinates] = useState<Coordinates>({
    top: 0,
    left: 0,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  function togglePopup(event: React.MouseEvent<HTMLDivElement>) {
    if (disabled) return

    if (isVisible) {
      setIsVisible(false)
      return
    }

    setCoordinates({
      top: event.clientY,
      left: event.clientX + gap,
    })

    setIsVisible(true)
  }

  useEffect(() => {
    if (!isVisible) return

    function handleScroll() {
      setIsVisible(false)
    }

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node

      if (triggerRef.current?.contains(target)) return
      if (popupRef.current?.contains(target)) return

      setIsVisible(false)
    }

    window.addEventListener("scroll", handleScroll, true)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("scroll", handleScroll, true)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isVisible])

  function handleMouseLeave() {
    setIsVisible(false)
  }

  return (
    <>
      <div
        ref={triggerRef}
        className={width === "stretch" ? "w-full" : "w-auto"}
        aria-describedby={!disabled ? popupId : undefined}
        onClick={togglePopup}
      >
        {children}
      </div>

      {mounted &&
        createPortal(
          <div
            ref={popupRef}
            id={popupId}
            role="popup"
            onMouseLeave={handleMouseLeave}
            className={`pointer-events-auto ${shadow2} fixed z-[9999] w-max max-w-[200px] rounded-[var(--radius-sm)] bg-[var(--color-background2)] p-[var(--space-sm)] transition-opacity duration-300 ${
              isVisible
                ? "opacity-100"
                : "pointer-events-none opacity-0"
            }`}
            style={{
              top: coordinates.top,
              left: coordinates.left,
              transform: "translateY(-50%)",
              ...specificStyle,
            }}
          >
            <Frame
              className="flex-col"
              specificStyles={{
                lineHeight: "1.5",
                color: "var(--color-background1)",
                fontSize: "10px",
                fontWeight: 300,
              }}
            >
              {content}
            </Frame>
          </div>,
          document.body
        )}
    </>
  )
}