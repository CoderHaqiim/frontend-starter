// The amounts on the invoice and receipt documents, and in the line item tables
// inside them, carry the currency symbol in front and always show two decimals.
export function formatCurrency(amount: number, symbol?: string) {
  return `${symbol ?? ""}${amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}
