const currencySymbols: Record<string, string> = {
  NGN: "₦",
  USD: "$",
  GBP: "£",
  EUR: "€",
  JPY: "¥",
  CNY: "¥",
  GHS: "₵",
  ZAR: "R",
  CAD: "$",
  AUD: "$",
}

export function getCurrencySymbol(currency: string) {
  const code = currency.trim().toUpperCase()

  return currencySymbols[code] ?? currency
}
