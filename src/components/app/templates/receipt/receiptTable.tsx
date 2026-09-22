"use client"

import CreateReceiptItemForm from "@/src/components/app/forms/createReceiptItem"
import Button from "@/src/components/base/ui/primitives/button"
import { useBackdropState } from "@/src/store/backdropState"
import { useReceiptDraft } from "@/src/store/receiptDraftState"
import { useReceiptFormState } from "@/src/store/receiptFormState"
import { getCurrencySymbol } from "@/src/utils/currencySymbol"
import { useEffect, useState } from "react"

const cellClass =
  "border-t border-[var(--color-outline1)] px-[var(--space-md)] py-[var(--space-sm)] text-[11px] text-[var(--color-textColor2)]"

export default function ReceiptTable() {
  const items = useReceiptDraft((state) => state.items)
  const currency = useReceiptDraft((state) => state.currency)
  const removeItem = useReceiptDraft((state) => state.removeItem)
  const currencySymbol = getCurrencySymbol(currency)
  const isInteractive = useReceiptFormState((state) => state.isOpen)
  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)

  useEffect(() => {
    if (!selectedItemId) return

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target

      if (!(target instanceof Node)) return

      const clickedRow = (target as Element).closest("tr[data-item-id]")

      if (!clickedRow || clickedRow.getAttribute("data-item-id") !== selectedItemId) {
        setSelectedItemId(null)
      }
    }

    document.addEventListener("mousedown", handlePointerDown)

    return () => document.removeEventListener("mousedown", handlePointerDown)
  }, [selectedItemId])

  const openEditItem = (item: (typeof items)[number]) => {
    setBackdropContent(
      <CreateReceiptItemForm
        itemToEdit={item}
        onClose={() => {
          setBackdropOpen(false)
          setBackdropContent(null)
        }}
      />,
    )
    setBackdropOpen(true)
  }

  const handleRowClick = (itemId: string) => {
    if (!isInteractive) return
    setSelectedItemId((currentId) => currentId === itemId ? null : itemId)
  }

  return (
    <table className="relative z-[60] w-full overflow-visible border-separate border-spacing-0 border border-[var(--color-outline1)]">
      <thead>
        <tr className="bg-[var(--color-background3)]">
          <th className="border-r border-[var(--color-outline1)] px-[var(--space-md)] py-[var(--space-sm)] text-left text-[length:var(--bodySize-sm)] font-[600] text-[var(--color-textColor1)]"> </th>
          <th className="border-r border-[var(--color-outline1)] px-[var(--space-md)] py-[var(--space-sm)] text-left text-[length:var(--bodySize-sm)] font-[600] text-[var(--color-textColor1)]">
            Description
          </th>
          <th className="border-r border-[var(--color-outline1)] px-[var(--space-md)] py-[var(--space-sm)] text-center text-[length:var(--bodySize-sm)] font-[600] text-[var(--color-textColor1)]">
            Qty
          </th>
          <th className="border-r border-[var(--color-outline1)] px-[var(--space-md)] py-[var(--space-sm)] text-right text-[length:var(--bodySize-sm)] font-[600] text-[var(--color-textColor1)]">
            ({currencySymbol}) Unit Price
          </th>
          <th className="px-[var(--space-md)] py-[var(--space-sm)] text-right text-[length:var(--bodySize-sm)] font-[600] text-[var(--color-textColor1)]">
            ({currencySymbol}) Amount
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr
            className="cursor-pointer"
            key={item.id}
            data-item-id={item.id}
            onClick={() => handleRowClick(item.id)}
          >
            <td className={`${cellClass} text-center`}>{index + 1}</td>
            <td className={cellClass}>
              <div className="font-[600] text-[var(--color-textColor1)]">
                {item.name}
              </div>
              {item.description && (
                <div className="text-[9px]">{item.description}</div>
              )}
            </td>
            <td className={`${cellClass} text-center`}>{item.quantity}</td>
            <td className={`${cellClass} text-right`}>{formatCurrency(item.price, currencySymbol)}</td>
            <td className={`${cellClass} relative text-right`}>
              {formatCurrency(item.amount, currencySymbol)}
              {isInteractive && selectedItemId === item.id && (
                <div className="absolute right-2 top-[0] z-[10] top-[2px] flex flex-col gap-1 overflow-hidden rounded-[var(--radius-sm)] border border-[var(--color-outline1)] bg-[var(--color-white)] p-2 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                  <Button
                    variant="ghost"
                    size="sm"
                    rounded="sm"
                    iconName="icon-pencil"
                    iconColor="textColor1"
                    justify="start"
                    className="w-full text-[13px] px-[var(--space-sm)] py-[var(--space-xs)] hover:bg-[var(--color-background3)]"
                    specificStyles={{ borderRadius: "inherit" }}
                    func={() => {
                      openEditItem(item)
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    rounded="sm"
                    iconName="icon-delete"
                    iconColor="error"
                    justify="start"
                    className="w-full text-[13px] px-[var(--space-sm)] py-[var(--space-xs)]"
                    specificStyles={{
                      backgroundColor: "var(--color-error2)",
                      color: "var(--color-error)",
                      borderRadius: "inherit",
                    }}
                    func={() => {
                      removeItem(item.id)
                      setSelectedItemId(null)
                    }}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function formatCurrency(amount: number, symbol?: string) {
  return `${symbol ? symbol : ""}${amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}
