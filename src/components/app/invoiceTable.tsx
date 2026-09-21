"use client"

import { useInvoiceDraft } from "@/src/store/invoiceDraftState"
import { getCurrencySymbol } from "@/src/utils/currencySymbol"

const cellClass = "border-t border-[var(--color-outline1)] px-[var(--space-md)] py-[var(--space-sm)] text-[11px] text-[var(--color-textColor2)]"

export default function InvoiceTable() {
  const items = useInvoiceDraft((state) => state.items)
  const currency = useInvoiceDraft((state) => state.currency)
  const currencySymbol = getCurrencySymbol(currency)

  return (
    <table className="w-full overflow-hidden border-separate border-spacing-0 border border-[var(--color-outline1)]">
      <thead>
        <tr className="bg-[var(--color-background3)]">
          <th className="border-r border-[var(--color-outline1)] px-[var(--space-md)] py-[var(--space-sm)] text-left text-[length:var(--bodySize-sm)] font-[600] text-[var(--color-textColor1)]"> </th>
          <th className="border-r border-[var(--color-outline1)] px-[var(--space-md)] py-[var(--space-sm)] text-left text-[length:var(--bodySize-sm)] font-[600] text-[var(--color-textColor1)]">Description</th>
          <th className="border-r border-[var(--color-outline1)] px-[var(--space-md)] py-[var(--space-sm)] text-center text-[length:var(--bodySize-sm)] font-[600] text-[var(--color-textColor1)]">Quantity</th>
          <th className="border-r border-[var(--color-outline1)] px-[var(--space-md)] py-[var(--space-sm)] text-right text-[length:var(--bodySize-sm)] font-[600] text-[var(--color-textColor1)]">Unit Price</th>
          <th className="px-[var(--space-md)] py-[var(--space-sm)] text-right text-[length:var(--bodySize-sm)] font-[600] text-[var(--color-textColor1)]">Amount</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr className="cursor-pointer" key={item.id}>
            <td className={`${cellClass} text-center`}>{index + 1}</td>
            <td className={cellClass}>
              <div className="font-[600] text-[var(--color-textColor1)]">{item.name}</div>
              {item.description && <div className="text-[9px]">{item.description}</div>}
            </td>
            <td className={`${cellClass} text-center`}>{item.quantity}</td>
            <td className={`${cellClass} text-right`}>{formatCurrency(item.price, currencySymbol)}</td>
            <td className={`${cellClass} text-right`}>{formatCurrency(item.amount, currencySymbol)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function formatCurrency(amount: number, symbol: string) {
  return `${symbol}${amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}