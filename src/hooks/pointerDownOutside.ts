"use client"

import { RefObject, useEffect } from "react"

/*
 * Runs the handler when a pointer press lands outside every one of the given
 * elements. It is how the popups, the download and share menus and the line item
 * forms close while the pointer stays over the page.
 *
 * `isOpen` keeps the listener off while there is nothing to close.
 */
export default function usePointerDownOutside(
  refs: RefObject<Element | null>[],
  onOutside: () => void,
  isOpen = true,
) {
  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target

      if (!(target instanceof Node)) return

      if (refs.some((ref) => ref.current?.contains(target))) return

      onOutside()
    }

    document.addEventListener("mousedown", handlePointerDown)

    return () => document.removeEventListener("mousedown", handlePointerDown)
  }, [refs, onOutside, isOpen])
}
