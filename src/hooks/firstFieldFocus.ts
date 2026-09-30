"use client"

import { RefObject, useEffect } from "react"

// The fields a modal can open with. Hidden inputs are skipped, because the value a
// dropdown keeps for its form sits in one of them.
const firstFieldSelector = [
  'input:not([type="hidden"]):not([disabled])',
  "select:not([disabled])",
  "textarea:not([disabled])",
].join(", ")

/*
 * Puts the focus on the first field of a modal as it opens, so a form can be typed
 * into without reaching for the field first.
 *
 * The fields are not always there the moment a modal opens: a form that edits a
 * record shows a spinner until the record answers. The modal is watched until its
 * first field shows up, and a field the user already reached keeps the focus, so an
 * answer that lands late cannot pull it away from where it is.
 */
export default function useFirstFieldFocus<Container extends HTMLElement>(
  containerRef: RefObject<Container | null>,
  isOpen: boolean,
) {
  useEffect(() => {
    if (!isOpen) return

    const container = containerRef.current
    if (!container) return

    const focusFirstField = () => {
      if (container.contains(document.activeElement)) return false

      const firstField = container.querySelector<HTMLElement>(firstFieldSelector)
      if (!firstField) return false

      firstField.focus()

      return true
    }

    if (focusFirstField()) return

    const fieldObserver = new MutationObserver(() => {
      if (focusFirstField()) fieldObserver.disconnect()
    })

    fieldObserver.observe(container, { childList: true, subtree: true })

    return () => fieldObserver.disconnect()
  }, [containerRef, isOpen])
}
