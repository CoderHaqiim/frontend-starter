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
  width?: CSSProperties["width"]
  gap: number
  // A popup whose content acts on a pick closes itself as soon as something in it
  // is clicked, so it does not sit over the change the pick made.
  closeOnContentClick?: boolean
  // The trigger hugs its content by default, so the popup hangs off the thing it
  // belongs to. A trigger that has to answer a click across a whole surface — a
  // table's serial number cell, for instance — is laid over that surface with a
  // style of its own, and the popup opens from anywhere in it.
  triggerStyle?: CSSProperties
}

type Coordinates = {
  top: number
  left: number
}

export default function Popup({
  children,
  content,
  position = "left",
  gap,
  width = "250px",
  disabled = false,
  closeOnContentClick = false,
  specificStyle,
  triggerStyle,
}: PopupProps) {
  const popupId = useId()
  const triggerRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  /*
   * The portal renders into `document.body`, which does not exist while the page
   * is being rendered on the server, so the popup only reaches the DOM once it is
   * in a browser. That is read as the initial state rather than set from an effect,
   * so the very first render already knows whether it may use the document and
   * there is no render that tries to portal before it may.
   */
  const [mounted] = useState(() => typeof document !== "undefined")

  const [isVisible, setIsVisible] = useState(false)

  const [coordinates, setCoordinates] = useState<Coordinates>({
    top: 0,
    left: 0,
  })

  // The click that bubbles out of the content is answered after the content's own
  // handler has run, so the action the pick carries always happens before the popup
  // folds away.
  function handleContentClick() {
    if (!closeOnContentClick) return

    setIsVisible(false)
  }

  function togglePopup() {
    if (disabled) return

    if (isVisible) {
      setIsVisible(false)
      return
    }

    const trigger = triggerRef.current

    if (!trigger) return

    const triggerRect = trigger.getBoundingClientRect()

    let top = 0
    let left = 0

    switch (position) {
      case "right":
        top = triggerRect.top + triggerRect.height / 2
        left = triggerRect.right + gap
        break

      case "top":
        top = triggerRect.top - gap
        left = triggerRect.left + triggerRect.width / 2
        break

      case "bottom":
        top = triggerRect.bottom + gap
        left = triggerRect.left + triggerRect.width / 2
        break

      case "left":
      default:
        top = triggerRect.top + triggerRect.height / 2
        left = triggerRect.left - gap
        break
    }

    setCoordinates({
      top,
      left,
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

  const transform =
    position === "left"
      ? "translate(-100%, -50%)"
      : position === "right"
        ? "translateY(-50%)"
        : position === "top"
          ? "translate(-50%, -100%)"
          : "translateX(-50%)"

  return (
    <>
      <div
        ref={triggerRef}
        className={triggerStyle ? "flex items-center" : "w-max"}
        style={triggerStyle}
        aria-describedby={!disabled ? popupId : undefined}
        onClick={togglePopup}
      >
        {children}
      </div>

      {mounted &&
        createPortal(
          /*
           * A closed popup is unmounted rather than just faded out.
           *
           * Fading it alone was not enough: the closed container carried
           * `pointer-events-none`, but the download buttons inside it are real
           * buttons that set their own `pointer-events` to `all`, and a descendant
           * that turns pointer events back on stays clickable even when its parent
           * has turned them off. The closed popup therefore remained an invisible
           * wall of live controls sitting over the page — which is why clicking the
           * file input behind it hit "Download" instead of opening the file manager.
           *
           * Rendering nothing while the popup is closed removes it from hit testing
           * and from the tab order altogether, so nothing inside it can be clicked,
           * focused or read out until it has actually been opened. The cost is that
           * the fade-out is no longer animated: a closing popup now disappears at
           * once rather than easing away, which is the trade for it never being able
           * to swallow a click meant for the page underneath.
           */
          isVisible ? (
            <div ref={popupRef} id={popupId} role="popup" onClick={handleContentClick}
              className={`pointer-events-auto ${shadow2} fixed z-[9999] max-w-[250px] rounded-[var(--radius-sm)] bg-[var(--color-white)] border border-[var(--color-outline1)] p-[var(--space-md)] transition-opacity duration-300 opacity-100`}
              style={{
                width: width,
                top: coordinates.top,
                left: coordinates.left,
                transform,
                ...specificStyle,
              }}
            >
              <Frame
                className="flex-col w-full"
                specificStyles={{
                  lineHeight: "1.5",
                  color: "var(--color-background1)",
                  fontSize: "10px",
                  fontWeight: 300,
                }}
              >
                {content}
              </Frame>
            </div>
          ) : null,
          document.body
        )}
    </>
  )
}